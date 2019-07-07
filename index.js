const fs = require("fs");
const path = require("path");
const gitBranch = require("git-branch");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const camelCase = require("lodash.camelcase");

const currentBranch = () => {
  try {
    return gitBranch.sync();
  } catch {
    return "_none_";
  }
};

const getOptions = ({
  prefix = ".",
  suffix = ".env",
  cwd = process.cwd()
} = {}) => ({
  prefix,
  suffix,
  cwd
});

function config(fallback, options) {
  const { prefix, suffix, cwd } = getOptions(options);
  const branch = currentBranch();
  let filePath = `${prefix}${branch}${suffix}`;
  if (!fs.existsSync(path.join(cwd, filePath))) {
    filePath = `${prefix}${fallback}${suffix}`;
  }
  const env = dotenv.config({
    path: path.join(cwd, filePath)
  });
  dotenvExpand(env);
  const { parsed } = env;
  return Object.keys(parsed).reduce(
    (vars, key) => ({
      ...vars,
      [camelCase(key)]: parsed[key]
    }),
    {}
  );
}

module.exports = config;
