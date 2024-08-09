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
