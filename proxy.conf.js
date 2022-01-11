const PROXY_CONFIG = {
  '/openmrs/': {
    target: process.env.OPENMRS_HOST_URL,
    secure: process.env.OPENMRS_SECURE || false,
    changeOrigin: true
  }
};

module.exports = PROXY_CONFIG;
