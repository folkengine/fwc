import { generateStore, EventActions } from 'drizzle';
import drizzleOptions from '../drizzleOptions';
import { toast } from 'react-toastify/index';

// const { EventFilter } = require('./EventFilter');

// let filter = new EventFilter();

function getWagerId(event) {
  return event.returnValues.actionId;
}

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
//    if (filter.isNewEvent(action.event.id)) {
      console.log(action);
      const display = `Wager #${getWagerId(action.event)} made`;
      console.log(display);
      // alert(display);
      // toast(display, { position: toast.POSITION.BOTTOM_CENTER });
    toast(display);
//     }
    
    // if (action.event.event === EventFilter.Wager) {
    //   if (filter.isNewEvent(action.event.id)) {
    //     console.log(action);
    //     const display = `Wager #${getWagerId(action.event)} made`;
    //     toast.success(display, { position: toast.POSITION.TOP_RIGHT });
    //   }
    // } else if (filter.isUpdatedOffering(getWagerId(action.event), action.event.event)) {
    //   console.log(action);
    //   const display = `${action.event.event} ${getWagerId(action.event)}`;
    //   toast.success(display, { position: toast.POSITION.TOP_RIGHT });
    // }
  }
  return next(action);
};

const appMiddlewares = [ contractEventNotifier ];

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
});
