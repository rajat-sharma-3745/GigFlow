import { useContext, useEffect, useRef } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import { formatRelativeTime } from '../../utils/helpers';
import { CheckCheck } from 'lucide-react';

const NotificationDropdown = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useContext(NotificationContext);
  

  return (
    <div
      className="absolute sm:right-0 -right-16 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 animate-slide-down"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-gray-900">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm cursor-pointer text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.slice(0,5).map((notification) => (
            <div
              key={notification.id || notification._id}
              onClick={() => !notification.isRead && markAsRead(notification.id || notification._id)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-400 mt-2 block">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;