# Android 35 Support and SDK 2.15.x Upgrade

This document outlines the changes made to support Android 35 (API level 35) and upgrade to FlyBuy SDK 2.15.x in the development app.

## Overview

The upgrade to Android 35 required several key changes to maintain compatibility with modern Android development practices and security requirements.

## SDK Version Updates

### Build Configuration Changes

**File:** `development-app/android/build.gradle`

- Updated `compileSdkVersion` from 34 to 35
- Updated `targetSdkVersion` from 34 to 35  
- Updated `flybuyVersion` from "2.14.3" to "2.15.0"

```gradle
ext {
    buildToolsVersion = "34.0.0"
    minSdkVersion = 26
    compileSdkVersion = 35        // Updated from 34
    targetSdkVersion = 35         // Updated from 34
    ndkVersion = "26.1.10909125"
    kotlinVersion = "1.9.22"
    flybuyVersion = "2.15.0"      // Updated from "2.14.3"
}
```

## Build Optimizations

### App Build Configuration

**File:** `development-app/android/app/build.gradle`

Added several optimizations and compatibility features:

1. **Vector Drawable Support**
   ```gradle
   // Support for vector drawables in older API levels
   vectorDrawables.useSupportLibrary = true
   ```

2. **Java 17 Compatibility**
   ```gradle
   compileOptions {
       sourceCompatibility JavaVersion.VERSION_17
       targetCompatibility JavaVersion.VERSION_17
       coreLibraryDesugaringEnabled true
   }
   
   kotlinOptions {
       jvmTarget = '17'
   }
   ```

3. **R8 Optimizations for Release Builds**
   ```gradle
   buildTypes {
       release {
           // Enable R8 optimizations
           shrinkResources enableProguardInReleaseBuilds
       }
   }
   ```

4. **Packaging Optimizations**
   ```gradle
   packagingOptions {
       pickFirst '**/libc++_shared.so'
       pickFirst '**/libjsc.so'
   }
   ```

5. **Core Library Desugaring**
   ```gradle
   dependencies {
       // Core library desugaring for Java 8+ language features
       coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.0.4'
   }
   ```

### Gradle Properties

**File:** `development-app/android/gradle.properties`

Added performance and optimization flags:

```properties
# Enable R8 full mode for better optimization with target SDK 35
android.enableR8.fullMode=true

# Enable support for the new resource processing in Android Gradle Plugin
android.enableResourceOptimizations=true
```

## Security and Privacy Enhancements (Optional)

### Android Manifest Updates

**File:** `development-app/android/app/src/main/AndroidManifest.xml`

1. **Updated Permissions for Android 12+ (API 31+)**
   ```xml
   <!-- Notification permission for Android 13+ (API 33+) -->
   <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
   
   <!-- Foreground service permission for Android 14+ (API 34+) -->
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
   
   <!-- For Android 12+ (API 31+) Bluetooth permissions -->
   <uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" />
   <uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
   <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
   ```

2. **Data Backup and Extraction Rules**
   ```xml
   <application
       android:dataExtractionRules="@xml/data_extraction_rules"
       android:fullBackupContent="@xml/backup_rules"
       tools:replace="android:dataExtractionRules,android:fullBackupContent">
   ```

### Backup Rules Configuration (Optional)

**File:** `development-app/android/app/src/main/res/xml/backup_rules.xml` (New)

```xml
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    <!-- Exclude sensitive data from backup -->
    <exclude domain="sharedpref" path="FlybuyPrefs" />
    <exclude domain="database" path="flybuy.db" />
</full-backup-content>
```

**File:** `development-app/android/app/src/main/res/xml/data_extraction_rules.xml` (New)

```xml
<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
    <cloud-backup>
        <!-- Exclude sensitive data from cloud backup -->
        <exclude domain="sharedpref" path="FlybuyPrefs" />
        <exclude domain="database" path="flybuy.db" />
    </cloud-backup>
    <device-transfer>
        <!-- Allow all data for device transfer -->
        <include domain="file" path="." />
        <exclude domain="sharedpref" path="FlybuyPrefs" />
    </device-transfer>
</data-extraction-rules>
```

## ProGuard/R8 Optimizations (Optional)

**File:** `development-app/android/app/proguard-rules.pro`

Added comprehensive rules for Android 35 compatibility:

1. **FlyBuy SDK Protection**
   ```proguard
   # Keep Flybuy SDK classes
   -keep class com.radiusnetworks.flybuy.** { *; }
   -dontwarn com.radiusnetworks.flybuy.**
   ```

2. **React Native Bridge Methods**
   ```proguard
   # Keep native method names for React Native bridges
   -keepclassmembers class * {
       @com.facebook.react.bridge.ReactMethod <methods>;
   }
   ```

3. **Android 14+ Compatibility**
   ```proguard
   # Keep location and notification related classes for Android 14+ compatibility
   -keep class androidx.core.app.NotificationCompat** { *; }
   -keep class androidx.work.** { *; }
   ```

## Key Android 35 Compliance Features

### 1. Permission Management
- Added granular foreground service permissions required by Android 14+
- Updated Bluetooth permissions for Android 12+ compatibility
- Added notification permissions for Android 13+

### 2. Security Enhancements
- Implemented data extraction rules to protect sensitive FlyBuy data
- Added backup rules to exclude sensitive preferences and databases
- Enabled R8 full mode for better code optimization and security

### 3. Performance Optimizations
- Java 17 compatibility for modern language features
- Core library desugaring for backward compatibility
- Resource optimization flags for build performance

### 4. Build System Updates
- Updated to latest SDK versions (35)
- FlyBuy SDK updated to 2.15.0
- Enhanced ProGuard rules for better optimization

## Migration Impact

### For Developers
- No code changes required in React Native JavaScript layer
- Android native modules automatically benefit from improved security
- Build times may improve due to R8 optimizations

### For End Users
- Enhanced security with proper data backup exclusions
- Better performance through optimized builds
- Compliance with latest Android privacy requirements

## Testing Notes

### Compatibility Verified
- Android 35 (API level 35) builds successfully
- All FlyBuy SDK features work correctly
- ProGuard rules don't break functionality
- Permissions properly requested at runtime

### Build Verification
- Clean builds complete without errors
- R8 optimizations work correctly
- All dependencies resolve properly
