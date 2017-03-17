/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Utils_SRV = require('../../services/Utils-srv');




//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Buttons_CTRL (svg) {

	this.svgContainer = svg;

  _createGroup.call(this);

}








function _createGroup() {

  this.allButtonsGroup = this.svgContainer.append("g");

  _loadButtons.call(this);

}





function _loadButtons() {

  this.buttonsArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.buttons;

  $.each( this.buttonsArrayMO, function( key, item ) {

    item.deleted = Utils_SRV.getJsonVal(false, item.deleted, "BOOLEAN");

    if (item.deleted === false && item.copy) {

        let buttonGroup = this.allButtonsGroup.append("g")
                            .attr('index', key)
        if (DisplayGlobals_SRV.getArguments().editor) buttonGroup.attr('class', 'clickable');




        let btnMO = {
          x : Utils_SRV.getJsonVal(0, item.x, "NUMBER"),
          y : Utils_SRV.getJsonVal(0, item.y, "NUMBER"),
          width : Utils_SRV.getJsonVal(300, item.width, "NUMBER"),
          height : Utils_SRV.getJsonVal(300, item.height, "NUMBER"),
          background : '#'+item.background,
          radius : 7,
          copy : {
            cx : Utils_SRV.getJsonVal(0, item.x, "NUMBER") + Utils_SRV.getJsonVal(0, item.width, "NUMBER")/2,
            cy : Utils_SRV.getJsonVal(0, item.y, "NUMBER") + Utils_SRV.getJsonVal(0, item.height, "NUMBER")/2 + Utils_SRV.getJsonVal(0, item.copy.size, "NUMBER")/3,       //I have to add a small offset cause d3 text y anchor position is on the bottom.
            color : item.copy.colour,
            visible : true,
            size : Utils_SRV.getJsonVal(30, item.copy.size, "NUMBER"),
            width : 100,
            weight : Utils_SRV.getJsonVal(400, item.copy.weight, "NUMBER"),
            copy : _.unescape(item.copy.text),
          }
        }

        buttonGroup.append("rect")
            .attr("x", btnMO.x)
            .attr("y", btnMO.y)
            .attr("width", btnMO.width)
            .attr("height", btnMO.height)
            .attr("fill", btnMO.background)
            .attr("rx", btnMO.radius)         // set the x corner curve radius
            .attr("ry", btnMO.radius);        // set the y corner curve radius

        buttonGroup.append("text")
            .attr("text-anchor", "middle")
            .attr("x", btnMO.copy.cx)
            .attr("y", btnMO.copy.cy)
            .text( btnMO.copy.copy )
            .attr("font-family", this.fontFamily)
            .attr("font-size", btnMO.copy.size)
            .attr("fill", '#'+btnMO.copy.color );


        if (DisplayGlobals_SRV.getArguments().editor) {
          buttonGroup.on("click", function() {
            let index = $(this).attr('index');
            DisplayGlobals_SRV.getEditorRef().form_Ctrl.loadForm(5)      //Load the Buttons Form
            DisplayGlobals_SRV.getEditorRef().form_Ctrl.formArray[4].objRef.editButton(index);     //Objet to Edit buttons
          })
        }


    }

    

  }.bind(this));


}


Buttons_CTRL.prototype.update = function() {

  this.allButtonsGroup.selectAll("*").remove();
  _loadButtons.call(this);

}


Buttons_CTRL.prototype.reset = function() {

  this.allButtonsGroup.selectAll("*").remove();
  this.buttonsArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.buttons;
  _loadButtons.call(this);
  
}








module.exports =  Buttons_CTRL;
