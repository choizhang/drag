/**
 * Created by choizhang on 16/6/1.
 */
import { dividingHtml } from './dividing/dividing';
import { column } from './column/column';
import { input } from './input/input';
import { sortNumber } from '../sortNumber';

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
                helper: function() {
                    return that.buildComponent($(this).data('component'));
                },
                stop: function( event, ui ) {
                    //插件又添加了样式,我这再次清空
                    ui.helper.removeAttr('style');
                },
                connectToSortable: "#sortable, .column-item",
                //revert: true,
                //opacity: 0.5,
                cursor: 'move'
            }
        );
    }

    buildComponent(type) {
        switch (type) {
            //如果拖动过来的组件是分割线
            case 'dividing':
                var {$html, setting, save, reset, injectJs} = dividingHtml();
                break;
            case 'column':
                var {$html, setting, save, reset, injectJs} = column();
                break;
            case 'input':
                var {$html, setting, save, reset, injectJs} = input();
                break;
        }
        // 给加入的组件包裹公共html
        let $component = this.componentWrapper($html, save, reset).data('setting', setting);

        //如果是2列布局,就要给每一列增加拖动事件
        this.twoRow($component.find('.column-item'));

        this.injectJs(injectJs);

        sortNumber.sort();

        return $component;
    }

    /**
     * 将拖入的组件在画布中进行拖拽包裹
     * @param $html  组件的结构
     * @param save  组件的保存函数
     * @returns {*|jQuery}
     */
    componentWrapper($html, save, reset) {
        let that = this;
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
            that.initSetting(setting);
        });

        return $component;
    }

    twoRow(els) {
        if(!els) return;

        let that = this;

        console.log(els)
        els
            .droppable({
                //activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                accept: ":not(.ui-sortable-helper)",
                greedy: true,
                drop: function (event, ui) {
                    switch (ui.draggable.data('component')) {
                        //如果拖动过来的组件是分割线
                        case 'dividing':
                            var {$html, setting, save, reset, injectJs} = dividingHtml();
                            break;
                        case 'input':
                            var {$html, setting, save, reset, injectJs} = input();
                            break;

                    }

                    // 给加入的组件包裹公共html
                    let $component = that.componentWrapper($html, save, reset);
                    $component.appendTo(this).data('setting', setting);

                    console.log($component)

                    sortNumber.sort();

                }
            })
            .sortable({
                connectWith: ".column-item",
                placeholder: "portlet-placeholder ui-corner-all",
                deactivate: function( event, ui ) {
                    //排序停止的时候进行再次排序
                    sortNumber.sort();
                }
            });
    }

    injectJs(js) {
        js && $('body').append(js);
    }


};
