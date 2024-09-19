#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnFlybuyCoreSpec.h"

@interface RnFlybuyCore : NSObject <NativeRnFlybuyCoreSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RnFlybuyCore : NSObject <RCTBridgeModule>
#endif


// Authentication
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

- (void)fetchOrders:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject;

- (void)createOrder:(NSInteger)siteId
    withPartnerIdentifier:(NSString *)pid
    withCustomerInfo:(NSDictionary *)customerInfo
    withPickupWindow:(NSDictionary *)pickupWindow
    withOrderState:(NSString *)orderState
    withPickupType:(NSString *)pickupType
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

-(void)createOrderWithPartnerIdentifier:(NSString *)sitePartnerIdentifier
    withOrderPartnerIdentifier:(NSString *)orderPid
    withCustomerInfo:(NSDictionary *)customerInfo
    withPickupWindow:(NSDictionary *)pickupWindow
    withOrderState:(NSString *)orderState
    withPickupType:(NSString *)pickupType
    withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

-(void)claimOrder:(NSString *)redeemCode
     withCustomer:(NSDictionary *)customer
     withPickupType:(NSString *)pickupType
     withResolver:(RCTPromiseResolveBlock)resolve
     withRejecter:(RCTPromiseRejectBlock)reject;

-(void)fetchOrderByRedemptionCode:(NSString *)redemCode
                     withResolver:(RCTPromiseResolveBlock)resolve
                     withRejecter:(RCTPromiseRejectBlock)reject;

-(void)updateOrderState:(NSInteger)orderId
              withState:(NSString *)state
              withResolver:(RCTPromiseResolveBlock)resolve
           withRejecter:(RCTPromiseRejectBlock)reject;

-(void)updateOrderCustomerState:(NSInteger)orderId
                      withState:(NSString *)state
                      withResolver:(RCTPromiseResolveBlock)resolve
                   withRejecter:(RCTPromiseRejectBlock)reject;

-(void)updateOrderCustomerStateWithSpot:(NSInteger)orderId
                              withState:(NSString *)state
                              withSpot:(NSString *)spot
                              withResolver:(RCTPromiseResolveBlock)resolve
                           withRejecter:(RCTPromiseRejectBlock)reject;

-(void)rateOrder:(NSInteger)orderId
      withRating:(NSInteger)rating
      withComments:(NSString *)comments
      withResolver:(RCTPromiseResolveBlock)resolve
    withRejecter:(RCTPromiseRejectBlock)reject;

- (void)updatePushToken:(NSString *)token;

- (void)handleRemoteNotification:(NSDictionary *)userInfo;
- (NSArray<NSString *> *)supportedEvents;
- (void)startObserver;
- (void)stopObserver;

@end