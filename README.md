# (Dummy) Online Shopping Site RESTful API
(Dummy)Online Shopping Site RESTful API. follows MVC architecture and implements CRUD operation.

URL : http://quackcart-api.herokuapp.com/

## Table of Content

### User routes
* [Sign up user](#sign-up-user).
* [Sign in user](#sign-in-user).

### Product routes
* [Get all products](#get-all-products).
* [Get a single product](#get-a-single-product).

#### Protected routes
* [Add new product](#add-new-product).
* [Update product](#update-existing-product).
* [Delete product](#delete-existing-product).

### Order routes
* [Get all orders](#get-all-orders).
* [Get a single order](#get-a-single-order).
#### Protected routes
* [Add new order](#add-new-order).
* [Update new order](#update-existing-order).
* [Delete new order](#delete-existing-order).

## API Documentation.

### Sign up user

Sign up for service

#### Request

``` http://quackcart-api.herokuapp.com/user/signup/ ```

``` 
Headers
Content-Type : application/json

HTTP method
POST
```
```javascript
{
    "email" : string,
    "password" : string
}
```
#### Response

```javascript
{
    "message": string
}
```

### Sign in user

Sign in for service

#### Request

```http://quackcart-api.herokuapp.com/user/signin/ ```

``` 
Headers
Content-Type : application/json

HTTP method
POST
```

```javascript
{
    "email" : string,
    "password" : string
}
```
#### Response

```javascript
{
    "message": string,
    "token": string
}
```

```Note : Token will expire in 1 hour```


### Get all products

Return all products from the database

#### Request

``` http://quackcart-api.herokuapp.com/products/ ```

``` 
Headers
Content-Type : application/json

HTTP method
GET
```
#### Response

```javascript
{
    "count": int,
    "message": string,
    "products": array
}
```

### Get a single product

Return single product from the database

#### Request

``` http://quackcart-api.herokuapp.com/products/:id ```

``` 
Headers
Content-Type : application/json

HTTP method
GET
```
#### Response

```javascript
{
    "message": string,
    "product": {
        "_id": string,
        "name": string,
        "price": int
    }
}
```
### Protected routes, you need an API key. You can get it one by [signing in](#sign-in-user) or [signing up](#sign-up-user) for service.


### Add new product

Add new product into database

#### Request

``` http://quackcart-api.herokuapp.com/products/ ```

``` 
Headers
Content-Type : application/x-www-form-urlencoded
Authorization : Bearer [API key]

HTTP method
POST
```

#### Body (form-data)
```
"name" : string
"price" : string
```

#### Response

```javascript
{
    "message" : string,
    "product" : {
        "_id" : string,
        "name" : string,
        "price" : int,
        "__v" : int
    }
}
```


### Update existing product

Update existing product into database

#### Request

``` http://quackcart-api.herokuapp.com/products/:id ```

``` 
Headers
Content-Type : application/x-www-form-urlencoded
Authorization : Bearer [API key]

HTTP method
PATCH
```

#### Body (form-data)
```
"name" : string
"price" : string
```

#### Response

```javascript
{
    "message" : string,
    "product" : {
        "_id" : string,
        "name" : string,
        "price" : string,
        "__v" : int
    }
}
```

### Delete existing product

Delete product from database

#### Request

``` http://quackcart-api.herokuapp.com/products/:id ```

``` 
Headers
Content-Type : application/json
Authorization : Bearer [API key]

HTTP method
DELETE
```

#### Response

```javascript
{
    "message" : string,
    "product" : {
        "_id" : string,
        "name" : string,
        "price" : string,
        "__v" : int
    }
}
```

### Get all orders

Return all orders from the database

#### Request

```http://quackcart-api.herokuapp.com/orders/ ```

``` 
Headers
Content-Type : application/json [optional]

HTTP method
GET
```
#### Response

```javascript
{
    "count": int,
    "message": string,
    "orders": array
}
```

### Get a single order

Return single order from the database

#### Request

``` http://quackcart-api.herokuapp.com/orders/:id ```

``` 
Headers
Content-Type : application/json [optional]

HTTP method
GET
```
#### Response

```javascript
{
    "message": string,
    "order": {
        "quantity": int,
        "_id": string,
        "productID": string
    }
}
```
### Protected routes, you need an API key. You can get it one by [signing in](#sign-in-user) or [signing up](#sign-up-user) for service.


### Add new order

Add new order into database

#### Request

``` http://quackcart-api.herokuapp.com/orders/ ```

``` 
Headers
Content-Type : application/json
Authorization : Bearer [API key]

HTTP method
POST
```

#### Body (raw)
```javascript
{
	"productID" : string,
	"qauntity" : string
}
```

#### Response

```javascript
{
    "message": string,
    "order": {
        "quantity": int,
        "_id": string,
        "productID": string,
        "__v": int
    }
}
```

### Update existing order

Update existing order into database

#### Request

``` http://quackcart-api.herokuapp.com/orders/:id ```

``` 
Headers
Content-Type : application/json
Authorization : Bearer [API key]

HTTP method
POST
```

#### Body (raw)
```javascript
{
	"productID" : string,
	"qauntity" : string
}
```

#### Response

```javascript
{
    "message": string,
    "order": {
        "quantity": int,
        "_id": string,
        "productID": string,
        "__v": int
    }
}
```

### Delete existing order

Delete order from database

#### Request

``` http://quackcart-api.herokuapp.com/orders/:id ```

``` 
Headers
Content-Type : application/json
Authorization : Bearer [API key]

HTTP method
DELETE
```

#### Response

```javascript
{
    "message": string
}
```

