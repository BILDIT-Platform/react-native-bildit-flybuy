package com.reactnativeflybuy

import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.*
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.data.common.Pagination
import com.radiusnetworks.flybuy.sdk.data.customer.CustomerInfo
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion
import com.radiusnetworks.flybuy.sdk.data.room.domain.Customer
import com.radiusnetworks.flybuy.sdk.data.room.domain.Order
import com.radiusnetworks.flybuy.sdk.data.room.domain.PickupWindow
import com.radiusnetworks.flybuy.sdk.data.room.domain.Site
import com.radiusnetworks.flybuy.sdk.notify.NotificationInfo
import com.radiusnetworks.flybuy.sdk.notify.NotifyManager
import com.radiusnetworks.flybuy.sdk.pickup.PickupManager
import com.radiusnetworks.flybuy.sdk.presence.PresenceLocator
import com.radiusnetworks.flybuy.sdk.presence.PresenceManager
import org.threeten.bp.Instant
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

  // Customer

  @ReactMethod
  fun loginWithToken(token: String, promise: Promise) {
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
  fun login(email: String, password: String, promise: Promise) {
    FlyBuyCore.customer.login(email, password) { customer, error ->
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
  fun signUp(email: String, password: String, promise: Promise) {
    FlyBuyCore.customer.signUp(email, password) { customer, error ->
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
  fun logout(promise: Promise) {
    FlyBuyCore.customer.logout { error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject(error.userError())
      } else {
        promise.resolve("ok")
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
    FlyBuyCore.orders.fetch { orders, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve(orders?.let { parseOrders(it) })
      }

    }
  }

  @ReactMethod
  fun claimOrder(redeemCode: String, customer: ReadableMap, pickupType: String? = null, promise: Promise) {
    FlyBuyCore.orders.claim(redeemCode, decodeCustomerInfo(customer), pickupType) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  @ReactMethod
  fun createOrder(siteID: Int, pid: String, customer: ReadableMap, pickupWindow: ReadableMap, orderState: String? = null, pickupType: String? = null, promise: Promise) {
    val customerInfo: CustomerInfo = decodeCustomerInfo(customer)
    val pickupWindowInfo = decodePickupWindow(pickupWindow)

    FlyBuyCore.orders.create(
      siteID = siteID,
      partnerIdentifier = pid,
      customerInfo = customerInfo,
      pickupWindow = pickupWindowInfo,
      state = orderState,
      pickupType = pickupType
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

  @ReactMethod
  fun updateOrderState(orderId: Int, state: String, promise: Promise) {
    FlyBuyCore.orders.updateState(orderId, state) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  @ReactMethod
  fun rateOrder(orderId: Int, rating: Int, comments: String, promise: Promise) {
    FlyBuyCore.orders.rateOrder(orderId = orderId, rating = rating, comments = comments) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  @ReactMethod
  fun updateOrderCustomerState(orderId: Int, state: String, promise: Promise) {
    FlyBuyCore.orders.updateCustomerState(orderId, state) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }

  // Pickup

  @ReactMethod
  fun pickupConfigure(promise: Promise) {
    PickupManager.getInstance()?.configure(reactApplicationContext.baseContext)
  }

  @ReactMethod
  fun onLocationPermissionChanged() {
    PickupManager.getInstance().onLocationPermissionChanged()
  }

  // Notify

  @ReactMethod
  fun notifyConfigure(promise: Promise) {
    NotifyManager.getInstance()?.configure(reactApplicationContext.baseContext)
  }

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
  fun createForSites(sitesList: ReadableArray, notification: ReadableMap, promise: Promise) {
    val sites = decodeSites(sitesList)
    val notificationInfo: NotificationInfo = decodeNotification(notification)

    NotifyManager.getInstance().createForSites(
      sites = sites,
      notificationInfo = notificationInfo
    ) { sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve("ok")
      }
    }

  }

  @ReactMethod
  fun clearNotifications(promise: Promise) {
    NotifyManager.getInstance().clear() { sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve("ok")
      }
    }
  }

// Sites

  @ReactMethod
  fun fetchAllSites(promise: Promise) {
    FlyBuyCore.sites.fetchAll { sites, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        promise.resolve(sites?.let { parseSites(it) })
      }

    }
  }

  @ReactMethod
  fun fetchSitesByQuery(params: ReadableMap, promise: Promise) {
    val query = params.getString("query")
    val page = params.getInt("page")
    FlyBuyCore.sites.fetch(query, page) { sites, pagination, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        sites?.let {
          val map = Arguments.createMap()
          var sites = parseSites(it)
          if (pagination != null) {
            var pagination = parsePagination(pagination)
            map.putArray("data", sites)
            map.putMap("pagination", pagination)
            promise.resolve(map)
          } else {
            promise.reject("Fetch sites Error", "Error retrieving pagination")
          }
        } ?: run {
          promise.reject("Fetch sites Error", "Error retrieving sites")
        }

      }

    }
  }

  @ReactMethod
  fun fetchSitesByRegion(params: ReadableMap, promise: Promise) {
    val per = params.getInt("per")
    val page = params.getInt("page")
    val regionInfo = params.getMap("region")!!
    val region: CircularRegion = decodeRegion(regionInfo)

    FlyBuyCore.sites.fetch(region, page, per) { sites, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        sites?.let {
          promise.resolve(parseSites(sites))
        } ?: run {
          promise.reject("Fetch sites Error", "Error retrieving sites")
        }

      }

    }
  }

  // Presence

  @ReactMethod
  fun presenceConfigure(presenceUUID: String) {
    val uid = UUID.fromString(presenceUUID)
    PresenceManager.getInstance()?.configure(reactApplicationContext.baseContext, uid)
  }

  @ReactMethod
  fun createLocatorWithIdentifier(byte_presenceId: String, payload: String, promise: Promise) {
    var presenceId = byte_presenceId.toByteArray()
    PresenceManager.getInstance()?.createLocatorWithIdentifier(presenceId, payload) { presenceLocator, sdkError ->
      sdkError?.let {
        // Handle error
        promise.reject(it.userError(), it.userError())
      }
      presenceLocator?.let {

        //  promise.resolve(presenceLocator.refere)
        // Set locator listener
        // it.listener = locatorListener
        // Store locator or start it here
        startLocator(presenceLocator)
      }
    }
  }

  @ReactMethod
  fun startLocator(presenceLocator: PresenceLocator) {
    PresenceManager.getInstance()?.start(presenceLocator)
  }

  @ReactMethod
  fun startLocatorWithIdentifier(byte_presenceId: String, payload: String, promise: Promise) {
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
        promise.resolve("Locator started successfully")
      }
    }
  }

  @ReactMethod
  fun stopLocator(promise: Promise) {
    try {
      PresenceManager.getInstance()?.stop()
      promise.resolve("Locator is stopped successfully.")
    } catch (e: ExecutionException) {
      promise.reject(e.message)
    }
  }


}

fun parsePagination(pagination: Pagination): WritableMap {
  val map = Arguments.createMap()
  map.putInt("currentPage", pagination.currentPage)
  map.putInt("totalPages", pagination.totalPages)
  return map
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

fun decodeSites(sitesList: ReadableArray): List<Site> {
  var list = listOf<Site>()
  for (i in 0 until sitesList.size()) {
    var site = sitesList.getMap(i)!!
    list += decodeSite(site)
  }

  return list
}

fun decodeSite(site: ReadableMap): Site {
  var name: String? = null
  var phone: String? = null
  var streetAddress: String? = null
  var fullAddress: String? = null
  var locality: String? = null
  var region: String? = null
  var country: String? = null
  var postalCode: String? = null
  var latitude: String? = null
  var longitude: String? = null
  var coverPhotoUrl: String? = null
  var iconUrl: String? = null
  var instructions: String? = null
  var description: String? = null
  var partnerIdentifier: String? = null

  var id = site.getInt("id")!!

  if (site.hasKey("name")) {
    name = site.getString("name")
  }

  if (site.hasKey("phone")) {
    phone = site.getString("phone")
  }

  if (site.hasKey("streetAddress")) {
    streetAddress = site.getString("streetAddress")
  }

  if (site.hasKey("fullAddress")) {
    fullAddress = site.getString("fullAddress")
  }

  if (site.hasKey("locality")) {
    locality = site.getString("locality")
  }

  if (site.hasKey("region")) {
    region = site.getString("region")
  }

  if (site.hasKey("country")) {
    country = site.getString("country")
  }

  if (site.hasKey("postalCode")) {
    postalCode = site.getString("postalCode")
  }

  if (site.hasKey("latitude")) {
    latitude = site.getString("latitude")
  }

  if (site.hasKey("longitude")) {
    longitude = site.getString("longitude")
  }

  if (site.hasKey("iconUrl")) {
    iconUrl = site.getString("iconUrl")
  }

  if (site.hasKey("instructions")) {
    instructions = site.getString("instructions")
  }

  if (site.hasKey("description")) {
    description = site.getString("description")
  }

  if (site.hasKey("partnerIdentifier")) {
    partnerIdentifier = site.getString("partnerIdentifier")
  }

  return Site(
    id = id,
    name = name,
    phone = phone,
    streetAddress = streetAddress,
    fullAddress = fullAddress,
    locality = locality,
    region = region,
    country = country,
    postalCode = postalCode,
    latitude = latitude,
    longitude = longitude,
    coverPhotoUrl = coverPhotoUrl,
    iconUrl = iconUrl,
    instructions = instructions,
    description = description,
    partnerIdentifier = partnerIdentifier
  )
}

fun decodePickupWindow(pickupWindow: ReadableMap): PickupWindow {
  val instantStart = Instant.parse(pickupWindow.getString("start")!!)
  val instantEnd = Instant.parse(pickupWindow.getString("end")!!)
  return PickupWindow(
    start = instantStart,
    end = instantEnd
  )
}

