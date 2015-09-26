System.register("index", ["angular2/forms", "ionic/ionic"], function (_export) {
    "use strict";

    var FormBuilder, Validators, App, __decorate, __metadata, IonicApp;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function randomTitle() {
        var items = ['Pizza', 'Pumpkin', 'Apple', 'Bologna'];
        return items[Math.floor(Math.random() * items.length)];
    }
    return {
        setters: [function (_angular2Forms) {
            FormBuilder = _angular2Forms.FormBuilder;
            Validators = _angular2Forms.Validators;
        }, function (_ionicIonic) {
            App = _ionicIonic.App;
        }],
        execute: function () {
            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
                switch (arguments.length) {
                    case 2:
                        return decorators.reduceRight(function (o, d) {
                            return d && d(o) || o;
                        }, target);
                    case 3:
                        return decorators.reduceRight(function (o, d) {
                            return (d && d(target, key), void 0);
                        }, void 0);
                    case 4:
                        return decorators.reduceRight(function (o, d) {
                            return d && d(target, key, o) || o;
                        }, desc);
                }
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            IonicApp = (function () {
                function IonicApp() {
                    _classCallCheck(this, IonicApp);

                    var fb = new FormBuilder();
                    this.form = fb.group({
                        searchQuery: ['', Validators.required]
                    });
                    this.query = 'HELLO';
                    this.items = [];
                    for (var i = 0; i < 100; i++) {
                        this.items.push({
                            title: randomTitle()
                        });
                    }
                }

                _createClass(IonicApp, [{
                    key: "getItems",
                    value: function getItems() {
                        var q = this.form.controls.searchQuery.value;
                        if (q.trim() == '') {
                            return this.items;
                        }
                        return this.items.filter(function (v) {
                            if (v.title.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
                                return true;
                            }
                            return false;
                        });
                    }
                }]);

                return IonicApp;
            })();

            IonicApp = __decorate([App({
                templateUrl: 'main.html'
            }), __metadata('design:paramtypes', [])], IonicApp);
        }
    };
});