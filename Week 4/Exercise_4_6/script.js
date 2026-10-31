// Exercise 4.6: Scaling Charts
// Diligent student scaffold

const width = 900;
const height = 480;

const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("background-color", "#ffffff")
  .style("border", "1px solid #ddd");

d3.csv("data/tv_star_counts.csv", d => ({
  star: d.Star2,
  count: +d["Count(Star2)"]
})).then(data => {
  drawScaledChart(data);
});

function drawScaledChart(data) {
  // Chart inner boundaries
  const chartWidth = 700;
  const chartHeight = 400;
  const xOffset = 50;
  const yOffset = 40;

  // 1. Linear Scale for the continuous count values
  // Domain: [0, max data count] -> Range: [0, available pixel width]
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, chartWidth]);

  // 2. Band Scale for categorical star ratings
  // Domain: array of star category names -> Range: [0, available pixel height]
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.star))
    .range([0, chartHeight])
    .padding(0.2); // 20% padding between bars

  // 3. Render bars using the scales
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", xOffset)
    // yScale takes the category name and returns the exact top y-coordinate
    .attr("y", d => yOffset + yScale(d.star))
    // xScale converts the data count into exact pixel width
    .attr("width", d => xScale(d.count))
    // bandwidth() returns the exact calculated thickness of each bar
    .attr("height", yScale.bandwidth())
    .attr("fill", d => d.star === "5.0" ? "#2980b9" : "#95a5a6");
}
