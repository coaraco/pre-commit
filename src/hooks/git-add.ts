#!/usr/bin/env node
import { exec } from "child_process";

export async function gitAdd(): Promise<IResponse> {
  return new Promise(resolve => {
    console.log("git add $(git diff --name-only --cached --diff-filter=ACM)");
    exec("git add $(git diff --name-only --cached --diff-filter=ACM)", error => {
      if (error) return resolve({ ok: false, error: error.name || error.message });

      resolve({ ok: true });
    });
  });
}
