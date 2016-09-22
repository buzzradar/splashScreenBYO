/*jslint node: true, unused: true, esnext: true */


const _ = require("lodash");
const DisplayGlobals_SRV = require('../../services/A01_DisplayGlobals-srv'); 
const d3 = require("d3");



//--------------------------------------
// CONSTRUCTOR
//--------------------------------------



function LogoVendor_CTRL (svg, logoMO, onLogoLoaded) {

	this.svgContainer = svg;
	this.logoMO = logoMO;
	this.onLogoLoaded = onLogoLoaded;

	_loadLogoVendor.call(this);

}














function _loadLogoVendor() {

  let logoGroup = this.svgContainer.append("g")
    .attr('class', 'draggable')
    .data([ {"x":0, "y":0} ])
    .call(d3.behavior.drag()

        .on("drag", function(d,i) {
            d.x += d3.event.dx
            d.y += d3.event.dy

            // console.log(d.x,d.y, DisplayGlobals_SRV.scaleRatio(d.x), DisplayGlobals_SRV.scaleRatio(d.y))

            d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ DisplayGlobals_SRV.scaleRatio(d.x) ,DisplayGlobals_SRV.scaleRatio(d.y) ] + ")"
            })
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



  logoGroup.append('rect')
  .attr('x', this.logoMO.x)
  .attr('y', this.logoMO.y)
  .attr('width', this.logoMO.width)
  .attr('height', this.logoMO.height)
  .style("stroke", '#ffffff')
  .style("fill", "none")
  .style("stroke-width", 5)
  .style("stroke-dasharray", ("20, 20"))


}











module.exports =  LogoVendor_CTRL;
