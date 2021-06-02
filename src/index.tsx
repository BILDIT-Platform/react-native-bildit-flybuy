import { NativeModules } from 'react-native';

// type FlybuyType = {
//   fetchOrders(): Promise<any>;
//   createForSitesInRegion(region: CircularRegion): Promise<any>;
// };

type CircularRegion = {
  latitude: number;
  longitude: number;
  radius: number;
};

type NotificationInfo = {
  title: string;
  message: string;
  data: any;
};

const { Flybuy } = NativeModules;

// export default Flybuy as FlybuyType;

export default {
  Notify: {
    createForSitesInRegion: (
      region: CircularRegion,
      notification: NotificationInfo
    ): Promise<any> => Flybuy.createForSitesInRegion(region, notification),
  },
  Orders: {
    fetchOrders: (): Promise<any> => Flybuy.fetchOrders(),
  },
};
