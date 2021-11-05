import Sidebar from '@components/Sidebar';

const PublicLayout = ({ children }) => (
  <div>
    <Sidebar />
    {children}
  </div>
);

export default PublicLayout;
