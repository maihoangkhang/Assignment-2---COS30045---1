// Exercise 5.3: Donut Chart
// Diligent student scaffold

const size = 440;
const radius = size / 2;

// Step 1: Create square SVG and shift origin (0,0) to center
const svg = d3.select("#donut-chart")
  .append("svg")
  .attr("viewBox", `0 0 ${size} ${size}`);

const chartArea = svg.append("g")
  .attr("transform", `translate(${radius}, ${radius})`);

// Step 2: Load data and aggregate
d3.csv("data/tv_models.csv", d => ({
  sizeGroup: d.size_group
})).then(rawData => {
  const countMap = d3.rollup(rawData, v => v.length, d => d.sizeGroup);

  // Preserve natural order: small -> medium -> large
  const sizeOrder = ["small", "medium", "large"];
  const donutData = sizeOrder.map(group => ({
    group: group,
    count: countMap.get(group) || 0
  }));

  const totalCount = d3.sum(donutData, d => d.count);
  console.log("Donut Data:", donutData, "Total:", totalCount);

  drawDonut(donutData, totalCount);
});

function drawDonut(data, total) {
  // Step 3: Color palette for categories
  const colorScale = d3.scaleOrdinal()
    .domain(["small", "medium", "large"])
    .range(["#8da0cb", "#fc8d62", "#66c2a5"]);

  // Step 4: D3 Pie Layout (computes angles)
  const pieGenerator = d3.pie()
    .value(d => d.count)
    .sort(null); // Keep array order intact

  const pieSlices = pieGenerator(data);

  // Step 5: D3 Arc Generator (converts angles to path strings)
  // Non-zero innerRadius turns a pie chart into a donut chart!
  const arcGenerator = d3.arc()
    .innerRadius(105)
    .outerRadius(185)
    .padAngle(0.02)
    .cornerRadius(4);

  // Step 6: Render slice paths
  const slices = chartArea.selectAll("path.slice")
    .data(pieSlices)
    .join("path")
    .attr("class", "slice")
    .attr("d", arcGenerator)
    .attr("fill", d => colorScale(d.data.group));

  // Step 7: Slice Labels positioned at arc centroid
  chartArea.selectAll(".slice-text-group")
    .data(pieSlices)
    .join("text")
    .attr("class", "slice-text-group")
    .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
    .call(text => text.append("tspan")
      .attr("x", 0)
      .attr("dy", "-0.2em")
      .text(d => d.data.group.toUpperCase()))
    .call(text => text.append("tspan")
      .attr("x", 0)
      .attr("dy", "1.3em")
      .text(d => d3.format(".1%")(d.data.count / total)));

  // Step 8: Center Hole Metric Text
  chartArea.append("text")
    .attr("class", "center-total")
    .attr("dy", "-0.1em")
    .text(d3.format(",")(total));

  chartArea.append("text")
    .attr("class", "center-label")
    .attr("dy", "1.4em")
    .text("Total TVs");
}
