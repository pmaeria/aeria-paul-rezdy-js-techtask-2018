# aeria-paul-rezdy-js-techtask-2018

I made a number of assumptions with this task. I chose to include vuex to show how to structure a larger app. The app could easily been completed without vuex and might be preferable if the app stayed small. 
I heavily leveraged getters in vuex to arrive to filter the data in steps. The steps didn't have to exist as getters since they are never used. I could also have written a series of pure functions to do similar transformations. They would have been easier to test, and port between vuex and smaller vue implementation. 

## End to end and unit testing
I focused on unit testing the functionality of vuex business logic. For purposes of time, tests do not every case. 
End to end testing is testing the basic UX flow not the data result.

```
yarn run test:unit
```
```
yarn run test:e2e
```


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Run your end-to-end tests
```
yarn run test:e2e
```
