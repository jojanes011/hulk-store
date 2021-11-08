import PrivateRoute from '@components/PrivateRoute';
import { SessionProvider } from 'next-auth/react';
import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import 'styles/globals.css';
import { CartContextProvider } from 'context/cart';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? 'https://hulk-store.vercel.app/api/graphql'
          : 'http://localhost:3000/api/graphql',
    }),
  ]),
});

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>{`${
          pageProps.name ?? 'Titulo Por Defecto'
        } | Hulk Store`}</title>
        <link rel='icon' href='/img/logo.png' />
      </Head>
      <ApolloProvider client={client}>
        <CartContextProvider>
          <PrivateRoute
            rejected={pageProps.rejected}
            isPublic={pageProps.isPublic}
          >
            <Component {...pageProps} />
          </PrivateRoute>
        </CartContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
