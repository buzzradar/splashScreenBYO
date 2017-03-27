/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Utils_SRV = require('../../services/Utils-srv');



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Copy_CTRL (svg) {

    this.svgContainer = svg;
    this.fontFamily = "Helvetica, Arial, sans-serif";


  _createGroup.call(this);

}








function _createGroup() {

  this.allCopyGroup = this.svgContainer.append("g");

  _loadCopy.call(this);

}





function _loadCopy() {

  var _self = this;

  this.copyArrayMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.copy;

  $.each( this.copyArrayMO, function( key, item ) {

    item.deleted = Utils_SRV.getJsonVal(false, item.deleted, "BOOLEAN");

    if (!item.deleted) {

      var copyText = [item.copy];

      console.log(item.copy);

      this.allCopyGroup.selectAll("text").data(copyText).enter().append("text")
        .attr('x', Number(item.x))
        .attr('y', function(d, i){ return Number(item.y)+(30 + i * 90); })
        .attr("font-size", Number(item.size) )
        .attr("fill", '#'+item.colour)
        .text(function(d){ return d; })
        //We use this function to wrap the text within the given width.
        .call(_wrapCopyWidth, Number(item.width));

    }

  }.bind(this));

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





module.exports =  Copy_CTRL;
