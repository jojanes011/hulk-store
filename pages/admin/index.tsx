import React from 'react';
import matchRoles from 'utils/matchRoles';

export async function getServerSideProps(context) {
  const { rejected, isPublic } = await matchRoles(context);
  return {
    props: { rejected, isPublic },
  };
}

const LandingAdmin = () => <div>LandingAdmin</div>;

export default LandingAdmin;
