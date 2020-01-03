#!/usr/bin/env node
import * as lintStaged from "lint-staged";

export async function lintStagedPrettier(pattern: string = "**/*.{ts,scss,html,md,js}"): Promise<IResponse> {
  console.log(`> prettier --write ${pattern} && git add`);
  let resp: IResponse = { ok: true };
  try {
    await lintStaged({
      config: { [pattern]: `prettier --write` },
      shell: true,
      quiet: true,
      debug: true,
    });
  } catch (error) {
    resp = { ok: false, error };
  }

  return resp;
}
