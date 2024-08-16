#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RNCConfig.h"

#import <CoreLocation/CoreLocation.h>
#import <FlyBuy/FlyBuy-Swift.h>
// End

#import <FlyBuyPickup/FlyBuyPickup-Swift.h>
#import <FlyBuyPresence/FlyBuyPresence-Swift.h>
#import <FlyBuyNotify/FlyBuyNotify-Swift.h>
#import <FlyBuyLiveStatus/FlyBuyLiveStatus-Swift.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"example";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  // Load environment variables & initialize FlyBuy
  NSString *appToken = [RNCConfig envFor:@"IOS_APP_TOKEN"];
  // FlyBuy core configuration, always place this above all other FlyBuy configure
  FlyBuyConfigOptionsBuilder *builder = [FlyBuyConfigOptions BuilderWithToken:appToken];
  FlyBuyConfigOptions *configOptions = [builder build];
  [FlyBuyCore configureWithOptions:configOptions];
  
  // FlyBuy Pickup native configuration
  [[FlyBuyPickupManager shared] configure];
  
  // FlyBuy LiveStatus native configuration
  FlyBuyLiveStatusOptions *options = [[[FlyBuyLiveStatusOptions.Builder init] setIconName:@"AppIcon"] build];
  if (@available(iOS 16.2, *)) {
      [[FlyBuyLiveStatusManager shared] configureWithOptions:options];
  } else {
      // Fallback on earlier versions
    NSLog(@"LiveStatus is not available in this iOS version");
  }
  
  // FlyBuy Notify native configuration
  [[FlyBuyNotifyManager shared] configureWithBgTaskIdentifier:@"notifyBgTaskId" bgSyncCallback:^(NSError *error) {
    if (error == nil) {
      NSLog(@"Notify campaign content updated via a background task");
    } else {
      NSLog(@"Notify Background Sync Error: %@", error.description);
    }
  }];
  
  
  // FlyBuy Presence native configuration
  NSString *presenceUuid = [RNCConfig envFor:@"PRESENCE_UUID"];
  NSUUID *uuid = [[NSUUID alloc] initWithUUIDString:presenceUuid];
  [[FlyBuyPresenceManager shared] configureWithPresenceUUID:uuid];
  

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
