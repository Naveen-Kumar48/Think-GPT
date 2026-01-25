# QuickGPT Backend API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

Most routes are protected and require a valid JWT token.
Pass the token in the `Authorization` header.

**Header Format:**
```
Authorization: <your_jwt_token_string>
```
*(Note: Do not include "Bearer " prefix, just the token string directly)*

---

## 1. User Routes (`/api/user`)

### Register User
Create a new user account.
- **Endpoint:** `POST /api/user/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Login User
Authenticate an existing user.
- **Endpoint:** `POST /api/user/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Get User Profile
Get details of the currently logged-in user.
- **Endpoint:** `GET /api/user/data`
- **Headers:** `Authorization: <token>`
- **Response:**
  ```json
  {
    "success": true,
    "user": {
      "_id": "6794...",
      "name": "John Doe",
      "email": "john@example.com",
      "credits": 5,
      ...
    }
  }
  ```

### Get Published Images
Get a list of images published by users.
- **Endpoint:** `GET /api/user/published-images`
- **Response:**
  ```json
  {
    "success": true,
    "images": [
      {
        "imageUrl": "https://ik.imagekit.io/...",
        "userName": "John Doe"
      }
    ]
  }
  ```

---

## 2. Chat Routes (`/api/chat`)

### Create New Chat
Initialize a new chat session.
- **Endpoint:** `GET /api/chat/create`
- **Headers:** `Authorization: <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Chat  created "
  }
  ```

### Get All Chats
Retrieve all chat sessions for the logged-in user.
- **Endpoint:** `GET /api/chat/get`
- **Headers:** `Authorization: <token>`
- **Response:**
  ```json
  {
    "success": true,
    "chats": [
      {
        "_id": "6794...",
        "name": "New chat",
        "messages": [],
        ...
      }
    ]
  }
  ```

### Delete Chat
Delete a specific chat session.
- **Endpoint:** `POST /api/chat/delete`
- **Headers:** `Authorization: <token>`
- **Body:**
  ```json
  {
    "id": "6794..."  // The _id of the chat to delete
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Chat deleted successfully"
  }
  ```

---

## 3. Message Routes (`/api/message`)

### Send Text Message
Send a text prompt to the AI and get a text response.
- **Endpoint:** `POST /api/message/text`
- **Headers:** `Authorization: <token>`
- **Body:**
  ```json
  {
    "chatId": "6794...",
    "prompt": "Hello AI, how are you?"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "reply": {
      "role": "model",
      "content": "I am doing well, thank you!",
      "timestamp": 1700000000000,
      "isImage": false
    }
  }
  ```

### Generate Image
Send a prompt to generate an image.
- **Endpoint:** `POST /api/message/image`
- **Headers:** `Authorization: <token>`
- **Body:**
  ```json
  {
    "chatId": "6794...",
    "prompt": "A futuristic city skyline",
    "isPublished": false
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "reply": {
      "role": "assistant",
      "content": "https://ik.imagekit.io/...",
      "timestamp": 1700000000000,
      "isImage": true,
      "isPublished": false
    }
  }
  ```

---

## Step-by-Step Usage Flow

Follow this sequence to test the complete flow:

1.  **Register or Login:**
    *   Send a POST request to `/api/user/register` or `/api/user/login`.
    *   **Copy the `token`** from the response. You will need this for all subsequent steps.

2.  **Create a Chat:**
    *   Send a GET request to `/api/chat/create` with the header `Authorization: <your_token>`.
    *   (Note: Use GET, not POST, as per current implementation).

3.  **Get Chat ID:**
    *   Send a GET request to `/api/chat/get` with the header `Authorization: <your_token>`.
    *   Look at the response array. Pick the `_id` of the chat you just created (e.g., the first one or latest one).

4.  **Send a Message:**
    *   **Text:** Send a POST request to `/api/message/text` with `Authorization: <your_token>` and body:
        ```json
        {
          "chatId": "<paste_chat_id_here>",
          "prompt": "Tell me a joke"
        }
        ```
    *   **Image:** Send a POST request to `/api/message/image` with body:
        ```json
        {
          "chatId": "<paste_chat_id_here>",
          "prompt": "A cat in space"
        }
        ```

**Troubleshooting:**
*   **"Cannot read properties of null (reading 'messages')"**: This happens if the `chatId` you provided in step 4 does not exist or doesn't belong to the user. Make sure you are using a valid `_id` obtained from step 3.
