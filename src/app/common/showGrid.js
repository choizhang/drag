/**
 * Created by choizhang on 16/6/1.
 */

class ShowGrid {
    constructor() {
        this.hideGrid = false;
    }

    action($components, status=this.hideGrid) {
        this.hideGrid = status;

        if(this.hideGrid){
            //取消边框
            //addClass可解决优先级问题
            $components.addClass('no-border');
        } else {
            //显示边框
            $components.removeClass('no-border');
        }
    }

}
let showGrid = new ShowGrid()

export { showGrid };