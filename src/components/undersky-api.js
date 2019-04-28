import axios from 'axios';
import jwt from 'jsonwebtoken';
import Vue from 'vue';

function query(queryString, authed) {
  const endpoint = process.env.VUE_APP_API_ENDPOINT;
  const configs = {
    headers: {
      'Content-Type': 'application/graphql',
    },
  };
  if (authed) {
    const accessToken = Vue.localStorage.get('undersky.auth.accessToken');
    const secretToken = Vue.localStorage.get('undersky.auth.secretToken');
    const jwtToken = jwt.sign({ accessToken }, secretToken);
    configs.headers.Authorization = `Bearer ${jwtToken}`;
  }

  return axios.post(`${endpoint}/graphql`, `query{${queryString}}`, configs).then((res) => {
    if (res.data.errors) {
      throw res.data.errors;
    }
    return res.data.data;
  });
}

function mutation(mutateString, authed) {
  const endpoint = process.env.VUE_APP_API_ENDPOINT;
  const configs = {
    headers: {
      'Content-Type': 'application/graphql',
    },
  };
  if (authed) {
    const accessToken = Vue.localStorage.get('undersky.auth.accessToken');
    const secretToken = Vue.localStorage.get('undersky.auth.secretToken');
    const jwtToken = jwt.sign({ accessToken }, secretToken);
    configs.headers.Authorization = `Bearer ${jwtToken}`;
  }

  return axios.post(`${endpoint}/graphql`, `mutation{${mutateString}}`, configs).then((res) => {
    if (res.data.errors) {
      throw res.data.errors;
    }
    return res.data.data;
  });
}

export { query, mutation };
