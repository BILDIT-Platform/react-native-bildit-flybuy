package com.example

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.radiusnetworks.flybuy.sdk.ConfigOptions
import com.radiusnetworks.flybuy.sdk.FlyBuyCore
import com.radiusnetworks.flybuy.sdk.livestatus.LiveStatusManager
import com.radiusnetworks.flybuy.sdk.notify.NotifyManager
import com.radiusnetworks.flybuy.sdk.pickup.PickupManager
import com.radiusnetworks.flybuy.sdk.presence.PresenceManager
import java.util.UUID


class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }

    // Native configure
    val configOptions = ConfigOptions.Builder(BuildConfig.ANDROID_APP_TOKEN)
      .build()
    FlyBuyCore.configure(this, configOptions)

    // Native configuration for FlyBuy Pickup
    PickupManager.getInstance().configure(applicationContext)

    // Native configuration for FlyBuy Presence
    val uid = UUID.fromString(BuildConfig.PRESENCE_UUID)
    PresenceManager.getInstance().configure(applicationContext, uid)

    // Native configuration for FlyBuy Notify
    NotifyManager.getInstance().configure(applicationContext)

    // Native Configuration for FlyBuy LiveStatus
    LiveStatusManager.getInstance().configure(applicationContext)
  }
}
