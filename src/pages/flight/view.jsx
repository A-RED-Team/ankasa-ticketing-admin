import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
import 'moment';

import $ from 'jquery';

const view = () => {
  useEffect(() => {
    document.title = `${APP_NAME} - View Flight`;
    $(document).ready(function () {
      setTimeout(function () {
        // $('#datetimepicker1').tempusDominus();
        //Initialize Select2 Elements
        // $('.select2').select2();
        //Initialize Select2 Elements
        // $('.select2bs4').select2({
        //   theme: 'bootstrap4'
        // });
      }, 1000);
    });
  }, []);

  return (
    <>
      <ContentHeader title="Add Flight" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">View Flight</h3>

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
            <form>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Airline</label>
                      <select
                        className="form-control select2"
                        style={{ width: '100%', height: 'auto' }}>
                        <option selected="selected">Garuda Indonesia</option>
                        <option>Lion Air</option>
                        <option>Batik Air</option>
                      </select>
                    </div>
                    {/* /.form-group */}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="code">Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        placeholder="Enter code"
                      />
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Departure City</label>
                      <select
                        className="form-control select2"
                        style={{ width: '100%', height: 'auto' }}>
                        <option selected="selected">Jakarta</option>
                        <option>Tokyo</option>
                        <option>Barcelona</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Arrival City</label>
                      <select
                        className="form-control select2"
                        style={{ width: '100%', height: 'auto' }}>
                        <option selected="selected">Jakarta</option>
                        <option>Tokyo</option>
                        <option>Barcelona</option>
                      </select>
                    </div>
                  </div>
                  {/* /.col */}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Departure Time</label>
                      <div
                        className="input-group date"
                        id="reservationdate"
                        data-target-input="nearest">
                        <input
                          type="text"
                          className="form-control datetimepicker-input"
                          data-target="#reservationdate"
                        />
                        <div
                          className="input-group-append"
                          data-target="#reservationdate"
                          data-toggle="datetimepicker">
                          <div className="input-group-text">
                            <i className="fa fa-clock"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Arrival Time</label>
                      <div
                        className="input-group date"
                        id="reservationdate"
                        data-target-input="nearest">
                        <input
                          type="text"
                          className="form-control datetimepicker-input"
                          data-target="#reservationdate"
                        />
                        <div
                          className="input-group-append"
                          data-target="#reservationdate"
                          data-toggle="datetimepicker">
                          <div className="input-group-text">
                            <i className="fa fa-clock"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Departure Date</label>
                      <div
                        className="input-group date"
                        id="reservationdate"
                        data-target-input="nearest">
                        <input
                          type="text"
                          className="form-control datetimepicker-input"
                          data-target="#reservationdate"
                        />
                        <div
                          className="input-group-append"
                          data-target="#reservationdate"
                          data-toggle="datetimepicker">
                          <div className="input-group-text">
                            <i className="fa fa-calendar"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Class</label>
                      <select
                        className="form-control select2"
                        style={{ width: '100%', height: 'auto' }}>
                        <option selected="selected">Economy</option>
                        <option>Business</option>
                        <option>First Class</option>
                      </select>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        className="form-control select2"
                        style={{ width: '100%', height: 'auto' }}>
                        <option selected="selected">One Way</option>
                        <option>Round Trip</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="code">Adult</label>
                      <input
                        type="number"
                        className="form-control"
                        id="code"
                        placeholder="Enter adult"
                      />
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="code">Child</label>
                      <input
                        type="number"
                        className="form-control"
                        id="code"
                        placeholder="Enter child"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="code">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>PIC</label>
                      <select
                        className="form-control select2"
                        style={{ width: '100%', height: 'auto' }}>
                        <option selected="selected">Peter Parker</option>
                        <option>Max Smith</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Facilities</label>
                      <div className="form-group clearfix">
                        <div className="icheck-primary d-inline">
                          <input type="checkbox" id="checkboxPrimary1" />
                          <label htmlFor="checkboxPrimary1">Wifi</label>
                        </div>
                        <div className="icheck-primary d-inline ml-3">
                          <input type="checkbox" id="checkboxPrimary2" />
                          <label htmlFor="checkboxPrimary2">Luggage</label>
                        </div>
                        <div className="icheck-primary d-inline ml-3">
                          <input type="checkbox" id="checkboxPrimary3" />
                          <label htmlFor="checkboxPrimary3">Meal</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Transit</label>
                      <div className="form-group clearfix">
                        <div className="icheck-primary d-inline">
                          <input type="checkbox" id="checkboxPrimary1" />
                          <label htmlFor="checkboxPrimary1">Direct</label>
                        </div>
                        <div className="icheck-primary d-inline ml-3">
                          <input type="checkbox" id="checkboxPrimary2" />
                          <label htmlFor="checkboxPrimary2">Transit</label>
                        </div>
                        <div className="icheck-primary d-inline ml-3">
                          <input type="checkbox" id="checkboxPrimary3" />
                          <label htmlFor="checkboxPrimary3">Transit 2+</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.row */}
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <Link to="/flight" className="btn btn-secondary">
                  <i className="fa fa-arrow-left"></i> Back
                </Link>
                <button type="submit" className="btn btn-primary ml-2">
                  <i className="fa fa-save"></i> Save
                </button>
              </div>
            </form>
          </div>
          {/* /.card */}
        </div>
      </section>
    </>
  );
};

export default view;
