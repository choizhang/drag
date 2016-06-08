/**
 * Created by choizhang on 16/6/1.
 */

export function input(data) {
    let $tplInput = $(`
        <div class="setting-component">
            <div>${data.label}</div>
            <input type="text" class="title" value="${data.text}">
        </div>
    `);

    $tplInput.find('input')
        .on('keyup', function() {
            let newValue = $(this).val();
            data.setDom(newValue);
        });

    return $tplInput;
}
