---
sidebar_position: 6
---

# CircularRegion Object Type

`CircularRegion` object is used to define a geographical region using latitude, logtitude ana radius.

## Type

```ts
{
  latitude: number,
  longitude: number,
  radius: number,
};
```

## Example

```js
{
  latitude: 47.6234207,
  longitude: -122.3300605,
  radius: 100,
};
```

## Used by

- [`createForSitesInRegion`](../../docs/Modules/Notify#create-for-sites-in-region)
- [`fetchSitesByRegion`](../../docs/Components/Sites#fetch-sites-by-region)
