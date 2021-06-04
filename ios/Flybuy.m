#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Flybuy, NSObject)

RCT_EXTERN_METHOD(loginWithToken:(NSString *)token
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

@end
