import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://vuondau-keycloak.amazingtech.vn/auth/',
  realm: 'vuondau-application',
  clientId: 'vuondau',
});

export default keycloak;
