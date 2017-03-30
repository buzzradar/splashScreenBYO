/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Utils_SRV = require('../../services/Utils-srv');



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Copy_CTRL (svg) {

    this.svgContainer = svg;
    this.isDragable = false;
    this.fontFamily = "Helvetica, Arial, sans-serif";


  _createGroup.call(this);

}








function _createGroup() {

  this.allCopyGroup = this.svgContainer.append("g");
  this.allCopyGroup.attr('class','all-copy-group');

  _loadCopy.call(this);

}



function _loadCopy() {

  var self = this;

  this.copyArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.copy;

  $.each( this.copyArrayMO, function( key, item ) {

    item.deleted = Utils_SRV.getJsonVal(false, item.deleted, "BOOLEAN");

    if (!item.deleted) {

      let groupText = this.allCopyGroup.append("g").attr('index', key);
      groupText.attr('class', 'copy-group');


      //Dotted Rectangle
      groupText.append("rect")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("width", Number(item.width))
                  .attr("height", Number(item.size))
                  .style("stroke", 'transparent')
                  .style("fill", "none")
                  .style("stroke-width", 7)
                  .style("stroke-dasharray", ("20, 20"))
                  .attr('class', 'dotted-rect');

      //text
      let txtNode = groupText.append("text")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr('text-anchor', "start")
                  .attr("font-size", Number(item.size) )
                  .attr("fill", '#'+item.colour)
                  .attr('alignment-baseline', 'hanging')
                  .text(item.copy)

      //Get width of the text and then change the X coordinate.
      let txtWidth = txtNode.node().getBBox().width;
      txtNode.attr("transform", "translate("+_getXpos(item,txtWidth)+",0)");

      //Transform the position of the groupText
      groupText.attr("transform", "translate("+Number(item.x)+","+Number(item.y)+")");

      //Add drag functionality
      groupText.call(d3.drag().on("drag", function(d,i) {

        if (self.isDragable) {

          let coordinates = Utils_SRV.getTransformValues(d3.select(this));

          let newX = Math.round( coordinates[0] + DisplayGlobals_SRV.scaleRatio(d3.event.dx) );
          let newY = Math.round( coordinates[1] + DisplayGlobals_SRV.scaleRatio(d3.event.dy) );

          DisplayGlobals_SRV.getEditorRef().updateCopyPosition(newX,newY,Number($(this).attr('index')));
          DisplayGlobals_SRV.getPreviewRef().updateChanges(true);

          d3.select(this).attr("transform", function(d,i){
              return "translate(" + [ newX ,newY ] + ")"  
          })

        }
          
      }));



    }

  }.bind(this));

   _isDragable.call(this);


}





function _getXpos(copyMO, txtWidth) {

  if(!copyMO.align) copyMO.align = "center";
  let x = 0;
  if ( copyMO.align.toLowerCase() === "center" ) {
    x = Number(copyMO.width)/2 - txtWidth/2;
  }

  return x;

}




function _isDragable() {

  if (!this.isDragable) {
      $(".copy-group").each(function( index ) {
        $( this ).removeClass('draggable');
        d3.select(this).select('.dotted-rect').style("stroke", 'transparent');
      });

   }else{
      $(".copy-group").each(function( index ) {
        $( this ).addClass('draggable');
        d3.select(this).select('.dotted-rect').style("stroke", '#ffffff');
      });
   }

}





function _wrapCopyWidth(text, width) {

  text.each(function() {

    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.3, // ems
      x = text.attr("x"),
      y = text.attr("y"),
      dy = text.attr("dy") ? text.attr("dy") : 0,
      tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
  
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }

  });
}







Copy_CTRL.prototype.update = function() {

  this.allCopyGroup.selectAll("*").remove();
  _loadCopy.call(this);

}


Copy_CTRL.prototype.reset = function() {

  this.copyArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.copy;
  this.update();

}

Copy_CTRL.prototype.dragable = function (isDragable) {

   this.isDragable = isDragable;
   _isDragable.call(this);

}



module.exports =  Copy_CTRL;
