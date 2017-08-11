/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const Utils_SRV = require('../../services/Utils-srv');



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function Preloader_CTRL (svg) {

	this.svgContainer = svg;

  this.width = 200;
  this.height = 200;
  this.arcWidth = this.width * 0.1;

  _loadPreloader.call(this);

}











function _loadPreloader() {

  if (DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplay){

    _addBackgroundSolidColor.call(this);
    _addPreloaderGuide.call(this);
    _loadForegroundArc.call(this);
    _loadBackgroundArc.call(this);
    _movePreloaderYOffset.call(this);

  }

}



function _addBackgroundSolidColor() {

  this.bgGroup = this.svgContainer.append("g");
  this.bgGroup.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 1920)
      .attr("height", 1080)
      .attr("fill", "#dbdbdb")
      .attr("opacity", 1)

  //Label of the button
  this.bgGroup.append("text")
      .attr("text-anchor", "middle")
      .attr('alignment-baseline', 'central')
      .attr("x", 1920/2)
      .attr("y", 200)
      .text("Adjust the preloader using the settings on the right. →")
      .attr("font-family", "Helvetica, Arial, sans-serif")
      .attr("font-size", 40)
      .attr("fill", '#444444' );


  //Label of the button
  this.bgGroup.append("text")
      .attr("text-anchor", "middle")
      .attr('alignment-baseline', 'central')
      .attr("x", 1920/2)
      .attr("y", 260)
      .text("This feature is only available for 'Launch as Playlist'.")
      .attr("font-family", "Helvetica, Arial, sans-serif")
      .attr("font-size", 40)
      .attr("fill", '#444444' );
   

}



function _addPreloaderGuide() {

  this.preloaderGroup = this.svgContainer.append("g");
  this.preloaderGroup.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "transparent")

}



function _loadForegroundArc() {

  let foregroundArc = d3.arc()
    .innerRadius(this.width/2 - this.arcWidth)
    .outerRadius(this.width/2)
    .startAngle(0)
    .endAngle(Math.PI)

  this.foregroundPath = this.preloaderGroup.append("path")
      .attr("class", "arc")
      .attr("d", foregroundArc)
      .style("fill", DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.background.colour)

  this.foregroundPath.attr("transform", "translate("+this.width/2+","+this.height/2+")");

}



function _loadBackgroundArc() {

  let backgroundArc = d3.arc()
    .innerRadius(this.width/2 - this.arcWidth)
    .outerRadius(this.width/2)
    .startAngle(Math.PI)
    .endAngle(2 * Math.PI)

  this.backgroundPath = this.preloaderGroup.append("path")
      .attr("class", "arc")
      .attr("d", backgroundArc)
      .style("fill", DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.foreground.colour)

  this.backgroundPath.attr("transform", "translate("+this.width/2+","+this.height/2+")");

}


function _movePreloaderYOffset() {

  let yOffset = Number(DisplayGlobals_SRV.getMasterConfig().AppSplash.autoplaySettings.loader.yOffset);
  let x = 1920/2 - this.width/2;
  let y = 1080/2 - this.height/2 + yOffset;
  this.preloaderGroup.attr("transform", "translate("+x+","+y+")");

}




Preloader_CTRL.prototype.update = function() {

  if (typeof this.preloaderGroup !== 'undefined') {
    this.preloaderGroup.selectAll("*").remove();
    this.bgGroup.selectAll("*").remove();
  }
  //Developer Note: We check if the Flag for Preloader View is true
  //that is activated in the checkbox in Type1  
  if( DisplayGlobals_SRV.getPreloaderFlag() ) _loadPreloader.call(this);
}

Preloader_CTRL.prototype.reset = function() {

}

Preloader_CTRL.prototype.remove = function() {

  this.preloaderGroup.selectAll("*").remove();
  this.bgGroup.selectAll("*").remove();
}






module.exports =  Preloader_CTRL;
