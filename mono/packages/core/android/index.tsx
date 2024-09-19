import { NativeModules, Platform } from 'react-native';
import type {
  CreateOrderParamsType,
  CustomerState,
  ICircularRegion,
  ICustomer,
  ICustomerInfo,
  IOrder,
  ISite,
  OrderStateType,
  PickupType,
} from './types';

export * from './types';

const LINKING_ERROR =
  `The package 'react-native-bildit-flybuy-core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RnFlybuyCoreModule = isTurboModuleEnabled
  ? require('./NativeRnFlybuyCore').default
  : NativeModules.RnFlybuyCore;

const RnFlybuyCore = RnFlybuyCoreModule
  ? RnFlybuyCoreModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// Core functions
export function startObserver() {
  return RnFlybuyCore.startObserver();
}

export function stopObserver() {
  return RnFlybuyCore.stopObserver();
}


export function updatePushToken(token: string): Promise<void> {
  return RnFlybuyCore.updatePushToken(token);
}

export function handleRemoteNotification(data: any): Promise<void> {
  return RnFlybuyCore.handleRemoteNotification(data);
}

// customer functions
function login(email: string, password: string): Promise<ICustomer> {
  return RnFlybuyCore.login(email, password);
}

function loginWithToken(token: string): Promise<ICustomer> {
  return RnFlybuyCore.loginWithToken(token);
}

function logout(): Promise<void> {
  return RnFlybuyCore.logout();
}

function signUp(email: string, password: string): Promise<ICustomer> {
  return RnFlybuyCore.signUp(email, password);
}

function createCustomer(customerInfo: ICustomerInfo): Promise<ICustomer> {
  return RnFlybuyCore.createCustomer(customerInfo);
}

function updateCustomer(customerInfo: ICustomerInfo): Promise<ICustomer> {
  return RnFlybuyCore.updateCustomer(customerInfo);
}

function getCurrentCustomer(): Promise<ICustomer> {
  return RnFlybuyCore.getCurrentCustomer();
}

// Sites functions
function fetchAllSites(): Promise<ISite[]> {
  return RnFlybuyCore.fetchAllSites();
}

function fetchSitesByQuery(params: {
  query: string;
  page: number;
}): Promise<ISite[]> {
  return RnFlybuyCore.fetchSitesByQuery(params);
}

function fetchSitesByRegion(params: {
  per: number;
  page: number;
  region: ICircularRegion;
}): Promise<ISite[]> {
  return RnFlybuyCore.fetchSitesByRegion(params);
}

function fetchSiteByPartnerIdentifier(params: {
  partnerIdentifier: string;
}): Promise<ISite> {
  return RnFlybuyCore.fetchSiteByPartnerIdentifier(params);
}

// Orders
function fetchOrders(): Promise<IOrder[]> {
  return RnFlybuyCore.fetchOrders();
}
function createOrder(params: CreateOrderParamsType) {
  const {
    siteId,
    sitePartnerIdentifier,
    orderPid,
    pid,
    customerInfo,
    pickupType,
    pickupWindow,
    orderState,
  } = params;

  if (siteId && pid) {
    return RnFlybuyCore.createOrder(
      siteId,
      pid,
      customerInfo,
      pickupWindow ?? null,
      orderState ?? null,
      pickupType ?? null
    );
  }

  if (sitePartnerIdentifier && orderPid) {
    return RnFlybuyCore.createOrderWithPartnerIdentifier(
      sitePartnerIdentifier,
      orderPid,
      customerInfo,
      pickupWindow ?? null,
      orderState ?? null,
      pickupType ?? null
    );
  }
}
function claimOrder(
  redeemCode: string,
  customerInfo: ICustomerInfo,
  pickupType?: PickupType
): Promise<IOrder> {
  return RnFlybuyCore.claimOrder(redeemCode, customerInfo, pickupType);
}
function fetchOrderByRedemptionCode(redemCode: string): Promise<IOrder> {
  return RnFlybuyCore.fetchOrderByRedemptionCode(redemCode);
}
function updateOrderState(
  orderId: number,
  state: OrderStateType
): Promise<IOrder> {
  return RnFlybuyCore.updateOrderState(orderId, state);
}
function updateOrderCustomerState(
  orderId: number,
  state: CustomerState
): Promise<IOrder> {
  return RnFlybuyCore.updateOrderCustomerState(orderId, state);
}
function updateOrderCustomerStateWithSpot(
  orderId: number,
  state: CustomerState,
  spot: string
): Promise<IOrder> {
  return RnFlybuyCore.updateOrderCustomerStateWithSpot(orderId, state, spot);
}
function rateOrder(
  orderId: number,
  rating: number,
  comments: string
): Promise<IOrder> {
  return RnFlybuyCore.rateOrder(orderId, rating, comments);
}

type ICustomers = {
  loginWithToken(code: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
  signUp(email: string, password: string): Promise<any>;
  createCustomer(customerInfo: ICustomerInfo): Promise<ICustomer>;
  updateCustomer(customerInfo: ICustomerInfo): Promise<ICustomer>;
  getCurrentCustomer(): Promise<ICustomer>;
};

export const Customer: ICustomers = {
  login,
  loginWithToken,
  logout,
  signUp,
  createCustomer,
  updateCustomer,
  getCurrentCustomer,
};

type ISites = {
  fetchAllSites(): Promise<ISite[]>;
  fetchSitesByQuery(params: { query: string; page: number }): Promise<ISite[]>;
  fetchSitesByRegion(params: {
    per: number;
    page: number;
    region: ICircularRegion;
  }): Promise<ISite[]>;
  fetchSiteByPartnerIdentifier(params: {
    partnerIdentifier: string;
  }): Promise<ISite>;
};

export const Sites: ISites = {
  fetchAllSites,
  fetchSitesByQuery,
  fetchSitesByRegion,
  fetchSiteByPartnerIdentifier,
};

type IOrders = {
  fetchOrders(): Promise<IOrder[]>;
  /**
   * This function supports two type of create order
   *
   * 1. Create Order using Site ID, the siteId and pid is a mandatory for this
   *
   * 2. Create Order using Site Partner Identifier, the sitePartnerIdentifier and orderPid is a mandatory for this
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

export const Orders: IOrders = {
  fetchOrders,
  createOrder,
  claimOrder,
  fetchOrderByRedemptionCode,
  updateOrderState,
  updateOrderCustomerState,
  updateOrderCustomerStateWithSpot,
  rateOrder,
};

