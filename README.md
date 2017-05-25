# CardPay - Transactions manager (angular2-webpack)

[Marver-app prototype](https://marvelapp.com/17cah64/screen/17867063)

## Developing
* `npm install`
* `npm run start --env="local"`
* `npm run start --env="waf"`

And you are all set! You can now modify your components on the fly without having to reload the entire page.

## Production
To build your application, run:
* `npm run build`
You can now go to `/dist` and deploy that to your server!

## Links
* [Angular 2](https://angular.io/)
* [Angular 2 - Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html)
* [Angular 2 - Bootstrap 4 components](https://ng-bootstrap.github.io/#/home)
* [Starter Github project](https://github.com/preboot/angular2-webpack)
* [Thinkster workshop](https://thinkster.io/tutorials/building-angular-2-applications-workshop)
* [Tabs component tutorial](http://blog.thoughtram.io/angular/2015/04/09/developing-a-tabs-component-in-angular-2.html)
* [Angular 2 - Change detection] (http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)
* [Angular-2 - training-book](https://angular-2-training-book.rangle.io/)

You can now go to `/dist` and deploy that to your server!

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

#### 2. End-to-End Tests (aka. e2e, integration)

* single run:
  * in a tab, *if not already running!*: `npm start`
  * in a new tab: `npm run webdriver-start`
  * in another new tab: `npm run e2e`
* interactive mode:
  * instead of the last command above, you can run: `npm run e2e-live`
  * when debugging or first writing test suites, you may find it helpful to try out Protractor commands without starting up the entire test suite. You can do this with the element explorer.
  * you can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

## Documentation

You can generate api docs (using [TypeDoc](http://typedoc.org/)) for your code with the following:

* `npm run docs`

# FAQ

#### Do I need to add script / link tags into index.html ?

No, Webpack will add all the needed Javascript bundles as script tags and all the CSS files as link tags. The advantage is that you don't need to modify the index.html every time you build your solution to update the hashes.

#### How to include external angular 2 libraries ?

It's simple, just install the lib via npm and import it in your code when you need it. Don't forget that you need to configure some external libs in the [bootstrap](https://github.com/preboot/angular2-webpack/blob/master/src/main.ts) of your application.

#### How to include external css files such as bootstrap.css ?

Just install the lib and import the css files in [vendor.ts](https://github.com/preboot/angular2-webpack/blob/master/src/vendor.ts). For example this is how to do it with bootstrap:

```sh
npm install bootstrap@next --save
```

And in [vendor.ts](https://github.com/preboot/angular2-webpack/blob/master/src/vendor.ts) add the following:

```ts
import 'bootstrap/dist/css/bootstrap.css';
```

# TypeScript

> To take full advantage of TypeScript with autocomplete you would have to use an editor with the correct TypeScript plugins.

#Web animations
https://github.com/web-animations/web-animations-js
