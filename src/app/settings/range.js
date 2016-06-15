/**
 * Created by choizhang on 16/6/1.
 */

export function range(data) {
    let $range = $(`
        <div class="setting-component">
            <div>${data.label}</div>
            <input type="range" max="${data.max}" min="${data.min}" value="${data.value}" step="${data.step || 1}">
        </div>
    `);

    $range.find('input')
        .on('change mousemove', function() {
            let newValue = $(this).val();
            data.setDom(newValue);
        });

    return $range;
}
