import { combineReducers } from 'redux';

import airline from './airline';
import allAirlineReducer from './allAirline';
import allFlightReducer from './allFlight';
import detailAirlineReducer from './detailAirline';
import user from './user';
import detailFlightReducer from './detailFlight';
import allCityReducer from './allCity';
import allPicReducer from './allPic';
import listCountryReducer from './listCountry';
import detailCountryReducer from './detailCountry';
import listCityReducer from './listCity';
import detailCityReducer from './detailCity';

export default combineReducers({
  airline,
  allAirlineReducer,
  allFlightReducer,
  detailAirlineReducer,
  user,
  detailFlightReducer,
  allCityReducer,
  allPicReducer,
  listCountry: listCountryReducer,
  detailCountry: detailCountryReducer,
  listCity: listCityReducer,
  detailCity: detailCityReducer
});
