import iLimits from "./i"
import { pow, truncate } from "../Functions";
import { type controlLimitsObjectBase, type controlLimitsArgsBase } from "../types";

export default function tLimits<T>(args: controlLimitsArgsBase<T>): controlLimitsObjectBase<T> {
  const val: number[] = pow(args.numerators, 1 / 3.6);
  const inputArgsCopy: controlLimitsArgsBase<T> = JSON.parse(JSON.stringify(args));
  inputArgsCopy.numerators = val;
  inputArgsCopy.denominators = undefined;
  const limits: controlLimitsObjectBase<T> = iLimits(inputArgsCopy);
  limits.targets = pow(limits.targets, 3.6);
  limits.values = pow(limits.values, 3.6);
  if (limits.ll68 && limits.ul68 && limits.ll95 && limits.ul95 && limits.ll99 && limits.ul99) {
    limits.ll99 = truncate(pow(limits.ll99, 3.6), {lower: 0});
    limits.ll95 = truncate(pow(limits.ll95, 3.6), {lower: 0});
    limits.ll68 = truncate(pow(limits.ll68, 3.6), {lower: 0});
    limits.ul68 = pow(limits.ul68, 3.6);
    limits.ul95 = pow(limits.ul95, 3.6);
    limits.ul99 = pow(limits.ul99, 3.6);
  }

  return limits;
}
