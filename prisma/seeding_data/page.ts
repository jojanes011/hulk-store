const pages = [
  {
    name: 'Inicio',
    route: '/',
    roles: [],
    isPublic: true,
  },
  {
    name: 'Perfil',
    route: '/profile',
    roles: [],
    isPublic: false,
  },
  {
    name: 'Carrito',
    route: '/cart',
    roles: [],
    isPublic: false,
  },
  {
    name: 'Confirmar compra',
    route: '/cart/confirm',
    roles: [],
    isPublic: false,
  },
  {
    name: 'Compra',
    route: '/cart/confirm/[id]',
    roles: [],
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
