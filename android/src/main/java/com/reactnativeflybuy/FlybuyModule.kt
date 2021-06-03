package com.reactnativeflybuy

// import com.google.gson.Gson
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.*
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.data.common.SdkError
import com.radiusnetworks.flybuy.sdk.data.customer.CustomerInfo
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion
import com.radiusnetworks.flybuy.sdk.data.room.domain.Customer
import com.radiusnetworks.flybuy.sdk.data.room.domain.Order
import com.radiusnetworks.flybuy.sdk.data.room.domain.Site
import com.radiusnetworks.flybuy.sdk.notify.NotificationInfo
import com.radiusnetworks.flybuy.sdk.notify.NotifyManager
import com.radiusnetworks.flybuy.sdk.presence.LocatorState
import com.radiusnetworks.flybuy.sdk.presence.PresenceLocator
import com.radiusnetworks.flybuy.sdk.presence.PresenceManager
import java.util.*
import java.util.concurrent.ExecutionException


class FlybuyModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {



  override fun getName(): String {
    return "Flybuy"
  }

  @ReactMethod
  fun configure(token: String, promise: Promise) {
    FlyBuyCore.configure(reactApplicationContext.baseContext, token)
  }

  @ReactMethod
  fun notifyConfigure(promise: Promise) {
    NotifyManager.getInstance()?.configure(reactApplicationContext.baseContext)
  }


  @ReactMethod
  fun presenceConfigure(presenceUUID: String, promise: Promise) {
    val uid = UUID.fromString(presenceUUID)
    PresenceManager.getInstance()?.configure(reactApplicationContext.baseContext, uid)
  }

  @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
  @ReactMethod
  fun createLocatorWithIdentifier(byte_presenceId: String, payload: String, promise: Promise ) {
    var presenceId = byte_presenceId.toByteArray()
    PresenceManager.getInstance()?.createLocatorWithIdentifier(presenceId, payload) { presenceLocator, sdkError ->
      sdkError?.let {
        // Handle error
        promise.reject(it.userError(), it.userError())
      }
      presenceLocator?.let {

//      //  promise.resolve(presenceLocator.refere)
        // Set locator listener
        // it.listener = locatorListener
        // Store locator or start it here
        startLocator(presenceLocator)
      }
    }
  }

  @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
  @ReactMethod
  fun startLocatorWithIdentifier(byte_presenceId: String, payload: String, promise: Promise ) {
    var presenceId = byte_presenceId.toByteArray()
    PresenceManager.getInstance()?.createLocatorWithIdentifier(presenceId, payload) { presenceLocator, sdkError ->
      sdkError?.let {
        // Handle error
        promise.reject(it.userError(), it.userError())
      }
      presenceLocator?.let {
        // Set locator listener
        // it.listener = locatorListener
        // Store locator or start it here
        startLocator(presenceLocator)
        promise.resolve("Location started successfully:"+ presenceLocator.presenceNamespace.toString())
      }
    }
  }

  @ReactMethod
  fun startLocator(presenceLocator: PresenceLocator) {
    PresenceManager.getInstance()?.start(presenceLocator)
  }

  @ReactMethod
  fun stopLocator(promise: Promise) {
    try {
      PresenceManager.getInstance()?.stop()
      promise.resolve("Locator is stopped successfully.")
    }catch (e:ExecutionException){
      promise.reject(e.message)
    }

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

  @ReactMethod
  fun updateCustomer(customer: ReadableMap, promise: Promise) {
    val customerInfo: CustomerInfo = decodeCustomerInfo(customer)
    FlyBuyCore.customer.update(customerInfo) { customer, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        customer?.let {
          promise.resolve(parseCustomer(customer))
        } ?: run {
          promise.reject("Update Customer Error", "Error updating customer")
        }
      }
    }
  }

  @ReactMethod
  fun getCurrentCustomer(promise: Promise) {
    val customer = FlyBuyCore.customer.current
    customer?.let {
      promise.resolve(parseCustomer(customer))
    } ?: run {
      promise.reject("Not logged in", "Current Customer null")
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
  fun createForSitesInRegion(region: ReadableMap, notification: ReadableMap, promise: Promise) {
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
          promise.reject("Create Notification for sites in region Error", "Error creating notification")
        }
      }
    }

  }

  @ReactMethod
  fun clearNotifications(promise: Promise) {
    NotifyManager.getInstance().clear() { sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve(null)
      }
    }
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

fun parseSites(items: List<Site>): WritableArray {
  val array = WritableNativeArray()
  for (item in items) {
    array.pushMap(parseSite(item))
  }
  return array
}

fun parseSite(site: Site): WritableMap {
  val map = Arguments.createMap()
  map.putInt("id", site.id)
  map.putString("name", site.name)
  map.putString("phone", site.phone)
  map.putString("streetAddress", site.streetAddress)
  map.putString("fullAddress", site.fullAddress)
  map.putString("locality", site.locality)
  map.putString("region", site.region)
  map.putString("country", site.country)
  map.putString("postalCode", site.postalCode)
  map.putString("latitude", site.latitude)
  map.putString("longitude", site.longitude)
  map.putString("coverPhotoUrl", site.coverPhotoUrl)
  map.putString("instructions", site.instructions)
  map.putString("description", site.description)
  map.putString("partnerIdentifier", site.partnerIdentifier)

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

fun decodeNotification(notification: ReadableMap): NotificationInfo {
  var title = ""
  var message = ""

  if (notification.hasKey("title")) {
    title = notification.getString("title")!!
  }
  if (notification.hasKey("message")) {
    message = notification.getString("message")!!
  }

  return NotificationInfo(
    title = title,
    message = message
  )
}
