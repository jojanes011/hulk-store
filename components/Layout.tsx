import React, { useState, useEffect } from 'react';
import { ToastContext } from 'context/toast';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '@components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@components/Footer';

const Layout = ({ children }) => {
  const [toastState, setToastState] = useState({
    message: '',
    type: '',
  });

  useEffect(() => {
    if (toastState.message !== '') {
      if (toastState.type === 'error') {
        toast.error(toastState.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (toastState.type === 'success') {
        toast.success(toastState.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  }, [toastState]);
  return (
    <ToastContext.Provider value={{ setToastState }}>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          {children}
          <ToastContainer />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </ToastContext.Provider>
  );
};
export default Layout;
