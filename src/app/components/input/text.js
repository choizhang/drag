/**
 * Created by choizhang on 16/6/1.
 */
import { baseExport, baseInputSetting } from '../base';

function defaultSetting(obj) {
    return baseInputSetting(obj);
}


export function text(data) {

    let setting = defaultSetting({data: data})
    let $html, require, other;

    //对是否必填进行初始化操作
    if (!setting.checkbox.isChecked) {
        //不是必填
        require = `style="visibility: hidden;"`;
    }

    $html = $(`
                    <div class="text-input sui-form-viewType-0" data="rank">
                        <label>
                            <span class="form-autoNum"></span>
                            <span class="form-required" ${require}>*</span>
                            <span class="title">${setting.input[0].text}</span>
                        </label>
                        <input type="text" placeholder="${setting.input[1].text}" disabled>
                    </div>
                `);

    setting = defaultSetting({data: data, dom: $html});

    other = {
        injectJs: () => {
            let js = `
                    <script>
                        $(function() {

                            console.log('我来自text组件的js执行')

                        })

                    </script>
                    `;
            return js
        }
    }

    return baseExport($html, setting, other);
}
