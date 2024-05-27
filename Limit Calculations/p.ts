import { subtract, add, divide, multiply, truncate, sqrt, rep, sum } from "../Functions";
import { type controlLimitsObjectBase, type controlLimitsArgsBase } from "../types";

export default function pLimits<T>(args: controlLimitsArgsBase<T>): controlLimitsObjectBase<T> {
  const cl: number = sum(args.numerators) / sum(args.denominators as number[]);
  const sigma: number[] = sqrt(divide(cl * (1 - cl), args.denominators as number[]));

  return {
    keys: args.keys,
    values: divide(args.numerators, args.denominators as number[]),
    numerators: args.numerators,
    denominators: args.denominators,
    targets: rep(cl, args.keys.length),
    ll99: truncate(subtract(cl, multiply(3, sigma)), {lower: 0}),
    ll95: truncate(subtract(cl, multiply(2, sigma)), {lower: 0}),
    ll68: truncate(subtract(cl, multiply(1, sigma)), {lower: 0}),
    ul68: truncate(add(cl, multiply(1, sigma)), {upper: 1}),
    ul95: truncate(add(cl, multiply(2, sigma)), {upper: 1}),
    ul99: truncate(add(cl, multiply(3, sigma)), {upper: 1})
  };
}
