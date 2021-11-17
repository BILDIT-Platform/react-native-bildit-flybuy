#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface Flybuy : RCTEventEmitter <RCTBridgeModule>
@end

@interface FlybuyNotify : NSObject<RCTBridgeModule>
- (void)performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
@end
