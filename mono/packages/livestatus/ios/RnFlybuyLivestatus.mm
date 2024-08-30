#import "RnFlybuyLivestatus.h"
#import <FlyBuyLiveStatus/FlyBuyLiveStatus-Swift.h>

@implementation RnFlybuyLivestatus
RCT_EXPORT_MODULE()

// Define the error code
typedef NS_ENUM(NSInteger, CustomErrorCode) {
    LiveStatusNotAvailableErrorCode = 1001,
};

RCT_EXPORT_METHOD(configure:(NSString *)icon
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    FlyBuyLiveStatusOptions *options = [[[FlyBuyLiveStatusOptions.Builder init] setIconName:icon] build];
    if (@available(iOS 16.2, *)) {
        [[FlyBuyLiveStatusManager shared] configureWithOptions:options];
        resolve(@"LiveStatus configured properly");
    } else {
        // Define a custom error domain
        NSString * const CustomErrorDomain = @"rnbilditflybuy.livestatus.CustomErrorDomain";

        
        NSError *error = [NSError errorWithDomain:CustomErrorDomain
                                             code:LiveStatusNotAvailableErrorCode
                                         userInfo:@{NSLocalizedDescriptionKey: @"LiveStatus is not available in this iOS version"}];
        reject(error.description, error.description, error);
    }
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnFlybuyLivestatusSpecJSI>(params);
}
#endif

@end
