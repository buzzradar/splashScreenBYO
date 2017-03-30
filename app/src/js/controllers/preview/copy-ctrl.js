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

      let groupText = this.allCopyGroup.append("g");
      groupText.attr('class', 'copy-group');


      //Rectangle
      this.dottedRect = groupText.append("rect")
                  .attr("x", 0)
                  .attr("y", 0)
                  .attr("width", Number(item.width))
                  .attr("height", 45)
                  .style("stroke", '#ffffff')
                  .style("fill", "none")
                  .style("stroke-width", 5)
                  .style("stroke-dasharray", ("20, 20"))

      //text
      let txtNode = groupText.append("text")
                  .attr("dx", 0)
                  .attr("dy", 0)
                  .attr('text-anchor', "start")
                  .attr("font-size", Number(item.size) )
                  .attr("fill", '#'+item.colour)
                  .attr('index', key)
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

          let coordinates = _getTransformValues(d3.select(this));
          console.log(coordinates);
          console.log(d3.event.x);
          console.log(d3.event.y);

          let newX = d3.event.x;
          let newY = d3.event.y;

          // let newX = Math.round( DisplayGlobals_SRV.scaleRatio(dx) + 0);
          // let newY = Math.round( DisplayGlobals_SRV.scaleRatio(dy) + 0);

          // DisplayGlobals_SRV.getEditorRef().updateCopyPosition(newX,newY,Number($(this).attr('index')));
          // DisplayGlobals_SRV.getPreviewRef().updateChanges(true);

          d3.select(this).attr("transform", function(d,i){
              return "translate(" + [ DisplayGlobals_SRV.scaleRatio(newX) ,DisplayGlobals_SRV.scaleRatio(newY) ] + ")"  
          })

        }
          
      }));







      // let txtNode = groupText.selectAll("text").data([ {"x":0, "y":0, initX: Number(item.x), initY:Number(item.y), "copy" : item.copy, svg:this.svgContainer} ]).enter().append("text")
      //   .attr('x', 0 )   //I will change the x coordinate later on when I find out how much is the width of the text. Line 97
      //   .attr('y', function(d, i){ return Number(item.y)+(30 + i * 90); })
      //   .attr('text-anchor', "start")
      //   .attr("font-size", Number(item.size) )
      //   .attr("fill", '#'+item.colour)
      //   .attr('index', key)
      //   .text(function(d){ return d.copy; })
      //   //We use this function to wrap the text within the given width.
      //   .call(_wrapCopyWidth, Number(item.width))
      //   .call(d3.drag()

      //     .on("drag", function(d,i) {

      //       if (self.isDragable) {

      //         d.x += d3.event.dx
      //         d.y += d3.event.dy

      //         let newX = Math.round( DisplayGlobals_SRV.scaleRatio(d.x) + d.initX);
      //         let newY = Math.round( DisplayGlobals_SRV.scaleRatio(d.y) + d.initY);

      //         DisplayGlobals_SRV.getEditorRef().updateCopyPosition(newX,newY,Number($(this).attr('index')));
      //         DisplayGlobals_SRV.getPreviewRef().updateChanges(true);

      //         d3.select(this).attr("transform", function(d,i){
      //             return "translate(" + [ DisplayGlobals_SRV.scaleRatio(d.x) ,DisplayGlobals_SRV.scaleRatio(d.y) ] + ")"  
      //         })

      //       }
              
      //     }));

      //   //Get width of the text and then change the X coordinate.
      //   let txtWidth = txtNode.node().getBBox().width;
      //   console.log(txtWidth)
      //   txtNode.attr("transform", "translate("+_getXpos(item,txtWidth)+",0)");

    }

  }.bind(this));

   _isDragable.call(this);


}




function _getTransformValues(d3Elem) {

  let translateString = d3Elem.attr('transform');
  translateString = translateString.replace("translate(", "");
  translateString = translateString.replace(")", "");
  let arrayCoordinates = translateString.split(",");
  arrayCoordinates[0] = Number(arrayCoordinates[0]);
  arrayCoordinates[1] = Number(arrayCoordinates[1]);
  return arrayCoordinates;

}




function _getXpos(copyMO, txtWidth) {

  if(!copyMO.align) copyMO.align = "center";
  let x = Number(copyMO.x);
  if ( copyMO.align.toLowerCase() === "center" ) {
    x = Number(copyMO.width)/2 - txtWidth/2;
  }

  return x;

}




function _getTextAnchor(copyMO) {

  if(!copyMO.align) copyMO.align = "center";
  let anchor = "start";
  if ( copyMO.align.toLowerCase() === "center" ) {
    anchor = "middle";
  }
  return anchor;

}





function _isDragable() {

  if (!this.isDragable) {
      $(".copy-group").each(function( index ) {
        $( this ).removeClass('draggable');
      });

   }else{
      $(".copy-group").each(function( index ) {
        $( this ).addClass('draggable');
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
