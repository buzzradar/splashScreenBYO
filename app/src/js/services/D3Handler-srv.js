/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('./A01_DisplayGlobals-srv'); 
const LogoVendor_CTRL = require('../controllers/preview/logoVendor-ctrl');
const Buttons_CTRL = require('../controllers/preview/buttons-ctrl');
const Dividers_CTRL = require('../controllers/preview/dividers-ctrl');
const Copy_CTRL = require('../controllers/preview/copy-ctrl');



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
  this.updatingGroup = null;
  this.legendCirclesArray =[];

  _createSVG.call(this, target);

}














function _createSVG(target) {


  var targetSelection = d3.select(target.get(0));
  this.svgContainer = targetSelection.append("svg")
  .attr("width", 1920)
  .attr("height", 1080)


}



D3Handler_CTRL.prototype.loadBGImage = function () {

  var urlImage = DisplayGlobals_SRV.getMasterConfig().AppSplash.backImage.url;

  this.bg = this.svgContainer.append("image")
    .on('load', function() {
         //I remove the listener we do not need it any longer
         d3.select(this).on('load',null);
    })
    .on('error', function() {
         //I remove the listener we do not need it any longer
         d3.select(this).on('error',null);
    })
    .attr("xlink:href", urlImage)
    .attr("width", 1920)
    .attr("height", 1080);

}


D3Handler_CTRL.prototype.updateBGImage = function () {

  var imgObject = DisplayGlobals_SRV.getMasterConfig().AppSplash.backImage.url;

  this.bg
    .attr("xlink:href", imgObject);

};







D3Handler_CTRL.prototype.loadVendorLogo = function () {

  var logoMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.vendorLogo;

  this.logoVendor = new LogoVendor_CTRL(this.svgContainer, logoMO);

  DisplayGlobals_SRV.setLogoVendorRef(this.logoVendor);

}


D3Handler_CTRL.prototype.updateLogoImage = function () {

  var imgObject = DisplayGlobals_SRV.getMasterConfig().AppSplash.vendorLogo;
  this.logoVendor.updateLogo(imgObject);

}





D3Handler_CTRL.prototype.loadCopy = function () {

  this.copy = new Copy_CTRL(this.svgContainer);
  DisplayGlobals_SRV.setCopyRef(this.copy);

}




D3Handler_CTRL.prototype.loadLine = function () {

  this.dividers = new Dividers_CTRL(this.svgContainer);

}




D3Handler_CTRL.prototype.loadButtons = function () {

  this.buttons = new Buttons_CTRL(this.svgContainer);
  DisplayGlobals_SRV.setButtonsRef(this.buttons);

}







D3Handler_CTRL.prototype.drawLegendOnTop = function (buttonsArrayMO) {

  let _this = this;
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

    this.legendCirclesArray.push(c);

    circleBtnGroup.on("click", function() {
      let id = $(this).data('id');
      DisplayGlobals_SRV.getEditorRef().loadFormSettings(id);
      _this.selectLegendItem(id);
    })

  }.bind(this));


}





D3Handler_CTRL.prototype.selectLegendItem = function (id) {

  var legendBtn = this.legendCirclesArray[id-1];

  //Change all buttons to deselect state
  for (var i = 0; i < this.legendCirclesArray.length; i++) {
    this.legendCirclesArray[i].style("fill", '#c0c0c0');
  }

  //Change color to selected state (blue)
  legendBtn.style("fill", '#3598DC');

}






D3Handler_CTRL.prototype.showLoader = function (label) {

  if (!this.updatingGroup) {

    this.updatingGroup = this.svgContainer.append("g")

    // this.updatingGroup.append("rect")
    //       .attr("x", 0)
    //       .attr("y", 0)
    //       .attr("width", 1920)
    //       .attr("height", 1080)
    //       .attr("fill", 'rgba(0, 0, 0, 0.7)');



    let btnW = 300;
    let btnH = 80;

    this.updatingGroup.append("rect")
          .attr("x", 1920 - btnW - 20)
          .attr("y", 20)
          .attr("width", 300)
          .attr("height", 80)
          .attr("fill", '#67809F')
          .attr("rx", 10)         
          .attr("ry", 10); 


    this.updatingGroup.append("text")
          .attr("text-anchor", "middle")
          .attr("x", 1920 - btnW/2 - 16)
          .attr("y", btnH - 5)
          .text( label )
          .attr("font-family", this.fontFamily)
          .attr("font-size", 42)
          .attr("fill", '#ffffff' );

  }

}



D3Handler_CTRL.prototype.hideLoader = function () {

  if (this.updatingGroup) this.updatingGroup.remove();
  this.updatingGroup = null;

}




D3Handler_CTRL.prototype.updateChanges = function () {

  // console.log("D3: update changes....");

  this.buttons.update();
  this.dividers.update();
  this.copy.update();
  this.logoVendor.update();

}


D3Handler_CTRL.prototype.resetChanges = function () {

  this.buttons.reset();
  this.dividers.reset();
  this.copy.reset();
  this.logoVendor.reset();

}












































module.exports =  D3Handler_CTRL;
