---
sidebar_position: 4
---

## Update Push Token

Once your app receives a token for your push notification service, the token needs to be provided by calling `FlyBuy.Core.updatePushToken()`. This allows your app to receive updates to the order information via push notification:

#### Params

| Name  | Type   |
| ----- | ------ |
| token | String |

#### Example

```js
import * as FlyBuyCore from 'react-native-bildit-flybuy-core';

FlyBuyCore.updatePushToken(
  '740f4707bebcf74f9b7c25d48e3358945f6aa01da5ddb387462c7eaf61bb78ad'
);
```

## Handle Remote Notification

This method is used to handle remote notification and update the order data in the SDK.

#### Params

| Name | Type | Example                                                                                                                            |
| ---- | ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| data | Obj  | `{"message_source": "flybuy","order_id": "1","state": "created","customer_state": "arrived","eta_at": "2020-02-01T00:00:00.000Z"}` |

#### Example

This example provide a full use case of using FCM listener and calling flybuy methods.

```tsx
import { useEffect, useState } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import * as FlyBuyCore from 'react-native-bildit-flybuy-core'

const App = () => {
  const [orderState, setOrderState] = useState('');
  const [customerState, setCustomerState] = useState('');

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        FlyBuyCore.updatePushToken(token);
      });

    return messaging().onTokenRefresh((token) => {
      FlyBuyCore.updatePushToken(token);
    });
  }, []);

  useEffect(() => {
    const FCMUnsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage)
        );
        if (remoteMessage.data.message_source === 'flybuy') {
          const { customer_state, order_state } = remoteMessage.data;
          // ...Update order state locally
          setOrderState(order_state);
          customerState(customer_state);
          FlyBuyCore.handleRemoteNotification(remoteMessage.data);
        }
      }
    );

    return () => {
      FCMUnsubscribe();
    };
  }, []);
};

export default App;
```

