#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Flybuy, NSObject)

RCT_EXTERN_METHOD(configure:(NSString *)token)

// Customer

RCT_EXTERN_METHOD(loginWithToken:(NSString *)token
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(login:(NSString *)email
                  withPassword:(NSString *)password
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(logout)


// Notify

RCT_EXTERN_METHOD(notifyConfigure)

// Pickup

RCT_EXTERN_METHOD(pickupConfigure)

// Presence

RCT_EXTERN_METHOD(presenceConfigure:(NSString *)presenceUUID)


RCT_EXTERN_METHOD(startLocatorWithIdentifier:(NSString *)presenceIdStr
                  withPayload:(NSString *)payload
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stopLocator
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject
                  )

@end
