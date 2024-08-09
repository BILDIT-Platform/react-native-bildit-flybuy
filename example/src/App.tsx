import React from 'react';
import {Platform, SafeAreaView, ScrollView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CustomerSection} from './CustomerSection';
import {SitesSection} from './SitesSection';
import {OrdersSection} from './OrdersSection';
import {PickupSection} from './PickupSection';
import {PresenceSection} from './PresenceSection';
import {
  Permission,
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import {NotifySection} from './NotifySection';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    getNotificationPermission();
    getLocationPermissions();
  }, []);

  const getLocationPermissions = async () => {
    const locationPermissions = Platform.select({
      android: [
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ],
      ios: [
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ],
    }) as Permission[];
    const results = await requestMultiple(locationPermissions);
    return Platform.select({
      android: [
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ].every(permission => results[permission] === RESULTS.GRANTED),
      ios: [
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ].every(permission => results[permission] === RESULTS.GRANTED),
    });
  };

  const getNotificationPermission = () => {
    requestNotifications(['alert', 'sound', 'badge']).then(
      ({status, settings}) => {
        console.log(status, settings);
      },
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <CustomerSection />
        <SitesSection />
        <OrdersSection />
        <PickupSection />
        <PresenceSection />
        <NotifySection />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
