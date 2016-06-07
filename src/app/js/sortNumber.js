/**
 * Created by choizhang on 16/6/1.
 */

class SortNumber {
    constructor() {
        this.isGeneratorNumber = false;

    }

    sort() {
        let $autoNum = $('.form-autoNum');
        if(this.isGeneratorNumber){
            let $rank = $('[data="rank"]');
            $rank.each(function (index, val) {
                $(val).find('.form-autoNum').html(`${index + 1}.`);
            })
            $autoNum.show();
        } else {
            $autoNum.hide();
        }
    }

}
let sortNumber = new SortNumber()

export { sortNumber };