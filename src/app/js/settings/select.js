/**
 * Created by choizhang on 16/6/1.
 */

export class Select {
    //{
    //    label: 'aa',
    //    options: [
    //         {
    //          value: 1,
    //          text: '居左'
    //         },
    //         {
    //          value: 2,
    //          text: '居中'
    //         }
    //    ]
    //    changeFunc: function() {}
    //}
    constructor(settings = {}) {
        this.settings = settings;

        this.init();
    }

    init() {
        let that = this;

        let html = '';
        this.settings.options.forEach((option) => {
            html += `<option value="${option.value}">${option.text}</option>`;
        });

        this.$dom = $(`
            <div>
                <label>${this.settings.label}</label>
                <select id="layout">
                    ${html}
                </select>
            </div>
        `);

        this.$dom.find('select')
            .on('change', function() {
                let newValue = $(this).val();
                that.settings.changeFunc(newValue);
            });
    }

}