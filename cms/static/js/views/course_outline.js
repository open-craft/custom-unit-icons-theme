/*
ICONS: This overrides `js/views/course_outline` and injects `IconEditor` modal into new `.customize-icon-button` button.
 */
define(['js/views/course_outline', 'js/views/baseview', 'edx-ui-toolkit/js/utils/html-utils',
    'js/views/modals/course_outline_modals'
], function(
    CourseOutlineView, BaseView, HtmlUtils, CourseOutlineModalsFactory
) {
    'use strict';
    var IconEditor = BaseView.extend({
        tagName: 'section',
        templateName: 'icon-editor',

        initialize: function() {
            this.template = this.loadTemplate(this.templateName);
            this.parent = this.options.parent;
            this.parentElement = this.options.parentElement;
            this.render();
        },

        render: function() {
            var html = this.template($.extend({}, {
                xblockInfo: this.model,
                xblockType: this.options.xblockType,
            }, this.getContext()));

            HtmlUtils.setHtml(this.$el, HtmlUtils.HTML(html));
            this.parentElement.append(this.$el);
        },

        getContext: function() {
            return {};
        },

        hasChanges: function() {
            return this.model.get("icon") !== this.$('#icon').val();
        },

        getValue: function () {
            return (this.$('#icon').val());
        },

        getRequestData: function () {
            return this.hasChanges() ? {
                publish: 'republish',
                metadata: {
                    'icon_override': this.getValue()
                }
            } : {};
        }
    });

    var CustomCourseOutlineView = CourseOutlineView.extend({
        getChildViewClass: function() {
            return CustomCourseOutlineView;
        },

        getIconEditorModal: function(xblockInfo, options) {
            return CourseOutlineModalsFactory.getCustomEditModal([], [IconEditor], xblockInfo, options);
        },

        customizeIcon: function() {
            var modal = this.getIconEditorModal(this.model, {
                onSave: this.refresh.bind(this),
                parentInfo: this.parentInfo,
            });

            if (modal) {
                modal.show();
            }
        },

        addButtonActions: function(element) {
            CourseOutlineView.prototype.addButtonActions.apply(this, arguments);
            element.find('.customize-icon-button').click(function(event) {
                event.preventDefault();
                this.customizeIcon();
            }.bind(this));
        },
    });
    return CustomCourseOutlineView;
});
