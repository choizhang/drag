/**
 * Created by choizhang on 16/6/14.
 */

import * as util from '../util/util';

export function baseExport($html, setting, other = {}) {
    const base = {
        $html: $html,
        setting: setting,
        save: () => {
            for (let key in setting) {
                let cps = setting[key];

                if (Array.isArray(cps)) {
                    cps.forEach((value) => {
                        value.setSetting();
                    })
                } else {
                    cps.setSetting();
                }
            }

            return setting;

        },
        reset: (oldSetting) => {

            for (let key in setting) {
                let cps = setting[key];

                if (Array.isArray(cps)) {
                    cps.forEach((value) => {
                        value.setDom(oldSetting, value);
                    })
                } else {
                    cps.setDom(oldSetting, cps);
                }
            }
        }
    }

    return Object.assign({}, base, other);
}

export function baseInputSetting(obj) {
    const base = {
        'input': [
            {
                label: '标题:',
                text: obj.data && obj.data.label || '标题',
                setDom: (setting, value={}) => {
                    let newValue = util.setDom(setting, value.text);
                    obj.dom.find('.title').html(newValue);
                },
                setSetting: function () {
                    this.text = obj.dom.find('.title').html();
                }
            },
            {
                label: '提示语:',
                text: obj.data && obj.data.placeholder || '请输入',
                //setDom: (setting, value) => {
                //    let newValue;
                //    if (typeof(setting) === 'object') {
                //        newValue = setting.input[1].text;
                //
                //    } else {
                //        newValue = setting;
                //    }
                //    obj.dom.find('input').attr('placeholder', newValue);
                //},
                //上面这种写法太臃肿而且也是hard code,不好公用
                setDom: (setting, value={}) => {
                    let newValue = util.setDom(setting, value.text);
                    obj.dom.find('input').attr('placeholder', newValue);
                },
                //这里还不能使用es6的写法,因为是jquery封装的
                setSetting: function () {
                    let placeholder = obj.dom.find('input').attr('placeholder');
                    //有textarea的情况,所以如果没有placeholder就不设置了
                    if (placeholder) {
                        this.text = placeholder;
                    }
                }
            }
        ],
        'checkbox': {
            label: '校验:',
            text: '此项必填',
            isChecked: obj.data && obj.data.require || false,
            setDom: (setting, value={}) => {
                let newValue = util.setDom(setting, value.isChecked);
                if (newValue) {
                    obj.dom.find('.form-required').css({'visibility': 'visible'});
                } else {
                    obj.dom.find('.form-required').css({'visibility': 'hidden'});
                }
            },
            setSetting: function () {
                //is(:visible)对visibility是无效的
                this.isChecked = obj.dom.find('.form-required').css('visibility') === 'visible' ? true : false;
            }
        },
        'color': {
            label: '标题颜色',
            value: '',
            setDom: (setting, value={}) => {
                let newValue = util.setDom(setting, value.value);
                obj.dom.find('.title').css('color', newValue);
                let tdom = obj.dom.next();
                tdom.attr('seetitlestyle', `color: ${newValue}`);
            },
            setSetting: function () {
                this.value = util.rgb2hex(obj.dom.find('.title').css('color'));
            }
        },
        'radio': {
            label: '布局:',
            options: {
                items: [
                    {
                        value: 1,
                        text: '并列'
                    },
                    {
                        value: 2,
                        text: '换行'
                    },
                    {
                        value: 3,
                        text: '隐藏标题'
                    }
                ],
                name: 'layout',
                checkedValue: 1
            },
            setDom: (setting, value={}) => {
                let setValue = value.options ? value.options.checkedValue : undefined;
                let newValue = util.setDom(setting, setValue);
                let classStr = obj.dom.attr('class');

                classStr = classStr.replace(/Type-\d/, 'Type-' + (newValue - 1));

                obj.dom.attr('class', classStr);

                //将旁边的原始模板也做同样的修改
                let tdom = obj.dom.next();

                if(tdom){
                    //如果是拖动进来的就不会有兄弟节点
                    classStr = tdom.attr('class');

                    classStr = classStr.replace(/Type-\d/, 'Type-' + (newValue - 1));

                    tdom.attr('class', classStr);
                }
            },
            setSetting: function () {
                let checkedValue;
                let css = obj.dom.attr('class');

                if (/Type-0/.test(css)) {
                    checkedValue = 1;
                } else if (/Type-1/.test(css)) {
                    checkedValue = 2;
                } else if (/Type-2/.test(css)) {
                    checkedValue = 3;
                }

                this.options.checkedValue = checkedValue;
            }
        }
    }

    return Object.assign({}, base, obj.other);
}