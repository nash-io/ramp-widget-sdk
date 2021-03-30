# `ramp-widget-sdk`

A JavaScript library to allow third-parties to include a Nash fiat ramp widget in any webpage.

The widget is basically a way to calculate rates for buying crypto, and then generate a link to complete the purchase, which leads to the Nash mobile app. The link is either encoded into a QR code in desktops, or turned into a button in mobile devices.

## Getting started

### npm module

#### Install

```bash
# npm
npm install @nash-io/ramp-widget-sdk

#yarn
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
const nashWidget = new NashRamp({
  env: "PRODUCTION", // points to the environment where the widget is deployed; either 'LOCAL' or 'PRODUCTION'
  destination: "0x06e97748AD4E0A36490F92733EF95D8490ffD97f", // The wallet address where the purchased crypto should be sent to. Note that this must be valid with the provided `target`.
  target: "aave", // The symbol of the crypto currency to be purchased.
  base: "eur", // The symbol of the fiat currency to be used in the purchase.
  referrer: "aave.com", // Your webapp name (will be displayed in the complete purchase step).
});

nashWidget.init({
  // Widget width: any valid CSS value — use 100% for responsiveness
  width: 496,
  // Widget height: any valid CSS value — anything under 480px won't work well
  height: 480,
  onClose: () => console.log("close!"), // When provided, a ❌ button will be rendered over the widget. When clicking the ❌, this function is called. Useful if you're rendering the widget within your own modal and want to use this button for closing the modal.
});
```

#### With React

The pattern above can be reproduced in a simple React component:

```jsx
import React, { useEffect } from "react";
import NashRamp from "@nash-io/ramp-widget-sdk";

const NashRampWidget = ({ env, destination, target, base }) => {
  useEffect(() => {
    const nash = new NashRamp({
      env,
      destination,
      target,
      base,
    });
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
export default () => (
  <NashRampWidget
    env="PRODUCTION"
    base="eur"
    target="aave"
    destination="0x06e97748AD4E0A36490F92733EF95D8490ffD97f"
  />
);
```
