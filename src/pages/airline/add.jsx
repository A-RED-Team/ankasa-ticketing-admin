import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
import swal from 'sweetalert2';
import { addAirline } from '../../redux/actions/addAirline';
import { toastr } from '../../utils/toast';

const add = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (name == null) {
      swal.fire({
        title: 'Error!',
        text: 'Name form cannot be empty',
        icon: 'error'
      });
    } else if (image == null) {
      swal.fire({
        title: 'Error!',
        text: 'Image form cannot be empty',
        icon: 'error'
      });
    } else {
      const data = new FormData();
      data.append('name', name);
      data.append('image', image);

      addAirline(data)
        .then((res) => {
          swal
            .fire({
              title: 'Success!',
              text: res.message,
              icon: 'success'
            })
            .then(() => {
              navigate('/airline');
            });
        })
        .catch((err) => {
          if (err.response.data.message == 'validation failed') {
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
        });
    }
  };

  useEffect(() => {
    document.title = `${APP_NAME} - Add Airline`;
  }, []);

  return (
    <>
      <ContentHeader title="Add Airline" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Add Airline</h3>
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
                        id="name"
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {/* /.form-group */}
                  </div>
                  <div className="col-md-6">
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
              {/* /.card-body */}
              <div className="card-footer">
                {loading ? (
                  <div className="card-footer">
                    <Link to="/airline" className="btn btn-secondary" disabled>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </Link>
                    <button type="submit" className="btn btn-primary ml-2" disabled>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="card-footer">
                    <Link to="/airline" className="btn btn-secondary">
                      <i className="fa fa-arrow-left"></i> Back
                    </Link>
                    <button type="submit" className="btn btn-primary ml-2">
                      <i className="fa fa-save"></i> Save
                    </button>
                  </div>
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
