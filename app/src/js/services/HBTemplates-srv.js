var templates = {"formLayout":"                <div class=\"portlet light bordered\">            <div class=\"portlet-title\">                <div class=\"caption\">                    <span class=\"caption-subject font-dark bold uppercase\">Form Section Name Goes here</span>                </div>                <div class=\"actions\">                                   </div>            </div>            <div class=\"portlet-body form\">                <form class=\"form-horizontal\" role=\"form\">                    <div class=\"form-body\">                        <!-- This will be filled dynamically -->                    </div>                    <div class=\"form-actions text-right\">                        <button type=\"submit\" class=\"btn green-jungle\">Update</button>                    </div>                </form>            </div>                    </div>    ","formType1":"        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">Name</label>            <div class=\"col-xs-8\">                <input type=\"text\" class=\"form-control\" placeholder=\"Enter text\">            </div>        </div>        <div class=\"form-group control-group\">             <label class=\"col-xs-3 control-label\" for=\"s57738c79e919b_file\">Image</label>             <div class=\"col-xs-8 controls sonata-ba-field sonata-ba-field-standard-natural \">                 <input type=\"file\" id=\"s57738c79e919b_file\" name=\"s57738c79e919b[file]\" class=\"m-wrap form-control\">                 <span class=\"help-block sonata-ba-field-help\">Please choose an image to be used as a background for the Splash Screen.</span>             </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">Enabled</label>            <div class=\"col-xs-2\">                <input type=\"checkbox\" name=\"bg-switch\" class=\"make-switch\" data-size=\"small\" checked data-on-color=\"success\">                            </div>        </div>","formType2":"        <p class=\"well\"> <strong>Note:</strong> Drag the logo in the position you prefer or alternatively change the coordinates below. </p>        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">Enabled</label>            <div class=\"col-xs-2\">                <input type=\"checkbox\" name=\"logo-switch\" class=\"make-switch\" data-size=\"small\" checked data-on-color=\"success\">                            </div>        </div>        <div class=\"form-group control-group\">             <label class=\"col-xs-3 control-label\" for=\"s57738c79e919b_file\">Logo</label>             <div class=\"col-xs-8 controls sonata-ba-field sonata-ba-field-standard-natural \">                 <input type=\"file\" id=\"s57738c79e919b_file\" name=\"s57738c79e919b[file]\" class=\"m-wrap form-control\">                 <span class=\"help-block sonata-ba-field-help\">Please choose an image to be used as a Logo Vendor for the Splash Screen.</span>             </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">Width</label>            <div class=\"col-xs-3\">                <input type=\"text\" class=\"form-control\" placeholder=\"100\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">Height</label>            <div class=\"col-xs-3\">                <input type=\"text\" class=\"form-control\" placeholder=\"100\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">x</label>            <div class=\"col-xs-3\">                <input type=\"text\" class=\"form-control\" placeholder=\"100\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">y</label>            <div class=\"col-xs-3\">                <input type=\"text\" class=\"form-control\" placeholder=\"100\">            </div>        </div>            ","formType3":"        <div class=\"list-group list-copy-items\">                    </div>    ","copy_item":"        <a href=\"javascript:;\" class=\"list-group-item\" data-arrayid=\"999\">            <h4 class=\"list-group-item-heading margin-bottom-20\">                <strong>Copy 1</strong>                <i class=\"fa fa-close pull-right\"></i>            </h4>            <p class=\"list-group-item-text\">                               <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Copy</label>                    <div class=\"col-xs-7\">                        <input type=\"text\" class=\"form-control\" placeholder=\"This is the copy that will get displayed\">                    </div>                </div>                <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Positon</label>                    <div class=\"col-xs-3\">                        <input type=\"text\" class=\"form-control input-sm\" placeholder=\"X\">                    </div>                    <div class=\"col-xs-3\">                        <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Y\">                    </div>                </div>                <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Dimension</label>                    <div class=\"col-xs-3\">                        <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Width\">                    </div>                    <div class=\"col-xs-3\">                        <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Height\">                    </div>                </div>                <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Font Size</label>                    <div class=\"col-xs-3\">                        <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Size\">                    </div>                </div>            </p>        </a>               "}
/*jslint node: true, unused: true, esnext: true */



const Handlebars = require('Handlebars');










//----------------------------
// CONSTRUCTOR
//----------------------------

let _HBTemplates;

function HBTemplates () {

  _HBTemplates = this;

}


















//----------------------------
// PUBLIC METHODS
//----------------------------


HBTemplates.prototype.getTemplate = function (tplId, data) {

    // console.log("Get Template Id = ", tplId, data);

    if (!data) {
        return $(templates[tplId]);        
    }else{
        let template = Handlebars.compile(templates[tplId]);
        let result = template(data);
        return $(result);
    }

};



HBTemplates.prototype.loadTemplate = function (tplId, data, targetElem) {

    // console.log("This is handlebars = ", tplId);

    let template = Handlebars.compile(templates[tplId]);
    let result = template(data);
    
    targetElem.html(result);
  
};



















module.exports = new HBTemplates ();
