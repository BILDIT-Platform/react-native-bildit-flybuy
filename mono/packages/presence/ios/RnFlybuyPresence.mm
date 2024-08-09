#import "RnFlybuyPresence.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <FlyBuyPresence/FlyBuyPresence-Swift.h>

@implementation RnFlybuyPresence
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startLocatorWithIdentifier:(NSString *)bytePresenceId
                  payload:(NSString *)payload
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSData* presenceId = [bytePresenceId dataUsingEncoding:NSUTF8StringEncoding];

    [[FlyBuyPresenceManager shared] createLocatorWithIdentifier:presenceId payload:payload callback:^(PresenceLocator * presenceLocator, NSError *sdkError) {
        if (sdkError) {
              NSString *errorMessage = sdkError.localizedDescription ?: @"An error occurred";
              NSLog(@"%@", errorMessage);
            } else if (presenceLocator) {
              [[FlyBuyPresenceManager shared] start:presenceLocator];
              NSLog(@"Locator started successfully");
              NSError *error = [[FlyBuyPresenceManager shared] stop];
              if (error) {
                NSString *errorMessage = sdkError.localizedDescription ?: @"An error occurred";
                NSLog(@"%@", errorMessage);
              }
              else{
                NSLog(@"Locator stopped successfully");
              }
            }
    }
    
  ];
}

RCT_EXPORT_METHOD(stopLocator:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    [[FlyBuyPresenceManager shared] stop];
    resolve(@"Locator stopped successfully.");
  }
  @catch (NSException *exception) {
    NSString *errorMessage = exception.reason ?: @"An error occurred";
    NSError *error = [NSError errorWithDomain:@"FlyBuyPresenceErrorDomain" code:0 userInfo:@{NSLocalizedDescriptionKey: errorMessage}];
    reject(@"stop_error", errorMessage, error);
  }
}


// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnFlybuyPresenceSpecJSI>(params);
}
#endif

@end
