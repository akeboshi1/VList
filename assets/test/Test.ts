import { _decorator, Component, Label, random } from 'cc';
import { VList } from '../core/VList';
import { DynamicList } from './DynamicList';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    @property(DynamicList)
    list: DynamicList;
    start() {
        const testData = Array.from({ length: 15 }, (_, i) => {
            let cnt = Math.round(random() * 10 + 7);
            let height = 100 * Math.ceil(cnt / 3);
            let dataList: number[] = [];
            for (let i = 0; i < cnt; i++) {
                dataList.push(i + 1);
            }
            return {
                data: dataList,
                height
            }
        });

        //数据传入格式：{
        //   height:number  该项高度
        //   data:any 该项数据
        // }[]

        this.list.setData({
            //数据准备，包括指定高度和数据
            dataList: testData,

            //每个列表项如何渲染
            itemRenderer: (node, data) => {
                node.getComponentInChildren(VList).setData(data)
            },

            //对象初始化时调用，每个对象只会调用一次
            onInstantiate: (node) => node.getComponentInChildren(VList<number>).init({
                onData(info) {
                    info.get("_lbl", Label).string = info.data.toFixed();
                }
            })
        })
    }

}


