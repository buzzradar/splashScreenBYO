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

      var groupText = this.allCopyGroup.append("g");
      groupText.attr('class', 'copy-group');

      groupText.selectAll("text").data([ {"x":0, "y":0, initX: Number(item.x), initY:Number(item.y), "copy" : item.copy, svg:this.svgContainer} ]).enter().append("text")
        .attr('x', Number(item.x))
        .attr('y', function(d, i){ return Number(item.y)+(30 + i * 90); })
        .attr("font-size", Number(item.size) )
        .attr("fill", '#'+item.colour)
        .attr('index', key)
        .text(function(d){ return d.copy; })
        //We use this function to wrap the text within the given width.
        .call(_wrapCopyWidth, Number(item.width))
        .call(d3.drag()

          .on("drag", function(d,i) {

            if (self.isDragable) {

              d.x += d3.event.dx
              d.y += d3.event.dy

              let newX = Math.round( DisplayGlobals_SRV.scaleRatio(d.x) + d.initX );
              let newY = Math.round( DisplayGlobals_SRV.scaleRatio(d.y) + d.initY );

              DisplayGlobals_SRV.getEditorRef().updateCopyPosition(newX,newY,Number($(this).attr('index')));
              DisplayGlobals_SRV.getPreviewRef().updateChanges(true);

              d3.select(this).attr("transform", function(d,i){
                  return "translate(" + [ DisplayGlobals_SRV.scaleRatio(d.x) ,DisplayGlobals_SRV.scaleRatio(d.y) ] + ")"  
              })

            }
              
          }));
    }

  }.bind(this));

   _isDragable.call(this);


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
