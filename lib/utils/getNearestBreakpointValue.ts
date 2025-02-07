import { getNearestBreakpoint } from "./getNearestBreakpoint";
import { BreakpointSize } from "../ScreenProvider";

type BreakpointValues<T> = {
  [Property in BreakpointSize]?: T;
}

export type BreakpointValuesWithBase<T> = {
  base?: T;
} & BreakpointValues<T>;

type GetNearestBreakpointValueParams<T> = {
  values: BreakpointValuesWithBase<T>
  breakpoint: BreakpointSize;
}

export function getNearestBreakpointValue<T>({
  values,
  breakpoint
}: GetNearestBreakpointValueParams<T>): T | undefined {
  let value = values[breakpoint]

  if (!value) {
    const nearestBreakpoint = getNearestBreakpoint({
      breakpoint,
      availableBreakpoints: Object.keys(values) as BreakpointSize[],
    })

    value = values[nearestBreakpoint ?? 'base']
  }

  return value
}