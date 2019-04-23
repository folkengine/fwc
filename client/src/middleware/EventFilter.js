EventFilter.Wager = 'Wager';
EventFilter.WagerAccepted = 'WagerAccepted';
EventFilter.Shame = 'Shame';

export function EventFilter() {
  this.offeringMap = {};
  this.offeringMap[0] = EventFilter.Shame;
}

EventFilter.prototype.isUpdatedOffering = function(offeringId, state) {
  console.log(`${offeringId} ${state}`);
  if ((offeringId in this.offeringMap) && this.offeringMap[offeringId] === state) {
    return false;
  }
  this.offeringMap[offeringId] = state;
  return true;
};

EventFilter.prototype.isNewEvent = function(eventId) {
  return this.isUpdatedOffering(eventId, EventFilter.Event);
};
