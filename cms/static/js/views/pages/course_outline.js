/*
ICONS: We're using this for overriding `CourseOutlinePage` with the custom version of `CustomCourseOutlineView`
extended with `IconEditor`.
 */
define([
    'js/views/pages/course_outline', 'icons/js/views/course_outline'
], function(CourseOutlinePage, CustomCourseOutlineView) {
    'use strict';
    return CourseOutlinePage.extend({
        outlineViewClass: CustomCourseOutlineView
    });
});
