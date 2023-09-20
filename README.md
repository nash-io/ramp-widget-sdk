# `ramp-widget-sdk`

[![NPM](https://img.shields.io/npm/v/@nash-io/ramp-widget-sdk.svg)](https://www.npmjs.com/package/@nash-io/ramp-widget-sdk)

A JavaScript library to allow third-parties to include a Nash fiat ramp widget in any webpage.

<div style="text-align:center;margin: 48px 0;"><img src="/screenshot.png?raw=true" alt="Nash Ramp Widget" width="384" style="box-shadow:0 0 16px 0 rgba(0,0,0,0.1)" /></div>

## Getting started

### Examples

- With React [⛷ Try it on CodeSandbox](https://codesandbox.io/p/sandbox/admiring-andras-32w2gd)
- Browser (UMD module) [🏄‍♀️ Try it on CodePen](https://codepen.io/dlbnco/pen/abPEvoV)

### npm module

#### Install

```bash
# npm
npm install @nash-io/ramp-widget-sdk

# yarn
yarn add @nash-io/ramp-widget-sdk
```

#### Embed

Your page must contain an HTML element with the following data attribute: `data-nash-fiat-ramp-widget`:

```html
<div data-nash-fiat-ramp-widget />
```

Once initializing the widget like below, an `iframe` pointing to the widget deployment will be loaded within your HTML element:

```js
// import the module
import NashRamp from "@nash-io/ramp-widget-sdk";

// initialize the widget
const nashWidget = new NashRamp();

nashWidget.init({
  width: 496,
  height: 576,
});
```

#### With React

The pattern above can be reproduced in a simple React component:

```jsx
import React, { useEffect } from "react";
import NashRamp from "@nash-io/ramp-widget-sdk";

const NashRampWidget = () => {
  useEffect(() => {
    const nash = new NashRamp();
    nash.init({
      width: 496,
      height: 480,
    });
  }, []);
  return <div data-nash-fiat-ramp-widget />;
};

export default NashRampWidget;
```

And then used anywhere:

```jsx
export default () => <NashRampWidget />;
```

### Browser (UMD module)

```html
<!-- embed the script -->
<script
  src="https://unpkg.com/@nash-io/ramp-widget-sdk@latest/dist/ramp-widget-sdk.umd.js"
  async
></script>

<body>
  <!-- initialize -->
  <script>
    function initializeNash() {
      const nash = new NashRamp.default();
      nash.init({
        width: "480px",
        height: "480px",
      });
    }
    window.onload = function () {
      initializeNash();
    };
  </script>
  <!-- HTML target -->
  <div data-nash-fiat-ramp-widget />
</body>
```

## API

### `new NashRamp({ ...options })`

| Property     | Description                                                 | Type                                                                                                                                              | Required | Default                    |
| ------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------- |
| `base`       | The symbol of the fiat currency to be used in the purchase. | `string`                                                                                                                                          | No       | n/a                        |
| `env`        | Points to the environment where the widget is deployed.     | `'LOCAL'`&nbsp;\|&nbsp;`'PRODUCTION'`                                                                                                             | No       | `'PRODUCTION'`             |
| `referrer`   | Your service name (used by Nash for tracking).              | `string`                                                                                                                                          | No       | `window.location.hostname` |
| `target`     | The symbol of the crypto currency to be purchased.          | `string`                                                                                                                                          | No       | n/a                        |
| `blockchain` | The symbol of the network to be used.                       | `'BTC'`&nbsp;\|&nbsp;`'ETH'`&nbsp;\|&nbsp;`'NEO'`&nbsp;\|&nbsp;`'NEO3'`&nbsp;\|&nbsp;`'POLYGON'`&nbsp;\|&nbsp;`'AVAXC'`&nbsp;\|&nbsp;`'ARBITRUM'` | No       | n/a                        |

### `NashRamp.init({ ...options })`

| Property     | Description                                                                                                                                | Type                           | Required |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | -------- |
| `width`      | Widget width — use `100%` for responsiveness                                                                                               | `string`&nbsp;\|&nbsp;`number` | Yes      |
| `height`     | Widget height — minimum `576px`                                                                                                            | `string`&nbsp;\|&nbsp;`number` | Yes      |
| `fiatAmount` | Initializes the widget with a fixed amount. If used, the widget will skip the initial input step and show only the complete purchase step. | `number`                       | No       |
