import React from 'react';
import matchRoles from 'utils/matchRoles';

export async function getServerSideProps(context) {
  const { rejected, isPublic, name } = await matchRoles(context);
  return {
    props: { rejected, isPublic, name },
  };
}

const Home = () => <div>Home</div>;

export default Home;
