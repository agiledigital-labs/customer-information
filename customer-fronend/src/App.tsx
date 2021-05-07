import React from 'react';
import Auth from '@aws-amplify/auth';
import { AuthProvider, Resource } from 'ra-core';
import { Admin, fetchUtils } from 'react-admin';
import postgrestRestProvider from '@raphiniert/ra-data-postgrest';
import { UsersCreate, UsersEdit, Users } from './pages/Users';
import AmplifyReduxAuth, { authSagas, authState } from 'amplify-redux-auth';
import axios from 'axios';
import { People, PeopleCreate, PeopleEdit, PeopleShow } from './pages/People';
import { Notes, NotesCreate, NotesEdit, NotesShow } from './pages/Notes';
import {
  Organisation,
  OrganisationCreate,
  OrganisationEdit,
  OrganisationShow,
} from './pages/Organisation';
import {
  Employment,
  EmploymentCreate,
  EmploymentEdit,
  EmploymentShow,
} from './pages/Employment';

const authProvider: AuthProvider = {
  login: async () => undefined,
  logout: async () => Auth.signOut(),
  checkAuth: async () => Auth.currentAuthenticatedUser(),
  checkError: async () => undefined,
  getPermissions: async () => Auth.currentAuthenticatedUser(),
};

const CustomLoginPage = () => {
  Auth.federatedSignIn();

  return <></>;
};

const LoginPage = () => (
  <AmplifyReduxAuth logoText={'My Logo'} AuthComponent={<CustomLoginPage />}>
    Logged in!
  </AmplifyReduxAuth>
);

const httpClient = async (url: string, options = {}) => {
  // @ts-ignore
  if (!options.headers) {
    // @ts-ignore
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const test = await Auth.currentAuthenticatedUser();
  const token = await test.getSignInUserSession().getIdToken().getJwtToken();
  console.log(token);
  // add your own headers here
  // @ts-ignore
  options.headers.set('X-Custom-Header', 'foobar');
  // @ts-ignore
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const App = () => {
  return (
    <>
      <Admin
        loginPage={LoginPage}
        customReducers={{ authState }}
        customSagas={[authSagas]}
        dataProvider={postgrestRestProvider(
          'https://poqhfgyide.execute-api.ap-southeast-2.amazonaws.com',
          httpClient
        )}
        authProvider={authProvider}
      >
        <Resource
          name="users"
          list={Users}
          create={UsersCreate}
          edit={UsersEdit}
        />
        <Resource
          name={'people'}
          list={People}
          create={PeopleCreate}
          edit={PeopleEdit}
          show={PeopleShow}
        />
        <Resource
          name={'notes'}
          list={Notes}
          create={NotesCreate}
          edit={NotesEdit}
          show={NotesShow}
        />
        <Resource
          name={'organisation'}
          list={Organisation}
          create={OrganisationCreate}
          edit={OrganisationEdit}
          show={OrganisationShow}
        />
        <Resource
          name={'employment'}
          list={Employment}
          create={EmploymentCreate}
          edit={EmploymentEdit}
          show={EmploymentShow}
        />
      </Admin>
    </>
  );
};

export default App;
