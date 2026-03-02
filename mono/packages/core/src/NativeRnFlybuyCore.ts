import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export * from './types';

/**
 * NativeModule spec uses only inline types so React Native codegen can parse it.
 * Public API types remain in ./types.
 */
export interface Spec extends TurboModule {
  // Core functions
  startObserver(): void;
  stopObserver(): void;
  updatePushToken(token: string): void;
  handleRemoteNotification(data: Object): void;
  handleNotification(data: Object): Promise<Object>;

  // Customers functions
  login(email: string, password: string): Promise<Object>;
  loginWithToken(token: string): Promise<Object>;
  logout(): Promise<string>;
  signUp(email: string, password: string): Promise<Object>;
  createCustomer(customerInfo: {
    name: string;
    carType: string;
    carColor: string;
    licensePlate: string;
    phone?: string;
  }): Promise<Object>;
  updateCustomer(customerInfo: {
    name: string;
    carType: string;
    carColor: string;
    licensePlate: string;
    phone?: string;
  }): Promise<Object>;
  getCurrentCustomer(): Promise<Object>;

  // Sites functions
  /**
   * @deprecated
   */
  fetchAllSites(): Promise<Object[]>;
  /**
   * @deprecated
   */
  fetchSitesByQuery(params: { query: string; page: number }): Promise<[Object]>;
  /**
   * @deprecated
   */
  fetchSitesByRegion(params: {
    per: number;
    page: number;
    region: { latitude: number; longitude: number; radius: number };
  }): Promise<Object[]>;
  fetchSiteByPartnerIdentifier(params: {
    partnerIdentifier: string;
  }): Promise<Object>;
  fetchSitesNearPlace(
    place: {
      name: string;
      id: string;
      placeFormatted: string;
      address?: string;
      distance?: number;
    },
    distance: number
  ): Promise<Object[]>;

  // Places functions
  placesSuggest(
    keyword: string,
    options: {
      latitude?: number;
      longitude?: number;
      type?: number;
      countryCodes?: string[];
      placeTypes?: number[];
    }
  ): Promise<Object[]>;
  placesRetrieve(place: {
    name: string;
    id: string;
    placeFormatted: string;
    address?: string;
    distance?: number;
  }): Promise<Object>;

  // Orders functions
  fetchOrders(): Promise<Object[]>;
  createOrder(params: Object): Promise<Object>;
  claimOrder(
    redeemCode: string,
    customerInfo: {
      name: string;
      carType: string;
      carColor: string;
      licensePlate: string;
      phone?: string;
    },
    pickupType?: string
  ): Promise<Object>;
  fetchOrderByRedemptionCode(redemCode: string): Promise<Object>;
  updateOrderState(orderId: number, state: string): Promise<Object>;
  updateOrderCustomerState(orderId: number, state: string): Promise<Object>;
  updateOrderCustomerStateWithSpot(
    orderId: number,
    state: string,
    spot: string
  ): Promise<Object>;
  rateOrder(orderId: number, rating: number, comments: string): Promise<Object>;
  updatePickupMethod(
    orderId: number,
    options: {
      pickupType: string;
      customerCarColor?: string;
      customerCarType?: string;
      customerLicensePlate?: string;
      handoffVehicleLocation?: string;
    }
  ): Promise<Object>;

  // Deeplinks
  parseReferrerUrl(referrerUrl: string): Promise<Object>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RnFlybuyCore');
