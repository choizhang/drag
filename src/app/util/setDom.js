/**
 * Created by choizhang on 16/6/1.
 */

export function setDom(setting, value) {
    let newValue;
    if (typeof(setting) === 'object') {
        newValue = value;
    } else {
        newValue = setting;
    }

    return newValue;
}