/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Utils_SRV = require('../../services/Utils-srv');




//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Buttons_CTRL (svg) {

	this.svgContainer = svg;
  this.isDragable = false;

  _createGroup.call(this);

}








function _createGroup() {

  this.allButtonsGroup = this.svgContainer.append("g");
  this.allButtonsGroup.attr('class','all-buttons-group');


  _loadButtons.call(this);

}





function _loadButtons() {

  var self = this;

  this.buttonsArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.buttons;

  $.each( this.buttonsArrayMO, function( key, item ) {

    item.deleted = Utils_SRV.getJsonVal(false, item.deleted, "BOOLEAN");

    if (item.deleted === false && item.copy) {

        let buttonGroup = this.allButtonsGroup.append("g").attr('index', key);
        buttonGroup.attr('class', 'btn-group');

        // if (DisplayGlobals_SRV.getArguments().editor) buttonGroup.attr('class', 'btn-group clickable');

        let btnMO = {
          x : 0,
          y : 0,
          width : Utils_SRV.getJsonVal(300, item.width, "NUMBER"),
          height : Utils_SRV.getJsonVal(300, item.height, "NUMBER"),
          initX : Utils_SRV.getJsonVal(0, item.x, "NUMBER"),
          initY : Utils_SRV.getJsonVal(0, item.y, "NUMBER"),
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

        //Rectangle for the button
        buttonGroup.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", btnMO.width)
            .attr("height", btnMO.height)
            .attr("fill", btnMO.background)
            .attr("rx", btnMO.radius)         // set the x corner curve radius
            .attr("ry", btnMO.radius);        // set the y corner curve radius

        //Label of the button
        buttonGroup.append("text")
            .attr("text-anchor", "middle")
            .attr('alignment-baseline', 'hanging')
            .attr("x", btnMO.width/2)
            .attr("y", DisplayGlobals_SRV.scaleRatio(10))
            .text( btnMO.copy.copy )
            .attr("font-family", this.fontFamily)
            .attr("font-size", btnMO.copy.size)
            .attr("fill", '#'+btnMO.copy.color );

        //Dotted Rectangle
        buttonGroup.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", btnMO.width)
            .attr("height", btnMO.height)
            .style("stroke", '#ffffff')
            .style("fill", "none")
            .style("stroke-width", 7)
            .style("stroke-dasharray", ("20, 20"))
            .attr('class', 'dotted-rect');

        //Coordinates of the button applied to the group
        buttonGroup.attr("transform", "translate("+Number(btnMO.initX)+","+Number(btnMO.initY)+")");
      
        //On Drag 
        buttonGroup.call(d3.drag()
          .on("drag", function(d,i) {

            if (self.isDragable) {
            
              let coordinates = Utils_SRV.getTransformValues(d3.select(this));
              let newX = Math.round( coordinates[0] + DisplayGlobals_SRV.scaleRatio(d3.event.dx) );
              let newY = Math.round( coordinates[1] + DisplayGlobals_SRV.scaleRatio(d3.event.dy) );

              console.log($(this).attr('index'))

              DisplayGlobals_SRV.getEditorRef().updateButtonPosition(newX,newY, Number($(this).attr('index')) );
              DisplayGlobals_SRV.getPreviewRef().updateChanges(true);

              d3.select(this).attr("transform", function(d,i){
                  return "translate(" + [ newX , newY ] + ")"  
              })

              //When user drags a button, must be visible in the editor section on the right hand side
              if (DisplayGlobals_SRV.getArguments().editor) {
                  let index = Number($(this).attr('index'));
                  DisplayGlobals_SRV.getEditorRef().form_Ctrl.loadForm(5)      //Load the Buttons Form
                  DisplayGlobals_SRV.getEditorRef().form_Ctrl.formArray[4].objRef.editButton(index);     //Objet to Edit buttons
              }

            }
 
          }));


        //When user clicks a button, must be visible in the editor section on the right hand side
        if (DisplayGlobals_SRV.getArguments().editor) {
            buttonGroup.on("click", function() {
              let index = $(this).attr('index');
              DisplayGlobals_SRV.getEditorRef().form_Ctrl.loadForm(5)      //Load the Buttons Form
              DisplayGlobals_SRV.getEditorRef().form_Ctrl.formArray[4].objRef.editButton(index);     //Objet to Edit buttons
            })
        }


    }

    

  }.bind(this));

   _isDragable.call(this);

}





function _isDragable() {

  if (!this.isDragable) {
      $(".btn-group").each(function( index ) {
        $( this ).removeClass('draggable');
        d3.select(this).select('.dotted-rect').style("stroke", 'transparent');
      });

   }else{
      $(".btn-group").each(function( index ) {
        $( this ).addClass('draggable');
        d3.select(this).select('.dotted-rect').style("stroke", '#ffffff');
      });
   }

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


Buttons_CTRL.prototype.dragable = function (isDragable) {

   this.isDragable = isDragable;
   _isDragable.call(this);

}






module.exports =  Buttons_CTRL;
