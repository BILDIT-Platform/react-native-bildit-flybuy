package com.bilditplatform.rnflybuycore

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.radiusnetworks.flybuy.sdk.data.common.Pagination
import com.radiusnetworks.flybuy.sdk.data.pickup_config.PickupConfig
import com.radiusnetworks.flybuy.sdk.data.pickup_config.PickupTypeConfig
import com.radiusnetworks.flybuy.sdk.data.room.domain.Customer
import com.radiusnetworks.flybuy.sdk.data.room.domain.Order
import com.radiusnetworks.flybuy.sdk.data.room.domain.Site

fun parseOrder(order: Order): WritableMap {
  val map = Arguments.createMap()
  map.putInt("id", order.id)
  map.putString("state", order.state)
  map.putString("customerState", order.customerState)
  map.putString("partnerIdentifier", order.partnerIdentifier)
  map.putString("partnerIdentifierForCustomer", order.partnerIdentifierForCustomer)
  map.putString("partnerIdentifierForCrew", order.partnerIdentifierForCrew)
  val pickupWindow = Arguments.createArray()
  pickupWindow.pushString(order.pickupWindow?.start.toString())
  pickupWindow.pushString(order.pickupWindow?.end.toString())
  map.putArray("pickupWindow", pickupWindow)
  map.putString("pickupType", order.pickupType)
  map.putString("etaAt", order.etaAt?.toString())
  map.putString("createdAt", order.createdAt?.toString())
  map.putString("redemptionCode", order.redemptionCode)
  map.putString("redeemedAt", order.redeemedAt.toString())
  order.customerRatingValue?.let { map.putInt("customerRating", it) }
  map.putString("customerComment", order.customerRatingComments)
  map.putInt("siteID", order.site?.id!!)
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
  map.putString("spotIdentifier", order.spotIdentifier)
  map.putBoolean("spotIdentifierEntryEnabled", order.spotIdentifierEntryEnabled)
  map.putString("spotIdentifierInputType", order.spotIdentifierInputType.toString())

  return map
}


fun parseSites(items: List<Site>): WritableArray {
  val array = WritableNativeArray()
  for (item in items) {
    array.pushMap(parseSite(item))
  }
  return array
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


fun parsePickupConfig(pickupConfig: PickupConfig): WritableMap {
  val map = Arguments.createMap()
  map.putString("accentColor", pickupConfig.projectAccentColor)
  map.putString("accentTextColor", pickupConfig.projectAccentTextColor)
  map.putString("askToAskImageURL", pickupConfig.askToAskImageUrl)
  map.putBoolean("customerNameEditingEnabled", pickupConfig.customerNameEditingEnabled)
  map.putInt("id", pickupConfig.id)
  map.putBoolean("pickupTypeSelectionEnabled", pickupConfig.pickupTypeSelectionEnabled)
  map.putString("privacyPolicyURL", pickupConfig.privacyPolicyUrl)
  map.putString("termsOfServiceURL", pickupConfig.termsOfServiceUrl)
  map.putString("type", pickupConfig.type)
  map.putArray("availablePickupTypes", parsePickupTypeConfigs(pickupConfig.availablePickupTypes))
  return map
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
  map.putMap("pickupConfig", parsePickupConfig(site.pickupConfig))

  return map
}


fun parsePickupTypeConfig(pickupTypeConfig: PickupTypeConfig): WritableMap {
  val map = Arguments.createMap()
  map.putString("pickupType", pickupTypeConfig.pickupType)
  map.putString("pickupTypeLocalizedString", pickupTypeConfig.pickupTypeLocalizedString)
  map.putBoolean("requireVehicleInfo", pickupTypeConfig.requireVehicleInfo)
  map.putBoolean("showVehicleInfoFields", pickupTypeConfig.showVehicleInfoFields)

  return map
}

fun parsePickupTypeConfigs(items: List<PickupTypeConfig>): WritableArray {
  val array = WritableNativeArray()
  for (item in items) {
    array.pushMap(parsePickupTypeConfig(item))
  }
  return array
}

fun parsePagination(pagination: Pagination): WritableMap {
  val map = Arguments.createMap()
  map.putInt("currentPage", pagination.currentPage)
  map.putInt("totalPages", pagination.totalPages)
  return map
}

fun parseOrders(items: List<Order>): WritableArray {
  val array = WritableNativeArray()
  for (item in items) {
    array.pushMap(parseOrder(item))
  }
  return array
}
