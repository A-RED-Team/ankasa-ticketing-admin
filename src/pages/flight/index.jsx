import React, { useEffect } from 'react';
import { APP_NAME } from '../../helpers/env';
import { useSelector, useDispatch } from 'react-redux';
import ContentHeader from '../../components/content-header';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getAllFlight } from '../../redux/actions/allFlight';

import $ from 'jquery';
import ContentLoader from 'react-content-loader';

const index = () => {
  const dispatch = useDispatch();

  const allFlight = useSelector((state) => {
    return state.allFlightReducer;
  });
  useEffect(() => {
    document.title = `${APP_NAME} - Management Ticket`;
    $(document).ready(function () {
      setTimeout(function () {
        $('#example1').DataTable();
      }, 1000);
    });
    dispatch(getAllFlight());
    console.log(allFlight);
  }, []);

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
                  {allFlight.isLoading ? (
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
                            <td>{moment(item.departuredate).format('dddd,DD-MM-YYYY')}</td>
                            <td>{item.picname}</td>
                            <td>
                              {item.is_active == 1 ? (
                                <span className="badge badge-pill badge-success">Active</span>
                              ) : (
                                <span className="badge badge-pill badge-danger">Non Active</span>
                              )}
                            </td>
                            <td className="text-center">
                              <a className="btn btn-primary btn-sm" href="#">
                                <i className="fas fa-eye"></i>
                                View
                              </a>
                              <a className="btn btn-info btn-sm ml-2" href="#">
                                <i className="fas fa-pencil-alt"></i>
                                Edit
                              </a>
                              <div className="btn btn-info btn-sm ml-2">
                                <i className="fa-solid fa-power-off"></i>
                                Status
                              </div>
                              <a className="btn btn-danger btn-sm ml-2" href="#">
                                <i className="fas fa-trash"></i>
                                Delete
                              </a>
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
