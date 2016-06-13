/**
 * Created by choizhang on 16/6/1.
 */
import * as common from '../common/common';
import * as tpl from './tpl';


export class Components {
    constructor(settings = {}) {
        this.settings = settings;

        this.componentId = 1;

        this.$containner = $(this.settings.containner);

        this.$componentsUl = $("#draggable");

        this.init();
    }

    init() {
        let that = this;
        this.$componentsUl.find('li').draggable(
            {
                appendTo: "body",
                //helper: "clone",
                helper: function () {
                    return that.buildComponent($(this).data('component'));
                },
                stop: function (event, ui) {
                    //拖拽完成后的回调事件
                    //插件又添加了我不想要的样式,我这再次清空
                    ui.helper.removeAttr('style');
                    common.showGrid.action(ui.helper);
                },
                connectToSortable: "#sortable, .column-item",
                //revert: true,
                //opacity: 0.5,
                cursor: 'move'
            }
        );

        this.microForm();

        $('.edit-left h2').on('click', this.getSaveedHtml)
    }

    buildComponent(type) {

        // 给加入的组件包裹公共html
        let $component = this.factory(type);

        //如果是从表布局,就要给每一列增加拖动事件
        this.twoRow($component.find('.column-item'));

        return $component;
    }

    /**
     * 将拖入的组件在画布中进行拖拽包裹
     * @param $html  组件的结构
     * @param save  组件的保存函数
     * @returns {*|jQuery}
     */
    componentWrapper($html, save, reset) {
        let $component = $(`<li class="ui-state-default" data-pid="${this.componentId++} ">
                    <a class="del">&times;</a>
                </li>`).append($html);

        //每个组件监听保存事件,将配置保存到data里面
        $component.on('save', () => {
            let setting = save();
            $component.data('setting', setting);
        });

        //每个组件监听保存事件,将配置保存到data里面
        $component.on('reset', (e) => {
            //不然父元素也会接受这个事件
            e.stopPropagation()

            let setting = $component.data('setting');
            reset(setting);
            common.initSettings.init(setting);
        });

        return $component;
    }

    factory(type, data) {
        let {$html, setting, save, reset, injectJs} = tpl[type](data);

        // 给加入的组件包裹公共html
        let $component = this.componentWrapper($html, save, reset).data('setting', setting);

        this.injectJs(injectJs);

        return $component;
    }

    twoRow(els) {
        if (!els) return;

        let that = this;

        els
            .droppable({
                //activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                accept: ":not(.ui-sortable-helper)",
                greedy: true,
                drop: function (event, ui) {

                    let type = ui.draggable.data('component');

                    let $component = that.factory(type);

                    $component.appendTo(this);

                    //common.sortNumber.sort();

                }
            })
            .sortable({
                connectWith: ".column-item",
                placeholder: "portlet-placeholder ui-corner-all",
                deactivate: function (event, ui) {
                    //排序停止的时候进行再次排序
                    common.sortNumber.sort();
                }
            });
    }

    injectJs(js) {
        js && $('body').append(js);
    }


    microForm() {
        let that = this;
        let str = `
            <div seeTitleStyle="color:red;" class="sui-form-ctrl sui-form-viewType-0 sui-form-title-font-size-12 sui-required" desc="这个是描述1">
                <div v-sui-input2="s3scope.data.master['field0001'].value" v-bind:scope="{model:s3scope.data.master['field0001'], fieldInfo:s3scope.metadata.fieldInfo['field0001']}"></div>
            </div><div seeTitleStyle="color:red;" class="sui-form-ctrl sui-form-viewType-0 sui-form-title-font-size-12 sui-required" desc="这个是描述2">
                <div v-sui-input2="s3scope.data.master['field0002'].value" v-bind:scope="{model:s3scope.data.master['field0002'], fieldInfo:s3scope.metadata.fieldInfo['field0002']}"></div>
            </div>
        `;

        let allData = this.getTestData();

        //这个是直接将模板转换成html
        //$(str).each(function(index, value){
        //    let num = $(value).children().eq(0).attr('v-bind:scope');
        //    num = num.match(/field\d+/)[0];
        //    let result = cmp.sui.htmlBuilder({value: allData.data.master[num].value, desc: '22', model: allData.data.master[num], fieldInfo: allData.metadata.fieldInfo[num]});
        //
        //    let $component = that.componentWrapper(result);
        //    $component.append(value);
        //
        //    $('#sortable').append($component);
        //})


        $(str).each(function (index, value) {

            //取出组件跟数据绑定的key,比如field0001
            let num = $(value).html().match(/field\d+/)[0];
            //从所有数据中取出之前表单生成的值,是可以修改的值
            let data = {
                label: allData.metadata.fieldInfo[num].display,
                value: allData.data.master[num].value,
                require: allData.data.master[num].notNull
            }

            //todo 我要知道组件的类型

            let $component = that.factory('input', data);

            $component.append(value);
            $('#sortable').append($component);
        })

    }

    /**
     * 获取所有的原始模板并将它们目前的html返回回来
     */
    getSaveedHtml() {
        let str = '';
        $('.sui-form-ctrl').each(function (index, value) {
            str += value.outerHTML
        })

        console.log(str);
    }


    /**
     * 获取数据,目前是假数据
     */
    getTestData() {
        var data = {
            "metadata": {
                "tableName": "form001",
                "description": "OKR全年绩效考核表",
                "fieldInfo": {
                    "field0001": {
                        "fieldName": "field0001",
                        "inCalc": "true",
                        "calc": {"back": "true"},
                        "inCondition": "false",
                        "enumId": "0",
                        "value4Display": "2",
                        "realInputType": "text",
                        "auth": "browse",
                        "enumParams": "0_false_0_",
                        "display": "姓名",
                        "finalFieldType": "VARCHAR",
                        "value4Db": "2",
                        "value4Bussiness": "2",
                        "name": "field0010",
                        "ownerTableName": "formmain_0036",
                        "inputType": "text",
                        "enumLevel": "0",
                        "formatType": "",
                        "fieldType": "VARCHAR",
                        "digitNum": "0",
                        "fieldLength": "255"
                    },
                    "field0002": {
                        "fieldName": "field0002",
                        "inCalc": "false",
                        "calc": {"back": "true"},
                        "inCondition": "false",
                        "enumId": "0",
                        "value4Display": "3",
                        "realInputType": "text",
                        "auth": "browse",
                        "enumParams": "0_false_0_",
                        "display": "部门",
                        "finalFieldType": "VARCHAR",
                        "value4Db": "3",
                        "value4Bussiness": "3",
                        "name": "field0011",
                        "ownerTableName": "formmain_0036",
                        "inputType": "account",
                        "enumLevel": "0",
                        "formatType": "",
                        "fieldType": "VARCHAR",
                        "digitNum": "0",
                        "fieldLength": "255"
                    }
                }
            },
            "data": {
                //主表的数据
                "master": {
                    "__state": "modify",
                    "field0001": {"value": "杨超1", "display": "杨超1", "auth": 'edit', notNull: true},
                    "field0002": {"value": "杨超2", "display": "杨超2", "auth": 'edit'}
                }
            }
        };
        return data;
    }


}
;
