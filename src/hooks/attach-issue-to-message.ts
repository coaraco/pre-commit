#!/usr/bin/env node
import { exec } from "child_process";
import { readFileSync, writeFileSync } from "fs";

export async function attachIssueToMessage(gitMessagePath: string = ""): Promise<IResponse> {
  if (!gitMessagePath) {
    return {
      error: "No git message found on this commit, remember that this script always should be triggered on commit-msg hook",
      ok: false,
    };
  }

  const commitMessage = getCommitMessage(gitMessagePath);
  const issues = findIssueOnBranch(await getBranchName());
  const newCommitMessage = issues.reduce((prev, curr) => `[ ${curr} ] ${prev}`, commitMessage);
  writeFileSync(gitMessagePath, newCommitMessage, { encoding: "utf8" });
  return { ok: true };
}

export function getCommitMessage(pathMessage: string): string {
  return readFileSync(pathMessage, { encoding: "utf8" });
}

export function getBranchName(): Promise<string> {
  return new Promise(resolve => {
    exec("git rev-parse --abbrev-ref HEAD", (error, stdout) => {
      if (error) return { ok: false, error: "GIT ERROR on `git rev-parse --abbrev-ref HEAD`" };
      resolve(stdout.toString().trim() || "");
    });
  });
}

export function findIssueOnBranch(branchName: string): RegExpMatchArray {
  return branchName.match(/((?!([A-Z0-9a-z]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/gi) || [];
}
