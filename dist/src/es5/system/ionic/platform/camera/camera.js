System.register("ionic/platform/camera/camera", ["ionic/util", "../plugin"], function (_export) {
    "use strict";

    var util, NativePlugin, __decorate, __metadata, Camera;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_ionicUtil) {
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

            Camera = (function () {
                function Camera() {
                    _classCallCheck(this, Camera);
                }

                _createClass(Camera, null, [{
                    key: "getPicture",
                    value: function getPicture(options) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            if (!navigator.camera) {
                                _this.pluginWarn();
                                resolve(null);
                                return;
                            }
                            var options = util.defaults({
                                quality: 80,
                                destinationType: window.Camera.DestinationType.DATA_URL,
                                sourceType: window.Camera.PictureSourceType.CAMERA,
                                allowEdit: true,
                                encodingType: window.Camera.EncodingType.JPEG,
                                popoverOptions: window.CameraPopoverOptions,
                                saveToPhotoAlbum: false
                            }, options);
                            navigator.camera.getPicture(function (imageData) {
                                resolve(imageData);
                            }, function (err) {
                                reject(err);
                            }, options);
                        });
                    }
                }, {
                    key: "cleanup",
                    value: function cleanup() {
                        return new Promise(function (resolve, reject) {
                            navigator.camera.cleanup(function () {
                                resolve();
                            }, function (err) {
                                reject(err);
                            });
                        });
                    }
                }]);

                return Camera;
            })();

            _export("Camera", Camera);

            _export("Camera", Camera = __decorate([NativePlugin({
                name: 'Camera',
                platforms: ['ios', 'android'],
                engines: {
                    cordova: 'cordova-plugin-camera'
                },
                pluginCheck: function pluginCheck() {
                    return !!navigator.camera;
                }
            }), __metadata('design:paramtypes', [])], Camera));
        }
    };
});