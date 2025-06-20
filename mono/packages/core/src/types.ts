export interface ICustomer {
  token: string;
  emailAddress?: string;
  info: ICustomerInfo;
}

export interface ICustomerInfo {
  name: string;
  carType: string;
  carColor: string;
  licensePlate: string;
  phone?: string;
}

export interface IPlace {
  name: string;
  id: string;
  placeFormatted: string;
  address?: string;
  distance?: number;
}

export interface IPlaceLocation {
  latitude: number;
  longitude: number;
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

export interface ICircularRegion {
  latitude: number;
  longitude: number;
  radius: number;
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
  orderFiredAt?: string;

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

export enum CustomerState {
  CREATED = 'created',
  EN_ROUTE = 'en_route',
  NEARBY = 'nearby',
  ARRIVED = 'arrived',
  WAITING = 'waiting',
  DEPARTED = 'departed',
  COMPLETED = 'completed',
}

export enum PlaceType {
  ADDRESS = 0,
  REGION = 1,
  POSTAL_CODE = 2,
  CITY = 3,
  // Point of Interest
  POI = 4,
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

export type CreateOrderWithSitePid = {
  sitePartnerIdentifier: string;
  orderPid: string;
  customerInfo: ICustomerInfo;
  pickupWindow?: PickupWindow;
  orderState?: OrderStateType;
  pickupType?: PickupType;
};

export type CreateOrderWithSiteId = {
  siteId: number;
  pid: string;
  customerInfo: ICustomerInfo;
  pickupWindow?: PickupWindow;
  orderState?: OrderStateType;
  pickupType?: PickupType;
};

export type CreateOrderParamsType = Partial<CreateOrderWithSiteId> &
  Partial<CreateOrderWithSitePid>;

export type PickupWindow = {
  start: string;
  end: string;
};

export enum LinkDetailType {
  DINE_IN = 'dine_in',
  REDEMPTION = 'redemption',
  OTHER = 'other',
}

export type LinkDetails = {
  url: string;
  type: LinkDetailType;
  params: Record<string, string | number | boolean>;
  // TODO: double check any type
  orderOptions?: any;
};

export type PlaceSuggestOptions = {
  latitude?: number;
  longitude?: number;
  /**
   * By default, the type is ADDRESS
   */
  type?: PlaceType;
  countryCodes?: string[];
  /**
   * for additional place types, use this field
   * you can skip the type field and use this field instead
   */
  placeTypes?: PlaceType[];
};

export type PickupMethodOptions = {
  pickupType: PickupType;
  customerCarColor?: string;
  customerCarType?: string;
  customerLicensePlate?: string;
  handoffVehicleLocation?: string;
};
