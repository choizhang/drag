/**
 * Created by choizhang on 16/6/1.
 */

export class Input {
    //{
    //    label: 'aa',
    //    changeFunc: function() {}
    //}
    constructor(settings = {}) {
        this.settings = settings;

        this.init();
    }

    init() {
        var that = this;
        this.$dom = $(`
            <div>
                <label>${this.settings.label}</label>
                <input type="text">
            </div>
        `);
        this.$dom.find('input')
            .on('change', function() {
                let newValue = $(this).val();
                that.settings.changeFunc(newValue);
            });
    }

}