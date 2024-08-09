---
sidebar_position: 3
---

## Fetch all Sites

Fetch all sites for the app.

**IMPORTANT**: This method could result in long running operation with multiple API calls behind the scenes. It is recommended to use [`fetchSitesByQuery`](#fetch-sites-by-query).

#### Params

| Name | Type |
| ---- | ---- |
| None | None |

#### Example

```js
import * as FlyBuyCore from '@bildit-platform/react-native-flybuy-core';

FlyBuyCore.fetchAllSites();
```


## Fetch Sites by Query

Fetch sites for the app. The `query` parameter will return results that match the `partnerIdentifier` or `name` of the site.

#### Params

| Name   | Type | Example                      |
| ------ | ---- | ---------------------------- |
| params | Obj  | `{ query: 'Test', page: 1 }` |

#### Example

```js
FlyBuyCore.fetchSitesByQuery({
  query: 'Test',
  page: 1,
});
```


## Fetch Sites by Region

Fetch sites in a given region.

#### Params

| Name   | Type                                        | Example                                                      |
| ------ | ------------------------------------------- | ------------------------------------------------------------ |
| region | [`CircularRegion`](../Types/CircularRegion) | `{latitude: 47.6234207,longitude: -122.3300605,radius: 100}` |
| page   | Int                                         | `1`                                                          |
| per    | Int                                         | `20`                                                         |

#### Example

```js
const region = {
  latitude: 47.6234207,
  longitude: -122.3300605,
  radius: 100,
};
FlyBuyCore.fetchSitesByRegion({
  per: 20,
  page: 1,
  region,
});
```


## Fetch Site by Partner Identifier

Fetch a site based on Partner Identifier.

#### Params

| Name   | Type                                        | Example                                                      |
| ------ | ------------------------------------------- | ------------------------------------------------------------ |
| partnerIdentifier | String | `123` |

#### Example

```js
FlyBuyCore.fetchSiteByPartnerIdentifier({
  partnerIdentifier: "123"
});
```