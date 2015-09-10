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

	module.exports = __webpack_require__(81)
	module.exports.template = __webpack_require__(82)


/***/ },

/***/ 67:
/***/ function(module, exports) {

	module.exports = {

	    props: ['isAdmin'],

	    methods: {
	        getDataObject: function (defaultValue) {
	            if (this.isAdmin) {
	                this.field.data.value = this.field.data.value || defaultValue;
	                return this.field.data;
	            }
	            this.submission.data[this.field.id].type = this.field.type;
	            this.submission.data[this.field.id].label = this.field.label;
	            this.submission.data[this.field.id].value = defaultValue;
	            this.submission.data[this.field.id].prepared = this.field.prepared;
	            return this.submission.data[this.field.id];
	        },
	        fieldInvalid: function (form) {
	            return form[this.fieldid].invalid;
	        }

	    },

	    computed: {
	        fieldRequired: function () {
	            return this.field.data.required && !this.isAdmin ? true : false;
	        },
	        fieldLabel: function () {
	            return this.isAdmin ? 'Default value' : this.field.label;
	        }
	    }

	};

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	var formmakerfieldMixin = __webpack_require__(67);

	    module.exports = {

	        inherit: true,

	        mixins: [formmakerfieldMixin],

	        data: function () {
	            return {
	                fieldid: _.uniqueId('formmakerfield_')
	            };
	        },

	        created: function () {
	            this.$set('dataObject', this.getDataObject(this.field.data.value || ''));
	            //defaults admin
	            this.field.data.rows = this.field.data.rows || 4;
	            this.field.data.minLength = this.field.data.minLength || 0;
	            this.field.data.maxLength = this.field.data.maxLength || 0;
	        },

	        computed: {
	            minLength: function () {
	                return this.field.data.minLength && !this.isAdmin ? this.field.data.minLength : false;
	            },
	            maxLength: function () {
	                return this.field.data.maxLength && !this.isAdmin ? this.field.data.maxLength : false;
	            }
	        }

	    };

	    window.Formmakerfields.components['textbox'] = module.exports;

/***/ },

/***/ 82:
/***/ function(module, exports) {

	module.exports = "<div v-if=\"isAdmin\" class=\"uk-form-row\">\n        <label for=\"form-placeholder\" class=\"uk-form-label\">{{ 'Placeholder' | trans }}</label>\n\n        <div class=\"uk-form-controls\">\n            <input id=\"form-placeholder\" class=\"uk-form-width-large\" type=\"text\" v-model=\"field.data.placeholder\">\n        </div>\n    </div>\n\n    <div v-show=\"isAdmin\" class=\"uk-form-row\">\n        <label for=\"form-rows\" class=\"uk-form-label\">{{ 'Rows textarea' | trans }}</label>\n\n        <div class=\"uk-form-controls\">\n            <input id=\"form-rows\" class=\"uk-form-width-small uk-text-right\" type=\"number\"\n                   min=\"2\" v-model=\"field.data.rows\" number>\n        </div>\n    </div>\n\n    <div v-show=\"isAdmin\" class=\"uk-form-row\">\n        <span class=\"uk-form-label\">{{ 'Min / Max length input' | trans }}</span>\n\n        <div class=\"uk-form-controls uk-flex uk-flex-middle uk-flex-space-between\">\n            <label for=\"form-min-length\">{{ 'Min' | trans }}</label>\n            <input id=\"form-min-length\" class=\"uk-form-width-small uk-text-right\" type=\"number\"\n                   min=\"0\" v-model=\"field.data.minLength\" number>\n            <label for=\"form-max-length\">{{ 'Max' | trans }}</label>\n            <input id=\"form-max-length\" class=\"uk-form-width-small uk-text-right\" type=\"number\"\n                   min=\"0\" v-model=\"field.data.maxLength\" number>\n        </div>\n    </div>\n\n    <div class=\"uk-form-row {{field.data.classSfx || ''}}\">\n        <label for=\"{{ fieldid }}\" class=\"uk-form-label\" v-show=\"!field.data.hide_label\">{{ fieldLabel | trans\n            }}</label>\n\n        <div class=\"uk-form-controls\">\n            <textarea v-if=\"minLength || maxLength\" class=\"uk-form-width-large\" placeholder=\"{{ field.data.placeholder || '' | trans }}\"\n                   v-attr=\"name: fieldid, id: fieldid, rows: field.data.rows\"\n                   v-model=\"dataObject.value\"\n                   v-valid=\"required: fieldRequired, minLength: minLength, maxLength: maxLength\"></textarea>\n\n            <textarea v-if=\"!minLength && !maxLength\" class=\"uk-form-width-large\" placeholder=\"{{ field.data.placeholder || '' | trans }}\"\n                   v-attr=\"name: fieldid, id: fieldid, rows: field.data.rows\"\n                   v-model=\"dataObject.value\"\n                   v-valid=\"required: fieldRequired\"></textarea>\n\n            <p class=\"uk-form-help-block uk-text-danger\" v-show=\"fieldInvalid(form)\">{{ field.data.requiredError ||\n                'Please enter a value' | trans }}</p>\n        </div>\n    </div>";

/***/ }

/******/ });