import axios from 'axios';

export var register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered');
    })
};

export var login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(res=> {
      console.log(res.data);
      if (typeof res.data === 'string'){
      localStorage.setItem('usertoken', res.data);
      } else {
        console.log("password incorrect");
      }
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    })
};

export var getProfile = user => {
  return axios
    .get('users/profile', {
      headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};