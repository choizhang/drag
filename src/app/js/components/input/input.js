/**
 * Created by choizhang on 16/6/1.
 */

function defaultSetting(dom) {
    return {
        'input': {
            label: '姓名:',
            text: '请输入姓名',
            setDom: (setting) => {
                let newValue;
                if(typeof(setting) === 'object'){
                    newValue = setting.input.text;
                } else {
                    newValue = setting;
                }
                dom.find('input').val(newValue);
            },
            setSetting: function() {
                this.text = dom.find('input').val();
            }
        },
        'checkbox': {
            label: '校验:',
            text: '此项必填',
            isChecked: false,
            setDom: (setting) => {
                let newValue;
                if(typeof(setting) === 'object'){
                    newValue = setting.checkbox.isChecked;
                } else {
                    newValue = setting;
                }
                if(newValue){
                    dom.find('.form-required').show();
                } else {
                    dom.find('.form-required').hide();
                }

            },
            setSetting: function() {
                this.isChecked = dom.find('.form-required').is(":visible");
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
                if(typeof(setting) === 'object'){
                    newValue = setting.radio.options.checkedValue;
                } else {
                    newValue = setting;
                }

                let classStr = dom.attr('class');

                classStr = classStr.replace(/Type-\d/, 'Type-' + (newValue - 1) );

                dom.attr('class', classStr);

            },
            setSetting: function() {
                let checkedValue;
                let css = dom.attr('class');

                if(/Type-0/.test(css)){
                    checkedValue = 1;
                } else if(/Type-1/.test(css)){
                    checkedValue = 2;
                } else if(/Type-2/.test(css)){
                    checkedValue = 3;
                }

                this.options.checkedValue = checkedValue;
            }
        }
    }
}


export function input(setting=defaultSetting()) {
    let $html;
    $html = $(`
                    <div class="text-input sui-form-viewType-0" data="rank">
                        <label>
                            <span class="form-required">*</span>
                            <span class="form-autoNum">1. </span>
                            ${setting.input.label}
                        </label>
                        <input type="text" value="${setting.input.text}" disabled>
                    </div>
                `);
    setting = defaultSetting($html);

    return {
        $html: $html,
        setting: setting,
        save: () => {
            for(let key in setting){
                setting[key].setSetting();
            }

            return setting;

        },
        reset: (oldSetting) => {

            for(let key in setting){
                setting[key].setDom(oldSetting);
            }
        },
        injectJs: () => {
            let js = `
                    <script>
                        $(function() {



                        })

                    </script>
                    `;
            return js
        }
    }
}
