import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import commonjs from "rollup-plugin-commonjs";

const extensions = [".js", ".jsx"];

module.exports = {
  input: "./src/index.js",
  output: {
    format: "cjs",
    sourcemap: true,
    dir: "./dist/",
    preserveModules: true,
    globals: {
      react: "React",
    },
    exports: "auto",
  },
  plugins: [
    babel({
      extensions,
      include: ["./src/**"],
      exclude: "node_modules/**",
    }),
    commonjs({ extensions }),
    uglify(),
  ],
  external: [/@material-ui.*/, "prop-types", "react", "react-smooth-dnd"],
};
