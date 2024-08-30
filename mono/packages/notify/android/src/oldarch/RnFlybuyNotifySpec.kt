package com.bilditplatform.rnflybuynotify

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap

abstract class RnFlybuyNotifySpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun configure(bgTaskIdentifer: String, promise: Promise)
  abstract fun clearNotifications(promise: Promise)
  abstract fun createForSitesInRegion(region: ReadableMap, notification: ReadableMap, promise: Promise)
  abstract fun onPermissionChangedNotify()
  abstract fun sync(force: Boolean, promise: Promise)
}
