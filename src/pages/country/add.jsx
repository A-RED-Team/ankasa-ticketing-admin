import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
import Swal from 'sweetalert2';
import { store } from '../../redux/actions/country';
import { toastr } from '../../utils/toastr';

const add = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nameCountry: '',
    aliasCountry: ''
  });
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    document.title = `${APP_NAME} - Add Country`;
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.nameCountry || !form.aliasCountry) {
      Swal.fire('Error!', 'All data must be filled', 'error');
    } else {
      setLoading(true);

      store(form)
        .then((res) => {
          Swal.fire('Success!', res.message, 'success').then(() => navigate('/country'));
        })
        .catch((err) => {
          if (err.response.data.message == 'validation failed') {
            const error = err.response.data.error;
            error.map((e) => toastr(e, 'error'));
          } else {
            Swal.fire('Error!', err.response.data.message, 'error');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <ContentHeader title="Add Country" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Add Country</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus"></i>
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="maximize">
                  <i className="fas fa-expand"></i>
                </button>
              </div>
            </div>
            {/* /.card-header */}
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameCountry"
                        placeholder="Enter name"
                        value={form.nameCountry}
                        onChange={onChange}
                      />
                    </div>
                    {/* /.form-group */}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Alias</label>
                      <input
                        type="text"
                        className="form-control"
                        id="aliasCountry"
                        placeholder="Enter Alias"
                        value={form.aliasCountry}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <Link to="/airline" className="btn btn-secondary">
                  <i className="fa fa-arrow-left"></i> Back
                </Link>
                {loading ? (
                  <button type="submit" className="btn btn-primary ml-2" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary ml-2">
                    <i className="fa fa-save"></i> Save
                  </button>
                )}
              </div>
            </form>
          </div>
          {/* /.card */}
        </div>
      </section>
    </>
  );
};

export default add;
