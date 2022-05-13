import React, { useEffect } from 'react';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';
import { Link } from 'react-router-dom';

import $ from 'jquery';
import img from '../../assets/images/garuda.png';

const index = () => {
  useEffect(() => {
    document.title = `${APP_NAME} - Management Airline`;
    $(document).ready(function () {
      setTimeout(function () {
        $('#example1').DataTable();
      }, 1000);
    });
  }, []);

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
                      <tr>
                        <td>1</td>
                        <td>Garuda Indonesia</td>
                        <td>
                          <img src={img} alt="Garuda Indonesia" style={{ width: '60px' }} />
                        </td>
                        <td>
                          <span className="badge badge-pill badge-danger">Non Active</span>
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
                          <a className="btn btn-danger btn-sm ml-2" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Option</th>
                      </tr>
                    </tfoot>
                  </table>
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
