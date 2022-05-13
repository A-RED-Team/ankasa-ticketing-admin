import React, { useEffect } from 'react';
import ContentHeader from '../components/content-header';
import { APP_NAME } from '../helpers/env';

const NotFound = () => {
  useEffect(() => {
    document.title = `${APP_NAME} - Dashboard Admin`;
  }, []);

  return (
    <>
      <ContentHeader title="404 Error Page" />
      <section className="content">
        <div className="error-page">
          <h2 className="headline text-warning"> 404</h2>

          <div className="error-content">
            <h3>
              <i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.
            </h3>

            <p>
              We could not find the page you were looking for. Meanwhile, you may{' '}
              <a href="../../index.html">return to dashboard</a> or try using the search form.
            </p>

            <form className="search-form">
              <div className="input-group">
                <input type="text" name="search" className="form-control" placeholder="Search" />

                <div className="input-group-append">
                  <button type="submit" name="submit" className="btn btn-warning">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
              {/* /.input-group */}
            </form>
          </div>
          {/* /.error-content */}
        </div>
      </section>
    </>
  );
};

export default NotFound;
