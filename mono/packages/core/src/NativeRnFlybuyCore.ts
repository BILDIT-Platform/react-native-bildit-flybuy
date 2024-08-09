import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
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

export interface Spec extends TurboModule {
  // Core functions
  updatePushToken(token: string): void;
  // TODO: change any
  handleRemoteNotification(data: any): void;

  // TODO: double check promise reject type
  //Customers functions
  login(email: string, password: string): Promise<ICustomer>;
  loginWithToken(token: string): Promise<ICustomer>;
  logout(): Promise<string>;
  signUp(email: string, password: string): Promise<ICustomer>;
  createCustomer(customerInfo: ICustomerInfo): Promise<ICustomer>;
  updateCustomer(customerInfo: ICustomerInfo): Promise<ICustomer>;
  getCurrentCustomer(): Promise<ICustomer>;

  // Sites functions
  /**
   * @deprecated
   */
  fetchAllSites(): Promise<ISite[]>;
  /**
   * @deprecated
   */
  fetchSitesByQuery(params: { query: string; page: number }): Promise<[ISite]>;
  /**
   * @deprecated
   */
  fetchSitesByRegion(params: {
    per: number;
    page: number;
    region: ICircularRegion;
  }): Promise<ISite[]>;
  fetchSiteByPartnerIdentifier(params: {
    partnerIdentifier: string;
  }): Promise<ISite>;

  // Orders functions
  fetchOrders(): Promise<IOrder[]>;
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
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnFlybuyCore');
