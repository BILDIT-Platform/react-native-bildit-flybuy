---
sidebar_position: 3
---

## Fetch all Sites

```jsx
Flybuy.Sites.fetchAllSites()
```

**[flybuy Fetch all Sites Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/sites?id=fetch-all-sites)**

## Fetch Sites by Query

```jsx
Flybuy.Sites.fetchSitesByQuery({
      query: 'Test',
      page: 1,
    })
```

**[flybuy Fetch Sites by Query Documentation](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/sites?id=fetch-sites)**

## Fetch Sites by Region

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
