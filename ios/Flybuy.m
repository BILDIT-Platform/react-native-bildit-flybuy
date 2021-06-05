#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Flybuy, NSObject)

RCT_EXTERN_METHOD(configure:(NSString *)token)

// Customer
RCT_EXTERN_METHOD(loginWithToken:(NSString *)token
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// Notify

RCT_EXTERN_METHOD(notifyConfigure)

// Pickup

RCT_EXTERN_METHOD(pickupConfigure)

// Presence

RCT_EXTERN_METHOD(presenceConfigure:(NSString *)presenceUUID)

@end
