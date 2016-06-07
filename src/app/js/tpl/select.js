/**
 * Created by choizhang on 16/6/1.
 */
export function select(data) {
    var tplSelect = `<div class="setting-component">
                         <div>${data.label}</div>
                         <select class="layout">`;

    data.options.items.forEach(function (item) {
        if (item.value === data.options.checkedValue) {
            tplSelect += `<option value="${item.value}" selected>${item.text}</option>`;
        } else {
            tplSelect += `<option value="${item.value}">${item.text}</option>`;
        }

    })
    tplSelect += '</select></div>';

    let $tplSelect = $(tplSelect);

    $tplSelect.find('select')
        .on('change', function() {
            let newValue = $(this).val();
            data.setDom( parseInt(newValue) );
        });

    return $tplSelect;
}
