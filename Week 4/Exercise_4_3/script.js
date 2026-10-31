// Exercise 4.3: D3 Setup
// Defines standard reusable dimensions and establishes the SVG canvas

// Step 1: Declare standard dimension variables
const width = 900;
const height = 400;

// Step 2: Append the SVG canvas inside the responsive container
// Using viewBox allows CSS (width: 100%) to scale the SVG to any screen size
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("background-color", "#ffffff")
  .style("border", "1px solid #ccc");

// Step 3: Draw a test element to confirm setup is functional
svg.append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 300)
  .attr("height", 40)
  .attr("fill", "#20b2aa");

svg.append("text")
  .attr("x", 60)
  .attr("y", 75)
  .attr("fill", "#ffffff")
  .attr("font-size", "16px")
  .text("Canvas setup verified (900 x 400)");

console.log("Exercise 4.3 setup complete.");
