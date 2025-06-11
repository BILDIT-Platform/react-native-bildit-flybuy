package com.bilditplatform.rnflybuycore

import android.util.Log
import com.facebook.react.bridge.ReadableArray
import com.radiusnetworks.flybuy.sdk.data.common.SdkError
import com.radiusnetworks.flybuy.sdk.data.places.PlaceType
import com.radiusnetworks.flybuy.sdk.jobs.ResponseEventType

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

fun intToPlaceTypeEnum(value: Int): PlaceType? {
  // Get an array of all enum constants of MyEnum
  val enumValues = enumValues<PlaceType>()

  // Check if the value is within the bounds of the enum constants
  if (value >= 0 && value < enumValues.size) {
    // Return the enum constant corresponding to the value
    return enumValues[value]
  }

  return null // Handle invalid integer values
}



fun readableArrayToStringList(array: ReadableArray): List<String> {
  val list = mutableListOf<String>()
  for (i in 0 until array.size()) {
    list.add(array.getString(i) ?: "")
  }
  return list
}
