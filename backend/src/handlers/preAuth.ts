import {
  Callback,
  Context,
  PreAuthenticationTriggerEvent,
  PreTokenGenerationAuthenticationTriggerEvent,
} from 'aws-lambda';

export const handler = async (
  event: PreAuthenticationTriggerEvent,
  context: Context,
  callback: Callback<unknown>
) => {
  if (event.request.userAttributes['email']?.endsWith('@agiledigital.com.au')) {
    console.log('Authentication Success: ', event.request);
    callback(undefined, event);
  } else {
    console.log('Authentication Failed: ', event.request);
    callback('Need to be part of Agile Digital', event);
  }
};
