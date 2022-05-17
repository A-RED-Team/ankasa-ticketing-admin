import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
import swal from 'sweetalert2';
import { toastr } from '../../utils/toastr';

import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAirline } from '../../redux/actions/allAirlane';
import ContentLoader from 'react-content-loader';
import { getAllCity } from '../../redux/actions/allCity';
import { getAllPic } from '../../redux/actions/allPic';
import { addFlight } from '../../redux/actions/addFlight';

const add = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    airlineId: '',
    departureCity: '',
    arrivalCity: '',
    departureTime: '',
    arrivalTime: '',
    code: '',
    classs: '',
    type: '',
    departureDate: '',
    adult: '',
    child: 0,
    direct: 0,
    transit: 0,
    moreTransit: 0,
    luggage: 0,
    meal: 0,
    wifi: 0,
    price: '',
    idPic: ''
  });

  const [loading, setLoading] = useState(false);
  const [err, SetErr] = useState(false);
  const dispatch = useDispatch();
  const allAirline = useSelector((state) => {
    return state.allAirlineReducer;
  });
  const allCity = useSelector((state) => {
    return state.allCityReducer;
  });
  const allPic = useSelector((state) => {
    return state.allPicReducer;
  });
  // const dateNow = new Date().toIsoString().split('T')[0];
  useEffect(() => {
    document.title = `${APP_NAME} - Add Flight`;
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

  useEffect(() => {
    setLoading(true);
    dispatch(getAllAirline());
    dispatch(getAllCity());
    dispatch(getAllPic());
    setLoading(false);
    if (allAirline.isError == true || allCity.isError == true || allPic.isError == true) {
      SetErr(true);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.airlineId == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Please Select Airline',
        icon: 'error'
      });
    }
    if (form.code == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Code form cannot be empty',
        icon: 'error'
      });
    }
    if (form.departureCity == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Please Select Departure City',
        icon: 'error'
      });
    }
    if (form.arrivalCity == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Please Select Arrival City',
        icon: 'error'
      });
    }
    if (form.departureCity == form.arrivalCity) {
      return swal.fire({
        title: 'Error!',
        text: 'Departure city and arrival city cannot be the same',
        icon: 'error'
      });
    }
    if (form.departureTime == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Departure time cannot be empty',
        icon: 'error'
      });
    }
    if (form.arrivalTime == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Arrival Time cannot be empty',
        icon: 'error'
      });
    } // prettier-ignore
    if (form.departureDate == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Departure Date cannot be empty',
        icon: 'error'
      });
    } // prettier-ignore
    if (form.classs == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Please select class',
        icon: 'error'
      });
    } // prettier-ignore
    if (form.type == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Please select type',
        icon: 'error'
      });
    }

    if (form.adult == '') {
      return swal.fire({
        title: 'Error!',
        text: 'Adult form cannot be empty',
        icon: 'error'
      });
    }
    if (form.adult == 0) {
      return swal.fire({
        title: 'Error!',
        text: `Adult can't be zero`,
        icon: 'error'
      });
    }
    if (form.adult <= 0) {
      return swal.fire({
        title: 'Error!',
        text: `Cannot set adult to negative number`,
        icon: 'error'
      });
    }
    if (form.child <= 0) {
      return swal.fire({
        title: 'Error!',
        text: `Cannot set child to negative number`,
        icon: 'error'
      });
    }
    if (form.price == '') {
      return swal.fire({
        title: 'Error!',
        text: `Price form cannot be empty`,
        icon: 'error'
      });
    }
    if (form.idPic == '') {
      return swal.fire({
        title: 'Error!',
        text: `Select pic please`,
        icon: 'error'
      });
    }
    if (form.moreTransit==0&&form.transit==0&&form.direct==0) {
      return swal.fire({
        title: 'Error!',
        text: `Select one of direct or transit or more transit`,
        icon: 'error'
      });
    } // prettier-ignore
    setLoading(true);
    addFlight(form)
      .then((res) => {
        swal
          .fire({
            title: 'Success!',
            text: res.message,
            icon: 'success'
          })
          .then(() => {
            navigate('/flight');
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
        setForm({
          ...form,
          direct: 0,
          transit: 0,
          moreTransit: 0,
          luggage: 0,
          meal: 0,
          wifi: 0
        });
        setLoading(false);
      });
  };

  return (
    <>
      <ContentHeader title="Add Flight" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Add Flight</h3>

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
            {loading ? (
              <ContentLoader />
            ) : err ? (
              <div>Error</div>
            ) : (
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Airline</label>
                        <select
                          onChange={(e) => setForm({ ...form, airlineId: e.target.value })}
                          className="form-control select2"
                          style={{ width: '100%', height: 'auto' }}>
                          <option value="">Select Airline</option>
                          {allAirline.data?.data?.map((item, i) => (
                            <option className="col-md-6" key={i} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* /.form-group */}
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="code">Code</label>
                        <input
                          onChange={(e) => setForm({ ...form, code: e.target.value })}
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
                          onChange={(e) => setForm({ ...form, departureCity: e.target.value })}
                          style={{ width: '100%', height: 'auto' }}>
                          <option value="">Departure City</option>
                          {allCity.data?.data?.map((item, i) => (
                            <option className="col-md-6" key={i} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Arrival City</label>
                        <select
                          onChange={(e) => setForm({ ...form, arrivalCity: e.target.value })}
                          className="form-control select2"
                          style={{ width: '100%', height: 'auto' }}>
                          <option value="">Arrival City</option>
                          {allCity.data?.data?.map((item, i) => (
                            <option className="col-md-6" key={i} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* /.col */}

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Departure Time</label>
                        <input
                          type="time"
                          className="form-control"
                          name=""
                          id=""
                          onChange={(e) => setForm({ ...form, departureTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Arrival Time</label>
                        <input
                          type="time"
                          className="form-control"
                          name=""
                          id=""
                          onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
                        />
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Departure Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name=""
                          id=""
                          onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Class</label>
                        <select
                          className="form-control select2"
                          onChange={(e) => setForm({ ...form, classs: e.target.value })}
                          style={{ width: '100%', height: 'auto' }}>
                          <option value="">Class</option>
                          <option selected="selected" value="0">
                            Economy
                          </option>
                          <option value="1">Business</option>
                          <option value="2">First Class</option>
                        </select>
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Type</label>
                        <select
                          onChange={(e) => setForm({ ...form, type: e.target.value })}
                          className="form-control select2"
                          style={{ width: '100%', height: 'auto' }}>
                          <option value="">Type</option>
                          <option selected="selected" value="0">
                            One Way
                          </option>
                          <option value="1">Round Trip</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="code">Adult</label>

                        <input
                          onChange={(e) => {
                            const adult = parseInt(e.target.value);
                            setForm({ ...form, adult: adult });
                          }}
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
                          onChange={(e) => {
                            const child = parseInt(e.target.value);
                            setForm({ ...form, child: child });
                          }}
                          type="number"
                          className="form-control"
                          id="code"
                          placeholder="Enter child"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <option value="">Price</option>
                        <input
                          onChange={(e) => setForm({ ...form, price: e.target.value })}
                          type="number"
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
                          onChange={(e) => setForm({ ...form, idPic: e.target.value })}
                          className="form-control select2"
                          style={{ width: '100%', height: 'auto' }}>
                          <option value="">PIC</option>

                          {allPic.data?.data?.map((item, i) => (
                            <option className="col-md-6" key={i} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Facilities</label>
                        <div className="form-group clearfix">
                          <div className="icheck-primary d-inline">
                            <input
                              type="checkbox"
                              id="checkboxPrimary1"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setForm({ ...form, wifi: '1' });
                                } else {
                                  setForm({ ...form, wifi: '0' });
                                }
                              }}
                            />
                            <label htmlFor="checkboxPrimary1">Wifi</label>
                          </div>
                          <div className="icheck-primary d-inline ml-3">
                            <input
                              type="checkbox"
                              id="checkboxPrimary2"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setForm({ ...form, luggage: '1' });
                                } else {
                                  setForm({ ...form, luggage: '0' });
                                }
                              }}
                            />
                            <label htmlFor="checkboxPrimary2">Luggage</label>
                          </div>
                          <div className="icheck-primary d-inline ml-3">
                            <input
                              type="checkbox"
                              id="checkboxPrimary3"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setForm({ ...form, meal: '1' });
                                } else {
                                  setForm({ ...form, meal: '0' });
                                }
                              }}
                            />
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
                            <input
                              type="radio"
                              id="radioPrimary1"
                              name="r1"
                              onChange={() => {
                                setForm({ ...form, direct: 1 });
                              }}
                            />
                            <label htmlFor="radioPrimary1">Direct</label>
                          </div>
                          <div className="icheck-primary d-inline ml-3">
                            <input
                              type="radio"
                              id="radioPrimary2"
                              name="r1"
                              onChange={() => {
                                setForm({ ...form, transit: 1 });
                              }}
                            />
                            <label htmlFor="radioPrimary2">Transit</label>
                          </div>
                          <div className="icheck-primary d-inline ml-3">
                            <input
                              type="radio"
                              id="radioPrimary3"
                              name="r1"
                              onChange={() => {
                                setForm({ ...form, moreTransit: 1 });
                              }}
                            />
                            <label htmlFor="radioPrimary3">Transit 2+</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.row */}
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  {loading ? (
                    <div className="card-footer">
                      <Link to="/flight" className="btn btn-secondary" disabled>
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
                      <Link to="/flight" className="btn btn-secondary">
                        <i className="fa fa-arrow-left"></i> Back
                      </Link>
                      <button type="submit" className="btn btn-primary ml-2">
                        <i className="fa fa-save"></i> Save
                      </button>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
          {/* /.card */}
        </div>
      </section>
    </>
  );
};

export default add;