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
            "commit-msg": "coara-pre-commit link-jira-issue [MYPROJECTKEY]"
        }
    }
}
```

## How this works

### Link jira issues

This command will add your Jira issue to the message commit trying to find on the branch name the key of your project followed by the number of the issue, your branch should look like feature-`MYPROJECTKEY-12123-some-amazing-stuff`.
To trigger this script the command should be like the next:

```bash
npx coara-pre-commit link-jira-issue [name-of-your-project-key]
```

This command always should be triggered by the `commit-msg` hook from husky, because they need their parameter "HUSKY_GIT_PARAMS".
Your configuration should like:

```json
{
    ...,
    husky: {
        hooks: {
            "commit-msg": "coara-pre-commit link-jira-issue [MYPROJECTKEY]"
        }
    }
}
```
