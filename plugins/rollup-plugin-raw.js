import fsPromises from 'fs/promises';

function rawString() {
  return {
    name: 'rawString',
    async load(id) {
      if (!/\w+\?raw$/.test(id)) {
        return null;
      }

      const contetn = await fsPromises.readFile(id.slice(0, -4), 'utf-8');
      const code = `export default ${JSON.stringify(contetn)};`;

      return code;
    },
  };
}

export default rawString;
