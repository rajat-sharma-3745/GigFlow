import { Bell } from 'lucide-react';
import { useState } from 'react';
import { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import NotificationDropdown from './NotificationDropdown';
import { useEffect } from 'react';
import { useRef } from 'react';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useContext(NotificationContext);
  const dropdownRef = useRef(null);

  const onClose = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={dropdownRef} className="relative" >
      <button
        onClick={(e) => setIsOpen(p=>!p)}
        className="cursor-pointer relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && <NotificationDropdown onClose={onClose} />}
    </div>
  );
};

export default NotificationBell;