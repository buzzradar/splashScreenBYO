/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function LogoVendor_CTRL (svg, logoMO) {

	this.svgContainer = svg;
	this.logoMO = logoMO;
  this.isDragable = false;
  this.dottedRect = null;

  _createGroup.call(this);

}





function _createGroup() {


  _loadLogoVendor.call(this);

}








function _loadLogoVendor() {

  let self = this;
  this.logoGroup = this.svgContainer.append("g");

  this.logoGroup 
    .data([ {"x":0, "y":0, initX: this.logoMO.x, initY:this.logoMO.y} ])
    .call(d3.drag()

        .on("drag", function(d,i) {

            if (self.isDragable) {

                d.x += d3.event.dx
                d.y += d3.event.dy

                // console.log(DisplayGlobals_SRV.scaleRatio(d.x) + 510, DisplayGlobals_SRV.scaleRatio(d.y) + 60 )

                let newX = Math.round( DisplayGlobals_SRV.scaleRatio(d.x) + d.initX );
                let newY = Math.round( DisplayGlobals_SRV.scaleRatio(d.y) + d.initY );

                DisplayGlobals_SRV.getEditorRef().updateLogoPosition(newX,newY);
                DisplayGlobals_SRV.getPreviewRef().updateChanges(true);

                d3.select(this).attr("transform", function(d,i){
                    return "translate(" + [ DisplayGlobals_SRV.scaleRatio(d.x) ,DisplayGlobals_SRV.scaleRatio(d.y) ] + ")"
                })

            }
        }));


  this.logo = this.logoGroup.append("image")
    .attr("xlink:href",this.logoMO.url)
    .attr("width", this.logoMO.width)
    .attr("height", this.logoMO.height)
    .attr("x", this.logoMO.x)
    .attr("y", this.logoMO.y)


  this.dottedRect = this.logoGroup.append('rect')
  .attr('x', this.logoMO.x)
  .attr('y', this.logoMO.y)
  .attr('width', this.logoMO.width)
  .attr('height', this.logoMO.height)
  .style("stroke", 'transparent')
  .style("fill", "none")
  .style("stroke-width", 5)
  .style("stroke-dasharray", ("20, 20"))


   _isDragable.call(this);

}




function _isDragable() {

  if (!this.isDragable) {
      // this.dottedRect.style("stroke", 'transparent');
      this.logoGroup.attr('class', '');

   }else{
      // this.dottedRect.style("stroke", '#ffffff');
      this.logoGroup.attr('class', 'draggable');
   }

}




LogoVendor_CTRL.prototype.updateLogo = function (imgObject) {

  this.logo
    .attr("xlink:href", imgObject);

}




LogoVendor_CTRL.prototype.dragable = function (isDragable) {

   this.isDragable = isDragable;
   _isDragable.call(this);


}


LogoVendor_CTRL.prototype.update = function () {

    this.logoGroup.selectAll("*").remove();
    _loadLogoVendor.call(this);

}



LogoVendor_CTRL.prototype.reset = function() {

  this.logoMO = DisplayGlobals_SRV.getMasterConfig().AppSplash.vendorLogo;
  this.update();

}




























module.exports =  LogoVendor_CTRL;
