#import <React/RCTConvert.h>
#import "RnFlybuyCore.h"
#import "RnFlybuyCore-Umbrella.h"

@implementation RnFlybuyCore
RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[@"orderUpdated", @"ordersUpdated", @"ordersError", @"orderEventError", @"notifyEvents"];
}

RCT_EXPORT_METHOD(startObserver) {
    [[NSNotificationCenter defaultCenter] addObserverForName:@"orderUpdated" object:nil queue:nil usingBlock:^(NSNotification *notification) {
      FlyBuyOrder *order = notification.object;
      if ([order isKindOfClass:[FlyBuyOrder class]]) {
            NSDictionary *body = [self parseOrder:order];
            [self sendEventWithName:@"orderUpdated" body:body];
        }
    }];
}

RCT_EXPORT_METHOD(stopObserver) {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}


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


// Orders

RCT_EXPORT_METHOD(fetchOrders:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [[FlyBuyCore orders] fetchWithCallback:^(NSArray<FlyBuyOrder *> *orders, NSError *error) {
        if (error == nil) {
            NSMutableArray *parsedOrders = [NSMutableArray array];
            for (FlyBuyOrder *order in orders) { // Replace 'OrderType' with the correct type
                [parsedOrders addObject:[self parseOrder:order]];
            }
            resolve(parsedOrders);
        } else {
            reject(error.localizedDescription, error.debugDescription, error);
        }
    }];
}

RCT_EXPORT_METHOD(createOrder:(NSInteger)siteId
                  withPartnerIdentifier:(NSString *)pid
                  withCustomerInfo:(NSDictionary *)customerInfo
                  withPickupWindow:(NSDictionary *)pickupWindow
                  withOrderState:(NSString *)orderState
                  withPickupType:(NSString *)pickupType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    FlyBuyCustomerInfo *info = [self decodeCustomerInfo:customerInfo];

    void (^callbackHandler)(FlyBuyOrder *order, NSError *error) = ^(FlyBuyOrder *order, NSError *error) {
        if (error == nil && order != nil) {
            resolve([self parseOrder:order]);
        } else {
            reject(error.debugDescription, error.localizedDescription, error);
        }
    };

    if (pickupWindow != nil) {
        FlyBuyPickupWindow *pickupWindowInfo = [self decodePickupWindowWithPickupWindow:pickupWindow];


        [[FlyBuyCore orders] createWithSiteID:siteId partnerIdentifier:pid customerInfo:info pickupWindow:pickupWindowInfo state:orderState pickupType:pickupType callback:^(FlyBuyOrder *order, NSError *error) {
            callbackHandler(order, error);
        }];
    } else {
        [[FlyBuyCore orders] createWithSiteID:siteId partnerIdentifier:pid customerInfo:info state:orderState pickupType:pickupType callback:^(FlyBuyOrder *order, NSError *error) {
            callbackHandler(order, error);
        }];
    }
}

RCT_EXPORT_METHOD(createOrderWithPartnerIdentifier:(NSString *)sitePartnerIdentifier
                  withOrderPartnerIdentifier:(NSString *)orderPid
                  withCustomerInfo:(NSDictionary *)customerInfo
                  withPickupWindow:(NSDictionary *)pickupWindow
                  withOrderState:(NSString *)orderState
                  withPickupType:(NSString *)pickupType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    FlyBuyCustomerInfo *info = [self decodeCustomerInfo:customerInfo];

    void (^callbackHandler)(FlyBuyOrder *order, NSError *error) = ^(FlyBuyOrder *order, NSError *error) {
        if (error == nil && order != nil) {
            resolve([self parseOrder:order]);
        } else {
            reject(error.debugDescription, error.localizedDescription, error);
        }
    };

    if (pickupWindow != nil) {
        FlyBuyPickupWindow *pickupWindowInfo = [self decodePickupWindowWithPickupWindow:pickupWindow];


        [[FlyBuyCore orders] createWithSitePartnerIdentifier:sitePartnerIdentifier orderPartnerIdentifier:orderPid customerInfo:info pickupWindow:pickupWindowInfo state:orderState pickupType:pickupType callback:^(FlyBuyOrder *order, NSError *error) {
            callbackHandler(order, error);
        }];
    } else {
        [[FlyBuyCore orders] createWithSitePartnerIdentifier:sitePartnerIdentifier orderPartnerIdentifier:orderPid customerInfo:info state:orderState pickupType:pickupType callback:^(FlyBuyOrder *order, NSError *error) {
            callbackHandler(order, error);
        }];
    }
}

RCT_EXPORT_METHOD(claimOrder:(NSString *)redeemCode
                  withCustomer:(NSDictionary *)customer
                  withPickupType:(NSString *)pickupType
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    FlyBuyCustomerInfo *customerInfo = [self decodeCustomerInfo:customer];

    [[FlyBuyCore orders] claimWithRedemptionCode:redeemCode customerInfo:customerInfo pickupType:pickupType callback:^(FlyBuyOrder *order, NSError *error) {
        if (error == nil && order != nil) {
            resolve([self parseOrder:order]);
        } else {
            reject(error.localizedDescription, error.debugDescription, error);
        }
    }];
}

RCT_EXPORT_METHOD(fetchOrderByRedemptionCode:(NSString *)redemCode
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [[FlyBuyCore orders] fetchWithRedemptionCode:redemCode callback:^(FlyBuyOrder *order, NSError *error) {
        if (error) {
            reject(error.localizedDescription, error.localizedDescription, error);
        } else {
            resolve([self parseOrder:order]);
        }
    }];
}

RCT_EXPORT_METHOD(updateOrderState:(NSInteger)orderId
                  withState:(NSString *)state
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [[FlyBuyCore orders] updateOrderStateWithOrderID:orderId state:state callback:^(FlyBuyOrder *order, NSError *error) {
        if (error) {
            reject(error.localizedDescription, error.debugDescription, error);
        } else {
            resolve([self parseOrder:order]);
        }
    }];
}

RCT_EXPORT_METHOD(updateOrderCustomerState:(NSInteger)orderId
                  withState:(NSString *)state
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [[FlyBuyCore orders] updateCustomerStateWithOrderID:orderId customerState:state callback:^(FlyBuyOrder *order, NSError *error) {
        if (error) {
            reject(error.localizedDescription, error.debugDescription, error);
        } else {
            resolve([self parseOrder:order]);
        }
    } ];
}

RCT_EXPORT_METHOD(updateOrderCustomerStateWithSpot:(NSInteger)orderId
                  withState:(NSString *)state
                  withSpot:(NSString *)spot
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [[FlyBuyCore orders] updateCustomerStateWithOrderID:orderId customerState:state spotIdentifier:spot callback:^(FlyBuyOrder *order, NSError *error) {
        if (error) {
            reject(error.localizedDescription, error.debugDescription, error);
        } else {
            resolve([self parseOrder:order]);
        }
    }];
}

RCT_EXPORT_METHOD(rateOrder:(NSInteger)orderId
                  withRating:(NSInteger)rating
                  withComments:(NSString *)comments
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
{
    [[FlyBuyCore orders] rateOrderWithOrderID:orderId rating:rating comments:comments callback:^(FlyBuyOrder *order, NSError *error) {
        if (error) {
            reject(error.localizedDescription, error.debugDescription, error);
        } else {
            resolve([self parseOrder:order]);
        }
    }];
}

RCT_EXPORT_METHOD(updatePickupMethod:(NSInteger)orderId
                  withOptions: (NSDictionary *)options
                 withResolver:(RCTPromiseResolveBlock)resolve
               withRejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *pickupType = options[@"pickupType"] ?: @"pickup";
  NSString *customerCarColor = options[@"customerCarColor"];
  NSString *customerCarType = options[@"customerCarType"];
  NSString *customerLicensePlate = options[@"customerLicensePlate"];
  NSString *handoffVehicleLocation = options[@"handoffVehicleLocation"];
  
  FlyBuyPickupMethodOptionsBuilder* builder = [[FlyBuyPickupMethodOptionsBuilder alloc] initWithPickupType:pickupType];
  
  FlyBuyPickupMethodOptions* pickupMethodOptions = [builder build];
  
  if (customerCarType != NULL) {
    builder = [builder setCustomerCarType:customerCarType];
  }
  if (customerCarType != NULL) {
    builder = [builder setCustomerCarColor:customerCarType];
  }
  if (customerLicensePlate != NULL) {
    builder = [builder setCustomerLicensePlate:customerLicensePlate];
  }
  if (handoffVehicleLocation != NULL) {
    builder = [builder setHandoffVehicleLocation:handoffVehicleLocation];
  }
  
  [[FlyBuyCore orders] updatePickupMethodWithOrderID:orderId pickupMethodOptions:pickupMethodOptions callback:^(FlyBuyOrder *order, NSError *error) {
    if (error) {
        reject(error.localizedDescription, error.debugDescription, error);
    } else {
        resolve([self parseOrder:order]);
    }
  }];

}

RCT_EXPORT_METHOD(placesSuggest:(NSString *)query
                  withOptions: (NSDictionary *)options
                 withResolver:(RCTPromiseResolveBlock)resolve
               withRejecter:(RCTPromiseRejectBlock)reject)
{
  FlyBuyPlaceOptionsBuilder* builder = [[FlyBuyPlaceOptionsBuilder alloc] init];
  
  NSNumber *type = options[@"type"] ?: @(0);
  double latitude = [options[@"latitude"] doubleValue];
  double longitude = [options[@"longitude"] doubleValue];
  NSString *countryCode = options[@"countryCode"];
  
  // Handle single country code
  if (countryCode != NULL) {
    builder = [builder addCountryCode:countryCode];
  }
  
  // Handle countryCodes (NSArray<NSString *>)
  NSArray<NSString *> *countryCodes = options[@"countryCodes"];
  if ([countryCodes isKindOfClass:[NSArray class]]) {
    NSMutableArray<NSString *> *codes = [NSMutableArray array];
    for (id code in countryCodes) {
      if ([code isKindOfClass:[NSString class]]) {
        builder = [builder addCountryCode:code];
      }
    }
    
  }

  NSArray<NSNumber *> *placeTypes = options[@"placeTypes"];
  if ([placeTypes isKindOfClass:[NSArray class]]) {
    for (id num in placeTypes) {
      if ([num isKindOfClass:[NSNumber class]]) {
        builder = [builder addType:[self placeTypeForNumber:num]];
      }
    }
  }

  if (type != NULL) {
    builder = [builder setType:[self placeTypeForNumber:type]];
  }

  if (latitude && longitude) {
    builder = [builder setProximityWithLatitude: latitude longitude: longitude];
  }

  FlyBuyPlaceOptions* placeOptions = [builder build];


  [[FlyBuyCore places] suggestWithQuery:query options:placeOptions callback:^(NSArray<FlyBuyPlace *> * _Nullable places, NSError * _Nullable error) {
        if (error == nil) {
            NSMutableArray *parsedPlaces = [NSMutableArray array];
            for (FlyBuyPlace *place in places) { // Replace 'OrderType' with the correct type
              [parsedPlaces addObject:[self parsePlace:place]];
            }
            resolve(parsedPlaces);
        } else {
            reject(error.localizedDescription, error.debugDescription, error);
        }
      }];

}

RCT_EXPORT_METHOD(placesRetrieve:(NSDictionary *)place
                 withResolver:(RCTPromiseResolveBlock)resolve
               withRejecter:(RCTPromiseRejectBlock)reject)
{
  FlyBuyPlace *placeInfo = [self decodePlace:place];
  [[FlyBuyCore places] retrieveWithPlace:placeInfo callback:^(FlyBuyCoordinate * _Nullable coordinate, NSError * _Nullable error) {
    if (error == nil) {
      if (coordinate == nil) {
        reject(@"Fetch place location Error", @"Error retrieving place location", nil);
      } else {
        resolve([self parseLocation:coordinate]);
      }
    } else {
        reject(error.localizedDescription, error.debugDescription, error);
    }
  }];
}

// Utils
- (PlaceType)placeTypeForNumber:(NSNumber *)type {
  switch ([type integerValue]) {
    case 0:
      return PlaceTypeAddress;
    case 1:
    case 2:
      return PlaceTypeRegion;
    case 3:
      return PlaceTypeCity;
    case 4:
      return PlaceTypePoi;
    default:
      return PlaceTypeAddress;
  }
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

- (NSDictionary *)parseOrder:(FlyBuyOrder *)order {
    return @{
        @"id":  @(order.id),
        @"state": order.state ?: [NSNull null],
        @"customerState": order.customerState.description.lowercaseString ?: [NSNull null],
        @"partnerIdentifier": order.partnerIdentifier ?: [NSNull null],
        @"partnerIdentifierForCustomer": order.partnerIdentifierForCustomer ?: [NSNull null],
        @"partnerIdentifierForCrew": order.partnerIdentifierForCrew ?: [NSNull null],
        @"pickupWindow": @[
            order.pickupWindow.start.description ?: [NSNull null],
            order.pickupWindow.end.description ?: [NSNull null]
        ],
        @"pickupType": order.pickupType ?: [NSNull null],
        @"etaAt": order.etaAt.description ?: [NSNull null],
        @"redemptionCode": order.redemptionCode ?: [NSNull null],
        @"redeemedAt": order.redeemedAt.description ?: [NSNull null],
        @"createdAt": order.createdAt.description ?: [NSNull null],
        @"orderFiredAt": order.orderFiredAt.description ?: [NSNull null],
        @"customerRating": order.customerRating ?: [NSNull null],
        @"customerComment": order.customerComment ?: [NSNull null],

        @"siteID": @(order.siteID),
        @"siteName": order.siteName ?: [NSNull null],
        @"sitePhone": order.sitePhone ?: [NSNull null],
        @"siteFullAddress": order.siteFullAddress ?: [NSNull null],
        @"siteLongitude": order.siteLongitude ?: [NSNull null],
        @"siteLatitude": order.siteLatitude ?: [NSNull null],
        @"siteInstructions": order.siteInstructions ?: [NSNull null],
        @"siteDescription": order.siteDescription ?: [NSNull null],
        @"siteCoverPhotoURL": order.siteCoverPhotoURL ?: [NSNull null],

        @"customerName": order.customerName ?: [NSNull null],
        @"customerCarType": order.customerCarType ?: [NSNull null],
        @"customerCarColor": order.customerCarColor ?: [NSNull null],
        @"customerLicensePlate": order.customerLicensePlate ?: [NSNull null],
        @"spotIdentifer": order.spotIdentifer ?: [NSNull null],
        // The iOS SDK only expose order.spotIdentifer, and android expose spotIdentifer.
        @"spotIdentifier": order.spotIdentifer ?: [NSNull null],
        // TODO: check the SDK
        // @"spotIdentifierEntryEnabled": @(order.spotIdentifierEntryEnabled),
        @"spotIdentifierInputType": order.spotIdentifierInputType ?: [NSNull null]
    };
}

- (NSDictionary *)parsePlace:(FlyBuyPlace *)place {

    return @{
        @"id": place.id ?: [NSNull null],
        @"name": place.name ?: [NSNull null],
        @"address": place.address ?: [NSNull null],
        @"distance": @(place.distance),
        @"placeFormatted": place.placeFormatted ?: [NSNull null]
    };
}


- (NSDictionary *)parseLocation:(FlyBuyCoordinate *)location {

  // TODO: uncomment this once the attribute exposed on the SDK
    return @{
//        @"latitude": @(location.latitude),
//        @"longitude": @(location.longitude),
    };
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

- (FlyBuyPickupWindow *)decodePickupWindowWithPickupWindow:(NSDictionary<NSString *, NSString *> *)pickupWindow {
    NSISO8601DateFormatter *formatter = [[NSISO8601DateFormatter alloc] init];
    formatter.formatOptions = (NSISO8601DateFormatOptions)(NSISO8601DateFormatWithFullDate |
                                                           NSISO8601DateFormatWithTime |
                                                           NSISO8601DateFormatWithDashSeparatorInDate |
                                                           NSISO8601DateFormatWithColonSeparatorInTime);

    NSDate *start = [formatter dateFromString:pickupWindow[@"start"]] ?: [NSDate date]; // Replace with a fallback if needed
    NSDate *end = [formatter dateFromString:pickupWindow[@"end"]] ?: [NSDate date]; // Replace with a fallback if needed

    return [[FlyBuyPickupWindow alloc] initWithStart:start end:end];
}

- (FlyBuyPlace *)decodePlace:(NSDictionary<NSString *, NSString *> *)placeDict {
    NSString *id = placeDict[@"id"] ?: @"";
    NSString *name = placeDict[@"name"] ?: @"";
    NSString *address = placeDict[@"address"] ?: @"";
    double distance = [placeDict[@"distance"] doubleValue];
    NSString *placeFormatted = placeDict[@"placeFormatted"] ?: @"";

  FlyBuyPlace* place = [[FlyBuyPlace alloc] initWithId:id name:name placeFormatted:placeFormatted address:address distance:distance];
    return place;
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
