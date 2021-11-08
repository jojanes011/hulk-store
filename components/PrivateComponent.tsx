import { useSession } from 'next-auth/react';
import React from 'react';

const PrivateComponent = ({ roleList, children }) => {
  const [session]: any = useSession();
  const roleCheck = session?.user?.roles
    .map((r) => r.name)
    .filter((ru) => roleList.includes(ru));
  if (!roleCheck || roleCheck.length === 0) {
    return <></>;
  }
  return children;
};

export default PrivateComponent;
