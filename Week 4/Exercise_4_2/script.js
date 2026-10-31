// Exercise 4.2: Manipulate and add elements to a webpage with D3
// Diligent Student scaffold

// Step 1: Select an existing HTML element and change its styling
d3.select("h1")
  .style("color", "#1f77b4"); // Change heading to blue

d3.select(".intro")
  .style("font-style", "italic")
  .style("color", "#444");

// Step 2: Append a new paragraph element to the container
d3.select("#viz-container")
  .append("p")
  .attr("class", "d3-note")
  .text("This paragraph was inserted dynamically using D3 selection and append!");

// Step 3: Append an SVG canvas inside #viz-container
const svg = d3.select("#viz-container")
  .append("svg")
  .attr("viewBox", "0 0 500 120")
  .attr("width", 500)
  .style("background-color", "#ffffff")
  .style("border", "1px solid #ddd");

// Step 4: Append geometric shapes directly using D3
// A test rectangle
svg.append("rect")
  .attr("x", 30)
  .attr("y", 30)
  .attr("width", 220)
  .attr("height", 60)
  .attr("fill", "#4682b4")
  .attr("rx", 4); // rounded corners

// A test circle
svg.append("circle")
  .attr("cx", 360)
  .attr("cy", 60)
  .attr("r", 35)
  .attr("fill", "#ff7f0e");

// A descriptive text label inside the SVG
svg.append("text")
  .attr("x", 140)
  .attr("y", 65)
  .attr("fill", "white")
  .attr("text-anchor", "middle")
  .attr("font-size", "14px")
  .text("Rect via D3");
