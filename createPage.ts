/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import mkdirp from 'mkdirp';
import getDirName from 'path';
import { exec } from 'child_process';

async function main() {
  const filePath = process.argv[2];
  const fileName = process.argv[3];
  const isPublic = process.argv[4] === 'true';
  const roles = process.argv.slice(5);

  const callback = (err) => {
    if (err) throw err;
    console.log('Página creada con éxito');
  };

  function writeFile(path, contents, cb) {
    mkdirp(getDirName.dirname(path), (err) => {
      if (err) return cb(err);
      fs.writeFile(path, contents, cb);
      return true;
    });
  }

  writeFile(
    `./pages/${filePath}/${fileName}.tsx`,
    `import React from 'react';
import matchRoles from 'utils/matchRoles';

export async function getServerSideProps(context) {
  const { rejected, isPublic, name } = await matchRoles(context);
  return {
    props: { rejected, isPublic, name },
  };
}

const ${fileName} = () => <div>${fileName}</div>;

export default ${fileName};
`,
    callback
  );

  fs.readFile('./prisma/seeding_data/page.ts', 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(
      `const pages = [`,
      `const pages = [
  {
    name: '${fileName}',
    route: '${filePath !== '/' ? '/' : ''}${filePath}',
    roles: [${roles.map((r) => `'${r}'`).join(', ')}],
    isPublic: ${isPublic},
  },`
    );

    fs.writeFile('./prisma/seeding_data/page.ts', result, 'utf8', (errW) => {
      if (err) return console.log(errW);
      return true;
    });

    return true;
  });

  exec('npx prisma db seed', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('success');
  });

export default main;
