# QuickGPT API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:3000/api`

## Description

QuickGPT is a full-stack AI-powered SaaS application that enables users to engage in intelligent conversations and generate creative assets. Built with the MERN stack (MongoDB, Express, React, Node.js), it integrates cutting-edge AI models to provide text generation and image synthesis capabilities. The platform features a robust credit-based system, secure user authentication, and seamless payment processing via Stripe, offering a premium and interactive experience for users to explore the power of generative AI.

## Overview

The QuickGPT API provides the backend infrastructure for the QuickGPT application, handling user authentication, chat management, AI text/image generation, and credit transaction processing via Stripe.

## Authentication

Authentication is managed via JSON Web Tokens (JWT). Most endpoints require a valid token to be included in the request headers.

- **Header Key:** `Authorization`
- **Header Value:** `<your_token_string>`  
  *(Note: The current implementation accepts the raw token string without the `Bearer` prefix.)*

## Response Format

Standard API responses follow a consistent JSON structure:

**Success:**
```json
{
  "success": true,
  "data": { ... } // or distinct keys like "token", "reply", "user"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## Endpoints

### 1. User Management
Base Path: `/api/user`

| Method | Endpoint            | Auth | Description                                      | Request Body Params |
| :----- | :------------------ | :--- | :----------------------------------------------- | :------------------ |
| `POST` | `/register`         | No   | Register a new user account.                       | `name`, `email`, `password` |
| `POST` | `/login`            | No   | Authenticate a user and receive a JWT.           | `email`, `password` |
| `GET`  | `/data`             | **Yes** | Retrieve profile data for the authenticated user.| N/A |
| `GET`  | `/published-images` | No   | Fetch a feed of images published by the community.| N/A |

### 2. Chat Operations
Base Path: `/api/chat`

| Method | Endpoint  | Auth | Description                                      | Request Body Params |
| :----- | :-------- | :--- | :----------------------------------------------- | :------------------ |
| `GET`  | `/create` | **Yes** | Initialize a new empty chat session.             | N/A |
| `GET`  | `/get`    | **Yes** | Retrieve all chat sessions for the user.         | N/A |
| `POST` | `/delete` | **Yes** | Delete a specific chat session.                  | `id` (Chat ID) |

### 3. AI Messaging
Base Path: `/api/message`

| Method | Endpoint | Auth | Description | Request Body Params |
| :----- | :------- | :--- | :---------- | :------------------ |
| `POST` | `/text`  | **Yes** | Send a text prompt to the LLM (Gemini). | `chatId`, `prompt` |
| `POST` | `/image` | **Yes** | Generate an AI image based on a prompt. | `chatId`, `prompt`, `(optional) isPublished` |

### 4. Credits & Payments
Base Path: `/api/credit`

| Method | Endpoint    | Auth | Description | Request Body Params |
| :----- | :---------- | :--- | :---------- | :------------------ |
| `GET`  | `/plans`    | No   | Retrieve available credit purchase plans. | N/A |
| `POST` | `/purchase` | **Yes** | Initiate a Stripe checkout session for a plan. | `planId` |

### 5. Webhooks
Base Path: `/api`

| Method | Endpoint | Auth | Description | Payload |
| :----- | :------- | :--- | :---------- | :------ |
| `POST` | `/stripe`| No   | Handle Stripe events (e.g., `payment_intent.succeeded`). | Stripe Raw Body |

---

## Error Codes & Handling

The API returns standard HTTP status codes. Common errors include:

- **401 Unauthorized:** Invalid or missing authentication token.
- **404 Not Found:** Resource (e.g., Chat ID) not found.
- **500 Internal Server Error:** Server-side processing failure.
