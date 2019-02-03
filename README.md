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
     * @default: (a:any) => '' + a
     */
    key: (a) => a.id
})
```


## Subscribe Once

Normally, the observable will call its internal subscribe function with every new subscription. With this wrapper, the wrapped observable will have at most one subscriber, and the values will be caches and sent out to every subscriber of the `once()` observable wrapper.

If the subscriber count arrives at zero, then the wrapper will unsubscribe from the wrapped observable, and will reset the cache, to avoid extra use of memory or processing.

### Usage:

```ts
import { once } from 'rxjs-optimizer';

once(observable);
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
