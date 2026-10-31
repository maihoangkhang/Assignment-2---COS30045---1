// Exercise 5.1: Vertical Bar Chart with Axes
// Diligent student scaffold

// Step 1: Margin Convention
const margin = { top: 40, right: 30, bottom: 60, left: 70 };
const width = 800;
const height = 450;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Create SVG and inner chart group
const svg = d3.select("#bar-chart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`);

const chartArea = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 2: Load and aggregate data
d3.csv("data/tv_models.csv", d => ({
  tech: d.screen_tech,
  energy: +d.energy_kwh_year
})).then(rawData => {
  // Group by technology and calculate mean energy
  const rolledUpMap = d3.rollup(
    rawData,
    v => d3.mean(v, d => d.energy),
    d => d.tech
  );

  // Convert map to array of objects and sort descending
  const data = Array.from(rolledUpMap, ([tech, meanEnergy]) => ({
    tech: tech,
    meanEnergy: meanEnergy
  })).sort((a, b) => b.meanEnergy - a.meanEnergy);

  console.log("Aggregated Tech Data:", data);
  renderVerticalBarChart(data);
});

function renderVerticalBarChart(data) {
  // Step 3: Scales
  // X: Categorical band scale for screen technologies
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.tech))
    .range([0, innerWidth])
    .padding(0.35);

  // Y: Linear scale for energy consumption (inverted range for SVG)
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.meanEnergy)])
    .range([innerHeight, 0])
    .nice();

  // Step 4: Axes
  // X Axis positioned at the bottom of chartArea
  chartArea.append("g")
    .attr("class", "axis-x")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));

  // Y Axis positioned on the left
  chartArea.append("g")
    .attr("class", "axis-y")
    .call(d3.axisLeft(yScale));

  // Y-axis Title Label
  chartArea.append("text")
    .attr("class", "axis-title")
    .attr("x", -10)
    .attr("y", -15)
    .attr("text-anchor", "start")
    .text("Average Energy (kWh / Year)");

  // Step 5: Draw Vertical Bars
  chartArea.selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.tech))
    // In SVG, y is the top edge of the bar
    .attr("y", d => yScale(d.meanEnergy))
    .attr("width", xScale.bandwidth())
    // Height is the distance from y down to innerHeight
    .attr("height", d => innerHeight - yScale(d.meanEnergy))
    .attr("fill", "#2e4a5e")
    .attr("rx", 3);

  // Step 6: Direct value labels on top of each bar
  chartArea.selectAll(".bar-value-label")
    .data(data)
    .join("text")
    .attr("class", "bar-value-label")
    .attr("x", d => xScale(d.tech) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.meanEnergy) - 8)
    .text(d => `${Math.round(d.meanEnergy)} kWh`);
}
