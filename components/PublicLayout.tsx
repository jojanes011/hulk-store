import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

const PublicLayout = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default PublicLayout;
