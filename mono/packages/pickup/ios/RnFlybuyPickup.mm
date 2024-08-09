#import "RnFlybuyPickup.h"
#import <CoreLocation/CoreLocation.h>
#import <FlyBuyPickup/FlyBuyPickup.h>
#import <FlyBuyPickup/FlyBuyPickup-Swift.h>

@implementation RnFlybuyPickup
RCT_EXPORT_MODULE()

// This is not handled on iOS, only android need this function
RCT_EXPORT_METHOD(onPermissionChanged:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    resolve(@"ok");
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnFlybuyPickupSpecJSI>(params);
}
#endif

@end
