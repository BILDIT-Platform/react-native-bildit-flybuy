//
//  FlyBuyLiveStatusManagerWrapper.swift
//  FlybuyExample
//
//  Created by Kevin Garriott on 7/16/24.
//

import Foundation
import FlyBuy
import FlyBuyLiveStatus

@objc class FlyBuyLiveStatusManagerWrapper: NSObject {
    @objc static let shared = FlyBuyLiveStatusManagerWrapper()

    private override init() {}

    @objc func configureLiveStatus(iconName: String) {
      let liveStatusOptions = LiveStatusOptions.Builder()
            .setIconName(iconName)
            .build()
        FlyBuyLiveStatusManager.shared.configure(withOptions: liveStatusOptions)
    }
}
