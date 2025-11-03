System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, easing, ScrollView, UITransform, v2, v3, Vec3, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _crd, ccclass, property, EPSILON, FixedScrollView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      easing = _cc.easing;
      ScrollView = _cc.ScrollView;
      UITransform = _cc.UITransform;
      v2 = _cc.v2;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d01f4e9mgJLBJnyeHkZUl5I", "FixedScrollView", undefined);

      __checkObsolete__(['_decorator', 'easing', 'EventTouch', 'Node', 'ScrollView', 'Touch', 'UITransform', 'v2', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      EPSILON = 0.001;

      _export("FixedScrollView", FixedScrollView = (_dec = ccclass('FixedScrollView'), _dec(_class = (_class2 = (_class3 = class FixedScrollView extends ScrollView {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "allowTouch", _descriptor, this);

          _initializerDefineProperty(this, "isHandleReleaseScroll", _descriptor2, this);

          _initializerDefineProperty(this, "isInfinity", _descriptor3, this);

          this.isInTouch = false;
        }

        get isOutOfBoundary() {
          return this._isOutOfBoundary();
        }

        get scrollAnchor() {
          var offset = this.getScrollOffset();
          var max = this.getMaxScrollOffset();
          return v2(max.x == 0 ? 0 : offset.x / max.x, max.y == 0 ? 0 : 1 - offset.y / max.y);
        }

        _getHowMuchOutOfBoundary(addition) {
          if (this.isInfinity) return v3();else return super._getHowMuchOutOfBoundary(addition);
        }

        _calculateMovePercentDelta(options) {
          var anchor = options.anchor;
          var applyToHorizontal = options.applyToHorizontal;
          var applyToVertical = options.applyToVertical; // eslint-disable-next-line @typescript-eslint/no-this-alias

          var self = this;

          self._calculateBoundary(); //取消了anchor.clampf


          var bottomDelta = self._getContentBottomBoundary() - self._bottomBoundary;

          bottomDelta = -bottomDelta;

          var leftDelta = self._getContentLeftBoundary() - self._leftBoundary;

          leftDelta = -leftDelta;
          var moveDelta = new Vec3();

          if (self._content && self.view) {
            var totalScrollDelta = 0;

            var uiTrans = self._content.getComponent(UITransform);

            var contentSize = uiTrans.contentSize;
            var scrollSize = self.view.contentSize;

            if (applyToHorizontal) {
              totalScrollDelta = contentSize.width - scrollSize.width;
              moveDelta.x = leftDelta - totalScrollDelta * anchor.x;
            }

            if (applyToVertical) {
              totalScrollDelta = contentSize.height - scrollSize.height;
              moveDelta.y = bottomDelta - totalScrollDelta * anchor.y;
            }
          }

          return moveDelta;
        }

        _processAutoScrolling(dt) {
          var self = this;

          var isAutoScrollBrake = self._isNecessaryAutoScrollBrake();

          var brakingFactor = isAutoScrollBrake ? 0.05 : 1;
          self._autoScrollAccumulatedTime += dt * (1 / brakingFactor);
          var percentage = Math.min(1, self._autoScrollAccumulatedTime / self._autoScrollTotalTime);

          if (self._autoScrollAttenuate) {
            percentage = easing.quintOut(percentage);
          }

          var clonedAutoScrollTargetDelta = self._autoScrollTargetDelta.clone();

          clonedAutoScrollTargetDelta.multiplyScalar(percentage);

          var clonedAutoScrollStartPosition = self._autoScrollStartPosition.clone();

          clonedAutoScrollStartPosition.add(clonedAutoScrollTargetDelta);
          var reachedEnd = Math.abs(percentage - 1) <= EPSILON;
          var fireEvent = Math.abs(percentage - 1) <= self.getScrollEndedEventTiming();

          if (fireEvent && !self._isScrollEndedWithThresholdEventFired) {
            self._dispatchEvent(ScrollView.EventType.SCROLL_ENG_WITH_THRESHOLD);

            self._isScrollEndedWithThresholdEventFired = true;
          }

          if (self.elastic) {
            var brakeOffsetPosition = clonedAutoScrollStartPosition.clone();
            brakeOffsetPosition.subtract(self._autoScrollBrakingStartPosition);

            if (isAutoScrollBrake) {
              brakeOffsetPosition.multiplyScalar(brakingFactor);
            }

            clonedAutoScrollStartPosition.set(self._autoScrollBrakingStartPosition);
            clonedAutoScrollStartPosition.add(brakeOffsetPosition);
          } else {
            var moveDelta = clonedAutoScrollStartPosition.clone();
            moveDelta.subtract(self.getContentPosition());

            var outOfBoundary = self._getHowMuchOutOfBoundary(moveDelta);

            if (!outOfBoundary.equals(Vec3.ZERO, EPSILON)) {
              clonedAutoScrollStartPosition.add(outOfBoundary);
              reachedEnd = true;
            }
          }

          if (reachedEnd) {
            self._autoScrolling = false;
          }

          var deltaMove = clonedAutoScrollStartPosition.clone();
          deltaMove.subtract(self.content.position);

          self._clampDelta(deltaMove);

          self._moveContent(deltaMove, reachedEnd);

          if (deltaMove.length() > EPSILON) self._dispatchEvent(ScrollView.EventType.SCROLLING);

          if (!self._autoScrolling) {
            self._isBouncing = false;
            self._scrolling = false;

            self._dispatchEvent(ScrollView.EventType.SCROLL_ENDED);

            self.node.emit(FixedScrollView.FINISH_AUTO_SCROLL);
          }
        }

        _clampDelta(out) {
          if (!this.isInfinity) super._clampDelta(out);
        }

        _handleReleaseLogic(touch) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          var self = this;

          self._getLocalAxisAlignDelta(self._deltaPos, touch);

          self._gatherTouchMove(self._deltaPos);

          if (self.isHandleReleaseScroll || this._isOutOfBoundary()) self._processInertiaScroll();

          if (self._scrolling) {
            self._scrolling = false;

            if (!self._autoScrolling) {
              self._dispatchEvent(ScrollView.EventType.SCROLL_ENDED);
            }
          }
        }

        _onTouchBegan(event, captureListeners) {
          this.isInTouch = true;
          if (!this.allowTouch) return;

          super._onTouchBegan(event, captureListeners);
        }

        _onTouchMoved(event, captureListeners) {
          if (!this.allowTouch) return;

          super._onTouchMoved(event, captureListeners);
        }

        _onTouchCancelled(event, captureListeners) {
          this.isInTouch = false;
          if (!this.allowTouch) return;

          super._onTouchCancelled(event, captureListeners);

          if (event && !event.simulate) {
            this._dispatchEvent(ScrollView.EventType.TOUCH_UP);
          }
        }

        _onTouchEnded(event, captureListeners) {
          this.isInTouch = false;
          if (!this.allowTouch) return;

          super._onTouchEnded(event, captureListeners);
        }

        _hasNestedViewGroup(event, captureListeners) {
          // if (!event || event.eventPhase !== Event.CAPTURING_PHASE) {
          //     return false;
          // }
          // if (captureListeners) {
          //     // captureListeners are arranged from child to parent
          //     for (let i = 0; i < captureListeners.length; i++) {
          //         const listener = captureListeners[i];
          //         if (this.node === listener) {
          //             if (event.target && (event.target as Node).getComponent(ViewGroup)) {
          //                 return true;
          //             }
          //             return false;
          //         }
          //         if (listener.getComponent(ViewGroup)) {
          //             return true;
          //         }
          //     }
          // }
          return false;
        }

      }, _class3.FINISH_AUTO_SCROLL = "finishAutoScroll", _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "allowTouch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isHandleReleaseScroll", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isInfinity", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=941aadedb2b3ba9b25cda7aa8af6a9f953de4aa8.js.map