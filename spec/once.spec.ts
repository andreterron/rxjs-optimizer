import 'jasmine';
import { Subject, Observable, Subscriber, Subscription } from 'rxjs';

import { testInputOutput } from './helpers/helpers';

import { once } from '../src/index';
import { first } from 'rxjs/operators';

describe("Subscribe Once", () => {
    let subject: Subject<any>;
    let source: Observable<any>;
    beforeEach(() => {
        subject = new Subject<any>();
        source = subject.asObservable();
    });
    it("should receive the data from the source", async () => {
        await testInputOutput(subject, once(source), [0,1,2,3], [0,1,2,3]);
    })
    it("should to only be subscribed once", async () => {
        let subs: Subscriber<any>[] = []
        let src = new Observable<any>((sub) => {
            subs.push(sub);
            return () => {
                let i = subs.indexOf(sub);
                expect(i).not.toBe(-1);
                subs.splice(i, 1);
            }
        });
        let observable = once(src);
        expect(subs.length).toBe(0);
        let unsubs: Subscription[] = [];
        unsubs.push(observable.subscribe());
        unsubs.push(observable.subscribe());
        expect(subs.length).toBe(1);
        unsubs.forEach(u => u.unsubscribe());
    })
    it("should unsubscribe when no subscribers", async () => {
        let subs: Subscriber<any>[] = []
        let src = new Observable<any>((sub) => {
            subs.push(sub);
            return () => {
                let i = subs.indexOf(sub);
                expect(i).not.toBe(-1);
                subs.splice(i, 1);
            }
        });
        let observable = once(src);
        expect(subs.length).toBe(0);
        let unsubs: Subscription[] = [];
        unsubs.push(observable.subscribe());
        unsubs.push(observable.subscribe());
        expect(subs.length).toBe(1);
        unsubs.forEach(u => u.unsubscribe());
        expect(subs.length).toBe(0);
    })
    it("should resubscribe when subscribing again", async () => {
        let subs: Subscriber<any>[] = []
        let src = new Observable<any>((sub) => {
            subs.push(sub);
            return () => {
                let i = subs.indexOf(sub);
                expect(i).not.toBe(-1);
                subs.splice(i, 1);
            }
        });
        let observable = once(src);
        expect(subs.length).toBe(0);
        let unsubs: Subscription[] = [];
        unsubs.push(observable.subscribe());
        unsubs.push(observable.subscribe());
        expect(subs.length).toBe(1);
        unsubs.forEach(u => u.unsubscribe());
        unsubs = [];
        expect(subs.length).toBe(0);
        unsubs.push(observable.subscribe());
        unsubs.push(observable.subscribe());
        expect(subs.length).toBe(1);
        unsubs.forEach(u => u.unsubscribe());
        expect(subs.length).toBe(0);
    })
    it("should resubscribe when subscribing again", async () => {
        let observable = once(source);

        // First subscription
        let items = [];
        let unsub = observable.subscribe((v) => items.push(v));
        [1,2,3].forEach(v => subject.next(v));
        unsub.unsubscribe();
        expect(items).toEqual([1,2,3]);

        // Resubscribe
        items = [];
        unsub = observable.subscribe((v) => items.push(v));
        [5,6,7].forEach(v => subject.next(v));
        unsub.unsubscribe();
        expect(items).toEqual([5,6,7]);
    })
    it("should ignore values when there aren't subscriptions", async () => {
        let observable = once(source);

        // First subscription
        let items = [];
        let unsub = observable.subscribe((v) => items.push(v));
        [1,2,3].forEach(v => subject.next(v));
        unsub.unsubscribe();
        expect(items).toEqual([1,2,3]);

        // Nothing should happen
        subject.next(4);
        expect(items).toEqual([1,2,3]);

        // Resubscribe
        items = [];
        unsub = observable.subscribe((v) => items.push(v));
        [5,6,7].forEach(v => subject.next(v));
        unsub.unsubscribe();
        expect(items).toEqual([5,6,7]);
    })
    it("should send the last value when another subscription happens", async () => {
        let observable = once(source);

        // First subscription
        let items = [];
        let unsub = observable.subscribe((v) => items.push(v));
        [1,2,3].forEach(v => subject.next(v));

        // Second subscription
        let latest = await observable.pipe(first()).toPromise();
        expect(latest).toBe(3);

        unsub.unsubscribe();
    })
})
