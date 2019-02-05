import { OperatorFunction } from 'rxjs';
export interface CachePipeOptions<T = any> {
    key?: (a: T) => string;
    cacheSize?: number;
}
export declare type OperationsWrapper = {
    <T>(): OperatorFunction<T, T>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>): OperatorFunction<T, A>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): OperatorFunction<T, B>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): OperatorFunction<T, C>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): OperatorFunction<T, D>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): OperatorFunction<T, E>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): OperatorFunction<T, F>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): OperatorFunction<T, G>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): OperatorFunction<T, H>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): OperatorFunction<T, I>;
    <T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): OperatorFunction<T, any>;
};
export declare function cachePipe<T>(): OperatorFunction<T, T>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A>(op1: OperatorFunction<T, A>): OperatorFunction<T, A>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): OperatorFunction<T, B>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): OperatorFunction<T, C>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): OperatorFunction<T, D>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): OperatorFunction<T, E>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): OperatorFunction<T, F>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): OperatorFunction<T, G>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): OperatorFunction<T, H>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): OperatorFunction<T, I>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
export declare function cachePipe<T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): OperatorFunction<T, any>;
export declare namespace cachePipe {
    var options: <T = any>(options?: CachePipeOptions<T>) => OperationsWrapper;
}
