import { Subject, Observable } from "rxjs";
import { toArray } from "rxjs/operators";

export async function testInputOutput<T, O = T>(subject: Subject<T>, observable: Observable<O>, input: T[], output: O[]): Promise<O[]> {
    let promise = observable.pipe(toArray()).toPromise();
    input.forEach(v => subject.next(v));
    subject.complete();
    let data = await promise;
    expect(data).toEqual(output);
    return data;
}