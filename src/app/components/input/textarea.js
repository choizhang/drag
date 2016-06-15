/**
 * Created by choizhang on 16/6/14.
 */

import { baseExport, baseInputSetting } from '../base';

function defaultSetting(obj) {
    obj.other = {
        'range': {
            label: '框高度',
            value: 50,
            max: 100,
            min: 50,
            setDom: (setting) => {
                let newValue;
                if (typeof(setting) === 'object') {
                    newValue = setting.range.value;
                } else {
                    newValue = setting;
                }

                obj.dom.find('textarea').css('height', newValue);
            },
            setSetting: () => {
                this.value = obj.dom.find('textarea').css('height');
            }
        }
    };
    return baseInputSetting(obj);
}


export function textarea(data) {

    let setting = defaultSetting({data: data})
    let $html, require, other;

    //对是否必填进行初始化操作1
    if (!setting.checkbox.isChecked) {
        //不是必填
        require = `style="visibility: hidden;"`;
    }

    $html = $(`
                    <div class="text-textarea sui-form-viewType-0" data="rank">
                        <label>
                            <span class="form-autoNum"></span>
                            <span class="form-required" ${require}>*</span>
                            <span class="title">${setting.input[0].text}</span>
                        </label>
                        <textarea disabled>${setting.input[1].text}</textarea>
                    </div>
                `);
    setting = defaultSetting({data: data, dom: $html});

    return baseExport($html, setting, other);
}
