/**
 * Created by choizhang on 16/6/1.
 */

function defaultSetting(obj) {
    return {
        'select': {
            label: '水平位置',
            options: {
                items: [
                    {
                        value: 1,
                        text: '居左'
                    },
                    {
                        value: 2,
                        text: '居中'
                    },
                    {
                        value: 3,
                        text: '居右'
                    }
                ],
                checkedValue: 2
            },
            setDom: (setting) => {
                let newValue;
                if(typeof(setting) === 'object'){
                    newValue = setting.select.options.checkedValue;
                } else {
                    newValue = setting;
                }

                switch (newValue) {
                    case 1:
                        newValue = 'left';
                        break;
                    case 2:
                        newValue = 'center';
                        break;
                    case 3:
                        newValue = 'right';
                        break;
                }
                obj.dom.css('text-align', newValue);
            },
            setSetting: function() {
                let align = obj.dom.css('text-align');
                switch (align) {
                    case 'left':
                        align = 1;
                        break;
                    case 'center':
                        align = 2;
                        break;
                    case 'right':
                        align = 3;
                        break;
                }
                this.options.checkedValue = align;
            }
        },
        'input': {
            label: '标题',
            text: '我是分割线',
            setDom: (setting) => {
                let newValue;
                if(typeof(setting) === 'object'){
                    newValue = setting.input.text;
                } else {
                    newValue = setting;
                }
                obj.dom.find('span').html(newValue);
            },
            setSetting: function() {
                this.text = obj.dom.find('span').html();
            }
        }
    }
}



export function dividing(data) {

    //目前根本没有传参数的情况
    //let $html;
    ////todo 这块逻辑还要优化一下
    //if (setting) {
    //    $html = $(`
    //                <div class="dividing">
    //                    <hr>
    //                    <span>${setting.input.text}</span>
    //                </div>
    //            `);
    //} else {
    //    setting = defaultSetting();
    //    $html = $(`
    //                <div class="dividing">
    //                    <hr>
    //                    <span>${setting.input.text}</span>
    //                </div>
    //            `);
    //    setting = defaultSetting($html);
    //}

    let setting = defaultSetting({data: data})
    let $html, other;

    $html = $(`
                    <div class="dividing">
                        <hr>
                        <span>${setting.input.text}</span>
                    </div>
                `);

    setting = defaultSetting({data: data, dom: $html});

    return baseExport($html, setting, other);
}
