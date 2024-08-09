package com.bilditplatform.rnflybuypickup

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.radiusnetworks.flybuy.sdk.pickup.PickupManager

class RnFlybuyPickupModule internal constructor(context: ReactApplicationContext) :
  RnFlybuyPickupSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun onPermissionChanged(promise: Promise) {
    PickupManager.getInstance().onPermissionChanged()
    promise.resolve("Ok")
  }

  companion object {
    const val NAME = "RnFlybuyPickup"
  }
}
