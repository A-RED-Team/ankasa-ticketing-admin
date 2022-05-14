import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Router from './router';

// REQUIRED SCRIPTS
// jQuery
import 'admin-lte/plugins/jquery/jquery.min.js';
// Bootstrap 4
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
// AdminLTE App
import 'admin-lte/dist/js/adminlte.min.js';

// DATATABLES
import 'admin-lte/plugins/datatables/jquery.dataTables.min.js';
import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import 'admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';

// Select2
import 'admin-lte/plugins/select2/js/select2.full.min.js';

// InputMask
// import 'admin-lte/plugins/moment/moment.min.js';
import 'moment';
import 'admin-lte/plugins/inputmask/jquery.inputmask.min.js';

// Tempusdominus Bootstrap 4
// import 'admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
