import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || 'your-google-api-key';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/oauth2/v2/rest';
const SCOPES = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

let gapi_inited = false;
let gis_inited = false;

export const initializeGapi = async () => {
  if (gapi_inited) return;
  
  await new Promise((resolve) => {
    gapi.load('client', resolve);
  });
  
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  
  gapi_inited = true;
};

export const initializeGis = async () => {
  if (gis_inited) return;
  
  return new Promise((resolve) => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: resolve,
    });
    gis_inited = true;
  });
};

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject(new Error('Google API not loaded'));
      return;
    }

    window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        if (response.access_token) {
          resolve(response.access_token);
        } else {
          reject(new Error('Failed to get access token'));
        }
      },
    }).requestAccessToken();
  });
};

export const getUserInfo = async (accessToken) => {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const revokeToken = async (accessToken) => {
  try {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    console.error('Error revoking token:', error);
  }
};

