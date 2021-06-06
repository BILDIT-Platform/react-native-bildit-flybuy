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
        var uuid = UUID(uuidString: presenceUUID)!
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
    
    // Decoders
    
    func decodeCustomerInfo(customer: Dictionary<String, String?>) -> CustomerInfo {
        return CustomerInfo.init(name: customer["name"] as? String ?? " ",
                                 carType: customer["carType"] ?? "",
                                 carColor: customer["carColor"] ?? "",
                                 licensePlate: customer["licensePlate"] ?? "",
                                 phone: customer["phone"] ?? "")
    }
}
