/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 
const d3 = require("d3");
const LogoVendor_CTRL = require('../controllers/preview/logoVendor-ctrl');
const Buttons_CTRL = require('../controllers/preview/buttons-ctrl');



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function D3Handler_CTRL (target) {

  this.svgContainer = null;
  this.fontFamily = "Helvetica, Arial, sans-serif";
  this.bg = null;
  this.logoVendor = null;
  this.copy = null;
  this.dividers  = null;

  _createSVG.call(this, target);

}














function _createSVG(target) {


  var targetSelection = d3.select(target.get(0));
  this.svgContainer = targetSelection.append("svg")
  .attr("width", 1920)
  .attr("height", 1080)


}



D3Handler_CTRL.prototype.loadBGImage = function (urlImage, onImageLoaded) {

  this.bg = this.svgContainer.append("image")
    .on('load', function() {
         onImageLoaded();
    })
    .attr("xlink:href", urlImage)
    .attr("width", 1920)
    .attr("height", 1080);

}










D3Handler_CTRL.prototype.loadVendorLogo = function (logoMO, onLogoLoaded) {

  this.logoVendor = new LogoVendor_CTRL(this.svgContainer, logoMO, onLogoLoaded);

}








D3Handler_CTRL.prototype.loadCopy = function (copyArrayMO) {

  let d3copyData = [];

  $.each( copyArrayMO, function( key, item ) {

    let obj = {
      cx : 1920/2,
      cy : item.y + item.size,             //I have to add a small offset cause d3 text y anchor position is on the bottom.
      color : item.colour,
      visible : item.visible,
      size : item.size,
      width : item.width,
      weight : item.weight,
      copy : item.copy,
    }
    d3copyData.push(obj);

  });

  let text = this.svgContainer.selectAll("text")
      .data(d3copyData)
      .enter()
      .append("text");

  this.copy = text
      .attr("text-anchor", "middle")
      .attr("x", function(d) { return d.cx; })
      .attr("y", function(d) { return d.cy; })
      .text( function (d) { return d.copy })
      .attr("font-family", this.fontFamily)
      .attr("font-size", function(d) { return d.size; })
      .attr("fill", function(d) { return '#'+d.color; });

}




D3Handler_CTRL.prototype.loadLine = function (linesArrayMO) {

  let d3lineData = [];

  $.each( linesArrayMO, function( key, item ) {

    let obj = {
      x1 : item.x,
      y1 : item.y,
      x2 : item.x + item.width,
      y2 : item.y + item.height,
      visible : item.visible,
      color : item.colour,
      width : item.width,
      height : item.height,
    }
    d3lineData.push(obj);

  });

  let line = this.svgContainer.selectAll("line")
      .data(d3lineData)
      .enter()
      .append("line");

  line
      .attr("x1", function(d) { return d.x1; })
      .attr("y1", function(d) { return d.y1; })
      .attr("x2", function(d) { return d.x2; })
      .attr("y2", function(d) { return d.y2; })
      .attr("stroke-width", function(d) { return d.height; })
      .attr("stroke", function(d) { return '#' + d.color; });


}




D3Handler_CTRL.prototype.loadButtons = function (buttonsArrayMO) {

  this.buttons = new Buttons_CTRL(this.svgContainer, buttonsArrayMO);

}







D3Handler_CTRL.prototype.drawLegendOnTop = function (buttonsArrayMO) {

  let legendOnTop = this.svgContainer.append("g")

  $.each( buttonsArrayMO, function( key, button ) {

    let circleBtnGroup = legendOnTop.append("g")
        .style('cursor', 'pointer')
        .attr('data-id', key+1)

    var c = circleBtnGroup.append("circle")
        .attr("cx", button.cx)
        .attr("cy", button.cy)
        .attr("r", button.radius)
        .style("fill", button.fill)

    circleBtnGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("x", button.cx)
        .attr("y", button.cy + 15)
        .text(button.index)
        .attr("font-family", this.fontFamily)
        .attr("font-size", 40)
        .attr("fill", '#ffffff')


    circleBtnGroup.on("click", function() {
      let id = $(this).data('id');
      DisplayGlobals_SRV.getEditorRef().loadFormSettings(id);
    })

  }.bind(this));

}










module.exports =  D3Handler_CTRL;
