---
sidebar_position: 2
---

# Usage

### Configure Flybuy at launch

Configuration should happen as early as possible in your application's lifecycle.

To configure everything properly pass your APP token to the `configure` method on `FlyBuy`. Also, any modules that are used need to be configured.

```js
import FlyBuy from 'react-native-bildit-flybuy';

FlyBuy.configure('YOUR_APP_TOKEN_HERE');
FlyBuy.Pickup.configure(); // If using pickup feature
FlyBuy.Presence.configure('YOUR_PRESENCE_UUID_HERE'); // If using presence feature
FlyBuy.Notify.configure(); // If using notify feature
```

If you don’t already have an APP token please contact your Account Executive or drop an email to [support@radiusnetworks.com](mailto:support@radiusnetworks.com) with the Project URL you want to enable, and we will set you up.
