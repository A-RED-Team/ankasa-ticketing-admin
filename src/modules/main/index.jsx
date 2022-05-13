import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { sleep } from '../../utils/helpers';
import { APP_NAME } from '../../helpers/env';
import BodyClassName from 'react-body-classname';
import ControlSidebar from './control-sidebar';
import Header from './header';
import MenuSidebar from './menu-sidebar';
import Footer from './footer';

import img from '../../assets/images/vector 3.png';

const index = () => {
  const location = useLocation();
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  const fetchProfile = async () => {
    try {
      await sleep(1000);
      setIsAppLoaded(true);
    } catch (error) {
      await sleep(1000);
      setIsAppLoaded(true);
    }
  };

  useEffect(() => {
    document.title = `${APP_NAME} - Dashboard Admin`;
    if (location.pathname === '/') {
      fetchProfile();
    }
  }, []);

  return (
    <BodyClassName className="hold-transition sidebar-mini">
      <div className="wrapper">
        {!isAppLoaded && (
          <div className="preloader flex-column justify-content-center align-items-center">
            <img
              className="animation__shake"
              src={img}
              alt="Ankasa Ticketing"
              height="60"
              width="60"
            />
          </div>
        )}

        <Header />

        <MenuSidebar />

        <div className="content-wrapper">
          <Outlet />
        </div>

        <ControlSidebar />
        <Footer />
      </div>
    </BodyClassName>
  );
};

export default index;
