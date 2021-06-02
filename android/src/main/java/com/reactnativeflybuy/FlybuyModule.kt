package com.reactnativeflybuy

import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.pickup.PickupManager
import com.radiusnetworks.flybuy.sdk.notify.NotifyManager
import android.content.Context
import android.util.Log
import com.facebook.react.bridge.*
// import com.google.gson.Gson
import com.radiusnetworks.flybuy.sdk.data.customer.CustomerInfo
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion
import com.radiusnetworks.flybuy.sdk.data.room.domain.Customer
import com.radiusnetworks.flybuy.sdk.data.room.domain.Order
import com.radiusnetworks.flybuy.sdk.notify.NotificationInfo

class FlybuyModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  // init {
  //   FlyBuyCore.configure(reactContext, "224.epegiXJkGRqvwLJJYHPTCWGR")
  //   PickupManager.getInstance().configure(reactContext)
  //   NotifyManager.getInstance().configure(reactContext)
  // }

  override fun getName(): String {
    return "Flybuy"
  }

  @ReactMethod
  fun configure(token: String, promise: Promise) {
    FlyBuyCore.configure(reactApplicationContext.baseContext, token)
  }

  // Customer

  @ReactMethod
  fun login(token: String, promise: Promise) {
    FlyBuyCore.customer.loginWithToken(token = token) { customer, error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject(error.userError())
      } else {
        if (null != customer) {
          promise.resolve(parseCustomer(customer))
        }
      }
    }
  }

  @ReactMethod
  fun createCustomer(customer: ReadableMap, promise: Promise) {
    val customerInfo: CustomerInfo = decodeCustomerInfo(customer)
    FlyBuyCore.customer.create(customerInfo, true, true) { customer, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        customer?.let {
          promise.resolve(parseCustomer(customer))
        } ?: run {
          promise.reject("Create Customer Error", "Error retrieving customer")
        }
      }
    }
  }

  // Orders

  @ReactMethod
  fun fetchOrders(promise: Promise) {
    FlyBuyCore.orders.fetch() { orders, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve(orders?.let { parseOrders(it) })
      }

    }
  }

  @ReactMethod
  fun createOrder(siteID: Int, pid: String, customer: ReadableMap, promise: Promise) {
    val customerInfo: CustomerInfo = decodeCustomerInfo(customer)

    FlyBuyCore.orders.create(
      siteID = siteID,
      partnerIdentifier = pid,
      customerInfo = customerInfo
    ) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let {
          promise.resolve(parseOrder(order))
        } ?: run {
          promise.reject("Create Order Error", "Error retrieving order")
        }
      }
    }
  }

  // Notify

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

fun parseCustomer(customer: Customer): WritableMap {
  val map = Arguments.createMap()
  map.putInt("id", customer.id)
  map.putString("token", customer.apiToken)
  map.putString("emailAddress", customer.email)

  val info = Arguments.createMap()
  info.putString("name", customer.name)
  info.putString("carType", customer.carType)
  info.putString("carColor", customer.carColor)
  info.putString("licensePlate", customer.licensePlate)
  info.putString("phone", customer.phone)

  map.putMap("info", info)

  return map
}

fun parseOrders(items: List<Order>): WritableArray {
  val array = WritableNativeArray()
  for (item in items) {
    array.pushMap(parseOrder(item))
  }
  return array
}


fun parseOrder(order: Order): WritableMap {
  val map = Arguments.createMap()
  map.putInt("id", order.id)
  map.putString("state", order.state)
  map.putString("customerState", order.customerState)
  map.putString("partnerIdentifier", order.partnerIdentifier)
  val pickupWindow = Arguments.createArray()
  pickupWindow.pushString(order.pickupWindow?.start.toString())
  pickupWindow.pushString(order.pickupWindow?.end.toString())
  map.putArray("pickupWindow", pickupWindow)
  map.putString("pickupType", order.pickupType)
  map.putString("etaAt", order.etaAt?.toString())
  map.putString("redemptionCode", order.redemptionCode)
  map.putString("redeemedAt", order.redeemedAt.toString())
  order.customerRatingValue?.let { map.putInt("customerRating", it) }
  map.putString("customerComment", order.customerRatingComments)
  map.putInt("siteID", order.site?.id)
  map.putString("siteName", order.site?.name)
  map.putString("sitePhone", order.site?.phone)
  map.putString("siteFullAddress", order.site?.fullAddress)
  map.putString("siteLongitude", order.site?.longitude)
  map.putString("siteLatitude", order.site?.latitude)
  map.putString("siteInstructions", order.site?.instructions)
  map.putString("siteDescription", order.site?.description)
  map.putString("siteCoverPhotoURL", order.site?.coverPhotoUrl)
  map.putString("customerName", order.customer?.name)
  map.putString("customerCarType", order.customer?.carType)
  map.putString("customerCarColor", order.customer?.carColor)
  map.putString("customerLicensePlate", order.customer?.licensePlate)

  return map
}

fun decodeCustomerInfo(customer: ReadableMap): CustomerInfo {
  var name = ""
  var carType = ""
  var carColor = ""
  var licensePlate = ""
  var phone = ""


  if (customer.hasKey("name")) {
    name = customer.getString("name")!!
  }
  if (customer.hasKey("carType")) {
    carType = customer.getString("carType")!!
  }
  if (customer.hasKey("carColor")) {
    carColor = customer.getString("carColor")!!
  }
  if (customer.hasKey("phone")) {
    phone = customer.getString("phone")!!
  }
  if (customer.hasKey("licensePlate")) {
    licensePlate = customer.getString("licensePlate")!!
  }

  return CustomerInfo(
    name = name,
    carType = carType,
    carColor = carColor,
    licensePlate = licensePlate,
    phone = phone
  )

}
