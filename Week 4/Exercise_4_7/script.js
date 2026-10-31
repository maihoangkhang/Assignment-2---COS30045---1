// Exercise 4.7: Adding Labels
// Diligent student scaffold

const width = 900;
const height = 500;

const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("background-color", "#ffffff")
  .style("border", "1px solid #ddd");

d3.csv("data/tv_star_counts.csv", d => ({
  star: d.Star2,
  count: +d["Count(Star2)"]
})).then(data => {
  drawLabeledChart(data);
});

function drawLabeledChart(data) {
  const labelMarginLeft = 90; // Space reserved for category text
  const chartWidth = 720;
  const chartHeight = 440;
  const topMargin = 30;

  // Scales
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, chartWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.star))
    .range([topMargin, topMargin + chartHeight])
    .padding(0.25);

  // Group Pattern: Bind data to a <g> element for each row.
  // Each <g> is translated down to the y-position of that band.
  const barGroups = svg.selectAll(".bar-group")
    .data(data)
    .join("g")
    .attr("class", "bar-group")
    .attr("transform", d => `translate(0, ${yScale(d.star)})`);

  // 1. Draw the bar rectangle inside each group
  barGroups.append("rect")
    .attr("class", "bar")
    .attr("x", labelMarginLeft)
    .attr("y", 0) // Already translated by group
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", d => d.star === "5.0" ? "#2980b9" : "#bdc3c7")
    .attr("rx", 3);

  // 2. Draw category label to the LEFT of the bar
  barGroups.append("text")
    .attr("class", "category-label")
    .attr("x", labelMarginLeft - 10)
    .attr("y", yScale.bandwidth() / 2) // Middle of the bar
    .attr("text-anchor", "end")        // Align text rightwards towards bar
    .attr("dominant-baseline", "middle") // Exact vertical centering
    .text(d => `${d.star} ★`);

  // 3. Draw direct value label to the RIGHT of the bar
  barGroups.append("text")
    .attr("class", "value-label")
    .attr("x", d => labelMarginLeft + xScale(d.count) + 8) // Just past the bar tip
    .attr("y", yScale.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .text(d => d.count);
}
