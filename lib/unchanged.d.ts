import { OperatorFunction } from "rxjs";
export declare function filterUnchanged<T>(hasChanged?: (previous: T, current: T) => boolean): OperatorFunction<T, T>;
