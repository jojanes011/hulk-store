const users = [
  {
    where: {
      email: 'jojanes011@gmail.com',
    },
    create: {
      name: 'Joan Oviedo',
      email: 'jojanes011@gmail.com',
      image:
        'https://s.gravatar.com/avatar/f04bb6129f53bef63dd289da7868259b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fds.png',
      enabled: true,
      roles: {
        connect: {
          name: 'admin',
        },
      },
      accounts: {
        createMany: {
          data: [
            {
              providerAccountId: 'auth0|6179ebbffe39bb00692a87bc',
              provider: 'auth0',
              type: 'oauth',
            },
          ],
        },
      },
    },
    update: {},
  },
];

export default users;
