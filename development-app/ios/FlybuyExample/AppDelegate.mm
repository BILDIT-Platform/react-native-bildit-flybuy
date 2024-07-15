#import "AppDelegate.h"
#import <CoreLocation/CoreLocation.h>
#import <React/RCTBundleURLProvider.h>
#import "Flybuy-Umbrella.h"

@interface AppDelegate () <CLLocationManagerDelegate>
@property (nonatomic, strong) CLLocationManager *locationManager;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.moduleName = @"FlybuyExample";
  self.initialProps = @{};
  
  self.locationManager = [[CLLocationManager alloc] init];
  self.locationManager.delegate = self;
  [self.locationManager requestWhenInUseAuthorization];

  // Load environment variables & initialize FlyBuy
  NSString *appToken = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"FLYBUY_APP_TOKEN"];
  NSString *presenceUUIDString = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"FLYBUY_PRESENCE_UUID"];

  FlyBuyConfigOptionsBuilder *builder = [FlyBuyConfigOptions BuilderWithToken:appToken];
  FlyBuyConfigOptions *configOptions = [builder build];
  [FlyBuyCore configureWithOptions:configOptions];
  [[FlyBuyPickupManager shared] configure];
  
  NSUUID *presenceUUID = [[NSUUID alloc] initWithUUIDString:presenceUUIDString];
  [[FlyBuyPresenceManager shared] configureWithPresenceUUID:presenceUUID];
  NSString *bundleIdentifier = [[NSBundle mainBundle] bundleIdentifier];
  NSString *bgTaskIdentifier = [NSString stringWithFormat:@"%@.refresh.task.identifier", bundleIdentifier];
  [[FlyBuyNotifyManager shared] configureWithBgTaskIdentifier:bgTaskIdentifier bgSyncCallback:^(NSError * _Nullable error) {
     if (error) {
       NSLog(@"Error during background sync: %@", error.localizedDescription);
     } else {
       NSLog(@"Background sync completed successfully.");
     }
   }];
  
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
