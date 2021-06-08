---
sidebar_position: 5
---

# PickupWindow Object Type

`PickupWindow` object provides the time range when an order is expected to be picked up. It will be nil if there is no pickup window, i.e., ASAP. If there is just a pickup time, the start and end will be the same.

## Type

```ts
{
  start: string;
  end: string;
}
```

## Example

```js
{
start: new Date().toISOString(),
end: new Date('2022-12-02').toISOString(),
};
```

## Used by

- [`createOrder`](../../Components/Orders#create-order)
