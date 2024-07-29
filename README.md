# Pet Management API Documentation

## Introduction

This API allows you to manage your client pet's data. Including creating, updating, deleting and retrieving pet and owner data. It is designed to support applications that need to manage pet data, such as pet adoption services, veterinary applications or pet shops.

## Base URL

The base URL for the API is: `example.pets.com/api/`.
This URL is the root from which all endpoint paths will branch off. Make sure to use this base URL when making requests to the API.

## Authentication

This API uses token-based authentication. To authenticate, you must include an `Authorization` header in the request with the token provided by the /login endpoint.

## Endpoints

### Create pet

-**Method**: POST -**Endpoint**: `/pets` -**Description**: Create a new pet.

#### Request Body

```json
{
  "name": "string",
  "species": "string",
  "breed": "string",
  "age": "number",
  "owner_id": "number"
}
```

#### Response Body

```json
{
  "id":"number",
  "name":"string",
  "species":"string",
  "age":"number",
  "owner_id":"number
}
```
