var w = 500,
  h = 500;

var colorscale = d3.scale.category10();


//Data
var d = [
      [
      {axis:"teaching score",value:0.956},
      {axis:"international students score",value:0.64},
      {axis:"research score",value:0.976},
      {axis:"citations score",value:0.998},
      {axis:"income score",value:0.978}

      ],[
      {axis:"teaching score",value:0.865},
      {axis:"international students score",value:0.865},
      {axis:"research score",value:0.989},
      {axis:"citations score",value:0.988},
      {axis:"income score",value:0.731}
      ]
    ];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);


// From Paul Glenn - dropdown menus

var dispatch = d3.dispatch("load", "statechange1", "statechange2");
d3.csv("timesData.csv", function(error, univs) {
  if (error) throw error;
  var univById = d3.map();
  univs.forEach(function(data) { univById.set(data.university_name, data); });
  dispatch.load(univById);
  dispatch.statechange1(univById.get("California Institute of Technology"));
  dispatch.statechange2(univById.get("University of Oxford"));
});

dispatch.on("load.menu", function(univById) {
  // University 1 legend box
  d3.select("#legend")
    .append("br")
    .attr("style", "clear:both");

  var legend1 = d3.select("#legend")
    .append("div")
    .attr("style", "float: left; height: 20px; width: 20px;")
    .append("svg")
    .attr("width", 10)
    .attr("height", 10)
    .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "#1F77B4")
    .attr("id", "legend1")


  // University 1 Selector
  var select1 = d3.select("#legend")
  .append("div")
  .attr("style", "float: left; height: 50px;")
  .append("select")
  .attr("id", "select1")
  .on("change", function() { dispatch.statechange1(univById.get(this.value)); });

  select1.selectAll("option")
  .data(univById.values())
  .enter()
  .append("option")
  .attr("value", function(d) { return d.university_name; })
  .text(function(d) { return d.world_rank + ". " + d.university_name; });

  // Line break between selection boxes
  d3.select("#legend")
    .append("br")
      .attr("style", "clear:both");

  // University 2 selection box
  var legend2 = d3.select("#legend")
  .append("div")
  .attr("style", "float: left; height: 20px; width: 20px;")
  .append("svg")
  .attr("width", 10)
  .attr("height", 10)
  .append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "#FF7F0E")
  .attr("id", "legend2")

  var select2 = d3.select("#legend")
  .append("div")
  .attr("style", "float: left; height: 50px;")
  .append("select")
  .attr("id", "select2")
  // .classed("chzn-select", true)
  .on("change", function() { dispatch.statechange2(univById.get(this.value)); });


  select2.selectAll("option")
  .data(univById.values())
  .enter()
  .append("option")
  .attr("value", function(d) { return d.university_name; })
  .text(function(d) { return d.world_rank + ". " + d.university_name; });  


  // Change of state on university 1
  dispatch.on("statechange1.menu", function(univ) {
    select1.property("value", univ.university_name);

    d[0] = [
    {axis:"teaching score",value:univ.teaching/100},
    {axis:"international students score",value:univ.international/100},
    {axis:"research score",value:univ.research/100},
    {axis:"citations score",value:univ.citations/100},
    {axis:"income score",value:univ.income/100}
    ];
  });

  dispatch.on("statechange2.menu", function(univ) {
    select2.property("value", univ.university_name);

    d[1] = [
    {axis:"teaching score",value:univ.teaching/100},
    {axis:"international students score",value:univ.international/100},
    {axis:"research score",value:univ.research/100},
    {axis:"citations score",value:univ.citations/100},
    {axis:"income score",value:univ.income/100}
    ];
  });


  dispatch.on("statechange1.radar", function(x) {
  // University 1 legend box
  RadarChart.draw("#chart", d, mycfg);
  });

  dispatch.on("statechange2.radar", function(x) {
  // University 2 legend box
  RadarChart.draw("#chart", d, mycfg);
  });

});





