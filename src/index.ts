#!/usr/bin/env node
import { italic, yellow } from "chalk";
import { attachIssueToMessage } from "./hooks/attach-issue-to-message";

export default (async () => {
  try {
    const [, , script, firstParam, ...args] = process.argv;
    const { HUSKY_GIT_PARAMS } = process.env;
    let processSuccess = true;
    switch (script) {
      case "link-jira-issue":
        processSuccess = await attachIssueToMessage(HUSKY_GIT_PARAMS);
        break;
      case "help":
      case "-h":
      default:
        console.log(yellow("\n\n\nThis command doesn't exist\n"));
        console.log(yellow("This are the acepted commands:\n"));
        console.log(yellow("> link-jira-issue [project-key]"));
        console.log(yellow(italic("- coara-pre-commit link-jira-issue CON\n\n")));
        break;
    }
    process.exit(processSuccess ? 0 : 1);
  } catch (error) {
    process.exit(1);
  }
})();
