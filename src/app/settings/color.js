/**
 * Created by choizhang on 16/6/1.
 */

export function color(data) {
    let $tplColor = $(`
        <div class="setting-component">
            <label>${data.label}: <input type="color" id="bgColor" class="color" list="layerBackgroundColor_list"/></label>
        </div>
    `);

    $tplColor.find('input')
        .on('change', function() {
            let newValue = $(this).val();
            data.setDom(newValue);
        });

    return $tplColor;
}
