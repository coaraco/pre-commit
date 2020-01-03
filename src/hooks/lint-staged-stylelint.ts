#!/usr/bin/env node
import * as lintStaged from "lint-staged";
import { gitAdd } from "./git-add";

export async function lintStagedStylelint(pattern: string = "**/*.{scss,css}"): Promise<IResponse> {
  console.log(`stylelint --fix ${pattern} && git add`);
  let resp: IResponse = { ok: true };
  try {

















    await lintStaged({
      config: {
        [pattern]: "stylelint --fix",
      },
    });
    resp = await gitAdd();
  } catch (error) {
    resp = { ok: false, error };
  }
  return resp;
}
