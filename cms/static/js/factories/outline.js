/*
ICONS: We're using this to alter overriding `CourseOutlinePage` with the custom one that included custom version
of `CustomCourseOutlineView` extended with `IconEditor`.
 */
define([
    'icons/js/views/pages/course_outline', 'js/models/xblock_outline_info'
], function(CourseOutlinePage, XBlockOutlineInfo) {
    'use strict';
    return function(XBlockOutlineInfoJson, initialStateJson) {
        var courseXBlock = new XBlockOutlineInfo(XBlockOutlineInfoJson, {parse: true}),
            view = new CourseOutlinePage({
                el: $('#content'),
                model: courseXBlock,
                initialState: initialStateJson
            });
        view.render();
    };
});
