var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NativePlugin } from '../plugin';
export let Device = class {
    /**
     * Returns the whole device object.
     * @see https://github.com/apache/cordova-plugin-device
     * @returns {Object} The device object.
     */
    static getDevice() {
        return this.ifPlugin(window.device, () => {
            return device;
        }, () => {
            return {
                name: Device.getName(),
                model: Device.getModel(),
                platform: Device.getPlatform(),
                uuid: Device.getUUID(),
                version: Device.getVersion()
            };
        });
    }
    /**
     * Returns the Cordova version.
     * @see https://github.com/apache/cordova-plugin-device#devicecordova
     * @returns {String} The Cordova version.
     */
    static getCordova() {
        this.ifPlugin(window.device, () => {
            return device.cordova;
        });
    }
    /**
     * Returns the name of the device's model or product.
     * @see https://github.com/apache/cordova-plugin-device#devicemodel
     * @returns {String} The name of the device's model or product.
     */
    static getModel() {
        this.ifPlugin(window.device, () => {
            return device.model;
        }, () => {
            return 'unknown';
        });
    }
    /**
     * @deprecated device.name is deprecated as of version 2.3.0. Use device.model instead.
     * @returns {String}
     */
    static getName() {
        this.ifPlugin(window.device, () => {
            return device.name;
        }, () => {
            return 'unknown';
        });
    }
    /**
     * Returns the device's operating system name.
     * @see https://github.com/apache/cordova-plugin-device#deviceplatform
     * @returns {String} The device's operating system name.
     */
    static getPlatform() {
        this.ifPlugin(window.device, () => {
            return device.name;
        }, () => {
            return 'unknown';
        });
    }
    /**
     * Returns the device's Universally Unique Identifier.
     * @see https://github.com/apache/cordova-plugin-device#deviceuuid
     * @returns {String} The device's Universally Unique Identifier
     */
    static getUUID() {
        this.ifPlugin(window.device, () => {
            return device.uuid;
        }, () => {
            return 'unknown';
        });
    }
    /**
     * Returns the operating system version.
     * @see https://github.com/apache/cordova-plugin-device#deviceversion
     * @returns {String}
     */
    static getVersion() {
        this.ifPlugin(window.device, () => {
            return device.version;
        }, () => {
            return 'unknown';
        });
    }
    /**
     * Returns the device manufacturer.
     * @returns {String}
     */
    static getManufacturer() {
        this.ifPlugin(window.device, () => {
            return device.manufacturer;
        }, () => {
            return 'unknown';
        });
    }
};
Device = __decorate([
    NativePlugin({
        name: 'Device',
        platforms: {
            cordova: 'cordova-plugin-device'
        }
    }), 
    __metadata('design:paramtypes', [])
], Device);