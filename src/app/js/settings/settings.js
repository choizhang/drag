/**
 * Created by choizhang on 16/6/1.
 */


import { Input } from './input';
import { Select } from './select';


export class Settings {
    constructor(settings = {}) {
        this.settings = settings;

        this.isGeneratorNumber = false;
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

            that.isGeneratorNumber = $generatorNumber.prop('checked');

            that.sortNumber();
        })
    }

    sortNumber() {
        let $autoNum = $('.form-autoNum');
        if(this.isGeneratorNumber){
            let $rank = $('[data="rank"]');
            $rank.each(function (index, val) {
                $(val).find('.number').html(`${index + 1}.`);
            })
            $autoNum.show();
        } else {
            $autoNum.hide();
        }

    }

}
;
