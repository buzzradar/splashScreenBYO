/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
// const d3 = require("d3");



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function LogoVendor_CTRL (svg, logoMO, onLogoLoaded) {

	this.svgContainer = svg;
	this.logoMO = logoMO;
	this.onLogoLoaded = onLogoLoaded;
  this.isDragable = false;
  this.dottedRect = null;

	_loadLogoVendor.call(this);

}














function _loadLogoVendor() {

  let self = this;

  let logoGroup = this.svgContainer.append("g")
    .attr('class', 'draggable')
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

                d3.select(this).attr("transform", function(d,i){
                    return "translate(" + [ DisplayGlobals_SRV.scaleRatio(d.x) ,DisplayGlobals_SRV.scaleRatio(d.y) ] + ")"
                })

            }
        }));


  logoGroup.append("image")
    .on('load', function() {
      this.onLogoLoaded();
    }.bind(this))
    .attr("xlink:href",this.logoMO.url)
    .attr("width", this.logoMO.width)
    .attr("height", this.logoMO.height)
    .attr("x", this.logoMO.x)
    .attr("y", this.logoMO.y)



  this.dottedRect = logoGroup.append('rect')
  .attr('x', this.logoMO.x)
  .attr('y', this.logoMO.y)
  .attr('width', this.logoMO.width)
  .attr('height', this.logoMO.height)
  .style("stroke", 'transparent')
  .style("fill", "none")
  .style("stroke-width", 5)
  .style("stroke-dasharray", ("20, 20"))


}







LogoVendor_CTRL.prototype.dragable = function (isDraggable) {

   this.isDragable = isDraggable;
   if (!isDraggable) {
      this.dottedRect.style("stroke", 'transparent')
   }else{
      this.dottedRect.style("stroke", '#ffffff')
   }

}



































module.exports =  LogoVendor_CTRL;
