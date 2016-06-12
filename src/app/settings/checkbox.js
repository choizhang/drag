/**
 * Created by choizhang on 16/6/1.
 */
export function checkbox(data) {
    var tplCheckbox = `<div class="setting-component">
                         <div>${data.label}</div>
                         <label><input type="checkbox" ${data.isChecked ? 'checked' : ''}>${data.text}</label>
                    `;

    let $tplCheckbox = $(tplCheckbox);

    $tplCheckbox.find('input')
        .on('change', function() {
            let newValue = $(this).prop('checked');
            data.setDom( newValue );
        });

    return $tplCheckbox;
}
