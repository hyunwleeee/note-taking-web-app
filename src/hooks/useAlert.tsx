import { toast } from 'react-toastify';

const useAlert = () => {
  const alert = (content, type, options) => {
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

  return (content, type = 'error', options) => alert(content, type, options);
};

export default useAlert;
