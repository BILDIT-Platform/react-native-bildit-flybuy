
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnFlybuyNotifySpec.h"

@interface RnFlybuyNotify : NSObject <NativeRnFlybuyNotifySpec>
#else
#import <React/RCTBridgeModule.h>

@interface RnFlybuyNotify : NSObject <RCTBridgeModule>
#endif

- (void)configure:(NSString *)bgTaskIdentifier
                  withResolver:(RCTPromiseResolveBlock)resolve
           withRejecter:(RCTPromiseRejectBlock)reject;

- (void)clearNotifications:(RCTPromiseResolveBlock)resolve
              withRejecter:(RCTPromiseRejectBlock)reject;

- (void) createForSitesInRegion:(NSDictionary *)region
               withNotification:(NSDictionary *)notification
               withResolver:(RCTPromiseResolveBlock)resolve
                   withRejecter:(RCTPromiseRejectBlock)reject;

- (void) sync:(BOOL *)force
     withResolver:(RCTPromiseResolveBlock)resolve
     withRejecter:(RCTPromiseRejectBlock)reject;

- (void)onPermissionChanged:(RCTPromiseResolveBlock)resolve
                     reject:(RCTPromiseRejectBlock)reject;


@end
