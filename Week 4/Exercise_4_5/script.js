// Exercise 4.5: D3 Binding and Drawing with Data
// Diligent student scaffold

const width = 1000;
const height = 520;

const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("background-color", "#ffffff")
  .style("border", "1px solid #ddd");

// Load the data
d3.csv("data/tv_star_counts.csv", d => {
  return {
    star: d.Star2,
    count: +d["Count(Star2)"],
    meanEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
  };
}).then(data => {
  console.log("Data for bar chart:", data);
  drawBars(data);
}).catch(err => {
  console.error("Failed to load data:", err);
});

function drawBars(data) {
  const barHeight = 26;
  const barSpacing = 8;
  const leftMargin = 30;

  // Step 1: Select all rectangles (even though none exist yet)
  // Step 2: Bind the data array
  // Step 3: Join creates one <rect> for each item in the data array
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    // Step 4: Position each bar using its index 'i'
    .attr("x", leftMargin)
    .attr("y", (d, i) => i * (barHeight + barSpacing) + 30)
    // Step 5: Width is directly tied to data value d.count
    // (Notice: raw count works here because max is 972 and SVG width is 1000)
    .attr("width", d => d.count)
    .attr("height", barHeight)
    // Step 6: Highlight 5.0 star TVs with brand color, others neutral
    .attr("fill", d => d.star === "5.0" ? "#2980b9" : "#bdc3c7");
}
