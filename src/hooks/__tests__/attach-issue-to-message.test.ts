import { findIssueOnBranch } from "../attach-issue-to-message";

it("Test differents branches to try to fins the keys", async () => {
  const batteryOfBranchNames = [
    "COARA-2323-some-branch-name",
    "feature/COARA-2-add-coara-pre-commit-package-to-",
    "feature/CON-2238472938-add-2323-coara-pre-commit-package-to-",
  ];
  const result = await Promise.all(batteryOfBranchNames.map(branch => findIssueOnBranch(branch)));
  expect(result.every(r => r.length > 0)).toBeTruthy();
});
