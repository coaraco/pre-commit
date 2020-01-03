#!/usr/bin/env node
import { exec } from "child_process";
import * as lintStaged from "lint-staged";

export async function lintStagedStylelint(pattern: string = "**/*.{scss,css}"): Promise<IResponse> {
  console.log(`stylelint --fix ${pattern} && git add`);
  let resp: IResponse = { ok: true };
  try {
    await lintStaged({
      config: {
        [pattern]: "stylelint --fix",
      },
    });
    exec("git add");
  } catch (error) {
    resp = { ok: false, error };
  }
  return resp;
}
