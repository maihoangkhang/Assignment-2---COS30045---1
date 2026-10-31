// Exercise 4.4: Load Data from CSV
// Diligent student scaffold

const width = 900;
const height = 480;

const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("background-color", "#ffffff")
  .style("border", "1px solid #ddd");

// Helper function to render status text lines in the SVG
function printLine(text, lineIndex, color = "#2c3e50") {
  svg.append("text")
    .attr("x", 30)
    .attr("y", 50 + lineIndex * 38)
    .attr("font-size", "18px")
    .attr("font-family", "Arial, sans-serif")
    .attr("fill", color)
    .text(text);
}

// Step 1: Load the CSV file asynchronously.
// Provide a row conversion function to parse strings into numbers with the '+' operator.
d3.csv("data/tv_star_counts.csv", d => {
  return {
    star: d.Star2,                                                 // Category stays string
    count: +d["Count(Star2)"],                                     // Convert to number
    meanEnergy: +d["Mean(Labelled energy consumption (kWh/year))"] // Convert to number
  };
}).then(data => {
  console.log("Data loaded successfully!", data);

  // Step 2: Use D3 array helper functions for summary statistics
  const rowCount = data.length;
  const totalModels = d3.sum(data, d => d.count);
  const maxCount = d3.max(data, d => d.count);
  const minCount = d3.min(data, d => d.count);
  const mostCommonStar = d3.greatest(data, d => d.count).star;
  const energyExtent = d3.extent(data, d => d.meanEnergy); // [min, max]

  // Print results to browser console for inspection
  console.log(`Total rows: ${rowCount}`);
  console.log(`Total TV models: ${totalModels}`);
  console.log(`Max models in a rating: ${maxCount}`);
  console.log(`Min models in a rating: ${minCount}`);
  console.log(`Most common star rating: ${mostCommonStar}`);
  console.log(`Energy extent:`, energyExtent);

  // Step 3: Display results on page inside the SVG
  printLine("✓ CSV Data Loaded Successfully via d3.csv()", 0, "#27ae60");
  printLine(`1. Number of star categories: ${rowCount}`, 1);
  printLine(`2. Total TV models sampled: ${totalModels}`, 2);
  printLine(`3. Highest count in one category: ${maxCount} models`, 3);
  printLine(`4. Lowest count in one category: ${minCount} models`, 4);
  printLine(`5. Most frequent rating: ${mostCommonStar} Stars`, 5);
  printLine(`6. Mean energy consumption range: ${energyExtent[0]} to ${energyExtent[1]} kWh/year`, 6);
  printLine("Check browser console (F12) to inspect the full data array.", 7, "#7f8c8d");

}).catch(error => {
  console.error("Error loading CSV file:", error);
  printLine("Error loading CSV file!", 0, "#c0392b");
  printLine("Make sure you are running a local server (like VS Code Live Server).", 1, "#c0392b");
});
