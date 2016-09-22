/*jslint node: true, unused: true, esnext: true */






//----------------------------
// REQUIRE 
//----------------------------

const DisplayGlobals_SRV = require('../../../services/A01_DisplayGlobals-srv'); 
const HBTemplates = require('../../../services/HBTemplates-srv');





// ------------------------------------
// Constructor
// ------------------------------------

function FormType4_Ctrl () {

	this.parentDOM = $('#splScrEditorForm');
	this.copyArray = [
		{id:1},
	];
    console.log ("%c -> Form Type 3 Constructor. DONE! ", "background:#ff0000;");

}







FormType4_Ctrl.prototype.load = function () {

	this.parentDOM.find('.form-body').html(HBTemplates.getTemplate('formType4'));

	$("[name='divider-switch']").bootstrapSwitch();
	_addPickColors.call(this);

}



function _addPickColors() {

    $('input.color-picker').each(function() {

        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function(hex, opacity) {
                if (!hex) return;
                if (opacity) hex += ', ' + opacity;
                if (typeof console === 'object') {
                    console.log(hex);
                }
            },
            theme: 'bootstrap'
        });

    });


}












































module.exports = FormType4_Ctrl;