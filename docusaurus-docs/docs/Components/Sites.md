---
sidebar_position: 3
---

## Fetch all Sites

```jsx
Flybuy.Sites.fetchAllSites()
```

## Fetch Sites by Query

```jsx
Flybuy.Sites.fetchSitesByQuery({
      query: 'Test',
      page: 1,
    })
```

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
