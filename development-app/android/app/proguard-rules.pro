# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep Flybuy SDK classes
-keep class com.radiusnetworks.flybuy.** { *; }
-dontwarn com.radiusnetworks.flybuy.**

# Keep React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

# Keep Kotlin
-keep class kotlin.** { *; }
-dontwarn kotlin.**

# Keep location and notification related classes for Android 14+ compatibility
-keep class androidx.core.app.NotificationCompat** { *; }
-keep class androidx.work.** { *; }

# Keep native method names for React Native bridges
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
}

# React Native networking
-keep class com.facebook.react.modules.network.** { *; }

# General Android optimizations for target SDK 35
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes EnclosingMethod
-keepattributes InnerClasses
