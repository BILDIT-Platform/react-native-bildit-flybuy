import { NativeModules, NativeEventEmitter } from 'react-native';

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
  createdAt?: string;

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

  spotIdentifier?: string;
  spotIdentifierEntryEnabled?: boolean;
  spotIdentifierInputType?: string;
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

export interface IPickupTypeConfig {
  pickupType: string;
  pickupTypeLocalizedString: string;
  requireVehicleInfo: boolean;
  showVehicleInfoFields: boolean;
}

export interface IPickupConfig {
  accentColor: string;
  accentTextColor: string;
  askToAskImageURL?: string;
  availablePickupTypes: IPickupTypeConfig[];
  customerNameEditingEnabled: boolean;
  id: number;
  pickupTypeSelectionEnabled: boolean;
  privacyPolicyURL?: string;
  termsOfServiceURL?: string;
  type: string;
}

export interface ICustomerInfo {
  name: string;
  carType: string;
  carColor: string;
  licensePlate: string;
  phone?: string;
}
export interface ICustomer {
  token: string;
  emailAddress?: string;
  info: ICustomerInfo;
}

type CreateOrderWithSitePid = {
  sitePid: string;
  orderPid: string;
  customerInfo: ICustomerInfo;
  pickupWindow?: PickupWindow;
  orderState?: OrderStateType;
  pickupType?: PickupType;
};

type CreateOrderWithSiteId = {
  siteId: number;
  pid: string;
  customerInfo: ICustomerInfo;
  pickupWindow?: PickupWindow;
  orderState?: OrderStateType;
  pickupType?: PickupType;
};

type CreateOrderParamsType = Partial<CreateOrderWithSiteId> &
  Partial<CreateOrderWithSitePid>;

type PickupWindow = {
  start: string;
  end: string;
};

export enum CustomerState {
  CREATED = 'created',
  EN_ROUTE = 'en_route',
  NEARBY = 'nearby',
  ARRIVED = 'arrived',
  WAITING = 'waiting',
  DEPARTED = 'departed',
  COMPLETED = 'completed',
}

export enum OrderStateType {
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

export enum PickupType {
  CURBSIDE = 'curbside',
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

const Flybuy = NativeModules.Flybuy ?? {};

type Orders = {
  fetchOrders(): Promise<[IOrder]>;
  /**
   * This function supports two type of create order
   *
   * 1. Create Order using Site ID, the siteId and pid is a mandatory for this
   *
   * 2. Create Order using Site Partner Identifier, the sitePid and orderPid is a mandatory for this
   *
   *
   * @param params Object based on CreateOrderParamsType
   */
  createOrder(params: CreateOrderParamsType): Promise<IOrder>;
  claimOrder(
    redeemCode: string,
    customerInfo: ICustomerInfo,
    pickupType?: PickupType
  ): Promise<IOrder>;
  fetchOrderByRedemptionCode(redemCode: string): Promise<IOrder>;
  updateOrderState(orderId: number, state: OrderStateType): Promise<IOrder>;
  updateOrderCustomerState(
    orderId: number,
    state: CustomerState
  ): Promise<IOrder>;
  updateOrderCustomerStateWithSpot(
    orderId: number,
    state: CustomerState,
    spot: string
  ): Promise<IOrder>;
  rateOrder(orderId: number, rating: number, comments: string): Promise<IOrder>;
};

type Customer = {
  loginWithToken(code: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
  signUp(email: string, password: string): Promise<any>;
  createCustomer(customerInfo: ICustomerInfo): Promise<ICustomer>;
  updateCustomer(customerInfo: ICustomerInfo): Promise<ICustomer>;
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
  fetchSiteByPartnerIdentifier(params: {
    partnerIdentifier: string;
  }): Promise<ISite>;
};

type Notify = {
  configure(bgTaskIdentifier?: string): Promise<void>;
  clearNotifications(): Promise<void>;
  createForSitesInRegion(
    region: ICircularRegion,
    notification: INotificationInfo
  ): Promise<ISite[]>;
  createForSites(
    sites: ISite[],
    notification: INotificationInfo
  ): Promise<void>;
  sync(force: Boolean): Promise<void>;
  onPermissionChanged(): void;
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
  onPermissionChanged(): void;
};

type FlyBuyType = {
  Pickup: Pickup;
  Notify: Notify;
  Presence: Presence;
  Core: {
    configure(token: string): void;
    updatePushToken(token: string): void;
    handleRemoteNotification(data: any): void;
    Orders: Orders;
    Customer: Customer;
    Sites: Sites;
  };
  eventEmitter: any;
};

const FlyBuyModule = {
  Pickup: {
    configure: Flybuy.pickupConfigure,
    onPermissionChanged: Flybuy.onPermissionChangedPickup,
  },
  Notify: {
    configure: (bgTaskIdentifier?: string) => {
      return Flybuy.notifyConfigure(bgTaskIdentifier);
    },
    clearNotifications: Flybuy.clearNotifications,
    createForSitesInRegion: Flybuy.createForSitesInRegion,
    createForSites: Flybuy.createForSites,
    sync: Flybuy.sync,
    onPermissionChanged: Flybuy.onPermissionChangedNotify,
  },
  Presence: {
    configure: Flybuy.presenceConfigure,
    startLocatorWithIdentifier: Flybuy.startLocatorWithIdentifier,
    stopLocator: Flybuy.stopLocator,
  },
  Core: {
    configure: Flybuy.configure,
    updatePushToken: Flybuy.updatePushToken,
    handleRemoteNotification: Flybuy.handleRemoteNotification,
    Orders: {
      fetchOrders: Flybuy.fetchOrders,
      createOrder: (params: CreateOrderParamsType) => {
        const {
          siteId,
          sitePid,
          orderPid,
          pid,
          customerInfo,
          pickupType,
          pickupWindow,
          orderState,
        } = params;

        if (siteId && pid) {
          return Flybuy.createOrder(
            siteId,
            pid,
            customerInfo,
            pickupWindow ?? null,
            orderState ?? null,
            pickupType ?? null
          );
        }

        if (sitePid && orderPid) {
          return Flybuy.createOrderWithPartnerIdentifier(
            sitePid,
            orderPid,
            customerInfo,
            pickupWindow ?? null,
            orderState ?? null,
            pickupType ?? null
          );
        }
      },
      claimOrder: Flybuy.claimOrder,
      fetchOrderByRedemptionCode: Flybuy.fetchOrderByRedemptionCode,
      updateOrderState: Flybuy.updateOrderState,
      updateOrderCustomerState: Flybuy.updateOrderCustomerState,
      updateOrderCustomerStateWithSpot: Flybuy.updateOrderCustomerStateWithSpot,
      rateOrder: Flybuy.rateOrder,
    },
    Customer: {
      loginWithToken: Flybuy.loginWithToken,
      login: Flybuy.login,
      logout: Flybuy.logout,
      signUp: Flybuy.signUp,
      createCustomer: Flybuy.createCustomer,
      updateCustomer: Flybuy.updateCustomer,
      getCurrentCustomer: Flybuy.getCurrentCustomer,
    },
    Sites: {
      fetchAllSites: Flybuy.fetchAllSites,
      fetchSitesByQuery: Flybuy.fetchSitesByQuery,
      fetchSitesByRegion: Flybuy.fetchSitesByRegion,
      fetchSiteByPartnerIdentifier: Flybuy.fetchSiteByPartnerIdentifier,
    },
  },
  eventEmitter: new NativeEventEmitter(Flybuy),
};

export default FlyBuyModule as FlyBuyType;
