package com.bilditplatform.rnflybuypickup

import com.facebook.react.bridge.ReactApplicationContext

abstract class RnFlybuyPickupSpec internal constructor(context: ReactApplicationContext) :
  NativeRnFlybuyPickupSpec(context) {
    abstract fun onPermissionChanged(promise: Promise)
}
