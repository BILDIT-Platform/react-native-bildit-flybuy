#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(Flybuy, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

RCT_EXTERN_METHOD(configure:(NSString *)token)

// Customer

RCT_EXTERN_METHOD(loginWithToken:(NSString *)token
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(login:(NSString *)email
                  withPassword:(NSString *)password
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(signUp:(NSString *)email
                  withPassword:(NSString *)password
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(logout:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getCurrentCustomer:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createCustomer:(NSDictionary *)customer
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateCustomer:(NSDictionary *)customer
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// Orders

RCT_EXTERN_METHOD(fetchOrders:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createOrder:(int)siteId
                  withPartnerIdentifier:(NSString *)pid
                  withCustomerInfo:(NSDictionary *)customerInfo
                  withPickupWindow:(NSDictionary)pickupWindow
                  withOrderState:(NSString)orderState
                  withPickupType:(NSString)pickupType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createOrderWithPartnerIdentifier:(NSString *)sitePartnerIdentifier
                  withOrderPartnerIdentifier:(NSString *)pid
                  withCustomerInfo:(NSDictionary *)customerInfo
                  withPickupWindow:(NSDictionary)pickupWindow
                  withOrderState:(NSString)orderState
                  withPickupType:(NSString)pickupType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(claimOrder:(NSString *)redeemCode
                  withCustomer:(NSDictionary *)customer
                  withPickupType:(NSString)pickupType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(fetchOrderByRedemptionCode:(NSString *)redemCode
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateOrderState:(int)orderId
                  withState:(NSString *)state
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateOrderCustomerStateWithSpot:(int)orderId
                  withState:(NSString *)state
                  withSpot:(NSString *)state
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateOrderCustomerState:(int)orderId
                  withState:(NSString *)state
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(rateOrder:(int)orderId
                  withRating:(int *)rating
                  withComments:(NSString *)comments
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
// Sites

RCT_EXTERN_METHOD(fetchAllSites:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(fetchSitesByQuery:(NSDictionary *)params
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(fetchSitesByRegion:(NSDictionary *)params
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(fetchSiteByPartnerIdentifier:(NSDictionary *)params
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// Notify

RCT_EXTERN_METHOD(notifyConfigure:(NSString)bgTaskIdentifier
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(clearNotifications:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createForSitesInRegion:(NSDictionary *)region
                  withNotification:(NSDictionary *)notification
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(createForSites:(NSArray *)sites
                  withNotification:(NSDictionary *)notification
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sync:(BOOL *)force
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// Pickup

RCT_EXTERN_METHOD(pickupConfigure)

// Presence

RCT_EXTERN_METHOD(presenceConfigure:(NSString *)presenceUUID)


RCT_EXTERN_METHOD(startLocatorWithIdentifier:(NSString *)presenceIdStr
                  withPayload:(NSString *)payload
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stopLocator:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

// Notifications

RCT_EXTERN_METHOD(updatePushToken:(NSString *)token)

RCT_EXTERN_METHOD(handleRemoteNotification:(NSDictionary *)userInfo)

// LiveStatus

RCT_EXTERN_METHOD(liveStatusConfigure:(NSString *)iconName)

@end
