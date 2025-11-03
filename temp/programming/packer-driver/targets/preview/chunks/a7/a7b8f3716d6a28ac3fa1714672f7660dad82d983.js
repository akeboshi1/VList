System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, random, VList, DynamicList, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Test;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfVList(extras) {
    _reporterNs.report("VList", "../core/VList", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDynamicList(extras) {
    _reporterNs.report("DynamicList", "./DynamicList", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
      random = _cc.random;
    }, function (_unresolved_2) {
      VList = _unresolved_2.VList;
    }, function (_unresolved_3) {
      DynamicList = _unresolved_3.DynamicList;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6fbf0arGUBIira9aTe7Dbi7", "Test", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'random']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Test", Test = (_dec = ccclass('Test'), _dec2 = property(_crd && DynamicList === void 0 ? (_reportPossibleCrUseOfDynamicList({
        error: Error()
      }), DynamicList) : DynamicList), _dec(_class = (_class2 = class Test extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "list", _descriptor, this);
        }

        start() {
          var testData = Array.from({
            length: 15
          }, (_, i) => {
            var cnt = Math.round(random() * 10 + 7);
            var height = 100 * Math.ceil(cnt / 3);
            var dataList = [];

            for (var _i = 0; _i < cnt; _i++) {
              dataList.push(_i + 1);
            }

            return {
              data: dataList,
              height
            };
          }); //数据传入格式：{
          //   height:number  该项高度
          //   data:any 该项数据
          // }[]

          this.list.setData({
            //数据准备，包括指定高度和数据
            dataList: testData,
            //每个列表项如何渲染
            itemRenderer: (node, data) => {
              node.getComponentInChildren(_crd && VList === void 0 ? (_reportPossibleCrUseOfVList({
                error: Error()
              }), VList) : VList).setData(data);
            },
            //对象初始化时调用，每个对象只会调用一次
            onInstantiate: node => node.getComponentInChildren(VList).init({
              onData(info) {
                info.get("_lbl", Label).string = info.data.toFixed();
              }

            })
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "list", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a7b8f3716d6a28ac3fa1714672f7660dad82d983.js.map