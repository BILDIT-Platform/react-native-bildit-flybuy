---
sidebar_position: 7
---

# NotificationInfo Object Type

`NotificationInfo` object is used to define a notification title, message and payload.

## Type

```ts
{
  title: string;
  message: string;
  data: any;
}
```

## Example

```js
{
  title: 'Test Notification',
  message: 'Test Notification message',
  data: {
    key1: 'value',
    key2: 'value',
  },
};

```

## Used by

- [`createForSitesInRegion`](../../docs/Modules/Notify#create-for-sites-in-region)
- [`createForSites`](../../docs/Modules/Notify#create-for-sites)
