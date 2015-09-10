var Forms =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

	    data: _.extend({
	        formitem: {},
	        fields: [],
	        message: '',
	        error: '',
	        thankyou: '',
	        submission: {
	            form_id: 0,
	            status: 1,
	            data: {}
	        }
	    }, window.$data),

	    created: function () {
	        //prepare submission
	        this.submission.form_id = this.formitem.id;
	        this.fields.forEach(function (field) {
	            this.submission.data[field.id] = {
	                field_id: field.id,
	                slug: field.slug,
	                type: field.type,
	                label: null,
	                value: null
	            };
	        }.bind(this));
	    },

	    methods: {

	        submit: function (e) {
	            e.preventDefault();

	            var vm = this, data = {submission: this.submission};

	            this.$set('message', '');
	            this.$set('error', '');

	            this.$broadcast('submit', data);

	            this.$http.post('api/formmaker/submission', data, function (data) {
	                this.message = data.message;
	                if (data.submission.thankyou) {
	                    vm.$set('thankyou', data.submission.thankyou);
	                }
	                if (data.submission.redirect) {
	                    window.location.replace(data.submission.redirect);
	                }
	            }).error(function (error) {
	                this.error = this.$trans(error);
	            });
	        }

	    },

	    components: {
	        recaptcha: __webpack_require__(63)
	    }

	};

	$(function () {

	    window.Formmaker = new Vue(module.exports).$mount('#formmaker-profile');

	});


/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(64)
	module.exports.template = __webpack_require__(65)


/***/ },

/***/ 64:
/***/ function(module, exports) {

	window.grecacapthaCallback = function () {
	        window.Formmaker.$.grecaptcha.grecaptchaCallback(grecaptcha)
	    };

	    module.exports = {

	        props: ['sitekey', 'formitem'],

	        ready: function () {


	            this.$on('submit', function (data) {
	                data['g-recaptcha-response'] = grecaptcha.getResponse();
	            });
	        },

	        methods: {
	            grecaptchaCallback: function (grecaptcha) {
	                grecaptcha.render('grecaptcha_el', {
	                    'sitekey' : this.sitekey,
	                    'theme' : this.formitem.data.recaptcha_theme || 'light',
	                    'type' : this.formitem.data.recaptcha_type || 'image',
	                    'size' : this.formitem.data.recaptcha_size || 'normal'
	                });
	            }

	        }

	    };

/***/ },

/***/ 65:
/***/ function(module, exports) {

	module.exports = "<div class=\"uk-form-row\">\r\n\r\n        <span class=\"uk-form-label\" v-show=\"formitem.data.recaptcha_label\">{{ formitem.data.recaptcha_label | trans }}</span>\r\n\r\n        <div class=\"uk-form-controls uk-form-controls-text\">\r\n            <div id=\"grecaptcha_el\"></div>\r\n        </div>\r\n\r\n    </div>";

/***/ }

/******/ });