import { Slide, ToastContainer } from 'react-toastify';

import '@assets/styles/toastifyCustom.css';

const AlertComponent = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={40000000}
      hideProgressBar={false}
      transition={Slide}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
    />
  );
};

export default AlertComponent;
