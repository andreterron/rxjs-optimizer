"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function once(source) {
    let subject = new rxjs_1.BehaviorSubject(undefined);
    let filteredSubject = subject.pipe(operators_1.filter((_) => hasItem));
    let subNumber = 0;
    let sourceSubscription = null;
    let hasItem = false;
    return new rxjs_1.Observable((subscriber) => {
        if (subNumber === 0) {
            if (sourceSubscription) {
                console.warn('There shouldn\'t be an active subscription if there are no subscribers');
                sourceSubscription.unsubscribe();
            }
            sourceSubscription = source.pipe(operators_1.tap(_ => hasItem = true)).subscribe(subject);
        }
        subscriber.add(() => {
            subNumber--;
            if (subNumber === 0) {
                sourceSubscription.unsubscribe();
                sourceSubscription = null;
                hasItem = false;
                subject.next(undefined);
            }
        });
        subNumber++;
        return filteredSubject.subscribe(subscriber);
    });
}
exports.once = once;
