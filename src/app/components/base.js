/**
 * Created by choizhang on 16/6/14.
 */

import * as util from '../util/util';

export function baseExport($html, setting, other={}) {
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
                        value.setDom(oldSetting);
                    })
                } else {
                    cps.setDom(oldSetting);
                }
            }
        }
    }

    return Object.assign({}, base, other);
}

export function baseInputSetting(obj, title, placeholder) {
    const base = {
        'input': [
            {
                label: '标题:',
                text: obj.data && obj.data.label || title,
                setDom: (setting) => {
                    let newValue;
                    if (typeof(setting) === 'object') {
                        newValue = setting.input[0].text;
                    } else {
                        newValue = setting;
                    }
                    obj.dom.find('.title').html(newValue);
                },
                setSetting: function () {
                    this.text = obj.dom.find('.title').html();
                }
            },
            {
                label: '提示语:',
                text: obj.data && obj.data.placeholder || placeholder,
                setDom: (setting) => {
                    let newValue;
                    if (typeof(setting) === 'object') {
                        newValue = setting.input[1].text;
                    } else {
                        newValue = setting;
                    }
                    obj.dom.find('input').attr('placeholder', newValue);
                },
                setSetting: function () {
                    this.text = obj.dom.find('input').attr('placeholder');
                }
            }
        ],
        'checkbox': {
            label: '校验:',
            text: '此项必填',
            isChecked: obj.data && obj.data.require || false,
            setDom: (setting) => {
                let newValue;
                if (typeof(setting) === 'object') {
                    newValue = setting.checkbox.isChecked;
                } else {
                    newValue = setting;
                }
                if (newValue) {
                    obj.dom.find('.form-required').css({'visibility': 'visible'});
                } else {
                    obj.dom.find('.form-required').css({'visibility': 'hidden'});
                }

            },
            setSetting: function () {
                this.isChecked = obj.dom.find('.form-required').is(":visible");
            }
        },
        'color': {
            label: '标题颜色',
            value: '',
            setDom: (setting) => {
                let newValue;
                if (typeof(setting) === 'object') {
                    newValue = setting.color.value;;
                } else {
                    newValue = setting;
                }

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
            setDom: (setting) => {
                let newValue;
                if (typeof(setting) === 'object') {
                    newValue = setting.radio.options.checkedValue;
                } else {
                    newValue = setting;
                }

                let classStr = obj.dom.attr('class');

                classStr = classStr.replace(/Type-\d/, 'Type-' + (newValue - 1));

                obj.dom.attr('class', classStr);

                //将旁边的原始模板也做同样的修改
                let tdom = obj.dom.next()

                classStr = tdom.attr('class');

                classStr = classStr.replace(/Type-\d/, 'Type-' + (newValue - 1));

                tdom.attr('class', classStr);

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

    return base;
}