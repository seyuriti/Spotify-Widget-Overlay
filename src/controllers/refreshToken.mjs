import config from "../config.mjs";

const refreshToken = async () => {
  while (true) {
    console.log('Refreshing token...');
    await new Promise(resolve => setTimeout(resolve, config.refreshInterval));
  }
};