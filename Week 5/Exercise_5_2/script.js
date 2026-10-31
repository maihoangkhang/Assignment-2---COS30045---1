// Exercise 5.2: Scatter Plot and Line Chart
// Diligent student scaffold

const margin = { top: 50, right: 90, bottom: 50, left: 70 };
const width = 900;
const height = 460;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const svg = d3.select("#line-chart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`);

const chartArea = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 1: Load and parse dataset
d3.csv("data/ARE_Spot_Prices.csv", d => ({
  date: new Date(+d.Year, 0, 1), // Jan 1st of each year
  year: +d.Year,
  price: +d["Average Price (notTas-Snowy)"]
})).then(data => {
  console.log("Electricity price data:", data);
  drawLineAndScatter(data);
});

function drawLineAndScatter(data) {
  // Step 2: Scales
  // X: Time scale across year range
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, innerWidth]);

  // Y: Linear scale starting at zero for baseline fidelity
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.price)])
    .range([innerHeight, 0])
    .nice();

  // Step 3: Axes
  chartArea.append("g")
    .attr("class", "axis-x")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(d3.timeYear.every(2)).tickFormat(d3.timeFormat("%Y")));

  chartArea.append("g")
    .attr("class", "axis-y")
    .call(d3.axisLeft(yScale));

  chartArea.append("text")
    .attr("class", "axis-title")
    .attr("x", 0)
    .attr("y", -15)
    .text("Wholesale Price ($ / MWh)");

  // Step 4: Generators
  // Area generator for soft shaded backdrop
  const areaGenerator = d3.area()
    .x(d => xScale(d.date))
    .y0(innerHeight)
    .y1(d => yScale(d.price))
    .curve(d3.curveMonotoneX); // Smooth interpolation

  chartArea.append("path")
    .datum(data)
    .attr("fill", "#e8f5e9")
    .attr("d", areaGenerator);

  // Line generator for trends
  const lineGenerator = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.price))
    .curve(d3.curveMonotoneX);

  chartArea.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#1e7f4f")
    .attr("stroke-width", 2.5)
    .attr("d", lineGenerator);

  // Step 5: Scatter circles for each observed year
  chartArea.selectAll("circle.dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d => xScale(d.date))
    .attr("cy", d => yScale(d.price))
    .attr("r", 4)
    .attr("fill", "#1e7f4f")
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 1.5);

  // Step 6: Direct label at end of line
  const lastPoint = data[data.length - 1];
  chartArea.append("text")
    .attr("class", "line-end-label")
    .attr("x", xScale(lastPoint.date) + 8)
    .attr("y", yScale(lastPoint.price))
    .attr("dominant-baseline", "middle")
    .text("Avg Price");

  // Step 7: Peak callout
  const peakPoint = data.reduce((max, d) => d.price > max.price ? d : max, data[0]);
  chartArea.append("text")
    .attr("class", "callout-text")
    .attr("x", xScale(peakPoint.date))
    .attr("y", yScale(peakPoint.price) - 12)
    .text(`Peak (${peakPoint.year}): $${peakPoint.price.toFixed(2)}`);
}
