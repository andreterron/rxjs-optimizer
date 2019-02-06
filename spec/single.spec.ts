import 'jasmine';
import { Subject, Observable, Subscriber, Subscription } from 'rxjs';

import { testInputOutput } from './helpers/helpers';

import { singleSubscriber } from '../src/index';
import { first } from 'rxjs/operators';

describe("Single Subscriber", () => {
    let subject: Subject<any>;
    let source: Observable<any>;
    beforeEach(() => {
        subject = new Subject<any>();
        source = subject.asObservable();
    });
    it("should receive the data from the source", async () => {
        await testInputOutput(subject, source.pipe(singleSubscriber()), [0,1,2,3], [0,1,2,3]);
    })
    it("should only be subscribed once", async () => {
        let subs: Subscriber<any>[] = []
        let src = new Observable<any>((sub) => {
            subs.push(sub);
            return () => {
                let i = subs.indexOf(sub);
                expect(i).not.toBe(-1);
                subs.splice(i, 1);
            }
        });
        let observable = src.pipe(singleSubscriber());
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
        let observable = src.pipe(singleSubscriber());
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
        let observable = src.pipe(singleSubscriber());
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
        let observable = source.pipe(singleSubscriber());

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
        let observable = source.pipe(singleSubscriber());

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
        let observable = source.pipe(singleSubscriber());

        // First subscription
        let items = [];
        let unsub = observable.subscribe((v) => items.push(v));
        [1,2,3].forEach(v => subject.next(v));

        // Second subscription
        let latest = await observable.pipe(first()).toPromise();
        expect(latest).toBe(3);

        unsub.unsubscribe();
    })
    it("should not cache previous values with cache:'none' option", async () => {
        let observable = source.pipe(singleSubscriber({cache: 'none'}));

        // First subscription
        let items = [];
        let unsub = [];
        unsub.push(observable.subscribe((v) => items.push(v)));
        [1,2,3].forEach(v => subject.next(v));

        // Second subscription
        let latest: number = null;
        unsub.push(observable.subscribe((v) => latest = v));
        expect(latest).toBe(null);
        subject.next(4);
        expect(latest).toBe(4);
        expect(items).toEqual([1,2,3,4]);

        unsub.forEach(u => u.unsubscribe());
    })
    it("should keep last value with cache:'keep' option", async () => {
        let observable = source.pipe(singleSubscriber({cache: 'keep'}));

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
        expect(items).toEqual([3]); // Last known item
        [5,6,7].forEach(v => subject.next(v));
        unsub.unsubscribe();
        expect(items).toEqual([3,5,6,7]);
    })
})
