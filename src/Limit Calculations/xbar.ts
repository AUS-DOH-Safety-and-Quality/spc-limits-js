import { type controlLimitsObject, type controlLimitsArgs } from "../typedefs";
import { sqrt, subtract, multiply, divide, add, rep } from "../Utilities/ops";
import { sum } from "d3-array";
import { a3 } from "../Utilities/Constants";

export default function xbarLimits(args: controlLimitsArgs): controlLimitsObject {
  // Calculate number of observations in each group
  const count_per_group: number[] = args.denominators as number[];

  // Calculate the mean for each group
  const group_means: number[] = args.numerators;

  // Calculate the SD for each group
  const group_sd: number[] = args.xbar_sds as number[];

  // Calculate weighted SD
  const Nm1: number[] = count_per_group.map((x: number) => x - 1);
  const sd_tmp: number[] = Nm1.map((x: number, idx: number) => x * group_sd[idx] * group_sd[idx]);
  const sd: number = sqrt(sum(sd_tmp) / sum(Nm1));

  // Calculated weighted mean (for centreline)
  const cl: number = sum(multiply(count_per_group, group_means)) / sum(count_per_group);

  // Sample-size dependent constant
  const A3: number[] = a3(count_per_group);

  return {
    labels: args.labels,
    values: group_means,
    targets: rep(cl, args.labels.length),
    ll99: subtract(cl, multiply(A3, sd)),
    ll95: subtract(cl, multiply(multiply(divide(A3, 3), 2), sd)),
    ll68: subtract(cl, multiply(divide(A3, 3), sd)),
    ul68: add(cl, multiply(divide(A3, 3), sd)),
    ul95: add(cl, multiply(multiply(divide(A3, 3), 2), sd)),
    ul99: add(cl, multiply(A3, sd)),
    count: count_per_group
  }
}
