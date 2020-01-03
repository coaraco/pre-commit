# pre-commit

This package has some predefined hooks to do some pre-commit scripts that help in some of the typical developer flow.

## Install

You should install like a develop npm dependency and you should install too a husky package

```bash
npm i coara/pre-commit husky -D
```

On your `package.json` you should add your husky configuration, here an example with a pre-commit message to link your Jira issues with your branches.

```json
{
    ...,
    husky: {
        hooks: {
            "commit-msg": "coara-pre-commit link-jira-issue",
            "pre-commit": "coara-pre-commit lint-staged-stylelint & coara-pre-commit lint-staged-prettier"
        }
    }
}
```

## How this works

### Link jira issues

This command will add your Jira issue to the message commit trying to find on the branch name the key of your project followed by the number of the issue, your branch should look like `feature/MYPROJECTKEY-12123-some-amazing-stuff`.
To trigger this script the command should be like the next:

```bash
npx coara-pre-commit link-jira-issue
```

This command always should be triggered by the `commit-msg` hook from husky, because they need their parameter "HUSKY_GIT_PARAMS".
Your configuration should like:

```json
{
    ...,
    husky: {
        hooks: {
            "commit-msg": "coara-pre-commit link-jira-issue"
        }
    }
}
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

```json
{
    ...,
    husky: {
        hooks: {
            "commit-msg": "coara-pre-commit link-jira-issue",
            "pre-commit": "coara-pre-commit lint-staged-prettier"
        }
    }
}
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

```json
{
    ...,
    husky: {
        hooks: {
            "commit-msg": "coara-pre-commit link-jira-issue",
            "pre-commit": "coara-pre-commit lint-staged-stylelint"
        }
    }
}
```