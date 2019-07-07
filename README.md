# git-env

Use dotfiles per git branch

## Setting up

Create an `env` file per flow branch. For example:

```
app
|- .dev.env
|- .qa.env
|- .master.env
```

Each of these should be a UTF8 [dotenv](https://github.com/motdotla/dotenv) file.

## Usage

You should probably create a top-level `env.js` that looks like so:

```js
module.exports = require("git-env")("dev");
```

The return value of this function is an object containing the parsed values from the `env` file, but the keys are camelCased.

The exported function from `git-env` accepts 2 paramters:

- **fallback branch** which will be the config loaded for every branch that doesn't have an `env` file (for example, if you branch out to a feature branch from dev). This should probably be your development branch's name.
- **options** which is an object:
  - `prefix` (defaults to `"."`) which is the part that comes before the branch name
  - `suffix` (defaults to `".env"`) which is the part that comes after the branch name
  - `cwd` (defaults to `process.cwd()`) which is the path `git-env` looks for the `env` files.

### Notes

If your directory doesn't have a `.git` directory (meaning it's not a git project), the branch name is `_none_`.
