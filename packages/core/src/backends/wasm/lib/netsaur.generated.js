// @generated file from wasmbuild -- do not edit
// @ts-nocheck: generated
// deno-lint-ignore-file
// deno-fmt-ignore-file
/// <reference types="./netsaur.generated.d.ts" />

// source-hash: 6fae1da844014c6af84634327825fa20fac7ef5f
let wasm;
let cachedInt32Memory0;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

const cachedTextDecoder = typeof TextDecoder !== "undefined"
  ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })
  : {
    decode: () => {
      throw Error("TextDecoder not available");
    },
  };

if (typeof TextDecoder !== "undefined") cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function notDefined(what) {
  return () => {
    throw new Error(`${what} is not defined`);
  };
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = typeof TextEncoder !== "undefined"
  ? new TextEncoder("utf-8")
  : {
    encode: () => {
      throw Error("TextEncoder not available");
    },
  };

const encodeString = function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}
/**
 * @param {string} config
 * @param {Array<any>} shape
 * @returns {number}
 */
export function wasm_backend_create(config, shape) {
  const ptr0 = passStringToWasm0(
    config,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.wasm_backend_create(ptr0, len0, addHeapObject(shape));
  return ret >>> 0;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
  if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
    cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  const mem = getUint32Memory0();
  for (let i = 0; i < array.length; i++) {
    mem[ptr / 4 + i] = addHeapObject(array[i]);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
/**
 * @param {number} id
 * @param {(Float32Array)[]} buffers
 * @param {string} options
 */
export function wasm_backend_train(id, buffers, options) {
  const ptr0 = passArrayJsValueToWasm0(buffers, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passStringToWasm0(
    options,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  wasm.wasm_backend_train(id, ptr0, len0, ptr1, len1);
}

/**
 * @param {number} id
 * @param {Float32Array} buffer
 * @param {string} options
 * @returns {Float32Array}
 */
export function wasm_backend_predict(id, buffer, options) {
  const ptr0 = passStringToWasm0(
    options,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.wasm_backend_predict(id, addHeapObject(buffer), ptr0, len0);
  return takeObject(ret);
}

/**
 * @param {number} id
 * @returns {Uint8Array}
 */
export function wasm_backend_save(id) {
  const ret = wasm.wasm_backend_save(id);
  return takeObject(ret);
}

/**
 * @param {Uint8Array} buffer
 * @param {Array<any>} shape
 * @returns {number}
 */
export function wasm_backend_load(buffer, shape) {
  const ret = wasm.wasm_backend_load(
    addHeapObject(buffer),
    addHeapObject(shape),
  );
  return ret >>> 0;
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}

const imports = {
  __wbindgen_placeholder__: {
    __wbindgen_object_drop_ref: function (arg0) {
      takeObject(arg0);
    },
    __wbg_log_860f982bd7b08de8: function (arg0, arg1) {
      console.log(getStringFromWasm0(arg0, arg1));
    },
    __wbg_now_aa5f80cbe756bd45: typeof Date.now == "function"
      ? Date.now
      : notDefined("Date.now"),
    __wbindgen_number_new: function (arg0) {
      const ret = arg0;
      return addHeapObject(ret);
    },
    __wbg_crypto_c48a774b022d20ac: function (arg0) {
      const ret = getObject(arg0).crypto;
      return addHeapObject(ret);
    },
    __wbindgen_is_object: function (arg0) {
      const val = getObject(arg0);
      const ret = typeof val === "object" && val !== null;
      return ret;
    },
    __wbg_process_298734cf255a885d: function (arg0) {
      const ret = getObject(arg0).process;
      return addHeapObject(ret);
    },
    __wbg_versions_e2e78e134e3e5d01: function (arg0) {
      const ret = getObject(arg0).versions;
      return addHeapObject(ret);
    },
    __wbg_node_1cd7a5d853dbea79: function (arg0) {
      const ret = getObject(arg0).node;
      return addHeapObject(ret);
    },
    __wbindgen_is_string: function (arg0) {
      const ret = typeof (getObject(arg0)) === "string";
      return ret;
    },
    __wbg_msCrypto_bcb970640f50a1e8: function (arg0) {
      const ret = getObject(arg0).msCrypto;
      return addHeapObject(ret);
    },
    __wbg_require_8f08ceecec0f4fee: function () {
      return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbindgen_is_function: function (arg0) {
      const ret = typeof (getObject(arg0)) === "function";
      return ret;
    },
    __wbindgen_string_new: function (arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    },
    __wbg_randomFillSync_dc1e9a60c158336d: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
      }, arguments);
    },
    __wbg_getRandomValues_37fa2ca9e4e07fab: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
      }, arguments);
    },
    __wbg_newnoargs_e258087cd0daa0ea: function (arg0, arg1) {
      const ret = new Function(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbg_call_27c0f87801dedf93: function () {
      return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbindgen_object_clone_ref: function (arg0) {
      const ret = getObject(arg0);
      return addHeapObject(ret);
    },
    __wbg_self_ce0dbfc45cf2f5be: function () {
      return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_window_c6fb939a7f436783: function () {
      return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_globalThis_d1e6af4856ba331b: function () {
      return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_global_207b558942527489: function () {
      return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbindgen_is_undefined: function (arg0) {
      const ret = getObject(arg0) === undefined;
      return ret;
    },
    __wbg_set_d4638f722068f043: function (arg0, arg1, arg2) {
      getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    },
    __wbg_setlength_ef7b0804fcb1df8d: function (arg0, arg1) {
      getObject(arg0).length = arg1 >>> 0;
    },
    __wbg_call_b3ca7c6051f9bec1: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_buffer_12d079cc21e14bdb: function (arg0) {
      const ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    },
    __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: function (
      arg0,
      arg1,
      arg2,
    ) {
      const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_new_63b92bc8671ed464: function (arg0) {
      const ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_set_a47bac70306a19a7: function (arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    },
    __wbg_length_c20a40f15020d68a: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbg_newwithbyteoffsetandlength_4a659d079a1650e0: function (
      arg0,
      arg1,
      arg2,
    ) {
      const ret = new Float32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_new_9efabd6b6d2ce46d: function (arg0) {
      const ret = new Float32Array(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_set_bd975934d1b1fddb: function (arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    },
    __wbg_length_d25bbcbc3367f684: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbg_newwithlength_e9b4878cebadb3d3: function (arg0) {
      const ret = new Uint8Array(arg0 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_subarray_a1f73cd4b5b42fe1: function (arg0, arg1, arg2) {
      const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    },
    __wbindgen_throw: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbindgen_memory: function () {
      const ret = wasm.memory;
      return addHeapObject(ret);
    },
  },
};

class WasmBuildLoader {
  #options;
  #lastLoadPromise;
  #instantiated;

  constructor(options) {
    this.#options = options;
  }

  get instance() {
    return this.#instantiated?.instance;
  }

  get module() {
    return this.#instantiated?.module;
  }

  load(
    url,
    decompress,
  ) {
    if (this.#instantiated) {
      return Promise.resolve(this.#instantiated);
    } else if (this.#lastLoadPromise == null) {
      this.#lastLoadPromise = (async () => {
        try {
          this.#instantiated = await this.#instantiate(url, decompress);
          return this.#instantiated;
        } finally {
          this.#lastLoadPromise = undefined;
        }
      })();
    }
    return this.#lastLoadPromise;
  }

  async #instantiate(url, decompress) {
    const imports = this.#options.imports;
    if (this.#options.cache != null && url.protocol !== "file:") {
      try {
        const result = await this.#options.cache(
          url,
          decompress ?? ((bytes) => bytes),
        );
        if (result instanceof URL) {
          url = result;
          decompress = undefined; // already decompressed
        } else if (result != null) {
          return WebAssembly.instantiate(result, imports);
        }
      } catch {
        // ignore if caching ever fails (ex. when on deploy)
      }
    }

    const isFile = url.protocol === "file:";

    // make file urls work in Node via dnt
    const isNode = globalThis.process?.versions?.node != null;
    if (isFile && typeof Deno !== "object") {
      throw new Error(
        "Loading local files are not supported in this environment",
      );
    }
    if (isNode && isFile) {
      // the deno global will be shimmed by dnt
      const wasmCode = await Deno.readFile(url);
      return WebAssembly.instantiate(
        decompress ? decompress(wasmCode) : wasmCode,
        imports,
      );
    }

    switch (url.protocol) {
      case "file:":
      case "https:":
      case "http:": {
        const wasmResponse = await fetchWithRetries(url);
        if (decompress) {
          const wasmCode = new Uint8Array(await wasmResponse.arrayBuffer());
          return WebAssembly.instantiate(decompress(wasmCode), imports);
        }
        if (
          isFile ||
          wasmResponse.headers.get("content-type")?.toLowerCase()
            .startsWith("application/wasm")
        ) {
          return WebAssembly.instantiateStreaming(wasmResponse, imports);
        } else {
          return WebAssembly.instantiate(
            await wasmResponse.arrayBuffer(),
            imports,
          );
        }
      }
      default:
        throw new Error(`Unsupported protocol: ${url.protocol}`);
    }
  }
}
const isNodeOrDeno = typeof Deno === "object" ||
  (typeof process !== "undefined" && process.versions != null &&
    process.versions.node != null);

const loader = new WasmBuildLoader({
  imports,
  cache: isNodeOrDeno ? cacheToLocalDir : undefined,
});

export async function instantiate(opts) {
  return (await instantiateWithInstance(opts)).exports;
}

export async function instantiateWithInstance(opts) {
  const { instance } = await loader.load(
    opts?.url ?? new URL("netsaur_bg.wasm", import.meta.url),
    opts?.decompress,
  );
  wasm = wasm ?? instance.exports;
  cachedInt32Memory0 = cachedInt32Memory0 ?? new Int32Array(wasm.memory.buffer);
  cachedUint8Memory0 = cachedUint8Memory0 ?? new Uint8Array(wasm.memory.buffer);
  return {
    instance,
    exports: getWasmInstanceExports(),
  };
}

function getWasmInstanceExports() {
  return {
    wasm_backend_create,
    wasm_backend_train,
    wasm_backend_predict,
    wasm_backend_save,
    wasm_backend_load,
  };
}

export function isInstantiated() {
  return loader.instance != null;
}
export async function cacheToLocalDir(url, decompress) {
  const localPath = await getUrlLocalPath(url);
  if (localPath == null) {
    return undefined;
  }
  if (!await exists(localPath)) {
    const fileBytes = decompress(new Uint8Array(await getUrlBytes(url)));
    try {
      await Deno.writeFile(localPath, fileBytes);
    } catch {
      // ignore and return the wasm bytes
      return fileBytes;
    }
  }
  return toFileUrl(localPath);
}
async function getUrlLocalPath(url) {
  try {
    const dataDirPath = await getInitializedLocalDataDirPath();
    const hash = await getUrlHash(url);
    return `${dataDirPath}/${hash}.wasm`;
  } catch {
    return undefined;
  }
}
async function getInitializedLocalDataDirPath() {
  const dataDir = localDataDir();
  if (dataDir == null) {
    throw new Error(`Could not find local data directory.`);
  }
  const dirPath = `${dataDir}/deno-wasmbuild`;
  await ensureDir(dirPath);
  return dirPath;
}
async function exists(filePath) {
  try {
    await Deno.lstat(filePath);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
}
async function ensureDir(dir) {
  try {
    const fileInfo = await Deno.lstat(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(`Path was not a directory '${dir}'`);
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      // if dir not exists. then create it.
      await Deno.mkdir(dir, { recursive: true });
      return;
    }
    throw err;
  }
}
async function getUrlHash(url) {
  // Taken from MDN: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(url.href),
  );
  // convert buffer to byte array
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
async function getUrlBytes(url) {
  const response = await fetchWithRetries(url);
  return await response.arrayBuffer();
}
// the below is extracted from deno_std/path
const WHITESPACE_ENCODINGS = {
  "\u0009": "%09",
  "\u000A": "%0A",
  "\u000B": "%0B",
  "\u000C": "%0C",
  "\u000D": "%0D",
  "\u0020": "%20",
};
function encodeWhitespace(string) {
  return string.replaceAll(/[\s]/g, (c) => {
    return WHITESPACE_ENCODINGS[c] ?? c;
  });
}
function toFileUrl(path) {
  return Deno.build.os === "windows"
    ? windowsToFileUrl(path)
    : posixToFileUrl(path);
}
function posixToFileUrl(path) {
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(
    path.replace(/%/g, "%25").replace(/\\/g, "%5C"),
  );
  return url;
}
function windowsToFileUrl(path) {
  const [, hostname, pathname] = path.match(
    /^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/,
  );
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
  if (hostname != null && hostname != "localhost") {
    url.hostname = hostname;
    if (!url.hostname) {
      throw new TypeError("Invalid hostname.");
    }
  }
  return url;
}
export async function fetchWithRetries(url, maxRetries = 5) {
  let sleepMs = 250;
  let iterationCount = 0;
  while (true) {
    iterationCount++;
    try {
      const res = await fetch(url);
      if (res.ok || iterationCount > maxRetries) {
        return res;
      }
    } catch (err) {
      if (iterationCount > maxRetries) {
        throw err;
      }
    }
    console.warn(`Failed fetching. Retrying in ${sleepMs}ms...`);
    await new Promise((resolve) => setTimeout(resolve, sleepMs));
    sleepMs = Math.min(sleepMs * 2, 10000);
  }
}
// MIT License - Copyright (c) justjavac.
// https://github.com/justjavac/deno_dirs/blob/e8c001bbef558f08fd486d444af391729b0b8068/data_local_dir/mod.ts
function localDataDir() {
  switch (Deno.build.os) {
    case "linux": {
      const xdg = Deno.env.get("XDG_DATA_HOME");
      if (xdg) {
        return xdg;
      }
      const home = Deno.env.get("HOME");
      if (home) {
        return `${home}/.local/share`;
      }
      break;
    }
    case "darwin": {
      const home = Deno.env.get("HOME");
      if (home) {
        return `${home}/Library/Application Support`;
      }
      break;
    }
    case "windows":
      return Deno.env.get("LOCALAPPDATA") ?? undefined;
  }
  return undefined;
}
