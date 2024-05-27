import { divide, rep, median } from "../Functions";
import { type controlLimitsObjectBase, type controlLimitsArgsBase } from "../types";

export default function runLimits<T>(args: controlLimitsArgsBase<T>): controlLimitsObjectBase<T> {
  const useRatio: boolean = (args.denominators && args.denominators.length > 0) as boolean;
  const ratio: number[] = useRatio
    ? divide(args.numerators, args.denominators as number[])
    : args.numerators;

  const cl: number = median(ratio) as number;
  return {
    keys: args.keys,
    values: ratio.map(d => isNaN(d) ? 0 : d),
    numerators: useRatio ? args.numerators : undefined,
    denominators: useRatio ? args.denominators : undefined,
    targets: rep(cl, args.keys.length)
  };
}
