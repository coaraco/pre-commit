# pre-commit

This package has some predefined hooks to do some pre-commit scripts that help in some of the typical developer flow.

## Install

You should install like a develop npm dependency and you should install too a husky package

```bash
npm i @coara/pre-commit husky -D
```

## Before continue

 1. We need to create a `.husky` folder on our project root
 1. Add `prepare` script to our `package.json` file (`"prepare": "husky install",`)
 1. Run `npm run prepare`

Inside our `.husky` folder we should add as many hooks as we want, every hook is an executable file and its name is the triggering hook, here an example with a pre-commit message to link your Jira issues with your branches.

```
└── .husky
   └── commit-msg
```

And here is the `commit-msg` file content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run coara-pre-commit link-jira-issue $1
```

## How this works

### Link jira issues

This command will add your Jira issue to the message commit trying to find on the branch name the key of your project followed by the number of the issue, your branch should look like `feature/MYPROJECTKEY-12123-some-amazing-stuff`.
To trigger this script the command should be like the next:

```bash
npm run coara-pre-commit link-jira-issue $1
```

This command always should be triggered by the `commit-msg` hook from husky.
Your configuration should like:

```
└── .husky
   └── commit-msg
```

And here is the `commit-msg` file content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run coara-pre-commit link-jira-issue $1
```

### Prettier on pre-commit

To auto fix the staged files with prettier you can add the command `coara-pre-commit lint-staged-prettier`. This command applies your prettier config and auto fix the files that match with your pattern. If you don't add any pattern they apply a default one.
To can execute correctly this command you should have a prettier config file and the [lint-staged](https://github.com/okonet/lint-staged).
Our recommendation for the prettier config file is to use the [@coara/prettier-config](https://www.npmjs.com/package/@coara/prettier-config), but you can use the configuration whatever that you want

#### Install

```bash
npm i lint-staged @coara/prettier-config -D
```

add on your root directory a prettier config file `.prettierrc` and extend there the `@coara/prettier-config` or include your custom rules

```rc
@coara/prettier-config
```

Finaly you should add this command on you husky configuration like:

```
└── .husky
   └── pre-commit
```

And here is the `pre-commit` file content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run coara-pre-commit lint-staged-prettier
```

### stylelint on pre-commit

To auto fix the staged files with styelint you can add the command `coara-pre-commit lint-staged-stylelint`. This command applies your stylelint configuration to auto-fix the files that match with your pattern. If you don't add any pattern they apply a default one.
To execute correctly this command you should have a stylelint config file and the [lint-staged](https://github.com/okonet/lint-staged).
Our recommendation for the prettier config file is to use the [@coara/stylelint-config](https://www.npmjs.com/package/@coara/stylelint-config), but you can use the configuration whatever that you want

#### Install

```bash
npm i lint-staged @coara/stylelint-config -D
```

add on your root directory a stylelint config file `.stylelintrc.json` and extend there the `@coara/stylelint-config` or include your custom rules

```json
{
  "extends": "@coara/stylelint-config"
}
```

Finaly you should add this command on you husky configuration like:

```
└── .husky
   └── pre-commit
```

And here is the `pre-commit` file content:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run coara-pre-commit lint-staged-stylelint
```

---

Package powered by [coara TM](https://coara.co)
