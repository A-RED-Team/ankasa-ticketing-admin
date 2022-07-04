import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
import Swal from 'sweetalert2';
import { store } from '../../redux/actions/city';
import { getListCountry } from '../../redux/actions/country';
import { toastr } from '../../utils/toastr';

const add = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listCountry } = useSelector((state) => state);
  const [form, setForm] = useState({
    countryId: '',
    cityName: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    document.title = `${APP_NAME} - Add City`;
    dispatch(getListCountry());
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { countryId, cityName } = form;

    if (!countryId || !cityName) {
      Swal.fire('Error!', 'All data must be filled', 'error');
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append('countryId', countryId);
      formData.append('cityName', cityName);
      if (image) {
        formData.append('image', image);
      }

      store(formData)
        .then((res) => {
          Swal.fire('Success!', res.message, 'success').then(() => navigate('/city'));
        })
        .catch((err) => {
          if (err.response.data.code == 422) {
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
      <ContentHeader title="Add City" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Add City</h3>
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
              {listCountry?.isLoading ? (
                <ContentLoader />
              ) : (
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cityName"
                          placeholder="Enter name"
                          value={form.cityName}
                          onChange={onChange}
                        />
                      </div>
                      {/* /.form-group */}
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Country</label>
                        <select
                          id="countryId"
                          value={form.countryId}
                          onChange={onChange}
                          className="form-control"
                          style={{ width: '100%', height: 'auto' }}>
                          <option value="">Select Country</option>
                          {listCountry?.data?.map((item, i) => (
                            <option className="col-md-6" key={i} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="image"
                              accept=".png, .jpg"
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                              }}
                            />
                            {image ? (
                              <label className="custom-file-label" htmlFor="image">
                                {image.name}
                              </label>
                            ) : (
                              <label className="custom-file-label" htmlFor="image">
                                Choose File
                              </label>
                            )}
                          </div>
                          <div className="input-group-append">
                            <span className="input-group-text">Upload</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
              )}

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
