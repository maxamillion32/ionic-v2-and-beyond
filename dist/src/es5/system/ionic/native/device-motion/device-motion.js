System.register("ionic/native/device-motion/device-motion", ["rx", "ionic/util", "../plugin"], function (_export) {
    "use strict";

    var Rx, util, NativePlugin, __decorate, __metadata, _DeviceMotion;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_rx) {
            Rx = _rx;
        }, function (_ionicUtil) {
            util = _ionicUtil;
        }, function (_plugin) {
            NativePlugin = _plugin.NativePlugin;
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

            _DeviceMotion = (function () {
                function DeviceMotion() {
                    _classCallCheck(this, DeviceMotion);
                }

                _createClass(DeviceMotion, null, [{
                    key: "_wrap",
                    value: function _wrap(result) {
                        // Mimic the DeviceMotionEvent
                        return util.extend({
                            acceleration: result,
                            accelerationIncludingGravity: result,
                            rotationRate: 0,
                            interval: 0,
                            native: true
                        }, result);
                    }
                }, {
                    key: "getCurrentAcceleration",
                    value: function getCurrentAcceleration() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            if (window.DeviceMotionEvent || 'listenForDeviceMovement' in window) {
                                var fnCb = function fnCb(eventData) {
                                    resolve(_DeviceMotion._wrap(eventData));
                                    window.removeEventListener('devicemotion', fnCb);
                                };
                                window.addEventListener('devicemotion', fnCb);
                            } else if (navigator.accelerometer) {
                                navigator.accelerometer.getCurrentAcceleration(function (result) {
                                    resolve(_DeviceMotion._wrap(result));
                                }, function (err) {
                                    reject(err);
                                });
                            } else {
                                _this.pluginWarn();
                                reject('The Device does not support device motion events.');
                                return;
                            }
                        });
                    }
                }, {
                    key: "watchAcceleration",
                    value: function watchAcceleration(options) {
                        if (window.DeviceMotionEvent || 'listenForDeviceMovement' in window) {
                            var watchID = undefined;
                            var source = Rx.Observable.create(function (observer) {
                                var fnCb = function fnCb(eventData) {
                                    observer.onNext(_DeviceMotion._wrap(eventData));
                                };
                                window.addEventListener('devicemotion', fnCb);
                            });
                            return {
                                source: source,
                                watchID: watchID,
                                clear: function clear() {
                                    window.removeEventListener('devicemotion', fnCb);
                                }
                            };
                        } else if (navigator.accelerometer) {
                            var _ret = (function () {
                                var watchID = undefined;
                                var source = Rx.Observable.create(function (observer) {
                                    watchID = navigator.accelerometer.watchAcceleration(function (result) {
                                        observer.onNext(_DeviceMotion._wrap(result));
                                    }, function (err) {
                                        observer.onError(err, observer);
                                    }, options);
                                });
                                return {
                                    v: {
                                        source: source,
                                        watchID: watchID,
                                        clear: function clear() {
                                            navigator.accelerometer.clearWatch(watchID);
                                        }
                                    }
                                };
                            })();

                            if (typeof _ret === "object") return _ret.v;
                        }
                    }
                }]);

                return DeviceMotion;
            })();

            _export("DeviceMotion", _DeviceMotion);

            _DeviceMotion = __decorate([NativePlugin({
                name: 'Device Motion',
                platforms: {
                    cordova: 'cordova-plugin-device-motion'
                }
            }), __metadata('design:paramtypes', [])], _DeviceMotion);
        }
    };
});