use ndarray::{s, ArrayD, Dimension, IxDyn};
use std::{f32::EPSILON, ops::{Div, Mul, Sub}};

use crate::{ActivationLayer, CPUActivation, SoftmaxLayer};

pub struct ActivationCPULayer {
    pub outputs: ArrayD<f32>,
    pub activation: CPUActivation,
}

impl ActivationCPULayer {
    pub fn new(config: ActivationLayer, size: IxDyn) -> Self {
        Self {
            outputs: ArrayD::zeros(size),
            activation: CPUActivation::from(config.activation),
        }
    }

    pub fn output_size(&self) -> Vec<usize> {
        self.outputs.shape().to_vec()
    }

    pub fn reset(&mut self, batches: usize) {
        let mut output_size = self.outputs.shape().to_vec();
        output_size[0] = batches;
        self.outputs = ArrayD::zeros(output_size);
    }

    pub fn forward_propagate(&mut self, inputs: ArrayD<f32>) -> ArrayD<f32> {
        let outputs = if CPUActivation::memoize_output(&self.activation) {
            self.outputs = inputs.map(self.activation.activate);
            self.outputs.clone()
        } else {
            self.outputs = inputs.clone();
            inputs.map(self.activation.activate)
        };
        outputs.into_dyn()
    }

    pub fn backward_propagate(&mut self, d_outputs: ArrayD<f32>) -> ArrayD<f32> {
        let d_inputs = d_outputs.mul(self.outputs.map(self.activation.prime));
        d_inputs.into_dyn()
    }
}

pub struct SoftmaxCPULayer {
    pub outputs: ArrayD<f32>,
    pub temperature: f32,
}

impl SoftmaxCPULayer {
    pub fn new(config: SoftmaxLayer, size: IxDyn) -> Self {
        Self {
            temperature: config.temperature.unwrap_or(1f32),
            outputs: ArrayD::zeros(size),
        }
    }

    pub fn output_size(&self) -> Vec<usize> {
        self.outputs.shape().to_vec()
    }

    pub fn reset(&mut self, batches: usize) {
        let mut output_size = self.outputs.shape().to_vec();
        output_size[0] = batches;
        self.outputs = ArrayD::zeros(output_size);
    }

    pub fn forward_propagate(&mut self, inputs: ArrayD<f32>) -> ArrayD<f32> {
        self.outputs = inputs.clone();
        let batches = self.outputs.dim()[0];
        for b in 0..batches {
            let current_input = inputs.slice(s![b, ..]).map(|x| x / self.temperature);
            let max = current_input.iter().cloned().fold(f32::NEG_INFINITY, f32::max);
            let exp = current_input.map(|x| (x - max).exp());
            self.outputs
                .slice_mut(s![b, ..])
                .assign(&exp.clone().div(exp.sum() + EPSILON));
        }
        self.outputs.clone().into_dyn()
    }

    pub fn backward_propagate(&mut self, d_outputs: ArrayD<f32>) -> ArrayD<f32> {
        let batches = self.outputs.dim()[0];
        let array_size = self.outputs.dim().size() / batches;
        let mut d_inputs = ArrayD::zeros(self.outputs.dim());
        for b in 0..batches {
            for y in 0..array_size {
                for x in 0..array_size {
                    let out1 = self.outputs[[b, y]];
                    let out2 = self.outputs[[b, x]];
                    let d_out = d_outputs[[b, x]];
                    if x == y {
                        d_inputs[[b, y]] += out1.sub(out1.powi(2)).mul(d_out);
                    } else {
                        d_inputs[[b, y]] += -out1.mul(out2).mul(d_out);
                    }
                }
            }
        }
        d_inputs
    }
}
