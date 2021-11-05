import { useSession, signIn } from 'next-auth/react';
import Loading from '@components/Loading';
import PublicLayout from '@components/PublicLayout';
import PrivateLayout from '@components/PrivateLayout';

const PrivateRoute = ({ children, rejected, isPublic }) => {
  const { data: session, status } = useSession({
    required: false,
  });

  if (status === 'loading') return <Loading />;

  if (isPublic) return <PublicLayout>{children}</PublicLayout>;

  if (!session) {
    signIn('auth0');
    return <Loading />;
  }

  if (!rejected) return <PrivateLayout>children</PrivateLayout>;

  return <div>No tienes autorización para ver este sitio</div>;
};

export default PrivateRoute;
