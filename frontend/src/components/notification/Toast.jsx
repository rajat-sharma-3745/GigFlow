import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import { TOAST_TYPES } from '../../utils/constants';

const Toast = ({ id, message, type }) => {
  const { removeToast } = useContext(NotificationContext);

  const icons = {
    [TOAST_TYPES.SUCCESS]: <CheckCircle className="w-5 h-5" />,
    [TOAST_TYPES.ERROR]: <AlertCircle className="w-5 h-5" />,
    [TOAST_TYPES.INFO]: <Info className="w-5 h-5" />,
    [TOAST_TYPES.WARNING]: <AlertTriangle className="w-5 h-5" />,
  };

  const styles = {
    [TOAST_TYPES.SUCCESS]: 'bg-green-50 text-green-800 border-green-200',
    [TOAST_TYPES.ERROR]: 'bg-red-50 text-red-800 border-red-200',
    [TOAST_TYPES.INFO]: 'bg-blue-50 text-blue-800 border-blue-200',
    [TOAST_TYPES.WARNING]: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${styles[type]} toast-enter`}>
      {icons[type]}
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={() => removeToast(id)}
        className="p-1 hover:bg-white/50 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts } = useContext(NotificationContext);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;