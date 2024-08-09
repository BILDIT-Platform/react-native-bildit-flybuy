#import "RnFlybuyNotify.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <CoreLocation/CoreLocation.h>
#import <FlyBuy/FlyBuy-Swift.h>
#import <FlyBuyNotify/FlyBuyNotify-Swift.h>


@implementation RnFlybuyNotify
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(configure:(NSString *)bgTaskIdentifier
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [[FlyBuyNotifyManager shared] configureWithBgTaskIdentifier:bgTaskIdentifier bgSyncCallback:^(NSError *error) {
        if (error == nil) {
            resolve(@(YES));
            RCTLogInfo(@"Notify configured");
        } else {
            reject(@"error", error.description, error);
            RCTLogWarn(@"%@", error.description);
        }
    } ];
    
}

RCT_EXPORT_METHOD(clearNotifications:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [[FlyBuyNotifyManager shared] clearWithCallback:^(NSError *error) {
        if (error == nil) {
            resolve(@(YES));
            RCTLogInfo(@"Notify notifications cleared");
        } else {
            reject(@"error", error.description, error);
            RCTLogWarn(@"%@", error.description);
        }
    }];
    
}

RCT_EXPORT_METHOD(createForSitesInRegion:(NSDictionary *)region
                  withNotification:(NSDictionary *)notification
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    CLCircularRegion *regionInfo = [self decodeRegion:region];
      NotificationInfo *notificationInfo = [self decodeNotification:notification];

    [[FlyBuyNotifyManager shared] createForSitesInRegion:regionInfo notification:notificationInfo callback:^(NSArray<FlyBuySite *> *sites, NSError *error) {
        if (error == nil) {
          NSMutableArray *parsedSites = [NSMutableArray array];
          for (id site in sites) {
            [parsedSites addObject:[self parseSite:site]];
          }
          resolve(parsedSites);
        } else {
          reject(error.localizedDescription, error.debugDescription, error);
        }
    }];
}



// This is not handled on iOS, only android need this function
RCT_EXPORT_METHOD(onPermissionChanged:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    resolve(@"ok");
}

RCT_EXPORT_METHOD(sync:(BOOL *)force
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [[FlyBuyNotifyManager shared] syncWithForce:force callback:^(NSError *error) {
        if (error == nil) {
            resolve(@"OK");
        } else {
            reject(error.localizedDescription, error.debugDescription, error);
        }
    }];
}


// Parser
- (NSDictionary *)parseSite:(FlyBuySite *)site {
  NSMutableDictionary *map = [NSMutableDictionary dictionary];
  
  map[@"id"] = @(site.id);
  map[@"name"] = site.name ?: @"";
  map[@"phone"] = site.phone ?: @"";
  map[@"streetAddress"] = site.streetAddress ?: @"";
  map[@"fullAddress"] = site.fullAddress ?: @"";
  map[@"locality"] = site.locality ?: @"";
  map[@"region"] = site.region ?: @"";
  map[@"country"] = site.country ?: @"";
  map[@"postalCode"] = site.postalCode ?: @"";
  map[@"latitude"] = site.latitude ?: @"";
  map[@"longitude"] = site.longitude ?: @"";
  map[@"coverPhotoUrl"] = site.coverPhotoURL ?: @"";
  map[@"instructions"] = site.instructions ?: @"";
  map[@"description"] = site.description ?: @"";
  map[@"partnerIdentifier"] = site.partnerIdentifier ?: @"";
  map[@"pickupConfig"] = [self parsePickupConfig:site.pickupConfig];
  return map;
}

- (NSDictionary *)parsePickupTypeConfig:(PickupTypeConfig *)pickupTypeConfig {
  NSMutableDictionary *map = [NSMutableDictionary dictionary];
  
  map[@"pickupType"] = pickupTypeConfig.pickupType ?: @"";
  map[@"pickupTypeLocalizedString"] = pickupTypeConfig.pickupTypeLocalizedString ?: @"";
  map[@"requireVehicleInfo"] = @(pickupTypeConfig.requireVehicleInfo);
  map[@"showVehicleInfoFields"] = @(pickupTypeConfig.showVehicleInfoFields);
  
  return map;
}

- (NSArray *)parsePickupTypeConfigs:(NSArray<PickupTypeConfig *> *)items {
  NSMutableArray *array = [NSMutableArray array];
  
  for (PickupTypeConfig *item in items) {
    [array addObject:[self parsePickupTypeConfig:item]];
  }
  
  return array;
}

- (NSDictionary *)parsePickupConfig:(PickupConfig *)pickupConfig {
  NSMutableDictionary *map = [NSMutableDictionary dictionary];
  
  map[@"accentColor"] = pickupConfig.accentColor ?: @"";
  map[@"accentTextColor"] = pickupConfig.accentTextColor ?: @"";
    map[@"askToAskImageURL"] = pickupConfig.askToAskImageURL ?: @"";
  map[@"customerNameEditingEnabled"] = @(pickupConfig.customerNameEditingEnabled);
  map[@"id"] = @(pickupConfig.id);
  map[@"pickupTypeSelectionEnabled"] = @(pickupConfig.pickupTypeSelectionEnabled);
    map[@"privacyPolicyURL"] = pickupConfig.privacyPolicyURL ?: @"";
    map[@"termsOfServiceURL"] = pickupConfig.termsOfServiceURL ?: @"";
  map[@"type"] = pickupConfig.type ?: @"";
  map[@"availablePickupTypes"] = [self parsePickupTypeConfigs:pickupConfig.availablePickupTypes];
  
  return map;
}


// Decoder
- (NotificationInfo *)decodeNotification:(NSDictionary *)notification {
    NSString *title = [notification objectForKey:@"title"];
    NSString *content = [notification objectForKey:@"message"];
    NSDictionary *data = [notification objectForKey:@"data"];
    
    if ([title isKindOfClass:[NSString class]] &&
        [content isKindOfClass:[NSString class]] &&
        [data isKindOfClass:[NSDictionary class]]) {
        return [[NotificationInfo alloc] initWithTitle:title content:content data:data];
    } else {
        // Handle the case where the types are not as expected, possibly throwing an error or returning nil
        return nil;
    }
}

- (CLCircularRegion *) decodeRegion:(NSDictionary<NSString *, NSNumber *> *)regionDict {
  CLLocationDegrees latitude = [regionDict[@"latitude"] doubleValue];
  CLLocationDegrees longitude = [regionDict[@"longitude"] doubleValue];
  CLLocationDistance radius = [regionDict[@"radius"] doubleValue];
  
  CLLocationCoordinate2D center = CLLocationCoordinate2DMake(latitude, longitude);
  CLCircularRegion *region = [[CLCircularRegion alloc] initWithCenter:center radius:radius identifier:[[NSUUID UUID] UUIDString]];
  
  return region;
}

@end

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnFlybuyNotifySpecJSI>(params);
}
#endif

