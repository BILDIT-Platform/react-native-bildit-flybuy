#import <React/RCTConvert.h>
#import "RnFlybuyCore.h"
#import "RnFlybuyCore-Umbrella.h"

@implementation RnFlybuyCore
RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(login:(NSString *)email
                  withPassword:(NSString *)password
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    
    [[FlyBuyCore customer] loginWithEmailAddress:email password:password callback:^(FlyBuyCustomer *customer, NSError *error) {
        if (error == nil && customer != nil) {
            // Assuming you have a method `parserCustomer:` in this class that parses the customer
            resolve([self parserCustomer:customer]);
        } else {
            reject(error.localizedDescription, error.debugDescription, error);
        }
    }];
}

RCT_EXPORT_METHOD(loginWithToken:(NSString *)token
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [[FlyBuyCore customer] loginWithTokenWithToken:token callback:^(FlyBuyCustomer *customer, NSError *error) {
        if (error == nil && customer != nil) {
            // Assuming you have a method `parserCustomer:` in this class that parses the customer
            resolve([self parserCustomer:customer]);
        } else {
            reject(error.localizedDescription, error.debugDescription, error);
        }
    }];
}

RCT_EXPORT_METHOD(signUp:(NSString *)email
                  withPassword:(NSString *)password
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [[FlyBuyCore customer] signUpWithEmailAddress:email password:password callback:^(FlyBuyCustomer *customer, NSError *error) {
        if (error == nil && customer != nil) {
            // Assuming you have a method `parserCustomer:` in this class that parses the customer
            resolve([self parserCustomer:customer]);
        } else {
            reject(error.localizedDescription, error.debugDescription, error);
        }
    }];
}


RCT_EXPORT_METHOD(logout:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [[FlyBuyCore customer] logout];
    resolve(@"ok");
}

RCT_EXPORT_METHOD(getCurrentCustomer:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    FlyBuyCustomer *customer = [[FlyBuyCore customer] current];
    if (customer == nil) {
        reject(@"not_login", @"current customer error", nil);
    } else {
        resolve([self parserCustomer:customer]);
    }
}

RCT_EXPORT_METHOD(createCustomer:(NSDictionary *)customer
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    FlyBuyCustomerInfo *customerInfo = [self decodeCustomerInfo:customer];
    [[FlyBuyCore customer] create:customerInfo termsOfService:YES ageVerification:YES callback:^(FlyBuyCustomer *customer, NSError *error) {
        if (error == nil && customer != nil) {
            resolve([self parserCustomer:customer]);
        } else {
            reject([error localizedDescription], [error debugDescription], error);
        }
    }];
    
}

RCT_EXPORT_METHOD(updateCustomer:(NSDictionary *)customer
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    FlyBuyCustomerInfo *customerInfo = [self decodeCustomerInfo:customer];
    [[FlyBuyCore customer] update:customerInfo callback:^(FlyBuyCustomer *customer, NSError *error) {
        if (error == nil && customer != nil) {
            resolve([self parserCustomer:customer]);
        } else {
            reject([error localizedDescription], [error debugDescription], error);
        }
    }];
}

// Sites
RCT_EXPORT_METHOD(fetchAllSites:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    [[FlyBuyCore sites] fetchAllWithQuery:nil callback:^(NSArray<FlyBuySite *> *sites, NSError *error) {
        if (error == nil) {
          NSMutableArray *parsedSites = [NSMutableArray array];
          for (FlyBuySite *site in sites) {
            [parsedSites addObject:[self parseSite:site]];
          }
          resolve(parsedSites);
        } else {
          reject([error localizedDescription], [error debugDescription], error);
        }
    }];
}

RCT_EXPORT_METHOD(fetchSitesByQuery:(NSDictionary *)params
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *query = [RCTConvert NSString:params[@"query"]];
      NSInteger page = [RCTConvert NSInteger:params[@"page"]];
      
    [[FlyBuyCore sites] fetchWithQuery:query page:page callback:^(NSArray<FlyBuySite *> *sites, FlyBuyPagination *pagination, NSError *error) {
        if (error == nil) {
              NSMutableDictionary *result = [NSMutableDictionary dictionary];
              NSMutableArray *parsedSites = [NSMutableArray array];
              for (FlyBuySite *site in sites) {
                [parsedSites addObject:[self parseSite:site]];
              }
              result[@"data"] = parsedSites;
              result[@"pagination"] = [self parsePagination:pagination] ?: [NSNull null];
              
              resolve(result);
            } else {
              reject([error localizedDescription], [error debugDescription], error);
            }
    }];
}


RCT_EXPORT_METHOD(fetchSitesByRegion:(NSDictionary *)params
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSInteger page = [RCTConvert NSInteger:params[@"page"]];
      NSInteger per = [RCTConvert NSInteger:params[@"per"]];
      CLCircularRegion *region = [self decodeRegion:params[@"region"]];
    
    [[FlyBuyCore sites] fetchWithRegion:region page:page per:per callback:^(NSArray<FlyBuySite *> *sites, NSError *error) {
        if (error == nil) {
          NSMutableArray *result = [NSMutableArray array];
          for (FlyBuySite *site in sites) {
            [result addObject:[self parseSite:site]];
          }
          resolve(result);
        } else {
          reject([error localizedDescription], [error debugDescription], error);
        }
    }];
    
}

RCT_EXPORT_METHOD(fetchSiteByPartnerIdentifier:(NSDictionary *)params
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
    NSString *pid = params[@"partnerIdentifier"];
    if (![pid isKindOfClass:[NSString class]]) {
        reject(@"invalid_parameter", @"partnerIdentifier must be a string", nil);
        return;
    }
    
    [[FlyBuyCore sites] fetchByPartnerIdentifierWithPartnerIdentifier:pid callback:^(FlyBuySite *site, NSError *error) {
        if (error == nil) {
          resolve([self parseSite:site]);
        } else {
          reject([error localizedDescription], [error debugDescription], error);
        }
    }];
}

// Notifications

RCT_EXPORT_METHOD(updatePushToken:(NSString *)token)
{
  [FlyBuyCore updatePushToken:token];
}

RCT_EXPORT_METHOD(handleRemoteNotification:(NSDictionary *)userInfo)
{
  [FlyBuyCore handleRemoteNotification:userInfo];
}



// Parser
- (NSDictionary<NSString *, NSString *> *)parseCustomerInfo:(FlyBuyCustomerInfo *)info {
    return @{
        @"name": info.name ? info.name : [NSNull null],
        @"carType": info.carType ? info.carType : [NSNull null],
        @"carColor": info.carColor ? info.carColor : [NSNull null],
        @"licensePlate": info.licensePlate ? info.licensePlate : [NSNull null],
        @"phone": info.phone ? info.phone : [NSNull null]
    };
}

- (NSDictionary<NSString *, id> *)parserCustomer:(FlyBuyCustomer *)customer {
    return @{
        @"token": customer.token ? customer.token : [NSNull null],
        @"emailAddress": customer.emailAddress ? customer.emailAddress : [NSNull null],
        @"info": [self parseCustomerInfo:customer.info]
    };
}

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


- (NSDictionary *)parsePagination:(FlyBuyPagination *)pagination {
  if (pagination) {
    NSMutableDictionary *map = [NSMutableDictionary dictionary];
    map[@"currentPage"] = @(pagination.currentPage);
    map[@"totalPages"] = @(pagination.totalPages);
    return map;
  } else {
    return nil;
  }
}



// Decoder
- (FlyBuyCustomerInfo *)decodeCustomerInfo:(NSDictionary<NSString *, NSString *> *)customer {
    NSString *name = customer[@"name"] ?: @" ";
    NSString *carType = customer[@"carType"] ?: @"";
    NSString *carColor = customer[@"carColor"] ?: @"";
    NSString *licensePlate = customer[@"licensePlate"] ?: @"";
    NSString *phone = customer[@"phone"] ?: @"";
    
    FlyBuyCustomerInfo *customerInfo = [[FlyBuyCustomerInfo alloc] initWithName:name
                                                                        carType:carType
                                                                       carColor:carColor
                                                                   licensePlate:licensePlate
                                                                          phone:phone];
    return customerInfo;
}

- (CLCircularRegion *)decodeRegion:(NSDictionary<NSString *, NSNumber *> *)regionDict {
  CLLocationDegrees latitude = [regionDict[@"latitude"] doubleValue];
  CLLocationDegrees longitude = [regionDict[@"longitude"] doubleValue];
  CLLocationDistance radius = [regionDict[@"radius"] doubleValue];
  
  CLLocationCoordinate2D center = CLLocationCoordinate2DMake(latitude, longitude);
  CLCircularRegion *region = [[CLCircularRegion alloc] initWithCenter:center radius:radius identifier:[[NSUUID UUID] UUIDString]];
  
  return region;
}


// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRnFlybuyCoreSpecJSI>(params);
}
#endif

@end
