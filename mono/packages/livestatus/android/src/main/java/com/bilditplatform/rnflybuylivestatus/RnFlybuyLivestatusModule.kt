package com.bilditplatform.rnflybuylivestatus

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.radiusnetworks.flybuy.sdk.livestatus.LiveStatusManager

class RnFlybuyLivestatusModule internal constructor(context: ReactApplicationContext) :
  RnFlybuyLivestatusSpec(context) {
  override fun configure(icon: String, promise: Promise) {
    LiveStatusManager.getInstance().configure(reactApplicationContext)
    promise.resolve("LiveStatus configured successfully")
  }

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "RnFlybuyLivestatus"
  }
}
