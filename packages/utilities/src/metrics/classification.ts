import { useUnique } from "../utils/mod.ts";

interface Report {
  c: ConfusionMatrix;
  precision: number;
  recall: number;
  cohensKappa: number;
  f1: number;
  support: number;
}

/** A report with metrics for classification results */
export class ClassificationReport {
  /** Number of elements classified correctly */
  true: number;
  /** Number of elements classified incorrectly */
  false: number;
  /** Total number of elements */
  size: number;
  labels: string[];
  reports: Map<string, Report>;
  constructor(y: ArrayLike<unknown>, y1: ArrayLike<unknown>) {
    const unique = useUnique(y);
    if (unique.length <= 1) {
      throw new Error(
        `Cannot create a classification report for less than 1 class.`
      );
    }
    this.true = 0;
    this.false = 0;
    this.size = y.length;
    this.labels = unique.map((x) => `${x}`);
    this.reports = new Map();
    for (const label of unique) {
      let [tp, fn, fp, tn] = [0, 0, 0, 0];
      for (let i = 0; i < y.length; i += 1) {
        if (y1[i] !== label && y[i] !== label) tn += 1;
        else if (y1[i] !== label && y[i] === label) fn += 1;
        else if (y1[i] === label && y[i] !== label) fp += 1;
        else tp += 1;
      }
      this.true += tp;
      this.false += fp;
      const cMatrix = new ConfusionMatrix([tp, fn, fp, tn]);
      this.reports.set(`${label}`, {
        c: cMatrix,
        precision: precisionScore(cMatrix),
        f1: f1Score(cMatrix),
        recall: recallScore(cMatrix),
        cohensKappa: cohensKappa(cMatrix),
        support: cMatrix.truePositive + cMatrix.falseNegative,
      });
    }
  }
  toString(): string {
    const maxClassNameLength = this.labels.reduce(
      (acc, val) => (acc > val.length ? acc : val.length),
      0
    );
    let res = `Classification Report`;
    res += `\nClasses:\t${this.labels.length}\n`;
    res += `${`Class`.padEnd(
      maxClassNameLength,
      " "
    )}\tPreci\tF1\tRec\tCKA\tSup`;
    for (const [label, report] of this.reports.entries()) {
      res += `\n${label.padEnd(maxClassNameLength, " ")}`;
      res += `\t${report.precision.toFixed(4)}\t${report.f1.toFixed(
        4
      )}\t${report.recall.toFixed(4)}\t${report.cohensKappa.toFixed(4)}\t${
        report.support
      }`;
    }
    res += `\n${`Accuracy`.padEnd(maxClassNameLength, " ")}\t${(
      this.true /
      (this.true + this.false)
    ).toFixed(4)}\t\t\t\t${this.size}`;
    return res;
  }
  toHtml(): string {
    let res = `<table><thead><tr><th>Class</th><th>Precision</th><th>F1Score</th><th>Recall</th><th>Cohen's Kappa</th><th>Support</th></tr></thead>`;
    for (const [label, report] of this.reports.entries()) {
      res += `<tr><td>${label}</td><td>${report.precision}</td><td>${report.f1}</td><td>${report.recall}</td><td>${report.cohensKappa}</td><td>${report.support}</td></tr>`;
    }
    res += `<tr><td>Accuracy</td><td>${
      this.true / (this.true + this.false)
    }</td><td></td><td></td><td></td><td>${this.size}</td></tr>`;
    res += `</table>`;
    return res;
  }
  [Symbol.for("Deno.customInspect")](): string {
    return this.toString();
  }
  [Symbol.for("Jupyter.display")](): Record<string, string> {
    return {
      // Plain text content
      "text/plain": this.toString(),

      // HTML output
      "text/html": this.toHtml(),
    };
  }
  toJson(): {
    class: string[];
    precision: number[];
    f1: number[];
    recall: number[];
    support: number[];
  } {
    const reports = Array.from(this.reports.entries());
    return {
      class: reports.map((x) => x[0]),
      precision: reports.map((x) => x[1].precision),
      f1: reports.map((x) => x[1].f1),
      recall: reports.map((x) => x[1].recall),
      support: reports.map((x) => x[1].support),
    };
  }
}

/** Confusion matrix for the result. */
export class ConfusionMatrix {
  /** Number of positive elements classified correctly */
  truePositive: number;
  /** Number of negative elements classified incorrectly */
  falsePositive: number;
  /** Number of negative elements classified correctly */
  trueNegative: number;
  /** Number of positive elements classified incorrectly */
  falseNegative: number;
  /** Number of elements classified correctly */
  true: number;
  /** Number of elements classified incorrectly */
  false: number;
  /** Total number of elements */
  size: number;
  /** Label for positive elements */
  labelP: string;
  /** Label for negative elements */
  labelN: string;
  constructor(
    [tp, fn, fp, tn]: [number, number, number, number],
    [label1, label2]: [string?, string?] = []
  ) {
    this.truePositive = tp;
    this.falseNegative = fn;
    this.falsePositive = fp;
    this.trueNegative = tn;
    this.true = tn + tp;
    this.false = fn + fp;
    this.size = this.true + this.false;
    this.labelP = label1 || "P";
    this.labelN = label2 || "N";
  }
  valueOf(): [number, number, number, number] {
    return [
      this.truePositive,
      this.falseNegative,
      this.falsePositive,
      this.trueNegative,
    ];
  }
  [Symbol.for("Deno.customInspect")](): string {
    return `\n\t${this.labelP}\t${this.labelN}\n${this.labelP}\t${this.truePositive}\t${this.falseNegative}\n${this.labelN}\t${this.falsePositive}\t${this.trueNegative}`;
  }
  static fromResults(
    y: ArrayLike<unknown>,
    y1: ArrayLike<unknown>
  ): ConfusionMatrix {
    const unique = useUnique(y);
    if (unique.length !== 2) {
      throw new Error(
        `Cannot create confusion matrix for ${unique.length} classes. Try ClassificationReport instead.`
      );
    }
    let [tp, fn, fp, tn] = [0, 0, 0, 0];
    for (let i = 0; i < y.length; i += 1) {
      if (y1[i] === unique[1] && y[i] === unique[1]) tn += 1;
      else if (y1[i] === unique[1] && y[i] === unique[0]) fn += 1;
      else if (y1[i] === unique[0] && y[i] === unique[1]) fp += 1;
      else tp += 1;
    }
    return new this([tp, fn, fp, tn], [`${unique[0]}`, `${unique[1]}`]);
  }
}

/** The fraction of predictions that were correct */
export function accuracyScore(cMatrix: ConfusionMatrix): number {
  return cMatrix.true / cMatrix.size;
}
/** The fraction of "positive" predictions that were actually positive */
export function precisionScore(cMatrix: ConfusionMatrix): number {
  return (
    cMatrix.truePositive / (cMatrix.truePositive + cMatrix.falsePositive) || 0
  );
}
/** The fraction of positives that were predicted correctly */
export function sensitivityScore(cMatrix: ConfusionMatrix): number {
  return (
    cMatrix.truePositive / (cMatrix.truePositive + cMatrix.falseNegative) || 0
  );
}
/** The fraction of positives that were predicted correctly */
export const recallScore = sensitivityScore;
/** The fraction of negatives that were predicted correctly */
export function specificityScore(cMatrix: ConfusionMatrix): number {
  return (
    cMatrix.trueNegative / (cMatrix.trueNegative + cMatrix.falsePositive) || 0
  );
}
/** Compute F1 Score */
export function f1Score(cMatrix: ConfusionMatrix): number {
  return (
    (2 * cMatrix.truePositive) /
      (2 * cMatrix.truePositive +
        cMatrix.falsePositive +
        cMatrix.falseNegative) || 0
  );
}

/** Compute Cohen's Kappa to find Agreement */
export function cohensKappa(cMatrix: ConfusionMatrix): number {
  const actualAgreement = accuracyScore(cMatrix);
  const expectedAgreement =
    ((cMatrix.truePositive + cMatrix.falsePositive) / cMatrix.size) *
      ((cMatrix.truePositive + cMatrix.falseNegative) / cMatrix.size) +
    ((cMatrix.falsePositive + cMatrix.trueNegative) / cMatrix.size) *
      ((cMatrix.falseNegative + cMatrix.trueNegative) / cMatrix.size);
  return (actualAgreement - expectedAgreement) / (1 - expectedAgreement);
}
