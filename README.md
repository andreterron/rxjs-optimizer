# RxJS Optimizers

A collection of operators and methods to help optimize RxJS based development

## Get Started

```
npm install --save rxjs-optimizers
yarn add rxjs-optimizers
```

## List of optimizers

### Filter Unchanged

Filter unchanged values to avoid re-processing for the same input

#### Usage:

```ts
observable.pipe(filterUnchanged());
observable.pipe(filterUnchanged((a,b) => a !== b)); // custom change check
```

#### Parameters and Options:

```ts
filterUnchangable(
    /**
     * [optional] Method to determine if the value has changed
     * @type: (previous: T, current: T) => boolean
     * @default: (a, b) => (a !== b)
     */
    hasChanged
)
```

### Cache

Filter unchanged values to avoid re-processing for the same input

#### Usage:

```ts
observable.pipe(cache(...operators));

// custom options
let smallCache = cache.options({cacheSize: 2});
observable.pipe(smallCache(...operators));
```

#### Parameters and Options:

```ts
cache.options({
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

## Other optimizer ideas

#### Subscribe Once

wraps an observable, and only subscribes once to it, regardless of how many subscribers the wrapper has

#### Preload

Similar to cache, but given the preloading inputs, once the first output goes through, starts loading the other possible inputs, and caches the outputs

#### Keep Alive

Similar to preload, but once it preloads something, it stays subscribed to the other options while the end observable is also subscribed to

