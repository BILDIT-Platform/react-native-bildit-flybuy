---
sidebar_position: 2
---

# Usage

## Initialize Flybuy on Launch

Configuration should happen as early as possible in your application's lifecycle. e.g. `useEffect` hook in your root container.

To configure everything properly pass your APP token to the `configure` method on `FlyBuy.Core`. Also, any modules that are used need to be configured.

The following code snipper provides an example of configuring flybuy on application launch.

```js
import * as React from 'react';

import FlyBuy from 'react-native-bildit-flybuy';

export default function App() {

React.useEffect(() => {
  FlyBuy.Core.configure('YOUR_APP_TOKEN_HERE');
  FlyBuy.Notify.configure(); // If using notify feature
  FlyBuy.Notify.configure('your.unique.background.app.refresh.task.identifier'); // If using notify feature and background task
  FlyBuy.Pickup.configure(); // If using pickup feature
  FlyBuy.Presence.configure('YOUR_PRESENCE_UUID_HERE'); // If using presence feature
}, []);

return (...)
}

```

If you don’t already have an APP token please contact your Flybuy Account Executive to get set up.

## Feature Modules

After initial setup, refer to the appropriate module guide for details on using Flybuy:

- [Pickup Module](Modules/Pickup.md)
- [Presence Module](Modules/Presence.md)
- [Notify Module](Modules/Notify.md)
