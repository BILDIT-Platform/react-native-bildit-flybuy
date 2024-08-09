package com.bilditplatform.rnflybuycore

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap

abstract class RnFlybuyCoreSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  // Notification related function
  abstract fun configure(token: String, promise: Promise)
  abstract fun updatePushToken(token: String)
  abstract fun handleRemoteNotification(data: ReadableMap)

  // Customer related functions
  abstract fun login(email: String, password: String, promise: Promise)
  abstract fun loginWithToken(token: String, promise: Promise)
  abstract fun logout(promise: Promise)
  abstract fun signUp(email: String, password: String, promise: Promise)
  abstract fun createCustomer(customer: ReadableMap, promise: Promise)
  abstract fun updateCustomer(customer: ReadableMap, promise: Promise)
  abstract fun getCurrentCustomer(promise: Promise)

  // Sites related functions
  abstract fun fetchAllSites(promise: Promise)
  abstract fun fetchSitesByQuery(params: ReadableMap, promise: Promise)
  abstract fun fetchSitesByRegion(params: ReadableMap, promise: Promise)
  abstract fun fetchSiteByPartnerIdentifier(params: ReadableMap, promise: Promise)

  // Orders related functions
  abstract fun fetchOrders(promise: Promise)
  abstract fun claimOrder(
    redeemCode: String,
    customer: ReadableMap,
    pickupType: String? = null,
    promise: Promise
  )
  abstract fun fetchOrderByRedemptionCode(redeemCode: String, promise: Promise)
  abstract fun createOrder(
    siteID: Int,
    pid: String,
    customer: ReadableMap,
    pickupWindow: ReadableMap? = null,
    orderState: String? = null,
    pickupType: String? = null,
    promise: Promise
  )
  abstract fun createOrderWithPartnerIdentifier(
    sitePartnerIdentifier: String,
    orderPid: String,
    customer: ReadableMap,
    pickupWindow: ReadableMap? = null,
    orderState: String? = null,
    pickupType: String? = null,
    promise: Promise
  )
  abstract fun updateOrderState(orderId: Int, state: String, promise: Promise)
  abstract fun rateOrder(orderId: Int, rating: Int, comments: String, promise: Promise)
  abstract fun updateOrderCustomerState(orderId: Int, state: String, promise: Promise)
  abstract fun updateOrderCustomerStateWithSpot(orderId: Int, state: String, spot: String, promise: Promise)
}
