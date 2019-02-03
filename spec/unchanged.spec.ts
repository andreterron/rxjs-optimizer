import 'jasmine';
import { Subject, Observable } from 'rxjs';

import { testInputOutput } from './helpers/helpers';

import { filterUnchanged } from '..';

describe("Filter Unchanged", () => {
    let subject: Subject<any>;
    let source: Observable<any>;
    beforeEach(() => {
        subject = new Subject<any>();
        source = subject.asObservable();
    });
    it("should filter repeating numbers", async () => {
        await testInputOutput(subject, source.pipe(filterUnchanged()), [0,0,0,0], [0]);
    })
    it("should not filter changing numbers", async () => {
        await testInputOutput(subject, source.pipe(filterUnchanged()), [0,1,2,3], [0,1,2,3]);
    })
    it("should not filter switching numbers", async () => {
        await testInputOutput(subject, source.pipe(filterUnchanged()), [0,1,0,1,0,1], [0,1,0,1,0,1]);
    })
    it("should only filter unchanged numbers", async () => {
        await testInputOutput(subject, source.pipe(filterUnchanged()), [0,0,1,1,0,0,3,3], [0,1,0,3]);
    })
})
