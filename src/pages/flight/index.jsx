import React, { useEffect, useState } from 'react';
import { APP_NAME } from '../../helpers/env';
import { useSelector, useDispatch } from 'react-redux';
import ContentHeader from '../../components/content-header';
import { Link } from 'react-router-dom';
// import moment from 'moment';

import { getAllFlight } from '../../redux/actions/allFlight';

import $ from 'jquery';
import ContentLoader from 'react-content-loader';
import { changeStatusFlight } from '../../redux/actions/statusFlight';
import swal from 'sweetalert2';
import { toastr } from '../../utils/toastr';
import { deleteFlight } from '../../redux/actions/deleteFlight';

const index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const allFlight = useSelector((state) => {
    return state.allFlightReducer;
  });

  useEffect(() => {
    document.title = `${APP_NAME} - Management Ticket`;
    dispatch(getAllFlight());
  }, []);

  useEffect(() => {
    $(document).ready(function () {
      setTimeout(() => {
        $('#example1').DataTable();
      }, 1000);
    });
  }, [allFlight]);
  useEffect(() => {
    if (allFlight.data.data) {
      setLoading(false);
    }
  }, [allFlight]);
  const goNonActive = (e, id) => {
    e.preventDefault();
    swal
      .fire({
        title: 'Changed status Flight',
        text: 'Are you sure to change the status to non active ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I Sure!'
      })
      .then(async (nonActivated) => {
        if (nonActivated.isConfirmed) {
          try {
            const res = await changeStatusFlight(id, {
              isActive: 0
            });
            dispatch(getAllFlight());
            swal.fire({
              title: 'Success!',
              text: res.message,
              icon: 'success'
            });
          } catch (err) {
            if (err.response.data.message === 'validation failed') {
              const error = err.response.data.error;
              error.map((e) => toastr(e, 'error'));
            } else {
              swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error'
              });
            }
          }
        }
      });
  };

  const goActive = (e, id) => {
    e.preventDefault();
    swal
      .fire({
        title: 'Changed status Flight',
        text: 'Are you sure to change the status to active ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I sure'
      })
      .then(async (activated) => {
        if (activated.isConfirmed) {
          try {
            const res = await changeStatusFlight(id, { isActive: 1 });
            dispatch(getAllFlight());
            swal.fire({
              title: 'Success!',
              text: res.message,
              icon: 'success'
            });
          } catch (err) {
            if (err.response.data.message === 'validation failed') {
              const error = err.response.data.error;
              error.map((e) => toastr(e, 'error'));
            } else {
              swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error'
              });
            }
          }
        }
      });
  };
  const goDelete = (e, id) => {
    e.preventDefault();
    swal
      .fire({
        title: 'Delete Airline',
        text: 'Are you sure to delete this airline ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I sure'
      })
      .then(async (deleted) => {
        if (deleted.isConfirmed) {
          try {
            const res = await deleteFlight(id);
            dispatch(getAllFlight());
            swal.fire({
              title: 'Success!',
              text: res.message,
              icon: 'success'
            });
          } catch (err) {
            if (err.response.data.message === 'validation failed') {
              const error = err.response.data.error;
              error.map((e) => toastr(e, 'error'));
            } else {
              swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error'
              });
            }
          }
        }
      });
  };
  return (
    <>
      <ContentHeader title="Flight" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Management Flight</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <Link to="/flight/add" className="btn btn-primary mb-3">
                    <i className="fa fa-plus"></i> Add Flight
                  </Link>
                  {loading ? (
                    <ContentLoader />
                  ) : allFlight.isError ? (
                    <div>Error</div>
                  ) : (
                    <table id="example1" className="table table-bordered table-striped table-hover">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Departure Date</th>
                          <th>PIC</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allFlight.data?.data?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.airlinesname}</td>
                            <td>{item.departuredate}</td>
                            <td>{item.picname}</td>
                            <td>
                              {item.is_active == 1 ? (
                                <span className="badge badge-pill badge-success">Active</span>
                              ) : (
                                <span className="badge badge-pill badge-danger">Non Active</span>
                              )}
                            </td>
                            <td className="text-center">
                              <a
                                className="btn btn-primary btn-sm"
                                href={`flight/view/${item.flightid}`}>
                                <i className="fas fa-eye"></i>
                                View
                              </a>
                              <a
                                className="btn btn-info btn-sm ml-2"
                                href={`flight/edit/${item.flightid}`}>
                                <i className="fas fa-pencil-alt"></i>
                                Edit
                              </a>
                              {item.is_active == 1 ? (
                                <button
                                  className="btn btn-info btn-sm ml-2 bg-danger "
                                  onClick={(e) => {
                                    goNonActive(e, item.flightid);
                                  }}>
                                  <i className="fas fa-power-off"></i>
                                  Deactivate
                                </button>
                              ) : (
                                <button
                                  className="btn btn-info btn-sm ml-2 bg-success "
                                  onClick={(e) => {
                                    goActive(e, item.flightid, item.is_active);
                                  }}>
                                  <i className="fas fa-power-off"></i>
                                  Activate
                                </button>
                              )}
                              <button
                                className="btn btn-danger btn-sm ml-2"
                                onClick={(e) => {
                                  goDelete(e, item.flightid);
                                }}>
                                <i className="fas fa-trash"></i>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                  )}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </>
  );
};

export default index;
