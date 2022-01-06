import { WebGPUData } from "../../deps.ts";

export interface GPUCostFunction {
    /** Return the cost associated with an output `a` and desired output `y`. */
    cost(type: string): string

    /** Return the error delta from the output layer. */
    measure(type: string): string
}

export class CrossEntropy implements GPUCostFunction {
    public cost(type: string) {
        return ``
    }

    public measure(type: string) {
        return ``
    }
}

export class Hinge implements GPUCostFunction {
    public cost(type: string) {
        return ``
    }

    public measure(type: string) {
        return ``
    }
}
