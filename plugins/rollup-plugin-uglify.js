const uglify = require('uglify-js');

const defaultOptions = {
  output: {
    comments: 'some',
  },
  mangle: true,
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true,
    typeofs: false,
  },
};

function minify(userOptions = {}) {
  return {
    name: 'uglify',
    renderChunk(code) {
      const resultOptions = { ...defaultOptions, ...userOptions };
      const { banner, ...uglifyOptions } = resultOptions;
      const minified = uglify.minify(code, uglifyOptions);
      let resultCode = '';

      if (minified.error) {
        console.error(minified.error);
        return resultCode;
      }

      if (minified.warnings) {
        console.warn(minified.warnings);
      }

      if (banner) {
        resultCode = banner + minified.code;
      }

      return resultCode;
    },
  };
}

export default minify;
