import { truncate, rep } from "../Utilities/ops";
import { mean } from "d3-array";
import { type controlLimitsObject, type controlLimitsArgs } from "../typedefs";

/**
 * Calculates the control limits for an SPC C Chart.
 *
 * The control limits are calculated using:
 * - Center Line (CL): mean(numerators)
 * - Sigma (σ): sqrt(CL)
 * - Lower Control Limit (LCL): max(CL - 3*σ, 0)
 * - Upper Control Limit (UCL): CL + 3*σ
 *
 * Note: The control limits are truncated to 0 if they fall below 0.
 *
 * @param {controlLimitsArgs} args - The arguments for calculating control limits.
 * It includes labels (categories), and numerators (values for each category).
 * @returns {controlLimitsObject} An object containing the labels, values, targets (center line),
 * and the lower and upper control limits for both 95% and 99% confidence intervals.
 */
export default function cLimits(args: controlLimitsArgs): controlLimitsObject {
  const cl: number = mean(args.numerators) as number;
  const sigma: number = Math.sqrt(cl);

  return {
    labels: args.labels,
    values: args.numerators,
    targets: rep(cl, args.labels.length),
    ll99: rep(truncate(cl - 3 * sigma, { lower: 0 }), args.labels.length),
    ll95: rep(truncate(cl - 2 * sigma, { lower: 0 }), args.labels.length),
    ll68: rep(truncate(cl - 1 * sigma, { lower: 0 }), args.labels.length),
    ul68: rep(cl + 1*sigma, args.labels.length),
    ul95: rep(cl + 2*sigma, args.labels.length),
    ul99: rep(cl + 3*sigma, args.labels.length),
  };
}
