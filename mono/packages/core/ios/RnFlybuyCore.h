#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnFlybuyCoreSpec.h"

@interface RnFlybuyCore : NSObject <NativeRnFlybuyCoreSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RnFlybuyCore : NSObject <RCTBridgeModule>
#endif



- (void)login:(NSString *)email
    withPassword:(NSString *)password
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)loginWithToken:(NSString *)token
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)signUp:(NSString *)email
    withPassword:(NSString *)password
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)logout:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)getCurrentCustomer:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)createCustomer:(NSDictionary *)customer
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)updateCustomer:(NSDictionary *)customer
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)fetchAllSites:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)fetchSitesByQuery:(NSDictionary *)params
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)fetchSitesByRegion:(NSDictionary *)params
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)fetchSiteByPartnerIdentifier:(NSDictionary *)params
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)updatePushToken:(NSString *)token;

- (void)handleRemoteNotification:(NSDictionary *)userInfo;

@end
