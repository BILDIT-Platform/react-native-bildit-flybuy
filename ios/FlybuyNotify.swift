//
//  FlybuyNotify.swift
//  react-native-bildit-flybuy
//
//  Created by Addin Gama on 17/11/21.
//

import FlyBuyNotify

@objc(FlybuyNotify)
public class FlybuyNotify: NSObject {
    
    @objc(performFetchWithCompletionHandler:)
    func performFetchWithCompletionHandler(completionHandler: @escaping ((UIBackgroundFetchResult) -> Void)) -> Void{
        FlyBuyNotify.Manager.shared.performFetchWithCompletionHandler(completionHandler)
    }
}
