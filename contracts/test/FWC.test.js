const mlog = require('mocha-logger');
const util = require('util');

const BN = web3.utils.BN;

require('chai')
    .use(require('chai-as-promised'))
    .should();

const FWC = artifacts.require('FWC');

const LOGGING = false;

contract('FWC', function ([owner, actor, reactor, thirdParty]) {
    const amount = 10000;

    before(async function () {
        this.wagers = await FWC.new({
            from: owner
        });
        await this.wagers.mint(actor, amount);
        await this.wagers.mint(reactor, amount / 2);
    });

    describe('Given that we have some gamblers', function () {

        describe('constructor', function () {
            it('should have the correct name', async function () {
                const name = await this.wagers.name();
                name.should.be.equal("Friendly Wager Coin");
            });

            it('should have the correct symbol', async function () {
                const name = await this.wagers.symbol();
                name.should.be.equal("FWC");
            });

            it('should have the correct decimals', async function () {
                const decimals = await this.wagers.decimals();
                decimals.toNumber().should.be.equal(0);
            });
        });

        it('verify that the actors have FWCs', async function () {
            const balance = await this.wagers.balanceOf(actor);
            assert.equal(balance, amount);
            const reBalance = await this.wagers.balanceOf(reactor);
            assert.equal(reBalance, amount / 2);
        });

        describe('mint', function () {
            const amount = 100;

            describe('when the sender is the token owner', function () {
                const from = owner;

                describe('when the token was not finished', function () {
                    it('mints the requested amount', async function () {
                        await this.wagers.mint(owner, amount, {
                            from
                        });

                        const balance = await this.wagers.balanceOf(owner);
                        assert.equal(balance, amount);
                    });

                    it('emits a mint finished event', async function () {
                        const {
                            logs
                        } = await this.wagers.mint(owner, amount, {
                            from
                        });

                        assert.equal(logs.length, 1);
                        assert.equal(logs[0].event, 'Transfer');
                        assert.equal(logs[0].args.to, owner);
                        assert.equal(logs[0].args.value, amount);
                    });
                });

                describe('when I want to play with shit', function () {
                    it('mints some FWCs', async function () {
                        await this.wagers.mint(thirdParty, amount, {
                            from
                        });
                        const balance = await this.wagers.balanceOf(thirdParty);
                        assert.equal(balance, amount);
                        // mlog.log(`target balance ${balance}`);
                    });

                    it('it increaes the total supply', async function () {
                        const totalBefore = await this.wagers.totalSupply();
                        await this.wagers.mint(owner, amount, {
                            from
                        });
                        await this.wagers.mint(thirdParty, amount, {
                            from
                        });
                        const totalAfter = await this.wagers.totalSupply();
                        const totalDiff = totalAfter.sub(totalBefore);
                        totalDiff.toNumber().should.equal(200);
                    });
                });
            });
        });

        describe('given we have a contract to hold wagers', function () {

            it('has the id counter set to zero', async function () {
                const id = await this.wagers.getId();
                id.toNumber().should.equal(0);
            });

            describe('given that we are prepared to allow wagering', function () {
                describe('given that a bettor initiates a wager', function () {

                    const WAGER_DESCRIPTION = "Coin flip: tails";

                    it('the wager increments the id', async function () {
                        let balance = await this.wagers.balanceOf(actor);
                        // mlog.log(util.inspect(balance));
                        await this.wagers.makeWager(10, WAGER_DESCRIPTION, {
                            from: actor
                        });
                        const id = await this.wagers.getId();
                        id.toNumber().should.equal(1);
                    });

                    it('the wager adds an Action struct to the map', async function () {
                        await this.wagers.makeWager(10, WAGER_DESCRIPTION, {
                            from: actor
                        });
                        const id = await this.wagers.getId();
                        const amount = await this.wagers.getWagerAmount(id);
                        if (LOGGING) mlog.log(util.inspect(amount));
                        amount.toNumber().should.equal(10);
                    });

                    it('the wager has a description', async function () {
                        const {
                            logs
                        } = await this.wagers.makeWager(10, WAGER_DESCRIPTION, {
                            from: actor
                        });
                        const id = logWagerLog(logs[0]);
                        const description = await this.wagers.getWagerDescription(id);
                        description.should.equal(WAGER_DESCRIPTION);
                    });

                    it('the wager has a bettor', async function () {
                        const {
                            logs
                        } = await this.wagers.makeWager(10, WAGER_DESCRIPTION, {
                            from: actor
                        });
                        const id = logWagerLog(logs[0]);
                        const bettor = await this.wagers.getWagerBettor(id);
                        bettor.should.equal(actor);
                    });

                    it('the wager winner should be OPEN (1)', async function () {
                        const {
                            logs
                        } = await this.wagers.makeWager(10, WAGER_DESCRIPTION, {
                            from: actor
                        });
                        const id = logWagerLog(logs[0]);
                        const outcome = await this.wagers.getWagerStatus(id);
                        outcome.toNumber().should.equal(1);
                    });

                    it('the wager winner should be NIL for a bet that has not happened', async function () {
                        const outcome = await this.wagers.getWagerStatus(101012);
                        outcome.toNumber().should.equal(0);
                    });

                    it('should log a Wager event', async function () {
                        const description = "Coin flip: heads";
                        const {
                            logs
                        } = await this.wagers.makeWager(9, description, {
                            from: actor
                        });
                        if (LOGGING) logWagerLog(logs[0]);
                        assert.equal(logs.length, 1);
                        assert.equal(logs[0].event, 'Wager');
                        assert.equal(logs[0].args.actor, actor);
                        assert.equal(logs[0].args.msg, description);
                    });

                    // TODO Not sure why this is emitting "TypeError: Cannot read property '0' of undefined"
                    // it('should return the ID for the wager', async function() {
                    //     const { logs } = await this.wagers.makeWager(7, WAGER_DESCRIPTION, { from: actor });
                    //     logWagerLog(logs[0]);
                    //     const { logss } = await this.wagers.makeWager(6, WAGER_DESCRIPTION, { from: actor });
                    //     logWagerLog(logss[0]);
                    // });

                    it('it should not allow an overly long description', async function () {
                        const description = "This is a really really nog wager that I wager that this contract will" +
                            " allow me to have a wager that is super long.";
                        let hasError = true;
                        try {
                            await this.wagers.makeWager(2, description, {
                                from: actor
                            });
                            hasError = false; // Should be unreachable
                        } catch (err) {}
                        assert.equal(true, hasError);
                    });

                    it('throws an exception if the bettor does not have enough FWCs', async function () {
                        let hasError = true;
                        try {
                            await this.wagers.makeWager(200000000, "I am poor.", {
                                from: actor
                            });
                            hasError = false; // Should be unreachable
                        } catch (err) {}
                        assert.equal(true, hasError);
                    });

                    describe('given that someone accepts the wager', function () {
                        it("they call acceptWager", async function () {
                            const {
                                logs
                            } = await this.wagers.makeWager(11, WAGER_DESCRIPTION, {
                                from: actor
                            });
                            const actionId = logWagerLog(logs[0]);
                            await this.wagers.acceptWager(actionId, {
                                from: reactor
                            });
                        });

                        // TODO Dry it up.
                        it('throws an exception if the acceptor does not have enough FWCs', async function () {
                            const {
                                logs
                            } = await this.wagers.makeWager(5001, 'Big Bet', {
                                from: actor
                            });
                            const actionId = logWagerLog(logs[0]);
                            let hasError = true;
                            try {
                                await this.wagers.acceptWager(actionId, {
                                    from: reactor
                                });
                                hasError = false; // Should be unreachable
                            } catch (err) {}
                            assert.equal(true, hasError);
                        });

                        it('throws an exception if the action is not open', async function () {
                            await this.wagers.makeWager(5001, 'Big Bet', {
                                from: actor
                            });
                            let hasError = true;
                            try {
                                await this.wagers.acceptWager(10101, {
                                    from: reactor
                                });
                                hasError = false; // Should be unreachable
                            } catch (err) {}
                            assert.equal(true, hasError);
                        });

                        it('when they accept the Action the wager status should be ACCEPTED(2)', async function () {
                            const {
                                logs
                            } = await this.wagers.makeWager(11, WAGER_DESCRIPTION, {
                                from: actor
                            });
                            const actionId = logWagerLog(logs[0]);
                            await this.wagers.acceptWager(actionId, {
                                from: reactor
                            });
                            const outcome = await this.wagers.getWagerStatus(actionId);
                            outcome.toNumber().should.equal(2);
                        });

                        it('should emit a WagerAccepted event', async function () {
                            const {
                                logs
                            } = await this.wagers.makeWager(12, WAGER_DESCRIPTION, {
                                from: actor
                            });

                            const actionId = logWagerLog(logs[0]);

                            const accept_logs = await this.wagers.acceptWager(actionId, {
                                from: reactor
                            });

                            const wagerEvent = accept_logs.logs[0];
                            accept_logs.logs.length.should.equal(1);
                            wagerEvent.event.should.equal("WagerAccepted");
                            wagerEvent.args.acceptor.should.equal(reactor);
                            wagerEvent.args['2'].should.equal(WAGER_DESCRIPTION);
                        });

                        it('Action acceptor set', async function () {
                            const {
                                logs
                            } = await this.wagers.makeWager(13, WAGER_DESCRIPTION, {
                                from: actor
                            });
                            const actionId = logWagerLog(logs[0]);
                            await this.wagers.acceptWager(actionId, {
                                from: reactor
                            });
                            const acceptor = await this.wagers.getWagerAcceptor(actionId);
                            acceptor.should.equal(reactor);
                        });

                        describe('Given acceptor declares that they lost the bet.', function () {

                            it('Action status updated to BETTOR_WINS(4)', async function () {
                                const {
                                    logs
                                } = await this.wagers.makeWager(14, WAGER_DESCRIPTION, {
                                    from: actor
                                });
                                const actionId = logWagerLog(logs[0]);
                                await this.wagers.acceptWager(actionId, {
                                    from: reactor
                                });
                                await this.wagers.youWin(actionId, {
                                    from: reactor
                                });
                                const outcome = await this.wagers.getWagerStatus(actionId);
                                outcome.toNumber().should.equal(4);
                            });

                            it('Bettor FWC goes up by bet amount', async function () {
                                const betAmount = 1;
                                const {
                                    logs
                                } = await this.wagers.makeWager(betAmount, WAGER_DESCRIPTION, {
                                    from: actor
                                });
                                const actionId = logWagerLog(logs[0]);
                                await this.wagers.acceptWager(actionId, {
                                    from: reactor
                                });
                                const balanceBefore = await this.wagers.balanceOf(actor);

                                await this.wagers.youWin(actionId, {
                                    from: reactor
                                });

                                const newBalance = await this.wagers.balanceOf(actor);

                                //console.
                                let expectedBalance = balanceBefore.add(new BN(betAmount));
                                newBalance.toNumber().should.equal(expectedBalance.toNumber());
                            });
                        });

                        describe('Given bettor declares that they lost the bet.', function () {
                            it('Action status updated to ACCEPTOR_WINS(5)', async function () {
                                const {
                                    logs
                                } = await this.wagers.makeWager(14, WAGER_DESCRIPTION, {
                                    from: actor
                                });
                                const actionId = logWagerLog(logs[0]);
                                await this.wagers.acceptWager(actionId, {
                                    from: reactor
                                });
                                await this.wagers.youWin(actionId, {
                                    from: actor
                                });
                                const outcome = await this.wagers.getWagerStatus(actionId);
                                outcome.toNumber().should.equal(5);
                            });
                        });
                    });
                });
            });
        });
    });
});

function logWagerLog(log) {
    const actionId = log.args.actionId;
    if (LOGGING) {
        mlog.log(`${log.event}: Bet #${actionId} ${log.args.actor} wagered ${log.args.amount} FWCs on ${log.args.msg}`);
    }
    return actionId;
}