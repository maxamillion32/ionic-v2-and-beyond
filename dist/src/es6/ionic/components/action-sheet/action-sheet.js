/**
* @ngdoc service
* @name ActionSheet
* @module ionic
* @description
* The ActionSheet is a modal menu with options to select based on an action.
*/
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
import { View, Injectable, NgFor, NgIf } from 'angular2/angular2';
import { Icon } from '../icon/icon';
import { Overlay } from '../overlay/overlay';
import { Animation } from '../../animations/animation';
import * as util from 'ionic/util';
/**
 * @name ActionSheet
 * @description
 * The Action Sheet is a slide-up pane that lets the user choose from a set of options. Dangerous options are made obvious.
 *
 * There are easy ways to cancel out of the action sheet, such as tapping the backdrop or even hitting escape on the keyboard for desktop testing.
 *
 * @usage
 * ```ts
 * openMenu() {
 *
 *   this.actionSheet.open({
 *     buttons: [
 *       { text: 'Share This' },
 *       { text: 'Move' }
 *     ],
 *     destructiveText: 'Delete',
 *     titleText: 'Modify your album',
 *     cancelText: 'Cancel',
 *     cancel: function() {
 *       console.log('Canceled');
 *     },
 *     destructiveButtonClicked: () => {
 *       console.log('Destructive clicked');
 *     },
 *     buttonClicked: function(index) {
 *       console.log('Button clicked', index);
 *       if(index == 1) { return false; }
 *       return true;
 *     }
 *
 *   }).then(actionSheetRef => {
 *     this.actionSheetRef = actionSheetRef;
 *   });
 *
 * }
 * ```
 */
let ActionSheetDirective = class {
    _cancel() {
        this.cancel && this.cancel();
        return this.overlayRef.close();
    }
    _destructive() {
        let shouldClose = this.destructiveButtonClicked();
        if (shouldClose === true) {
            return this.overlayRef.close();
        }
    }
    _buttonClicked(index) {
        let shouldClose = this.buttonClicked(index);
        if (shouldClose === true) {
            return this.overlayRef.close();
        }
    }
};
ActionSheetDirective = __decorate([
    View({
        template: '<backdrop (click)="_cancel()" tappable></backdrop>' +
            '<action-sheet-wrapper>' +
            '<div class="action-sheet-container">' +
            '<div class="action-sheet-group action-sheet-options">' +
            '<div class="action-sheet-title" *ng-if="titleText">{{titleText}}</div>' +
            '<button (click)="_buttonClicked(index)" *ng-for="#b of buttons; #index = index" class="action-sheet-option">' +
            '<icon [name]="b.icon" *ng-if="b.icon"></icon> ' +
            '{{b.text}}' +
            '</button>' +
            '<button *ng-if="destructiveText" (click)="_destructive()" class="destructive action-sheet-destructive">' +
            '<icon [name]="destructiveIcon" *ng-if="destructiveIcon"></icon> ' +
            '{{destructiveText}}</button>' +
            '</div>' +
            '<div class="action-sheet-group action-sheet-cancel" *ng-if="cancelText">' +
            '<button (click)="_cancel()">' +
            '<icon [name]="cancelIcon"></icon> ' +
            '{{cancelText}}</button>' +
            '</div>' +
            '</div>' +
            '</action-sheet-wrapper>',
        directives: [NgFor, NgIf, Icon]
    }), 
    __metadata('design:paramtypes', [])
], ActionSheetDirective);
export let ActionSheet = class extends Overlay {
    /**
     * Create and open a new Action Sheet. This is the
     * public API, and most often you will only use ActionSheet.open()
     *
     * @param {Object} [opts={}]  TODO
     * @return {Promise} Promise that resolves when the action sheet is open.
     */
    open(opts = {}) {
        let config = this.config;
        let defaults = {
            enterAnimation: config.setting('actionSheetEnter'),
            leaveAnimation: config.setting('actionSheetLeave'),
            cancelIcon: config.setting('actionSheetCancelIcon'),
            destructiveIcon: config.setting('actionSheetDestructiveIcon')
        };
        let context = util.extend(defaults, opts);
        return this.create(OVERLAY_TYPE, ActionSheetDirective, context, context);
    }
    /**
     * TODO
     * @returns {TODO} TODO
     */
    get() {
        return this.getByType(OVERLAY_TYPE);
    }
};
ActionSheet = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], ActionSheet);
const OVERLAY_TYPE = 'action-sheet';
/**
 * Animations for action sheet
 */
class ActionSheetAnimation extends Animation {
    constructor(element) {
        super(element);
        this.easing('cubic-bezier(.36, .66, .04, 1)').duration(450);
        this.backdrop = new Animation(element.querySelector('backdrop'));
        this.wrapper = new Animation(element.querySelector('action-sheet-wrapper'));
        this.add(this.backdrop, this.wrapper);
    }
}
class ActionSheetSlideIn extends ActionSheetAnimation {
    constructor(element) {
        super(element);
        this.backdrop.fromTo('opacity', 0.01, 0.4);
        this.wrapper.fromTo('translateY', '100%', '0%');
    }
}
Animation.register('action-sheet-slide-in', ActionSheetSlideIn);
class ActionSheetSlideOut extends ActionSheetAnimation {
    constructor(element) {
        super(element);
        this.backdrop.fromTo('opacity', 0.4, 0.01);
        this.wrapper.fromTo('translateY', '0%', '100%');
    }
}
Animation.register('action-sheet-slide-out', ActionSheetSlideOut);
class ActionSheetMdSlideIn extends ActionSheetSlideIn {
    constructor(element) {
        super(element);
        this.backdrop.fromTo('opacity', 0.01, 0.26);
    }
}
Animation.register('action-sheet-md-slide-in', ActionSheetMdSlideIn);
class ActionSheetMdSlideOut extends ActionSheetSlideOut {
    constructor(element) {
        super(element);
        this.backdrop.fromTo('opacity', 0.26, 0.01);
    }
}
Animation.register('action-sheet-md-slide-out', ActionSheetMdSlideOut);