var templates = {"formLayout":"                <div class=\"portlet light bordered\">            <div class=\"portlet-title\">                <div class=\"caption\">                    <span class=\"caption-subject font-dark bold uppercase\">Form Section Name Goes here</span>                </div>                <div class=\"actions\">                                   </div>            </div>            <div class=\"portlet-body form\">                <form class=\"form-horizontal\" role=\"form\">                    <div class=\"form-body\">                        <!-- This will be filled dynamically -->                    </div><!--                     <div class=\"form-actions text-right\">                        <button type=\"submit\" class=\"btn green-jungle\">Update</button>                    </div> -->                </form>            </div>                    </div>    ","formType1":"        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Name</label>            <div class=\"col-xs-8\">                <input type=\"text\" name=\"launcherName\" class=\"form-control\" placeholder=\"Enter the name of the Launcher\" value=\"{{name}}\">            </div>        </div>        <div class=\"form-group control-group\">             <label class=\"col-xs-4 control-label\" for=\"bg_file\">Image</label>             <div class=\"col-xs-8 controls sonata-ba-field sonata-ba-field-standard-natural \">                 <form>                    <div id=\"queue1\"></div>                    <input id=\"cf_backgroundImageUpload\" name=\"cf_backgroundImageUpload\" type=\"file\" multiple=\"false\">                </form>            </div>        </div>        <div class=\"form-group whatever\">            <label class=\"col-xs-4 control-label\">Playlist Enabled</label>            <div class=\"col-xs-2\">                <input type=\"checkbox\" name=\"playlist-enabled-switch\" class=\"make-switch\" data-size=\"small\" checked data-on-color=\"success\">            </div>        </div>        <div class=\"row launch-playlist-settings\">            <div class=\"portlet light\">                <div class=\"portlet-title\">                    <div class=\"caption\">                        <span class=\"caption-subject font-dark bold uppercase\"> \"Launch as Playlist\" Settings</span>                    </div>                    <div class=\"actions\">                    </div>                </div>                <div class=\"portlet-body\">                        <label class=\"margin-bottom-10\"><input type=\"checkbox\" class=\"icheck\"> Preloader View</label>                                        <div class=\"alert alert-info\">                            <strong>NOTE: </strong> These settings are only applicable when you click on the \"Launch as Playlist\" button in Dashboard Manager -> Launcher Editor page. Once you finished you can switch to Dashboard Launcher clicking on the checkbox above.                        </div>                        <div class=\"form-group\">                            <label class=\"col-xs-4 control-label\">Scale (min 40)</label>                            <div class=\"col-md-2 col-sm-4 col-xs-3\">                                <input type=\"text\" name=\"scale\" class=\"form-control inlinesmall\" placeholder=\"Scale\" value=\"{{scale}}\">                            </div>                        </div>                        <div class=\"form-group\">                            <label class=\"col-xs-4 control-label\">yOffset</label>                            <div class=\"col-md-2 col-sm-4 col-xs-3\">                                <input type=\"text\" name=\"yoffset\" class=\"form-control inlinesmall\" placeholder=\"yOffset\" value=\"{{yoffset}}\">                            </div>                        </div>                        <div class=\"form-group\">                            <label class=\"col-md-4 control-label\">BG Colour</label>                            <div class=\"col-sm-12 col-md-4\">                                <input type=\"text\" name=\"bgcolor\" class=\"form-control color-picker\" data-control=\"hue\" value=\"#{{bgcolour}}\">                            </div>                        </div>                        <div class=\"form-group\">                            <label class=\"col-xs-4 control-label\">BG Opacity</label>                            <div class=\"col-md-2 col-sm-4 col-xs-3\">                                <input type=\"text\" name=\"bgopacity\" class=\"form-control inlinesmall\" placeholder=\"Opacity\" value=\"{{bgopacity}}\">                            </div>                        </div>                        <div class=\"form-group\">                            <label class=\"col-md-4 control-label\">FG Colour</label>                            <div class=\"col-sm-12 col-md-4\">                                <input type=\"text\" name=\"fgcolor\" class=\"form-control color-picker\" data-control=\"hue\" value=\"#{{fgcolour}}\">                            </div>                        </div>                        <div class=\"form-group\">                            <label class=\"col-xs-4 control-label\">FG Opacity</label>                            <div class=\"col-md-2 col-sm-4 col-xs-3\">                                <input type=\"text\" name=\"fgopacity\" class=\"form-control inlinesmall\" placeholder=\"Opacity\" value=\"{{fgopacity}}\">                            </div>                        </div>                </div>            </div>        </div>","formType2":"        <!-- <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">Enabled</label>            <div class=\"col-xs-2\">                <input type=\"checkbox\" name=\"logo-switch\" class=\"make-switch\" data-size=\"small\" checked data-on-color=\"success\" >                            </div>        </div> -->        <div class=\"form-group control-group\">             <label class=\"col-xs-3 control-label\" for=\"logoVendor_file\">Logo</label>             <div class=\"col-xs-8 controls sonata-ba-field sonata-ba-field-standard-natural \">                 <form>                    <div id=\"queue1\"></div>                    <input id=\"cf_backgroundLogoVendorUpload\" name=\"cf_backgroundLogoVendorUpload\" type=\"file\" multiple=\"false\">                </form>            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">Dimension (w,h)</label>            <div class=\"col-xs-9\">                <input type=\"text\" name=\"dim_w\" class=\"form-control inlinesmall\" placeholder=\"w\" value=\"{{width}}\">                <input type=\"text\" name=\"dim_h\" class=\"form-control inlinesmall\" placeholder=\"h\" value=\"{{height}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-3 control-label\">Position (x,y)</label>            <div class=\"col-xs-9\">                <input type=\"text\" name=\"pos_x\" class=\"form-control inlinesmall\" placeholder=\"x\" value=\"{{x}}\">                <input type=\"text\" name=\"pos_y\" class=\"form-control inlinesmall\" placeholder=\"y\" value=\"{{y}}\">            </div>        </div>            ","formType3":"        <div class=\"list-group list-copy-items\">                    </div>    ","copy_item":"        <a href=\"javascript:;\" class=\"list-group-item\" data-id=\"{{id}}\" data-index=\"{{index}}\">            <h4 class=\"list-group-item-heading margin-bottom-20\">                <!-- <strong>Copy To Be Added To The Launcher</strong> -->                <i class=\"fa fa-close pull-right\"></i>            </h4>            <p class=\"list-group-item-text\">                               <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Copy</label>                    <div class=\"col-xs-8\">                        <input type=\"text\" name=\"copy\" class=\"form-control\" placeholder=\"This is the copy that will get displayed\" value=\"{{copy}}\">                    </div>                </div>                                <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Width</label>                    <div class=\"col-xs-9\">                        <input type=\"text\" name=\"dim_w\" class=\"form-control inlinesmall\" placeholder=\"W\" value=\"{{width}}\">                    </div>                </div>                <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Position (x,y)</label>                    <div class=\"col-xs-9\">                        <input type=\"text\" name=\"pos_x\" class=\"form-control inlinesmall\" placeholder=\"X\" value=\"{{x}}\">                        <input type=\"text\" name=\"pos_y\" class=\"form-control inlinesmall\" placeholder=\"Y\" value=\"{{y}}\">                    </div>                </div>                <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Font Size</label>                    <div class=\"col-md-2 col-sm-4 col-xs-3\">                        <input type=\"text\" name=\"size\" class=\"form-control inlinesmall\" placeholder=\"Size\" value=\"{{size}}\">                    </div>                </div>                <div class=\"form-group\">                    <label class=\"col-md-3 control-label\">Colour</label>                    <div class=\"col-sm-12 col-md-3\">                        <input type=\"text\" class=\"form-control color-picker\" data-control=\"hue\" value=\"#{{colour}}\">                    </div>                </div>                <div class=\"form-group\">                    <label class=\"col-md-3 control-label\">Align</label>                    <div class=\"col-sm-12 col-md-4\">                        <select class=\"form-control align\">                            <option>Left</option>                            <option>Center</option>                        </select>                    </div>                </div>            </p>        </a>               ","formType4":"        <div class=\"list-group list-divider-items\">                    </div>    ","divider_item":"        <a href=\"javascript:;\" class=\"list-group-item\" data-id=\"{{id}}\" data-index=\"{{index}}\">            <h4 class=\"list-group-item-heading margin-bottom-20\">                <!-- <strong>Divider To Be Added To The Launcher</strong> -->                <i class=\"fa fa-close pull-right\"></i>            </h4>            <p class=\"list-group-item-text\">                 <div class=\"form-group\">                    <label class=\"col-xs-3 control-label\">Visible</label>                    <div class=\"col-xs-2\">                        <input type=\"checkbox\" name=\"divider-switch\" class=\"make-switch\" data-size=\"small\" checked data-on-color=\"success\">                                            </div>                </div>                <div class=\"divider-settings\">                    <div class=\"form-group\">                        <label class=\"col-md-3 control-label\">Colour</label>                        <div class=\"col-sm-12 col-md-6\">                            <input type=\"text\" class=\"form-control color-picker\" data-control=\"hue\" value=\"#{{colour}}\">                        </div>                    </div>                    <div class=\"form-group\">                        <label class=\"col-xs-3 control-label\">Dimension (w,h)</label>                        <div class=\"col-xs-9\">                            <input type=\"text\" name=\"dim_w\" class=\"form-control inlinesmall\" placeholder=\"w\" value=\"{{width}}\">                            <input type=\"text\" name=\"dim_h\" class=\"form-control inlinesmall\" placeholder=\"h\" value=\"{{height}}\">                        </div>                    </div>                    <div class=\"form-group\">                        <label class=\"col-xs-3 control-label\">Position (x,y)</label>                        <div class=\"col-xs-9\">                            <input type=\"text\" name=\"pos_x\" class=\"form-control inlinesmall\" placeholder=\"x\" value=\"{{x}}\">                            <input type=\"text\" name=\"pos_y\" class=\"form-control inlinesmall\" placeholder=\"y\" value=\"{{y}}\">                        </div>                    </div>                </div>            </p>        </a>    ","formType5":"        <div class=\"list-group list-button-items\">                </div>    ","button_item":"        <a href=\"javascript:;\" class=\"list-group-item\" data-id=\"{{id}}\" data-index=\"{{index}}\" data-dashboard=\"{{dashboardID}}\">            <h4 class=\"list-group-item-heading margin-bottom-20\">                Dashboard <i class=\"fa fa-arrow-right\"></i> <strong>{{dashboardRef}}</strong>                <i class=\"fa fa-close pull-right\"></i>            </h4>            <p class=\"list-group-item-text\">                 <button type=\"button\" class=\"btn\" style=\"background:#{{background}};color:#{{copy.colour}}\">{{copy.text}} </button>            </p>        </a>    ","button_edit_item":"        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Visible</label>            <div class=\"col-xs-2\">                <input type=\"checkbox\" name=\"btn-switch\" class=\"make-switch\" data-size=\"small\" checked data-on-color=\"success\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\"><strong>Dashboard ID</strong></label>            <div class=\"col-xs-5 dashboardID-select\">                <!-- I will build the select dynamically from buttonFormItem-ctrl.js -->            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Background Color</label>            <div class=\"col-xs-5\">                <input type=\"text\" name=\"background\" class=\"form-control color-picker\" data-control=\"hue\" value=\"#{{background}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Transparency</label>            <div class=\"col-xs-5\">                <input type=\"text\" name=\"backgroundTransparent\" class=\"form-control inlinesmall\" placeholder=\"\" value=\"{{backgroundTransparent}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Dimension (w,h)</label>            <div class=\"col-xs-8\">                <input type=\"text\" name=\"dim_w\" class=\"form-control inlinesmall\" placeholder=\"w\" value=\"{{width}}\">                <input type=\"text\" name=\"dim_h\" class=\"form-control inlinesmall\" placeholder=\"h\" value=\"{{height}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Position (x,y)</label>            <div class=\"col-xs-8\">                <input type=\"text\" name=\"pos_x\" class=\"form-control inlinesmall\" placeholder=\"x\" value=\"{{x}}\">                <input type=\"text\" name=\"pos_y\" class=\"form-control inlinesmall\" placeholder=\"y\" value=\"{{y}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Copy</label>            <div class=\"col-xs-5\">                <input type=\"text\" name=\"copy\" class=\"form-control\" placeholder=\"This is the copy that will get displayed\" value=\"{{copy.text}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Copy Colour</label>            <div class=\"col-xs-5\">                <input type=\"text\" name=\"copy-colour\" class=\"form-control color-picker\" data-control=\"hue\" value=\"#{{copy.colour}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Copy Size</label>            <div class=\"col-xs-8\">                <input type=\"text\" name=\"copy-size\" class=\"form-control inlinesmall\" placeholder=\"x\" value=\"{{copy.size}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Copy Weight</label>            <div class=\"col-xs-8\">                <input type=\"text\" name=\"copy-weight\" class=\"form-control inlinesmall\" placeholder=\"x\" value=\"{{copy.weight}}\">            </div>        </div>        <div class=\"form-group\">            <label class=\"col-xs-4 control-label\">Playlist Autoplay</label>            <div class=\"col-xs-2\">                <input type=\"checkbox\" name=\"btn-playlist-switch\" class=\"make-switch\" data-size=\"small\" checked data-on-color=\"success\">            </div>        </div>        <div class=\"playlist-properties\">            <div class=\"form-group\">                <label class=\"col-xs-4 control-label\">Playlist Position</label>                <div class=\"col-xs-8\">                    <input type=\"text\" name=\"playlist-pos\" class=\"form-control inlinesmall\" placeholder=\"1\" value=\"{{autoplay.playpos}}\">                </div>            </div>            <div class=\"form-group\">                <label class=\"col-xs-4 control-label\">Playlist Seconds</label>                <div class=\"col-xs-8\">                    <input type=\"text\" name=\"playlist-mins\" class=\"form-control inlinesmall\" placeholder=\"10\" value=\"{{autoplay.seconds}}\">                </div>            </div>        </div>    "}
/*jslint node: true, unused: true, esnext: true */



const Handlebars = require('Handlebars');










//----------------------------
// CONSTRUCTOR
//----------------------------

let _HBTemplates;

function HBTemplates () {

    _HBTemplates = this;

    Handlebars.registerHelper("if", function(conditional, options) {
        if (conditional == options.hash.equals) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

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
