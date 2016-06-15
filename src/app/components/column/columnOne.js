/**
 * Created by choizhang on 16/6/1.
 */

import { baseExport, baseInputSetting } from '../base';
import * as util from '../../util/util';

function defaultSetting(obj) {
    return {
        'input': {
            label: '从表标题:',
            text: obj.data && obj.data.label || '从表标题',
            setDom: (setting, value={}) => {
                let newValue = util.setDom(setting, value.text);
                obj.dom.find('.subtable-title').eq(0).html(newValue);
            },
            setSetting: function () {
                this.text = obj.dom.find('.subtable-title').html();
            }
        }
    }
}


export function columnOne(data) {
    let setting = defaultSetting({data: data})
    let $html, other;

    $html = $(`
                    <div class="column">
                        <h2 class="subtable-title">${setting.input.text}</h2>
                        <ul class="column-item column-item-one">
                        </ul>

                        <ul class="column-item">
                        </ul>
                    </div>
                `);

    setting = defaultSetting({data: data, dom: $html});

    return baseExport($html, setting, other);
}
