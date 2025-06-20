package com.bilditplatform.rnflybuycore

import android.annotation.SuppressLint
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableMapKeySetIterator
import com.facebook.react.bridge.ReadableType
import com.radiusnetworks.flybuy.sdk.data.customer.CustomerInfo
import com.radiusnetworks.flybuy.sdk.data.location.CircularRegion
import com.radiusnetworks.flybuy.sdk.data.places.Place
import com.radiusnetworks.flybuy.sdk.data.places.PlaceType
import com.radiusnetworks.flybuy.sdk.data.room.domain.PickupWindow
import com.radiusnetworks.flybuy.sdk.data.room.domain.Site
import com.radiusnetworks.flybuy.sdk.manager.builder.OrderOptions
import com.radiusnetworks.flybuy.sdk.manager.builder.PickupMethodOptions
import java.time.Instant


fun decodeData(data: ReadableMap): Map<String, String> {
  var dataMap = mapOf<String, String>()
  val iterator: ReadableMapKeySetIterator = data.keySetIterator()
  while (iterator.hasNextKey()) {
    val key = iterator.nextKey()
    val type: ReadableType = data.getType(key)
    when (type) {
      ReadableType.String -> dataMap += Pair(key, data.getString(key)!!)
      else -> throw IllegalArgumentException("Could not convert object with key: $key.")
    }
  }
  return dataMap
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

fun decodePickupMethodOptions(options: ReadableMap): PickupMethodOptions {
  var pickupType = "pickup"

  if (options.hasKey("pickupType")) {
    pickupType = options.getString("pickupType")!!
  }

  return PickupMethodOptions.Builder(pickupType).apply {
    if (options.hasKey("customerCarColor")) {
      setCustomerCarColor(options.getString("customerCarColor"))
    }
    if (options.hasKey("customerCarType")) {
      setCustomerCarType(options.getString("customerCarType"))
    }
    if (options.hasKey("customerLicensePlate")) {
      setCustomerLicensePlate(options.getString("customerLicensePlate"))
    }
    if (options.hasKey("handoffVehicleLocation")) {
      setHandoffVehicleLocation(options.getString("handoffVehicleLocation"))
    }

  }.build()

}

fun decodeOrderOptions(options: ReadableMap): OrderOptions {
  var customerName = ""

  if (options.hasKey("customerName")) {
    customerName = options.getString("customerName")!!
  }

  return OrderOptions.Builder(customerName).apply {
    if (options.hasKey("customerCarType")) {
      setCustomerCarType(options.getString("customerCarType"))
    }
    if (options.hasKey("partnerIdentifierForCrew")) {
      setPartnerIdentifierForCrew(options.getString("partnerIdentifierForCrew"))
    }
    if (options.hasKey("partnerIdentifierForCustomer")) {
      setPartnerIdentifierForCustomer(options.getString("partnerIdentifierForCustomer"))
    }
    if (options.hasKey("handoffVehicleLocation")) {
      setHandoffVehicleLocation(options.getString("handoffVehicleLocation"))
    }
    if (options.hasKey("disableOrderFire")) {
      setDisableOrderFire(options.getBoolean("disableOrderFire"))
    }
    if (options.hasKey("disablePromiseTimeScheduling")) {
      setDisablePromiseTimeScheduling(options.getBoolean("disablePromiseTimeScheduling"))
    }
    if (options.hasKey("orderFireMakeIntervalSeconds")) {
      setOrderFireMakeIntervalSeconds(options.getInt("orderFireMakeIntervalSeconds"))
    }

  }.build()
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

fun decodePlace(place: ReadableMap): Place {
  val id = place.getString("id")!!
  var name = place.getString("name")!!
  var placeFormatted = place.getString("placeFormatted")!!
  var distance: Double? = null
  var address: String? = null

  if (place.hasKey("distance")) {
    distance = place.getDouble("distance")
  }

  if (place.hasKey("address")) {
    address = place.getString("address")
  }

  return Place(
    id = id,
    name = name,
    placeFormatted = placeFormatted,
    address = address,
    distance = distance,
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

fun mapStringToPlaceType(value: String): PlaceType {
  return when (value) {
    "region" -> PlaceType.REGION
    "postalCode" -> PlaceType.POSTAL_CODE
    "city" -> PlaceType.CITY
    "poi" -> PlaceType.POI
    else -> PlaceType.ADDRESS
  }
}

@SuppressLint("RestrictedApi")
fun decodeSite(site: ReadableMap): Site {
  var type: String? = null
  var displayName: String? = null
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
  var operationalStatus: String? = null
  var pickupConfigId: Int? = null


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

  if (site.hasKey("type")) {
    type = site.getString("type")
  }

  if (site.hasKey("partnerIdentifier")) {
    partnerIdentifier = site.getString("partnerIdentifier")
  }

  if (site.hasKey("operationalStatus")) {
    operationalStatus = site.getString("operationalStatus")
  }

  if (site.hasKey("pickupConfigId")) {
    pickupConfigId = site.getInt("pickupConfigId")
  }

  var site = com.radiusnetworks.flybuy.api.model.Site(
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
    coverPhotoURL = coverPhotoUrl,
    projectLogoURL = iconUrl,
    instructions = instructions,
    description = description,
    partnerIdentifier = partnerIdentifier,
    type = type,
    displayName = displayName,
    operationalStatus = operationalStatus,
    pickupConfigId = pickupConfigId,
    // TODO: Map this value from API response
    projectAccentColor = null,
    geofence = null,
    prearrivalSeconds = null,
    projectAccentTextColor = null,
    wrongSiteArrivalRadius = null,

    )

  var pickupConfig = null

  return Site(
    site,
    pickupConfig
  )
}
@RequiresApi(Build.VERSION_CODES.O)
fun decodePickupWindow(pickupWindow: ReadableMap): PickupWindow {
  val instantStart = Instant.parse(pickupWindow.getString("start")!!)
  val instantEnd = Instant.parse(pickupWindow.getString("end")!!)
  return PickupWindow(
    start = instantStart,
    end = instantEnd
  )
}

