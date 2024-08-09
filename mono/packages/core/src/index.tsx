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
  `The package '@bildit-platform/rn-flybuy-core' doesn't seem to be linked. Make sure: \n\n` +
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

export function updatePushToken(token: string): Promise<void> {
  return RnFlybuyCore.updatePushToken(token);
}

export function handleRemoteNotification(data: any): Promise<void> {
  return RnFlybuyCore.handleRemoteNotification(data);
}

// customer functions
export function login(email: string, password: string): Promise<ICustomer> {
  return RnFlybuyCore.login(email, password);
}

export function loginWithToken(token: string): Promise<ICustomer> {
  return RnFlybuyCore.loginWithToken(token);
}

export function logout(): Promise<void> {
  return RnFlybuyCore.logout();
}

export function signUp(email: string, password: string): Promise<ICustomer> {
  return RnFlybuyCore.signUp(email, password);
}

export function createCustomer(
  customerInfo: ICustomerInfo
): Promise<ICustomer> {
  return RnFlybuyCore.createCustomer(customerInfo);
}

export function updateCustomer(
  customerInfo: ICustomerInfo
): Promise<ICustomer> {
  return RnFlybuyCore.updateCustomer(customerInfo);
}

export function getCurrentCustomer(): Promise<ICustomer> {
  return RnFlybuyCore.getCurrentCustomer();
}

// Sites functions
export function fetchAllSites(): Promise<ISite[]> {
  return RnFlybuyCore.fetchAllSites();
}

export function fetchSitesByQuery(params: {
  query: string;
  page: number;
}): Promise<ISite[]> {
  return RnFlybuyCore.fetchSitesByQuery(params);
}

export function fetchSitesByRegion(params: {
  per: number;
  page: number;
  region: ICircularRegion;
}): Promise<ISite[]> {
  return RnFlybuyCore.fetchSitesByRegion(params);
}

export function fetchSiteByPartnerIdentifier(params: {
  partnerIdentifier: string;
}): Promise<ISite> {
  return RnFlybuyCore.fetchSiteByPartnerIdentifier(params);
}

// Orders
export function fetchOrders(): Promise<IOrder[]> {
  return RnFlybuyCore.fetchOrders();
}
export function createOrder(params: CreateOrderParamsType) {
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
export function claimOrder(
  redeemCode: string,
  customerInfo: ICustomerInfo,
  pickupType?: PickupType
): Promise<IOrder> {
  return RnFlybuyCore.claimOrder(redeemCode, customerInfo, pickupType);
}
export function fetchOrderByRedemptionCode(redemCode: string): Promise<IOrder> {
  return RnFlybuyCore.fetchOrderByRedemptionCode(redemCode);
}
export function updateOrderState(
  orderId: number,
  state: OrderStateType
): Promise<IOrder> {
  return RnFlybuyCore.updateOrderState(orderId, state);
}
export function updateOrderCustomerState(
  orderId: number,
  state: CustomerState
): Promise<IOrder> {
  return RnFlybuyCore.updateOrderCustomerState(orderId, state);
}
export function updateOrderCustomerStateWithSpot(
  orderId: number,
  state: CustomerState,
  spot: string
): Promise<IOrder> {
  return RnFlybuyCore.updateOrderCustomerStateWithSpot(orderId, state, spot);
}
export function rateOrder(
  orderId: number,
  rating: number,
  comments: string
): Promise<IOrder> {
  return RnFlybuyCore.rateOrder(orderId, rating, comments);
}
