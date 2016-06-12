/**
 * Created by choizhang on 16/6/1.
 */

function defaultSetting(dom) {
    return {

    }
}


export function columnOne(setting=defaultSetting()) {
    let $html;
    $html = $(`
                    <div class="column">
                        <ul class="column-item column-item-one">
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
