import { DiscreteMapper } from "../mapper/mod.ts";
import { argmax, Matrix, MatrixLike } from "../mod.ts";
import type { DataType, DType } from "../utils/common_types.ts";
import { MultiHotEncoder } from "./multihot.ts";
import { OneHotEncoder } from "./onehot.ts";
import { TfEncoder } from "./termfrequency.ts";

export class CategoricalEncoder<T> {
  mapper: DiscreteMapper<T>;
  encoder?: OneHotEncoder;
  maxLength: number;
  constructor(mappings?: Map<T, number>) {
    this.mapper = new DiscreteMapper(mappings);
    this.maxLength = 0;
  }
  fit(document: T[]): CategoricalEncoder<T> {
    this.mapper.fit(document);
    this.encoder = new OneHotEncoder(this.mapper.mapping.size);
    return this;
  }
  transform<DT extends DataType>(document: T[], dType: DT): Matrix<DT> {
    if (!this.mapper.mapping.size)
      throw new Error("Categorical Encoder not trained yet. Use .fit() first.");
    const tokens = this.mapper.transform(document);
    if (!this.encoder)
      throw new Error("Categorical Encoder not trained yet. Use .fit() first.");
    const encoded = this.encoder.transform(tokens, dType);
    return encoded;
  }
  getMapping<DT extends DataType>(data: DType<DT>): T | undefined {
    const max = argmax(data);
    return this.mapper.getOg(max);
  }
  untransform<DT extends DataType>(data: MatrixLike<DT>): T[] {
    const matrix = new Matrix(data);
    const res = new Array(matrix.nRows);
    for (let i = 0; i < matrix.nRows; i += 1) {
      res[i] = this.getMapping(matrix.row(i));
    }
    return res;
  }
}

export { transformSoftmaxMut } from "./softmax.ts";
export { OneHotEncoder, MultiHotEncoder, TfEncoder };
