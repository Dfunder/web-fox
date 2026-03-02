# Environment Configuration

This directory contains environment variable configuration for the application.

## Usage

Import the environment variables in your components:

```javascript
import ENV_VARS from '@/config/env';

// Use the variables
const apiUrl = ENV_VARS.API_BASE_URL;
const network = ENV_VARS.STELLAR_NETWORK;
```

## Setup

1. Copy `.env.example` to `.env.local`
2. Fill in your actual values in `.env.local`
3. The app will validate required variables on startup

## Available Variables

- `API_BASE_URL` - Base URL for API requests
- `STELLAR_NETWORK` - Stellar network (testnet/mainnet)
- `CAMPAIGN_CONTRACT_ID` - Campaign smart contract ID
- `DONATION_CONTRACT_ID` - Donation smart contract ID
