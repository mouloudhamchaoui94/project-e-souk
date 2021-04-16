import {
  signin,
  signup,
  askRecover,
  recover,
} from './controller';

const routes = [
  {
    "name": "/signin",
    "controller": signin,
    "type": "GET"
  },
  {
    "name": "/signup",
    "controller": signup,
    "type": "GET"
  },
  {
    "name": "/askRecover",
    "controller": askRecover,
    "type": "GET"
  },
  {
    "name": "/recover",
    "controller": recover,
    "type": "GET"
  }
];

export default routes;