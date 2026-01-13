import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Briefcase, LogOut, LayoutDashboard, User } from 'lucide-react';
import NotificationBell from '../notification/NotificationBell';
import Button from '../common/Button';

const Navbar = () => {
  const { user, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? '/home' : '/'} className="flex items-center gap-2 group">
            <div className="bg-linear-to-r from-primary-600 to-primary-700 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              GigFlow
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/home"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Browse Gigs
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <NotificationBell />

                <div className="flex items-center gap-3 pl-4 border-l">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-linear-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </>
            ) : (
              <Button onClick={openAuthModal}>
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;