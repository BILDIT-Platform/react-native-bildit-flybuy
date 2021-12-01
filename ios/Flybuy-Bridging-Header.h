#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface Flybuy : RCTEventEmitter <RCTBridgeModule>
- (void)performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

- (void)handleNotificationResponse:(UNNotificationResponse*)response;
@end
