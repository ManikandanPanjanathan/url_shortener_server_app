const geoip = require('geoip-lite');
const generateGeoLocationDetails = async (ip) => {
    let userIp = ip;

    if (userIp === '::1' || userIp === '127.0.0.1') {
        return 'Geolocation not available for localhost';
    }

    const geoResponse = geoip.lookup(userIp);
    const geoData = geoResponse;

    if (!geoData) {
        return 'Could not determine geolocation';
    }

    const geoDataInformations = { country: geoData?.country, region: geoData?.region, city: geoData?.city }

    return geoDataInformations;
};


module.exports = generateGeoLocationDetails;