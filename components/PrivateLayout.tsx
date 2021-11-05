import React, { useState, useEffect } from 'react';
import { ToastContext } from 'context/toast';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '@components/Sidebar';
import 'react-toastify/dist/ReactToastify.css';

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
          <Sidebar />
        </div>
        <div>
          {children}
          <ToastContainer />
        </div>
      </div>
    </ToastContext.Provider>
  );
};
export default Layout;
