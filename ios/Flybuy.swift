import FlyBuy
import FlyBuyPickup
import FlyBuyPresence
import FlyBuyNotify

@objc(Flybuy)
class Flybuy: NSObject {
    
    @objc(configure:)
    func configure(token: String) {
        FlyBuy.Core.configure(["token": token])
    }
    
    // Customer
    
    @objc(loginWithToken:withResolver:withRejecter:)
    func loginWithToken(token: String,
                        resolve:@escaping RCTPromiseResolveBlock,
                        reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.customer.loginWithToken(token: token) { (customer, error) in
            if ((error == nil) && (customer != nil)) {
                resolve(self.parserCustomer(customer: customer!))
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(login:withPassword:withResolver:withRejecter:)
    func login(email: String,
               password: String,
               resolve:@escaping RCTPromiseResolveBlock,
               reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.customer.login(emailAddress: email, password: password) { (customer, error) in
            if ((error == nil) && (customer != nil)) {
                resolve(self.parserCustomer(customer: customer!))
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(logout:withRejecter:)
    func logout(resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.customer.logout()
        resolve(nil)
    }
    
    @objc(getCurrentCustomer:withRejecter:)
    func getCurrentCustomer(resolve:@escaping RCTPromiseResolveBlock,
                            reject:@escaping RCTPromiseRejectBlock) {
        let customer = FlyBuy.Core.customer.current
        if (customer == nil) {
            reject("not login", "current customer error", nil )
        } else {
            resolve(self.parserCustomer(customer: customer!))
        }
    }
    
    @objc(createCustomer:withResolver:withRejecter:)
    func createCustomer(customer: Dictionary<String, String>,
                        resolve:@escaping RCTPromiseResolveBlock,
                        reject:@escaping RCTPromiseRejectBlock) {
        let customerInfo: CustomerInfo = decodeCustomerInfo(customer: customer)
        FlyBuy.Core.customer.create(customerInfo, termsOfService: true, ageVerification: true) {
            (customer, error) in
            if (error == nil && customer != nil) {
                resolve(self.parserCustomer(customer: customer!))
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(updateCustomer:withResolver:withRejecter:)
    func updateCustomer(customer: Dictionary<String, String>,
                        resolve:@escaping RCTPromiseResolveBlock,
                        reject:@escaping RCTPromiseRejectBlock) {
        let customerInfo: CustomerInfo = decodeCustomerInfo(customer: customer)
        FlyBuy.Core.customer.update(customerInfo) { (customer, error) in
            if ((error == nil) && (customer != nil)) {
                resolve(self.parserCustomer(customer: customer!))
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    // Orders
    
    @objc(fetchOrders:withRejecter:)
    func fetchOrders(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.orders.fetch() { (orders, error) in
            if (error == nil) {
                resolve((orders ?? []).map { self.parseOrder(order: $0) })
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(createOrder:withPartnerIdentifier:withCustomerInfo:withPickupWindow:withOrderState:withPickupType:withResolver:withRejecter:)
    func createOrder(siteId: Int, pid: String,
                     customerInfo: Dictionary<String, String>,
                     pickupWindow: Dictionary<String, String>?,
                     orderState: String,
                     pickupType: String,
                     resolve:@escaping RCTPromiseResolveBlock,
                     reject:@escaping RCTPromiseRejectBlock) {
        let info = decodeCustomerInfo(customer: customerInfo)
        let pickupWindowInfo = decodePickupWindow(pickupWindow: pickupWindow)
        FlyBuy.Core.orders.create(siteID: siteId, partnerIdentifier: pid, customerInfo: info, pickupWindow: pickupWindowInfo, state: orderState) {
            (order, error) in
            if (error == nil && order != nil) {
                resolve(self.parseOrder(order: order!))
            } else {
                reject(error.debugDescription, error?.localizedDescription, error )
            }
        }
    }
    
    // Sites
    
    // Notify
    
    @objc(notifyConfigure)
    func notifyConfigure() {
        FlyBuyNotify.Manager.shared.configure()
    }
    
    // Pickup
    
    @objc(pickupConfigure)
    func pickupConfigure() {
        FlyBuyPickup.Manager.shared.configure()
    }
    
    // Presence
    
    @objc(presenceConfigure:)
    func presenceConfigure(presenceUUID: String) {
        let uuid = UUID(uuidString: presenceUUID)!
        FlyBuyPresence.Manager.shared.configure(presenceUUID: uuid)
    }
    
    // Parsers
    
    func parseCustomerInfo(info: CustomerInfo) -> Dictionary<String, String?> {
        return [
            "name": info.name,
            "carType": info.carType,
            "carColor": info.carColor,
            "licensePlate": info.licensePlate,
            "phone": info.phone,
        ]
    }
    
    func parserCustomer(customer: Customer) -> Dictionary<String, Any?> {
        return [
            "token": customer.token,
            "emailAddress": customer.emailAddress,
            "info": parseCustomerInfo(info: customer.info),
        ]
    }
    
    func parseOrder(order: Order) -> Dictionary<String, Any?> {
        return [
            "id": order.id,
            "state": order.state,
            "customerState": order.customerState.description.lowercased(),
            "partnerIdentifier": order.partnerIdentifier,
            "pickupWindow": [
                order.pickupWindow?.start.description,
                order.pickupWindow?.end.description
            ],
            "pickupType": order.pickupType,
            "etaAt": order.etaAt?.description,
            "redemptionCode": order.redemptionCode,
            "redeemedAt": order.redeemedAt?.description,
            "customerRating": order.customerRating,
            "customerComment": order.customerComment,
            
            "siteID": order.siteID,
            "siteName": order.siteName,
            "sitePhone": order.sitePhone,
            "siteFullAddress": order.siteFullAddress,
            "siteLongitude": order.siteLongitude,
            "siteLatitude": order.siteLatitude,
            "siteInstructions": order.siteInstructions,
            "siteDescription": order.siteDescription,
            "siteCoverPhotoURL": order.siteCoverPhotoURL,
            
            "customerName": order.customerName,
            "customerCarType": order.customerCarType,
            "customerCarColor": order.customerCarColor,
            "customerLicensePlate": order.customerLicensePlate,
        ]
    }
    
    // Decoders
    
    func decodeCustomerInfo(customer: Dictionary<String, String?>) -> CustomerInfo {
        return CustomerInfo.init(name: customer["name"] as? String ?? " ",
                                 carType: customer["carType"] ?? "",
                                 carColor: customer["carColor"] ?? "",
                                 licensePlate: customer["licensePlate"] ?? "",
                                 phone: customer["phone"] ?? "")
    }
    
    func decodePickupWindow(pickupWindow: Dictionary<String, String>?) -> PickupWindow {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withFullDate,
                                          .withTime,
                                          .withDashSeparatorInDate,
                                          .withColonSeparatorInTime]
        
        let start: Date = (formatter.date(from: pickupWindow?["start"]! ?? " ")!)
        let end: Date = (formatter.date(from: pickupWindow?["end"]! ?? " ")!)
        return PickupWindow.init(start: start, end: end)
    }
}
