# PS5Alerts

1. Refreshes sites until a PS5 becomes available
2. Sends a text if a site has a PS5 available

Currently checks Amazon, Argos, Game , Smyths and Very for changes in the product page/response.

# Requirements

This project requires some environment variables. It uses AWS SNS to send text alerts.
Create a `.env` file in the root of this project with the following environment variables:

```env
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
AWS_REGION=YOUR_REGION
PHONE_NUMBER=YOUR_PHONE_NUMBER
```

# Installation

```
npm install
```

# Run

Runs with text alerts enabled
```
make start
```

Runs with text alerts disabled
```
make test
```