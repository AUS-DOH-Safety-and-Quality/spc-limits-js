import { subtract, pow, multiply, b3, b4, sqrt, rep, sum } from "../Functions";
import { type controlLimitsObjectBase, type controlLimitsArgsBase } from "../types";

export default function sLimits<T>(args: controlLimitsArgsBase<T>): controlLimitsObjectBase<T> {
  const group_sd: number[] = args.numerators;
  const count_per_group: number[] = args.denominators as number[];

  // Per-group sample size minus 1
  const Nm1: number[] = subtract(count_per_group, 1);

  // Calculate weighted SD
  const cl: number = sqrt(sum(multiply(Nm1,pow(group_sd,2))) / sum(Nm1));

  return {
    keys: args.keys,
    values: group_sd,
    targets: rep(cl, args.keys.length),
    ll99: multiply(cl, b3(count_per_group, 3)),
    ll95: multiply(cl, b3(count_per_group, 2)),
    ll68: multiply(cl, b3(count_per_group, 1)),
    ul68: multiply(cl, b4(count_per_group, 1)),
    ul95: multiply(cl, b4(count_per_group, 2)),
    ul99: multiply(cl, b4(count_per_group, 3))
  };
}
