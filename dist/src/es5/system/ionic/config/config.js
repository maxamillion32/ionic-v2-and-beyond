System.register('ionic/config/config', ['../util/util'], function (_export) {
    /**
    * TODO
    */
    'use strict';

    var isObject, isDefined, isFunction, extend, IonicConfig, modeConfigs;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_utilUtil) {
            isObject = _utilUtil.isObject;
            isDefined = _utilUtil.isDefined;
            isFunction = _utilUtil.isFunction;
            extend = _utilUtil.extend;
        }],
        execute: function () {
            IonicConfig = (function () {
                /**
                 * TODO
                 * @param  {Object} settings   The settings for your app
                 */

                function IonicConfig(settings) {
                    _classCallCheck(this, IonicConfig);

                    // defaults
                    this._settings = {};
                    // override defaults w/ user config
                    if (settings) {
                        extend(this._settings, settings);
                    }
                }

                /**
                * TODO
                */

                _createClass(IonicConfig, [{
                    key: 'setting',
                    value: function setting() {
                        var args = arguments;
                        var arg0 = args[0];
                        var arg1 = args[1];
                        var settings = this._settings;
                        switch (args.length) {
                            case 0:
                                // setting() = get settings object
                                return settings;
                            case 1:
                                // setting({...}) = set settings object
                                // setting('key') = get value
                                if (isObject(arg0)) {
                                    // setting({...}) = set settings object
                                    // arg0 = setting object
                                    this._settings = arg0;
                                    return this;
                                }
                                // time for the big show, get the value
                                // setting('key') = get value
                                // arg0 = key
                                if (!isDefined(settings[arg0])) {
                                    // if the value was already set this will all be skipped
                                    // if there was no user config then it'll check each of
                                    // the user config's platforms, which already contains
                                    // settings from default platform configs
                                    settings[arg0] = null;
                                    // check the platform settings object for this value
                                    // loop though each of the active platforms
                                    var activePlatformKeys = this._platforms;
                                    var platformSettings = settings.platforms;
                                    var platformObj = null;
                                    if (platformSettings) {
                                        var platformValue = undefined;
                                        for (var i = 0; i < activePlatformKeys.length; i++) {
                                            platformObj = platformSettings[activePlatformKeys[i]];
                                            if (platformObj) {
                                                if (isDefined(platformObj[arg0])) {
                                                    // check assigned platform settings
                                                    platformValue = platformObj[arg0];
                                                } else if (platformObj.mode) {
                                                    // check the platform default mode settings
                                                    platformObj = IonicConfig.modeConfig(platformObj.mode);
                                                    if (platformObj) {
                                                        platformValue = platformObj[arg0];
                                                    }
                                                }
                                            }
                                        }
                                        if (isDefined(platformValue)) {
                                            settings[arg0] = platformValue;
                                        }
                                    }
                                }
                                // return key's value
                                // either it came directly from the user config
                                // or it was from the users platform configs
                                // or it was from the default platform configs
                                // in that order
                                if (isFunction(settings[arg0])) {
                                    settings[arg0] = settings[arg0](this._platform);
                                }
                                return settings[arg0];
                            case 2:
                                // setting('ios', {...}) = set platform config object
                                // setting('key', 'value') = set key/value pair
                                if (isObject(arg1)) {
                                    // setting('ios', {...}) = set platform config object
                                    // arg0 = platform
                                    // arg1 = platform config object
                                    settings.platforms = settings.platforms || {};
                                    settings.platforms[arg0] = arg1;
                                } else {
                                    // setting('key', 'value') = set key/value pair
                                    // arg0 = key
                                    // arg1 = value
                                    settings[arg0] = arg1;
                                }
                                return this;
                            case 3:
                                // setting('ios', 'key', 'value') = set key/value pair for platform
                                // arg0 = platform
                                // arg1 = key
                                // arg2 = value
                                settings.platforms = settings.platforms || {};
                                settings.platforms[arg0] = settings.platforms[arg0] || {};
                                settings.platforms[arg0][arg1] = args[2];
                                return this;
                        }
                    }

                    /**
                     * TODO
                     * @param  {Object} platform   The platform
                     */
                }, {
                    key: 'setPlatform',
                    value: function setPlatform(platform) {
                        this._platform = platform;
                        // get the array of active platforms, which also knows the hierarchy,
                        // with the last one the most important
                        this._platforms = platform.platforms();
                        // copy default platform settings into the user config platform settings
                        // user config platform settings should override default platform settings
                        this._settings.platforms = extend(platform.settings(), this._settings.platforms || {});
                    }
                }], [{
                    key: 'modeConfig',
                    value: function modeConfig(mode, config) {
                        var args = arguments;
                        if (args.length === 2) {
                            // modeConfig('ios', {...})
                            modeConfigs[mode] = extend(modeConfigs[mode] || {}, config);
                        } else {
                            // modeConfig('ios')
                            return modeConfigs[mode];
                        }
                    }
                }]);

                return IonicConfig;
            })();

            _export('IonicConfig', IonicConfig);

            modeConfigs = {};
        }
    };
});