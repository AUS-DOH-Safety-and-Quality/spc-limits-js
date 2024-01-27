import gammaln from "@stdlib/math-base-special-gammaln";

type ReturnT<Input1T, Input2T, BaseT>
  = Input1T extends Array<any>
    ? BaseT[]
    : Input2T extends Array<any>
      ? BaseT[]
      : BaseT;

export function broadcastBinary<ScalarInput1T, ScalarInput2T, ScalarReturnT>(fun: (x: ScalarInput1T, y: ScalarInput2T) => ScalarReturnT) {
  return function<T1 extends ScalarInput1T | ScalarInput1T[],
                  T2 extends ScalarInput2T | ScalarInput2T[]>(x: T1, y: T2): ReturnT<T1, T2, ScalarReturnT> {
    // Need to provide type hints that the scalar type of the input arguments
    // will always match the function argument types
    type ScalarT1 = Extract<T1, ScalarInput1T>;
    type ScalarT2 = Extract<T2, ScalarInput2T>;

    if (Array.isArray(x) && Array.isArray(y)) {
      return x.map((d, idx) => fun(d, y[idx])) as ReturnT<T1, T2, ScalarReturnT>;
    } else if (Array.isArray(x) && !Array.isArray(y)) {
      return x.map(d => fun(d, y as ScalarT2)) as ReturnT<T1, T2, ScalarReturnT>;
    } else if(!Array.isArray(x) && Array.isArray(y)) {
      return y.map(d => fun(x as ScalarT1, d)) as ReturnT<T1, T2, ScalarReturnT>;
    } else {
      return fun(x as ScalarT1, y as ScalarT2) as ReturnT<T1, T2, ScalarReturnT>;
    }
  };
}

type UnaryReturnT<InputT, BaseT> = InputT extends Array<any> ? BaseT[] : BaseT;

export function broadcastUnary<ScalarInputT, ScalarReturnT>(fun: (x: ScalarInputT) => ScalarReturnT) {
  return function<T extends ScalarInputT | ScalarInputT[]>(y: T): UnaryReturnT<T, ScalarReturnT> {
    if (Array.isArray(y)) {
      return (y as ScalarInputT[]).map((d: ScalarInputT) => fun(d)) as UnaryReturnT<T, ScalarReturnT>;
    } else {
      return fun(y as Extract<T, ScalarInputT>) as UnaryReturnT<T, ScalarReturnT>;
    }
  };
}

export const pow = broadcastBinary((x: number, y: number): number => (x >= 0.0) ? Math.pow(x, y) : -Math.pow(-x, y));
export const add = broadcastBinary((x: number, y: number): number => x + y);
export const subtract = broadcastBinary((x: number, y: number): number => x - y);
export const divide = broadcastBinary((x: number, y: number): number => x / y);
export const multiply = broadcastBinary(
  (x: number, y: number): number => {
    return (x === null || y === null) ? <number><unknown>null : (x * y);
});

export const sqrt = broadcastUnary(Math.sqrt);
export const abs = broadcastUnary((x: number): number => (x ? Math.abs(x) : x));
export const exp = broadcastUnary(Math.exp);
export const lgamma = broadcastUnary(gammaln);
export const square = broadcastUnary((x: number): number => Math.pow(x, 2));

export function rep<T>(x: T, n: number) : T[] {
  return Array<T>(n).fill(x);
}

export const truncate = broadcastBinary(
  (val: number, limits: { lower?: number, upper?: number }): number => {
    let rtn: number = val;
    if (limits.lower || limits.lower == 0) {
      rtn = (rtn < limits.lower ? limits.lower : rtn)
    }
    if (limits.upper) {
      rtn = (rtn > limits.upper ? limits.upper : rtn);
    }
    return rtn;
  }
)

export function diff(x: number[]): number[] {
  return x.map((d, idx, arr) =>
    ((idx > 0) ? d - arr[idx - 1] : null) as number
  );
}
