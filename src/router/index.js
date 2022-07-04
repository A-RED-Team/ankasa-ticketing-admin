import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import ScrollToTop from '../utils/scrollToTop';

import Login from '../modules/login';
import Main from '../modules/main';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

import Airline from '../pages/airline';
import AddAirline from '../pages/airline/add';
import EditAirline from '../pages/airline/edit';
import ViewAirline from '../pages/airline/view';

import Booking from '../pages/booking';
import AddBooking from '../pages/booking/add';
import EditBooking from '../pages/booking/edit';
import ViewBooking from '../pages/booking/view';

import City from '../pages/city';
import AddCity from '../pages/city/add';
import EditCity from '../pages/city/edit';
import ViewCity from '../pages/city/view';

import Country from '../pages/country';
import AddCountry from '../pages/country/add';
import EditCountry from '../pages/country/edit';
import ViewCountry from '../pages/country/view';

import Flight from '../pages/flight';
import AddFlight from '../pages/flight/add';
import EditFlight from '../pages/flight/edit';
import ViewFlight from '../pages/flight/view';

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route index element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="airline" element={<Airline />} />
            <Route path="airline/add" element={<AddAirline />} />
            <Route path="airline/edit/:id" element={<EditAirline />} />
            <Route path="airline/view/:id" element={<ViewAirline />} />
            <Route path="booking" element={<Booking />} />
            <Route path="booking/add" element={<AddBooking />} />
            <Route path="booking/edit/:id" element={<EditBooking />} />
            <Route path="booking/view/:id" element={<ViewBooking />} />
            <Route path="city" element={<City />} />
            <Route path="city/add" element={<AddCity />} />
            <Route path="city/edit/:id" element={<EditCity />} />
            <Route path="city/view/:id" element={<ViewCity />} />
            <Route path="country" element={<Country />} />
            <Route path="country/add" element={<AddCountry />} />
            <Route path="country/edit/:id" element={<EditCountry />} />
            <Route path="country/view/:id" element={<ViewCountry />} />
            <Route path="flight" element={<Flight />} />
            <Route path="flight/add" element={<AddFlight />} />
            <Route path="flight/edit/:id" element={<EditFlight />} />
            <Route path="flight/view/:id" element={<ViewFlight />} />
          </Route>
        </Route>
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
};
export default router;
