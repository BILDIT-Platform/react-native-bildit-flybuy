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
    
    @objc(logout)
    func logout() {
        FlyBuy.Core.customer.logout()
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
}
