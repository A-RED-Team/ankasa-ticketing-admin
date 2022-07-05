import React, { useEffect, useState } from 'react';
import { APP_NAME } from '../../helpers/env';
import { Link } from 'react-router-dom';
import BodyClassName from 'react-body-classname';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { login } from '../../redux/actions/auth';
import { toastr } from '../../utils/toastr';
import jwt_decode from 'jwt-decode';

const index = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    document.title = `${APP_NAME} - Login Page`;
    if (token) {
      return navigate('/');
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.username === '' || form.password === '') {
      swal.fire({
        title: 'Error!',
        text: 'All field must be filled!',
        icon: 'error'
      });
    } else {
      setLoading(true);
      login(form)
        .then((res) => {
          const decoded = jwt_decode(res.token);

          if (decoded.level === 1) {
            localStorage.setItem('token', res.token);
            swal
              .fire({
                title: 'Success!',
                text: res.message,
                icon: 'success'
              })
              .then(() => {
                navigate('/');
              });
          } else {
            swal.fire({
              title: 'Error!',
              text: "You don't have access to this page",
              icon: 'error'
            });
          }
        })
        .catch((err) => {
          if (err.response.data.code === 422) {
            const error = err.response.data.error;
            error.map((e) => toastr(e, 'error'));
          } else {
            swal.fire({
              title: 'Error!',
              text: err.response.data.message,
              icon: 'error'
            });
          }
        })
        .finally(() => {
          setLoading(false);
          setForm({
            username: '',
            password: ''
          });
        });
    }
  };
  return (
    <BodyClassName className="hold-transition login-page">
      <div className="login-box" style={{ margin: '0 auto' }}>
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <Link to="/" className="h1">
              <b>Admin</b>
              <span>Ankasa</span>
            </Link>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form action="#" onSubmit={(e) => onSubmit(e)}>
              <div className="input-group mb-3">
                <input
                  type="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type={passwordVisibility ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="remember"
                      onChange={() => {
                        setPasswordVisibility(!passwordVisibility);
                      }}
                    />
                    <label htmlFor="remember">Show Password</label>
                  </div>
                </div>
                <div className="col-4">
                  {loading ? (
                    <button type="submit" className="btn btn-primary btn-block" disabled>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center mt-2 mb-3">
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
              </a>
            </div>

            <p className="mb-1">
              <a href="#">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="#" className="text-center">
                Register a new membership
              </a>
            </p>
          </div>
        </div>
      </div>
    </BodyClassName>
  );
};

export default index;
