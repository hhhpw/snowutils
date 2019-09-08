import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import * as meta from "./package.json";

const config = {
  input: "index.js",
  output: {
    file: `lib/${meta.name}.js`,
    name: "snowutils",
    format: "umd",
    indent: false,
    extend: true,
    banner: `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author}`,
  },
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      file: `lib/${meta.name}.min.js`
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
        babelrc: false,
        presets: [['@babel/env', { modules: false }]],
      }),
      terser({
        output: {
          preamble: config.output.banner
        }
      })
    ]
  }
];
