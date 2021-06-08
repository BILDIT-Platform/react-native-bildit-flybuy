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
    
    @objc(signUp:withPassword:withResolver:withRejecter:)
    func signUp(email: String,
                password: String,
                resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.customer.signUp(emailAddress: email, password: password) { (customer, error) in
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
        resolve("ok")
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
    
    @objc(claimOrder:withCustomer:withPickupType:withResolver:withRejecter:)
    func claimOrder(redeemCode: String,
                    customer: Dictionary<String, String>,
                    pickupType: String,
                    resolve:@escaping RCTPromiseResolveBlock,
                    reject:@escaping RCTPromiseRejectBlock) {
        let customerInfo: CustomerInfo = decodeCustomerInfo(customer: customer)
        FlyBuy.Core.orders.claim(withRedemptionCode: redeemCode, customerInfo: customerInfo, pickupType: pickupType) {
            (order: Order?, error: Error?) in
            if (error == nil) {
                resolve(self.parseOrder(order: order!))
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
        
        
    }
    
    @objc(updateOrderState:withState:withResolver:withRejecter:)
    func updateOrderState(orderId: Int,
                          state: String,
                          resolve:@escaping RCTPromiseResolveBlock,
                          reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.orders.updateOrderState(orderID: orderId, state: state) {
            (order, error) in
            if (error == nil) {
                resolve(self.parseOrder(order: order!))
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(updateOrderCustomerState:withState:withResolver:withRejecter:)
    func updateOrderCustomerState(orderId: Int,
                                  state: String,
                                  resolve:@escaping RCTPromiseResolveBlock,
                                  reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.orders.updateCustomerState(orderID: orderId, customerState: state) {
            (order, error) in
            if (error == nil) {
                resolve(self.parseOrder(order: order!))
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(rateOrder:withRating:withComments:withResolver:withRejecter:)
    func rateOrder(orderId: Int,
                   rating: Int,
                   comments: String,
                   resolve:@escaping RCTPromiseResolveBlock,
                   reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.orders.rateOrder(orderID: orderId, rating: rating, comments: comments) {
            (order, error) in
            if (error == nil) {
                resolve(self.parseOrder(order: order!))
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    
    // Sites
    
    @objc(fetchAllSites:withRejecter:)
    func fetchAllSites(resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) {
        FlyBuy.Core.sites.fetchAll() { (sites, error) in
            if (error == nil) {
                resolve((sites ?? []).map { self.parseSite(site: $0) })
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(fetchSitesByQuery:withResolver:withRejecter:)
    func fetchSitesByQuery(params: Dictionary<String, Any>,
                           resolve:@escaping RCTPromiseResolveBlock,
                           reject:@escaping RCTPromiseRejectBlock) {
        let query: String = params["query"] as! String
        let page: Int = params["page"] as! Int
        
        FlyBuy.Core.sites.fetch(query: query, page: page) { (sites, pagination, error) in
            if (error == nil) {
                resolve([
                    "data": (sites ?? []).map { self.parseSite(site: $0) },
                    "pagination": self.parsePagination(pagination: pagination) ?? [] as Any
                ])
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(fetchSitesByRegion:withResolver:withRejecter:)
    func fetchSitesByRegion(params: Dictionary<String, Any>,
                            resolve:@escaping RCTPromiseResolveBlock,
                            reject:@escaping RCTPromiseRejectBlock) {
        let page: Int = params["page"] as! Int
        let per: Int = params["per"] as! Int
        let region: CLCircularRegion = decodeRegion(region: params["region"] as! Dictionary<String, Double>)
        
        FlyBuy.Core.sites.fetch(region: region,page: page, per:per) { (sites, error) in
            if (error == nil) {
                resolve((sites ?? []).map { self.parseSite(site: $0) })
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    // Notify
    
    @objc(notifyConfigure)
    func notifyConfigure() {
        FlyBuyNotify.Manager.shared.configure()
    }
    
    @objc(clearNotifications:withRejecter:)
    func clearNotifications(resolve:@escaping RCTPromiseResolveBlock,
                            reject:@escaping RCTPromiseRejectBlock) {
        FlyBuyNotify.Manager.shared.clear() { (error) in
            if (error == nil) {
                resolve("ok")
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(createForSitesInRegion:withNotification:withResolver:withRejecter:)
    func createForSitesInRegion(region: Dictionary<String, Double>,
                                notification: Dictionary<String, Any>,
                                resolve:@escaping RCTPromiseResolveBlock,
                                reject:@escaping RCTPromiseRejectBlock) {
        
        let regionInfo: CLCircularRegion = self.decodeRegion(region: region)
        let notificationInfo: NotificationInfo = self.decodeNotification(notification: notification)
        FlyBuyNotify.Manager.shared.createForSitesInRegion(_:regionInfo,notification:notificationInfo) { (sites, error) in
            if (error == nil) {
                resolve((sites ?? []).map { self.parseSite(site: $0) })
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    @objc(createForSites:withNotification:withResolver:withRejecter:)
    func createForSites(sites: Array<Dictionary<String, Any>>,
                        notification: Dictionary<String, Any>,
                        resolve:@escaping RCTPromiseResolveBlock,
                        reject:@escaping RCTPromiseRejectBlock) {
        // let parsedSites: Array<Site> = (sites ?? []).map { self.decodeSite(site: $0)}
        let parsedSites: Array<Site> = []
        let notificationInfo: NotificationInfo = self.decodeNotification(notification: notification)
        FlyBuyNotify.Manager.shared.createForSites(_:parsedSites,notification:notificationInfo) { (error) in
            if (error == nil) {
                resolve("ok")
            } else {
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
        }
    }
    
    // Pickup
    
    @objc(pickupConfigure)
    func pickupConfigure() {
        FlyBuyPickup.Manager.shared.configure()
    }
    
    @objc(onLocationPermissionChanged)
    func onLocationPermissionChanged() {
        // FlyBuyPickup.Manager.shared.onLocationPermissionChanged()
    }
    
    // Presence
    
    @objc(presenceConfigure:)
    func presenceConfigure(presenceUUID: String) {
        let uuid = UUID(uuidString: presenceUUID)!
        FlyBuyPresence.Manager.shared.configure(presenceUUID: uuid)
    }
    
    @objc(startLocatorWithIdentifier:withPayload:withResolver:withRejecter:)
    func startLocatorWithIdentifier(
        presenceIdStr: String,
        payload: String,
        resolve:@escaping RCTPromiseResolveBlock,
        reject:@escaping RCTPromiseRejectBlock
    ) {
        let bytes = presenceIdStr.utf8
        let presenceId = Data(bytes)
        FlyBuyPresence.Manager.shared.createLocatorWithIdentifier( presenceId, payload:payload) { (locator, error) ->
            (Void) in
            if error != nil {
                // Handle error
                reject(error?.localizedDescription,  error.debugDescription, error )
            }
            else {
                FlyBuyPresence.Manager.shared.start(locator!)
                resolve("Locator started successfully")
                // Set locator delegate
                //   locator?.delegate = self
                // Store locator or start it here
            }
        }
        
    }
    
    @objc(stopLocator:withRejecter:)
    func stopLocator(resolve:@escaping RCTPromiseResolveBlock,
                     reject:@escaping RCTPromiseRejectBlock) {
        
        if let error = FlyBuyPresence.Manager.shared.stop() as? PresenceError {
            reject(error.localizedDescription,  error.debugDescription, error )
        }
        else{
            resolve("Locator is stopped successfully.")         
        }
        
    }
    
    // Parsers
    
    func parsePagination(pagination: Pagination?) -> Dictionary<String, Any?>? {
        if let pagination: Pagination = pagination {
            return [
                "currentPage": pagination.currentPage,
                "totalPages": pagination.totalPages,
            ]
        } else { return nil }
        
    }
    
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
    
    
    func parseSite(site: Site?) -> Dictionary<String, Any?>? {
        if let site: Site = site {
            return [
                "id": site.id,
                "name": site.name,
                "phone": site.phone,
                "streetAddress": site.streetAddress,
                "fullAddress": site.fullAddress,
                "locality": site.locality,
                "region": site.region,
                "country": site.country,
                "postalCode": site.postalCode,
                "latitude": site.latitude,
                "longitude": site.longitude,
                "coverPhotoURL": site.coverPhotoURL,
                "instructions": site.instructions,
                "description": site.descriptionText,
                "partnerIdentifier": site.partnerIdentifier,
            ]
            
        } else { return nil }
    }
    
    // Decoders
    
    func decodeCustomerInfo(customer: Dictionary<String, String?>) -> CustomerInfo {
        return CustomerInfo.init(name: customer["name"] as? String ?? " ",
                                 carType: customer["carType"] ?? "",
                                 carColor: customer["carColor"] ?? "",
                                 licensePlate: customer["licensePlate"] ?? "",
                                 phone: customer["phone"] ?? "")
    }
    
    // Site init not implemented in native SDK
    //    func decodeSite(site: Dictionary<String, Any>) -> Site {
    //        return Site.init(
    //            id: site["id"] ?? "",
    //            partnerIdentifier: site["partnerIdentifier"] ?? "",
    //            phone: site["phone"] ?? "",
    //            fullAddress: site["fullAddress"] ?? "",
    //            longitude: site["longitude"] ?? "",
    //            latitude: site["latitude"] ?? "",
    //            instructions: site["instructions"] ?? "",
    //            descriptionText: site["descriptionText"] ?? "",
    //            coverPhotoURL: site["coverPhotoURL"] ?? "",
    //            )
    //    }
    
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
    
    func decodeRegion(region: Dictionary<String, Double>) -> CLCircularRegion {
        let latitude: Double = region["latitude"]!
        let longitude: Double = region["longitude"]!
        let radius: Double = region["radius"]!
        
        var coordinate: CLLocationCoordinate2D = CLLocationCoordinate2DMake(latitude, longitude)
        
        return CLCircularRegion.init(center: coordinate, radius: radius, identifier: UUID().uuidString)
    }
    
    func decodeNotification(notification: Dictionary<String, Any>) -> NotificationInfo {
        let title: String = notification["title"]! as! String
        let content: String = notification["message"]! as! String
        let data: Dictionary<String, String> = notification["data"]! as! Dictionary<String, String>
        return NotificationInfo.init(title: title, content: content, data: data )
    }
    
}
