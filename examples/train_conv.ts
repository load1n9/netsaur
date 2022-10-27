import {
  ConvLayer,
  DenseLayer,
  NeuralNetwork,
  PoolLayer,
  setupBackend,
  tensor2D,
  tensor1D,
} from "../mod.ts";
import { CPU } from "../backends/cpu/mod.ts";

await setupBackend(CPU);

const net = new NeuralNetwork({
  silent: true,
  layers: [
    ConvLayer({
      activation: "tanh",
      kernelSize: [3, 3],
      padding: 0,
      strides: [1, 1],
    }),
    PoolLayer({ strides: [2, 2] }),
    DenseLayer({ size: [1], activation: "sigmoid" }),
  ],
  cost: "crossentropy",
  input: [8,8],
});

const input_1 = tensor2D([
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
]);

const input_2 = tensor2D([
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
]);

const input_3 = tensor2D([
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
]);

await net.train(
  [
    { inputs: input_1, outputs: tensor1D([1]) },
    { inputs: input_2, outputs: tensor2D([2]) },
    { inputs: input_3, outputs: tensor2D([3]) },
  ],
  1,
  1,
);

console.log(await net.predict(input_1));
console.log(await net.predict(input_2));
console.log(await net.predict(input_3));
