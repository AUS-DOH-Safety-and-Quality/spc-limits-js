import { abs, diff, divide, rep } from "../Utilities/ops";
import { mean } from "d3-array";
import { type controlLimitsObject, type controlLimitsArgs } from "../typedefs";

export default function iLimits(args: controlLimitsArgs): controlLimitsObject {
  const useRatio: boolean = (args.denominators && args.denominators.length > 0) as boolean;
  const ratio: number[] = useRatio
    ? divide(args.numerators, args.denominators as number[])
    : args.numerators;

  const cl: number = mean(ratio) as number;

  const consec_diff: number[] = abs(diff(ratio));
  const consec_diff_ulim: number = mean(consec_diff) as number * 3.267;
  const outliers_in_limits: boolean = args.outliers_in_limits as boolean;
  const consec_diff_valid: number[] = outliers_in_limits ? consec_diff : consec_diff.filter(d => d < consec_diff_ulim);

  const sigma: number = mean(consec_diff_valid) as number / 1.128;

  return {
    labels: args.labels,
    values: ratio.map(d => isNaN(d) ? 0 : d),
    numerators: useRatio ? args.numerators : undefined,
    denominators: useRatio ? args.denominators : undefined,
    targets: rep(cl, args.labels.length),
    ll99: rep(cl - 3 * sigma, args.labels.length),
    ll95: rep(cl - 2 * sigma, args.labels.length),
    ll68: rep(cl - 1 * sigma, args.labels.length),
    ul68: rep(cl + 1 * sigma, args.labels.length),
    ul95: rep(cl + 2 * sigma, args.labels.length),
    ul99: rep(cl + 3 * sigma, args.labels.length)
  };
}
