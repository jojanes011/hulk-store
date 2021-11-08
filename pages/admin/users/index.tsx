import React from 'react';
import matchRoles from 'utils/matchRoles';

export async function getServerSideProps(context) {
  const { rejected, isPublic } = await matchRoles(context);
  return {
    props: { rejected, isPublic },
  };
}

const Users = () => <div>Users</div>;

export default Users;
