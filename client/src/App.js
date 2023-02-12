import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import { Box } from '@mui/material'

//components
import Header from './Components/Header/Header';
import PrivateRoutes from './Components/PrivateRoutes';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import PaymentSuccess from './Components/PaymentOutcomes/PaymentSuccess';
import PaymentFailure from './Components/PaymentOutcomes/PaymentFailure';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <ToastContainer/>
          <Header />
          <Box style={{marginTop: 54}}>
            <Routes>
              <Route path= '/' element={<Home />} />
              <Route element={<PrivateRoutes/>}>
                <Route path= '/cart' element={<Cart />} />
              </Route>
              <Route path= '/product/:id' element={<DetailView />} />
              <Route path= '/paymentsuccess' element={<PaymentSuccess />} />
              <Route path= '/paymentfailure' element={<PaymentFailure />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
