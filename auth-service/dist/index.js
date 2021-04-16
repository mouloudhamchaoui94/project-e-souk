// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"db/config.json":[function(require,module,exports) {
module.exports = {
  "connectionLimit": 10,
  "password": "mouloud",
  "user": "root",
  "database": "auth_database",
  "host": "localhost",
  "port": "3306"
};
},{}],"db/db.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _config = _interopRequireDefault(require("./config.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let db = _mysql.default.createPool(_config.default);

var _default = db;
exports.default = _default;
},{"./config.json":"db/config.json"}],"db/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("./db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _db.default;
exports.default = _default;
},{"./db":"db/db.js"}],"model/authentificate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authentificate = (email, pass) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Users WHERE email='${email}' and pass='${pass}';`;
    console.log(query);

    _db.default.query(query, (error, elements) => {
      if (error) {
        return reject(error);
      }

      return resolve(elements);
    });
  });
};

var _default = authentificate;
exports.default = _default;
},{"../db":"db/index.js"}],"model/createUser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUser = (email, pass, role) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Users (email,pass,role) VALUES ('${email}','${pass}',${role})`;
    console.log(query);

    _db.default.query(query, (error, elements) => {
      if (error) {
        return reject(error);
      }

      return resolve(elements);
    });
  });
};

var _default = createUser;
exports.default = _default;
},{"../db":"db/index.js"}],"model/checkEmail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkEmail = email => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Users WHERE email='${email}';`;
    console.log(query);

    _db.default.query(query, (error, elements) => {
      if (error) {
        return reject(error);
      }

      return resolve(elements);
    });
  });
};

var _default = checkEmail;
exports.default = _default;
},{"../db":"db/index.js"}],"model/setPassword.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setPassword = (email, pass) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Users SET pass='${pass}' WHERE email='${email}'`;
    console.log(query);

    _db.default.query(query, (error, elements) => {
      if (error) {
        return reject(error);
      }

      return resolve(elements);
    });
  });
};

var _default = setPassword;
exports.default = _default;
},{"../db":"db/index.js"}],"model/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authentificate", {
  enumerable: true,
  get: function () {
    return _authentificate.default;
  }
});
Object.defineProperty(exports, "createUser", {
  enumerable: true,
  get: function () {
    return _createUser.default;
  }
});
Object.defineProperty(exports, "checkEmail", {
  enumerable: true,
  get: function () {
    return _checkEmail.default;
  }
});
Object.defineProperty(exports, "setPassword", {
  enumerable: true,
  get: function () {
    return _setPassword.default;
  }
});

var _authentificate = _interopRequireDefault(require("./authentificate"));

var _createUser = _interopRequireDefault(require("./createUser"));

var _checkEmail = _interopRequireDefault(require("./checkEmail"));

var _setPassword = _interopRequireDefault(require("./setPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./authentificate":"model/authentificate.js","./createUser":"model/createUser.js","./checkEmail":"model/checkEmail.js","./setPassword":"model/setPassword.js"}],"constants/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.privateKey = void 0;
const privateKey = '6m4By6SJu7';
exports.privateKey = privateKey;
},{}],"controller/signin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _model = require("../model");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signin = async (req, res, next) => {
  res.set('content-type', 'application/json'); // Get parameters

  const email = req.query.email;
  const password = req.query.password;

  if (!email || !password) {
    return res.send({
      success: false,
      error: {
        code: 0,
        msg: 'NULL PARAMETER'
      }
    });
  }

  try {
    //Traitements
    let result = await (0, _model.authentificate)(email, password);
    const user = Object.values(JSON.parse(JSON.stringify(result)));

    if (user.length == 0) {
      return res.send({
        success: false,
        error: {
          code: 2,
          msg: 'INCORRECT CREDENTIALS'
        }
      });
    } //console.log(user[0]);


    let token = _jsonwebtoken.default.sign(user[0], _constants.privateKey);

    res.send({
      success: true,
      data: {
        token
      }
    });
  } catch (e) {
    //console.log(e);
    return res.send({
      success: false,
      error: {
        code: 1,
        msg: 'INTERNAL ERROR'
      }
    });
  }
};

var _default = signin;
exports.default = _default;
},{"../model":"model/index.js","../constants":"constants/index.js"}],"controller/signup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("../model");

const signup = async (req, res, next) => {
  res.set('content-type', 'application/json'); // Get parameters

  const email = req.query.email;
  const password = req.query.password;
  let role = req.query.role;

  if (!email || !password || !role) {
    return res.send({
      success: false,
      error: {
        code: 0,
        msg: 'NULL PARAMETER'
      }
    });
  }

  role = parseInt(role);
  let result = null;

  try {
    //Traitements
    result = await (0, _model.createUser)(email, password, role);
    const idUser = result.insertId;
    res.send({
      success: true,
      data: {
        idUser
      }
    });
  } catch (e) {
    console.log(e);

    if (!result) {
      return res.send({
        success: false,
        error: {
          code: 1,
          msg: 'EMAIL ALREADY EXISTS'
        }
      });
    }

    return res.send({
      success: false,
      error: {
        code: 1,
        msg: 'INTERNAL ERROR'
      }
    });
  }
};

var _default = signup;
exports.default = _default;
},{"../model":"model/index.js"}],"controller/recover.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _model = require("../model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recover = async (req, res, next) => {
  res.set('content-type', 'application/json'); // Get parameters

  const token = req.query.jwt;
  const password = req.query.password;

  if (!token || !password) {
    return res.send({
      success: false,
      error: {
        code: 0,
        msg: 'NULL PARAMETER'
      }
    });
  }

  let decoded = null;

  try {
    // Decode jwt
    decoded = _jsonwebtoken.default.decode(token, {
      complete: true
    });
    let result = await (0, _model.setPassword)(decoded.payload.email, password);

    if (result.changedRows == 0) {
      return res.send({
        success: false,
        error: {
          code: 4,
          msg: 'EMAIL ERROR'
        }
      });
    }

    return res.send({
      success: true
    });
  } catch (e) {
    console.log(e);

    if (!decoded) {
      return res.send({
        success: false,
        error: {
          code: 5,
          msg: 'INVALID TOKEN'
        }
      });
    }

    return res.send({
      success: false,
      error: {
        code: 1,
        msg: 'INTERNAL ERROR'
      }
    });
  }
};

var _default = recover;
exports.default = _default;
},{"../model":"model/index.js"}],"controller/askRecover.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _model = require("../model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Il faut autoriser les applications non-sécurisées à se connecter sur GMAIL */
const askRecover = async (req, res, next) => {
  res.set('content-type', 'application/json'); // Get parameters

  const email = req.query.email;

  if (!email) {
    return res.send({
      success: false,
      error: {
        code: 0,
        msg: 'NULL PARAMETER'
      }
    });
  }

  try {
    //Traitements
    let result = await (0, _model.checkEmail)(email);
    const user = Object.values(JSON.parse(JSON.stringify(result)));

    if (user.length == 0) {
      return res.send({
        success: false,
        error: {
          code: 2,
          msg: 'EMAIL DOESN\'T EXISTS'
        }
      });
    } // Envoyer un email à l'utilisateur //
    // *********************************//


    let transporter = _nodemailer.default.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      // true for 465, false for other ports
      auth: {
        user: 'findyourevent2020@gmail.com',
        // generated ethereal user
        pass: 'pc3r2020' // generated ethereal password

      }
    }); // send mail with defined transport object


    let info = await transporter.sendMail({
      from: 'findyourevent2020@gmail.com',
      // sender address
      to: email,
      // list of receivers
      subject: "Hello",
      // Subject line
      text: "Hello world?",
      // plain text body
      html: "<b>Hello world?</b>" // html body

    });
    res.send({
      success: true
    });
  } catch (e) {
    console.log(e);
    return res.send({
      success: false,
      error: {
        code: 1,
        msg: 'INTERNAL ERROR'
      }
    });
  }
};

var _default = askRecover;
exports.default = _default;
},{"../model":"model/index.js"}],"controller/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "signin", {
  enumerable: true,
  get: function () {
    return _signin.default;
  }
});
Object.defineProperty(exports, "signup", {
  enumerable: true,
  get: function () {
    return _signup.default;
  }
});
Object.defineProperty(exports, "recover", {
  enumerable: true,
  get: function () {
    return _recover.default;
  }
});
Object.defineProperty(exports, "askRecover", {
  enumerable: true,
  get: function () {
    return _askRecover.default;
  }
});

var _signin = _interopRequireDefault(require("./signin"));

var _signup = _interopRequireDefault(require("./signup"));

var _recover = _interopRequireDefault(require("./recover"));

var _askRecover = _interopRequireDefault(require("./askRecover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./signin":"controller/signin.js","./signup":"controller/signup.js","./recover":"controller/recover.js","./askRecover":"controller/askRecover.js"}],"routes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _controller = require("./controller");

const routes = [{
  "name": "/signin",
  "controller": _controller.signin,
  "type": "GET"
}, {
  "name": "/signup",
  "controller": _controller.signup,
  "type": "GET"
}, {
  "name": "/askRecover",
  "controller": _controller.askRecover,
  "type": "GET"
}, {
  "name": "/recover",
  "controller": _controller.recover,
  "type": "GET"
}];
var _default = routes;
exports.default = _default;
},{"./controller":"controller/index.js"}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_routes.default.forEach(route => {
  if (route.type == "GET") {
    app.get(route.name, route.controller);
  }

  if (route.type == "POST") {
    app.post(route.name, route.controller);
  }
});

var _default = app;
exports.default = _default;
},{"./routes":"routes.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = '8888';

_app.default.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
},{"./app":"app.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map