---
sidebar_position: 8
---

# CustomerState Object Type

`CustomerState` provides the current status of the customer. A pickup order can typically have the following customer states.

## Type

```ts
enum CustomerState {
  CREATED = 'created',
  EN_ROUTE = 'en_route',
  NEARBY = 'nearby',
  ARRIVED = 'arrived',
  WAITING = 'waiting',
  DEPARTED = 'departed',
  COMPLETED = 'completed',
}
```
