import { combineReducers } from 'redux';

import airline from './airline';
import allAirlineReducer from './allAirline';
import allFlightReducer from './allFlight';

export default combineReducers({
  airline,
  allAirlineReducer,
  allFlightReducer
});
