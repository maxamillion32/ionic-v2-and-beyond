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
import * as Rx from 'rx';
import * as util from 'ionic/util';
import { NativePlugin } from '../plugin';
export let DeviceMotion = class {
    static _wrap(result) {
        // Mimic the DeviceMotionEvent
        return util.extend({
            acceleration: result,
            accelerationIncludingGravity: result,
            rotationRate: 0,
            interval: 0,
            native: true
        }, result);
    }
    static getCurrentAcceleration() {
        return new Promise((resolve, reject) => {
            if (window.DeviceMotionEvent || ('listenForDeviceMovement' in window)) {
                var fnCb = function fnCb(eventData) {
                    resolve(DeviceMotion._wrap(eventData));
                    window.removeEventListener('devicemotion', fnCb);
                };
                window.addEventListener('devicemotion', fnCb);
            }
            else if (navigator.accelerometer) {
                navigator.accelerometer.getCurrentAcceleration(function (result) {
                    resolve(DeviceMotion._wrap(result));
                }, function (err) {
                    reject(err);
                });
            }
            else {
                this.pluginWarn();
                reject('The Device does not support device motion events.');
                return;
            }
        });
    }
    static watchAcceleration(options) {
        if (window.DeviceMotionEvent || ('listenForDeviceMovement' in window)) {
            let watchID;
            let source = Rx.Observable.create((observer) => {
                var fnCb = function fnCb(eventData) {
                    observer.onNext(DeviceMotion._wrap(eventData));
                };
                window.addEventListener('devicemotion', fnCb);
            });
            return {
                source: source,
                watchID: watchID,
                clear: () => {
                    window.removeEventListener('devicemotion', fnCb);
                }
            };
        }
        else if (navigator.accelerometer) {
            let watchID;
            let source = Rx.Observable.create((observer) => {
                watchID = navigator.accelerometer.watchAcceleration(function (result) {
                    observer.onNext(DeviceMotion._wrap(result));
                }, function (err) {
                    observer.onError(err, observer);
                }, options);
            });
            return {
                source: source,
                watchID: watchID,
                clear: () => {
                    navigator.accelerometer.clearWatch(watchID);
                }
            };
        }
    }
};
DeviceMotion = __decorate([
    NativePlugin({
        name: 'Device Motion',
        platforms: ['ios', 'android', 'web'],
        engines: {
            cordova: 'cordova-plugin-device-motion'
        }
    }), 
    __metadata('design:paramtypes', [])
], DeviceMotion);