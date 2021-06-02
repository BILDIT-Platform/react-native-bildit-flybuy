import { NativeModules } from 'react-native';

// type CircularRegion = {
//   latitude: number;
//   longitude: number;
//   radius: number;
// };

// type NotificationInfo = {
//   title: string;
//   message: string;
//   data: any;
// };
export interface Order {
  id: number;
  state: string;
  customerState: string;
  partnerIdentifier?: string;
  pickupWindow?: [string];
  pickupType?: string;
  etaAt?: string;
  redeemedAt?: string;
  redemptionCode?: string;
  customerRating?: string;
  customerComment?: string;

  siteID: number;
  siteName?: string;
  sitePhone?: string;
  siteFullAddress?: string;
  siteLongitude?: string;
  siteLatitude?: string;
  siteInstructions?: string;
  siteDescription?: string;
  siteCoverPhotoURL?: string;

  customerID?: string;
  customerName?: string;
  customerCarType?: string;
  customerCarColor?: string;
  customerLicensePlate?: string;
}

export interface Customer {
  name: string;
  carType: string;
  carColor: string;
  licensePlate: string;
  phone?: string;
}

const { Flybuy } = NativeModules;

type FlybuyType = {
  configure(token: string): void;
  login(code: string): Promise<any>;
  fetchOrders(): Promise<[Order]>;
  createOrder(
    siteId: number,
    pid: string,
    customerInfo: Customer
  ): Promise<Order>;
  createCustomer(customerInfo: Customer): Promise<Customer>;
  updateCustomer(customerInfo: Customer): Promise<Customer>;
  getCurrentCustomer(): Promise<Customer>;
};
export default Flybuy as FlybuyType;

// export default Flybuy as FlybuyType;

// export default {
//   configure: (token: string): void => Flybuy.configure() ,
//   Notify: {
//     createForSitesInRegion: (
//       region: CircularRegion,
//       notification: NotificationInfo
//     ): Promise<any> => Flybuy.createForSitesInRegion(region, notification),
//   },
//   Customer: {
//     loginWithToken: (token: String): Promise<any> =>
//       Flybuy.loginWithToken(token),
//   },
//   Orders: {
//     fetchOrders: (): Promise<any> => Flybuy.fetchOrders(),
//     createOrder: (): Promise<any> => Flybuy.createOrder(),
//   },
// };
