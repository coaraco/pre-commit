#!/usr/bin/env node
import { red } from "chalk";
import { exec } from "child_process";
import { readFileSync, writeFileSync } from "fs";

export default async (projectKey: string, gitMessagePath: string = "") => {
  if (!projectKey)
    composeError(
      "Jira Project key not found, you shoud add your project key when execute this script \nExample:\n s-node ../../coara/pre-commit/lib/index.js CON",
    );
  if (!gitMessagePath)
    return composeError("No git message found on this commit, rember that this script always should be triggered on commit-msg hook");
  exec("git rev-parse --abbrev-ref HEAD", (error, stdout) => {
    if (error) return composeError("GIT ERROR on `git rev-parse --abbrev-ref HEAD`");
    const commitMessage = readFileSync(gitMessagePath, { encoding: "utf8" });
    const branchName = stdout.toString().trim() || "";
    const issues = branchName.match(new RegExp(`${projectKey}-[0-9]\\w+`, "gi"));
    if (!issues?.length) return composeError("No issue found on branch name, should look like JIRAKEY-1223-issue-description");
    const newCommitMessage = issues.reduce((prev, curr) => `[ ${curr} ] ${prev}`, commitMessage);
    writeFileSync(gitMessagePath, newCommitMessage, { encoding: "utf8" });
  });
};

function composeError(error: string): string {
  console.error(red("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n"));
  console.error(red(error));
  console.error(red("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n"));
  throw new Error(error);
}
