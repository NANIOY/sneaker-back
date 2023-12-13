# Sneakers API Documentation

## Introduction

Welcome to the API documentation for the Sneaker API. This document provides details on the available endpoints, their purposes, and examples of requests.

## Base URL

All API requests should be made to the following base URL:
``https://sneaker-back.onrender.com/api/v1/``


## Endpoints

### User Operations

#### 1. Create a New User

- **URL:** `users/`

- **Method:** `POST`

- **Request Body Example:**
```json
{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password",
  "isAdmin": false
}
```

#### 2. Get All Users

- **URL:** `users/`

- **Method:** `GET`

#### 3. Delete a User

- **URL:** `users/:userId`

- **Method:** `DELETE`

#### 4. Update User Password

- **URL:** ``users/password``

- **Method:** ``PUT`` or ``PATCH``

- **Request Body Example:**
```json
{
  "currentPassword": "your_current_password",
  "newPassword": "your_new_password"
}
```

#### 5. Update User Details
- **URL:** ``users/info``

- **Method:** ``PUT`` or ``PATCH``

- **Request Body Example:**
```json
{
  "username": "new_username",
  "email": "new_email@example.com"
}
```
#### 6. Get User Profile

- **URL:** ``users/profile``

- **Method:** ``GET``

### Authentication Operations
#### 1. User Login

- **URL:** ``auth/login``

- **Method:** ``POST``

- **Request Body Example:**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```
#### 2. User Logout

- **URL:** ``auth/logout``

- **Method:** ``POST``

#### Shoe Operations
#### 1. Get All Shoe Orders

- **URL:** ``shoes/``

- **Method:** ``GET``
#### 2. Create a New Shoe Order

- **URL:** ``shoes/``

- **Method:** ``POST``

- **Request Body Example:**
```json
{
  "color": "shoe_color",
  "size": 8,
  "lacesColor": "laces_color",
  "soleColor": "sole_color",
  "logoColor": "logo_color",
  "pattern": "shoe_pattern",
  "contactInfo": "contact_email@example.com"
}
```
#### 3. Get Shoe Order by ID

- **URL:** ``shoes/:shoeId``

- **Method:** ``GET``
#### 4. Delete a Shoe Order

- **URL:** ``shoes/:shoeId``

- **Method:** ``DELETE``
#### 5. Update Shoe Order

- **URL:** ``shoes/:shoeId``

- **Method:** ``PUT`` or ``PATCH``

- **Request Body Example:**
```json
{
  "status": "Shipped"
}
```

## Rate Limiting
Certain endpoints have rate limiting applied to prevent abuse. Ensure compliance with the rate limits to avoid getting blocked.
