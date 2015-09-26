System.register('ionic/components/menu/extensions/gestures', ['ionic/gestures/slide-edge-gesture'], function (_export) {
    'use strict';

    var SlideEdgeGesture, MenuGenericGestureHandler, MenuContentGesture, LeftMenuGesture, RightMenuGesture;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_ionicGesturesSlideEdgeGesture) {
            SlideEdgeGesture = _ionicGesturesSlideEdgeGesture.SlideEdgeGesture;
        }],
        execute: function () {
            MenuGenericGestureHandler = (function (_SlideEdgeGesture) {
                _inherits(MenuGenericGestureHandler, _SlideEdgeGesture);

                function MenuGenericGestureHandler(menu, targetElement, threshold) {
                    _classCallCheck(this, MenuGenericGestureHandler);

                    _get(Object.getPrototypeOf(MenuGenericGestureHandler.prototype), 'constructor', this).call(this, targetElement, {
                        direction: menu.side === 'left' || menu.side === 'right' ? 'x' : 'y',
                        edge: menu.side,
                        threshold: threshold
                    });
                    this.menu = menu;
                    this.listen();
                }

                // Set CSS, then wait one frame for it to apply before sliding starts

                _createClass(MenuGenericGestureHandler, [{
                    key: 'onSlideBeforeStart',
                    value: function onSlideBeforeStart(slide, ev) {
                        this.menu.setProgressStart();
                    }
                }, {
                    key: 'onSlide',
                    value: function onSlide(slide, ev) {
                        this.menu.setProgess(slide.distance / slide.max);
                    }
                }, {
                    key: 'onSlideEnd',
                    value: function onSlideEnd(slide, ev) {
                        var shouldComplete = Math.abs(ev.velocityX) > 0.2 || Math.abs(slide.delta) > Math.abs(slide.max) * 0.5;
                        this.menu.setProgressFinish(shouldComplete);
                    }
                }, {
                    key: 'getElementStartPos',
                    value: function getElementStartPos(slide, ev) {
                        return this.menu.isOpen ? slide.max : slide.min;
                    }
                }, {
                    key: 'getSlideBoundaries',
                    value: function getSlideBoundaries() {
                        return {
                            min: 0,
                            max: this.menu.width()
                        };
                    }
                }]);

                return MenuGenericGestureHandler;
            })(SlideEdgeGesture);

            MenuContentGesture = (function (_MenuGenericGestureHandler) {
                _inherits(MenuContentGesture, _MenuGenericGestureHandler);

                function MenuContentGesture(menu) {
                    _classCallCheck(this, MenuContentGesture);

                    _get(Object.getPrototypeOf(MenuContentGesture.prototype), 'constructor', this).call(this, menu, menu.getContentElement(), 75);
                }

                _createClass(MenuContentGesture, [{
                    key: 'canStart',
                    value: function canStart(ev) {
                        return this.menu.isOpen ? true : _get(Object.getPrototypeOf(MenuContentGesture.prototype), 'canStart', this).call(this, ev);
                    }
                }]);

                return MenuContentGesture;
            })(MenuGenericGestureHandler);

            _export('MenuContentGesture', MenuContentGesture);

            LeftMenuGesture = (function (_MenuContentGesture) {
                _inherits(LeftMenuGesture, _MenuContentGesture);

                function LeftMenuGesture(menu) {
                    _classCallCheck(this, LeftMenuGesture);

                    _get(Object.getPrototypeOf(LeftMenuGesture.prototype), 'constructor', this).call(this, menu);
                }

                return LeftMenuGesture;
            })(MenuContentGesture);

            _export('LeftMenuGesture', LeftMenuGesture);

            RightMenuGesture = (function (_LeftMenuGesture) {
                _inherits(RightMenuGesture, _LeftMenuGesture);

                function RightMenuGesture(menu) {
                    _classCallCheck(this, RightMenuGesture);

                    _get(Object.getPrototypeOf(RightMenuGesture.prototype), 'constructor', this).call(this, menu);
                }

                _createClass(RightMenuGesture, [{
                    key: 'getElementStartPos',
                    value: function getElementStartPos(slide, ev) {
                        return this.menu.isOpen ? slide.min : slide.max;
                    }
                }, {
                    key: 'getSlideBoundaries',
                    value: function getSlideBoundaries() {
                        return {
                            min: -this.menu.width(),
                            max: 0
                        };
                    }
                }]);

                return RightMenuGesture;
            })(LeftMenuGesture);

            _export('RightMenuGesture', RightMenuGesture);
        }
    };
});