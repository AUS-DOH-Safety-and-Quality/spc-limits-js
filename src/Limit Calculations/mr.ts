import { abs, diff, divide, rep } from "../Utilities/ops";
import { mean } from "d3-array";
import { type controlLimitsObject, type controlLimitsArgs } from "../typedefs";

export default function mrLimits(args: controlLimitsArgs): controlLimitsObject {
  const useRatio: boolean = (args.denominators && args.denominators.length > 0) as boolean;
  const ratio: number[] = useRatio
    ? divide(args.numerators, args.denominators as number[])
    : args.numerators;

  const consec_diff: number[] = abs(diff(ratio));
  const cl: number = mean(consec_diff) as number;

  return {
    labels: args.labels.slice(1),
    values: consec_diff.slice(1),
    numerators: useRatio ? args.numerators.slice(1) : undefined,
    denominators: useRatio ? (args.denominators as number[]).slice(1) : undefined,
    targets: rep(cl, args.labels.length - 1),
    ll99: rep(0, args.labels.length - 1),
    ll95: rep(0, args.labels.length - 1),
    ll68: rep(0, args.labels.length - 1),
    ul68: rep((3.267 / 3) * 1 * cl, args.labels.length - 1),
    ul95: rep((3.267 / 3) * 2 * cl, args.labels.length - 1),
    ul99: rep(3.267 * cl, args.labels.length - 1)
  };
}
