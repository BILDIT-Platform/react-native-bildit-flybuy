package com.reactnativeflybuy

import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.pickup.PickupManager
import com.radiusnetworks.flybuy.sdk.notify.NotifyManager
import android.content.Context
import android.util.Log
import com.facebook.react.bridge.*
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion
import com.radiusnetworks.flybuy.sdk.notify.NotificationInfo

class FlybuyModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  init {
    FlyBuyCore.configure(reactContext, "224.epegiXJkGRqvwLJJYHPTCWGR")
    PickupManager.getInstance().configure(reactContext)
    NotifyManager.getInstance().configure(reactContext)
  }

  override fun getName(): String {
    return "Flybuy"
  }

  @ReactMethod
  fun fetchOrders(promise: Promise) {
    Log.d("Fetch orders", "Fetch")
    FlyBuyCore.orders.fetch { orders, sdkError ->
      if (null != sdkError) {
        // Handle error
        handleFlyBuyError(sdkError)
        promise.reject(sdkError.userError())
      } else {
        // Handle success
        Log.d("Success", "Success")
        // Log.d("Success", orders?.joinToString())
        promise.resolve(orders)
      }
    }
  }

  @ReactMethod
  fun createForSitesInRegion(regionJSObject: ReadableMap, notificationJSObject: ReadableMap, promise: Promise) {
    val latitude = regionJSObject.getDouble("latitude");
    val longitude = regionJSObject.getDouble("longitude");
    val radius = regionJSObject.getDouble("radius").toFloat();
    val region = CircularRegion(latitude, longitude, radius);
    // val title = notificationJSObject.getString("title")
    // val message = notificationJSObject.getString("title")
    // val notification = NotificationInfo(title, message);
    // NotifyManager.getInstance().createForSitesInRegion(region, notification) { sites, sdkError ->
    //   if (null != sdkError) {
    //     // Handle error
    //     handleFlyBuyError(sdkError)
    //     promise.reject(sdkError.userError())
    //   } else {
    //     // Handle success
    //     Log.d("Success", "Success")
    //     promise.resolve(sites)
    //   }
    // }
  }
}
