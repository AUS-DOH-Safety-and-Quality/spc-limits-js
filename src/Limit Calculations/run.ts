import { divide, rep } from "../Utilities/ops";
import { median } from "d3-array";
import { type controlLimitsObject, type controlLimitsArgs } from "../typedefs";

export default function runLimits(args: controlLimitsArgs): controlLimitsObject {
  const useRatio: boolean = (args.denominators && args.denominators.length > 0) as boolean;
  const ratio: number[] = useRatio
    ? divide(args.numerators, args.denominators as number[])
    : args.numerators;

  const cl: number = median(ratio) as number;
  return {
    labels: args.labels,
    values: ratio.map(d => isNaN(d) ? 0 : d),
    numerators: useRatio ? args.numerators : undefined,
    denominators: useRatio ? args.denominators : undefined,
    targets: rep(cl, args.labels.length)
  };
}
