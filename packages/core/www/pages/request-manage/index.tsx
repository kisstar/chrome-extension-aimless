import React from 'react';
// import './request-interceptor'

const script = document.createElement('script');

script.src = 'https://cdn.bootcdn.net/ajax/libs/axios/1.7.2/axios.js';
script.type = 'text/javascript';
document.body.appendChild(script);

script.onload = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const axios = (window as any).axios;

  axios.get('http://localhost:3000/').then(console.log);
};

// axios.get('https://dog.ceo/api/breeds/image/random').then(console.log);
// fetch('https://dog.ceo/api/breeds/image/random')
//   .then((res) => res.json())
//   .then(console.log);

const RequestManagePage: React.FC = () => {
  return <></>;
};

export default RequestManagePage;
