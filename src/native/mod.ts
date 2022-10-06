import { Backend, NetworkConfig } from "../types.ts";

import { NativeBackend } from "./backend.ts";
// import { Backend, NetworkConfig } from "../types.ts";

// deno-lint-ignore require-await
export async function Native(config: NetworkConfig): Promise<Backend> {
  // deno-lint-ignore no-explicit-any
  return new NativeBackend(config as any);
}