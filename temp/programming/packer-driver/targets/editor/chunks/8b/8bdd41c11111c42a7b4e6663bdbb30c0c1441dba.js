System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Node, Prefab, ScrollView, Size, UITransform, v2, v3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, DynamicList;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      ScrollView = _cc.ScrollView;
      Size = _cc.Size;
      UITransform = _cc.UITransform;
      v2 = _cc.v2;
      v3 = _cc.v3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8966bcbZDVOm6NSAGL1LIcd", "DynamicList", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Node', 'Prefab', 'ScrollView', 'Size', 'UITransform', 'v2', 'v3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DynamicList", DynamicList = (_dec = ccclass('DynamicList'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property({
        displayName: "左侧留白"
      }), _dec7 = property({
        displayName: "上侧留白"
      }), _dec(_class = (_class2 = class DynamicList extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "itemPrefab", _descriptor, this);

          _initializerDefineProperty(this, "scrollView", _descriptor2, this);

          _initializerDefineProperty(this, "view", _descriptor3, this);

          _initializerDefineProperty(this, "content", _descriptor4, this);

          _initializerDefineProperty(this, "space", _descriptor5, this);

          _initializerDefineProperty(this, "paddingLeft", _descriptor6, this);

          _initializerDefineProperty(this, "paddingTop", _descriptor7, this);

          this.renderInfos = [];
          this.itemPool = [];
          this.renderer = void 0;
        }

        start() {
          this.scrollView.on(ScrollView.EventType.SCROLLING, this.refreshView, this);
        }

        setData(args) {
          this.renderInfos.forEach(e => {
            this.itemPool.push(e.item);
            e.item.active = false;
          });
          this.content.getComponent(UITransform).setAnchorPoint(v2(0, 1));
          this.renderInfos = [];
          let totalHeight = this.paddingTop;
          this.renderer = args.itemRenderer;
          args.dataList.forEach(e => {
            let item = null;

            if (this.itemPool.length > 0) {
              item = this.itemPool.pop();
            } else {
              item = instantiate(this.itemPrefab);
              args.onInstantiate(item);
            }

            item.parent = this.content;
            item.getComponent(UITransform).setAnchorPoint(0, 1);
            item.position = v3(0, -totalHeight, 0);
            totalHeight += e.height + this.space;
            this.renderInfos.push({
              height: e.height,
              item,
              data: e.data,
              isVisible: false
            });
          });
          let contentTrans = this.content.getComponent(UITransform);
          contentTrans.setContentSize(new Size(contentTrans.width, totalHeight));
          this.refreshView();
        }

        refreshView() {
          let contentPos = this.content.position;
          let viewSize = this.view.getComponent(UITransform).contentSize;
          if (this.renderInfos.length === 0) return;
          const viewTopY = this.view.position.y + viewSize.height / 2;
          const viewBottomY = this.view.position.y - viewSize.height / 2;
          let currentY = -this.paddingTop;

          for (let i = 0; i < this.renderInfos.length; i++) {
            const info = this.renderInfos[i];
            const itemHeight = info.height;
            const item = info.item;
            let dirty = false;
            const itemTopY = currentY + contentPos.y;
            const itemBottomY = currentY - itemHeight + contentPos.y;
            const isInView = itemBottomY < viewTopY + this.space && itemTopY > viewBottomY - this.space;
            if (!info.isVisible && isInView) dirty = true;
            item.active = isInView;
            info.isVisible = isInView;

            if (isInView) {
              item.setPosition(-viewSize.width / 2 + this.paddingLeft, currentY);
            }

            if (dirty) this.renderer(item, info.data);
            currentY -= itemHeight + this.space;
          }
        }

        clear() {
          this.renderInfos.forEach(e => {
            e.item.destroy();
          });
          this.renderInfos = [];
          this.itemPool.forEach(e => e.destroy());
          this.itemPool = [];
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "view", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "space", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "paddingLeft", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "paddingTop", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8bdd41c11111c42a7b4e6663bdbb30c0c1441dba.js.map