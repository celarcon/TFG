import axios from 'axios';

export var login = admin => {
  return axios
    .post('admin/login', {
      name: admin.name,
      password: admin.password
    })
    .then(res=> {
      console.log(res.data);
      if (typeof res.data === 'string'){
      localStorage.setItem('admintoken', res.data);
      } else {
        console.log("password incorrect");
      }
      return res.data;
    })
    .catch(err => {
      return console.log(err);
    })
};

export var getProfile = admin => {
  return axios
    .get('admin/profile', {
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