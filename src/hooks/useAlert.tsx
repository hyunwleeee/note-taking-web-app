import { toast, ToastOptions } from 'react-toastify';

type AlertType = 'info' | 'success' | 'error';

const useAlert = () => {
  const alert = (
    content: string,
    type: AlertType = 'success',
    options?: ToastOptions
  ) => {
    switch (type) {
      case 'error':
        toast.error(content, { ...options });
        break;
      case 'info':
        toast.info(content, { icon: false });
        break;
      case 'success':
        toast.success(content);
        break;
    }
  };

  return alert;
};

export default useAlert;
