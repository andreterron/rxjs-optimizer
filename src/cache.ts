import {Observable, pipe, OperatorFunction, concat, of, empty, observable, Subject, BehaviorSubject, merge} from 'rxjs';
import { tap, switchMap, map, filter, skip } from 'rxjs/operators';

export interface CachePipeOptions<T = any> {
    key?: (a: T) => string,
    cacheSize?: number
}

const DEFAULT_CACHE_OPTIONS: CachePipeOptions<any> = {
    key: (a: any) => '' + a,
    cacheSize: 10
}

export type OperationsWrapper = {
    <T>(): OperatorFunction<T, T>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>): OperatorFunction<T, A>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): OperatorFunction<T, B>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): OperatorFunction<T, C>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): OperatorFunction<T, D>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): OperatorFunction<T, E>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): OperatorFunction<T, F>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): OperatorFunction<T, G>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): OperatorFunction<T, H>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): OperatorFunction<T, I>,
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): OperatorFunction<T, any>;
}

function cacheWithOptions<T = any>(options: CachePipeOptions<T>): OperationsWrapper {

    let cacheMap: {[k: string]: any} = {};
    let keyQueue: any[] = [];

    let {key, cacheSize} = Object.assign({}, DEFAULT_CACHE_OPTIONS, options);

    return (...ops: OperatorFunction<any, any>[]) => {
        return switchMap(sourceData => {
            let input = of(sourceData);
            let k = key(sourceData);

            let addToCache = tap(v => {
                let index = keyQueue.indexOf(k);
                if (index !== -1) {
                    keyQueue.splice(index, 1);
                }
                while (keyQueue.length >= cacheSize) {
                    let deleteKey = keyQueue.shift();
                    if (deleteKey)
                        delete cacheMap[deleteKey];
                }
                cacheMap[k] = v;
                keyQueue.push(k);
            });

            return concat(
                cacheMap[k] ? of(cacheMap[k]) : empty(),
                input.pipe.apply(input, [...ops, addToCache])
            )
        })
    }
}

export function cachePipe<T>(): OperatorFunction<T, T>
export function cachePipe<T, A>(op1: OperatorFunction<T, A>): OperatorFunction<T, A>
export function cachePipe<T, A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): OperatorFunction<T, B>
export function cachePipe<T, A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): OperatorFunction<T, C>
export function cachePipe<T, A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): OperatorFunction<T, D>
export function cachePipe<T, A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): OperatorFunction<T, E>
export function cachePipe<T, A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): OperatorFunction<T, F>
export function cachePipe<T, A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): OperatorFunction<T, G>
export function cachePipe<T, A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): OperatorFunction<T, H>
export function cachePipe<T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): OperatorFunction<T, I>
export function cachePipe<T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): OperatorFunction<T, any>;
export function cachePipe(...ops: OperatorFunction<any, any>[]): OperatorFunction<any, any> {
    let c = cacheWithOptions(DEFAULT_CACHE_OPTIONS);
    return c.apply(c, [...ops]);
}

cachePipe.options = <T = any>(options?: CachePipeOptions<T>): OperationsWrapper => {
    return cacheWithOptions<T>(options);
}
