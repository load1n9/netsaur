import { Backend, NetworkConfig, NetworkJSON } from "../../core/types.ts";

import { Core, WebGPUBackend } from "../../deps.ts";
import { GPUBackend } from "./backend.ts";

export async function GPU(config: NetworkConfig): Promise<Backend> {
  const silent = config.silent;
  const core = new Core();
  await core.initialize();
  const backend = core.backends.get("webgpu")! as WebGPUBackend;
  if (!backend.adapter) throw new Error("No backend adapter found!");
  if (!silent) console.log(`Using adapter: ${backend.adapter}`);
  const features = [...backend.adapter.features.values()];
  if (!silent) console.log(`Supported features: ${features.join(", ")}`);
  return new GPUBackend(config, backend);
}

export async function GPUModel(
  data: NetworkJSON,
  silent = false,
): Promise<Backend> {
  const core = new Core();
  await core.initialize();
  const backend = core.backends.get("webgpu")! as WebGPUBackend;
  if (!backend.adapter) throw new Error("No backend adapter found!");
  if (!silent) console.log(`Using adapter: ${backend.adapter}`);
  const features = [...backend.adapter.features.values()];
  if (!silent) console.log(`Supported features: ${features.join(", ")}`);
  const gpubackend = await GPUBackend.fromJSON(data, backend);
  console.log(gpubackend)
  return gpubackend;
}

export { GPUBackend };
export * from "./matrix.ts";
export type { DataSet } from "../../core/types.ts";
