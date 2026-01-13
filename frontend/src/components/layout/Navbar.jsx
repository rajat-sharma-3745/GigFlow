import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Briefcase, LogOut, LayoutDashboard, User, Search } from "lucide-react";
import NotificationBell from "../notification/NotificationBell";
import Button from "../common/Button";

const Navbar = () => {
  const { user, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
   <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200/60">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">

      <Link
        to={user ? '/home' : '/'}
        className="flex items-center gap-2 group shrink-0"
      >
        <div className="relative">
          <div className="bg-linear-to-r from-primary-600 to-primary-700 p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          {/* <span className="absolute -inset-1 rounded-xl bg-primary-500/20 blur opacity-0 group-hover:opacity-100 transition" /> */}
        </div>

        <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent tracking-tight">
          GigFlow
        </span>
      </Link>

      <div className="flex items-center gap-1 sm:gap-4">

        {user ? (
          <>
            <Link
              to="/home"
              title="Browse Gigs"
              className="group flex items-center gap-2 px-1 py-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              <Search className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
              <span className="hidden sm:inline text-gray-700 font-medium">
                Browse
              </span>
            </Link>

            <Link
              to="/dashboard"
              title="Dashboard"
              className="group flex items-center gap-2 px-1 py-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              <LayoutDashboard className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
              <span className="hidden sm:inline text-gray-700 font-medium">
                Dashboard
              </span>
            </Link>

            <div className="px-1">
              <NotificationBell />
            </div>

            <div className="flex items-center gap-2 pl-3 border-l">
              <div className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-gray-100 transition">
                <div className="w-8 h-8 bg-linear-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 cursor-pointer rounded-xl hover:bg-red-50 group transition"
              >
                <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
              </button>
            </div>
          </>
        ) : (
          <Button className="rounded-xl shadow-sm cursor-pointer" onClick={openAuthModal}>
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
