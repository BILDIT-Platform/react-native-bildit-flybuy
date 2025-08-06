package com.bilditplatform.rnflybuylivestatus

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.radiusnetworks.flybuy.sdk.livestatus.LiveStatusManager
import android.graphics.Color

class RnFlybuyLivestatusModule internal constructor(context: ReactApplicationContext) :
  RnFlybuyLivestatusSpec(context) {

  @ReactMethod
  override fun configure(
    icon: String,
    statusTintColor: String?,
    statusTintDarkModeColor: String?,
    promise: Promise
  ) {
    try {
      val options = LiveStatusOptions()
        .setIconName(icon)

      statusTintColor?.let { hexColor ->
        if (hexColor.isNotEmpty()) {
          val color = parseHexColor(hexColor)
          options.setStatusTintColor(color)
        }
      }

      statusTintDarkModeColor?.let { hexColor ->
        if (hexColor.isNotEmpty()) {
          val color = parseHexColor(hexColor)
          options.setStatusTintDarkModeColor(color)
        }
      }

      // TODO: Pass options to LiveStatusManager when SDK supports it
      LiveStatusManager.getInstance().configure(reactApplicationContext)
      promise.resolve("LiveStatus configured properly")
    } catch (e: Exception) {
      promise.reject("LIVESTATUS_CONFIG_ERROR", "Failed to configure LiveStatus: ${e.message}", e)
    }
  }

  private fun parseHexColor(hexColor: String): Int {
    return Color.parseColor(if (hexColor.startsWith("#")) hexColor else "#$hexColor")
  }

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "RnFlybuyLivestatus"
  }
}
