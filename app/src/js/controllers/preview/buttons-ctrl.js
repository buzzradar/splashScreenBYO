/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const d3 = require("d3");



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Buttons_CTRL (svg, buttonsArrayMO) {

	this.svgContainer = svg;
	this.buttonsArrayMO = buttonsArrayMO;

  _createGroup.call(this);

}








function _createGroup() {

  this.allButtonsGroup = this.svgContainer.append("g");

  _loadButtons.call(this);

}





function _loadButtons() {

  $.each( this.buttonsArrayMO, function( key, item ) {

    let buttonGroup = this.allButtonsGroup.append("g")
                        .attr('class', 'clickable')
                        .attr('index', key)


    let btnMO = {
      x : item.x,
      y : item.y,
      width : item.width,
      height : item.height,
      background : '#'+item.background,
      radius : 7,
      copy : {
        cx : item.x + item.width/2,
        cy : item.y + item.height/2 + item.copy.size/3,       //I have to add a small offset cause d3 text y anchor position is on the bottom.
        color : item.copy.colour,
        visible : true,
        size : item.copy.size,
        width : 100,
        weight : item.copy.weight,
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

      buttonGroup.on("click", function() {
        let index = $(this).attr('index');
        DisplayGlobals_SRV.getEditorRef().form_Ctrl.loadForm(5)      //Load the Buttons Form
        DisplayGlobals_SRV.getEditorRef().form_Ctrl.formArray[4].objRef.editButton(index);     //Objet to Edit buttons
      })

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
