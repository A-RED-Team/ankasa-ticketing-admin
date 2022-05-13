import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { sleep } from '../../utils/helpers';
import { APP_NAME } from '../../helpers/env';
import ControlSidebar from './control-sidebar';
import Header from './header';
import MenuSidebar from './menu-sidebar';
import Footer from './footer';

const index = () => {
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
    // addWindowClass('hold-transition sidebar-mini');
    // removeWindowClass('hold-transition login-page');

    fetchProfile();
    // return () => {
    //   removeWindowClass('hold-transition login-page');
    // };
  }, []);

  return (
    <div className="wrapper">
      {!isAppLoaded && (
        <div className="preloader flex-column justify-content-center align-items-center">
          <img
            className="animation__shake"
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTELogo"
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
  );
};

export default index;
