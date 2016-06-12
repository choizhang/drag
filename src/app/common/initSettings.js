/**
 * Created by choizhang on 16/6/1.
 */

import * as tpl from '../settings/tpl';

class InitSettings {
    constructor() {
        this.$settringArea = $('.setting-area');
    }

    init(setting={}) {
        this.clear();
        this.generator(setting);
    }

    generator(setting) {
        for (let key in setting) {

            let dom;
            let cps = setting[key];
            if(Array.isArray(cps)){
                cps.forEach((value) => {
                    dom = tpl[key](value);

                    this.$settringArea.append(dom);
                })
            } else {
                dom = tpl[key](cps);
            }


            //生成了一个组件就塞到设置面板里面,并且这个生成的组件是绑定了事件的
            this.$settringArea.append(dom);
        }
    }

    clear() {
        this.$settringArea.html('');
    }

}
let initSettings = new InitSettings()

export { initSettings };