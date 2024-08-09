package com.bilditplatform.rnflybuypresence

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.radiusnetworks.flybuy.sdk.presence.PresenceManager
import java.util.concurrent.ExecutionException

class RnFlybuyPresenceModule internal constructor(context: ReactApplicationContext) :
  RnFlybuyPresenceSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun startLocatorWithIdentifier(byte_presenceId: String, payload: String, promise: Promise) {
    var presenceId = byte_presenceId.toByteArray()
    PresenceManager.getInstance()
      ?.createLocatorWithIdentifier(presenceId, payload) { presenceLocator, sdkError ->
        sdkError?.let {
          // Handle error
          promise.reject(it.userError(), it.userError())
        }
        presenceLocator?.let {
          // Set locator listener
          // it.listener = locatorListener
          // Store locator or start it here
          PresenceManager.getInstance().start(presenceLocator)
          promise.resolve("Locator started successfully")
        }
      }
  }

  @ReactMethod
  override fun stopLocator(promise: Promise) {
    try {
      PresenceManager.getInstance().stop()
      promise.resolve("Locator is stopped successfully.")
    } catch (e: ExecutionException) {
      promise.reject(e.message, e.message)
    }
  }
  companion object {
    const val NAME = "RnFlybuyPresence"
  }
}
