import React, { useEffect } from 'react';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';
import swal from 'sweetalert2';
import { toastr } from '../../utils/toastr';

import { getAllAirline } from '../../redux/actions/allAirlane';
import { changeStatusAirline } from '../../redux/actions/statusAirline';
import { deleteAirline } from '../../redux/actions/deleteAirline';

import $ from 'jquery';
// import img from '../../assets/images/garuda.png';

const index = () => {
  const dispatch = useDispatch();
  const allAirline = useSelector((state) => {
    return state.allAirlineReducer;
  });
  useEffect(() => {
    document.title = `${APP_NAME} - Management Airline`;
    $(document).ready(function () {
      setTimeout(function () {
        $('#example1').DataTable();
      }, 1000);
    });

    dispatch(getAllAirline());
  }, []);
  const goNonActive = (e, id) => {
    e.preventDefault();
    swal
      .fire({
        title: 'Changed status airline',
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
            const res = await changeStatusAirline(id, {
              isActive: 0
            });
            swal
              .fire({
                title: 'Success!',
                text: res.message,
                icon: 'success'
              })
              .then(() => {
                dispatch(getAllAirline());
                // navigate('/airline');
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
        title: 'Changed status airline ',
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
            const res = await changeStatusAirline(id, { isActive: 1 });
            swal
              .fire({
                title: 'Success!',
                text: res.message,
                icon: 'success'
              })
              .then(() => {
                dispatch(getAllAirline());
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
            const res = await deleteAirline(id);
            swal
              .fire({
                title: 'Success!',
                text: res.message,
                icon: 'success'
              })
              .then(() => {
                dispatch(getAllAirline());
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
      <ContentHeader title="Airlines" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Management Airline</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <Link to="/airline/add" className="btn btn-primary mb-3">
                    <i className="fa fa-plus"></i> Add Airline
                  </Link>
                  {allAirline?.isLoading ? (
                    <ContentLoader />
                  ) : allAirline?.isError ? (
                    <div>Error</div>
                  ) : (
                    <table id="example1" className="table table-bordered table-striped table-hover">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allAirline?.data?.data?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>
                              <img
                                src={`${process.env.REACT_APP_PROD}uploads/airlines/${item?.image}`} // eslint-disable-line no-debugger
                                alt={`${item?.name}`}
                                onError={(e) => {
                                  e.target.src = `${process.env.REACT_APP_PROD}uploads/airlines/airlines-default.png`;
                                }}
                                style={{ width: '60px' }}
                              />
                            </td>
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
                                href={`airline/view/${item.id}`}>
                                <i className="fas fa-eye"></i>
                                View
                              </a>
                              <a
                                className="btn btn-info btn-sm ml-2"
                                href={`airline/edit/${item.id}`}>
                                <i className="fas fa-pencil-alt"></i>
                                Edit
                              </a>
                              {item.is_active == 1 ? (
                                <button
                                  className="btn btn-info btn-sm ml-2 bg-danger"
                                  onClick={(e) => {
                                    goNonActive(e, item.id);
                                  }}>
                                  <i className="fas fa-power-off"></i>
                                  Deactivate
                                </button>
                              ) : (
                                <button
                                  className="btn btn-info btn-sm ml-2 bg-success"
                                  onClick={(e) => {
                                    goActive(e, item.id, item.is_active);
                                  }}>
                                  <i className="fas fa-power-off"></i>
                                  Activate
                                </button>
                              )}

                              <button
                                className="btn btn-danger btn-sm ml-2"
                                onClick={(e) => {
                                  goDelete(e, item.id);
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
