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
Flybuy.Sites.fetchAllSites();
```

**[flybuy Fetch all Sites Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/sites?id=fetch-all-sites)**

## Fetch Sites by Query

Fetch sites for the app. The `query` parameter will return results that match the `partnerIdentifier` or `name` of the site.

#### Params

| Name   | Type | Example                      |
| ------ | ---- | ---------------------------- |
| params | Obj  | `{ query: 'Test', page: 1 }` |

#### Example

```js
Flybuy.Sites.fetchSitesByQuery({
  query: 'Test',
  page: 1,
});
```

**[flybuy Fetch Sites by Query Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/sites?id=fetch-sites)**

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
Flybuy.Sites.fetchSitesByRegion({
  per: 20,
  page: 1,
  region,
});
```

**[flybuy Fetch Sites by Region Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/sites?id=fetch-sites-in-region)**
