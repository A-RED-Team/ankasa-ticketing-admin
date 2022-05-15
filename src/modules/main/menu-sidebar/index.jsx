import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailUser } from '../../../redux/actions/user';
import jwt_decode from 'jwt-decode';
import { APP_STAGING, APP_DEV, APP_PROD } from '../../../helpers/env';
import img from '../../../assets/images/vector 3.png';

const index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);

  useEffect(() => {
    if (decoded) {
      dispatch(getDetailUser(decoded.id));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    return navigate('/login');
  };

  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img
            src={img}
            alt="Ankasa Ticketing"
            className="brand-image elevation-3"
            style={{ opacity: '.8' }}
          />
          <span className="brand-text font-weight-light">Admin Ankasa</span>
        </Link>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={`${
                  APP_STAGING === 'dev'
                    ? `${APP_DEV}uploads/users/${user.data?.photo}`
                    : `${APP_PROD}uploads/users/${user.data?.photo}`
                }`}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {user.data?.username}
              </a>
            </div>
          </div>

          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
              <li className="nav-item">
                <Link
                  to="/"
                  className={`${location.pathname === '/' ? 'nav-link active' : 'nav-link'}`}>
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p> Dashboard</p>
                </Link>
              </li>
              <li className="nav-header">MANAGEMENT</li>
              <li className="nav-item">
                <Link
                  to="/airline"
                  className={`${
                    location.pathname.includes('/airline') ? 'nav-link active' : 'nav-link'
                  }`}>
                  <i className="nav-icon fas fa-plane"></i>
                  <p> Airline</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/flight"
                  className={`${
                    location.pathname.includes('/flight') ? 'nav-link active' : 'nav-link'
                  }`}>
                  <i className="nav-icon fas fa-plane-departure"></i>
                  <p> Flight</p>
                </Link>
              </li>
              <li className="nav-header">LOGOUT</li>
              <li className="nav-item">
                <a onClick={logout} className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p> Logout</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
};

export default index;
