import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";

export function once<T>(source: Observable<T>): Observable<T> {
    let subject = new BehaviorSubject<T>(undefined);
    let filteredSubject = subject.pipe(filter((_) => hasItem));
    let subNumber = 0;
    let sourceSubscription: Subscription = null;
    let hasItem = false;

    return new Observable<T>((subscriber) => {
        if (subNumber === 0) {
            if (sourceSubscription) {
                console.warn('There shouldn\'t be an active subscription if there are no subscribers');
                sourceSubscription.unsubscribe();
            }
            sourceSubscription = source.pipe(tap(_ => hasItem = true)).subscribe(subject);
        }
        subscriber.add(() => {
            subNumber--;
            if (subNumber === 0) {
                sourceSubscription.unsubscribe();
                sourceSubscription = null;
                hasItem = false;
                subject.next(undefined);
            }
        })
        subNumber++;
        return filteredSubject.subscribe(subscriber);
    })
}