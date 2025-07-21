import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {
  CreateOrderParamsType,
  CustomerState,
  ICircularRegion,
  ICustomer,
  ICustomerInfo,
  IOrder,
  IPlace,
  ISite,
  LinkDetails,
  OrderStateType,
  PickupMethodOptions,
  PickupType,
  PlaceSuggestOptions,
} from './types';

export * from './types';

export interface Spec extends TurboModule {
  // Core functions
  startObserver(): void;
  stopObserver(): void;
  updatePushToken(token: string): void;
  // TODO: change any
  handleRemoteNotification(data: any): void;
  handleNotification(data: any): Promise<any>;

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
  fetchSitesNearPlace(place: IPlace, distance: number): Promise<ISite[]>;

  // Places functions
  placesSuggest(
    keyword: string,
    options: PlaceSuggestOptions
  ): Promise<IPlace[]>;
  placesRetrieve(place: IPlace): Promise<IPlace>;

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
  updatePickupMethod(
    orderId: number,
    options: PickupMethodOptions
  ): Promise<IOrder>;

  // Deeplinks
  parseReferrerUrl(referrerUrl: string): Promise<LinkDetails>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnFlybuyCore');
