$(function (){

	// js enabled. Hide the "enable your js" alert.
	$('#js-alert').hide();

	// do d3 if on desktop
	if( $('#on-mobile').css('display')=='none') {
		displayD3Charts();
	}
})

function displayD3Charts() {
	d3_myDay();
}

function d3_myDay() {

	var defaultText = "Hover and click to see what happens!";
  	$('#chart1+.tooltip').text(defaultText).css('opacity', 0.5);

	var data = [
		{ label: 'on homework',        count: 8,
			sub: {
				label: '', count: 3
			}},
		{ label: 'in classes',         count: 4 },
		{ label: 'in design critique', count: 1 },
		{ label: 'on Wikipedia',       count: 1 },
		{ label: 'in commuting',       count: 1 },
		{ label: 'eating',             count: 2 },
		{ label: 'sleeping',           count: 7 }
	]

	var canvasWidth = $('#chart1').width();
	var canvasHeight = parseInt($('#chart1').css('height'));
	var width = canvasWidth * 0.7;
	var height = width;

	var radius = Math.min(width, height) / 2;

	var color = d3.scaleOrdinal(d3.schemeCategory20c)
	// var color = d3.scaleOrdinal()
				  // .range(['#ff6666', '#e77', '#bc8282', '#249be5', '#4a8fba', '#668fa8', '#788791']);

	var svg = d3.select('#chart1')
				.append('svg')
				.attr('width', canvasWidth)
				.attr('height', canvasHeight)
				.append('g')
				.attr('transform', 'translate(' + (canvasWidth / 2) +  ',' + (canvasHeight / 2) + ')');

	var arc = d3.arc()
				.innerRadius(radius*0.3)
				.outerRadius(radius);

	var pie = d3.pie()
				.value(function(d) { return d.count; })
				.sort(null);

	var path = svg.selectAll('path')
				  .data(pie(data))
				  .enter()
				  .append('path')
				  .attr('d', arc)
				  .attr('fill', function(d, i) {
					return color(d.data.label);
					})
				  .on('mouseover', function(d) {
					$('#chart1+.tooltip').text("Time spent "+d.data.label+": "+d.data.count+" hours")
										 .css('opacity', 1);
					})
				  .on('mouseout', function() {
				  	$('#chart1+.tooltip').text(defaultText).css('opacity', 0.5);
				  })
				  .on('click', function (){
				  	console.log("wer");

				  });


}