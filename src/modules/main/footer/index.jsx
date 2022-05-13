import React from 'react';
import { APP_NAME, APP_VERSION } from '../../../helpers/env';

const index = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="main-footer">
        {/* To the right */}
        <div className="float-right d-none d-sm-inline">
          {APP_NAME} {APP_VERSION}
        </div>
        {/* Default to the left */}
        <strong>
          Copyright &copy; 2022 <a href="#">Team Hore</a>.
        </strong>{' '}
        All rights reserved.
      </footer>
    </>
  );
};

export default index;
