package com.bilditplatform.rnflybuynotify

import android.content.Intent
import android.util.Log
import com.bilditplatform.rnflybuycore.decodeRegion
import com.bilditplatform.rnflybuycore.parseSites
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext.RCTDeviceEventEmitter
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion
import com.radiusnetworks.flybuy.sdk.exceptions.FlyBuyRuntimeException
import com.radiusnetworks.flybuy.sdk.notify.NotificationInfo
import com.radiusnetworks.flybuy.sdk.notify.NotifyManager


class RnFlybuyNotifyModule internal constructor(context: ReactApplicationContext) :
  RnFlybuyNotifySpec(context) {

  val TAG = "FlyBuy Notify Wrapper"

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun configure(bgTaskIdentifier: String, promise: Promise) {
    try {
      NotifyManager.getInstance()?.configure(reactApplicationContext.baseContext)
      promise.resolve(true)
      Log.i(TAG, "Notify configured")
    } catch (e: FlyBuyRuntimeException) {
      promise.reject(e)
      e.message?.let { Log.w(TAG, it) }
    }
  }

  @ReactMethod
  override fun createForSitesInRegion(region: ReadableMap, notification: ReadableMap, promise: Promise) {
    val regionInfo: CircularRegion = decodeRegion(region)
    val notificationInfo: NotificationInfo = decodeNotification(notification)

    NotifyManager.getInstance().createForSitesInRegion(
      region = regionInfo,
      notificationInfo = notificationInfo
    ) { sites, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        sites?.let {
          promise.resolve(parseSites(sites))
        } ?: run {
          promise.reject(
            "Create Notification for sites in region Error",
            "Error creating notification"
          )
        }
      }
    }

  }

  @ReactMethod
  override fun clearNotifications(promise: Promise) {
    NotifyManager.getInstance().clear() { sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve("ok")
      }
    }
  }

  @ReactMethod
  override fun sync(force: Boolean, promise: Promise) {
    NotifyManager.getInstance().sync(
      force
    ) { sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve("ok")
      }
    }
  }

  fun parseNotifyMetadata(values: Map<String, Any>): WritableMap {
    val map = Arguments.createMap()
    for ((key, value) in values) {
      when (value) {
        null -> map.putNull(key)
        is Boolean -> map.putBoolean(key, value)
        is Double -> map.putDouble(key, value)
        is Int -> map.putInt(key, value)
        is String -> map.putString(key, value)
        is WritableMap -> map.putMap(key, value)
        is WritableArray -> map.putArray(key, value)
        else -> throw IllegalArgumentException("Unsupported value type ${value::class.java.name} for key [$key]")
      }
    }
    map.putInt("time", (System.currentTimeMillis() / 1000).toInt())
    return map
  }

  fun handleNotification(intent: Intent?) {
    intent?.let {
      val notifyMetadata = NotifyManager.getInstance().handleNotification(it)
      if (null != notifyMetadata) {
        reactApplicationContext
          .getJSModule(RCTDeviceEventEmitter::class.java)
          .emit("notifyEvents", parseNotifyMetadata(notifyMetadata.toMap()))
      }
    }
  }

  @ReactMethod
  override fun onPermissionChangedNotify() {
    NotifyManager.getInstance().onPermissionChanged()
  }

  companion object {
    const val NAME = "RnFlybuyNotify"
  }
}
