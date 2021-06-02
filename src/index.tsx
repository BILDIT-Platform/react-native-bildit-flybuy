import { NativeModules } from 'react-native';

export interface CircularRegion {
  latitude: number;
  longitude: number;
  radius: number;
}

export interface NotificationInfo {
  title: string;
  message: string;
  data: any;
}
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

export interface Site {
  id: number;
  name?: string;
  phone?: string;
  streetAddress?: string;
  fullAddress?: string;
  locality?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  coverPhotoUrl?: string;
  iconUrl?: string;
  instructions?: string;
  description?: string;
  partnerIdentifier?: string;
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
  // configure
  configure(token: string): void;
  // customer
  login(code: string): Promise<any>;
  createCustomer(customerInfo: Customer): Promise<Customer>;
  updateCustomer(customerInfo: Customer): Promise<Customer>;
  getCurrentCustomer(): Promise<Customer>;
  //  orders
  fetchOrders(): Promise<[Order]>;
  createOrder(
    siteId: number,
    pid: string,
    customerInfo: Customer
  ): Promise<Order>;
  // notify
  notifyConfigure(): void;
  clearNotifications(): Promise<void>;
  createForSitesInRegion(
    region: CircularRegion,
    notification: NotificationInfo
  ): Promise<[Site]>;
  createForSites(sites: [Site], notification: NotificationInfo): Promise<void>;
  // sites
  fetchAllSites(): Promise<[Site]>;
};
export default Flybuy as FlybuyType;
