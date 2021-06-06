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
    @objc(stopLocator)
    func stopLocator(){
        if let error = FlyBuyPresence.Manager.shared.stop() as? PresenceError {
            print("Error Type: \(error.type)")
            //            reject(error.localizedDescription,  error.debugDescription, error )
            //            }
            //        resolve("Locator is stopped successfully.Locator is stopped successfully.")
        }
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
