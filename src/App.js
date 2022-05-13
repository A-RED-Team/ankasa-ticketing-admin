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
