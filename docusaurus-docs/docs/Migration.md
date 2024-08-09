---
sidebar_position: 2
---

# Migration from 2.3.x to 2.20.x

Version 2.3.x

```js
  import FlyBuy from 'react-native-bildit-flybuy';

  FlyBuy.Core.Orders.fetchOrders()
      .then(orders => console.tron.log('orders', orders))
      .catch(err => console.tron.log(err));
```

Version 2.20.x

```js
  import * as FlyBuyCore from '@bildit-platform/react-native-flybuy-core';

  FlyBuyCore.fetchOrders()
      .then(orders => console.tron.log('orders', orders))
      .catch(err => console.tron.log(err));
```

Import format for other modules


```js
  import * as FlyBuyCore from '@bildit-platform/react-native-flybuy-core';
  import * as FlyBuyPickup from '@bildit-platform/react-native-flybuy-pickup';
  import * as FlyBuyNotify from '@bildit-platform/react-native-flybuy-notify';
  import * as FlyBuyPresence from '@bildit-platform/react-native-flybuy-presence';
  import * as FlyBuyLiveStatus from '@bildit-platform/react-native-flybuy-livestatus';
```

All function names are not modified, you just need to change `FlyBuy.<MODULENAME>` to one of the above import alias.