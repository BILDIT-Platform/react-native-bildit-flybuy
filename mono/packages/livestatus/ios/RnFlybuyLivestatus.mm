#import "RnFlybuyLivestatus.h"
#import <FlyBuyLiveStatus/FlyBuyLiveStatus-Swift.h>

@implementation RnFlybuyLivestatus
RCT_EXPORT_MODULE()

// Define the error code
typedef NS_ENUM(NSInteger, CustomErrorCode) {
    LiveStatusNotAvailableErrorCode = 1001,
};

RCT_EXPORT_METHOD(configure:(NSString *)icon
                  statusTintColor:(NSString *)statusTintColorHex
                  statusTintDarkModeColor:(NSString *)statusTintDarkModeColorHex
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    FlyBuyLiveStatusOptionsBuilder *builder = [[FlyBuyLiveStatusOptions Builder] init];
    builder = [builder setIconName:icon];
    if (statusTintColorHex != nil && [statusTintColorHex length] > 0) {
        UIColor *color = [self colorFromHexString:statusTintColorHex];
        builder = [builder setStatusTintColor:color];
    }
    if (statusTintDarkModeColorHex != nil && [statusTintDarkModeColorHex length] > 0) {
        UIColor *color = [self colorFromHexString:statusTintDarkModeColorHex];
        builder = [builder setStatusTintColorDarkMode:color];
    }
    FlyBuyLiveStatusOptions *options = [builder build];
    if (@available(iOS 16.2, *)) {
        [[FlyBuyLiveStatusManager shared] configureWithOptions:options];
        resolve(@"LiveStatus configured properly");
    } else {
        NSString * const CustomErrorDomain = @"rnbilditflybuy.livestatus.CustomErrorDomain";
        NSError *error = [NSError errorWithDomain:CustomErrorDomain
                                             code:LiveStatusNotAvailableErrorCode
                                         userInfo:@{NSLocalizedDescriptionKey: @"LiveStatus is not available in this iOS version"}];
        reject(error.description, error.description, error);
    }
}

- (UIColor *)colorFromHexString:(NSString *)hexString {
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:0];
    [scanner scanHexInt:&rgbValue];
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16) / 255.0
                           green:((rgbValue & 0x00FF00) >> 8) / 255.0
                            blue:(rgbValue & 0x0000FF) / 255.0
                           alpha:1.0];
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
