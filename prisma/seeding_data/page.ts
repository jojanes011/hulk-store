const pages = [
  {
    name: 'Landing Admin',
    route: '/admin',
    roles: ['admin'],
    isPublic: false,
  },
  {
    name: 'Home',
    route: '/',
    roles: ['admin', 'customer'],
    isPublic: true,
  },
];

export default pages;
