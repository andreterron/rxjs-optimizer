import { OperatorFunction } from "rxjs";
import { filter } from "rxjs/operators";

export function filterUnchanged<T>(hasChanged: (previous: T, current: T) => boolean = (a, b) => (a !== b)): OperatorFunction<T, T> {
    let value: T;
    return filter((v, i) => {
        if (i === 0 || hasChanged(value, v)) {
            value = v;
            return true;
        }
        return false;
    })
}