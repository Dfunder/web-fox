/**
 * Environment configuration with validation and fallback defaults
 */

const ENV_VARS = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  STELLAR_NETWORK: import.meta.env.VITE_STELLAR_NETWORK || 'testnet',
  CAMPAIGN_CONTRACT_ID: import.meta.env.VITE_CAMPAIGN_CONTRACT_ID || '',
  DONATION_CONTRACT_ID: import.meta.env.VITE_DONATION_CONTRACT_ID || '',
};

// Required environment variables
const REQUIRED_VARS = [
  'VITE_API_BASE_URL',
  'VITE_STELLAR_NETWORK',
  'VITE_CAMPAIGN_CONTRACT_ID',
  'VITE_DONATION_CONTRACT_ID',
];

/**
 * Validates required environment variables and logs warnings for missing ones
 */
export function validateEnv() {
  const missing = [];
  
  REQUIRED_VARS.forEach((varName) => {
    if (!import.meta.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    console.warn(
      '⚠️  Missing required environment variables:\n' +
      missing.map(v => `   - ${v}`).join('\n') +
      '\n\nPlease check your .env.local file and ensure all required variables are set.'
    );
  }

  return missing.length === 0;
}

export default ENV_VARS;
