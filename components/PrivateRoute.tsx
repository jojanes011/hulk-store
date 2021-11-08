import { useSession, signIn } from 'next-auth/react';
import Loading from '@components/Loading';
import Layout from '@components/Layout';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children, rejected, isPublic }) => {
  const { data: session, status } = useSession({
    required: false,
  });
  const router = useRouter();
  if (status === 'loading') return <Loading open />;

  if (isPublic) return <Layout>{children}</Layout>;

  if (!session) {
    signIn('auth0');
    return <Loading open />;
  }

  if (!rejected) return <Layout>{children}</Layout>;

  return (
    <Layout>
      <div className='flex flex-col h-full items-center justify-items-center p-20 place-content-start sm:place-content-center text-primary space-y-8'>
        <i className='fas fa-lock text-9xl ' />
        <h1 className='text-3xl text-center'>
          No tienes autorización para ingresar a este sitio
        </h1>
        <button
          type='button'
          onClick={() => router.push('/')}
          className='p-8 w-auto sm:w-1/5 bg-primary text-white rounded-md'
        >
          Regresar al inicio
        </button>
      </div>
    </Layout>
  );
};

export default PrivateRoute;
