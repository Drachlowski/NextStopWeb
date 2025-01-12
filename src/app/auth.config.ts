import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  /* // Url of the Identity Provider
  issuer: 'https://steyer-identity-server.azurewebsites.net/identity',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'spa-demo',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email voucher', */

  issuer: 'http://localhost:8080/realms/wea5',
  loginUrl: 'http://localhost:8080/realms/wea5/protocol/openid-connect/auth',
  logoutUrl: 'http://localhost:8080/realms/wea5/protocol/openid-connect/logout',
  tokenEndpoint: 'http://localhost:8080/realms/wea5/protocol/openid-connect/token',
  sessionCheckIFrameUrl: 'http://localhost:8080/realms/wea5/protocol/openid-connect/login-status-iframe.html',
  userinfoEndpoint: 'http://localhost:8080/realms/wea5/protocol/openid-connect/userinfo',
  clientId: 'nextstop',
  redirectUri: 'http://localhost:7003', //window.location.origin + '/index.html',
  silentRefreshRedirectUri: 'http://localhost:7003', //window.location.origin + '/silent-refresh.html',
  scope: 'profile email',
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040
}
