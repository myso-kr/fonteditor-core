/**
 * @file ttf复合字形转简单字形
 * @author mengke01(kekee000@gmail.com)
 */


define(
    function (require) {

        var transformGlyfContours = require('./transformGlyfContours');

        /**
         * 复合字形转简单字形
         *
         * @param  {Object} glyf glyf对象
         * @param  {Array} contours 轮廓数组
         * @return {Object} 转换后对象
         */
        function compound2simple(glyf, contours) {
            glyf.contours = contours;
            delete glyf.compound;
            delete glyf.glyfs;
            // 这里hinting信息会失效，删除hinting信息
            delete glyf.instructions;
            return glyf;
        }


        /**
         * ttf复合字形转简单字形
         *
         * @param  {Object|number} glyf glyf对象或者glyf索引
         * @param  {Object} ttf ttfObject对象
         * @param  {boolean} recrusive 是否递归的进行转换，如果复合字形为嵌套字形，则转换每一个复合字形
         * @return {Object} 转换后的对象
         */
        function compound2simpleglyf(glyf, ttf, recrusive) {

            var glyfIndex;
            // 兼容索引和对象传入
            if (typeof glyf === 'number') {
                glyfIndex = glyf;
                glyf = ttf.glyf[glyfIndex];
            }
            else {
                glyfIndex = ttf.glyf.indexOf(glyf);
                if (-1 === glyfIndex) {
                    return glyf;
                }
            }

            if (!glyf.compound || !glyf.glyfs) {
                return glyf;
            }

            var contoursList = {};
            transformGlyfContours(glyf, glyfIndex, ttf, contoursList);

            if (recrusive) {
                Object.keys(contoursList).forEach(function (index) {
                    compound2simple(ttf.glyf[index], contoursList[index]);
                });
            }
            else {
                compound2simple(glyf, contoursList[glyfIndex]);
            }

            return glyf;
        }

        return compound2simpleglyf;
    }
);
