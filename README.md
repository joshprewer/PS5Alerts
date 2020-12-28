# PS5Bot

1. Refreshes sites until a PS5 becomes available
2. Sends a text if a site has a PS5 available

# Requirements

This project requires some environment variables. It uses Vonage to send texts of attempted purchases so an Vonage account and API secret and key is needed.
Create a `.env` file in the root of this project with the following environment variables:

```env
PHONE_NUMBER
VONAGE_API_SECRET
VONAGE_API_KEY
```

# Installation

```
npm install
```

# Run

```
npm start
```