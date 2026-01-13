import Navbar from './Navbar';
import Footer from './Footer';
import ToastContainer from '../notification/Toast';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;