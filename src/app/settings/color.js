/**
 * Created by choizhang on 16/6/1.
 */

export function color(data) {
    // 因为颜色最初的值没法固定,所以现场去取
    if(!data.value){
        data.setSetting();
    }

    let $tplColor = $(`
        <div class="setting-component">
            <label>${data.label}: <input type="color" id="bgColor" value="${data.value}" class="color" list="layerBackgroundColor_list"/></label>
        </div>
    `);

    $tplColor.find('input')
        .on('change', function() {
            let newValue = $(this).val();
            data.setDom(newValue);
        });

    return $tplColor;
}
