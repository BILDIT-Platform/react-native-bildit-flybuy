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
  customerState: CustomerState;
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
  streetAddress?: string | null;
  fullAddress?: string | null;
  locality?: string | null;
  region?: string | null;
  country?: string | null;
  postalCode?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  coverPhotoUrl?: string | null;
  iconUrl?: string | null;
  instructions?: string | null;
  description?: string | null;
  partnerIdentifier?: string | null;
}

export interface ICustomer {
  name: string;
  carType: string;
  carColor: string;
  licensePlate: string;
  phone?: string;
}

type PickupWindow = {
  start: string;
  end: string;
};

enum CustomerState {
  CREATED = 'created',
  EN_ROUTE = 'en_route',
  NEARBY = 'nearby',
  ARRIVED = 'arrived',
  WAITING = 'waiting',
  DEPARTED = 'departed',
  COMPLETED = 'completed',
}

enum OrderStateType {
  CREATED = 'created',
  READY = 'ready',
  DELAYED = 'delayed',
  DELIVERY_DISPATCHED = 'delivery_dispatched',
  DRIVER_ASSIGNED = 'driver_assigned',
  DELIVERY_FAILED = 'delivery_failed',
  PICKED_UP = 'picked_up',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  UNDELIVERABLE = 'undeliverable',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

enum PickupType {
  CURBSIDE = 'curbside',
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

const { Flybuy } = NativeModules;

type Orders = {
  fetchOrders(): Promise<[IOrder]>;
  createOrder(
    siteId: number,
    pid: string,
    customerInfo: ICustomer,
    pickupWindow?: PickupWindow,
    orderState?: OrderStateType,
    pickupType?: PickupType
  ): Promise<IOrder>;
  claimOrder(
    redeemCode: string,
    customerInfo: ICustomer,
    pickupType?: PickupType
  ): Promise<IOrder>;
  updateOrderState(orderId: number, state: OrderStateType): Promise<IOrder>;
  updateOrderCustomerState(
    orderId: number,
    state: CustomerState
  ): Promise<IOrder>;
  rateOrder(orderId: number, rating: number, comments: string): Promise<IOrder>;
};

type Customer = {
  loginWithToken(code: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
  createCustomer(customerInfo: ICustomer): Promise<ICustomer>;
  updateCustomer(customerInfo: ICustomer): Promise<ICustomer>;
  getCurrentCustomer(): Promise<ICustomer>;
};

type Sites = {
  fetchAllSites(): Promise<[ISite]>;
  fetchSitesByQuery(params: { query: string; page: number }): Promise<[ISite]>;
  fetchSitesByRegion(params: {
    per: number;
    page: number;
    region: ICircularRegion;
  }): Promise<[ISite]>;
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

type Presence = {
  configure(presenceUUID: string): void;
  startLocatorWithIdentifier(
    presenceId: string,
    payload: string
  ): Promise<string>;
  stopLocator(): Promise<string>;
};

type Pickup = {
  configure(): void;
};

type FlyBuyType = {
  Orders: Orders;
  Customer: Customer;
  Pickup: Pickup;
  Notify: Notify;
  Sites: Sites;
  Presence: Presence;
  configure(token: string): void;
};

const FlyBuyModule = {
  configure: Flybuy.configure,
  Orders: {
    fetchOrders: Flybuy.fetchOrders,
    createOrder: Flybuy.createOrder,
    claimOrder: Flybuy.claimOrder,
    updateOrderState: Flybuy.updateOrderState,
    updateOrderCustomerState: Flybuy.updateOrderCustomerState,
    rateOrder: Flybuy.rateOrder,
  },
  Customer: {
    loginWithToken: Flybuy.loginWithToken,
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
  Pickup: {
    configure: Flybuy.pickupConfigure,
  },
  Presence: {
    configure: Flybuy.presenceConfigure,
    startLocatorWithIdentifier: Flybuy.startLocatorWithIdentifier,
    stopLocator: Flybuy.stopLocator,
  },
};

export default FlyBuyModule as FlyBuyType;
