/**
 * @file 矩形转换成轮廓
 * @author mengke01(kekee000@gmail.com)
 */

/**
 * 矩形转换成轮廓
 *
 * @param {number} x 左上角x
 * @param {number} y 左上角y
 * @param {number} width 宽度
 * @param {number} height 高度
 * @return {Array} 轮廓数组
 */
export default function rect2contour(x, y, width, height) {
    x = +x;
    y = +y;
    width = +width;
    height = +height;

    return [
        {
            x,
            y,
            onCurve: true
        },
        {
            x: x + width,
            y,
            onCurve: true
        },
        {
            x: x + width,
            y: y + height,
            onCurve: true
        },
        {
            x,
            y: y + height,
            onCurve: true
        }
    ];
}
