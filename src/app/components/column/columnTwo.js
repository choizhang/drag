/**
 * Created by choizhang on 16/6/1.
 */

function defaultSetting(dom) {
    return {
        'range': {
            label: '左右比例',
            value: '250',
            max: 350,
            min: 150,
            setDom: (setting) => {
                let newValue;
                if(typeof(setting) === 'object'){
                    newValue = setting.input.text;
                } else {
                    newValue = setting;
                }
                dom.find('.column-item').eq(0).css('width', newValue);
            },
            setSetting: function() {
                this.text = dom.find('span').html();
            }
        }
    }
}


export function columnTwo(setting=defaultSetting()) {
    let $html;
    $html = $(`
                    <div class="column">
                        <ul class="column-item">
                        </ul>

                        <ul class="column-item">
                        </ul>
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
