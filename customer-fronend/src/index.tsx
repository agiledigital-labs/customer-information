import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { cleanEnv, str } from "envalid";
import AmplifyReduxAuth, { configureAmplify } from "amplify-redux-auth";
import { Provider } from "react-redux";
import { createAdminStore } from "ra-core";

const parsedEnv = cleanEnv(process.env, {
  REACT_APP_AWS_REGION: str({ default: "ap-southeast-2" }),
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
  },
};
configureAmplify(awsAmplifyConfig);
// const AuthorisedApp = withAuthenticator(App, false);

ReactDOM.render(<App />, document.getElementById("root"));
