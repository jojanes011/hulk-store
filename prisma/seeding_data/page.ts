const pages = [
  {
    name: 'Inicio',
    route: '/',
    roles: ['admin', 'customer'],
    isPublic: true,
  },
  {
    name: 'Perfil',
    route: '/profile',
    roles: ['admin', 'customer'],
    isPublic: false,
  },
  {
    name: 'Carrito',
    route: '/cart',
    roles: ['admin', 'customer'],
    isPublic: false,
  },
  {
    name: 'Confirmar compra',
    route: '/cart/confirm',
    roles: ['admin', 'customer'],
    isPublic: false,
  },
  {
    name: 'Compra',
    route: '/cart/confirm/[id]',
    roles: ['admin', 'customer'],
    isPublic: false,
  },
  {
    name: 'Administrar usuarios',
    route: '/admin/users',
    roles: ['admin'],
    isPublic: false,
  },
  {
    name: 'Administrar inventario',
    route: '/admin/inventory',
    roles: ['admin'],
    isPublic: false,
  },
];

export default pages;
