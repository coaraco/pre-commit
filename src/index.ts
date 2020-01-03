#!/usr/bin/env node
import { red, italic, yellow } from "chalk";
import { attachIssueToMessage } from "./hooks/attach-issue-to-message";
import { lintStagedStylelint } from "./hooks/lint-staged-stylelint";
import { lintStagedPrettier } from "./hooks/lint-staged-prettier";
import { gitAdd } from "./hooks/git-add";

export default (async () => {
  try {
    const [, , script, firstParam, ...args] = process.argv;
    const { HUSKY_GIT_PARAMS } = process.env;
    let response: { ok: boolean; error?: string } = { ok: true };

    switch (script) {
      case "link-jira-issue":
        response = await attachIssueToMessage(HUSKY_GIT_PARAMS);
        break;
      case "lint-staged-stylelint":
        response = await lintStagedStylelint(firstParam);
        break;
      case "lint-staged-prettier":
        response = await lintStagedPrettier(firstParam);
        break;
      case "help":
      case "-h":
        showOptions();
        break;
      default:
        composeError("This command doesn't exist");
        showOptions();
        break;
    }
    response = await gitAdd();
    if (!response.ok) {
      composeError(response?.error);
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (error) {
    process.exit(1);
  }
})();

function composeError(error: string = ""): void {
  console.error(red("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n"));
  console.error(red(error));
  console.error(red("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n"));
}

function showOptions(): void {
  console.log(yellow("This are the acepted commands:\n"));
  console.log(yellow("> link-jira-issue"));
  console.log(yellow(italic("- coara-pre-commit link-jira-issue\n\n")));
  console.log(yellow("> lint-staged-stylelint [pattern? = '**/*.{scss,css}']"));
  console.log(yellow(italic("- coara-pre-commit lint-staged-stylelint '*.{scss, css}'\n\n")));
  console.log(yellow("> lint-staged-prettier [pattern? = '**/*.{ts,scss,html,md,js}']"));
  console.log(yellow(italic("- coara-pre-commit lint-staged-prettier '**/*.{ts,md}'\n\n")));
}
