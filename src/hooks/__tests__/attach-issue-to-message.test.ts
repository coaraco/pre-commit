import { execSync } from "child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { attachIssueToMessage, findIssueOnBranch } from "../attach-issue-to-message";

it("Test differents branches to try to fins the keys", async () => {
  const batteryOfBranchNames = [
    "COARA-2323-some-branch-name",
    "feature/COARA-2-add-coara-pre-commit-package-to-",
    "feature/CON-2238472938-add-2323-coara-pre-commit-package-to-",
  ];
  const result = await Promise.all(batteryOfBranchNames.map(branch => findIssueOnBranch(branch)));
  expect(result.every(r => r.length > 0)).toBeTruthy();
});

describe("attachIssueToMessage", () => {
  const originalCwd = process.cwd();
  let repo = "";

  function createRepoOnBranch(branchName: string): void {
    repo = mkdtempSync(join(tmpdir(), "coara-pre-commit-"));
    const git = (args: string) => execSync(`git ${args}`, { cwd: repo, stdio: "ignore" });
    git("init -q");
    git(`checkout -q -b ${branchName}`);
    git('-c user.email=test@example.com -c user.name=test commit -q --allow-empty -m "init"');
    process.chdir(repo);
  }

  function writeMessage(message: string): string {
    const messagePath = join(repo, "COMMIT_EDITMSG");
    writeFileSync(messagePath, message, { encoding: "utf8" });
    return messagePath;
  }

  afterEach(() => {
    process.chdir(originalCwd);
    if (repo) execSync(`rm -rf ${repo}`);
    repo = "";
  });

  it("prefixes the commit message with the issue key followed by a colon", async () => {
    createRepoOnBranch("feature/CNG-19191-fix-mr-title-lint");
    const messagePath = writeMessage("fix: converge on the KEY: title convention");

    await attachIssueToMessage(messagePath);

    expect(readFileSync(messagePath, { encoding: "utf8" })).toBe("CNG-19191: fix: converge on the KEY: title convention");
  });

  it("leaves the message untouched when the branch carries no issue key", async () => {
    createRepoOnBranch("chore/no-key-here");
    const messagePath = writeMessage("chore: tidy up");

    await attachIssueToMessage(messagePath);

    expect(readFileSync(messagePath, { encoding: "utf8" })).toBe("chore: tidy up");
  });
});
