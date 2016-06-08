/**
 * Created by choizhang on 16/6/1.
 */

import { Settings } from '../settings/settings';
import { Components } from '../components/components';
import * as common from '../common/common';


export class Canvas {
    constructor(settings = {}) {
        this.settings = settings;

        this.$containner = $(this.settings.containner);
        this.$canvas = $('#sortable');
        this.$pagePreview = $('#pagePreview');


        this.init();
    }

    init() {
        this.initCanvas();

        //初始化组件模块
        this.components = new Components(
            {
                containner: '#editLeft'
            }
        );

        //初始化设置模块
        this.settings = new Settings(
            {
                containner: '#editRight'
            }
        );
    }

    initCanvas() {
        this.$canvas.disableSelection();
        this.liBindClick();
        this.delBindClick();
        this.drop();
    }

    liBindClick() {
        var that = this;
        this.$canvas
            .on('click', 'li', function (e) {
                const $this = $(this);

                //2列布局的时候存在li嵌套了
                e.stopPropagation();

                if ($this.hasClass('active')) {
                    //取消组件当前选中态
                    that.$canvas.find('.active').removeClass('active');

                    //把组件设置禁用,激活全局设置
                    that.settings.$tabs.tabs("disable", 1);
                    that.settings.$tabs.tabs("option", "active", 0);

                } else {
                    console.log('dd')
                    //将上一个的修改自动保存
                    $('#btn-component-save').trigger('click');
                    //其中一个组件已经被选中
                    that.$canvas.find('.active').removeClass('active');

                    $this.addClass('active');

                    that.settings.$pannelId.html($this.data('pid'));


                    //根据数据初始化组件的设置
                    let setting = $this.data('setting');
                    common.initSettings.init(setting);

                    //把组件设置激活并高亮
                    that.settings.$tabs.tabs("enable", 1);
                    that.settings.$tabs.tabs("option", "active", 1);
                }
            })
    }

    delBindClick() {
        //删除按钮,将组件从画布中移除
        this.$canvas.on('click', '.del', function (e) {
            //将整个item去掉
            $(this).closest('li').remove();
            e.stopPropagation()
        })
    }

    drop() {
        let that = this;
        this.$canvas
            .sortable(
                {
                    items: "li",
                    cursor: "move",
                    sort: function () {
                        // gets added unintentionally by droppable interacting with sortable
                        // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
                        //$(this).removeClass("ui-state-default");
                    },
                    //placeholder: 'block-placeholder',
                    update: function (event, ui) {
                        console.log(ui)

                        common.sortNumber.sort();

                    },
                    deactivate: function( event, ui ) {
                        console.log(that.components.isGeneratorNumber)
                        //排序停止的时候进行再次排序
                        common.sortNumber.sort();
                    }
                }
            );
    }

    /**
     * 预览功能
     */
    pagePreview() {
        let that = this;
        this.$pagePreview.on('click', function() {
            //that.$canvas
        })
    }

};
