import { subtract, add, divide, multiply, truncate, sqrt, rep } from "../Utilities/ops";
import { sum } from "d3-array";
import { type controlLimitsObject, type controlLimitsArgs } from "../typedefs";

export default function uLimits(args: controlLimitsArgs): controlLimitsObject {
  const cl: number = divide(sum(args.numerators),sum(args.denominators as number[]));
  const sigma: number[] = sqrt(divide(cl,args.denominators as number[]));

  return {
    labels: args.labels,
    values: divide(args.numerators, args.denominators as number[]),
    numerators: args.numerators,
    denominators: args.denominators,
    targets: rep(cl, args.labels.length),
    ll99: truncate(subtract(cl, multiply(3, sigma)), {lower: 0}),
    ll95: truncate(subtract(cl, multiply(2, sigma)), {lower: 0}),
    ll68: truncate(subtract(cl, multiply(1, sigma)), {lower: 0}),
    ul68: add(cl, multiply(1, sigma)),
    ul95: add(cl, multiply(2, sigma)),
    ul99: add(cl, multiply(3, sigma))
  }
}
