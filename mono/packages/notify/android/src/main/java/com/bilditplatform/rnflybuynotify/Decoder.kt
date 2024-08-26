package com.bilditplatform.rnflybuynotify

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableMapKeySetIterator
import com.facebook.react.bridge.ReadableType
import com.radiusnetworks.flybuy.sdk.notify.NotificationInfo
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion

fun decodeNotification(notification: ReadableMap): NotificationInfo {
  var title = ""
  var message = ""
  var data = mapOf<String, String>()

  if (notification.hasKey("title")) {
    title = notification.getString("title")!!
  }

  if (notification.hasKey("message")) {
    message = notification.getString("message")!!
  }

  if (notification.hasKey("data")) {
    var dataMap = notification.getMap("data")!!
    val iterator: ReadableMapKeySetIterator = dataMap.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      val type: ReadableType = dataMap.getType(key)
      when (type) {
        ReadableType.String -> data += Pair(key, dataMap.getString(key)!!)
        else -> throw IllegalArgumentException("Could not convert object with key: $key.")
      }
    }

  }

  return NotificationInfo(
    title = title,
    message = message,
    data = data
  )
}

fun decodeRegion(region: ReadableMap): CircularRegion {
  var latitude = region.getDouble("latitude")!!
  var longitude = region.getDouble("longitude")!!
  var radius = region.getInt("radius").toFloat()

  return CircularRegion(
    latitude = latitude,
    longitude = longitude,
    radius = radius
  )
}
