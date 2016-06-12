/**
 * Created by choizhang on 16/6/1.
 */

import * as tpl from '../settings/tpl';
import * as common from './common';

/**
 * 根据配置生成右边的设置菜单面板
 */
class InitSettings {
    constructor() {
        this.$settringArea = $('.setting-area');
        this.$globalSetting = $('#global-setting-area');


        let setting = {
            'color': {
                label: '背景颜色',
                value: '#fff',
                setDom: (newValue) => {
                    $('.design-ui').css('backgroundColor', newValue);
                }
            },
            'range': [
                {
                    label: '左右间距',
                    value: 10,
                    max: 30,
                    min: 0,
                    setDom: (newValue) => {
                        $('.sortable li').css('padding-left', `${newValue}px`);
                        $('.sortable li').css('padding-right', `${newValue}px`);
                    }
                },
                {
                    label: '垂直间距',
                    value: 30,
                    max: 30,
                    min: 0,
                    setDom: (newValue) => {
                        $('.sortable li').css('padding-top', `${newValue}px`);
                        $('.sortable li').css('padding-bottom', `${newValue}px`);
                    }
                }
            ],
            'checkbox': [
                {
                    label: '',
                    text: '自动生成字段编号:',
                    isChecked: false,
                    setDom: (newValue) => {
                        common.sortNumber.isGeneratorNumber = newValue;
                        common.sortNumber.sort();
                    }
                },
                {
                    label: '',
                    text: '取消组件边框:',
                    isChecked: false,
                    setDom: (newValue) => {
                        let $components = $('.ui-state-default');
                        common.showGrid.action($components, newValue);
                    }
                }
            ]
        }
        this.initGlobal(setting);
    }

    init(setting={}) {
        this.clear();
        this.generator(setting, this.$settringArea);
    }

    initGlobal(setting) {
        this.generator(setting, this.$globalSetting);
    }

    generator(setting, target) {
        for (let key in setting) {

            let dom;
            let cps = setting[key];
            if(Array.isArray(cps)){
                cps.forEach((value) => {
                    dom = tpl[key](value);

                    target.append(dom);
                })
            } else {
                dom = tpl[key](cps);
            }


            //生成了一个组件就塞到设置面板里面,并且这个生成的组件是绑定了事件的
            target.append(dom);
        }
    }

    clear() {
        this.$settringArea.html('');
    }

}
let initSettings = new InitSettings()

export { initSettings };