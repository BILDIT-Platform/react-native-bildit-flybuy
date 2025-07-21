package com.bilditplatform.rnflybuylivestatus

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.radiusnetworks.flybuy.sdk.livestatus.LiveStatusManager
import android.graphics.Color

class RnFlybuyLivestatusModule internal constructor(context: ReactApplicationContext) :
  RnFlybuyLivestatusSpec(context) {

  /**
   * @deprecated Use configureWithOptions instead.
   */
  @Deprecated("Use configureWithOptions instead.")
  override fun configure(icon: String, promise: Promise) {
    LiveStatusManager.getInstance().configure(reactApplicationContext)
    promise.resolve("LiveStatus configured successfully (deprecated method)")
  }

  fun configureWithOptions(
    icon: String?,
    statusTintColor: Int?,
    statusTintDarkModeColor: Int?,
    promise: Promise
  ) {
    val options = LiveStatusOptions()
      .setIconName(icon)
    statusTintColor?.let { options.setStatusTintColor(it) }
    statusTintDarkModeColor?.let { options.setStatusTintDarkModeColor(it) }
    // TODO: Pass options to LiveStatusManager when SDK supports it
    LiveStatusManager.getInstance().configure(reactApplicationContext)
    promise.resolve("LiveStatus configured with options")
  }

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "RnFlybuyLivestatus"
  }
}
