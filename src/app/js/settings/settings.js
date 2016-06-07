/**
 * Created by choizhang on 16/6/1.
 */


//import { Input } from './input';
//import { Select } from './select';
import { sortNumber } from '../sortNumber';


export class Settings {
    constructor(settings = {}) {
        this.settings = settings;


        this.$containner = $(this.settings.containner);
        this.$settringArea = this.$containner.find('.setting-area');

        this.$tabs = $('#tabs');
        this.$pannelId = $('#pannelId');

        this.init();
    }

    init() {
        this.$tabs.tabs({
            active: 0,
            disabled: [1]
        });

        this.globalSave();
        this.componentSave();
        this.componentReset();
        this.generatorNumber();
    }

    clearWidget() {
        this.$settringArea.html('');
    }

    initWidget(html) {
        this.$settringArea.append(html);
    }

    globalSave() {
        //$('#btn-global-save').on('click', function () {
        //    //背景颜色
        //    var bgColor = $('#bgColor').val();
        //    console.log(bgColor)
        //    $('.design-ui').css('backgroundColor', bgColor);
        //
        //})

        $('#bgColor').on('change', function() {
            let bgColor = $(this).val();
            $('.design-ui').css('backgroundColor', bgColor);
        })

        $('#setPadding').on('change mousemove', function() {
            let paddingValue = $(this).val();
            console.log(paddingValue)
            $('.sortable li').css('padding', `30px ${paddingValue}px`);
        })
    }

    componentSave() {
        let that = this;
        $('#btn-component-save').on('click', function () {

            var number = that.$pannelId.html();
            let $dom = $('.ui-state-default[data-pid="' + number + '"]');
            var setting = $dom.data('setting');

            if (setting) {
                //setting.select.checked = $('.layout').val();
                //setting.input.text = $('.title').val();

                $dom.trigger('save');
            }

        })
    }

    componentReset() {
        let that = this;
        $('#btn-component-reset').on('click', function () {

            var number = that.$pannelId.html();
            let $dom = $('.ui-state-default[data-pid="' + number + '"]');
            var setting = $dom.data('setting');

            if (setting) {
                $dom.trigger('reset');
            }

        })
    }

    generatorNumber() {
        let that = this;
        let $generatorNumber = $('#generatorNumber');
        $generatorNumber.on('click', function () {

            sortNumber.isGeneratorNumber = $generatorNumber.prop('checked');

            sortNumber.sort();
        })
    }

}
;
