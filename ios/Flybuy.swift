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
