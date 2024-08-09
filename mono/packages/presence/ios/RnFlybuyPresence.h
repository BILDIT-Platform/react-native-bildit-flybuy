#import <FlyBuyPresence/FlyBuyPresence-Swift.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnFlybuyPresenceSpec.h"


@interface RnFlybuyPresence : NSObject <NativeRnFlybuyPresenceSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RnFlybuyPresence : NSObject <RCTBridgeModule>
#endif

- (void) startLocatorWithIdentifier:(NSString *)bytePresenceId
                  payload:(NSString *)payload
                  withResolver:(RCTPromiseResolveBlock)resolve
                       withRejecter:(RCTPromiseRejectBlock)reject;

- (void) stopLocator:(RCTPromiseResolveBlock)resolve
        withRejecter:(RCTPromiseRejectBlock)reject;
@end
