import 'jasmine';
import { Subject, Observable } from 'rxjs';
import { toArray, switchMap, map } from 'rxjs/operators';

import { cachePipe } from '../src/index';

describe("Cache Pipe", () => {
    let subject: Subject<any>;
    let source: Observable<any>;
    let objects: {[k: string]: Subject<any>};
    beforeEach(() => {
        subject = new Subject<any>();
        source = subject.asObservable();
        objects = {
            foo: new Subject<any>(),
            bar: new Subject<any>(),
            baz: new Subject<any>()
        }
    });
    it("should cache the last value of specified input", async () => {
        let cached = source.pipe(cachePipe(
            map(k => k.toLowerCase()),
            switchMap(val => objects[val]),
        ));
        let promise = cached.pipe(toArray()).toPromise();
        subject.next('foo')
        objects.foo.next(10)
        subject.next('bar')
        objects.bar.next(20)
        subject.next('foo')
        objects.foo.next(11)
        subject.complete();
        objects.foo.complete();
        objects.bar.complete();
        let res = await promise;
        expect(res).toEqual([10,20,10,11]);
    })
    it("must not get values of an old input", async () => {
        let cached = source.pipe(cachePipe(
            map(k => k.toLowerCase()),
            switchMap(val => objects[val])  
        ));
        let promise = cached.pipe(toArray()).toPromise();
        subject.next('foo')
        objects.foo.next(10)
        subject.next('bar')
        objects.foo.next(11)
        objects.bar.next(20)
        subject.next('foo')
        objects.foo.next(12)
        subject.complete();
        objects.foo.complete();
        objects.bar.complete();
        let res = await promise;
        expect(res).toEqual([10,20,10,12]);
    })
    it("should accept options", async () => {
        let cached = source.pipe(cachePipe.options({cacheSize: 2})(
            map(k => k.toLowerCase()),
            switchMap(val => objects[val])  
        ));
        let promise = cached.pipe(toArray()).toPromise();
        subject.next('foo')
        objects.foo.next(10)
        subject.next('bar')
        objects.foo.next(11)
        objects.bar.next(20)
        subject.next('foo')
        objects.foo.next(12)
        subject.complete();
        objects.foo.complete();
        objects.bar.complete();
        let res = await promise;
        expect(res).toEqual([10,20,10,12]);
    })
    it("should not cache more than the defined size", async () => {
        let cached = source.pipe(cachePipe.options({cacheSize: 2})(
            map(k => k.toLowerCase()),
            switchMap(val => objects[val])  
        ));
        let promise = cached.pipe(toArray()).toPromise();
        subject.next('foo')
        objects.foo.next(10)
        subject.next('bar')
        objects.bar.next(20)
        subject.next('baz')
        objects.baz.next(30)
        subject.next('foo')
        objects.foo.next(11)
        subject.complete();
        objects.foo.complete();
        objects.bar.complete();
        objects.baz.complete();
        let res = await promise;
        expect(res).toEqual([10,20,30,11]);
    })
})
