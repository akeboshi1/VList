System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, approx, EPSILON, Size, v2, Widget, WidgetUtils, _crd, AlignFlags;

  _export("WidgetUtils", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      approx = _cc.approx;
      EPSILON = _cc.EPSILON;
      Size = _cc.Size;
      v2 = _cc.v2;
      Widget = _cc.Widget;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3b0aavvCrtNd4SPMiyVFe2q", "WidgetUtils", undefined);

      __checkObsolete__(['approx', 'EPSILON', 'Size', 'UITransform', 'v2', 'Widget']);

      AlignFlags = /*#__PURE__*/function (AlignFlags) {
        AlignFlags[AlignFlags["TOP"] = 1] = "TOP";
        AlignFlags[AlignFlags["MID"] = 2] = "MID";
        AlignFlags[AlignFlags["BOT"] = 4] = "BOT";
        AlignFlags[AlignFlags["LEFT"] = 8] = "LEFT";
        AlignFlags[AlignFlags["CENTER"] = 16] = "CENTER";
        AlignFlags[AlignFlags["RIGHT"] = 32] = "RIGHT";
        AlignFlags[AlignFlags["HORIZONTAL"] = 56] = "HORIZONTAL";
        AlignFlags[AlignFlags["VERTICAL"] = 7] = "VERTICAL";
        return AlignFlags;
      }(AlignFlags || {});

      _export("WidgetUtils", WidgetUtils = class WidgetUtils {
        static align(parentTrans, targetTrans) {
          let widget = targetTrans.getComponent(Widget);
          if (!widget) return;
          const targetSize = parentTrans.contentSize;
          const targetAnchor = v2(); // const childTrans = node._getUITransformComp()!;

          let x = targetTrans.node.position.x;
          let y = targetTrans.node.position.y;
          const anchor = targetTrans.anchorPoint;
          const scale = targetTrans.node.scale; // It is a reference of Node's scale, don't change its value in this function.

          let width = targetTrans.width;
          ;

          if (widget.alignFlags & AlignFlags.HORIZONTAL) {
            let localLeft = 0;
            let localRight = 0;
            const targetWidth = targetSize.width;
            localLeft = -parentTrans.anchorX * parentTrans.width;
            localRight = (1 - parentTrans.anchorX) * parentTrans.width; // adjust borders according to offsets

            localLeft += widget.isAbsoluteLeft ? widget.left : widget.left * targetWidth;
            localRight -= widget.isAbsoluteRight ? widget.right : widget.right * targetWidth;
            let anchorX = anchor.x;
            let scaleX = scale.x;

            if (scaleX < 0) {
              anchorX = 1.0 - anchorX;
              scaleX = -scaleX;
            }

            if (widget.isStretchWidth) {
              width = localRight - localLeft;

              if (scaleX !== 0) {
                targetTrans.width = width / scaleX;
              }

              x = localLeft + anchorX * width;
            } else {
              width = targetTrans.width * scaleX;

              if (widget.isAlignHorizontalCenter) {
                let localHorizontalCenter = widget.isAbsoluteHorizontalCenter ? widget.horizontalCenter : widget.horizontalCenter * targetWidth;
                let targetCenter = (0.5 - targetAnchor.x) * targetSize.width;
                x = targetCenter + (anchorX - 0.5) * width + localHorizontalCenter;
              } else if (widget.isAlignLeft) {
                x = localLeft + anchorX * width;
              } else {
                x = localRight + (anchorX - 1) * width;
              }

              if (!approx(scaleX, 0, EPSILON)) {
                width /= scaleX;
              } else {
                width = targetTrans.width;
              }
            }
          }

          let height = targetTrans.height;

          if (widget.alignFlags & AlignFlags.VERTICAL) {
            let localTop = 0;
            let localBottom = 0;
            const targetHeight = targetSize.height;
            localBottom = -parentTrans.anchorY * parentTrans.height;
            localTop = (1 - parentTrans.anchorY) * parentTrans.height; // adjust borders according to offsets

            localBottom += widget.isAbsoluteBottom ? widget.bottom : widget.bottom * targetHeight;
            localTop -= widget.isAbsoluteTop ? widget.top : widget.top * targetHeight;
            let anchorY = anchor.y;
            let scaleY = scale.y;

            if (scaleY < 0) {
              anchorY = 1.0 - anchorY;
              scaleY = -scaleY;
            }

            if (widget.isStretchHeight) {
              height = localTop - localBottom;

              if (scaleY !== 0) {
                targetTrans.height = height / scaleY;
              }

              y = localBottom + anchorY * height;
            } else {
              height = targetTrans.height * scaleY;

              if (widget.isAlignVerticalCenter) {
                let localVerticalCenter = widget.isAbsoluteVerticalCenter ? widget.verticalCenter : widget.verticalCenter * targetHeight;
                let targetMiddle = (0.5 - targetAnchor.y) * targetSize.height;
                y = targetMiddle + (anchorY - 0.5) * height + localVerticalCenter;
              } else if (widget.isAlignBottom) {
                y = localBottom + anchorY * height;
              } else {
                y = localTop + (anchorY - 1) * height;
              }

              if (!approx(scaleY, 0, EPSILON)) {
                height /= scaleY;
              } else {
                height = targetTrans.height;
              }
            }
          }

          return {
            size: new Size(width, height),
            pos: v2(x, y)
          };
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ebbd0a3c59fd22425154c27954644ff229ba37dd.js.map