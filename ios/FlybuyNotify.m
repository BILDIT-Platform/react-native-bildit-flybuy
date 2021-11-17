//
//  FlybuyNotify.m
//  react-native-bildit-flybuy
//
//  Created by Addin Gama on 17/11/21.
//

#import <React/RCTBridgeModule.h>

@interface FlybuyNotify: NSObject
- (void)performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
@end

