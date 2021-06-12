#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Flybuy, NSObject)

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

// Notify

RCT_EXTERN_METHOD(notifyConfigure)

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

// Pickup

RCT_EXTERN_METHOD(pickupConfigure)

RCT_EXTERN_METHOD(onLocationPermissionChanged)

// Presence

RCT_EXTERN_METHOD(presenceConfigure:(NSString *)presenceUUID)


RCT_EXTERN_METHOD(startLocatorWithIdentifier:(NSString *)presenceIdStr
                  withPayload:(NSString *)payload
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stopLocator:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
@end
