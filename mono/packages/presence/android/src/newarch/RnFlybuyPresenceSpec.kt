package com.bilditplatform.rnflybuypresence

import com.facebook.react.bridge.ReactApplicationContext

abstract class RnFlybuyPresenceSpec internal constructor(context: ReactApplicationContext) :
  NativeRnFlybuyPresenceSpec(context) {

  abstract fun startLocatorWithIdentifier(id: String, payload: String, promise: Promise)
  abstract fun stopLocator(promise: Promise)
}
