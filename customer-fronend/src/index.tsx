import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { cleanEnv, str } from 'envalid';
import { configureAmplify } from 'amplify-redux-auth';
import { Auth } from '@aws-amplify/auth';

const parsedEnv = cleanEnv(process.env, {
  REACT_APP_AWS_REGION: str({ default: 'ap-southeast-2' }),
  REACT_APP_COGNITO_IDENTITY_ID: str(),
  REACT_APP_COGNITO_USER_POOL_ID: str(),
  REACT_APP_COGNITO_WEB_CLIENT_ID: str(),
});
const awsAmplifyConfig = {
  Auth: {
    region: parsedEnv.REACT_APP_AWS_REGION,
    identityPoolId: parsedEnv.REACT_APP_COGNITO_IDENTITY_ID,
    userPoolId: parsedEnv.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: parsedEnv.REACT_APP_COGNITO_WEB_CLIENT_ID,
    redirectSignIn: 'http://localhost:3000',
    redirectSignOut: 'http://localhost:3000',
  },
};
configureAmplify(awsAmplifyConfig);
Auth.configure({
  oauth: {
    domain: 'agiledigital-fedex-crm.auth.ap-southeast-2.amazoncognito.com',
    scope: ['email', 'profile', 'openid'],
    redirectSignIn: 'http://localhost:3000',
    redirectSignOut: 'http://localhost:3000',
    responseType: 'token',
  },
});
// const AuthorisedApp = withAuthenticator(App, false);

ReactDOM.render(<App />, document.getElementById('root'));
