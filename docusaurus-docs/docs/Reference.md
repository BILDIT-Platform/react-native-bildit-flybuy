# Reference

## Fetch Orders
Fetch all orders associated with your account:

[Fetch Unclaimed Orders Guide](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/pickup?id=fetch-unclaimed-order).

| Method | Params |
|--------|--------|
Flybuy.**fetchOrders(`<flybuy_api_token>`)** | `flybuy_api_token` |

#### Example Output:
```json
    {
        "data": [
            {
            "type": "order",
            "order_id": 1,
            "order_state": "created",
            "redemption_url": "https://flybuy.radiusnetworks.com/m/o?r=TFPQUVAXA5",
            "customer_state": "created",
            "id": 1,
            "arrived_at": null,
            "eta_at": null,
            "partner_identifier": null,
            "partner_display_identifier": null,
            "partner_identifier_for_crew": null,
            "partner_identifier_for_customer": null,
            "state": "created",
            "redemption_code": "TFPQUVAXA5",
            "created_at": "2020-04-24T19:19:45.000Z",
            "updated_at": "2020-04-24T19:19:45.000Z",
            "area_name": null,
            "possible_areas": null,
            "customer_id": null,
            "site_id": 1,
            "site_partner_identifier": "site1",
            "customer_name": null,
            "customer_car_type": null,
            "customer_car_color": null,
            "customer_license_plate": null,
            "customer_rating_value": null,
            "customer_rating_value_string": "",
            "customer_rating_comments": null,
            "pickup_window": "2020-04-24T17:19:45.000Z/2020-04-24T18:19:45.000Z",
            "pickup_type": null,
            "push_token": null,
            "tag_ids": [
            ],
            "delivery_error_reviewed_at": null,
            "delivery_errored_at": null,
            "delivery_identifier": null,
            "delivery_source": null
            }
        ],
        "pages": {
            "current": 1,
            "count": 1,
            "per": 50
  }
}
```

## Fetch Order by ID
Fetch a given order by its ID:
|Method | Params |
|-------|--------|
Flybuy.**fetchOrderByID(`<flybuy_api_token>`, `<order_id>`)**

#### Example Output:
```json
    {
        "data": {
            "type": "order",
            "order_id": 39615709,
            "order_state": "created",
            "redemption_url": "https://flybuy.radiusnetworks.com/m/o?r=TFPQUVAXA5",
            "customer_state": "created",
            "id": 39615709,
            "arrived_at": null,
            "eta_at": null,
            "partner_identifier": null,
            "partner_display_identifier": null,
            "partner_identifier_for_crew": null,
            "partner_identifier_for_customer": null,
            "state": "created",
            "redemption_code": "TFPQUVAXA5",
            "created_at": "2020-04-24T19:19:45.000Z",
            "updated_at": "2020-04-24T19:19:45.000Z",
            "area_name": null,
            "possible_areas": null,
            "customer_id": null,
            "site_id": 1,
            "site_partner_identifier": "site1",
            "customer_name": null,
            "customer_car_type": null,
            "customer_car_color": null,
            "customer_license_plate": null,
            "customer_rating_value": null,
            "customer_rating_value_string": "",
            "customer_rating_comments": null,
            "pickup_window": "2020-04-24T17:19:45.000Z/2020-04-24T18:19:45.000Z",
            "pickup_type": null,
            "push_token": null,
            "tag_ids": [
            1
            ],
            "delivery_error_reviewed_at": null,
            "delivery_errored_at": null,
            "delivery_identifier": null,
            "delivery_source": null
        },
        "included": [
            {
            "type": "site",
            "id": 1,
            "partner_identifier": "site1",
            "name": "A Site",
            "full_address": "123 Any Street, Any Locality, Any Region, 12345",
            "street_address": "123 Any Street",
            "locality": "Any Locality",
            "region": "Any Region",
            "country": "Any Country",
            "postal_code": "12345",
            "latitude": "0.0",
            "longitude": "0.0",
            "instructions": null,
            "description": null,
            "phone": "+15553678309"
            },
            {
            "type": "tag",
            "id": 1,
            "name": "Fries"
            }
        ]
}
```
                     
## Fetch Orders By Partner Identifier
Fetch all orders associated with a given partner ID:

|Method | Params |  
|-------|--------|
Flybuy.**fetchOrdersByPartnerIdentifier(`<flybuy_api_token>`,`partner_id`)** | `flybuy_api_token` , `partner_id`|

#### Example Output:
```json
    {
        "data":[
            {
                "area_name":null,
                "arrived_at":null,
                "created_at":"2021-05-27T09:19:15.145Z",
                "customer_car_color":null,
                "customer_car_type":null,
                "customer_id":null,
                "customer_license_plate":null,
                "customer_name":"Wilson Adam",
                "customer_rating_comments":null,
                "customer_rating_value":null,
                "customer_rating_value_string":"",
                "customer_state":"created",
                "delivery_error_reviewed_at":null,
                "delivery_errored_at":null,
                "delivery_identifier":null,
                "delivery_source":null,
                "eta_at":null,
                "id":44881533,
                "order_id":44881533,
                "order_state":"created",
                "partner_display_identifier":null,
                "partner_identifier":"123XYZabc",
                "partner_identifier_for_crew":null,
                "partner_identifier_for_customer":null,
                "pickup_type":null,
                "pickup_window":"2021-05-28T17:57:34.603Z/2021-05-28T17:57:34.603Z",
                "possible_areas":null,
                "push_token":null,
                "redemption_code":"MRV77989U5",
                "redemption_url":"https://flyb.uy/m/o?r=MRV77989U5",
                "site_id":15942,
                "site_partner_identifier":"001",
                "state":"created",
                "tag_ids":[
                    "Array"
                ],
                "type":"order",
                "updated_at":"2021-05-27T09:19:15.145Z"
            }
        ],
        "pages":{
            "count":1,
            "current":1,
            "per":50
   }
}
```

## Create Order
Create a new order:

[Create Order Guide](https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/pickup?id=create-order).

|Method | Params |
|-------|--------|
Flybuy.**createOrder(`<flybuy_api_token>`, `data`)** | `flybuy_api_token`, `data`|

#### `data`:
```json
    { 
        "site_id": 15942,
        "partner_identifier": "123XYZabc",
        "customer_name": "Wilson Adam",
        "pickup_window": "2021-05-28T17:57:34.603Z"
    }
```
#### Example Output:
```json
    {
        "data":{
            "area_name":null,
            "arrived_at":null,
            "created_at":"2021-05-27T09:19:15.145Z",
            "customer_car_color":null,
            "customer_car_type":null,
            "customer_id":null,
            "customer_license_plate":null,
            "customer_name":"Wilson Adam",
            "customer_rating_comments":null,
            "customer_rating_value":null,
            "customer_rating_value_string":"",
            "customer_state":"created",
            "delivery_error_reviewed_at":null,
            "delivery_errored_at":null,
            "delivery_identifier":null,
            "delivery_source":null,
            "eta_at":null,
            "id":44881533,
            "order_id":44881533,
            "order_state":"created",
            "partner_display_identifier":null,
            "partner_identifier":"123XYZabc",
            "partner_identifier_for_crew":null,
            "partner_identifier_for_customer":null,
            "pickup_type":null,
            "pickup_window":"2021-05-28T17:57:34.603Z/2021-05-28T17:57:34.603Z",
            "possible_areas":null,
            "push_token":null,
            "redemption_code":"MRV77989U5",
            "redemption_url":"https://flyb.uy/m/o?r=MRV77989U5",
            "site_id":15942,
            "site_partner_identifier":"001",
            "state":"created",
            "tag_ids":[
            ],
            "type":"order",
            "updated_at":"2021-05-27T09:19:15.145Z"
        },
        "included":[
        ]
}
```

## Change State
Change the state of the local application:

|Method | Params |
|-------|--------|
Flybuy.**changeState(`<flybuy_api_token>`, `data`)** | `flybuy_api_token`, `data` |

#### `data`:
```json
    {
       order_id: 44880546,
       event_type: "state_change",
       state: "delayed"
    }
```
#### Example Output:
```json
    {
        "_bodyBlob":{
            "_data":{
                "__collector":[
                    "Object"
                ],
                "blobId":"D3FD3032-ED42-495F-8CB0-7AE881FF6C65",
                "name":"events",
                "offset":0,
                "size":0,
                "type":"application/json"
            }
        },
        "_bodyInit":{
            "_data":{
                "__collector":[
                    "Object"
                ],
                "blobId":"D3FD3032-ED42-495F-8CB0-7AE881FF6C65",
                "name":"events",
                "offset":0,
                "size":0,
                "type":"application/json"
            }
        },
        "bodyUsed":false,
        "headers":{
            "map":{
                "accept-ranges":"bytes",
                "cache-control":"no-cache",
                "content-type":"application/json",
                "date":"Thu, 27 May 2021 09:36:41 GMT",
                "strict-transport-security":"max-age=31536000; includeSubDomains",
                "x-cache":"MISS",
                "x-cache-hits":"0",
                "x-request-id":"822a4e7c-7b02-4e23-a264-701a36b12b20",
                "x-runtime":"0.034694",
                "x-served-by":"cache-nrt18339-NRT",
                "x-timer":"S1622108200.364650,VS0,VE745"
            }
        },
        "ok":true,
        "status":200,
        "statusText":"",
        "type":"default",
        "url":"https://flybuy.radiusnetworks.com/api/v1/events"
}
```