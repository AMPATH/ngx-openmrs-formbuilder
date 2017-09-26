webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/Services/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentication_service__ = __webpack_require__("../../../../../src/app/Services/authentication.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardService = (function () {
    function AuthGuardService(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    AuthGuardService.prototype.checkLogin = function (url) {
        if (this.authService.isLoggedIn) {
            return true;
        }
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    };
    return AuthGuardService;
}());
AuthGuardService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AuthGuardService);

var _a, _b;
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__("../../../../../src/app/Services/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__session_storage_service__ = __webpack_require__("../../../../../src/app/Services/session-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__("../../../../../src/app/Services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthenticationService = (function () {
    function AuthenticationService(sessionStorageService, sessionService) {
        this.sessionStorageService = sessionStorageService;
        this.sessionService = sessionService;
        this.isLoggedIn = false;
        this.redirectUrl = '';
        this.baseUrl = new __WEBPACK_IMPORTED_MODULE_4_rxjs__["BehaviorSubject"]('');
        this.credentials = new __WEBPACK_IMPORTED_MODULE_4_rxjs__["BehaviorSubject"]('');
        if (this.sessionStorageService.getItem(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].CREDENTIALS_KEY) != null && this.sessionStorageService.getItem(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].BASE_URL) != null) {
            this.setCredentialsSubjectEncrypted(this.sessionStorageService.getItem(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].CREDENTIALS_KEY));
            this.setBaseUrl(this.sessionStorageService.getItem(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].BASE_URL));
            this.isLoggedIn = true;
        }
    }
    AuthenticationService.prototype.authenticate = function (username, password, baseUrl) {
        var _this = this;
        var credentials = {
            username: username,
            password: password
        };
        var request = this.sessionService.getSession(credentials, baseUrl);
        request.subscribe(function (response) {
            var data = response.json();
            if (data.authenticated) {
                _this.isLoggedIn = true;
                _this.setCredentials(username, password, baseUrl);
                // store logged in user details in session storage
                var user = data.user;
                _this.storeUser(user);
            }
            else {
                _this.isLoggedIn = false;
            }
        });
        return request;
    };
    AuthenticationService.prototype.logOut = function () {
        var _this = this;
        this.isLoggedIn = false;
        var response = this.sessionService.deleteSession();
        response
            .subscribe(function (res) {
            _this.clearSessionCache();
        }, function (error) {
            _this.clearSessionCache();
        });
        return response;
    };
    AuthenticationService.prototype.clearSessionCache = function () {
        this.clearCredentials();
        this.clearUserDetails();
    };
    AuthenticationService.prototype.setCredentials = function (username, password, baseUrl) {
        var base64 = btoa(username + ':' + password);
        this.sessionStorageService.setItem(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].CREDENTIALS_KEY, base64);
        this.sessionStorageService.setItem(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].BASE_URL, baseUrl);
    };
    AuthenticationService.prototype.clearCredentials = function () {
        this.sessionStorageService.remove(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].CREDENTIALS_KEY);
    };
    AuthenticationService.prototype.storeUser = function (user) {
        this.sessionStorageService.setObject(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].USER_KEY, user);
    };
    AuthenticationService.prototype.clearUserDetails = function () {
        this.sessionStorageService.remove(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Constants */].USER_KEY);
    };
    AuthenticationService.prototype.setBaseUrl = function (baseUrl) {
        this.baseUrl.next(baseUrl);
    };
    AuthenticationService.prototype.getBaseUrl = function () {
        return this.baseUrl.asObservable();
    };
    AuthenticationService.prototype.setCredentialsSubject = function (username, password) {
        var base64 = btoa(username + ':' + password);
        this.credentials.next(base64);
    };
    AuthenticationService.prototype.setCredentialsSubjectEncrypted = function (base64) {
        this.credentials.next(base64);
    };
    AuthenticationService.prototype.getCredentialsSubject = function () {
        return this.credentials.asObservable();
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__session_storage_service__["a" /* SessionStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__session_storage_service__["a" /* SessionStorageService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__session_service__["a" /* SessionService */]) === "function" && _b || Object])
], AuthenticationService);

var _a, _b;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/concept.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__session_storage_service__ = __webpack_require__("../../../../../src/app/Services/session-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_constants__ = __webpack_require__("../../../../../src/app/Services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConceptService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConceptService = (function () {
    function ConceptService(http, sessionStorageService) {
        this.http = http;
        this.sessionStorageService = sessionStorageService;
        this.data = {};
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.baseUrl = '';
        var credentials = sessionStorageService.getItem(__WEBPACK_IMPORTED_MODULE_3__Services_constants__["a" /* Constants */].CREDENTIALS_KEY);
        this.baseUrl = sessionStorageService.getItem(__WEBPACK_IMPORTED_MODULE_3__Services_constants__["a" /* Constants */].BASE_URL);
        this.headers.append("Authorization", "Basic " + credentials);
        this.headers.append("Content-Type", "application/json");
    }
    ConceptService.prototype.searchConcept = function (conceptID) {
        var _this = this;
        //searching with concept display
        return this.http.get(this.baseUrl + "/ws/rest/v1/concept?q=" + conceptID + "&v=custom:(uuid,name,conceptClass,setMembers,answers)", { headers: this.headers }).map(function (data) { return _this.data = data.json(); })
            .catch(function (error) {
            alert(error.message);
            return error;
        });
        ;
    };
    ConceptService.prototype.searchConceptByUUID = function (conceptUUID) {
        var _this = this;
        return this.http.get(this.baseUrl + "/ws/rest/v1/concept/" + conceptUUID + "?v=custom:(uuid,name,conceptClass,setMembers,answers)", { headers: this.headers }).map(function (data) { return _this.data = data.json(); })
            .catch(function (error) {
            alert(error.message);
            return error;
        });
    };
    return ConceptService;
}());
ConceptService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__session_storage_service__["a" /* SessionStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__session_storage_service__["a" /* SessionStorageService */]) === "function" && _b || Object])
], ConceptService);

var _a, _b;
//# sourceMappingURL=concept.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = (function () {
    function Constants() {
    }
    return Constants;
}());

Constants.CREDENTIALS_KEY = 'auth.credentials';
Constants.USER_KEY = 'user';
Constants.BASE_URL = 'url';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../../../../src/app/Services/element-editor.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementEditorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ElementEditorService = (function () {
    function ElementEditorService() {
        this.previouslySelectAnswers = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
    }
    ElementEditorService.prototype.reShowAnswersDialog = function (previouslySelected) {
        this.previouslySelectAnswers.next(previouslySelected);
    };
    ElementEditorService.prototype.reselectAnswers = function () {
        return this.previouslySelectAnswers.asObservable();
    };
    return ElementEditorService;
}());
ElementEditorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ElementEditorService);

//# sourceMappingURL=element-editor.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/fetch-all-forms.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__session_storage_service__ = __webpack_require__("../../../../../src/app/Services/session-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authentication_service__ = __webpack_require__("../../../../../src/app/Services/authentication.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchAllFormsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FetchAllFormsService = (function () {
    function FetchAllFormsService(http, sessionStorageService, router, auth) {
        var _this = this;
        this.http = http;
        this.sessionStorageService = sessionStorageService;
        this.router = router;
        this.auth = auth;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.forms = {};
        auth.getBaseUrl().subscribe(function (baseUrl) { return _this.baseUrl = baseUrl; });
        auth.getCredentialsSubject().subscribe(function (credentials) {
            _this.headers.delete("Authorization");
            _this.headers.append("Authorization", "Basic " + credentials);
        });
        this.headers.append("Content-Type", "application/json");
    }
    FetchAllFormsService.prototype.fetchAllPOCForms = function () {
        var _this = this;
        return this.http.get(this.baseUrl + "/ws/rest/v1/form?q=POC&v=custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference))", { headers: this.headers }).map(function (data) { return _this.forms = data.json(); })
            .catch(function (e) { alert("Error found: " + e.message); return e; });
    };
    FetchAllFormsService.prototype.fetchAllComponentForms = function () {
        var _this = this;
        return this.http.get(this.baseUrl + "/ws/rest/v1/form?q=Component&v=custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference))", { headers: this.headers }).map(function (data) { return _this.forms = data.json(); })
            .catch(function (e) { alert("Error found: " + e.message); return e; });
    };
    return FetchAllFormsService;
}());
FetchAllFormsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__session_storage_service__["a" /* SessionStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__session_storage_service__["a" /* SessionStorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__authentication_service__["a" /* AuthenticationService */]) === "function" && _d || Object])
], FetchAllFormsService);

var _a, _b, _c, _d;
//# sourceMappingURL=fetch-all-forms.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/fetch-form-detail.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_openmrs_formentry__ = __webpack_require__("../../../../ng2-openmrs-formentry/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__navigator_service__ = __webpack_require__("../../../../../src/app/Services/navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__session_storage_service__ = __webpack_require__("../../../../../src/app/Services/session-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__("../../../../../src/app/Services/constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchFormDetailService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var FetchFormDetailService = (function () {
    function FetchFormDetailService(http, fsc, router, ns, sessionStorageService) {
        this.http = http;
        this.fsc = fsc;
        this.router = router;
        this.ns = ns;
        this.sessionStorageService = sessionStorageService;
        this.schema = {};
        this.referencedForms = [];
        this._rawSchema = {};
        this.referencedFormsSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"]([]);
        this.referencedFormsDetailsSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"]([]); //formName,alias,uuid
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.baseUrl = '';
        this.formEditorLoaded = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](false);
        this.credentials = sessionStorageService.getItem(__WEBPACK_IMPORTED_MODULE_6__constants__["a" /* Constants */].CREDENTIALS_KEY);
        this.baseUrl = sessionStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__constants__["a" /* Constants */].BASE_URL);
        this.headers.append("Authorization", "Basic " + this.credentials);
        this.headers.append("Content-Type", "application/json");
    }
    FetchFormDetailService.prototype.fetchFormMetadata = function (uuid) {
        if (this.baseUrl == null || this.credentials == null) {
            this.router.navigate(['/login']);
        }
        else
            return this.http.get(this.baseUrl + "/ws/rest/v1/form/" + uuid + "?v=full")
                .map(function (metadata) { return metadata.json(); })
                .catch(function (error) {
                console.log("Error:" + error);
                return error;
            })
                .toPromise();
    };
    FetchFormDetailService.prototype.fetchForm = function (valueReference, isReferenceForm) {
        var _this = this;
        var arr;
        return this.http.get(this.baseUrl + "/ws/rest/v1/clobdata/" + valueReference)
            .map(function (res) {
            if (!isReferenceForm) {
                _this._rawSchema = res.json();
            }
            if (res.json().referencedForms) {
                _this.setReferencedForms(res.json().referencedForms);
                return _this.fetchReferencedFormSchemas(res.json().referencedForms).then(function (referencedForms) {
                    _this.referencedFormsSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](referencedForms);
                    try {
                        _this.schema = _this.fsc.compileFormSchema(res.json(), referencedForms);
                    }
                    catch (e) {
                        console.error("Cannot find some reference forms!");
                        _this.schema = {};
                    }
                    return _this.schema;
                });
            }
            else {
                return res.json();
            }
        })
            .toPromise();
    };
    FetchFormDetailService.prototype.fetchReferencedFormSchemas = function (referencedForms) {
        var _this = this;
        var apiCalls = [];
        referencedForms.forEach(function (form) { apiCalls.push(_this.fetchFormMetadata(form.ref.uuid).then(function (res) { return _this.fetchForm(res.resources[0].valueReference, true); })); });
        return Promise.all(apiCalls);
    };
    Object.defineProperty(FetchFormDetailService.prototype, "rawSchema", {
        get: function () {
            return this._rawSchema;
        },
        enumerable: true,
        configurable: true
    });
    FetchFormDetailService.prototype.setReferencedFormsArray = function (array) {
        this.referencedForms = array;
        this.referencedFormsSubject.next(array);
    };
    FetchFormDetailService.prototype.getReferencedFormsArray = function () {
        return this.referencedFormsSubject.asObservable();
    };
    FetchFormDetailService.prototype.fetchReferencedForms = function () {
        return this.referencedFormsDetailsSubject.asObservable();
    };
    FetchFormDetailService.prototype.setReferencedForms = function (formDits) {
        this.referencedFormsDetailsSubject.next(formDits);
    };
    FetchFormDetailService.prototype.setLoaded = function (bool) {
        this.formEditorLoaded.next(true);
    };
    FetchFormDetailService.prototype.loaded = function () {
        return this.formEditorLoaded.asObservable();
    };
    return FetchFormDetailService;
}());
FetchFormDetailService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_openmrs_formentry__["a" /* FormSchemaCompiler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_openmrs_formentry__["a" /* FormSchemaCompiler */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__navigator_service__["a" /* NavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__navigator_service__["a" /* NavigatorService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__session_storage_service__["a" /* SessionStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__session_storage_service__["a" /* SessionStorageService */]) === "function" && _e || Object])
], FetchFormDetailService);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=fetch-form-detail.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/local-storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.getItem = function (keyName) {
        return window.localStorage.getItem(keyName);
    };
    LocalStorageService.prototype.setItem = function (keyName, value) {
        window.localStorage.setItem(keyName, value);
    };
    LocalStorageService.prototype.getObject = function (keyName) {
        var stored = window.localStorage.getItem(keyName);
        try {
            var object = JSON.parse(stored);
            return object;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    };
    LocalStorageService.prototype.setObject = function (keyName, value) {
        window.localStorage.setItem(keyName, JSON.stringify(value));
    };
    LocalStorageService.prototype.remove = function (keyName) {
        window.localStorage.removeItem(keyName);
    };
    LocalStorageService.prototype.clear = function () {
        window.localStorage.clear();
    };
    Object.defineProperty(LocalStorageService.prototype, "storageLength", {
        get: function () {
            return window.localStorage.length;
        },
        enumerable: true,
        configurable: true
    });
    return LocalStorageService;
}());
LocalStorageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], LocalStorageService);

//# sourceMappingURL=local-storage.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/navigator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavigatorService = (function () {
    function NavigatorService() {
        this.schemaEditorSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.rawSchemaEditorSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.schemaSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.questionSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.rawSchemaSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]({});
        this.excludedQuestionsSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]("");
    }
    NavigatorService.prototype.setClickedElementSchema = function (schema) {
        this.schemaEditorSubject.next(schema);
    };
    NavigatorService.prototype.getClickedElementSchema = function () {
        return this.schemaEditorSubject.asObservable();
    };
    NavigatorService.prototype.setClickedElementRawSchema = function (rawSchema) {
        this.rawSchemaEditorSubject.next(rawSchema);
    };
    NavigatorService.prototype.getClickedElementRawSchema = function () {
        return this.rawSchemaEditorSubject.asObservable();
    };
    NavigatorService.prototype.setSchema = function (schema) {
        this.schema = schema;
        this.schemaSubject.next(schema);
    };
    NavigatorService.prototype.getSchema = function () {
        return this.schemaSubject.asObservable();
    };
    NavigatorService.prototype.newQuestion = function (schema, pageIndex, sectionIndex, questionIndex, parentQuestionIndex) {
        if (questionIndex != undefined) {
            console.log("ObsGroup Question!");
        }
        var question = {};
        question['schema'] = schema;
        question['pageIndex'] = pageIndex;
        question['sectionIndex'] = sectionIndex;
        question['questionIndex'] = questionIndex;
        question['parentQuestionIndex'] = parentQuestionIndex || -1;
        this.questionSubject.next(question);
    };
    NavigatorService.prototype.getNewQuestion = function () {
        return this.questionSubject.asObservable();
    };
    NavigatorService.prototype.setRawSchema = function (rawSchema) {
        this.rawSchema = rawSchema;
        this.rawSchemaSubject.next(rawSchema);
    };
    NavigatorService.prototype.getRawSchema = function () {
        return this.rawSchemaSubject.asObservable();
    };
    //  addToRawSchema(options:{},pageIndex?:number){
    //   let obj = this.rawSchemaSubject.getValue();
    //    if(pageIndex==undefined){
    //     obj['pages'].push(options);
    //     this.setRawSchema(obj);
    //    }
    //    else{
    //     obj['pages'][pageIndex].sections.push(options)
    //     this.setRawSchema(obj)
    //    }}
    NavigatorService.prototype.setExcludedQuestions = function (questionIDs) {
        this.excludedQuestionsSubject.next(questionIDs);
    };
    NavigatorService.prototype.getExcludedQuestions = function () {
        return this.excludedQuestionsSubject.asObservable();
    };
    return NavigatorService;
}());
NavigatorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], NavigatorService);

//# sourceMappingURL=navigator.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/question-control.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_editor_models_property_model__ = __webpack_require__("../../../../../src/app/form-editor/models/property-model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_editor_models_property_factory__ = __webpack_require__("../../../../../src/app/form-editor/models/property-factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionControlService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QuestionControlService = (function () {
    function QuestionControlService(propertyFactory, fb) {
        this.propertyFactory = propertyFactory;
        this.fb = fb;
        this.propertyModels = [];
    }
    QuestionControlService.prototype.toFormGroup = function (questions) {
        var group = {};
        var ArrPropModelArray;
        questions.forEach(function (question) {
            group[question.key] = question.required ? new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormControl */](question.value || '', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required) : new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["e" /* FormControl */](question.value || '');
        });
        return this.fb.group(group);
    };
    QuestionControlService.prototype.toPropertyModelArray = function (schema) {
        this.propertyModels = [];
        var flattenedSchema = this.flatten(schema);
        console.log(flattenedSchema);
        for (var prop in flattenedSchema) {
            this.createFields(prop, flattenedSchema[prop]);
        }
        return this.propertyModels;
    };
    QuestionControlService.prototype.createFields = function (prop, value) {
        var options = {
            key: prop,
            label: "",
            value: value || "",
            required: false,
            options: [],
            order: 5,
            placeholder: "",
            rows: 5,
        };
        switch (prop) {
            case "label":
                options.label = "Label";
                options.required = true;
                options.placeholder = "Enter Label";
                options.order = 1;
                this.propertyModels.push(this.propertyFactory.createProperty('textbox', options));
                break;
            case "id":
                options.label = "ID";
                options.required = true;
                options.placeholder = "Enter unique ID";
                this.propertyModels.push(this.propertyFactory.createProperty('textbox', options));
                break;
            case "type":
                options.label = "Type";
                options.required = true;
                options.order = 2;
                options.options = [{
                        key: 'obs',
                        value: 'obs'
                    },
                    {
                        key: 'obsGroup',
                        value: 'obsGroup'
                    },
                    {
                        key: 'testOrder',
                        value: 'testOrder'
                    },
                    {
                        key: 'complex-obs',
                        value: 'complex-obs'
                    },
                    {
                        key: 'encounterDatetime',
                        value: 'encounterDatetime'
                    },
                    {
                        key: "encounterProvider",
                        value: "encounterProvider"
                    },
                    {
                        key: "encounterLocation",
                        value: "encounterLocation"
                    },
                    {
                        key: "personAttribute",
                        value: "personAttribute"
                    }
                ];
                this.propertyModels.push(this.propertyFactory.createProperty('select', options));
                break;
            case "questionOptions.rendering":
                options.label = "Rendering";
                options.required = true;
                options.order = 3;
                options.options = [{
                        key: 'number',
                        value: 'number'
                    },
                    {
                        key: 'text',
                        value: 'text'
                    },
                    {
                        key: 'textarea',
                        value: 'textarea'
                    },
                    {
                        key: 'date',
                        value: 'date'
                    },
                    {
                        key: 'drug',
                        value: 'drug'
                    },
                    {
                        key: 'group',
                        value: 'group'
                    },
                    {
                        key: 'select',
                        value: 'select'
                    },
                    {
                        key: 'repeating',
                        value: 'repeating'
                    },
                    {
                        key: 'multicheckbox',
                        value: 'multiCheckbox'
                    },
                    {
                        key: 'ui-select-extended',
                        value: 'ui-select-extended'
                    },
                    {
                        key: 'select-concept-answers',
                        value: 'select-concept-answers'
                    },
                    {
                        key: 'file',
                        value: 'file'
                    }
                ];
                this.propertyModels.push(this.propertyFactory.createProperty('select', options));
                break;
            case "isExpanded":
                options.label = "Is Expanded";
                options.required = true;
                options.options = [{
                        key: "true",
                        value: "true"
                    },
                    {
                        key: "false",
                        value: "false"
                    }
                ];
                this.propertyModels.push(this.propertyFactory.createProperty('select', options));
                break;
            case "questionOptions.concept":
                options.label = "Concept";
                this.propertyModels.push(this.propertyFactory.createProperty('searchbox', options));
                break;
            case "calculatedExpressions":
                options.label = "Calculated Expressions";
                options.rows = 3;
                this.propertyModels.push(this.propertyFactory.createProperty('textarea', options));
                break;
            case "default":
                options.label = "Default";
                this.propertyModels.push(this.propertyFactory.createProperty('textbox', options));
                break;
            case "original":
                options.label = "Original";
                this.propertyModels.push(this.propertyFactory.createProperty('textbox', options));
                break;
            case "questionOptions.orderSettingUuid":
                options.label = "Order Setting Uuid";
                this.propertyModels.push(this.propertyFactory.createProperty('searchbox', options));
                break;
            case "questionOptions.orderType":
                options.label = "Order Type";
                options.options = [{
                        key: 'testorder',
                        value: 'testorder'
                    }];
                this.propertyModels.push(this.propertyFactory.createProperty('select', options));
                break;
            case "required":
                options.label = "Required";
                options.options = [{
                        key: 'true',
                        value: 'true'
                    }, {
                        key: 'false',
                        value: 'false'
                    }];
                this.propertyModels.push(this.propertyFactory.createProperty('select', options));
                break;
            case "validators":
                options.label = "Validators";
                options.rows = 5;
                options.value = JSON.stringify(value, undefined, "\t");
                this.propertyModels.push(this.propertyFactory.createProperty('textarea', options));
                break;
            case "hide":
                options.label = "Hide";
                options.rows = 5;
                options.value = JSON.stringify(value, undefined, "\t");
                this.propertyModels.push(this.propertyFactory.createProperty('textarea', options));
                break;
            case "questionOptions.answers":
                options.label = "Answers";
                options.rows = 5;
                options.value = JSON.stringify(value, undefined, "\t");
                console.log(options.value);
                this.propertyModels.push(this.propertyFactory.createProperty('textarea', options));
                break;
            case "historicalExpression":
                options.label = "Historical Expression";
                options.rows = 4;
                this.propertyModels.push(this.propertyFactory.createProperty('textarea', options));
                break;
        }
        return this.propertyModels.sort(function (a, b) { return a.order - b.order; });
    };
    QuestionControlService.prototype.getAllPossibleProperties = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__form_editor_models_property_model__["a" /* PropertyModel */]().AllOtherPossibleProperties;
    };
    QuestionControlService.prototype.flatten = function (data) {
        var result = {};
        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            }
            else if (Array.isArray(cur)) {
                result[prop] = cur;
            }
            else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "." + p : p);
                }
                if (isEmpty && prop)
                    result[prop] = {};
            }
        }
        recurse(data, "");
        return result;
    };
    QuestionControlService.prototype.unflatten = function (data) {
        "use strict";
        if (Object(data) !== data || Array.isArray(data))
            return data;
        var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g, resultholder = {};
        for (var p in data) {
            var cur = resultholder, prop = "", m;
            while (m = regex.exec(p)) {
                cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
                prop = m[2] || m[1];
            }
            cur[prop] = data[p];
        }
        return resultholder[""] || resultholder;
    };
    ;
    return QuestionControlService;
}());
QuestionControlService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__form_editor_models_property_factory__["a" /* PropertyFactory */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__form_editor_models_property_factory__["a" /* PropertyFactory */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* FormBuilder */]) === "function" && _b || Object])
], QuestionControlService);

var _a, _b;
//# sourceMappingURL=question-control.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/question-id.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionIdService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var QuestionIdService = (function () {
    function QuestionIdService() {
        this.IDs = [];
    }
    QuestionIdService.prototype.getIDs = function (schema) {
        return this.collectIDs(schema);
    };
    QuestionIdService.prototype.collectIDs = function (schema) {
        var _this = this;
        if (schema.pages != null)
            this.collectIDs(schema.pages);
        if (Array.isArray(schema)) {
            schema.forEach(function (element) {
                if (element.sections)
                    _this.collectIDs(element.sections);
                if (element.questions)
                    _this.collectIDs(element.questions);
                else {
                    if (element.id != undefined) {
                        _this.IDs.push(element.id);
                    }
                }
            });
        }
        return this.IDs;
    };
    return QuestionIdService;
}());
QuestionIdService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], QuestionIdService);

//# sourceMappingURL=question-id.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/save-forms-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SaveFormsGuardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SaveFormsGuardService = (function () {
    function SaveFormsGuardService(router) {
        this.router = router;
    }
    SaveFormsGuardService.prototype.canDeactivate = function (component, route, state) {
        var can = component.canDeactivate();
        console.log('DeactivateGuard#canDeactivate called, can: ', can);
        if (!can) {
            this.router.navigate([this.router.url]);
            return false;
        }
        return true;
    };
    return SaveFormsGuardService;
}());
SaveFormsGuardService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], SaveFormsGuardService);

var _a;
//# sourceMappingURL=save-forms-guard.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/session-storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionStorageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SessionStorageService = (function () {
    function SessionStorageService() {
    }
    SessionStorageService.prototype.getItem = function (keyName) {
        return window.sessionStorage.getItem(keyName);
    };
    SessionStorageService.prototype.setItem = function (keyName, value) {
        window.sessionStorage.setItem(keyName, value);
    };
    SessionStorageService.prototype.getObject = function (keyName) {
        var stored = window.sessionStorage.getItem(keyName);
        try {
            var object = JSON.parse(stored);
            return object;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    };
    SessionStorageService.prototype.setObject = function (keyName, value) {
        window.sessionStorage.setItem(keyName, JSON.stringify(value));
    };
    SessionStorageService.prototype.remove = function (keyName) {
        window.sessionStorage.removeItem(keyName);
    };
    SessionStorageService.prototype.clear = function () {
        window.sessionStorage.clear();
    };
    Object.defineProperty(SessionStorageService.prototype, "storageLength", {
        get: function () {
            return window.sessionStorage.length;
        },
        enumerable: true,
        configurable: true
    });
    return SessionStorageService;
}());
SessionStorageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], SessionStorageService);

//# sourceMappingURL=session-storage.service.js.map

/***/ }),

/***/ "../../../../../src/app/Services/session.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// TODO inject service
var SessionService = (function () {
    function SessionService(http) {
        this.http = http;
    }
    SessionService.prototype.getUrl = function () {
        return this.url;
    };
    SessionService.prototype.getSession = function (credentials, baseUrl) {
        if (credentials === void 0) { credentials = null; }
        this.url = baseUrl + '/ws/rest/v1/session';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        if (credentials && credentials.username) {
            var base64 = btoa(credentials.username + ':' + credentials.password);
            headers.append('Authorization', 'Basic ' + base64);
        }
        return this.http.get(this.url, {
            headers: headers
        })
            .catch(function (error) {
            console.log(error);
            return error;
        });
    };
    SessionService.prototype.deleteSession = function () {
        var url = this.getUrl();
        return this.http.delete(url, {});
    };
    return SessionService;
}());
SessionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], SessionService);

var _a;
//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ "../../../../../src/app/app-material-module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMaterialModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppMaterialModule = (function () {
    function AppMaterialModule() {
    }
    return AppMaterialModule;
}());
AppMaterialModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdSidenavModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdTabsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MdIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MdButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MdToolbarModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MdCardModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MdSnackBarModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MdMenuModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MdTooltipModule */]]
    })
], AppMaterialModule);

//# sourceMappingURL=app-material-module.js.map

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_editor_form_editor_form_editor_component__ = __webpack_require__("../../../../../src/app/form-editor/form-editor/form-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_forms_view_forms_component__ = __webpack_require__("../../../../../src/app/view-forms/view-forms.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_save_forms_guard_service__ = __webpack_require__("../../../../../src/app/Services/save-forms-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_auth_guard_service__ = __webpack_require__("../../../../../src/app/Services/auth-guard.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var appRoutes = [
    { path: '', redirectTo: 'forms', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__login_login_component__["a" /* LoginComponent */] },
    { path: 'forms', component: __WEBPACK_IMPORTED_MODULE_4__view_forms_view_forms_component__["a" /* ViewFormsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__Services_auth_guard_service__["a" /* AuthGuardService */]] },
    { path: 'edit/:uuid', component: __WEBPACK_IMPORTED_MODULE_3__form_editor_form_editor_form_editor_component__["a" /* FormEditorComponent */], canDeactivate: [__WEBPACK_IMPORTED_MODULE_6__Services_save_forms_guard_service__["a" /* SaveFormsGuardService */]] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forRoot(appRoutes, { useHash: true })
        ],
        declarations: [],
        exports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */]],
        providers: [__WEBPACK_IMPORTED_MODULE_6__Services_save_forms_guard_service__["a" /* SaveFormsGuardService */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".panel-table .panel-body{\r\n    padding:0;\r\n  }\r\n  \r\n  .panel-table .panel-body .table-bordered{\r\n    border-style: none;\r\n    margin:0;\r\n  }\r\n  \r\n  .panel-table .panel-body .table-bordered > thead > tr > th:first-of-type {\r\n      text-align:center;\r\n      width: 100px;\r\n  }\r\n  \r\n  .panel-table .panel-body .table-bordered > thead > tr > th:last-of-type,\r\n  .panel-table .panel-body .table-bordered > tbody > tr > td:last-of-type {\r\n    border-right: 0px;\r\n  }\r\n  \r\n  .panel-table .panel-body .table-bordered > thead > tr > th:first-of-type,\r\n  .panel-table .panel-body .table-bordered > tbody > tr > td:first-of-type {\r\n    border-left: 0px;\r\n  }\r\n  \r\n  .panel-table .panel-body .table-bordered > tbody > tr:first-of-type > td{\r\n    border-bottom: 0px;\r\n  }\r\n  \r\n  .panel-table .panel-body .table-bordered > thead > tr:first-of-type > th{\r\n    border-top: 0px;\r\n  }\r\n  \r\n  .panel-table .panel-footer .pagination{\r\n    margin:0; \r\n  }\r\n  \r\n  /*\r\n  used to vertically center elements, may need modification if you're not using default sizes.\r\n  */\r\n  .panel-table .panel-footer .col{\r\n   line-height: 34px;\r\n   height: 34px;\r\n  }\r\n  \r\n  .panel-table .panel-heading .col h3{\r\n   line-height: 30px;\r\n   height: 30px;\r\n  }\r\n  \r\n  .panel-table .panel-body .table-bordered > tbody > tr > td{\r\n    line-height: 34px;\r\n  }\r\n  \r\n  .formName{\r\n      font-size:14px;\r\n  }\r\n\r\n  .mat-toolbar{\r\n    background:#008daf;\r\n}\r\n.stylish-input-group .input-group-addon{\r\n    background: white !important; \r\n}\r\n.stylish-input-group .form-control{\r\n\tborder-right:0; \r\n\tbox-shadow:0 0 0; \r\n\tborder-color:#ccc;\r\n}\r\n.stylish-input-group button{\r\n    border:0;\r\n    background:transparent;\r\n}\r\n.material-icons{\r\n  color:green;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = " <div>\r\n   <router-outlet></router-outlet>\r\n    </div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_fetch_all_forms_service__ = __webpack_require__("../../../../../src/app/Services/fetch-all-forms.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(fetchAllFormsService, router) {
        this.fetchAllFormsService = fetchAllFormsService;
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_fetch_all_forms_service__["a" /* FetchAllFormsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_fetch_all_forms_service__["a" /* FetchAllFormsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__form_editor_form_editor_form_editor_module__ = __webpack_require__("../../../../../src/app/form-editor/form-editor/form-editor.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__authentication_authentication_module__ = __webpack_require__("../../../../../src/app/authentication/authentication.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modals_confirm_component__ = __webpack_require__("../../../../../src/app/modals/confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modals_alert_component__ = __webpack_require__("../../../../../src/app/modals/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modals_insert_reference_form_modal_insert_reference_forms_modal__ = __webpack_require__("../../../../../src/app/modals/insert-reference-form-modal/insert-reference-forms.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modals_schema_editor_modal__ = __webpack_require__("../../../../../src/app/modals/schema-editor.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modals_prompt_component__ = __webpack_require__("../../../../../src/app/modals/prompt.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__modals_answers_modal_answers_modal__ = __webpack_require__("../../../../../src/app/modals/answers-modal/answers.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modals_concept_modal__ = __webpack_require__("../../../../../src/app/modals/concept.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__modals_reference_form_modal_reference_form_modal__ = __webpack_require__("../../../../../src/app/modals/reference-form-modal/reference-form.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__modals_navigator_modal__ = __webpack_require__("../../../../../src/app/modals/navigator.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__view_forms_view_forms_component__ = __webpack_require__("../../../../../src/app/view-forms/view-forms.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__Services_auth_guard_service__ = __webpack_require__("../../../../../src/app/Services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pipes_search_form_filter_pipe__ = __webpack_require__("../../../../../src/app/pipes/search-form-filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__modals_set_members_modal_set_members_modal_component__ = __webpack_require__("../../../../../src/app/modals/set-members-modal/set-members-modal.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_12__modals_confirm_component__["a" /* ConfirmComponent */],
            __WEBPACK_IMPORTED_MODULE_13__modals_alert_component__["a" /* AlertComponent */],
            __WEBPACK_IMPORTED_MODULE_16__modals_prompt_component__["a" /* PromptComponent */],
            __WEBPACK_IMPORTED_MODULE_17__modals_answers_modal_answers_modal__["a" /* AnswersComponent */],
            __WEBPACK_IMPORTED_MODULE_18__modals_concept_modal__["a" /* ConceptsModalComponent */],
            __WEBPACK_IMPORTED_MODULE_19__modals_reference_form_modal_reference_form_modal__["a" /* ReferenceModalComponent */],
            __WEBPACK_IMPORTED_MODULE_20__modals_navigator_modal__["a" /* NavigatorModalComponent */],
            __WEBPACK_IMPORTED_MODULE_21__view_forms_view_forms_component__["a" /* ViewFormsComponent */],
            __WEBPACK_IMPORTED_MODULE_14__modals_insert_reference_form_modal_insert_reference_forms_modal__["a" /* InsertReferenceComponent */],
            __WEBPACK_IMPORTED_MODULE_15__modals_schema_editor_modal__["a" /* SchemaModalComponent */],
            __WEBPACK_IMPORTED_MODULE_22__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_24__pipes_search_form_filter_pipe__["a" /* SearchFormFilterPipe */],
            __WEBPACK_IMPORTED_MODULE_25__modals_set_members_modal_set_members_modal_component__["a" /* SetMembersModalComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal__["BootstrapModalModule"],
            __WEBPACK_IMPORTED_MODULE_5_ngx_pagination__["a" /* NgxPaginationModule */],
            __WEBPACK_IMPORTED_MODULE_7__form_editor_form_editor_form_editor_module__["a" /* FormEditorModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_8__authentication_authentication_module__["a" /* AuthenticationModule */],
            __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__["a" /* TypeaheadModule */].forRoot()
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_12__modals_confirm_component__["a" /* ConfirmComponent */],
            __WEBPACK_IMPORTED_MODULE_13__modals_alert_component__["a" /* AlertComponent */],
            __WEBPACK_IMPORTED_MODULE_16__modals_prompt_component__["a" /* PromptComponent */],
            __WEBPACK_IMPORTED_MODULE_17__modals_answers_modal_answers_modal__["a" /* AnswersComponent */],
            __WEBPACK_IMPORTED_MODULE_18__modals_concept_modal__["a" /* ConceptsModalComponent */],
            __WEBPACK_IMPORTED_MODULE_19__modals_reference_form_modal_reference_form_modal__["a" /* ReferenceModalComponent */],
            __WEBPACK_IMPORTED_MODULE_20__modals_navigator_modal__["a" /* NavigatorModalComponent */],
            __WEBPACK_IMPORTED_MODULE_14__modals_insert_reference_form_modal_insert_reference_forms_modal__["a" /* InsertReferenceComponent */],
            __WEBPACK_IMPORTED_MODULE_15__modals_schema_editor_modal__["a" /* SchemaModalComponent */],
            __WEBPACK_IMPORTED_MODULE_25__modals_set_members_modal_set_members_modal_component__["a" /* SetMembersModalComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_23__Services_auth_guard_service__["a" /* AuthGuardService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/authentication/authentication.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_authentication_service__ = __webpack_require__("../../../../../src/app/Services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_local_storage_service__ = __webpack_require__("../../../../../src/app/Services/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_session_storage_service__ = __webpack_require__("../../../../../src/app/Services/session-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_session_service__ = __webpack_require__("../../../../../src/app/Services/session.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AuthenticationModule = (function () {
    function AuthenticationModule() {
    }
    return AuthenticationModule;
}());
AuthenticationModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
        ],
        declarations: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_2__Services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_3__Services_local_storage_service__["a" /* LocalStorageService */],
            __WEBPACK_IMPORTED_MODULE_5__Services_session_service__["a" /* SessionService */],
            __WEBPACK_IMPORTED_MODULE_4__Services_session_storage_service__["a" /* SessionStorageService */],
        ]
    })
], AuthenticationModule);

//# sourceMappingURL=authentication.module.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/concept/concept.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h5{\nfont-weight: bold;\n    font-size: 14px;\n    color: #2196f3;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-editor/concept/concept.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"question\">\n    <div [formGroup]=\"form\">\n        <div class=\"input-group\">\n            <input class=\"form-control\" placeholder=\"Enter concept id, uuid or label to search\" [formControlName]=\"question.key\" [id]=\"question.key\" [type]=\"question.type\" [value]=\"question.value\">\n            <span class=\"input-group-btn\">\n        <button class=\"btn btn-primary\" type=\"button\" (click)=\"searchConcept()\"><i class=\"fa\"  [class.fa-search]=!searching [ngClass]=\"{'fa-spinner fa-spin fa-fw':searching}\"></i></button>\n   </span>\n        </div>\n       \n\n\n </div>"

/***/ }),

/***/ "../../../../../src/app/form-editor/concept/concept.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_concept_service__ = __webpack_require__("../../../../../src/app/Services/concept.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_answers_modal_answers_modal__ = __webpack_require__("../../../../../src/app/modals/answers-modal/answers.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modals_concept_modal__ = __webpack_require__("../../../../../src/app/modals/concept.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_set_members_modal_set_members_modal_component__ = __webpack_require__("../../../../../src/app/modals/set-members-modal/set-members-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_element_editor_service__ = __webpack_require__("../../../../../src/app/Services/element-editor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConceptComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ConceptComponent = (function () {
    function ConceptComponent(cs, dialogService, fb, el) {
        this.cs = cs;
        this.dialogService = dialogService;
        this.fb = fb;
        this.el = el;
        this.answers = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.searching = false;
        this.previousSelectedAnswersIndexes = [];
    }
    ConceptComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.el.reselectAnswers().subscribe(function (res) {
            if (_this.allAvailableAnswers != undefined) {
                _this.findIndexesOfPreviouslySelectedAnswers(res, _this.allAvailableAnswers);
                _this.showAnswersDialog(_this.allAvailableAnswers);
            }
            else {
                _this.getAnswers(_this.form.controls[_this.question.key].value);
            }
        });
    };
    ConceptComponent.prototype.searchConcept = function () {
        var _this = this;
        var conceptID = this.form.controls[this.question.key].value;
        this.searching = true;
        if (!__WEBPACK_IMPORTED_MODULE_8_lodash__["isEmpty"](conceptID)) {
            if (conceptID.length == 36 && conceptID.indexOf(' ') == -1) {
                this.subscription = this.cs.searchConceptByUUID(conceptID).subscribe(function (res) {
                    _this.searching = false;
                    var arr = [];
                    arr.push(res);
                    _this.showConceptsDialog(arr);
                });
            }
            else {
                this.subscription = this.cs.searchConcept(conceptID).subscribe(function (res) {
                    _this.searchResult = res;
                    _this.searching = false;
                    if (_this.searchResult.results) {
                        _this.showConceptsDialog(res.results);
                    }
                });
            }
        }
    };
    ConceptComponent.prototype.getAnswers = function (conceptID) {
        var _this = this;
        this.cs.searchConceptByUUID(conceptID).subscribe(function (res) {
            if (res.answers && res.answers.length > 0) {
                _this.allAvailableAnswers = res.answers;
                _this.showAnswersDialog(_this.allAvailableAnswers);
            }
            else {
                _this.setSelectedAnswers([]);
            }
        });
    };
    ConceptComponent.prototype.showConceptsDialog = function (searchResults) {
        var _this = this;
        console.log(searchResults);
        this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_5__modals_concept_modal__["a" /* ConceptsModalComponent */], {
            concepts: searchResults, title: "Concepts"
        }, { backdropColor: 'rgba(255, 255, 255, 0.5)' })
            .subscribe(function (formValue) {
            if (formValue) {
                _this.setFormControlValue(formValue);
                searchResults.forEach(function (concept) {
                    if (formValue['concept'] == concept.uuid) {
                        if (concept.answers.length > 0) {
                            _this.allAvailableAnswers = concept.answers;
                            _this.showAnswersDialog(_this.allAvailableAnswers);
                        }
                        if (concept.setMembers.length > 0) {
                            _this.allAvailableSetMembers = concept.setMembers;
                            _this.showSetMembersDialog(_this.allAvailableSetMembers);
                        }
                    }
                });
            }
        });
    };
    ConceptComponent.prototype.showAnswersDialog = function (results) {
        var _this = this;
        this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_answers_modal_answers_modal__["a" /* AnswersComponent */], {
            answers: results
        }, { backdropColor: 'rgba(255, 255, 255, 0.5)' })
            .subscribe(function (formValue) {
            if (formValue)
                _this.setSelectedAnswers(formValue);
        });
    };
    ConceptComponent.prototype.showSetMembersDialog = function (setMembers) {
        var _this = this;
        this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_6__modals_set_members_modal_set_members_modal_component__["a" /* SetMembersModalComponent */], {
            setMembers: setMembers
        }, { backdropColor: 'rgba(255, 255, 255, 0.5)' })
            .subscribe(function (formValue) {
            if (formValue)
                _this.setSelectedAnswers(formValue);
        });
    };
    ConceptComponent.prototype.setSelectedAnswers = function (obj) {
        var answers = [];
        if (obj.length > 0) {
            var jsobj = JSON.parse(obj);
            for (var answer in jsobj) {
                var label = jsobj[answer].slice(0, jsobj[answer].indexOf(','));
                var concept = jsobj[answer].slice(jsobj[answer].indexOf(',') + 1);
                var temp = { "label": label, "concept": concept };
                answers.push(temp);
            }
        }
        this.answers.emit(answers);
    };
    ConceptComponent.prototype.setFormControlValue = function (formValue) {
        this.form.controls['questionOptions.concept'].setValue(formValue.concept);
    };
    ConceptComponent.prototype.keyDownFunction = function ($event) {
        if ($event.keyCode == 13 && this.form.controls[this.question.key].value != '')
            this.searchConcept();
    };
    ConceptComponent.prototype.findIndexesOfPreviouslySelectedAnswers = function (previouslySelectedAnswers, allAvailableAnswers) {
        var indexes = [];
        previouslySelectedAnswers.forEach(function (answer, index) {
            if (__WEBPACK_IMPORTED_MODULE_8_lodash__["indexOf"](allAvailableAnswers, answer)) {
                indexes.push(index);
            }
        });
        console.log(indexes);
        return indexes;
    };
    return ConceptComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ConceptComponent.prototype, "question", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormGroup */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormGroup */]) === "function" && _a || Object)
], ConceptComponent.prototype, "form", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ConceptComponent.prototype, "answers", void 0);
ConceptComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-concept',
        template: __webpack_require__("../../../../../src/app/form-editor/concept/concept.component.html"),
        styles: [__webpack_require__("../../../../../src/app/form-editor/concept/concept.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__Services_concept_service__["a" /* ConceptService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_concept_service__["a" /* ConceptService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_bootstrap_modal__["DialogService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__Services_element_editor_service__["a" /* ElementEditorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__Services_element_editor_service__["a" /* ElementEditorService */]) === "function" && _e || Object])
], ConceptComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=concept.component.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/element-editor/dynamic-question/dynamic-question.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".label {\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    color: black;\r\n}\r\n\r\n.panel-body {\r\n    padding: 0px 15px 0px 15px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-editor/element-editor/dynamic-question/dynamic-question.component.html":
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"form\">\n  <!--<a [href]=\"'#'+question.label\" data-toggle=\"collapse\"><i class=\"fa fa-caret-down\"></i></a>-->\n\n  <label [attr.for]=\"question.key\" class=\"label\">{{question.label}}</label>\n\n  <div [ngSwitch]=\"question.controlType\">\n    <div [id]=\"question.label\" class=\"\">\n      <div class=\"form-group\">\n\n        <input *ngSwitchCase=\"'textbox'\" class=\"form-control\" [formControlName]=\"question.key\" [id]=\"question.key\" [type]=\"question.type\"\n          [placeholder]=\"question.placeholder\" [value]=\"question.value\">\n\n      </div>\n\n      <div class=\"form-group\">\n        <select *ngSwitchCase=\"'select'\" class=\"form-control\" [formControlName]=\"question.key\" (change)=\"typeSelected(question.key)\">\n      <option *ngFor=\"let opt of question.options\" [value]=\"opt.key\">{{opt.value}}</option>\n   </select>\n      </div>\n\n      <div class=\"form-group\">\n        \n        <textarea *ngSwitchCase=\"'textarea'\" [rows]=\"question.rows\" [value]=\"question.value\" class=\"form-control\" [formControlName]=\"question.key\"\n          [id]=\"question.key\" [placeholder]=\"question.placeholder\"></textarea>\n      </div>\n\n      <div class=\"form-group\">\n        <div *ngSwitchCase=\"'searchbox'\">\n          <app-concept [question]=\"question\" [form]=\"form\" (answers)=\"emitAnswers($event)\"></app-concept>\n        </div>\n      </div>\n    </div>\n  </div>\n  <br/>\n"

/***/ }),

/***/ "../../../../../src/app/form-editor/element-editor/dynamic-question/dynamic-question.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_property_model__ = __webpack_require__("../../../../../src/app/form-editor/models/property-model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicQuestionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DynamicQuestionComponent = (function () {
    function DynamicQuestionComponent() {
        this.answers = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.type = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(DynamicQuestionComponent.prototype, "_form", {
        set: function (form) {
            console.log("New form");
            this.form = form;
        },
        enumerable: true,
        configurable: true
    });
    DynamicQuestionComponent.prototype.ngOnInit = function () {
    };
    DynamicQuestionComponent.prototype.typeSelected = function (selectBox) {
        if (selectBox == 'type') {
            var value = this.form.controls['type'].value;
            this.type.emit(value);
        }
    };
    DynamicQuestionComponent.prototype.isValid = function () {
        return this.form.controls[this.question.key].valid;
    };
    DynamicQuestionComponent.prototype.emitAnswers = function (answers) {
        this.answers.emit(answers);
    };
    return DynamicQuestionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_property_model__["a" /* PropertyModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_property_model__["a" /* PropertyModel */]) === "function" && _a || Object)
], DynamicQuestionComponent.prototype, "question", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DynamicQuestionComponent.prototype, "answers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DynamicQuestionComponent.prototype, "type", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DynamicQuestionComponent.prototype, "_form", null);
DynamicQuestionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dynamic-question',
        template: __webpack_require__("../../../../../src/app/form-editor/element-editor/dynamic-question/dynamic-question.component.html"),
        styles: [__webpack_require__("../../../../../src/app/form-editor/element-editor/dynamic-question/dynamic-question.component.css")]
    }),
    __metadata("design:paramtypes", [])
], DynamicQuestionComponent);

var _a;
//# sourceMappingURL=dynamic-question.component.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/element-editor/element-editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-primary{\r\n    width:100%;\r\n}\r\n\r\n.dropdown{\r\n    margin:0px 0px 20px 0px;\r\n}\r\n.dropdown-menu{\r\n  \r\n    font-family: 'Roboto',serif;\r\n    font-size: 14px;\r\n}\r\na{\r\n    cursor: pointer;\r\n}\r\n\r\n.dropdown-menu>li>a:hover{\r\n    color: white;\r\n    background-color : #2196f3;\r\n}\r\n.disabled,.disabled:hover{\r\n    cursor: text;\r\n    background-color:white !important;\r\n    color:red !important;\r\n}\r\n\r\n.mat-card>:first-child {\r\n    margin-top: -27px;\r\n    margin-right: -20px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-editor/element-editor/element-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\" style=\"background:white;\">\r\n    <div style=\"background-color:#ebebeb;\">\r\n            <ol class=\"breadcrumb\">\r\n                    <li>{{pageStr}}</li>\r\n                    <li>{{sectionStr}}</li>\r\n                    <li>{{questionStr}}</li>\r\n                </ol>\r\n    </div>\r\n   \r\n</div>\r\n\r\n\r\n<div *ngIf=\"questions\" >\r\n    <md-card>\r\n\r\n        <!--add property-->\r\n\r\n        <div class=\"dropdown pull-right\">\r\n            <a class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Add Property\r\n  <span class=\"caret\"></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n                <li (click)=\"addProperty(prop.parentPath)\" value=\"prop.path\" *ngFor=\"let prop of allPossibleproperties\">\r\n                    <a [class.disabled]=\"prop.type=='disabled'\">{{prop.name}}</a>\r\n                </li>\r\n\r\n            </ul>\r\n        </div>\r\n\r\n        <!--add property-->\r\n\r\n        <div *ngIf=\"form\" style=\"clear:both;\">\r\n            <!--form for adding a question-->\r\n\r\n            <form [formGroup]=\"form\">\r\n\r\n                <div *ngFor=\"let question of questions; let i=index;\">\r\n                    \r\n                    <div class=\"pull-right\" *ngIf=\"checkQuestion(question)\">\r\n                        <a (click)=\"delete(i)\" data-toggle=\"tooltip\" title=\"Delete\">\r\n                            <i class=\"fa fa-times\" style=\"font-size:16px;margin:5px;color:red;cursor:pointer\"></i>\r\n                        </a>\r\n                    </div>\r\n\r\n                    <div class=\"pull-right\" *ngIf=\"question.key=='questionOptions.answers'\">\r\n                        <a (click)=\"reselectAnswers()\" data-toggle=\"tooltip\" title=\"Reselect Answers\">\r\n                            <i class=\"fa fa-undo\" style=\"font-size:16px;margin:5px;color:green;cursor:pointer\"></i>\r\n                        </a>\r\n                          </div>\r\n\r\n                    <app-dynamic-question [question]=\"question\" [_form]=\"form\" (answers)=\"setAnswers($event)\"  (type)=\"typeSelected($event)\" ></app-dynamic-question>\r\n\r\n                </div>\r\n\r\n\r\n                <div class=\"form-row\">\r\n                    <br/>\r\n                    <button class=\"btn btn-primary btn-lg center-block\" (click)=\"onSubmit()\" [disabled]=\"!form.valid\">OK</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </md-card>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/form-editor/element-editor/element-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_question_control_service__ = __webpack_require__("../../../../../src/app/Services/question-control.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_navigator_service__ = __webpack_require__("../../../../../src/app/Services/navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_question_id_service__ = __webpack_require__("../../../../../src/app/Services/question-id.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__form_elements_form_element_factory__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/form-element-factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_alert_component__ = __webpack_require__("../../../../../src/app/modals/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_element_editor_service__ = __webpack_require__("../../../../../src/app/Services/element-editor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ElementEditorComponent = (function () {
    function ElementEditorComponent(qcs, formElementFactory, qis, ns, dialogService, el) {
        this.qcs = qcs;
        this.formElementFactory = formElementFactory;
        this.qis = qis;
        this.ns = ns;
        this.dialogService = dialogService;
        this.el = el;
        this.addMode = false;
        this.editMode = false;
    }
    Object.defineProperty(ElementEditorComponent.prototype, "rawSchema", {
        set: function (rawSchema) { this._rawSchema = __WEBPACK_IMPORTED_MODULE_9_lodash__["cloneDeep"](rawSchema); },
        enumerable: true,
        configurable: true
    });
    ; //if edit obsGroup question
    Object.defineProperty(ElementEditorComponent.prototype, "schema", {
        set: function (schema) {
            this._schema = __WEBPACK_IMPORTED_MODULE_9_lodash__["clone"](schema);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementEditorComponent.prototype, "_questions", {
        set: function (questions) {
            console.log(questions);
            this.questions = questions;
            this.form = this.qcs.toFormGroup(this.questions);
            this.setMode(this.form);
            this.breadcrumbsSetup();
        },
        enumerable: true,
        configurable: true
    });
    ElementEditorComponent.prototype.ngOnInit = function () {
        this.form = this.qcs.toFormGroup(this.questions);
        this.setMode(this.form);
        this.allPossibleproperties = this.qcs.getAllPossibleProperties();
        this.breadcrumbsSetup();
        console.log(this.pageIndex, this.sectionIndex, this.questionIndex);
    };
    ElementEditorComponent.prototype.addProperty = function (prop) {
        if (this.form.contains(prop)) {
            this.showAlert("Property already added!");
            return;
        }
        var obj = {};
        obj[prop] = "";
        var newField = this.qcs.toPropertyModelArray(obj);
        if (newField.length > 0) {
            this.form.addControl(prop, new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormControl */](""));
            this.questions.push(newField[0]);
        }
    };
    ElementEditorComponent.prototype.onSubmit = function () {
        if (!this.form.contains('label') || !this.form.contains('questionOptions.rendering') || !this.form.contains('type')) {
            this.showAlert("Some mandatory question properties are missing! \n A question must include: type,label,redering and id");
        }
        if (this.form.contains('id')) {
            if (!this.checkId(this.form.get('id').value))
                return;
        }
        var question = this.qcs.unflatten(this.form.value);
        if (question['type'] == "obsGroup") {
            question['questions'] = [];
        }
        if (question['validators']) {
            question['validators'] = this.parse(this.form.controls['validators'].value);
        }
        if (question['hide']) {
            question['hide'] = this.parse(this.form.controls['hide'].value);
        }
        if (question.questionOptions['answers']) {
            question.questionOptions['answers'] = this.parse(this.form.controls['questionOptions.answers'].value);
        }
        console.log(question);
        if (this.addMode) {
            this.addQuestion(question, this.pageIndex, this.sectionIndex, this.questionIndex);
        }
        if (this.editMode) {
            this.editQuestion(question, this.pageIndex, this.sectionIndex, this.questionIndex, this.parentQuestionIndex);
        }
    };
    ElementEditorComponent.prototype.breadcrumbsSetup = function () {
        this.pageStr = this._schema.pages[this.pageIndex].label;
        this.sectionStr = this._schema.pages[this.pageIndex].sections[this.sectionIndex].label;
        if (this.editMode && this.questionIndex != -1)
            this.questionStr = this._schema.pages[this.pageIndex].sections[this.sectionIndex].questions[this.questionIndex].label;
        else
            this.questionStr = '';
    };
    ElementEditorComponent.prototype.parse = function (str) {
        return JSON.parse(str);
    };
    ElementEditorComponent.prototype.delete = function (i) {
        this.form.removeControl(this.questions[i].key);
        this.questions.splice(i, 1);
        console.log(this.questions);
    };
    ElementEditorComponent.prototype.setMode = function (form) {
        if (this.form.get('label').value == "") {
            console.log("addMode");
            this.editMode = false;
            this.addMode = true;
        }
        else {
            this.editMode = true;
            this.addMode = false;
            this.id = this.form.get('id').value;
            console.log("editMode");
        }
    };
    ElementEditorComponent.prototype.checkId = function (id) {
        if (this.form.contains('id')) {
            var _id = this.form.get('id').value;
            var ids = this.qis.getIDs(this._schema);
            var count = 0;
            for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                var id = ids_1[_i];
                if (id == _id)
                    count++;
            }
            if (this.editMode && this.id !== _id && count > 0) {
                this.showAlert("ID exists \n Try using a different ID");
                return false;
            }
            else if (this.addMode && count > 0) {
                this.showAlert("ID exists \n Try using a different ID");
                return false;
            }
            else {
                return true;
            }
        }
    };
    ElementEditorComponent.prototype.showAlert = function (message) {
        this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_6__modals_alert_component__["a" /* AlertComponent */], { message: message });
    };
    ElementEditorComponent.prototype.setAnswers = function (answers) {
        console.log(answers, "Element Editor!");
        this.answers = answers; //selectedAnswers
        if (answers.length > 0) {
            if (this.form.contains('questionOptions.answers')) {
                this.form.controls['questionOptions.answers'].setValue(JSON.stringify(answers, undefined, "\t"));
            }
            else {
                var field = this.qcs.toPropertyModelArray({ "questionOptions.answers": answers });
                this.form.addControl('questionOptions.answers', new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormControl */](JSON.stringify(answers, undefined, "\t")));
                this.questions.push(field[0]);
            }
        }
        else {
            if (this.form.controls['questionOptions.answers']) {
                var i_1;
                this.questions.forEach(function (question, index) {
                    if (question.key === 'questionOptions.answers')
                        i_1 = index;
                });
                this.questions.splice(i_1, 1);
            }
            else {
                return;
            }
        }
    };
    ElementEditorComponent.prototype.addQuestion = function (question, pageIndex, sectionIndex, questionIndex) {
        if (questionIndex !== undefined) {
            console.log('has parent!');
            if (this._rawSchema.pages[pageIndex].label) {
                if (this._rawSchema.pages[pageIndex].sections[sectionIndex].label) {
                    this._schema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].questions.push(question);
                    this._rawSchema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].questions.push(question);
                }
                else {
                    this.showAlert("You cannot add a question to a referenced section.");
                    return;
                }
            }
            else {
                this.showAlert("You cannot add a question to a referenced page.");
                return;
            }
        }
        else {
            if (this._rawSchema.pages[pageIndex].label) {
                if (this._rawSchema.pages[pageIndex].sections[sectionIndex].label) {
                    this._rawSchema.pages[pageIndex].sections[sectionIndex].questions.push(question);
                    this._schema.pages[pageIndex].sections[sectionIndex].questions.push(question);
                }
                else {
                    this.showAlert("You cannot add a question to a referenced section.");
                    return;
                }
            }
            else {
                this.showAlert("You cannot add a question to a referenced page.");
                return;
            }
        }
        this.ns.setSchema(this._schema);
        this.ns.setRawSchema(this._rawSchema);
        this.form.reset();
    };
    ElementEditorComponent.prototype.editQuestion = function (question, pageIndex, sectionIndex, questionIndex, parentQuestionIndex) {
        if (parentQuestionIndex !== undefined) {
            if (this._rawSchema.pages[pageIndex].label) {
                if (this._rawSchema.pages[pageIndex].sections[sectionIndex].label) {
                    this._schema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex, 1, question);
                    this._rawSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex, 1, question);
                }
                else {
                    this.showAlert("You cannot edit a question of a referenced section");
                    return;
                }
            }
            else {
                this.showAlert("You cannot edit a question of a referenced page");
                return;
            }
        }
        else {
            console.log(questionIndex);
            if (this._rawSchema.pages[pageIndex].label) {
                if (this._rawSchema.pages[pageIndex].sections[sectionIndex].label) {
                    this._schema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex, 1, question);
                    this._rawSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex, 1, question);
                }
                else {
                    this.showAlert("You cannot edit a question of a referenced section.");
                    return;
                }
            }
            else {
                this.showAlert("You cannot edit a question of a referenced page.");
                return;
            }
        }
        this.ns.setSchema(this._schema);
        this.ns.setRawSchema(this._rawSchema);
    };
    ElementEditorComponent.prototype.checkQuestion = function (question) {
        if (question.key == 'label' || question.key == 'type' || question.key == 'questionOptions.rendering') {
            return false;
        }
        return true;
    };
    ElementEditorComponent.prototype.typeSelected = function (type) {
        if (type == 'obs') {
            if (!this.form.contains('questionOptions.concept'))
                this.addProperty('questionOptions.concept');
        }
    };
    ElementEditorComponent.prototype.reselectAnswers = function () {
        if (this.answers != undefined)
            this.el.reShowAnswersDialog(this.answers);
        else
            this.el.reShowAnswersDialog(JSON.parse(this.form.controls['questionOptions.answers'].value));
    };
    return ElementEditorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ElementEditorComponent.prototype, "pageIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ElementEditorComponent.prototype, "sectionIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ElementEditorComponent.prototype, "questionIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ElementEditorComponent.prototype, "parentQuestionIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ElementEditorComponent.prototype, "rawSchema", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ElementEditorComponent.prototype, "schema", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ElementEditorComponent.prototype, "_questions", null);
ElementEditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-element-editor',
        template: __webpack_require__("../../../../../src/app/form-editor/element-editor/element-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/form-editor/element-editor/element-editor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_question_control_service__["a" /* QuestionControlService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_question_control_service__["a" /* QuestionControlService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__form_elements_form_element_factory__["a" /* FormElementFactory */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__form_elements_form_element_factory__["a" /* FormElementFactory */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__Services_question_id_service__["a" /* QuestionIdService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_question_id_service__["a" /* QuestionIdService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__Services_navigator_service__["a" /* NavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_navigator_service__["a" /* NavigatorService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__["DialogService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__Services_element_editor_service__["a" /* ElementEditorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_element_editor_service__["a" /* ElementEditorService */]) === "function" && _f || Object])
], ElementEditorComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=element-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-editor/form-editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* .container{\n    margin: auto;\n    margin-top: 100px;\n} */\n\n#create-form{\n    height: 500px;\n    border-right: 1px solid lightgray;\n}\na{\n    margin: auto;\n}\n\nh6{\n    color: #2196f3;\n    \n}\n.menu{\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n}\n/* .mat-toolbar{\n    background:#337ab7;\n}\n.mat-tab-labels{\n     background-color:#337ab7 !important;\n     \n} */\n.mat-sidenav {\n    width:650px;\n    background: #fafafa;\n}\n/* .mat-sidenav-content {\n    position: relative;\n    transform: translate3d(0,0,0);\n    display: block;\n    height: fill-available !important;\n    overflow-x:hidden !important;\n} */\na{\n    cursor: pointer;\n}\n\n.row{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.editor{\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n#loadingDiv{\n    \n  height: 400px;\n  position: relative;\n}\n\n.loader {\n  position: absolute;\n  left: 30%;\n  top: 25%;\n  margin-left: -32px; /* -1 * image width / 2 */\n  margin-top: -32px; /* -1 * image height / 2 */\n  \n}\n\n.element-editor{\n    margin:auto;\n    width:750px;\n}\n\n.schema-editor{\n    margin:auto;\n    width:1600px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-editor/form-editor/form-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"loading\" id=\"loadingDiv\">\n  <img class=\"loader\" src=\"./assets/loader.gif\">\n  \n</div>\n<div *ngIf=\"schema\">\n  \n    <md-sidenav-container>\n      <md-sidenav #sidenav mode=\"over\" class=\"app-sidenav\">\n        \n        <!---Navigator-->\n        <app-navigator [_schema]=\"schema\" [formSchema]=\"schema\"  [mode]=\"'edit'\" (closeSidebar)=\"closeNavigator($event)\"></app-navigator>\n  \n      </md-sidenav>\n      <md-toolbar color=\"primary\">\n        <button md-icon-button (click)=\"sidenav.toggle()\"><md-icon class=\"md-24\" >menu</md-icon></button>\n        <span style=\"font-size:22px\">Form Builder</span>\n        <span class=\"menu\"></span>\n        <span flex></span>\n        <app-reference-forms [schema]=\"schema\"></app-reference-forms>\n      </md-toolbar>\n      <div class=\"app-content\" *ngIf=\"schema\">\n\n        \n<md-tab-group md-stretch-tabs class=\"schema-editor\">\n \n <!--Element Editor-->\n           <md-tab *ngIf=\"questions\" label=\"Element Editor\">\n              <ng-template md-tab-label>\n                  Question Editor\n<a (click)=\"closeElementEditor()\" data-toggle=\"tooltip\" title=\"close tab\" class=\"pull-right\" style=\"margin-right:25px; padding-top:5px; cursor:pointer;\"><i class=\"material-icons\" >highlight_off</i></a>\n                </ng-template>\n                \n            <md-card class=\"element-editor\">\n              <app-element-editor [schema]=\"schema\" [pageIndex]=\"page\" [sectionIndex]=\"section\" [questionIndex]=\"question\" [parentQuestionIndex]=\"parentQuestionIndex\"\n                [_questions]=\"questions\" [rawSchema]=\"rawSchema\"></app-element-editor>\n            </md-card>\n  </md-tab>\n            \n  \n          <!--Schema editor-->\n           <md-tab label=\"Schema Editor\">\n             <md-card class=\"schema-editor\">\n               <app-schema-editor [selectedSchema]=\"selectedSchema\" [selectedRawSchema]=\"selectedRawSchema\" [schema]=\"strSchema\" [rawSchema]=\"strRawSchema\"></app-schema-editor>\n             </md-card>\n\n  </md-tab>\n          \n  \n          <!--Form-renderer-->\n          <md-tab label=\"Form Viewer\">\n            <md-card class=\"schema-editor\">\n            <app-form-renderer [schema]=\"schema\"></app-form-renderer>\n            </md-card>\n          </md-tab>\n        </md-tab-group> \n      </div>\n    </md-sidenav-container>\n</div>"

/***/ }),

/***/ "../../../../../src/app/form-editor/form-editor/form-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_fetch_form_detail_service__ = __webpack_require__("../../../../../src/app/Services/fetch-form-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_navigator_service__ = __webpack_require__("../../../../../src/app/Services/navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__form_elements_Form__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/Form.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FormEditorComponent = (function () {
    function FormEditorComponent(fs, ns, router, route, dialogService) {
        this.fs = fs;
        this.ns = ns;
        this.router = router;
        this.route = route;
        this.dialogService = dialogService;
        this.disableCanDeactivate = false;
    }
    FormEditorComponent.prototype.ngAfterViewInit = function () {
        console.log("After view init.");
    };
    FormEditorComponent.prototype.ngAfterContentInit = function () {
        console.log("After content init. ");
    };
    FormEditorComponent.prototype.closeElementEditor = function () {
        this.questions = undefined;
    };
    FormEditorComponent.prototype.closeNavigator = function (event) {
        this.myNav.close();
    };
    FormEditorComponent.prototype.openNavigator = function () {
        this.myNav.open();
    };
    FormEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.fs.setReferencedFormsArray([]);
        this.subscription = this.fs.loaded().subscribe(function (isLoaded) {
            if (isLoaded)
                _this.loading = false;
        });
        this.subscription = this.route.params.subscribe(function (params) {
            _this.uuid = params['uuid'];
            if (_this.uuid != 'new') {
                _this.fs.fetchFormMetadata(_this.uuid).then(function (metadata) {
                    console.log(metadata.resources);
                    _this.fetchForm(metadata.resources[0].valueReference);
                })
                    .catch(function (e) { return alert("Form not found!"); });
            }
            else {
                _this.createNewForm();
            }
        });
        this.subscription = this.ns.getRawSchema().subscribe(function (res) {
            _this.rawSchema = res;
            _this.strRawSchema = JSON.stringify(_this.rawSchema, null, "\t");
        });
        this.subscription = this.ns.getClickedElementRawSchema().subscribe(function (res) {
            console.log("received raw", res);
            _this.rawSelectedSchema = res;
            _this.strRawSchema = JSON.stringify(_this.rawSelectedSchema, null, "\t");
        });
        //on navigator element clicked for editing
        this.subscription = this.ns.getClickedElementSchema().subscribe(function (res) {
            _this.selectedSchema = res;
            _this.strSchema = JSON.stringify(_this.selectedSchema.selectedSchema, null, '\t');
        });
        //on element added/deleted/modified
        this.subscription = this.ns.getSchema().subscribe(function (res) {
            _this.schema = res;
            _this.strSchema = JSON.stringify(_this.schema, null, '\t');
        });
        this.subscription = this.ns.getNewQuestion().subscribe(function (res) {
            _this.questions = res['schema'];
            _this.page = res['pageIndex'];
            _this.section = res['sectionIndex'];
            _this.question = res['questionIndex'];
            _this.parentQuestion = res['parentQuestionIndex'];
            _this.myNav.close();
        });
    };
    FormEditorComponent.prototype.fetchForm = function (value) {
        var _this = this;
        this.fs.fetchForm(value, false).then(function (res) {
            console.log("fetching form");
            //	this.fs.getReferencedFormsArray().subscribe(res => console.log("REFERENCE FORM",res));
            if (_this.checkIfSchemaProperlyCompiled(res.pages)) {
                _this.selectedSchema = res;
                _this.schema = res;
                _this.strSchema = JSON.stringify(_this.schema, null, '\t');
                _this.rawSchema = _this.fs.rawSchema;
                console.log(_this.rawSchema);
                _this.ns.setRawSchema(_this.rawSchema);
                _this.strRawSchema = JSON.stringify(_this.rawSchema, null, "\t");
            }
        });
    };
    FormEditorComponent.prototype.createNewForm = function () {
        this.loading = false;
        this.schema = new __WEBPACK_IMPORTED_MODULE_5__form_elements_Form__["a" /* Form */]({ "name": "", "processor": "EncounterFormProcessor", "uuid": "xxxx", "referencedForms": [], "pages": [] });
        this.selectedSchema = this.schema;
        this.strSchema = JSON.stringify(this.schema, null, "\t");
        this.rawSchema = new __WEBPACK_IMPORTED_MODULE_5__form_elements_Form__["a" /* Form */]({ "name": "", "processor": "EncounterFormProcessor", "uuid": "xxxx", "referencedForms": [], "pages": [] });
        this.ns.setRawSchema(this.rawSchema);
        this.strRawSchema = JSON.stringify(this.rawSchema, null, '\t');
    };
    FormEditorComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    FormEditorComponent.prototype.canDeactivate = function () {
        if (!this.disableCanDeactivate) {
            return confirm("Are you sure you want to navigate away from this page and lose all changes?");
        }
        else {
            return true;
        }
    };
    FormEditorComponent.prototype.checkIfSchemaProperlyCompiled = function (elements) {
        var _this = this;
        var bool = true;
        elements.forEach(function (element) {
            if (!element.label) {
                _this.alertUser(element);
                bool = false;
                return bool;
            }
            else {
                if (element.sections) {
                    _this.checkIfSchemaProperlyCompiled(element.sections);
                }
                if (element.questions) {
                    _this.checkIfSchemaProperlyCompiled(element.questions);
                }
            }
        });
        return bool;
    };
    FormEditorComponent.prototype.alertUser = function (page) {
        alert("This form cannot be edited because the following reference element was not found. \n \n" + JSON.stringify(page, null, "\t"));
        this.disableCanDeactivate = true;
        this.router.navigate(['/forms']);
    };
    return FormEditorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sidenav'),
    __metadata("design:type", Object)
], FormEditorComponent.prototype, "myNav", void 0);
FormEditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-form-editor',
        template: __webpack_require__("../../../../../src/app/form-editor/form-editor/form-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/form-editor/form-editor/form-editor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_navigator_service__["a" /* NavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_navigator_service__["a" /* NavigatorService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_bootstrap_modal__["DialogService"]) === "function" && _e || Object])
], FormEditorComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=form-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-editor/form-editor.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_openmrs_formentry__ = __webpack_require__("../../../../ng2-openmrs-formentry/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_ace_editor__ = __webpack_require__("../../../../ng2-ace-editor/ng2-ace-editor.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_ace_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_ace_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_clipboard__ = __webpack_require__("../../../../ngx-clipboard/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_material_module__ = __webpack_require__("../../../../../src/app/app-material-module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Services_fetch_form_detail_service__ = __webpack_require__("../../../../../src/app/Services/fetch-form-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_navigator_service__ = __webpack_require__("../../../../../src/app/Services/navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_question_control_service__ = __webpack_require__("../../../../../src/app/Services/question-control.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_property_factory__ = __webpack_require__("../../../../../src/app/form-editor/models/property-factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__form_elements_form_element_factory__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/form-element-factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_question_id_service__ = __webpack_require__("../../../../../src/app/Services/question-id.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Services_concept_service__ = __webpack_require__("../../../../../src/app/Services/concept.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__form_elements_form_factory_service__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/form-factory.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Services_fetch_all_forms_service__ = __webpack_require__("../../../../../src/app/Services/fetch-all-forms.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Services_element_editor_service__ = __webpack_require__("../../../../../src/app/Services/element-editor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__reference_forms_reference_forms_component__ = __webpack_require__("../../../../../src/app/form-editor/reference-forms/reference-forms.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__navigator_navigator_component__ = __webpack_require__("../../../../../src/app/form-editor/navigator/navigator.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__schema_editor_schema_editor_component__ = __webpack_require__("../../../../../src/app/form-editor/schema-editor/schema-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__element_editor_element_editor_component__ = __webpack_require__("../../../../../src/app/form-editor/element-editor/element-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__form_renderer_form_renderer_component__ = __webpack_require__("../../../../../src/app/form-editor/form-renderer/form-renderer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__element_editor_dynamic_question_dynamic_question_component__ = __webpack_require__("../../../../../src/app/form-editor/element-editor/dynamic-question/dynamic-question.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__concept_concept_component__ = __webpack_require__("../../../../../src/app/form-editor/concept/concept.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__form_editor_component__ = __webpack_require__("../../../../../src/app/form-editor/form-editor/form-editor.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormEditorModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Modules







//Services










//Components








var FormEditorModule = (function () {
    function FormEditorModule() {
    }
    return FormEditorModule;
}());
FormEditorModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2_ng2_openmrs_formentry__["b" /* FormEntryModule */],
            __WEBPACK_IMPORTED_MODULE_3_ng2_ace_editor__["AceEditorModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_5_ngx_clipboard__["a" /* ClipboardModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_material_module__["a" /* AppMaterialModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_18__navigator_navigator_component__["a" /* NavigatorComponent */],
            __WEBPACK_IMPORTED_MODULE_19__schema_editor_schema_editor_component__["a" /* SchemaEditorComponent */],
            __WEBPACK_IMPORTED_MODULE_20__element_editor_element_editor_component__["a" /* ElementEditorComponent */],
            __WEBPACK_IMPORTED_MODULE_21__form_renderer_form_renderer_component__["a" /* FormRendererComponent */],
            __WEBPACK_IMPORTED_MODULE_22__element_editor_dynamic_question_dynamic_question_component__["a" /* DynamicQuestionComponent */],
            __WEBPACK_IMPORTED_MODULE_23__concept_concept_component__["a" /* ConceptComponent */],
            __WEBPACK_IMPORTED_MODULE_24__form_editor_component__["a" /* FormEditorComponent */],
            __WEBPACK_IMPORTED_MODULE_17__reference_forms_reference_forms_component__["a" /* ReferenceFormsComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */],
            __WEBPACK_IMPORTED_MODULE_8__Services_navigator_service__["a" /* NavigatorService */],
            __WEBPACK_IMPORTED_MODULE_9__Services_question_control_service__["a" /* QuestionControlService */],
            __WEBPACK_IMPORTED_MODULE_10__models_property_factory__["a" /* PropertyFactory */],
            __WEBPACK_IMPORTED_MODULE_11__form_elements_form_element_factory__["a" /* FormElementFactory */],
            __WEBPACK_IMPORTED_MODULE_12__Services_question_id_service__["a" /* QuestionIdService */],
            __WEBPACK_IMPORTED_MODULE_13__Services_concept_service__["a" /* ConceptService */],
            __WEBPACK_IMPORTED_MODULE_14__form_elements_form_factory_service__["a" /* FormFactory */],
            __WEBPACK_IMPORTED_MODULE_15__Services_fetch_all_forms_service__["a" /* FetchAllFormsService */],
            __WEBPACK_IMPORTED_MODULE_16__Services_element_editor_service__["a" /* ElementEditorService */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2_ng2_openmrs_formentry__["b" /* FormEntryModule */],
            __WEBPACK_IMPORTED_MODULE_3_ng2_ace_editor__["AceEditorModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_5_ngx_clipboard__["a" /* ClipboardModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_material_module__["a" /* AppMaterialModule */],
            __WEBPACK_IMPORTED_MODULE_18__navigator_navigator_component__["a" /* NavigatorComponent */]
        ]
    })
], FormEditorModule);

//# sourceMappingURL=form-editor.module.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-elements/Form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Form; });
var Form = (function () {
    function Form(options) {
        if (options === void 0) { options = {}; }
        this.name = options['name'];
        this.pages = options['pages'];
        this.processor = options['processor'];
        this.uuid = options['uuid'];
        this.referencedForms = options['referencedForms'];
    }
    return Form;
}());

//# sourceMappingURL=Form.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-elements/FormElement.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormElement; });
var FormElement = (function () {
    function FormElement(options) {
        this.label = options.label;
    }
    return FormElement;
}());

//# sourceMappingURL=FormElement.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-elements/Page.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormElement__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/FormElement.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Page = (function (_super) {
    __extends(Page, _super);
    function Page(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.sections = [];
        _this.sections = options['sections'] || [];
        return _this;
    }
    return Page;
}(__WEBPACK_IMPORTED_MODULE_0__FormElement__["a" /* FormElement */]));

//# sourceMappingURL=Page.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-elements/Question.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormElement__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/FormElement.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Question; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Question = (function (_super) {
    __extends(Question, _super);
    function Question(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.questionOptions = { rendering: '' };
        _this.type = options['type'] || '';
        _this.questionOptions.rendering = options['questionOptions.rendering'] || '';
        return _this;
    }
    return Question;
}(__WEBPACK_IMPORTED_MODULE_0__FormElement__["a" /* FormElement */]));

//# sourceMappingURL=Question.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-elements/Section.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormElement__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/FormElement.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Section; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Section = (function (_super) {
    __extends(Section, _super);
    function Section(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.isExpanded = options['isExpanded'] || false;
        _this.questions = options['questions'] || [];
        return _this;
    }
    return Section;
}(__WEBPACK_IMPORTED_MODULE_0__FormElement__["a" /* FormElement */]));

//# sourceMappingURL=Section.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-elements/form-element-factory.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Page__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/Page.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Section__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/Section.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Question__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/Question.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormElementFactory; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FormElementFactory = (function () {
    function FormElementFactory() {
    }
    FormElementFactory.prototype.createFormElement = function (type, options) {
        if (type.toLowerCase() === "page") {
            return new __WEBPACK_IMPORTED_MODULE_1__Page__["a" /* Page */](options);
        }
        if (type.toLowerCase() === "section") {
            return new __WEBPACK_IMPORTED_MODULE_2__Section__["a" /* Section */](options);
        }
        if (type.toLowerCase() === "question") {
            return new __WEBPACK_IMPORTED_MODULE_3__Question__["a" /* Question */](options);
        }
        else {
            console.log(type + " Element not supported");
        }
    };
    return FormElementFactory;
}());
FormElementFactory = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], FormElementFactory);

//# sourceMappingURL=form-element-factory.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-elements/form-factory.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Form__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/Form.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormFactory; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormFactory = (function () {
    function FormFactory() {
    }
    FormFactory.prototype.createForm = function (options) {
        return new __WEBPACK_IMPORTED_MODULE_1__Form__["a" /* Form */](options);
    };
    return FormFactory;
}());
FormFactory = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], FormFactory);

//# sourceMappingURL=form-factory.service.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/form-renderer/form-renderer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn{\r\n    margin: 20px 10px 10px 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-editor/form-renderer/form-renderer.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"text-center\" style=\"padding:5px 0px 10px 0px; background:#ebebeb\">\r\n  Form Renderer\r\n</div> -->\r\n\r\n<md-card>\r\n<div *ngIf=\"form\" style=\"height:76vh\">\r\n<form-renderer [node]=\"form.rootNode\"></form-renderer>\r\n</div>\r\n  </md-card>\r\n"

/***/ }),

/***/ "../../../../../src/app/form-editor/form-renderer/form-renderer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_openmrs_formentry__ = __webpack_require__("../../../../ng2-openmrs-formentry/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_navigator_service__ = __webpack_require__("../../../../../src/app/Services/navigator.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormRendererComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormRendererComponent = (function () {
    function FormRendererComponent(fc, ns) {
        this.fc = fc;
        this.ns = ns;
    }
    Object.defineProperty(FormRendererComponent.prototype, "schema", {
        set: function (schema) {
            this._schema = schema;
            console.log("Got new schema");
            this.form = this.fc.createForm(this._schema, {});
        },
        enumerable: true,
        configurable: true
    });
    FormRendererComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ns.getSchema().subscribe(function (res) {
            _this._schema = res;
            console.log("Got new schema");
            _this.form = _this.fc.createForm(_this._schema, {});
        });
    };
    return FormRendererComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], FormRendererComponent.prototype, "schema", null);
FormRendererComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-form-renderer',
        template: __webpack_require__("../../../../../src/app/form-editor/form-renderer/form-renderer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/form-editor/form-renderer/form-renderer.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_openmrs_formentry__["c" /* FormFactory */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_openmrs_formentry__["c" /* FormFactory */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_navigator_service__["a" /* NavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_navigator_service__["a" /* NavigatorService */]) === "function" && _b || Object])
], FormRendererComponent);

var _a, _b;
//# sourceMappingURL=form-renderer.component.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/models/property-factory.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__textbox_property__ = __webpack_require__("../../../../../src/app/form-editor/models/textbox-property.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_property__ = __webpack_require__("../../../../../src/app/form-editor/models/select-property.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__searchbox_property__ = __webpack_require__("../../../../../src/app/form-editor/models/searchbox-property.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__textarea_property__ = __webpack_require__("../../../../../src/app/form-editor/models/textarea-property.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyFactory; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PropertyFactory = (function () {
    function PropertyFactory() {
    }
    PropertyFactory.prototype.createProperty = function (type, options) {
        if (type.toLowerCase() === 'textbox')
            return new __WEBPACK_IMPORTED_MODULE_1__textbox_property__["a" /* TextboxProperty */](options);
        else if (type.toLowerCase() === 'select')
            return new __WEBPACK_IMPORTED_MODULE_2__select_property__["a" /* SelectProperty */](options);
        else if (type.toLowerCase() === 'searchbox')
            return new __WEBPACK_IMPORTED_MODULE_3__searchbox_property__["a" /* SearchboxProperty */](options);
        else if (type.toLowerCase() === 'textarea')
            return new __WEBPACK_IMPORTED_MODULE_4__textarea_property__["a" /* TextAreaProperty */](options);
        else
            console.log("No such property exists");
    };
    return PropertyFactory;
}());
PropertyFactory = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], PropertyFactory);

//# sourceMappingURL=property-factory.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/models/property-model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyModel; });
var PropertyModel = (function () {
    function PropertyModel(options) {
        if (options === void 0) { options = {}; }
        this.allOtherPossibleProperties = [
            { name: "id", parentPath: "id", type: "any" },
            { name: "concept", parentPath: 'questionOptions.concept', type: "obs" },
            { name: "validators", parentPath: 'validators', type: "any" },
            { name: "default", parentPath: 'default', type: "any" },
            { name: "original", parentPath: 'original', type: "any" },
            { name: "required", parentPath: 'required', type: "any" },
            { name: "historical expression", parentPath: 'historicalExpression', type: "obs" },
            { name: "hide", parentPath: 'hide', type: "any" },
            //{name:"show Date",path:'show Date',type:"any"},
            //{name:"show Weeks",path:'show Weeks',type:"any"},
            { name: "orderSettingUuid", parentPath: 'questionOptions.orderSettingUuid', type: 'testOrder' },
            { name: "orderType", parentPath: 'questionOptions.orderSettingUuid', type: 'testOrder' },
            { name: "calculatedExpressions", parentPath: "calculatedExpressions", type: 'testOrder' }
        ];
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.controlType = options.controlType || '';
        this.required = options.required || false;
        this.parentPath = options.parentPath || '';
        this.order = options.order || 0;
    }
    Object.defineProperty(PropertyModel.prototype, "AllOtherPossibleProperties", {
        get: function () {
            return this.allOtherPossibleProperties;
        },
        enumerable: true,
        configurable: true
    });
    return PropertyModel;
}());

//# sourceMappingURL=property-model.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/models/searchbox-property.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_model__ = __webpack_require__("../../../../../src/app/form-editor/models/property-model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchboxProperty; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SearchboxProperty = (function (_super) {
    __extends(SearchboxProperty, _super);
    function SearchboxProperty(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = "searchbox";
        _this.type = options['type'] || '';
        return _this;
    }
    return SearchboxProperty;
}(__WEBPACK_IMPORTED_MODULE_0__property_model__["a" /* PropertyModel */]));

//# sourceMappingURL=searchbox-property.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/models/select-property.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_model__ = __webpack_require__("../../../../../src/app/form-editor/models/property-model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectProperty; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SelectProperty = (function (_super) {
    __extends(SelectProperty, _super);
    function SelectProperty(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = "select";
        _this.options = [];
        _this.key = options['key'] || '';
        _this.options = options['options'] || [];
        return _this;
    }
    return SelectProperty;
}(__WEBPACK_IMPORTED_MODULE_0__property_model__["a" /* PropertyModel */]));

//# sourceMappingURL=select-property.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/models/textarea-property.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_model__ = __webpack_require__("../../../../../src/app/form-editor/models/property-model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextAreaProperty; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TextAreaProperty = (function (_super) {
    __extends(TextAreaProperty, _super);
    function TextAreaProperty(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = "textarea";
        _this.type = options['type'] || '';
        _this.placeholder = options['placeholder'] || '';
        _this.rows = options['rows'] || 5;
        return _this;
    }
    return TextAreaProperty;
}(__WEBPACK_IMPORTED_MODULE_0__property_model__["a" /* PropertyModel */]));

//# sourceMappingURL=textarea-property.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/models/textbox-property.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_model__ = __webpack_require__("../../../../../src/app/form-editor/models/property-model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextboxProperty; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TextboxProperty = (function (_super) {
    __extends(TextboxProperty, _super);
    function TextboxProperty(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = "textbox";
        _this.type = options['type'] || '';
        _this.placeholder = options['placeholder'] || '';
        return _this;
    }
    return TextboxProperty;
}(__WEBPACK_IMPORTED_MODULE_0__property_model__["a" /* PropertyModel */]));

//# sourceMappingURL=textbox-property.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/navigator/navigator.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#schema{\r\n    cursor: pointer;\r\n    font-size: 18px;\r\n    font-weight: bolder;\r\n    text-decoration:none;\r\n    display: inline-block;\r\n}\r\n.element{\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n    text-decoration:none;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n\r\n.element:hover{\r\n    color:#008cba;\r\n}\r\na{\r\n    color:white;\r\n    font-size: 14px;\r\n    font-weight:bold;\r\n    cursor: pointer;\r\n    text-decoration: none;\r\n}\r\n\r\n.fa-chevron-down,.fa-pencil,.fa-toggle-down{\r\n    color:#008cba !important;  \r\n}\r\n\r\n#schema{\r\n    \r\n\r\n    \r\n}\r\n\r\n.formName{\r\n    margin-bottom: 20px;\r\n}\r\n.display{\r\n    display:none;\r\n}\r\n\r\nlabel{\r\n    font-size: 14px;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.myEditors{\r\n    margin-bottom: 15px;\r\n    padding:10px 10px 10px 10px;\r\n}\r\n.selectMode{\r\n    display: inline-block;\r\n}\r\n\r\n.formName{\r\n    width:100%;\r\n    margin:10px 10px 5px 0px;\r\n    padding:10px 0px 0px 5px;\r\n   \r\n}\r\n\r\n.pages{\r\n    margin:5px 2px 2px 0px;\r\n    padding:5px 5px 5px 5px;\r\n    border-bottom: 1px solid rgba(211, 211, 211, 0.23);\r\n}\r\n\r\n.ref{\r\n    margin-left:20px !important;\r\n}\r\n\r\n.create{\r\n    margin-right:10px !important;\r\n}\r\n\r\n.badge{\r\n    border-radius:3px;\r\n    box-shadow: 0px 4px 3px #888888;\r\n    width: 100%;\r\n    \r\n}\r\n\r\n.badge.sec{\r\n    width:auto;\r\n    background:transparent;\r\n}\r\n\r\n.ref:hover,.create:hover{\r\n    color: #123456 !important\r\n}\r\n\r\n.badge.sec>a{\r\n    color:#008cba !important;\r\n}\r\n.material-icons{\r\n    color: #008cba;\r\n    font-size:18px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-editor/navigator/navigator.component.html":
/***/ (function(module, exports) {

module.exports = " <div class=\"well\">\r\n <div class=\"formName\" *ngIf=\"schema.name==''&&editMode\">\r\n   <form #form=\"ngForm\" id=\"formName\" (ngSubmit)=\"editFormName(form.value)\">\r\n    <div class=\"input-group\">\r\n  <input type=\"text\" class=\"form-control\" ngModel name=\"formName\" [value]=\"schema.name\" placeholder=\"Enter new form name\" required>\r\n  <span class=\"input-group-btn\">\r\n      <button class=\"btn btn-default\" type=\"submit\" [disabled]=\"!form.valid\"><i class=\"fa fa-check\" style=\"color:green\"></i></button>\r\n      <button class=\"btn btn-default\" (click)=\"schema.name=formName\"><i class=\"fa fa-times\"></i></button>\r\n </span>\r\n  </div>\r\n   </form>\r\n </div>\r\n\r\n  <div class=\"formName\" *ngIf=\"schema.name&&selectMode\" >\r\n      <h4 id=\"schema\" (click)=\"onClicked(schema)\"><i class=\"fa fa-lg fa-newspaper-o\"></i> {{schema.name}}</h4>\r\n    </div>\r\n  \r\n    <div class=\"formName\" *ngIf=\"schema.name&&editMode\" >\r\n        <div *ngIf=\"editMode\" style=\"float:right;\" [hidden]=\"editPageMode\" >\r\n            <a><i (click)=\"showNameEditForm(schema.name)\" class=\"material-icons\" aria-hidden=\"true\" data-toggle=\"tooltip\" title=\"Edit form name\">edit</i></a>\r\n        </div>\r\n        <h4 id=\"schema\" (click)=\"onClicked(schema)\"><i class=\"fa fa-newspaper-o\"></i> {{schema.name}}</h4>\r\n       \r\n      </div>\r\n\r\n  <div *ngIf=\"schema.pages\">\r\n    <div class=\"myEditors badge sec\" *ngIf=\"editMode\">\r\n      <a (click)=\"showAddForm('page')\" class=\"create\"> <i class=\"fa fa-plus\"></i> Create new page</a>\r\n      <span style=\"border-right:1px solid lightgray;\"></span>\r\n      <a style=\"cursor:pointer\" (click)=\"addReferencePage()\" class=\"ref\"><i class=\"fa fa-reply-all\"></i>  Reference Page</a>\r\n    </div>\r\n    \r\n   \r\n \r\n \r\n  <div *ngFor=\"let page of schema.pages; let i=index;\">\r\n      <div class=\"pages\">\r\n    <div *ngIf=\"selectMode&&_refElement=='page'\" class=\"selectMode\">\r\n      <input type=\"checkbox\" (change)=\"setCheckedReferenceElement($event,page.label)\">\r\n    </div>\r\n    \r\n    <a [href]=\"'#page'+page.label.slice(0,2)+_formSchema.name.slice(0,2)+i\" data-toggle=\"collapse\"><i class=\"fa fa-chevron-down\"></i></a>\r\n\r\n    <label  (click)=\"onClicked(page,i)\" class=\"element\">{{page.label}}</label>\r\n \r\n  \r\n    <div *ngIf=\"editMode\" style=\"float:right;\" [hidden]=\"editPageMode\" >\r\n      <a><i (click)=\"showEditForm(page,i) \" class=\"material-icons\" aria-hidden=\"true\">edit</i></a>\r\n      <a><i class=\"material-icons del\" aria-hidden=\"true\"  style=\"color:#8b0000\" (click)=\"showDeleteDialog(page,'page',i)\">delete_forever</i></a>\r\n    </div>\r\n\r\n\r\n    <div [id]=\"'page'+page.label.slice(0,2)+ _formSchema.name.slice(0,2)+ i\" class=\"collapse\">\r\n      <app-navigator [pageIndex]=\"i\" [_schema]=\"page\" [formSchema]=\"_formSchema\" [mode]=\"mode\" [count]=\"_count\" [referenceElement]=\"_refElement\" \r\n      (nestedCheckedRefElementEmitter)=\"setCheckedReferenceElement($event)\">></app-navigator>\r\n     \r\n    </div>\r\n    </div>\r\n </div>\r\n</div>\r\n\r\n\r\n\r\n<div style=\"margin-left:25px\" *ngIf=\"schema.sections\">\r\n  <div class=\"myEditors badge sec\" *ngIf=\"editMode\">\r\n    <a (click)=\"showAddForm('section',pageIndex)\" class=\"create\"> <i class=\"fa fa-plus\"></i> Create new section</a>\r\n    <span style=\"border-right:1px solid lightgray;\"></span>\r\n    <a style=\"cursor:pointer\" data-toggle=\"tooltip\" title=\"Reference section\" (click)=\"addReferenceSection(pageIndex)\" class=\"ref\"><i class=\"fa fa-reply-all\"></i> Reference Section</a>\r\n  </div>\r\n\r\n  <div *ngFor=\"let section of schema.sections; let j= index;\">\r\n\r\n      <div *ngIf=\"selectMode&&_refElement=='section'\" class=\"selectMode\">\r\n          <input type=\"checkbox\" (change)=\"emitCheckedReferenceElement($event,{'page':_formSchema.pages[pageIndex].label,'section':section.label})\">\r\n        </div>\r\n   \r\n\r\n    <a [href]=\"'#section'+section.label.slice(0,2)+pageIndex+ _formSchema.name.slice(0,2)+j\" data-toggle=\"collapse\"><i class=\"fa fa-chevron-down\"> </i></a>\r\n\r\n    <label (click)=\"onClicked(section,pageIndex,j)\" class=\"element\">{{section.label}}</label>\r\n\r\n    <div *ngIf=\"editMode\" style=\"float:right;\" [hidden]=\"editPageMode || editSectionMode\">\r\n        <a><i (click)=\"showEditForm(section,pageIndex,j) \" class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a>\r\n        <a><i class=\"fa fa-trash-o\" aria-hidden=\"true\"  style=\"color:#8b0000\" (click)=\"showDeleteDialog(section,'section',pageIndex,j)\"></i></a>\r\n      </div>\r\n\r\n      <!--Exclude Section-->\r\n      <!-- <div *ngIf=\"selectMode&&_refElement=='page'\" style=\"float:right;\">\r\n          <a ><i class=\"fa fa-times\" aria-hidden=\"true\"  data-toggle=\"tooltip\" title=\"Exclude section\" style=\"color:red\" (click)=\"excludeSection(pageIndex,j)\"></i></a>\r\n          </div> -->\r\n      \r\n    \r\n    <div [id]=\"'section'+section.label.slice(0,2)+pageIndex+ _formSchema.name.slice(0,2)+j\" class=\"collapse\">\r\n      <app-navigator [sectionIndex]=\"j\" [_schema]=\"section\" [formSchema]=\"_formSchema\" [pageIndex]=\"pageIndex\" \r\n       [mode]=\"mode\" [referenceElement]=\"_refElement\" (nestedCheckedRefElementEmitter)=\"emitCheckedReferenceElement($event.event,$event.element)\"></app-navigator>\r\n    </div>\r\n  </div> \r\n</div>\r\n\r\n<div style=\"margin-left:25px\" *ngIf=\"schema.questions\">\r\n  <div class=\"myEditors badge sec\" *ngIf=\"editMode\">\r\n    <a (click)=\"addQuestion(pageIndex,sectionIndex,questionIndex)\" class=\"create\">\r\n      <i class=\"fa fa-plus\"></i> Create new question</a>\r\n      <!-- <span style=\"border-right:1px solid lightgray;\"></span>\r\n      <a style=\"cursor:pointer\" data-toggle=\"tooltip\" title=\"Reference question\" (click)=\"addReferenceQuestion(pageIndex,sectionIndex,questionIndex)\" class=\"ref\" ><i class=\"fa fa-reply-all\"></i> Reference Question</a> -->\r\n  </div>\r\n\r\n\r\n  <div *ngFor=\"let question of schema.questions; let k=index;\">\r\n\r\n    <!-- <div *ngIf=\"selectMode&&_refElement=='question'\" class=\"selectMode\">\r\n      <input type=\"checkbox\" \r\n      (change)=\"emitCheckedReferenceElement($event,{'page':_formSchema.pages[pageIndex].label,'section':_formSchema.pages[pageIndex].sections[sectionIndex].label,'question':question.id || question.questions})\">\r\n    </div> -->\r\n\r\n    <a *ngIf=\"question.questions\" [href]=\"'#question'+question.label.slice(0,3)+ _formSchema.name.slice(0,2)+pageIndex+sectionIndex+k\" data-toggle=\"collapse\"><i class=\"fa fa-toggle-down\"> </i></a>\r\n    <p class=\"element\" (click)=\"onClicked(question,pageIndex,sectionIndex,k, questionIndex)\">{{question.label}}</p>\r\n\r\n    <!-- Exclude A Question -->\r\n    <div *ngIf=\"selectMode&&_refElement=='section'&&question.id\" style=\"float:right;\">\r\n    <a ><i class=\"fa fa-times\" aria-hidden=\"true\"  data-toggle=\"tooltip\" title=\"Exclude question\" style=\"color:red\" (click)=\"excludeQuestion(pageIndex,sectionIndex,k,questionIndex,question.id)\"></i></a>\r\n    </div>\r\n\r\n    <div *ngIf=\"editMode\" style=\"float:right;\" [hidden]=\"editPageMode || editSectionMode\">\r\n      <a><i (click)=\"editQuestion(question,pageIndex,sectionIndex,k,questionIndex)\" class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a>\r\n      <a><i class=\"fa fa-trash-o\" aria-hidden=\"true\"  style=\"color:#8b0000\" (click)=\"showDeleteDialog(question,'question',pageIndex,sectionIndex,k,questionIndex)\"></i></a>\r\n    </div>\r\n  \r\n\r\n    <div [id]=\"'question'+question.label.slice(0,3)+ _formSchema.name.slice(0,2)+pageIndex+sectionIndex+k\" class=\"collapse\">\r\n      <app-navigator [sectionIndex]=\"sectionIndex\" [pageIndex]=\"pageIndex\" [questionIndex]=\"k\" [_schema]=\"question\"\r\n       [formSchema]=\"_formSchema\" [count]=\"_count\" [mode]=\"mode\" [referenceElement]=\"_refElement\" \r\n       (nestedCheckedRefElementEmitter)=\"emitCheckedReferenceElement($event.event,$event.element)\"></app-navigator>\r\n    </div>\r\n  </div>\r\n  \r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/form-editor/navigator/navigator.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_confirm_component__ = __webpack_require__("../../../../../src/app/modals/confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_prompt_component__ = __webpack_require__("../../../../../src/app/modals/prompt.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_alert_component__ = __webpack_require__("../../../../../src/app/modals/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_reference_form_modal_reference_form_modal__ = __webpack_require__("../../../../../src/app/modals/reference-form-modal/reference-form.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__form_elements_form_element_factory__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/form-element-factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__form_elements_form_factory_service__ = __webpack_require__("../../../../../src/app/form-editor/form-elements/form-factory.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Services_navigator_service__ = __webpack_require__("../../../../../src/app/Services/navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Services_fetch_form_detail_service__ = __webpack_require__("../../../../../src/app/Services/fetch-form-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_question_control_service__ = __webpack_require__("../../../../../src/app/Services/question-control.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_openmrs_formentry__ = __webpack_require__("../../../../ng2-openmrs-formentry/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var NavigatorComponent = (function () {
    function NavigatorComponent(fb, ns, qcs, formElementFactory, dialogService, fs, fsc, formFactory) {
        this.fb = fb;
        this.ns = ns;
        this.qcs = qcs;
        this.formElementFactory = formElementFactory;
        this.dialogService = dialogService;
        this.fs = fs;
        this.fsc = fsc;
        this.formFactory = formFactory;
        this._count = 0;
        this.editPageMode = false;
        this.editSectionMode = false;
        this.checkedRefElements = []; //selected elements to be referenced
        this.excludedQuestions = [];
        this.closeSidebar = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.checkedRefElementsEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.nestedCheckedRefElementEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(NavigatorComponent.prototype, "referenceElement", {
        set: function (refElement) { this._refElement = refElement; },
        enumerable: true,
        configurable: true
    });
    ; //element to be referenced if select mode
    Object.defineProperty(NavigatorComponent.prototype, "count", {
        set: function (count) { this._count = count; } //keeps count of recursive calls
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigatorComponent.prototype, "_schema", {
        set: function (schema) { this.schema = schema; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigatorComponent.prototype, "formSchema", {
        set: function (fschema) { this._formSchema = __WEBPACK_IMPORTED_MODULE_13_lodash__["clone"](fschema); },
        enumerable: true,
        configurable: true
    });
    ;
    NavigatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showSpinner();
        this.subscription = this.fs.getReferencedFormsArray().subscribe(function (res) { return _this.referencedForms = res; });
        this.subscription = this.ns.getRawSchema().subscribe(function (res) { return _this.rawSchema = __WEBPACK_IMPORTED_MODULE_13_lodash__["cloneDeep"](res); });
        if (this.mode == 'edit') {
            this.editMode = true;
            this.selectMode = false;
        }
        else {
            this.selectMode = true;
            this.editMode = false;
        }
        this.subscription = this.ns.getExcludedQuestions().subscribe(function (res) {
            if (res != "")
                _this.excludedQuestions.push(res);
            else
                _this.excludedQuestions = [];
        });
    };
    //when element is clicked in navigator
    NavigatorComponent.prototype.onClicked = function (selectedSchema, pageIndex, sectionIndex, questionIndex, parentQuestionIndex) {
        if (this.selectMode)
            return;
        var schemaObj = {};
        schemaObj['selectedSchema'] = selectedSchema;
        schemaObj['pageIndex'] = pageIndex;
        schemaObj['sectionIndex'] = sectionIndex;
        schemaObj['questionIndex'] = questionIndex;
        this.ns.setClickedElementSchema(schemaObj);
        if (pageIndex != undefined && sectionIndex != undefined && questionIndex != undefined && parentQuestionIndex != undefined) {
            if (this.rawSchema.pages[pageIndex].label) {
                if (this.rawSchema.pages[pageIndex].sections[sectionIndex].label) {
                    this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].questions[parentQuestionIndex]);
                    return;
                }
                else {
                    this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex].sections[sectionIndex]);
                    return;
                }
            }
            else {
                this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex]);
            }
        }
        else if (pageIndex != undefined && sectionIndex != undefined && questionIndex != undefined) {
            if (this.rawSchema.pages[pageIndex].label) {
                if (this.rawSchema.pages[pageIndex].sections[sectionIndex].label) {
                    this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex].sections[sectionIndex].questions[questionIndex]);
                    return;
                }
                else {
                    this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex].sections[sectionIndex]);
                    return;
                }
            }
            else {
                this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex]);
                return;
            }
        }
        else if (pageIndex != undefined && sectionIndex != undefined) {
            if (this.rawSchema.pages[pageIndex].label) {
                this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex].sections[sectionIndex]);
                return;
            }
            else {
                this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex]);
            }
        }
        else if (selectedSchema['name']) {
            console.log("tere", this.rawSchema);
            this.ns.setClickedElementRawSchema(this.rawSchema);
        }
        else {
            this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex]);
            return;
        }
    };
    NavigatorComponent.prototype.showEditForm = function (schema, pageIndex, sectionIndex) {
        this.propertyModelArray = this.qcs.toPropertyModelArray(schema);
        this.editForm = this.qcs.toFormGroup(this.propertyModelArray);
        if (schema.sections) {
            this.showEditDialog(this.propertyModelArray, this.editForm, pageIndex);
        }
        else {
            this.showEditDialog(this.propertyModelArray, this.editForm, pageIndex, sectionIndex);
        }
    };
    NavigatorComponent.prototype.showAddForm = function (element, pageIndex) {
        if (element == 'page') {
            var newPage = this.formElementFactory.createFormElement(element, { "label": '' });
            this.propertyModelArray = this.qcs.toPropertyModelArray(newPage);
            this.addForm = this.qcs.toFormGroup(this.propertyModelArray);
            this.showAddDialog(this.propertyModelArray, this.addForm);
        }
        else {
            console.log(pageIndex);
            var newSection = this.formElementFactory.createFormElement(element, {});
            this.propertyModelArray = this.qcs.toPropertyModelArray(newSection);
            this.addForm = this.qcs.toFormGroup(this.propertyModelArray);
            this.showAddDialog(this.propertyModelArray, this.addForm, pageIndex);
        }
    };
    NavigatorComponent.prototype.showDeleteDialog = function (schema, element, pageIndex, sectionIndex, questionIndex, parentQuestionIndex) {
        var _this = this;
        this.subscription = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_1__modals_confirm_component__["a" /* ConfirmComponent */], {
            title: 'Delete ' + element,
            message: 'Are you sure you want to delete ' + schema.label
        }, { backdropColor: 'rgba(0,0, 0, 0.5)' })
            .subscribe(function (isConfirmed) {
            if (isConfirmed) {
                if (element == 'page')
                    _this.deletePage(pageIndex);
                else if (element == 'section')
                    _this.deleteSection(pageIndex, sectionIndex);
                else
                    _this.deleteQuestion(pageIndex, sectionIndex, questionIndex, parentQuestionIndex);
            }
        });
    };
    NavigatorComponent.prototype.showEditDialog = function (propModelArray, form, pageIndex, sectionIndex) {
        var _this = this;
        if (sectionIndex > -1)
            this.subscription = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_prompt_component__["a" /* PromptComponent */], { title: 'Edit Section', questions: propModelArray, form: form })
                .subscribe(function (formValue) {
                if (formValue)
                    _this.editSection(formValue, pageIndex, sectionIndex);
            });
        else
            this.subscription = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_prompt_component__["a" /* PromptComponent */], { title: "Edit Page", questions: propModelArray, form: form })
                .subscribe(function (formValue) {
                if (formValue)
                    _this.editPage(formValue['label'], pageIndex);
            });
    };
    NavigatorComponent.prototype.showAddDialog = function (propModelArray, form, pageIndex) {
        var _this = this;
        if (pageIndex != undefined && pageIndex > -1) {
            this.subscription = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_prompt_component__["a" /* PromptComponent */], { title: 'Create Section', questions: propModelArray, form: form }, { backdropColor: 'rgba(255, 255, 255, 0.5)' })
                .subscribe(function (formValue) {
                if (formValue != undefined)
                    _this.addSection(formValue, pageIndex);
            });
        }
        else
            this.subscription = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_2__modals_prompt_component__["a" /* PromptComponent */], { title: 'Create Page', questions: propModelArray, form: form }, { backdropColor: 'rgba(255, 255, 255, 0.5)' })
                .subscribe(function (formValue) {
                if (formValue)
                    _this.addPage(formValue['label']);
            });
    };
    NavigatorComponent.prototype.editPage = function (label, pageIndex) {
        if (this.rawSchema.pages[pageIndex].label) {
            this._formSchema.pages[pageIndex].label = label;
            this.rawSchema.pages[pageIndex].label = label;
            this.setSchema(this._formSchema);
            this.setRawSchema(this.rawSchema);
        }
        else {
            this.showAlertDialog("You cannot edit a referenced page.");
            return false;
        }
    };
    NavigatorComponent.prototype.editSection = function (value, pageIndex, sectionIndex) {
        if (this.rawSchema.pages[pageIndex].label) {
            if (this.rawSchema.pages[pageIndex].sections[sectionIndex].label) {
                this.schema['sections'][sectionIndex].label = value.label;
                this.schema['sections'][sectionIndex].isExpanded = value.isExpanded;
                this._formSchema.pages[pageIndex] = this.schema;
                this.rawSchema.pages[pageIndex] = this.schema;
                this.setSchema(this._formSchema);
                this.setRawSchema(this.rawSchema);
            }
            else {
                this.showAlertDialog("You cannot edit a referenced section.");
                return false;
            }
        }
        else {
            this.showAlertDialog("You cannot edit a referenced page.");
            return false;
        }
    };
    NavigatorComponent.prototype.editQuestion = function (question, pageIndex, sectionIndex, questionIndex, parentQuestionIndex) {
        var schemaObj = {};
        schemaObj['selectedSchema'] = question;
        schemaObj['pageIndex'] = pageIndex;
        schemaObj['sectionIndex'] = sectionIndex;
        schemaObj['questionIndex'] = questionIndex;
        schemaObj['parentQuestionIndex'] = parentQuestionIndex;
        this.ns.setClickedElementSchema(schemaObj); //set the current edited question in the schema editor
        this.propertyModelArray = this.qcs.toPropertyModelArray(question);
        if (parentQuestionIndex != undefined && parentQuestionIndex > -1) {
            this.ns.newQuestion(this.propertyModelArray, pageIndex, sectionIndex, questionIndex, parentQuestionIndex);
        }
        else {
            this.ns.newQuestion(this.propertyModelArray, pageIndex, sectionIndex, questionIndex);
        }
    };
    NavigatorComponent.prototype.addPage = function (label) {
        if (!this.doesPageExist(label)) {
            var newPage = this.formElementFactory.createFormElement("page", { "label": label });
            this.rawSchema.pages.push(newPage);
            this._formSchema.pages.push(newPage);
            this.ns.setSchema(this._formSchema);
            this.ns.setRawSchema(this.rawSchema);
            console.log(this._formSchema);
        }
        else
            this.showAlertDialog("Page already exists! \n Try creating one with a different label!");
    };
    NavigatorComponent.prototype.addSection = function (value, pageIndex) {
        var newSection = this.formElementFactory.createFormElement("section", { "label": value.label, "isExpanded": value.isExpanded });
        this._formSchema.pages[pageIndex].sections.push(newSection);
        this.rawSchema.pages[pageIndex].sections.push(newSection);
        this.setSchema(this._formSchema);
        this.setRawSchema(this.rawSchema);
    };
    NavigatorComponent.prototype.addQuestion = function (pageIndex, sectionIndex, questionIndex) {
        console.log("Page Index", pageIndex, "Section Index", sectionIndex, "questionIndex", questionIndex);
        var newQuestion = this.formElementFactory.createFormElement("question", {});
        var propertyModelArray = this.qcs.toPropertyModelArray(newQuestion);
        if (questionIndex != undefined) {
            this.ns.newQuestion(propertyModelArray, pageIndex, sectionIndex, questionIndex); // obsGroup
        }
        else {
            this.ns.newQuestion(propertyModelArray, pageIndex, sectionIndex);
        }
    };
    NavigatorComponent.prototype.deletePage = function (pageIndex) {
        this._formSchema.pages.splice(pageIndex, 1);
        this.rawSchema.pages.splice(pageIndex, 1);
        this.setSchema(this._formSchema);
        this.setRawSchema(this.rawSchema);
    };
    NavigatorComponent.prototype.deleteSection = function (pageIndex, sectionIndex) {
        this._formSchema.pages[pageIndex].sections.splice(sectionIndex, 1);
        this.rawSchema.pages[pageIndex].sections.splice(sectionIndex, 1);
        this.setSchema(this._formSchema);
        this.setRawSchema(this.rawSchema);
    };
    NavigatorComponent.prototype.deleteQuestion = function (pageIndex, sectionIndex, questionIndex, parentQuestionIndex) {
        if (parentQuestionIndex !== undefined) {
            this._formSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex, 1);
            this.rawSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex, 1);
        }
        else {
            this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex, 1);
            this.rawSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex, 1);
        }
        this.setSchema(this._formSchema);
        this.setRawSchema(this.rawSchema);
    };
    NavigatorComponent.prototype.doesPageExist = function (label) {
        var result = false;
        this._formSchema.pages.forEach(function (page) {
            if (Object.is(label.toLowerCase(), page.label.toLowerCase())) {
                result = true;
            }
        });
        return result;
    };
    NavigatorComponent.prototype.addReferencePage = function () {
        var _this = this;
        if (this.referencedForms.length > 0)
            this.subscription = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_reference_form_modal_reference_form_modal__["a" /* ReferenceModalComponent */], {
                refElement: 'Page'
            }, { backdropColor: 'rgba(0, 0, 0, 0.5)' })
                .subscribe(function (res) {
                if (res != undefined) {
                    _this.createRefPages(JSON.parse(res));
                }
            });
        else
            this.showAlertDialog("Insert reference form first");
    };
    NavigatorComponent.prototype.addReferenceSection = function (pageIndex) {
        var _this = this;
        this.ns.setExcludedQuestions("");
        if (this.referencedForms.length > 0)
            this.subscription = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_reference_form_modal_reference_form_modal__["a" /* ReferenceModalComponent */], {
                refElement: 'Section'
            }, { backdropColor: 'rgba(0, 0, 0, 0.5)' })
                .subscribe(function (res) {
                if (res != undefined) {
                    _this.createRefSections(JSON.parse(res), pageIndex);
                }
            });
        else
            this.showAlertDialog("Insert reference form first");
    };
    NavigatorComponent.prototype.addReferenceQuestion = function (pageIndex, sectionIndex, questionIndex) {
        if (this.referencedForms.length > 0)
            this.subscription = this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__modals_reference_form_modal_reference_form_modal__["a" /* ReferenceModalComponent */], {
                refElement: 'Question'
            }, { backdropColor: 'rgba(0,0,0,0.5)'
            }).subscribe(function (res) {
                if (res != undefined) {
                    //this.createRefQuestions(JSON.parse(res),pageIndex,sectionIndex,questionIndex)
                }
            });
    };
    NavigatorComponent.prototype.setCheckedReferenceElement = function (event, element) {
        var _this = this;
        var ev;
        var el;
        if (element) {
            console.log(element);
            ev = event;
            el = element;
        }
        else {
            ev = event.event;
            el = event.element;
        }
        if (ev.target.checked) {
            this.checkedRefElements.push(el);
        }
        else {
            if (this.checkedRefElements.length > 0) {
                this.checkedRefElements.forEach(function (element, index) {
                    if (typeof element != 'object' && element == el) {
                        _this.checkedRefElements.splice(index, 1);
                    }
                    else if (typeof element == 'object' && JSON.stringify(el) === JSON.stringify(element)) {
                        _this.checkedRefElements.splice(index, 1);
                    }
                });
            }
        }
        if (this.schema['pages'])
            this.checkedRefElementsEmitter.emit(this.checkedRefElements);
    };
    NavigatorComponent.prototype.emitCheckedReferenceElement = function (event, element) {
        var e = {};
        e['event'] = event;
        e['element'] = element;
        this.nestedCheckedRefElementEmitter.emit(e);
    };
    NavigatorComponent.prototype.closeNav = function () {
        this.closeSidebar.emit(true);
    };
    NavigatorComponent.prototype.createRefPages = function (res) {
        var _this = this;
        var formProps = this.createBasicFormProps();
        var tempSchema;
        for (var _i = 0, _a = JSON.parse(res['Pages']); _i < _a.length; _i++) {
            var el = _a[_i];
            var obj = {};
            obj['reference'] = { "form": res.form, "page": el };
            formProps['pages'].push(obj);
            obj = JSON.stringify(obj);
            for (var page in this.rawSchema.pages) {
                if (!__WEBPACK_IMPORTED_MODULE_13_lodash__["isEqual"](obj, page)) {
                    this.rawSchema.pages.push(JSON.parse(obj));
                    break;
                }
            }
        }
        var mockForm = this.formFactory.createForm(formProps);
        var compiledForm = this.fsc.compileFormSchema(mockForm, this.referencedForms);
        compiledForm['pages'].forEach(function (page) {
            if (_this.doesPageExist(page.label)) {
                _this.showAlertDialog(page.label + " already exists! \n Try referencing one with a different label");
            }
            else {
                _this._formSchema.pages.push(page);
                _this.setSchema(_this._formSchema);
                _this.setRawSchema(_this.rawSchema);
            }
        });
    };
    NavigatorComponent.prototype.createRefSections = function (res, pageIndex) {
        var _this = this;
        var formProps = this.createBasicFormProps(pageIndex);
        var formAlias = res.form;
        for (var _i = 0, _a = JSON.parse(res['Sections']); _i < _a.length; _i++) {
            var el = _a[_i];
            var obj = {};
            if (this.excludedQuestions.length > 0) {
                obj['reference'] = { "form": res.form, "page": el.page, "section": el.section, "excludeQuestions": this.addExcludedQuestions(res.form, el) };
            }
            else {
                obj['reference'] = { "form": res.form, "page": el.page, "section": el.section };
            }
            formProps['pages'][0]['sections'].push(obj);
            obj = JSON.stringify(obj);
            if (!this.rawSchema.pages) {
                this.showAlertDialog("You cannot reference a section in a referenced page! Please create a new page in order to reference this section.");
                return false;
            }
            else {
                this.rawSchema.pages[pageIndex].sections.push(JSON.parse(obj));
            }
        }
        var mockForm = this.formFactory.createForm(formProps);
        var compiledForm = this.fsc.compileFormSchema(mockForm, this.referencedForms);
        compiledForm['pages'][0]['sections'].forEach(function (section) {
            _this._formSchema.pages[pageIndex].sections.push(section);
        });
        this.setSchema(this._formSchema);
        this.setRawSchema(this.rawSchema);
    };
    // createRefQuestions(res,pageIndex,sectionIndex,questionIndex?){
    // 	console.log(res)
    // 	let formProps=this.createBasicFormProps(pageIndex,sectionIndex)
    // 	for(var el of JSON.parse(res['Questions'])){
    // 		let obj = {}
    // 		  obj['reference']={"form":res.form, "page":el.page, "section":el.section, "question":el.question}
    // 		  formProps['pages'][0]['sections'][0].questions.push(obj)
    // 	}
    // 	 let mockForm = this.formFactory.createForm(formProps)
    // 	 let compiledForm = this.fsc.compileFormSchema(mockForm,this.referencedForms)
    // 	 console.log(compiledForm)
    //console.log(compiledForm)
    // compiledForm['pages'][0]['sections'][0]['questions'].forEach(
    // 	question => {
    // 		if(questionIndex!==undefined){
    // 			this._formSchema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].push(question)
    // 		}
    // 		else{
    // 			this._formSchema.pages[pageIndex].sections[sectionIndex].questions.push(question)
    // 		}
    // 	}
    // )
    //}
    NavigatorComponent.prototype.createBasicFormProps = function (pageIndex, sectionIndex) {
        var formProps = {};
        formProps['name'] = this._formSchema.name;
        formProps['uuid'] = this._formSchema.uuid;
        formProps['processor'] = this._formSchema.processor;
        formProps['referencedForms'] = this._formSchema.referencedForms;
        formProps['pages'] = [];
        if (pageIndex != undefined && sectionIndex != undefined) {
            formProps['pages'].push(this.formElementFactory.createFormElement('page', { "label": this._formSchema.pages[pageIndex].label }));
            formProps['pages'][0].sections.push(this.formElementFactory.createFormElement('section', { "label": this._formSchema.pages[pageIndex].sections[sectionIndex].label, "questions": [] }));
            console.log("formProps", formProps);
            return formProps;
        }
        if (pageIndex !== undefined) {
            formProps['pages'].push(this.formElementFactory.createFormElement('page', { "label": this._formSchema.pages[pageIndex].label }));
            return formProps;
        }
        else {
            return formProps;
        }
    };
    NavigatorComponent.prototype.addExcludedQuestions = function (res, el) {
        var _this = this;
        var exQ = this.excludedQuestions;
        var formAlias = res;
        var final = [];
        var acceptedQuestionIds = [];
        var referencedFormDits = [];
        this.fs.fetchReferencedForms().subscribe(function (dits) {
            referencedFormDits = __WEBPACK_IMPORTED_MODULE_13_lodash__["cloneDeep"](dits);
            referencedFormDits.forEach(function (form) {
                if (form.alias = formAlias) {
                    _this.referencedForms.forEach(function (form$, index) {
                        if (form$.name == form.formName) {
                            form$.pages.forEach(function (page, pageIndex) {
                                if (page.label == el.page) {
                                    form$.pages[pageIndex].sections.forEach(function (section, sectionIndex) {
                                        if (section.label == el.section) {
                                            form$.pages[pageIndex].sections[sectionIndex].questions.forEach(function (question) {
                                                if (question.id) {
                                                    acceptedQuestionIds.push(question.id);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
        acceptedQuestionIds.forEach(function (questionID) {
            exQ.forEach(function (excludedQuestionId) {
                if (excludedQuestionId == questionID) {
                    final.push(excludedQuestionId);
                }
            });
        });
        return final;
    };
    NavigatorComponent.prototype.excludeQuestion = function (pageIndex, sectionIndex, questionIndex, parentQuestionIndex, questionID) {
        if (parentQuestionIndex != undefined) {
            this._formSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex, 1);
        }
        else {
            this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex, 1);
        }
        // this.findAndReplaceReferenceFormByName(this._formSchema.name,this._formSchema);
        this.ns.setExcludedQuestions(questionID);
    };
    // excludeSection(pageIndex,sectionIndex){
    // 	this._formSchema.pages[pageIndex].sections.splice(sectionIndex,1);
    // 	this.findAndReplaceReferenceFormByName(this._formSchema.name,this._formSchema)
    // }
    NavigatorComponent.prototype.findAndReplaceReferenceFormByName = function (name, schema) {
        var _this = this;
        this.referencedForms.forEach(function (form, index) {
            if (form.name == name) {
                _this.referencedForms.splice(index, 1, schema);
            }
        });
    };
    NavigatorComponent.prototype.showAlertDialog = function (message) {
        this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_3__modals_alert_component__["a" /* AlertComponent */], { message: message });
    };
    NavigatorComponent.prototype.setRawSchema = function (obj) {
        this.ns.setRawSchema(obj);
    };
    NavigatorComponent.prototype.setSchema = function (schema) {
        this.ns.setSchema(this._formSchema);
    };
    NavigatorComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    NavigatorComponent.prototype.editFormName = function (value) {
        this._formSchema.name = value.formName;
        this.setSchema(this._formSchema);
    };
    NavigatorComponent.prototype.showNameEditForm = function (name) {
        this.formName = name;
        this.schema['name'] = '';
    };
    NavigatorComponent.prototype.showSpinner = function () {
        try {
            if (!__WEBPACK_IMPORTED_MODULE_13_lodash__["isEmpty"](this._formSchema.pages)) {
                var lastPageIndex = this._formSchema.pages.length - 1;
                if (this._formSchema.pages[lastPageIndex].sections) {
                    var lastSectionIndex = this._formSchema.pages[lastPageIndex].sections.indexOf(this._formSchema.pages[lastPageIndex].sections[this._formSchema.pages[lastPageIndex].sections.length - 1]);
                    if (this._formSchema.pages[lastPageIndex].sections[lastSectionIndex].questions) {
                        var lastQuestionIndex = this._formSchema.pages[lastPageIndex].sections[lastSectionIndex].questions.indexOf(this._formSchema.pages[lastPageIndex].sections[lastSectionIndex].questions[this._formSchema.pages[lastPageIndex].sections[lastSectionIndex].questions.length - 1]);
                        if (this._formSchema.pages[lastPageIndex].sections[lastSectionIndex].questions[lastQuestionIndex] == this.schema) {
                            this.fs.setLoaded(true);
                        }
                    }
                    else {
                        this.fs.setLoaded(true);
                    }
                }
                else {
                    this.fs.setLoaded(true);
                }
            }
            else {
                this.fs.setLoaded(true);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    return NavigatorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], NavigatorComponent.prototype, "mode", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], NavigatorComponent.prototype, "pageIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], NavigatorComponent.prototype, "sectionIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], NavigatorComponent.prototype, "questionIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NavigatorComponent.prototype, "referenceElement", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NavigatorComponent.prototype, "count", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NavigatorComponent.prototype, "_schema", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NavigatorComponent.prototype, "formSchema", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], NavigatorComponent.prototype, "closeSidebar", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], NavigatorComponent.prototype, "checkedRefElementsEmitter", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _c || Object)
], NavigatorComponent.prototype, "nestedCheckedRefElementEmitter", void 0);
NavigatorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navigator',
        template: __webpack_require__("../../../../../src/app/form-editor/navigator/navigator.component.html"),
        styles: [__webpack_require__("../../../../../src/app/form-editor/navigator/navigator.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_11__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__angular_forms__["j" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__Services_navigator_service__["a" /* NavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__Services_navigator_service__["a" /* NavigatorService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_10__Services_question_control_service__["a" /* QuestionControlService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__Services_question_control_service__["a" /* QuestionControlService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__form_elements_form_element_factory__["a" /* FormElementFactory */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__form_elements_form_element_factory__["a" /* FormElementFactory */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ng2_bootstrap_modal__["DialogService"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_9__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_12_ng2_openmrs_formentry__["a" /* FormSchemaCompiler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12_ng2_openmrs_formentry__["a" /* FormSchemaCompiler */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_6__form_elements_form_factory_service__["a" /* FormFactory */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__form_elements_form_factory_service__["a" /* FormFactory */]) === "function" && _l || Object])
], NavigatorComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
//# sourceMappingURL=navigator.component.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/reference-forms/reference-forms.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".badge{\n    font-weight: bold;\n} ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-editor/reference-forms/reference-forms.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\"_schema\">\n\n<button class=\"btn btn-success\" [mdMenuTriggerFor]=\"menu\" >\n Referenced Forms\n</button>\n<md-menu #menu=\"mdMenu\">\n  <div style=\"padding:20px;\">\n  <button md-menu-item  (click)=\"insertRefForm()\"><a (click)=\"insertRefForm()\"><i class=\"fa fa-plus\"></i> Insert reference form</a></button>\n  <hr/>\n  <h5 class=\"badge badge-primary\">Referenced Forms</h5>\n  <button (click)=\"display(form)\" md-menu-item *ngFor=\"let form of refFormsArray\">{{form.name}}</button>\n</div>\n\n</md-menu>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/form-editor/reference-forms/reference-forms.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_insert_reference_form_modal_insert_reference_forms_modal__ = __webpack_require__("../../../../../src/app/modals/insert-reference-form-modal/insert-reference-forms.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_fetch_all_forms_service__ = __webpack_require__("../../../../../src/app/Services/fetch-all-forms.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_navigator_service__ = __webpack_require__("../../../../../src/app/Services/navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Services_fetch_form_detail_service__ = __webpack_require__("../../../../../src/app/Services/fetch-form-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_schema_editor_modal__ = __webpack_require__("../../../../../src/app/modals/schema-editor.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash__);
/* unused harmony export ReferenceForms */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReferenceFormsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ReferenceForms = (function () {
    function ReferenceForms() {
        this.ref = {
            "uuid": '',
            "display": ''
        };
    }
    return ReferenceForms;
}());

var ReferenceFormsComponent = (function () {
    function ReferenceFormsComponent(fas, ds, ns, fs) {
        this.fas = fas;
        this.ds = ds;
        this.ns = ns;
        this.fs = fs;
        this.refForm = new ReferenceForms(); //the one being inserted
        this.st = '';
    }
    Object.defineProperty(ReferenceFormsComponent.prototype, "schema", {
        set: function (schema) {
            this._schema = __WEBPACK_IMPORTED_MODULE_7_lodash__["cloneDeep"](schema);
        },
        enumerable: true,
        configurable: true
    });
    ReferenceFormsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fas.fetchAllComponentForms().subscribe(function (res) { return _this.componentForms = res.results; });
        this.ns.getRawSchema().subscribe(function (res) { return _this._rawSchema = __WEBPACK_IMPORTED_MODULE_7_lodash__["cloneDeep"](res); });
        this.fs.getReferencedFormsArray().subscribe(function (res) {
            if (res.length > 0) {
                _this.refFormsArray = res;
            }
            else {
                _this.refFormsArray = [];
            }
        });
    };
    ReferenceFormsComponent.prototype.insertRefForm = function () {
        var _this = this;
        this.ds.addDialog(__WEBPACK_IMPORTED_MODULE_1__modals_insert_reference_form_modal_insert_reference_forms_modal__["a" /* InsertReferenceComponent */], { forms: this.componentForms }, { backdropColor: 'rgba(0, 0, 0, 0.5)' })
            .subscribe(function (selectedForms) {
            if (selectedForms) {
                _this.refForm.formName = selectedForms['form'].substring(selectedForms['form'].indexOf(' ') + 1);
                _this.refForm.alias = selectedForms['alias'];
                _this.refForm.ref['display'] = selectedForms['display'];
                _this.refForm.ref['uuid'] = selectedForms['form'].substring(0, selectedForms['form'].indexOf(' '));
                _this.addReferenceForm(_this.refForm);
            }
        });
    };
    ReferenceFormsComponent.prototype.addReferenceForm = function (refForm) {
        var _this = this;
        if (this._schema.referencedForms) {
            this._schema.referencedForms.push(refForm);
            this._rawSchema.referencedForms.push(refForm);
            this.fs.setReferencedForms(this._schema.referencedForms);
        }
        else {
            var newOrderedSchema = {};
            newOrderedSchema['name'] = this._schema.name;
            newOrderedSchema['uuid'] = this._schema.uuid;
            newOrderedSchema['processor'] = this._schema.processor;
            newOrderedSchema['referencedForms'] = [refForm];
            newOrderedSchema['pages'] = this._schema.pages;
            this._schema = newOrderedSchema;
            newOrderedSchema['name'] = this._rawSchema.name;
            newOrderedSchema['uuid'] = this._rawSchema.uuid;
            newOrderedSchema['processor'] = this._rawSchema.processor;
            newOrderedSchema['referencedForms'] = [refForm];
            newOrderedSchema['pages'] = this._rawSchema.pages;
            this._rawSchema = newOrderedSchema;
            this.fs.setReferencedForms(newOrderedSchema['referencedForms']);
        }
        this.fs.fetchReferencedFormSchemas([refForm]).then(function (res) {
            _this.refFormsArray.push(res[0]);
            _this.fs.setReferencedFormsArray(_this.refFormsArray);
            _this.ns.setSchema(_this._schema);
            _this.ns.setRawSchema(_this._rawSchema);
        });
    };
    ReferenceFormsComponent.prototype.display = function (form) {
        var strForm = JSON.stringify(form, null, "\t");
        this.ds.addDialog(__WEBPACK_IMPORTED_MODULE_6__modals_schema_editor_modal__["a" /* SchemaModalComponent */], { schema: strForm, title: "Form" }, { backdropColor: 'rgba(0,0,0,0.5)' });
    };
    return ReferenceFormsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ReferenceFormsComponent.prototype, "schema", null);
ReferenceFormsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-reference-forms',
        template: __webpack_require__("../../../../../src/app/form-editor/reference-forms/reference-forms.component.html"),
        styles: [__webpack_require__("../../../../../src/app/form-editor/reference-forms/reference-forms.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_fetch_all_forms_service__["a" /* FetchAllFormsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_fetch_all_forms_service__["a" /* FetchAllFormsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_bootstrap_modal__["DialogService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__Services_navigator_service__["a" /* NavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_navigator_service__["a" /* NavigatorService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */]) === "function" && _d || Object])
], ReferenceFormsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=reference-forms.component.js.map

/***/ }),

/***/ "../../../../../src/app/form-editor/schema-editor/schema-editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a{\n    cursor: pointer;\n    margin:5px;\n}\n a:hover{\n     color: #01a9ff\n }\n a>i.material-icons.yellow{\n     color:#FFA500 !important;\n }\n\n.material-icons:hover{\n    color:#5cb85c;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-editor/schema-editor/schema-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"background:#ebebeb; padding-top:5px;\">\r\n<div style=\"clear:both;\" id=\"label\" class=\"text-center\" >\r\n \r\n<div style=\"display:inline-block; float:right; \">\r\n  <label class=\"badge\"><b>{{badge}}</b></label>\r\n  <a data-toggle=\"tooltip\" title=\"Render\" (click)=\"render()\"><i class=\"material-icons\">check</i></a>\r\n  <a data-toggle=\"tooltip\" [title]=\"tooltip\"><i class=\"material-icons\" (click)=\"toggleEditor()\" [class.yellow]=\"viewingUncompiled\">visibility</i></a>\r\n  <a data-toggle=\"tooltip\" title=\"Copy\" (click)=\"showSnackbar()\" ngxClipboard [cbContent]=\"editor.getEditor().getValue()\"><i class=\"material-icons\">content_copy</i></a>\r\n</div>\r\n</div>\r\n\r\n<div style=\"clear:both;\">\r\n\r\n  <ace-editor #editor style=\"height:70vh; width:100%; overflow:auto;\"></ace-editor><br/>\r\n  <div class=\"row\">\r\n    <div class=\"text-center\" *ngIf=\"!viewingUncompiled\">\r\n      <button (click)=\"render()\" class=\"btn btn-primary\">Render</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/form-editor/schema-editor/schema-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_navigator_service__ = __webpack_require__("../../../../../src/app/Services/navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_openmrs_formentry__ = __webpack_require__("../../../../ng2-openmrs-formentry/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_fetch_form_detail_service__ = __webpack_require__("../../../../../src/app/Services/fetch-form-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_brace_index__ = __webpack_require__("../../../../brace/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_brace_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_brace_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_brace_mode_json__ = __webpack_require__("../../../../brace/mode/json.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_brace_mode_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_brace_mode_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_brace_theme_chrome__ = __webpack_require__("../../../../brace/theme/chrome.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_brace_theme_chrome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_brace_theme_chrome__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_brace_theme_cobalt__ = __webpack_require__("../../../../brace/theme/cobalt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_brace_theme_cobalt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_brace_theme_cobalt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchemaEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SchemaEditorComponent = (function () {
    function SchemaEditorComponent(ns, snackbar, fsc, fs) {
        this.ns = ns;
        this.snackbar = snackbar;
        this.fsc = fsc;
        this.fs = fs;
        this.badge = "Compiled";
        this.viewingUncompiled = false;
        this.tooltip = "View Raw";
    }
    Object.defineProperty(SchemaEditorComponent.prototype, "schema", {
        set: function (newSchema) {
            this._schema = newSchema;
            this.viewingUncompiled = false;
            this.editor.setTheme('chrome');
            this.editor.setText(this._schema);
            this.editor.getEditor().scrollToLine(0);
            this.editor.viewingUncompiled = false;
            this.editor.getEditor().setOptions({ readOnly: false });
            this.tooltip = "View Raw";
            this.badge = "Compiled";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaEditorComponent.prototype, "rawSchema", {
        set: function (schema) {
            this._rawSchema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaEditorComponent.prototype, "selectedRawSchema", {
        set: function (schema) {
            this._selectedRawSchema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaEditorComponent.prototype, "selectedSchema", {
        set: function (newSchema) {
            this._selectedSchemaObj = newSchema;
            if (this._selectedSchemaObj.pages)
                this.formSchema = this._selectedSchemaObj;
            if (this._selectedSchemaObj.hasOwnProperty('selectedSchema')) {
                this.pageIndex = this._selectedSchemaObj['pageIndex'];
                this.sectionIndex = this._selectedSchemaObj['sectionIndex'];
                this.questionIndex = this._selectedSchemaObj['questionIndex'];
            }
        },
        enumerable: true,
        configurable: true
    });
    SchemaEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fs.getReferencedFormsArray().subscribe(function (refFormArray) { return _this.referencedForms = refFormArray; });
        this.editor.getEditor().setOptions({
            printMargin: false
        });
        this.editor.setTheme('chrome');
        this.editor.setMode('json');
        this.editor.getEditor().setFontSize(16);
    };
    //render button
    SchemaEditorComponent.prototype.render = function () {
        var editedSchema = this.editor.getEditor().getValue();
        editedSchema = this.compileSchema(JSON.parse(editedSchema));
        if (editedSchema.pages) {
            this.ns.setSchema(editedSchema);
            return;
        }
        else if (editedSchema.sections) {
            this.formSchema.pages[this.pageIndex] = editedSchema;
        }
        else if (editedSchema.questions) {
            this.formSchema.pages[this.pageIndex].sections[this.sectionIndex] = editedSchema;
        }
        else {
            this.formSchema.pages[this.pageIndex].sections[this.sectionIndex].questions[this.questionIndex] = editedSchema;
        }
        this.ns.setSchema(this.formSchema);
        return;
    };
    SchemaEditorComponent.prototype.compileSchema = function (schema) {
        return this.fsc.compileFormSchema(schema, this.referencedForms);
    };
    SchemaEditorComponent.prototype.showSnackbar = function () {
        this.snackbar.open("Copied to clipboard", "", { duration: 1200 });
    };
    SchemaEditorComponent.prototype.ngOnDestroy = function () {
    };
    SchemaEditorComponent.prototype.toggleEditor = function () {
        this.viewingUncompiled == false ? this.viewingUncompiled = true : this.viewingUncompiled = false;
        if (this.viewingUncompiled) {
            this.badge = "Raw";
            this.editor.setTheme('cobalt');
            this.editor.setText(this._rawSchema, null, "\t");
            this.tooltip = "View Compiled";
            this.editor.getEditor().scrollToLine(0);
        }
        else {
            this.badge = "Compiled";
            this.editor.setTheme('chrome');
            this.editor.setText(this._schema);
            this.editor.getEditor().setOptions({ readOnly: true });
            this.tooltip = "View Raw";
            this.editor.getEditor().setOptions({ readOnly: false });
            this.editor.getEditor().scrollToLine(0);
        }
    };
    return SchemaEditorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('editor'),
    __metadata("design:type", Object)
], SchemaEditorComponent.prototype, "editor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SchemaEditorComponent.prototype, "schema", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SchemaEditorComponent.prototype, "rawSchema", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SchemaEditorComponent.prototype, "selectedRawSchema", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SchemaEditorComponent.prototype, "selectedSchema", null);
SchemaEditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-schema-editor',
        template: __webpack_require__("../../../../../src/app/form-editor/schema-editor/schema-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/form-editor/schema-editor/schema-editor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_navigator_service__["a" /* NavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_navigator_service__["a" /* NavigatorService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MdSnackBar */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_openmrs_formentry__["a" /* FormSchemaCompiler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_openmrs_formentry__["a" /* FormSchemaCompiler */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */]) === "function" && _d || Object])
], SchemaEditorComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=schema-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".message{\n    margin-top: 10px;\n}\n.spinner{\n    display: inline-block;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">    \n    <div id=\"loginbox\" style=\"margin-top:50px;\" class=\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">                    \n        <div class=\"panel panel-primary\" >\n                <div class=\"panel-heading\">\n                    <div class=\"panel-title\">Log In</div>\n                    \n                </div>     \n\n                <div style=\"padding-top:30px\" class=\"panel-body\" >\n\n                   \n                          \n                    <form #loginForm=\"ngForm\"  (ngSubmit)=\"login(loginForm.value)\" >\n\n                        <div style=\"margin-bottom: 25px\">\n                            <span>Enter Server URL</span>\n                            <input [typeahead]=\"baseUrls\" class=\"form-control\"  name=\"baseUrl\" ngModel required autocomplete=\"off\"> \n                        </div>\n                                \n                        <div style=\"margin-bottom: 25px\">\n                                    <span>Username</span>\n                                    <input type=\"text\" class=\"form-control\" name=\"username\" ngModel required>                                        \n                                </div>\n                            \n                        <div style=\"margin-bottom: 25px\">\n                                    <span>Password</span>\n                                    <input type=\"password\" class=\"form-control\" name=\"password\" (keyDown)=\"authenticated=undefined\" ngModel required>\n                                </div>\n                                <div *ngIf=\"authenticated!=undefined&&!authenticated\" class=\"alert alert-danger\">\n                                    <p>\n                                      Incorrect password\n                                    </p>\n                                  </div>\n\n                        <div class=\"text-center\">\n                          <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!loginForm.valid\">Log In</button>\n                        </div>         \n  \n                        </form>     \n\n                      \n                        <div class=\"message\" *ngIf=\"message\">\n                                <div style=\"display:none\" id=\"login-alert\" class=\"alert alert-danger col-sm-12\"></div>\n                                <div class=\"alert\" [class.alert-warning]=\"!authenticated\" [class.alert-success]=\"authenticated\">\n                                        <small>{{message}}</small>\n                                        <div *ngIf=\"message.indexOf('Logging')!=-1\" class=\"spinner\">\n                                        <i class=\"fa fa-spinner fa-spin\"></i>\n                                        </div>\n                                      </div>\n                                </div>\n\n                    </div>                     \n                </div>  \n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_authentication_service__ = __webpack_require__("../../../../../src/app/Services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.baseUrls = ['https://test2.ampath.or.ke:8443/amrs', 'https://ngx.ampath.or.ke/amrs'];
        this.setMessage();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (credentials) {
        var _this = this;
        this.auth.setBaseUrl(credentials.baseUrl);
        this.auth.setCredentialsSubject(credentials.username, credentials.password);
        this.message = "Logging in...";
        this.auth.authenticate(credentials.username, credentials.password, credentials.baseUrl).catch(function (error) {
            if (error.message.indexOf("You provided an invalid object where a stream was expected.") != -1)
                _this.message = "Kindly check your internet connection and make sure CORS is turned on then refresh the page.";
            return error;
        })
            .subscribe(function (res) {
            _this.setMessage();
            if (_this.auth.isLoggedIn) {
                _this.authenticated = true;
                _this.message = "Success!";
                var redirectUrl = _this.auth.redirectUrl ? _this.auth.redirectUrl : '/forms';
                _this.router.navigate([redirectUrl]);
            }
            else {
                _this.message = undefined;
                _this.authenticated = false;
            }
        });
    };
    LoginComponent.prototype.setMessage = function () {
        var str = (this.authenticated) ? 'in' : undefined;
        if (str)
            this.message = "Already Logged " + str;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/modals/alert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function (_super) {
    __extends(AlertComponent, _super);
    function AlertComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    return AlertComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
AlertComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'alert',
        template: "<div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                   <div class=\"modal-header\">\n                     <button type=\"button\" class=\"close\" (click)=\"close()\" >&times;</button>\n                   </div>\n                   <div class=\"modal-body\">\n                     <h5 class=\"text-center\">{{message}}</h5>\n                   </div>\n                   <div class=\"modal-footer\">\n                     <button type=\"button\" class=\"btn btn-danger\" (click)=\"close()\">OK</button>\n                   </div>\n                </div>\n             </div>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ "../../../../../src/app/modals/answers-modal/answers-modal.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".modal-dialog{\n    overflow-y: initial !important\n}\n.modal-content{\n    height: 550px;\n    overflow-y: auto;\n}\n/* Hiding the checkbox, but allowing it to be focused */\n.badgebox\n{\n    opacity: 0;\n}\n\n.badgebox + .badge\n{\n    /* Move the check mark away when unchecked */\n    text-indent: -999999px;\n    /* Makes the badge's width stay the same checked and unchecked */\n\twidth: 27px;\n}\n\n.badgebox:focus + .badge\n{\n    /* Set something to make the badge looks focused */\n    /* This really depends on the application, in my case it was: */\n    \n    /* Adding a light border */\n    box-shadow: inset 0px 0px 5px;\n    /* Taking the difference out of the padding */\n}\n\n.badgebox:checked + .badge\n{\n    /* Move the check mark back when checked */\n\ttext-indent: 0;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modals/answers-modal/answers-modal.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n         <div class=\"modal-header\">\n            <button class=\"close\" type=\"button\" (click)=\"close()\">&times;</button>\n                \n                <div style=\"display:inline-block;\">\n                    <h4 class=\"modal-title\">Answers</h4>\n                    </div>\n                    <div style=\"display:inline-block; margin-left:10px;\">\n                  <label for=\"primary\" class=\"btn btn-primary\">Select All<input (change)=\"selectAll($event)\" type=\"checkbox\" id=\"primary\" class=\"badgebox\"><span class=\"badge\"><i class=\"fa fa-check\"></i></span></label>\n              </div>\n            </div>\n            <div class=\"modal-body\">\n                <form #answersForm=\"ngForm\" (ngSubmit)=\"save(answersForm.value)\">   \n                   <div *ngFor=\"let answer of answers;let i=index;\">\n                      <div class=\"checkbox\" style=\"margin-left:20px;\">\n                        <h6><input type=\"checkbox\" name=\"'choice'+i\" [value]=\"label.value+','+answer.uuid\"\n                        (change)=\"setCheckboxes($event,i)\" [checked]=\"checked\">\n                        Answer {{i+1}}</h6>\n                         <div class=\"form-group\">\n                      <input type=\"text\" class=\"form-control\" #label [value]=\"answer.display\">\n                        </div>\n                        <br/>\n                      </div>\n                   </div>\n                   <div class=\"modal-footer\">\n                   <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!answersForm.valid\">OK</button>\n                   <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\" >Cancel</button>\n                 </div>\n                 \n                   </form>\n                   </div>\n                 </div>\n                </div>"

/***/ }),

/***/ "../../../../../src/app/modals/answers-modal/answers.modal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnswersComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AnswersComponent = (function (_super) {
    __extends(AnswersComponent, _super);
    function AnswersComponent(dialogService, fb, cdRef) {
        var _this = _super.call(this, dialogService) || this;
        _this.fb = fb;
        _this.cdRef = cdRef;
        _this.checkboxes = {};
        _this.checked = false;
        return _this;
    }
    AnswersComponent.prototype.ngOnInit = function () {
    };
    AnswersComponent.prototype.ngAfterViewChecked = function () {
        this.cdRef.detectChanges();
    };
    AnswersComponent.prototype.save = function (value) {
        this.result = JSON.stringify(this.checkboxes);
        this.close();
    };
    AnswersComponent.prototype.setCheckboxes = function (event, i) {
        if (event.target.checked) {
            this.checkboxes['answer' + i] = event.target.getAttribute('value');
        }
        else {
            delete this.checkboxes['answer' + i];
        }
    };
    AnswersComponent.prototype.selectAll = function (event) {
        var _this = this;
        if (event.target.checked) {
            this.answers.forEach(function (answer, index) {
                _this.checked = event.target.checked;
                _this.checkboxes['answer' + index] = answer.display + "," + answer.uuid;
            });
        }
        else {
            this.answers.forEach(function (answer, index) {
                _this.checked = false;
            });
            this.checkboxes = {};
        }
    };
    return AnswersComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
AnswersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'prompt',
        template: __webpack_require__("../../../../../src/app/modals/answers-modal/answers-modal.html"),
        styles: [__webpack_require__("../../../../../src/app/modals/answers-modal/answers-modal.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object])
], AnswersComponent);

var _a, _b, _c;
//# sourceMappingURL=answers.modal.js.map

/***/ }),

/***/ "../../../../../src/app/modals/concept.modal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConceptsModalComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConceptsModalComponent = (function (_super) {
    __extends(ConceptsModalComponent, _super);
    function ConceptsModalComponent(dialogService, fb, cdRef) {
        var _this = _super.call(this, dialogService) || this;
        _this.fb = fb;
        _this.cdRef = cdRef;
        _this.checked = false;
        return _this;
    }
    ConceptsModalComponent.prototype.ngOnInit = function () {
    };
    ConceptsModalComponent.prototype.ngAfterViewChecked = function () {
        this.cdRef.detectChanges();
    };
    ConceptsModalComponent.prototype.save = function (value) {
        this.result = value;
        this.close();
    };
    ConceptsModalComponent.prototype.checkedToggle = function () {
        this.checked = true;
    };
    return ConceptsModalComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
ConceptsModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'prompt',
        template: "<div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                   <div class=\"modal-header\">\n                     <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\n                     <h4 class=\"modal-title\">Concepts</h4>\n      \n                   </div>\n                   <div class=\"modal-body\">\n                   <form #conceptForm=\"ngForm\"  (ngSubmit)=\"save(conceptForm.value)\">\n                   <div class=\"form-group\">\n                   <label for=\"concepts\">Select a concept</label>\n                    <select class = \"form-control\" id=\"concepts\" name=\"concept\" [(ngModel)]=\"pconcept\" required>\n                      <option *ngFor=\"let concept of concepts\" [value]=\"concept.uuid\">{{concept.name.display}}</option>\n                    </select>\n                    <br/>\n                    <h6><b> UUID : {{pconcept}} </b></h6>\n                  </div>\n                  <div class=\"modal-footer\">\n                  <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!conceptForm.valid\">OK</button>\n                  <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\">Cancel</button>\n                </div>\n                  </form>\n                   </div>\n                 </div>\n                </div>",
        styles: ["\n.modal-dialog{\n    overflow-y: initial !important\n}\n.modal-body{\n    overflow-y: auto;\n}"]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object])
], ConceptsModalComponent);

var _a, _b, _c;
//# sourceMappingURL=concept.modal.js.map

/***/ }),

/***/ "../../../../../src/app/modals/confirm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmComponent = (function (_super) {
    __extends(ConfirmComponent, _super);
    function ConfirmComponent(dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.buttonText = 'Delete';
        return _this;
    }
    ConfirmComponent.prototype.close = function () {
        _super.prototype.close.call(this);
        if (!this.result)
            this.result = false;
    };
    ConfirmComponent.prototype.confirm = function () {
        this.result = true;
        this.close();
        return this.result;
    };
    return ConfirmComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
ConfirmComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-modals',
        template: "<div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                   <div class=\"modal-header\">\n                     \n                     <button type=\"button\" class=\"close\" (click)=\"close()\" >&times;</button>\n                    \n                     <h4 class=\"modal-title\">{{title || 'Confirm'}}</h4>\n                   </div>\n                   <div class=\"modal-body\">\n                     <h5>{{message || 'Are you sure you want to delete?'}}</h5>\n                   </div>\n                   <div class=\"modal-footer\">\n                     <button type=\"button\" class=\"btn btn-danger\" (click)=\"confirm()\">{{buttonText}}</button>\n                     <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\" >Cancel</button>\n                   </div>\n                 </div>\n              </div>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object])
], ConfirmComponent);

var _a;
//# sourceMappingURL=confirm.component.js.map

/***/ }),

/***/ "../../../../../src/app/modals/insert-reference-form-modal/insert-reference-forms.modal.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".modal-dialog{\n    overflow-y: initial !important\n}\n.modal-body{\n    \n    overflow-y: auto;\n}\noption{\n  padding:10px;\n  border-bottom: 1px solid lightgray;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modals/insert-reference-form-modal/insert-reference-forms.modal.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-dialog\">\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\n      <h4 class=\"modal-title\">Components</h4>\n\n    </div>\n    <div class=\"modal-body\">\n      <form #form=\"ngForm\" (ngSubmit)=\"save(form.value)\">\n        <div class=\"form-group\">\n          <label>Select forms</label>\n\n        <input  [typeahead]=\"forms\" (typeaheadOnSelect)=\"optionSelected($event)\" typeaheadOptionField=\"name\"\n         typeaheadOptionsLimit=\"15\" typeaheadMinLength=\"0\"  class=\"form-control\" id=\"forms\" name=\"form\" ngModel required autocomplete=\"off\">\n\n            </div>\n\n          <div class=\"form-group\">\n            <label>Alias</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Enter alias\" name=\"alias\" ngModel required>\n          </div>\n\n\n\n          <div class=\"form-group\">\n            <label>Display</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Display\" name=\"display\" ngModel required>\n          </div>\n        \n\n        <div class=\"modal-footer\">\n          <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!form.valid\">OK</button>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\">Cancel</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/modals/insert-reference-form-modal/insert-reference-forms.modal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InsertReferenceComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InsertReferenceComponent = (function (_super) {
    __extends(InsertReferenceComponent, _super);
    function InsertReferenceComponent(dialogService, fb, cdRef) {
        var _this = _super.call(this, dialogService) || this;
        _this.fb = fb;
        _this.cdRef = cdRef;
        _this.selected = false;
        return _this;
    }
    InsertReferenceComponent.prototype.ngOnInit = function () {
    };
    InsertReferenceComponent.prototype.ngAfterViewChecked = function () {
        this.cdRef.detectChanges();
    };
    InsertReferenceComponent.prototype.save = function (value) {
        var uuid = this.findFormUUID(value.form);
        value.form = uuid + " " + value.form;
        this.result = value;
        this.close();
    };
    InsertReferenceComponent.prototype.optionSelected = function ($event) {
        this.selected = true;
    };
    InsertReferenceComponent.prototype.findFormUUID = function (formName) {
        var uuid;
        this.forms.forEach(function (form) {
            if (form.name == formName)
                uuid = form.uuid;
        });
        return uuid;
    };
    return InsertReferenceComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
InsertReferenceComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'prompt',
        template: __webpack_require__("../../../../../src/app/modals/insert-reference-form-modal/insert-reference-forms.modal.html"),
        styles: [__webpack_require__("../../../../../src/app/modals/insert-reference-form-modal/insert-reference-forms.modal.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object])
], InsertReferenceComponent);

var _a, _b, _c;
//# sourceMappingURL=insert-reference-forms.modal.js.map

/***/ }),

/***/ "../../../../../src/app/modals/navigator.modal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_fetch_form_detail_service__ = __webpack_require__("../../../../../src/app/Services/fetch-form-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__("../../../../rxjs/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorModalComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Observable class extensions




var NavigatorModalComponent = (function (_super) {
    __extends(NavigatorModalComponent, _super);
    function NavigatorModalComponent(dialogService, fb, fs) {
        var _this = _super.call(this, dialogService) || this;
        _this.fb = fb;
        _this.fs = fs;
        _this.checkedRefElements = [];
        return _this;
    }
    NavigatorModalComponent.prototype.rfEmitted = function (refElements) {
        this.checkedRefElements = refElements;
    };
    NavigatorModalComponent.prototype.close = function () {
        _super.prototype.close.call(this);
        this.res = '';
    };
    NavigatorModalComponent.prototype.save = function () {
        this.res = JSON.stringify(this.checkedRefElements);
        this.result = this.res;
        this.close();
    };
    return NavigatorModalComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
NavigatorModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'prompt',
        template: "<div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                   <div class=\"modal-header\">\n                     <a (click)=\"close()\" style=\"margin-right:10px; cursor:pointer\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i></a>\n                     <h4 class=\"modal-title title\">Select {{referenceElement}} to reference</h4>\n                   </div>\n                   <div class=\"modal-body\">\n                   <app-navigator [_schema]=\"schema\" [formSchema]=\"schema\" [mode]=\"'select'\" [referenceElement]=\"referenceElement\" (checkedRefElementsEmitter)=\"rfEmitted($event)\"></app-navigator>\n                   </div>\n                   <div class=\"modal-footer\">\n                     <button type=\"button\" class=\"btn btn-primary\" (click)=\"save()\">OK</button>\n                     <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\">Cancel</button>\n                   </div>\n                 </div>\n                </div>",
        styles: ["\n                .modal-body {\n                  position: relative;\n                  padding: 20px;\n                  max-height: 550px;\n                  overflow-y: auto;\n              }\n              .title{\n                display:inline-block;\n              }\n              "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */]) === "function" && _c || Object])
], NavigatorModalComponent);

var _a, _b, _c;
//# sourceMappingURL=navigator.modal.js.map

/***/ }),

/***/ "../../../../../src/app/modals/prompt.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromptComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PromptComponent = (function (_super) {
    __extends(PromptComponent, _super);
    function PromptComponent(dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.message = '';
        return _this;
    }
    PromptComponent.prototype.save = function () {
        this.result = this.form.value;
        this.close();
    };
    PromptComponent.prototype.keyDownFunction = function ($event) {
        if ($event.keyCode == 13 && this.form.valid)
            this.save();
    };
    return PromptComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
PromptComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'prompt',
        template: "<div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                   <div class=\"modal-header\">\n                     <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\n                     <h4 class=\"modal-title\">{{title || 'Prompt'}}</h4>\n                   </div>\n                   <div class=\"modal-body\">\n                   <form [formGroup]=\"form\" (keydown)=\"keyDownFunction($event)\">\n                   <div *ngFor=\"let question of questions\">\n \n\n  <div [ngSwitch]=\"question.controlType\">\n\n                          <div class=\"form-group\">\n\n    <input *ngSwitchCase=\"'textbox'\" class=\"form-control\" [formControlName]=\"question.key\" [id]=\"question.key\"\n    [type]=\"question.type\" [placeholder]=\"question.placeholder\" [value]=\"question.value\">\n    \n    </div>\n\n<div class=\"form-group\">\n    <select *ngSwitchCase=\"'select'\" class=\"form-control\" [formControlName]=\"question.key\" >\n      <option value=\"\" disabled selected>Is Expanded</option>\n      <option *ngFor=\"let opt of question.options\" [value]=\"opt.key\">{{opt.value}}</option>\n   </select>\n</div>\n</div>\n</div>\n</form>\n                        \n                   </div>\n                   <div class=\"modal-footer\">\n                     <button type=\"submit\" class=\"btn btn-primary\" (click)=\"save()\" [disabled]=\"!form.valid\">OK</button>\n                     <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\" >Cancel</button>\n                   </div>\n                 </div>\n                </div>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object])
], PromptComponent);

var _a;
//# sourceMappingURL=prompt.component.js.map

/***/ }),

/***/ "../../../../../src/app/modals/reference-form-modal/reference-form.madal.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.stylish-input-group .input-group-addon{\n    background: white !important; \n}\n.stylish-input-group .form-control{\n\tborder-right:0; \n\tbox-shadow:0 0 0; \n\tborder-color:#ccc;\n}\n.stylish-input-group button{\n    border:0;\n    background:transparent;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modals/reference-form-modal/reference-form.modal.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"refForms\">\n<div class=\"modal-dialog\">\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\n      <h4 class=\"modal-title\">Search form to reference</h4>\n    </div>\n    <div class=\"modal-body\">\n      <form [formGroup]=\"form\" (keydown)=\"keyDownFunction($event)\">\n        <div class=\"form-group\">\n          <label for=\"label\">Enter Form Name</label>\n          <input [typeahead]=\"refForms\" typeaheadOptionField=\"formName\" typeaheadOptionsLimit=\"10\" typeaheadMinLength=\"0\" id=\"label\" class=\"form-control\" formControlName=\"selectField\" autocomplete=\"off\">\n        </div>\n      </form>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"save(selectField.value)\" [disabled]=\"!form.valid\">OK</button>\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\">Cancel</button>\n    </div>\n  </div>\n</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/modals/reference-form-modal/reference-form.modal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Services_fetch_form_detail_service__ = __webpack_require__("../../../../../src/app/Services/fetch-form-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__navigator_modal__ = __webpack_require__("../../../../../src/app/modals/navigator.modal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_debounceTime__ = __webpack_require__("../../../../rxjs/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_distinctUntilChanged__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReferenceModalComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// Observable class extensions




var ReferenceModalComponent = (function (_super) {
    __extends(ReferenceModalComponent, _super);
    function ReferenceModalComponent(dialogService, fb, fs) {
        var _this = _super.call(this, dialogService) || this;
        _this.fb = fb;
        _this.fs = fs;
        _this.searchValue = "";
        _this.selectField = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required);
        _this.form = fb.group({ selectField: _this.selectField });
        return _this;
    }
    ReferenceModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fs.fetchReferencedForms().subscribe(function (res) {
            _this.refForms = res;
        });
        this.filteredForms = this.selectField.valueChanges.map(function (ref) {
            return ref ? _this.filter(ref) : [];
        });
    };
    ReferenceModalComponent.prototype.filter = function (ref) {
        return this.refForms.filter(function (form) {
            return form.formName.toLowerCase().indexOf(ref.toLowerCase()) != -1;
        });
    };
    ReferenceModalComponent.prototype.save = function (value) {
        var _this = this;
        var selectedForm;
        this.refForms.forEach(function (form) {
            if (form['formName'] == value) {
                selectedForm = form;
                _this.formAlias = form['alias'];
            }
        });
        if (selectedForm.ref.uuid)
            this.fs.fetchFormMetadata(selectedForm.ref.uuid)
                .then(function (res) { return _this.fs.fetchForm(res.resources[0].valueReference, true)
                .then(function (schema) { return _this.showNavigatorDialog(schema, _this.refElement, "Select " + _this.refElement + " to reference"); }); });
        else
            console.error("formName is undefined!");
    };
    ReferenceModalComponent.prototype.showNavigatorDialog = function (schema, refElement, title) {
        var _this = this;
        this.dialogService.addDialog(__WEBPACK_IMPORTED_MODULE_4__navigator_modal__["a" /* NavigatorModalComponent */], { title: title, schema: schema, referenceElement: refElement.toLowerCase() }, { backdropColor: 'rgba(0, 0, 0, 0.8)' })
            .subscribe(function (formValue) {
            var i = {};
            i['form'] = _this.formAlias;
            i[refElement + 's'] = formValue;
            if (formValue != undefined) {
                _this.result = JSON.stringify(i);
                _this.close();
            }
        });
    };
    ReferenceModalComponent.prototype.keyDownFunction = function ($event) {
        //validate!
        if ($event.keyCode == 13 && this.form.valid)
            this.save(this.selectField.value);
    };
    ReferenceModalComponent.prototype.filterForms = function (searchString) {
        searchString = searchString.toLowerCase();
        return this.refForms.filter(function (form) {
            form.name.toLowerCase().indexOf(searchString) != -1;
        });
    };
    ReferenceModalComponent.prototype.typeaheadOnSelect = function (e) {
        this.save(e.value);
    };
    return ReferenceModalComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
ReferenceModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'prompt',
        template: __webpack_require__("../../../../../src/app/modals/reference-form-modal/reference-form.modal.html"),
        styles: [__webpack_require__("../../../../../src/app/modals/reference-form-modal/reference-form.madal.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */]) === "function" && _c || Object])
], ReferenceModalComponent);

var _a, _b, _c;
//# sourceMappingURL=reference-form.modal.js.map

/***/ }),

/***/ "../../../../../src/app/modals/schema-editor.modal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchemaModalComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SchemaModalComponent = (function (_super) {
    __extends(SchemaModalComponent, _super);
    function SchemaModalComponent(dialogService, fb) {
        var _this = _super.call(this, dialogService) || this;
        _this.fb = fb;
        return _this;
    }
    SchemaModalComponent.prototype.ngOnInit = function () {
        this.editor.getEditor().setOptions({
            printMargin: false,
            readOnly: true
        });
        this.editor.setTheme('chrome');
        this.editor.setMode('json');
        this.editor.getEditor().setFontSize(16);
        this.editor.setText(this.schema);
        this.editor.getEditor().scrollToLine(0);
    };
    return SchemaModalComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('editor'),
    __metadata("design:type", Object)
], SchemaModalComponent.prototype, "editor", void 0);
SchemaModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'prompt',
        template: "<div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                   <div class=\"modal-header\">\n                     <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\n                     <h4 class=\"modal-title\"> {{title}} </h4>\n      \n                   </div>\n                   <div class=\"modal-body\">\n                   <ace-editor #editor style=\"height:70vh; width:100%; overflow:auto;\"></ace-editor>\n                   </div>\n                 </div>\n                </div>",
        styles: ["\n.modal-dialog{\n    overflow-y: initial !important\n}\n.modal-body{\n    overflow-y: auto;\n}"]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _b || Object])
], SchemaModalComponent);

var _a, _b;
//# sourceMappingURL=schema-editor.modal.js.map

/***/ }),

/***/ "../../../../../src/app/modals/set-members-modal/set-members-modal.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".modal-dialog{\n    overflow-y: initial !important;\n    width:700px;\n}\n.modal-content{\n    height: 550px;\n    overflow-y: auto;\n}\n/* Hiding the checkbox, but allowing it to be focused */\n.badgebox\n{\n    opacity: 0;\n}\n\n.badgebox + .badge\n{\n    /* Move the check mark away when unchecked */\n    text-indent: -999999px;\n    /* Makes the badge's width stay the same checked and unchecked */\n\twidth: 27px;\n}\n\n.badgebox:focus + .badge\n{\n    /* Set something to make the badge looks focused */\n    /* This really depends on the application, in my case it was: */\n    \n    /* Adding a light border */\n    box-shadow: inset 0px 0px 5px;\n    /* Taking the difference out of the padding */\n}\n\n.badgebox:checked + .badge\n{\n    /* Move the check mark back when checked */\n\ttext-indent: 0;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modals/set-members-modal/set-members-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-dialog\">\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <button class=\"close\" type=\"button\" (click)=\"close()\">&times;</button>\n\n      <div style=\"display:inline-block;\">\n        <h4 class=\"modal-title\">Set Members</h4>\n      </div>\n      <!-- <div style=\"display:inline-block; margin-left:10px;\">\n        <label for=\"primary\" class=\"btn btn-primary\">Select All<input (change)=\"selectAll($event)\" type=\"checkbox\" id=\"primary\" class=\"badgebox\"><span class=\"badge\"><i class=\"fa fa-check\"></i></span></label>\n      </div> -->\n    </div>\n    <div class=\"modal-body\">\n      <form #setMembersForm=\"ngForm\" (ngSubmit)=\"save(setMembersForm.value)\">\n        <div *ngFor=\"let setMember of setMembers;let i=index;\">\n\n\n          <div class=\"checkbox\" style=\"margin-left:20px;\">\n\n            <div *ngIf=\"setMember.answers.length>0\" style=\"float:right; margin-bottom:5px\">\n              <a class=\"btn btn-success\" [href]=\"'#answer'+i\" data-toggle=\"collapse\">Answers <i class=\"fa fa-chevron-down\"></i></a>\n            </div>\n\n            <div>\n             <h5><input type=\"checkbox\" [name]=\"'choice'+i\" [value]=\"questionLabel.value+','+setMember.uuid\" (change)=\"setCheckboxes($event,i)\"\n                  [checked]=\"checked\" ngModel><b> Question {{i+1}} </b></h5> \n            </div>\n\n            <div class=\"form-group\">\n              <input type=\"text\" class=\"form-control\" #questionLabel [value]=\"setMember.display\">\n            </div>\n            <br/>\n            <div class=\"answers\" [id]='\"answer\"+i' class=\"collapse\" *ngIf=\"setMember.answers\" style=\"margin-left:30px;\">\n                <div *ngFor=\"let answer of setMember.answers; let j=index\">\n                  <div class=\"checkbox\">\n                    <h6><input type=\"checkbox\" [name]=\"i+''+j\" [value]=\"answerLabel.value+','+answer.uuid\" ngModel> Answer {{j+1}}</h6>\n                    <div class=\"form-group\">\n                      <input type=\"text\" class=\"form-control\" #answerLabel [value]=\"answer.display\">\n                    </div>\n                  </div>\n                </div>\n    \n              </div>\n          </div>\n<hr>\n          \n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!setMembersForm.valid\">OK</button>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\">Cancel</button>\n        </div>\n\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/modals/set-members-modal/set-members-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__ = __webpack_require__("../../../../ng2-bootstrap-modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetMembersModalComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SetMembersModalComponent = (function (_super) {
    __extends(SetMembersModalComponent, _super);
    function SetMembersModalComponent(dialogService, fb, cdRef) {
        var _this = _super.call(this, dialogService) || this;
        _this.fb = fb;
        _this.cdRef = cdRef;
        return _this;
    }
    SetMembersModalComponent.prototype.ngOnInit = function () {
    };
    SetMembersModalComponent.prototype.ngAfterViewChecked = function () {
        this.cdRef.detectChanges();
    };
    SetMembersModalComponent.prototype.save = function (value) {
        console.log(value);
    };
    SetMembersModalComponent.prototype.setCheckboxes = function (event, i) {
    };
    return SetMembersModalComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogComponent"]));
SetMembersModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'set-members-modal',
        template: __webpack_require__("../../../../../src/app/modals/set-members-modal/set-members-modal.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modals/set-members-modal/set-members-modal.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_bootstrap_modal__["DialogService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object])
], SetMembersModalComponent);

var _a, _b, _c;
//# sourceMappingURL=set-members-modal.component.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/search-form-filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchFormFilterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchFormFilterPipe = (function () {
    function SearchFormFilterPipe() {
    }
    SearchFormFilterPipe.prototype.transform = function (forms, value) {
        if (!forms || value == "")
            return forms;
        value = value.toLowerCase();
        return forms.filter(function (form) { return form.name.toLowerCase().indexOf(value) != -1; });
    };
    return SearchFormFilterPipe;
}());
SearchFormFilterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'formfilter'
    })
], SearchFormFilterPipe);

//# sourceMappingURL=search-form-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/view-forms/view-forms.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".panel-table .panel-body{\n    padding:0;\n  }\n  \n  .panel-table .panel-body .table-bordered{\n    border-style: none;\n    margin:0;\n  }\n  \n  .panel-table .panel-body .table-bordered > thead > tr > th:first-of-type {\n      text-align:center;\n      width: 100px;\n  }\n  \n  .panel-table .panel-body .table-bordered > thead > tr > th:last-of-type,\n  .panel-table .panel-body .table-bordered > tbody > tr > td:last-of-type {\n    border-right: 0px;\n  }\n  \n  .panel-table .panel-body .table-bordered > thead > tr > th:first-of-type,\n  .panel-table .panel-body .table-bordered > tbody > tr > td:first-of-type {\n    border-left: 0px;\n  }\n  \n  .panel-table .panel-body .table-bordered > tbody > tr:first-of-type > td{\n    border-bottom: 0px;\n  }\n  \n  .panel-table .panel-body .table-bordered > thead > tr:first-of-type > th{\n    border-top: 0px;\n  }\n  \n  .panel-table .panel-footer .pagination{\n    margin:0; \n  }\n  \n  /*\n  used to vertically center elements, may need modification if you're not using default sizes.\n  */\n  .panel-table .panel-footer .col{\n   line-height: 34px;\n   height: 34px;\n  }\n  \n  .panel-table .panel-heading .col h3{\n   line-height: 30px;\n   height: 30px;\n  }\n  \n  .panel-table .panel-body .table-bordered > tbody > tr > td{\n    line-height: 34px;\n  }\n  \n  .formName{\n      font-size:14px;\n  }\n\n  .mat-toolbar{\n    background:#008daf;\n}\n.stylish-input-group .input-group-addon{\n    background: white !important; \n}\n.stylish-input-group .form-control{\n\tborder-right:0; \n\tbox-shadow:0 0 0; \n\tborder-color:#ccc;\n}\n.stylish-input-group button{\n    border:0;\n    background:transparent;\n}\n.material-icons{\n  color:green;\n}\n.navbar-btn{\n  margin: 5px 5px 0px 5px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/view-forms/view-forms.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n        <div class=\"container-fluid\">\n          <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" href=\"#\">Form Builder</a>\n          </div>\n          \n          <ul class=\"nav navbar-nav navbar-right\">\n          \n            <li><button type=\"button\" class=\"btn btn-success btn-create navbar-btn\" (click)=\"createNew()\"><i class=\"fa fa-plus\"></i> Create New</button></li>\n            <li><button type=\"button\" class=\"btn btn-danger navbar-btn\" (click)=\"logout()\">Logout <i [class.fa-spinner]=\"loggingOut\" [class.fa-spin]=\"loggingOut\" class=\"fa\"></i></button></li>\n            \n          </ul>\n        </div>\n      </nav>\n\n    \n    <div class=\"container-f\">\n        <div class=\"row\">\n            <div class=\"col-md-10 col-md-offset-1\">\n                <div class=\"panel panel-primary panel-table\">\n                  <div class=\"panel-heading\">\n                    <div class=\"row\">\n                      <div class=\"col col-xs-2\">\n                        <h3 class=\"panel-title\">Forms</h3>\n                      </div>\n\n                     <div class=\"col col-xs-5 pull-right\">\n                          <div id=\"imaginary_container\"> \n                              <div class=\"input-group stylish-input-group\">\n                                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"searchValue\" placeholder=\"Search\"  id=\"search-box\">\n                                  <span class=\"input-group-addon\">\n                                      <button>\n                                          <i class=\"fa fa-search\"></i>\n                                      </button>  \n                                  </span>\n                              </div>\n                          </div>\n                      </div> \n                    </div>\n                  </div>\n                  <div class=\"panel-body\">\n\n                    \n                    \n                    <table class=\"table table-striped table-bordered table-list\">\n                      <thead>\n                        <tr>\n                            <th width=\"40%\">Name</th>\n                            <th width=\"20%\">Version</th>\n                            <th width=\"20%\">Published</th>\n                            <th width=\"20%\">Edit</th>\n                        </tr> \n                      </thead>\n                      <tbody *ngIf=\"forms.length>0\">\n                              <tr *ngFor=\"let form of forms | formfilter: searchValue  | paginate: { itemsPerPage: 13, currentPage: page }\">\n                            \n                                <td class=\"formName\"><b>{{form.name}}</b></td>\n                                <td>{{form.version}}</td>\n                                <td>{{form.published}}</td>\n                                <td><a (click)=\"editForm(form.uuid)\" style=\"cursor: pointer;\"><i class=\"material-icons\">edit</i></a></td>\n                              </tr>\n                            </tbody>\n\n                      <tbody *ngIf=\"forms.length==0\">\n                        <td>No forms to display</td>\n                        <td>-</td>\n                        <td>-</td>\n                        <td>-</td>\n                      </tbody>\n                    </table>\n                \n                  </div>\n                  <div class=\"panel-footer\">\n                    <div class=\"row\">\n                        <pagination-controls (pageChange)=\"page = $event\"></pagination-controls>\n                    </div>\n                  </div>\n                </div>\n    \n    </div></div></div>\n\n"

/***/ }),

/***/ "../../../../../src/app/view-forms/view-forms.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_fetch_all_forms_service__ = __webpack_require__("../../../../../src/app/Services/fetch-all-forms.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_fetch_form_detail_service__ = __webpack_require__("../../../../../src/app/Services/fetch-form-detail.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Services_authentication_service__ = __webpack_require__("../../../../../src/app/Services/authentication.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewFormsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewFormsComponent = (function () {
    function ViewFormsComponent(fetchAllFormsService, router, fetchFormDetailService, auth) {
        this.fetchAllFormsService = fetchAllFormsService;
        this.router = router;
        this.fetchFormDetailService = fetchFormDetailService;
        this.auth = auth;
        this.forms = [];
        this.page = 1; //pagination
        this.loggingOut = false;
        this.searchValue = "";
    }
    ViewFormsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchAllFormsService.fetchAllPOCForms().subscribe(function (forms) {
            var f = forms.results;
            f.forEach(function (form, index) {
                _this.fetchFormDetailService.fetchFormMetadata(form.uuid).then(function (res) {
                    if (!form.resources[0]) {
                        f.splice(index, 1);
                    }
                });
            });
            _this.forms = f;
        });
    };
    ViewFormsComponent.prototype.editForm = function (uuid) {
        this.router.navigate(['/edit', uuid]);
    };
    ViewFormsComponent.prototype.createNew = function () {
        this.router.navigate(['/edit', 'new']);
    };
    ViewFormsComponent.prototype.logout = function () {
        var _this = this;
        this.loggingOut = true;
        this.auth.logOut().catch(function (e) { return _this.router.navigate(['/login']); })
            .subscribe(function (res) {
            _this.router.navigate(['/login']);
        });
    };
    return ViewFormsComponent;
}());
ViewFormsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-forms',
        template: __webpack_require__("../../../../../src/app/view-forms/view-forms.component.html"),
        styles: [__webpack_require__("../../../../../src/app/view-forms/view-forms.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_fetch_all_forms_service__["a" /* FetchAllFormsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_fetch_all_forms_service__["a" /* FetchAllFormsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_fetch_form_detail_service__["a" /* FetchFormDetailService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__Services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__Services_authentication_service__["a" /* AuthenticationService */]) === "function" && _d || Object])
], ViewFormsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=view-forms.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map