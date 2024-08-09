# React Native FlyBuy SDK Wrapper

The wrapper from FlyBuy SDK for React Native. 

Included SDKs:

- [X] FlyBuy Core
- [X] FlyBuy Pickup
- [X] FlyBuy Presence
- [X] FlyBuy Notify
- [X] FlyBuy LiveStatus


SDK that supports React Native New Architecture:

- [ ] FlyBuy Core
- [ ] FlyBuy Pickup
- [ ] FlyBuy Presence
- [ ] FlyBuy Notify



### Development Notes

- Android Min SDK version must be 26
- Afer modifying any `packages/*`, we need to re-build the packages using `npx lerna run prepare` then go to `example` project and run `yarn install --force`