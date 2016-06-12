/**
 * Created by choizhang on 16/6/1.
 */


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

        this.componentSave();
        this.componentReset();
    }

    /**
     * 组件保存设置.
     * 会触发该组件的每一个配置都重新保存
     */
    componentSave() {
        let that = this;
        $('#btn-component-save').on('click', function () {

            //获取当前组件的id号
            let number = that.$pannelId.html();
            let $dom = $('.ui-state-default[data-pid="' + number + '"]');
            var setting = $dom.data('setting');

            if (setting) {
                $dom.trigger('save');
            }

        })
    }

    /**
     * 组件设置重置
     */
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

};
