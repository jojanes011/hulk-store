/* eslint-disable no-console */
/* eslint-disable no-restricted-imports */
/* eslint-disable import/extensions */
import prisma from '../config/prisma';
import role from './seeding_data/role';
import users from './seeding_data/users';
import page from './seeding_data/page';

async function main() {
  // crear role
  await Promise.all(
    role.map(async (r) => {
      await prisma.role.upsert({
        where: {
          name: r.name as any,
        },
        create: {
          name: r.name as any,
        },
        update: {
          name: r.name as any,
        },
      });
    })
  );
  // crear un usuario
  users.map(async (user) => {
    await prisma.user.upsert(user as any);
  });
  // crear paginas
  await prisma.page.deleteMany({});
  await Promise.all(
    page.map(async (pg) => {
      await prisma.page.upsert({
        where: {
          name: pg.name,
        },
        create: {
          name: pg.name,
          route: pg.route,
          roles: {
            connect: pg.roles.map((r) => ({ name: r as any })),
          },
          isPublic: pg.isPublic,
        },
        update: {
          name: pg.name,
          route: pg.route,
          roles: {
            connect: pg.roles.map((r) => ({ name: r as any })),
          },
          isPublic: pg.isPublic,
        },
      });
    })
  );
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;
