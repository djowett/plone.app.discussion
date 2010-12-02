/******************************************************************************
 *
 * jQuery functions for the plone.app.discussion comment viewlet and form.
 *
 ******************************************************************************/
(function ($) {
	// This unnamed function allows us to use $ inside of a block of code
	// without permanently overwriting $.
	// http://docs.jquery.com/Using_jQuery_with_Other_Libraries
    
    /* Disable a control panel setting */
    $.disableSettings = function (settings) {
        $.each(settings, function (intIndex, setting) {
            setting.addClass('unclickable');
            var setting_field = $(setting).find("input,select");
            setting_field.attr('disabled', 'disabled');
        });          
    };
    
    /* Enable a control panel setting */
    $.enableSettings = function (settings) {
        $.each(settings, function (intIndex, setting) {
            setting.removeClass('unclickable');
            var setting_field = $(setting).find("input,select");
            setting_field.removeAttr('disabled');
        });    
    };
    
    /* Update settings */
    $.updateSettings = function () {
        
        var globally_enabled = $("#content").hasClass("globally_enabled");
        var anonymous_comments = $("#content").hasClass("anonymous_comments");
        var invalid_mail_setup = $("#content").hasClass("invalid_mail_setup");
        
        /* If commenting is globally disabled, disable all settings. */
        if (globally_enabled === true) {
            $.enableSettings([
                $('#formfield-form-widgets-anonymous_comments'),
                $('#formfield-form-widgets-text_transform'),
                $('#formfield-form-widgets-captcha'),
                $('#formfield-form-widgets-show_commenter_image'),
                $('#formfield-form-widgets-moderator_notification_enabled'),
                $('#formfield-form-widgets-user_notification_enabled')
            ]);
        } else {
            $.disableSettings([
                $('#formfield-form-widgets-anonymous_comments'),
                $('#formfield-form-widgets-text_transform'),
                $('#formfield-form-widgets-captcha'),
                $('#formfield-form-widgets-show_commenter_image'),
                $('#formfield-form-widgets-moderator_notification_enabled'),
                $('#formfield-form-widgets-user_notification_enabled')
            ]);
        }

        /* If the mail setup is invalid, disable the mail settings. */
        if (invalid_mail_setup === true) {
            $.disableSettings([
                $('#formfield-form-widgets-moderator_notification_enabled'),
                $('#formfield-form-widgets-user_notification_enabled')
            ]);
        } else {
            $.enableSettings([
                $('#formfield-form-widgets-moderator_notification_enabled'),
                $('#formfield-form-widgets-user_notification_enabled')
            ]);
        }
    };
    //#JSCOVERAGE_IF 0

    /**************************************************************************
     * Window Load Function: Executes when complete page is fully loaded,
     * including all frames,
     **************************************************************************/
    $(window).load(function () {

        // Update settings on page load
        $.updateSettings();

        // Set #content class and update settings afterwards
        $("input,select").live("change", function (e) {
            var id = $(this).attr("id");
            if (id === "form-widgets-globally_enabled-0") {    
                if ($(this).attr("checked") === true) {
                    $("#content").addClass("globally_enabled");
                }
                else {
                    $("#content").removeClass("globally_enabled");
                }
                $.updateSettings();
            }
        });
        
        /**********************************************************************
         * Remove the disabled attribute from all form elements before 
         * submitting the form. Otherwise the z3c.form will raise errors on
         * the required attributes.
         **********************************************************************/
        $("input[name='form.buttons.save']").bind("click", function (e) {
            //e.preventDefault();
            var form = $(this).parents("form");
            $(form).find("input,select").removeAttr('disabled');
            $(form).submit();
        });           

	});

    //#JSCOVERAGE_ENDIF

}(jQuery));
