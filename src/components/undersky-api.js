import axios from 'axios';

function query(queryString) {
  const endpoint = process.env.VUE_APP_API_ENDPOINT;
  const configs = {
    headers: {
      'Content-Type': 'application/graphql',
    },
  };

  return axios.post(`${endpoint}/graphql`, `query{${queryString}}`, configs).then((res) => {
    if (res.data.errors) {
      throw res.data.errors;
    }
    return res.data.data;
  });
}

function mutation(mutateString) {
  const endpoint = process.env.VUE_APP_API_ENDPOINT;
  const configs = {
    headers: {
      'Content-Type': 'application/graphql',
    },
  };

  return axios.post(`${endpoint}/graphql`, `mutation{${mutateString}}`, configs).then((res) => {
    if (res.data.errors) {
      throw res.data.errors;
    }
    return res.data.data;
  });
}

export { query, mutation };
