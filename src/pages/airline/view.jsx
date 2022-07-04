import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
import ContentLoader from 'react-content-loader';
import { useDispatch, useSelector } from 'react-redux';
import { getdetailAirline } from '../../redux/actions/detailAirline';
import moment from 'moment';
import { Airline } from '../../assets/images/airline.png';

const view = () => {
  const dispatch = useDispatch();

  const detailAirline = useSelector((state) => {
    return state.detailAirlineReducer;
  });
  const { id } = useParams();

  useEffect(() => {
    document.title = `${APP_NAME} - View Airline`;
    dispatch(getdetailAirline(id));
  }, []);

  return (
    <>
      <ContentHeader title="View Airline" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">View Airline</h3>

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
            <div className="card-body container-fluid">
              <div className="row">
                <div className="col-md-12">
                  {detailAirline.isLoading ? (
                    <ContentLoader />
                  ) : detailAirline.isError ? (
                    <div>Error</div>
                  ) : (
                    <div className="col-md-12 text-center">
                      <img
                        src={`https://drive.google.com/uc?export=view&id=${detailAirline?.data?.data?.image}`}
                        className="card-img-top img-fluid"
                        onError={(e) => {
                          e.target.src = Airline;
                        }}
                        style={{
                          width: '30%'
                        }}
                        alt={`${detailAirline?.data?.data?.name}`}
                      />
                      <span>
                        <h1 className="card-text mt-4">{detailAirline?.data?.data?.name}</h1>{' '}
                        {detailAirline?.data?.data?.is_active == 1 ? (
                          <span className="badge badge-pill badge-success">Active</span>
                        ) : (
                          <span className="badge badge-pill badge-danger">Non Active</span>
                        )}
                      </span>
                      <table className="col-md-12 mt-md-5 table-bordered">
                        <thead>
                          <tr className="">
                            <th className="col-md-4">Created At</th>
                            <th className="col-md-4">Updated At</th>
                            <th className="col-md-4">Deleted At</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {moment(detailAirline?.data?.data?.created_at).format(
                                'dddd, DD-MMMM-YYYY'
                              )}
                            </td>
                            <td>
                              {detailAirline?.data?.data?.updated_at
                                ? moment(detailAirline?.data?.data?.updated_at).format(
                                    'dddd, DD-MMMM-YYYY'
                                  )
                                : 'none'}
                            </td>
                            <td>
                              {detailAirline?.data?.data?.deleted_at
                                ? moment(detailAirline?.data?.data?.deleted_at).format(
                                    'dddd, DD-MMMM-YYYY'
                                  )
                                : 'none'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                    />
                  </div> */}
                  {/* /.form-group */}
                </div>
                {/* <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="image" />
                        <label className="custom-file-label" htmlFor="image">
                          Choose file
                        </label>
                      </div>
                      <div className="input-group-append">
                        <span className="input-group-text">Upload</span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <Link to="/airline" className="btn btn-secondary">
                <i className="fa fa-arrow-left"></i> Back
              </Link>
            </div>
          </div>
          {/* /.card */}
        </div>
      </section>
    </>
  );
};

export default view;
