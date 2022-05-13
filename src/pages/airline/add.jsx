import React, { useEffect } from 'react';
import { APP_NAME } from '../../helpers/env';
import ContentHeader from '../../components/content-header';

const add = () => {
  useEffect(() => {
    document.title = `${APP_NAME} - Add Airline`;
  }, []);

  return (
    <>
      <ContentHeader title="Add Airline" />
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* SELECT2 EXAMPLE */}
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">Add Airline</h3>

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
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                      />
                    </div>
                    {/* /.form-group */}
                  </div>
                  <div className="col-md-6">
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
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button type="submit" className="btn btn-secondary">
                  <i className="fa fa-arrow-left"></i> Back
                </button>
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

export default add;
