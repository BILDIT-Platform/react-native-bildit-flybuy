package com.bilditplatform.rnflybuycore

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap

abstract class RnFlybuyCoreSpec internal constructor(context: ReactApplicationContext) :
  NativeRnFlybuyCoreSpec(context) {

  // Configure (not in TS spec; used by native implementation)
  abstract fun configure(token: String, promise: Promise)

  // Deeplinks related functions
  override abstract fun parseReferrerUrl(referrerUrl: String, promise: Promise)

  // Notification related function
  override abstract fun updatePushToken(token: String)
  override abstract fun handleRemoteNotification(data: ReadableMap)

  // Customer related functions
  override abstract fun login(email: String, password: String, promise: Promise)
  override abstract fun loginWithToken(token: String, promise: Promise)
  override abstract fun logout(promise: Promise)
  override abstract fun signUp(email: String, password: String, promise: Promise)
  override abstract fun createCustomer(customer: ReadableMap, promise: Promise)
  override abstract fun updateCustomer(customer: ReadableMap, promise: Promise)
  override abstract fun getCurrentCustomer(promise: Promise)

  // Sites related functions
  override abstract fun fetchAllSites(promise: Promise)
  override abstract fun fetchSitesByQuery(params: ReadableMap, promise: Promise)
  override abstract fun fetchSitesByRegion(params: ReadableMap, promise: Promise)
  override abstract fun fetchSiteByPartnerIdentifier(params: ReadableMap, promise: Promise)
  override abstract fun fetchSitesNearPlace(place: ReadableMap, distance: Double, promise: Promise)

  // Places related functions
  override abstract fun placesSuggest(keyword: String, options: ReadableMap, promise: Promise)
  override abstract fun placesRetrieve(place: ReadableMap, promise: Promise)

  // Orders related functions
  override abstract fun fetchOrders(promise: Promise)
  override abstract fun claimOrder(
    redeemCode: String,
    customer: ReadableMap,
    pickupType: String?,
    promise: Promise
  )
  override abstract fun fetchOrderByRedemptionCode(redeemCode: String, promise: Promise)
  override abstract fun createOrder(customer: ReadableMap, promise: Promise)
  override abstract fun updateOrderState(orderId: Double, state: String, promise: Promise)
  override abstract fun rateOrder(orderId: Double, rating: Double, comments: String, promise: Promise)
  override abstract fun updateOrderCustomerState(orderId: Double, state: String, promise: Promise)
  override abstract fun updateOrderCustomerStateWithSpot(orderId: Double, state: String, spot: String, promise: Promise)
  override abstract fun updatePickupMethod(orderId: Double, options: ReadableMap, promise: Promise)
}
