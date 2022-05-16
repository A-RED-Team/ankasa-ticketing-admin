import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
// import moment from 'moment';

import { getdetailFlight } from '../../redux/actions/detailFlight';

import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';

const view = () => {
  const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  // const [day, setDay] = useState('');
  // const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dispatch = useDispatch();
  const detailFlight = useSelector((state) => {
    return state.detailFlightReducer;
  });
  const { id } = useParams();
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
    dispatch(getdetailFlight(id));
  }, []);

  return (
    <>
      <ContentHeader title="View Flight" />
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
              <div className="card-body container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {detailFlight.isLoading ? (
                      <ContentLoader />
                    ) : detailFlight.isError ? (
                      <div>Error</div>
                    ) : (
                      <table className="col-md-12 mt-md-5 table-bordered text-capitalize text-center">
                        <thead>
                          <tr className="">
                            <th className="col-lg-6 col-md-6 col-sm-6 col-xs-6">Data</th>
                            <th className="col-lg-6 col-md-6 col-sm-6 col-xs-6">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Pilot In Command Name</td>
                            <td>{detailFlight?.data?.data?.picname}</td>
                          </tr>
                          <tr>
                            <td>Code</td>
                            <td>{detailFlight?.data?.data?.code}</td>
                          </tr>
                          <tr>
                            <td>Airlines Name</td>
                            <td>{detailFlight?.data?.data?.airlinesname}</td>
                          </tr>
                          <tr>
                            <td>Departure City</td>
                            <td>{detailFlight?.data?.data?.departurecityname}</td>
                          </tr>
                          <tr>
                            <td>Arrival City</td>
                            <td>{detailFlight?.data?.data?.arrivalcityname}</td>
                          </tr>
                          <tr>
                            <td>Departure Date</td>
                            <td>{detailFlight?.data?.data?.departuredate}</td>
                          </tr>
                          <tr>
                            <td>Departure time</td>
                            <td>{detailFlight?.data?.data?.departure_time}</td>
                          </tr>
                          <tr>
                            <td>Arrival time</td>
                            <td>{detailFlight?.data?.data?.arrival_time}</td>
                          </tr>
                          <tr>
                            <td>Class</td>
                            {detailFlight?.data?.data?.class == 0 ? (
                              <td>Economy</td>
                            ) : detailFlight?.data?.data?.class == 1 ? (
                              <td>Business</td>
                            ) : (
                              <td>First Class</td>
                            )}
                          </tr>
                          <tr>
                            <td>Type</td>
                            {detailFlight?.data?.data?.type == 0 ? (
                              <td>one way</td>
                            ) : (
                              <td>round Trip</td>
                            )}
                          </tr>
                          <tr>
                            <td>bench for adults</td>
                            <td>{detailFlight?.data?.data?.adult}</td>
                          </tr>
                          <tr>
                            <td>bench for child</td>
                            <td>{detailFlight?.data?.data?.child}</td>
                          </tr>
                          <tr>
                            <td>Stock</td>
                            <td>{detailFlight?.data?.data?.stock}</td>
                          </tr>
                          <tr>
                            <td>Transit</td>
                            {detailFlight?.data?.data?.direct == 1 ? (
                              <td>Direct</td>
                            ) : detailFlight?.data?.data?.transit == 1 ? (
                              <td>transit</td>
                            ) : detailFlight?.data?.data?.more_transit == 1 ? (
                              <td>transit 2+</td>
                            ) : (
                              <div></div>
                            )}
                          </tr>
                          <tr>
                            <td>luggage facilities</td>
                            {detailFlight?.data?.data?.luggage == 1 ? <td>Yes</td> : <td>No</td>}
                          </tr>
                          <tr>
                            <td>in-flight meal facilities</td>
                            {detailFlight?.data?.data?.meal == 1 ? <td>Yes</td> : <td>No</td>}
                          </tr>
                          <tr>
                            <td>wifi facilities</td>
                            {detailFlight?.data?.data?.wifi == 1 ? <td>Yes</td> : <td>No</td>}
                          </tr>
                          <tr>
                            <td>Price</td>
                            <td>{usd.format(detailFlight?.data?.data?.price)}</td>
                          </tr>
                          <tr>
                            <td>Rating</td>
                            <td>{detailFlight?.data?.data?.rating}</td>
                          </tr>
                          <tr>
                            <td>Total Reviewed</td>
                            <td>{detailFlight?.data?.data?.total_reviewed}</td>
                          </tr>
                          <tr>
                            <td>Status Flight</td>
                            {detailFlight?.data?.dat?.is_active == 1 ? (
                              <td>Active</td>
                            ) : (
                              <td>Non active</td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
                {/* /.row */}
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <Link to="/flight" className="btn btn-secondary">
                  <i className="fa fa-arrow-left"></i> Back
                </Link>
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
