import { abs, diff, divide, rep, median, mean } from "../Functions";
import { type controlLimitsObjectBase, type controlLimitsArgsBase } from "../types";

export default function imLimits<T>(args: controlLimitsArgsBase<T>): controlLimitsObjectBase<T> {
  const useRatio: boolean = (args.denominators && args.denominators.length > 0) as boolean;
  const ratio: number[] = useRatio
    ? divide(args.numerators, args.denominators as number[])
    : args.numerators;

  const cl: number = median(ratio) as number;

  const consec_diff: number[] = abs(diff(ratio));
  const consec_diff_ulim: number = mean(consec_diff) as number * 3.267;
  const outliers_in_limits: boolean = args.outliers_in_limits as boolean;
  const consec_diff_valid: number[] = outliers_in_limits ? consec_diff : consec_diff.filter(d => d < consec_diff_ulim);

  const sigma: number = mean(consec_diff_valid) as number / 1.128;

  return {
    keys: args.keys,
    values: ratio.map(d => isNaN(d) ? 0 : d),
    numerators: useRatio ? args.numerators : undefined,
    denominators: useRatio ? args.denominators : undefined,
    targets: rep(cl, args.keys.length),
    ll99: rep(cl - 3 * sigma, args.keys.length),
    ll95: rep(cl - 2 * sigma, args.keys.length),
    ll68: rep(cl - 1 * sigma, args.keys.length),
    ul68: rep(cl + 1 * sigma, args.keys.length),
    ul95: rep(cl + 2 * sigma, args.keys.length),
    ul99: rep(cl + 3 * sigma, args.keys.length)
  };
}
