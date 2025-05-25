package com.bilditplatform.rnflybuycore

import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.FlyBuyLinks
import com.radiusnetworks.flybuy.sdk.data.common.SdkError
import com.radiusnetworks.flybuy.sdk.data.customer.CustomerInfo
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion
import com.radiusnetworks.flybuy.sdk.data.places.PlaceType
import com.radiusnetworks.flybuy.sdk.data.room.domain.Order
import com.radiusnetworks.flybuy.sdk.data.room.domain.Site
import com.radiusnetworks.flybuy.sdk.exceptions.FlyBuyRuntimeException
import com.radiusnetworks.flybuy.sdk.manager.builder.PlaceSuggestionOptions


object ConfiguredFeatures {
  var core = false;
}

class RnFlybuyCoreModule internal constructor(context: ReactApplicationContext) :
  RnFlybuyCoreSpec(context) {

  val TAG = "FlyBuy Core Wrapper"

  private var listenerCount = 0

  companion object {
    const val NAME = "RnFlybuyCore"
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun startObserver() {
    val orderObserver = Observer<List<Order>> {
      orderProgress(it)
    }

    Handler(Looper.getMainLooper()).post {
      FlyBuyCore.orders.openLiveData.observeForever(orderObserver)
    }
  }

  private fun orderProgress(orders: List<Order>) {
    orders.forEach { order ->
      reactApplicationContext
        .getJSModule(RCTDeviceEventEmitter::class.java)
        .emit("orderUpdated", parseOrder(order))
    }
  }

  @ReactMethod
  override fun stopObserver() {
    (currentActivity as AppCompatActivity?)?.let {
      if (FlyBuyCore.orders.openLiveData.hasObservers()) {
        FlyBuyCore.orders.openLiveData.removeObservers(it)
      }
    }
  }


  @ReactMethod
  fun addListener(eventName: String) {
    Log.d("RNFBC", "add listener $eventName")
    // Keep: Required for RN built in Event Emitter Calls.
    if (listenerCount == 0) {
      // Set up any upstream listeners or background tasks as necessary
    }

    listenerCount += 1
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    Log.d("RNFBC", "remove listener $count")
    // Keep: Required for RN built in Event Emitter Calls.
    listenerCount -= count
    if (listenerCount == 0) {
      // Remove upstream listeners, stop unnecessary background tasks
    }
  }

  // Core functions
  @ReactMethod
  override fun parseReferrerUrl(referrerUrl: String, promise: Promise) {
    try {
      Log.d(TAG, "parseReferrerUrl input: $referrerUrl")
      val linkDetails = FlyBuyLinks.parseReferrerUrl(referrerUrl)
      Log.d(TAG, "parseReferrerUrl output: $linkDetails")
      linkDetails?.let {
        promise.resolve(parseLinkDetails(it))
      } ?: run {
        promise.reject("NULL_LINK_DETAILS", "No link details could be parsed from the referrer URL.")
      }
    } catch (e: FlyBuyRuntimeException) {
      promise.reject(e)
      e.message?.let { Log.w(TAG, it) }
    }
  }
  @ReactMethod
  override fun configure(token: String, promise: Promise) {
    // TODO: separate the configure function for New and Old Architechture
    try {
      if (ConfiguredFeatures.core) {
        return
      }
      FlyBuyCore.configure(reactApplicationContext, token)
      val currentActivity = currentActivity
      if (currentActivity != null) {
        startObserver()
      }

      promise.resolve(true);
      ConfiguredFeatures.core = true
      Log.i(TAG, "Core configured")
    } catch (e: FlyBuyRuntimeException) {
      promise.reject(e)
      e.message?.let { Log.w(TAG, it) }
    }
  }

  @ReactMethod
  override fun updatePushToken(token: String) {
    FlyBuyCore.onNewPushToken(token)
  }

  @ReactMethod
  override fun handleRemoteNotification(data: ReadableMap) {
    val dataMap: Map<String, String> = decodeData(data)
    FlyBuyCore.onMessageReceived(dataMap, null)
  }

  // Customer related functions
  @ReactMethod
  override fun login(email: String, password: String, promise: Promise) {
    FlyBuyCore.customer.login(email, password) { customer, error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject("LOGIN_ERROR", error.userError())
      } else {
        if (null != customer) {
          promise.resolve(parseCustomer(customer))
        }
      }
    }
  }

  @ReactMethod
  override fun loginWithToken(token: String, promise: Promise) {
    FlyBuyCore.customer.loginWithToken(token = token) { customer, error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject("TOKEN_LOGIN_ERROR", error.userError())
      } else {
        if (null != customer) {
          promise.resolve(parseCustomer(customer))
        }
      }
    }
  }

  @ReactMethod
  override fun logout(promise: Promise) {
    FlyBuyCore.customer.logout { error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject("LOGOUT_ERROR", error.userError())
      } else {
        promise.resolve("ok")
      }
    }
  }

  @ReactMethod
  override fun signUp(email: String, password: String, promise: Promise) {
    FlyBuyCore.customer.signUp(email, password) { customer, error ->
      if (null != error) {
        // Handle error
        handleFlyBuyError(error)
        promise.reject("SIGNUP_ERROR", error.userError())
      } else {
        if (null != customer) {
          promise.resolve(parseCustomer(customer))
        }
      }
    }
  }

  @ReactMethod
  override fun createCustomer(customer: ReadableMap, promise: Promise) {
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
  override fun updateCustomer(customer: ReadableMap, promise: Promise) {
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
  override fun getCurrentCustomer(promise: Promise) {
    val customer = FlyBuyCore.customer.current
    customer?.let {
      promise.resolve(parseCustomer(customer))
    } ?: run {
      promise.reject("Not logged in", "Current Customer null")
    }
  }


  // Sites
  @ReactMethod
  override fun fetchAllSites(promise: Promise) {
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
  override fun fetchSitesByQuery(params: ReadableMap, promise: Promise) {
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
  override fun fetchSitesByRegion(params: ReadableMap, promise: Promise) {
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

  @ReactMethod
  override fun fetchSiteByPartnerIdentifier(params: ReadableMap, promise: Promise) {
    val pid = params.getString("partnerIdentifier")!!

    FlyBuyCore.sites.fetchByPartnerIdentifier(pid) { site, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        site?.let {
          promise.resolve(parseSite(site))
        } ?: run {
          promise.reject("Fetch site by partnerIdentifier Error", "Error retrieving site")
        }

      }
    }
  }

  @ReactMethod
  override fun fetchSitesNearPlace(place: ReadableMap, distance: Float, promise: Promise) {
    val decodedPlace = decodePlace(place)

    // Define the callback function
    val callback: (List<Site>?, SdkError?) -> Unit = { sites, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        sites?.let {
          promise.resolve(parseSites(sites))
        } ?: run {
          promise.reject("Fetch sites near place Error", "Error retrieving sites")
        }

      }
    }
    FlyBuyCore.sites.fetchNear(decodedPlace, distance, null, callback)
  }



  // Places related functions
  @ReactMethod
  override fun placesSuggest(keyword: String, options: ReadableMap, promise: Promise) {

    val optionsBuilder = PlaceSuggestionOptions.Builder().apply {
      setType(PlaceType.ADDRESS)
    }

    if (options.hasKey("latitude") && options.hasKey("longitude")) {
      val latitude = options.getDouble("latitude")
      val longitude = options.getDouble("longitude")
      optionsBuilder.setProximity(latitude, longitude)
    }

    if (options.hasKey("type")) {
      val inputType = options.getInt("type")
      val type = intToPlaceTypeEnum(inputType)
      if (type != null) {
        optionsBuilder.setType(type)
      }
    }

    if (options.hasKey("countryCode")) {
      val countryCode = options.getString("countryCode")
      if (countryCode != null) {
        optionsBuilder.setCountryCode(countryCode)
      }
    }

    if (options.hasKey("countryCodes")) {
      val countryCodes = options.getArray("countryCodes")
      if (countryCodes != null && countryCodes.size() > 0) {
        optionsBuilder.setCountryCodes(readableArrayToStringList(countryCodes))
      }
    }

    if (options.hasKey("placeTypes")) {
      val placeTypes = options.getArray("placeTypes")
      if (placeTypes != null && placeTypes.size() > 0) {
        for (i in 0 until placeTypes.size()) {
          val type = placeTypes.getInt(i)
          intToPlaceTypeEnum(type)?.let { optionsBuilder.addType(it) }
        }
      }
    }


    val suggestionOptions = optionsBuilder.build()
    FlyBuyCore.places.suggest(keyword, suggestionOptions) { places, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        places?.let {
          promise.resolve(parsePlaces(places))
        } ?: run {
          promise.reject("Fetch places suggestion Error", "Error retrieving suggested places")
        }

      }
    }
  }

  @ReactMethod
  override fun placesRetrieve(place: ReadableMap, promise: Promise) {
    var decodedPlace = decodePlace(place)

    FlyBuyCore.places.retrieve(decodedPlace) { coordinate, sdkError ->
      sdkError?.let {
        handleFlyBuyError(it)
        promise.reject(it.userError(), it.userError())
      } ?: run {
        if (coordinate != null) {
          promise.resolve(parsePlaceLocation(coordinate))
        } else {
          promise.reject("Fetch place location Error", "Error retrieving place location")
        }
      }
    }
  }

  // Orders related functions
  @ReactMethod
  override fun fetchOrders(promise: Promise) {
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
  override fun claimOrder(
    redeemCode: String,
    customer: ReadableMap,
    pickupType: String?,
    promise: Promise
  ) {
    FlyBuyCore.orders.claim(
      redeemCode,
      decodeCustomerInfo(customer),
      pickupType
    ) { order, sdkError ->
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
  override fun fetchOrderByRedemptionCode(redeemCode: String, promise: Promise) {
    FlyBuyCore.orders.fetch(redeemCode) { order, sdkError ->
      if (null != sdkError) {
        promise.reject(sdkError.userError(), sdkError.userError())
      } else {
        promise.resolve(order?.let { parseOrder(it) })
      }
    }
  }

  @RequiresApi(Build.VERSION_CODES.O)
  @ReactMethod
  override fun createOrder(
    siteID: Int,
    pid: String,
    customer: ReadableMap,
    pickupWindow: ReadableMap?,
    orderState: String?,
    pickupType: String?,
    promise: Promise
  ) {
    val customerInfo: CustomerInfo = decodeCustomerInfo(customer)
    val pickupWindowInfo = pickupWindow?.let { decodePickupWindow(it) }

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

  @RequiresApi(Build.VERSION_CODES.O)
  @ReactMethod
  override fun createOrderWithPartnerIdentifier(
    sitePid: String,
    orderPid: String,
    customer: ReadableMap,
    pickupWindow: ReadableMap?,
    orderState: String?,
    pickupType: String?,
    promise: Promise
  ) {
    val customerInfo: CustomerInfo = decodeCustomerInfo(customer)
    val pickupWindowInfo = pickupWindow?.let { decodePickupWindow(it) }

    FlyBuyCore.orders.create(
      sitePartnerIdentifier = sitePid,
      orderPartnerIdentifier = orderPid,
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
  override fun updateOrderState(orderId: Int, state: String, promise: Promise) {
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
  override fun rateOrder(orderId: Int, rating: Int, comments: String, promise: Promise) {
    FlyBuyCore.orders.rateOrder(
      orderId = orderId,
      rating = rating,
      comments = comments
    ) { order, sdkError ->
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
  override fun updateOrderCustomerState(orderId: Int, state: String, promise: Promise) {
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

  @ReactMethod
  override fun updateOrderCustomerStateWithSpot(orderId: Int, state: String, spot: String, promise: Promise) {
    FlyBuyCore.orders.updateCustomerState(orderId, state, spot) { order, sdkError ->
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
  override fun updatePickupMethod(orderId: Int, options: ReadableMap, promise: Promise) {

    val optionsBuilder = decodePickupMethodOptions(options)

    FlyBuyCore.orders.updatePickupMethod(orderId, optionsBuilder) { order, sdkError ->
      sdkError?.let {
        promise.reject(it.userError(), it.userError())
      } ?: run {
        order?.let { promise.resolve(parseOrder(it)) } ?: run {
          promise.reject("null", "Null order")
        }
      }
    }
  }
}




