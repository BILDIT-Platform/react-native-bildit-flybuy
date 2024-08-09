
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnFlybuyLivestatusSpec.h"

@interface RnFlybuyLivestatus : NSObject <NativeRnFlybuyLivestatusSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RnFlybuyLivestatus : NSObject <RCTBridgeModule>
#endif

- (void)configure:(NSString *)icon
     withResolver:(RCTPromiseResolveBlock)resolve
     withRejecter:(RCTPromiseRejectBlock)reject;

@end
