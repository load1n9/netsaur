import { DataType, DataTypeArray } from "../deps.ts";
import { ConvLayer, DenseLayer, PoolLayer } from "../mod.ts";
import { ConvCPULayer } from "../backends/cpu/layers/conv.ts";
import { DenseCPULayer } from "../backends/cpu/layers/dense.ts";
import { DenseGPULayer } from "../backends/gpu/layers/dense.ts";
import { GPUMatrix } from "../backends/gpu/matrix.ts";
import { CPUMatrix } from "../backends/cpu/matrix.ts";
import { PoolCPULayer } from "../backends/cpu/layers/pool.ts";

export interface LayerJSON {
  outputSize: number | Size2D;
  activationFn?: string;
  costFn?: string;
  type: string;
  input: MatrixJSON;
  weights?: MatrixJSON;
  biases?: MatrixJSON;
  output: MatrixJSON;
  error?: MatrixJSON;
  cost?: MatrixJSON;
  kernel?: MatrixJSON;
  padded?: MatrixJSON;
  stride?: number;
  padding?: number;
}

export interface NetworkJSON {
  costFn?: string;
  type: "NeuralNetwork";
  sizes: (number | Size2D)[];
  input: Size | undefined;
  layers: LayerJSON[];
  output: LayerJSON;
}

export interface MatrixJSON {
  // deno-lint-ignore no-explicit-any
  data: any;
  x: number;
  y: number;
  type?: DataType;
}
export interface Backend<T extends DataType = DataType> {
  // deno-lint-ignore no-explicit-any
  addLayer(layer: Layer | any, index?: number): void;
  // getOutput(): DataTypeArray<T> | any;
  train(
    // deno-lint-ignore no-explicit-any
    datasets: DataSet[] | any,
    epochs: number,
    batches: number,
    learningRate: number,
  ): void;
  // deno-lint-ignore no-explicit-any
  predict(input: DataTypeArray<T> | any): DataTypeArray<T> | any;
  save(input: string): void;
  toJSON(): NetworkJSON | Promise<NetworkJSON> | undefined;
  // deno-lint-ignore no-explicit-any
  getWeights(): (GPUMatrix | CPUMatrix | any)[];
  // deno-lint-ignore no-explicit-any
  getBiases(): (GPUMatrix | CPUMatrix | any)[];
}

/**
 * NetworkConfig represents the configuration of a neural network.
 */
export interface NetworkConfig {
  input?: Size;
  layers: Layer[];
  cost: Cost;
  silent?: boolean;
}

export type Layer = DenseLayer | ConvLayer | PoolLayer;

export type CPULayer = ConvCPULayer | DenseCPULayer | PoolCPULayer;

export type GPULayer = DenseGPULayer;

export interface DenseLayerConfig {
  size: Size;
  activation: Activation;
}

export interface ConvLayerConfig {
  activation?: Activation;
  kernel: DataTypeArray;
  kernelSize: Size2D;
  padding?: number;
  stride?: number;
}

export interface PoolLayerConfig {
  stride: number;
}

export type Size = number | Size2D;

export type Size2D = { x: number; y: number };

/**
 * Activation functions are used to transform the output of a layer into a new output.
 */
export type Activation =
  | "sigmoid"
  | "tanh"
  | "relu"
  | "relu6"
  | "leakyrelu"
  | "elu"
  | "linear"
  | "selu";

export type Cost = "crossentropy" | "hinge" | "mse";

export enum Rank {
  R0 = "R0",
  R1 = "R1",
  R2 = "R2",
  R3 = "R3",
  R4 = "R4",
  R5 = "R5",
  R6 = "R6",
}

export type Shape = number;

/** @docalias number[] */
export interface ShapeMap {
  R0: number[];
  R1: [number];
  R2: [number, number];
  R3: [number, number, number];
  R4: [number, number, number, number];
  R5: [number, number, number, number, number];
  R6: [number, number, number, number, number, number];
}

/** @docalias number[] */
export interface ArrayMap {
  R0: number;
  R1: number[];
  R2: number[][];
  R3: number[][][];
  R4: number[][][][];
  R5: number[][][][][];
  R6: number[][][][][][];
}

export type TypedArray = Float32Array | Int32Array | Uint8Array;
// deno-lint-ignore no-explicit-any
export interface RecursiveArray<T extends any> {
  [index: number]: T | RecursiveArray<T>;
}
/**
 * NumberArray is a typed array of numbers.
 */
export type NumberArray<T extends DataType = DataType> =
  | DataTypeArray<T>
  | Array<number>
  // TODO: fix
  // deno-lint-ignore no-explicit-any
  | any;
/**
 * DataSet is a container for training data.
 */
export type DataSet = {
  inputs: NumberArray;
  outputs: NumberArray;
};

/** @docalias TypedArray|Array */
export type TensorLike =
  | TypedArray
  | number
  | boolean
  | string
  | RecursiveArray<number | number[] | TypedArray>
  | RecursiveArray<boolean>
  | RecursiveArray<string>
  | Uint8Array[];

export type ScalarLike = number | boolean | string | Uint8Array;

/** @docalias TypedArray|Array */
export type TensorLike1D =
  | TypedArray
  | number[]
  | boolean[]
  | string[]
  | Uint8Array[];

/** @docalias TypedArray|Array */
export type TensorLike2D =
  | TypedArray
  | number[]
  | number[][]
  | boolean[]
  | boolean[][]
  | string[]
  | string[][]
  | Uint8Array[]
  | Uint8Array[][];

/** @docalias TypedArray|Array */
export type TensorLike3D =
  | TypedArray
  | number[]
  | number[][][]
  | boolean[]
  | boolean[][][]
  | string[]
  | string[][][]
  | Uint8Array[]
  | Uint8Array[][][];

/** @docalias TypedArray|Array */
export type TensorLike4D =
  | TypedArray
  | number[]
  | number[][][][]
  | boolean[]
  | boolean[][][][]
  | string[]
  | string[][][][]
  | Uint8Array[]
  | Uint8Array[][][][];

/** @docalias TypedArray|Array */
export type TensorLike5D =
  | TypedArray
  | number[]
  | number[][][][][]
  | boolean[]
  | boolean[][][][][]
  | string[]
  | string[][][][][]
  | Uint8Array[]
  | Uint8Array[][][][][];

/** @docalias TypedArray|Array */
export type TensorLike6D =
  | TypedArray
  | number[]
  | number[][][][][][]
  | boolean[]
  | boolean[][][][][][]
  | string[]
  | string[][][][][][]
  | Uint8Array[]
  | Uint8Array[][][][][];