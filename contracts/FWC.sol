pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

contract FWC is ERC20Mintable {

    string public name = "Friendly Wager Coin";
    string public symbol = "FWC";
    uint public decimals = 0;

    enum Outcome { NIL, OPEN, ACCEPTED, HOUSE_WINS, BETTOR_WINS, ACCEPTOR_WINS }

    struct Action {
        uint256 id;
        uint256 amount;
        string description;
        address bettor;
        address acceptor;
        Outcome status;
    }

    mapping (uint256 => Action) wagers;

    uint256 private _id;

    event Wager(uint256 actionId, address actor, string msg, uint256 amount, uint256 balance);
    event WagerAccepted(uint256 actionId, address acceptor, string msg, uint256 amount, uint256 balance);
    event Shame(uint256 actionId, address loser, address winner, uint256 amount);

    constructor() public {
        _id = 0;
    }

    modifier bettorHasFunds(uint _amount) {
        require(balanceOf(msg.sender) >= _amount);
        _;
    }

    modifier isInvolved(uint256 _actionId, address party) {
        require(
            (getWagerBettor(_actionId) == party) ||
            (getWagerAcceptor(_actionId) == party));
        _;
    }

    modifier actionIsOpen(uint256 _actionId) {
        require(getWagerStatus(_actionId) == uint(Outcome.OPEN));
        _;
    }

    modifier actionIsAccepted(uint256 _actionId) {
        require(getWagerStatus(_actionId) == uint(Outcome.ACCEPTED));
        _;
    }

    function makeWager(uint256 _amount, string memory _des) public bettorHasFunds(_amount) {
        _id++;
        emit Wager(_id, msg.sender, _des, _amount, balanceOf(msg.sender));
        require(bytes(_des).length < 100);
        _generateAction(_amount, _des);
    }

    function _generateAction(uint256 _amount, string memory _des) private {
        FWC.Action storage action = wagers[_id];
        action.id = _id;
        action.bettor = msg.sender;
        action.status = Outcome.OPEN;
        action.amount = _amount;
        action.description = _des;
    }

    function acceptWager(uint256 _actionId) public actionIsOpen(_actionId) {
        uint balance = balanceOf(msg.sender);
        require(balance >= getWagerAmount(_actionId));
        emit WagerAccepted(_actionId, msg.sender, getWagerDescription(_actionId), getWagerAmount(_actionId), balance);
        wagers[_actionId].status = Outcome.ACCEPTED;
        wagers[_actionId].acceptor = msg.sender;
    }

    function youWin(uint256 _actionId)
    public
    actionIsAccepted(_actionId)
    isInvolved(_actionId, msg.sender) {
        address _bettor = getWagerBettor(_actionId);
        address _acceptor = getWagerAcceptor(_actionId);
        if (_bettor == msg.sender) {
            wagers[_actionId].status = Outcome.ACCEPTOR_WINS;
            emit Shame(_actionId, msg.sender, _acceptor, getWagerAmount(_actionId));
            transfer(_acceptor, getWagerAmount(_actionId));
        } else {
            wagers[_actionId].status = Outcome.BETTOR_WINS;
            emit Shame(_actionId, msg.sender, _bettor, getWagerAmount(_actionId));
            transfer(_bettor, getWagerAmount(_actionId));
        }
    }

    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//
    // Views

    function getWagerBettor(uint256 _actionId) public view returns (address) {
        return wagers[_actionId].bettor;
    }

    function getWagerAcceptor(uint256 _actionId) public view returns (address) {
        return wagers[_actionId].acceptor;
    }

    function getWagerAmount(uint256 _actionId) public view returns (uint256) {
        return wagers[_actionId].amount;
    }

    function getWagerDescription(uint256 _actionId) public view returns (string memory) {
        return wagers[_actionId].description;
    }

    function getWagerStatus(uint256 _actionId) public view returns (uint) {
        return uint(wagers[_actionId].status);
    }

    function getId() public view returns (uint256) {
        return _id;
    }
}
