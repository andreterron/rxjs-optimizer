import { Observable, BehaviorSubject, Subscription, Subject } from "rxjs";
import { filter, tap } from "rxjs/operators";

export type SingleSubscriberCacheType = 'none' | 'subscribed' | 'keep';

export interface SingleSubscriberOptions {
    cache?: SingleSubscriberCacheType;
}

const DEFAULT_SINGLE_OPTIONS: SingleSubscriberOptions = {
    cache: 'subscribed'
}

export function singleSubscriber<T>(options?: SingleSubscriberOptions) {
    let { cache } = Object.assign({}, DEFAULT_SINGLE_OPTIONS, options);
    if (cache !== 'none' && cache !== 'keep') cache = 'subscribed'; // ensure this options is a valid value
    return (source: Observable<T>): Observable<T> => {
        let subject = (cache !== 'none') ? new BehaviorSubject<T>(undefined) : new Subject<T>();
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
                    if (cache !== 'keep') {
                        hasItem = false;
                        if (cache === 'subscribed')
                            subject.next(undefined);
                    }
                }
            })
            subNumber++;
            return filteredSubject.subscribe(subscriber);
        });
    }
}