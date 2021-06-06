---
sidebar_position: 3
---

## Fetch all Sites

#### Params

| Name | Type |
|------|------|
|None | None |

#### Example

```jsx
Flybuy.Sites.fetchAllSites()
```

**[flybuy Fetch all Sites Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/sites?id=fetch-all-sites)**

## Fetch Sites by Query

#### Params

| Name | Type | Example |
|------|------|-|
|query | Obj | `{query: 'Test',page: 1}` |

#### Example

```jsx
Flybuy.Sites.fetchSitesByQuery({
      query: 'Test',
      page: 1,
    })
```

**[flybuy Fetch Sites by Query Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/sites?id=fetch-sites)**

## Fetch Sites by Region

#### Params

| Name | Type | Example |
|------|------|-|
| region | Obj | `{latitude: 47.6234207,longitude: -122.3300605,radius: 100}` |
| query | Obj | `{per: 20,page: 1,region}` |

#### Example

```jsx
const region = {
      latitude: 47.6234207,
      longitude: -122.3300605,
      radius: 100,
    };
Flybuy.Sites.fetchSitesByRegion({
    per: 20,
    page: 1,
    region,
})
```

**[flybuy Fetch Sites by Region Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/sites?id=fetch-sites-in-region)**
