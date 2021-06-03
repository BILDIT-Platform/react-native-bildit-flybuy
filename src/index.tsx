import { NativeModules } from 'react-native';

export interface ICircularRegion {
  latitude: number;
  longitude: number;
  radius: number;
}

export interface INotificationInfo {
  title: string;
  message: string;
  data: any;
}
export interface IOrder {
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

export interface ISite {
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

export interface ICustomer {
  name: string;
  carType: string;
  carColor: string;
  licensePlate: string;
  phone?: string;
}

const { Flybuy } = NativeModules;

type Orders = {
  fetchOrders(): Promise<[IOrder]>;
  createOrder(
    siteId: number,
    pid: string,
    customerInfo: ICustomer
  ): Promise<IOrder>;
};

type Customer = {
  login(code: string): Promise<any>;
  logout(): Promise<any>;
  createCustomer(customerInfo: ICustomer): Promise<ICustomer>;
  updateCustomer(customerInfo: ICustomer): Promise<ICustomer>;
  getCurrentCustomer(): Promise<ICustomer>;
};

type Sites = {
  fetchAllSites(): Promise<[ISite]>;
  fetchSitesByQuery(query: string, page: number): Promise<[ISite]>;
  fetchSitesByRegion(
    per: number,
    page: number,
    region: ICircularRegion
  ): Promise<[ISite]>;
};

type Notify = {
  configure(): void;
  clearNotifications(): Promise<void>;
  createForSitesInRegion(
    region: ICircularRegion,
    notification: INotificationInfo
  ): Promise<[ISite]>;
  createForSites(
    sites: [ISite],
    notification: INotificationInfo
  ): Promise<void>;
};

type FlyBuyType = {
  Orders: Orders;
  Customer: Customer;
  Notify: Notify;
  Sites: Sites;
  configure(token: string): void;
};

const FlyBuyModule = {
  configure: Flybuy.configure,
  Orders: {
    fetchOrders: Flybuy.fetchOrders,
    createOrder: Flybuy.createOrder,
  },
  Customer: {
    login: Flybuy.login,
    logout: Flybuy.logout,
    createCustomer: Flybuy.createCustomer,
    updateCustomer: Flybuy.updateCustomer,
    getCurrentCustomer: Flybuy.getCurrentCustomer,
  },
  Sites: {
    fetchAllSites: Flybuy.fetchAllSites,
    fetchSitesByQuery: Flybuy.fetchSitesByQuery,
    fetchSitesByRegion: Flybuy.fetchSitesByRegion,
  },
  Notify: {
    configure: Flybuy.notifyConfigure,
    clearNotifications: Flybuy.clearNotifications,
    createForSitesInRegion: Flybuy.createForSitesInRegion,
    createForSites: Flybuy.createForSites,
  },
};

export default FlyBuyModule as FlyBuyType;
