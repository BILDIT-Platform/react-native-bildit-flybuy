package com.bilditplatform.rnflybuycore

import com.radiusnetworks.flybuy.sdk.data.common.SdkError
import com.radiusnetworks.flybuy.sdk.jobs.ResponseEventType
import android.util.Log

fun handleFlyBuyError(sdkError: SdkError?) {
  when (sdkError?.type) {
    ResponseEventType.NO_CONNECTION -> {
      Log.e("FlyBuy SDK Error", "No Connection")
    }
    ResponseEventType.FAILED -> {
      when (sdkError.code) {
        425 -> {
          Log.e("FlyBuy SDK Error", "Upgrade your app!")
        }
        else -> {
          Log.e("FlyBuy SDK Error", sdkError.userError())
        }
      }
    }
    else -> {}
  }
}
