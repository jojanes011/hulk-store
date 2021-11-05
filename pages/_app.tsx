import PrivateRoute from '@components/PrivateRoute';
import { SessionProvider } from 'next-auth/react';
import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import 'styles/globals.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? 'https://urldelaapp.com/api/graphql'
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
        <PrivateRoute
          rejected={pageProps.rejected}
          isPublic={pageProps.isPublic}
        >
          <Component {...pageProps} />
        </PrivateRoute>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
