import { abs, diff, divide, rep, mean } from "../Functions";
import { type controlLimitsObjectBase, type controlLimitsArgsBase } from "../types";

export default function mrLimits<T>(args: controlLimitsArgsBase<T>): controlLimitsObjectBase<T> {
  const useRatio: boolean = (args.denominators && args.denominators.length > 0) as boolean;
  const ratio: number[] = useRatio
    ? divide(args.numerators, args.denominators as number[])
    : args.numerators;

  const consec_diff: number[] = abs(diff(ratio));
  const cl: number = mean(consec_diff) as number;

  return {
    keys: args.keys.slice(1),
    values: consec_diff.slice(1),
    numerators: useRatio ? args.numerators.slice(1) : undefined,
    denominators: useRatio ? args.denominators?.slice(1) : undefined,
    targets: rep(cl, args.keys.length - 1),
    ll99: rep(0, args.keys.length - 1),
    ll95: rep(0, args.keys.length - 1),
    ll68: rep(0, args.keys.length - 1),
    ul68: rep((3.267 / 3) * 1 * cl, args.keys.length - 1),
    ul95: rep((3.267 / 3) * 2 * cl, args.keys.length - 1),
    ul99: rep(3.267 * cl, args.keys.length - 1)
  };
}
