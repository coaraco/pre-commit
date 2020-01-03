#!/usr/bin/env node
import { exec } from "child_process";

export async function gitAdd(): Promise<IResponse> {
  return new Promise(resolve => {
    exec("git update-index --again", error => {
      if (error) return resolve({ ok: false, error: error.name });
      resolve({ ok: true });
    });
  });
}
