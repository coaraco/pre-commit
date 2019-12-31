#!/usr/bin/env node
import { italic, yellow } from "chalk";
import attachJiraIssueToMessage from "./hooks/attach-issue-to-message";

export default (async () => {
  try {
    const [, , script, firstParam, ...args] = process.argv;
    const { HUSKY_GIT_PARAMS } = process.env;
    switch (script) {
      case "link-jira-issue":
        attachJiraIssueToMessage(firstParam, HUSKY_GIT_PARAMS);
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
  } catch (error) {
    process.exit(1);
  }
})();
