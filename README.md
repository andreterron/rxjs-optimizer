# RxJS Optimizers

A collection of operators and methods to help optimize RxJS based development.

# Get Started

```
npm install --save rxjs-optimizers
yarn add rxjs-optimizers
```

# List of optimizers

## Filter Unchanged

Filter unchanged values to avoid re-processing for the same input

### Usage:

```ts
import { filterUnchangable } from 'rxjs-optimizer';

observable.pipe(filterUnchanged());
observable.pipe(filterUnchanged((a,b) => a !== b)); // custom change check
```

### Parameters and Options:

```ts
import { filterUnchangable } from 'rxjs-optimizer';

filterUnchangable(
    /**
     * [optional] Method to determine if the value has changed
     * @type: (previous: T, current: T) => boolean
     * @default: (a, b) => (a !== b)
     */
    hasChanged
)
```

## Cache Pipe

Given a list of operators (eg. `map()`, `filter()`, `switchMap()`, ...), it will cache the final output value given the the initial inputs, so that if the input goes back to a previous input, it will bypass the operators, and send the cached value before running the operators.

If no `key` function option is passed, then it will convert these types to string to use as a cache key: `(string, number, boolean, symbol)`. If it's of a different type, then no caching will be done for that input. This behavior can be customized by passing the `key` option.

### Usage:

```ts
import { cachePipe } from 'rxjs-optimizer';

observable.pipe(cachePipe(...operators));

// custom options
let smallCache = cachePipe.options({cacheSize: 2});
observable.pipe(smallCache(...operators));
```

### Parameters and Options:

```ts
import { cachePipe } from 'rxjs-optimizer';

cachePipe.options({
    /** cacheSize
     * number of input/output pair to keep in the cache
     * @type: number
     * @default: 10
     */
    cacheSize: 10,

    /** key
     * function to get the key given the object received from the source observable
     * @type: (a:any) => string
     * @default: (see description above)
     */
    key: (a) => a.id
})
```


## Single Subscriber

Normally, the observable will call its internal subscribe function with every new subscription. This operator will just subscribe once to the source observable, optionally cache the last value, and send the value to all the subscribers of the resulting observable.

By default, if the subscriber count arrives at zero, then the wrapper will unsubscribe from the wrapped observable, and will reset the cache, to avoid extra use of memory or processing. This behavior can be customized using the `cache` option

### Usage:

```ts
import { singleSubscriber } from 'rxjs-optimizer';

observable.pipe(singleSubscriber());

observable.pipe(singleSubscriber({cache: 'none'}));
observable.pipe(singleSubscriber({cache: 'subscribed'})); // default
observable.pipe(singleSubscriber({cache: 'keep'}));
```

### Parameters and Options:

```ts
import { singleSubscriber } from 'rxjs-optimizer';

singleSubscriber({
    /**
     * [optional] Enum to determine how the value should be cached:
     *      - 'none'       : Subscribers only receive values emitted while subscribed
     *      - 'subscribed' : If the observable already had a subscriber, then new subscribers
     *                       will receive the last emitted value when they begin subscribing.
     *                       but once all subscribers unsubscribe, the cache is cleared.
     *      - 'keep'       : Caches the last value emitted, and emits it for new subscribers,
     *                       the value is kept in the cache even if all subscribers unsubscribe.
     * @type: 'none' | 'subscribed' | 'keep'
     * @default: 'subscribed'
     */
    cache: 'subscribed'
})
```

# Other optimizer ideas

### Preload

Similar to cache, but given the preloading inputs, once the first output goes through, starts loading the other possible inputs, and caches the outputs

### Keep Alive

Similar to preload, but once it preloads something, it stays subscribed to the other options while the end observable is also subscribed to

# Building, testing and collaborating

* Clone the repo
* Build: `tsc`
* Test: `npm test`
* Watch: `npm run dev`
* Pull requests are welcome :)
