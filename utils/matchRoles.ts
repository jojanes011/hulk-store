import prisma from 'config/prisma';
import { getSession } from 'next-auth/react';

const matchRoles = async (context) => {
  let url = context.resolvedUrl;
  const { id } = context.query;
  if (id) {
    url = url.replace(id, '[id]');
  }
  const session: any = await getSession({ req: context.req });
  const currentPage = await prisma.page.findUnique({
    where: {
      route: url,
    },
  });

  const roles = await prisma.page.findFirst({
    where: {
      AND: {
        route: {
          equals: url,
        },
        roles: {
          some: {
            users: {
              some: {
                id: session?.user?.id,
              },
            },
          },
        },
      },
    },
  });
  return {
    rejected: !roles,
    isPublic: currentPage?.isPublic ?? false,
    name: currentPage?.name ?? null,
  };
};

export default matchRoles;
