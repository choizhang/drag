/**
 * Created by choizhang on 16/6/1.
 */
export function radio(data) {
    var tplRadio = `<div class="setting-component">
                         <div>${data.label}</div>
                         <div class="checkbox-wrapper">
                    `;

    data.options.items.forEach(function (item) {
        if (item.value === data.options.checkedValue) {
            tplRadio += `<label><input type="radio" value="${item.value}" name="${data.options.name}" checked>${item.text}</label>`;
        } else {
            tplRadio += `<label><input type="radio" value="${item.value}" name="${data.options.name}">${item.text}</label>`;
        }

    })
    tplRadio += '</div></div>';

    let $tplRadio = $(tplRadio);

    $tplRadio.find('input')
        .on('change', function() {
            let newValue = $(this).val();
            data.setDom( parseInt(newValue) );
        });

    return $tplRadio;
}
