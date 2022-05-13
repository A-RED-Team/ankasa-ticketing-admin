import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PrivateRoute from '../utils/privateRoute';
import ScrollToTop from '../utils/scrollToTop';

import Login from '../modules/login';
import Main from '../modules/main';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

import Airline from '../pages/airline';
import AddAirline from '../pages/airline/add';

import Flight from '../pages/flight';
import AddFlight from '../pages/flight/add';

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login">
          <Route index element={<Login />} />
        </Route>
        <Route path="/">
          <Route path="/" element={<Main />}>
            <Route index element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="airline" element={<Airline />} />
            <Route path="airline/add" element={<AddAirline />} />
            <Route path="flight" element={<Flight />} />
            <Route path="flight/add" element={<AddFlight />} />
          </Route>
        </Route>
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
};
export default router;
