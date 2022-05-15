import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';

import swal from 'sweetalert2';
import { toastr } from '../../utils/toastr';
import ContentLoader from 'react-content-loader';
import { useDispatch, useSelector } from 'react-redux';
import { getdetailAirline } from '../../redux/actions/detailAirline';
import { updateAirline } from '../../redux/actions/updateAirline';

const edit = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const detailAirline = useSelector((state) => {
    return state.detailAirlineReducer;
  });
  const { id } = useParams();
  useEffect(() => {
    document.title = `${APP_NAME} - Edit Airline`;
    dispatch(getdetailAirline(id));
  }, []);
  useEffect(() => {
    if (detailAirline.data.data) {
      setName(detailAirline.data.data.name);
      setImage(detailAirline.data.data.image);
    }
  }, [detailAirline]);
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

      updateAirline(data, id)
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
            error.map((el) => toastr(el, 'error'));
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
  return (
    <>
      <ContentHeader title="Edit Airline" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Edit Airline</h3>

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
            {detailAirline.isLoading ? (
              <ContentLoader />
            ) : detailAirline.isError ? (
              <div>Error</div>
            ) : (
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
                          value={name || ''}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
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
                              onChange={(e) => {
                                setImage(e.target.files[0]);
                              }}
                            />
                            {image == detailAirline.data?.data?.image ? (
                              <label className="custom-file-label" htmlFor="image">
                                {detailAirline.data?.data?.image}
                              </label>
                            ) : (
                              <label className="custom-file-label" htmlFor="image">
                                {image?.name}
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
                      <i className="fa fa-pencil-alt"></i> Edit
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
          {/* /.card */}
        </div>
      </section>
    </>
  );
};

export default edit;
