const makePost = (url, body, options) => {
  const headers = options.headers || {};

  return fetch(url, { body, headers, method: 'POST' }).then((res) => {
    if (res.statusText === 'No Content') {
      return res;
    }
    return res.json();
  });
};

const makeGet = (url, options) => {
  const urlObj = new URL(url);
  const params = options.params || {};
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  Object.keys(params).forEach((key) =>
    urlObj.searchParams.append(key, params[key])
  );
  return fetch(urlObj.toString(), { headers }).then((res) => res.json());
};

const makeJSONPost = (url, data, options) => {
  const body = JSON.stringify(data);
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';

  return makePost(url, body, { headers });
};

export const getAuth0Token = () => {
  const url = 'https://colresin.us.auth0.com/oauth/token';
  const headers = { 'content-type': 'application/json' };
  const body = {
    client_id: 'hQwa4VMPZyehPJQmVSLIDdKPm0PXN1J1',
    client_secret:
      'XWj1Kt7tiSVJW78bCS8Ao_dBBTrawQFOam4KxUS5lbzD4CodNV-AEPEuYDtxKOQv',
    audience: 'https://colresin.us.auth0.com/api/v2/',
    grant_type: 'client_credentials',
  };
  return makeJSONPost(url, body, headers);
};

export const createUser = (data) => {
  const url = `/api/auth0/users`;
  const headers = {};
  const body = { data };
  return makeJSONPost(url, body, headers);
};

export const getUserEnterpriseAuth0 = async (id) => {
  const { accessToken, tokenType } = await getAuth0Token().then((res) => res);
  const url = `https://colresin.us.auth0.com/api/v2/users/${id}?fields=user_metadata`;
  const headers = { Authorization: `${tokenType} ${accessToken}` };
  return makeGet(url, { headers });
};

export const getUsersAuth0 = (token, tokenType) => {
  const url = `https://colresin.us.auth0.com/api/v2/users`;
  const headers = { Authorization: `${tokenType} ${token}` };
  return makeGet(url, { headers });
};

export const getAllUsers = () => {
  const url = `/api/auth0/users/`;
  const headers = {};
  return fetch(url, { headers }).then((res) => res.json());
};

export const createUserAuth0 = (data, token, tokenType) => {
  const url = `https://colresin.us.auth0.com/api/v2/users`;
  const headers = { Authorization: `${tokenType} ${token}` };
  const body = data;
  return makeJSONPost(url, body, { headers });
};

export const postEmail = (data: any) => {
  const url = '/api/sendmail/';
  const headers = '';
  return makeJSONPost(url, data, { headers });
};
