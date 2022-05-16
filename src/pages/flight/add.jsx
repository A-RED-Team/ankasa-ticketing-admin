import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';

import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAirline } from '../../redux/actions/allAirlane';
import ContentLoader from 'react-content-loader';
import { getAllCity } from '../../redux/actions/allCity';
import { getAllPic } from '../../redux/actions/allPic';

const add = () => {
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
    child: '',
    direct: '',
    transit: '',
    moreTransit: '',
    luggage: '',
    meal: '',
    wifi: '',
    price: '',
    idPic: '',
    luggageFac: '',
    mealFac: '',
    wifiFac: ''
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
        setLoading(true);
        dispatch(getAllAirline());
        dispatch(getAllCity());
        dispatch(getAllPic());
        setLoading(false);
        if (allAirline.isError == true || allCity.isError == true || allPic.isError == true) {
          SetErr(true);
        }
      }, 1000);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);

    const wifi = document.getElementById('checkboxPrimary1');
    const luggage = document.getElementById('checkboxPrimary2');
    const meal = document.getElementById('checkboxPrimary3');
    if (wifi.checked == true) {
      console.log('goblok');
      setLoading(true);
      setForm({ ...form, wifi: 1 });
    } else {
      console.log('blok');
      setLoading(true);
      setForm({ ...form, wifi: 0 });
    }
    setLoading(false);
    if (loading == false) {
      console.log(form);
    }
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
                          <option selected="selected" value={0}>
                            Economy
                          </option>
                          <option value={1}>Business</option>
                          <option value={2}>First Class</option>
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
                          <option selected="selected" value={0}>
                            One Way
                          </option>
                          <option value={1}>Round Trip</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="code">Adult</label>
                        <input
                          onChange={(e) => setForm({ ...form, adult: e.target.value })}
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
                          onChange={(e) => setForm({ ...form, child: e.target.value })}
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
                          onChange={(e) => setForm({ ...form, price: e.target.value })}
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
                          onChange={(e) => setForm({ ...form, idPic: e.target.value })}
                          className="form-control select2"
                          style={{ width: '100%', height: 'auto' }}>
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
                              onChange={(e) => setForm({ ...form, wifiFac: e.target.checked })}
                            />
                            <label htmlFor="checkboxPrimary1">Wifi</label>
                          </div>
                          <div className="icheck-primary d-inline ml-3">
                            <input
                              type="checkbox"
                              id="checkboxPrimary2"
                              onChange={(e) => setForm({ ...form, luggageFac: e.target.checked })}
                            />
                            <label htmlFor="checkboxPrimary2">Luggage</label>
                          </div>
                          <div className="icheck-primary d-inline ml-3">
                            <input
                              type="checkbox"
                              id="checkboxPrimary3"
                              onChange={(e) => setForm({ ...form, mealFac: e.target.checked })}
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
                            <input type="radio" id="radioPrimary1" name="r1" />
                            <label htmlFor="radioPrimary1">Direct</label>
                          </div>
                          <div className="icheck-primary d-inline ml-3">
                            <input type="radio" id="radioPrimary2" name="r1" />
                            <label htmlFor="radioPrimary2">Transit</label>
                          </div>
                          <div className="icheck-primary d-inline ml-3">
                            <input type="radio" id="radioPrimary3" name="r1" />
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
                  <Link to="/flight" className="btn btn-secondary">
                    <i className="fa fa-arrow-left"></i> Back
                  </Link>
                  <button type="submit" className="btn btn-primary ml-2">
                    <i className="fa fa-save"></i> Save
                  </button>
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
