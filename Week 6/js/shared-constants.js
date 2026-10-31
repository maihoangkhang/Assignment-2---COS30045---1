// Dimensions and margins for the inner chart
const margin = { top: 30, right: 30, bottom: 50, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Colors
const bodyBackgroundColor = "#ffffff";
const barColor = "#4682b4";

// Global scales for histogram
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Bin generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);

// Filter array (matches instructions)
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Scatterplot globals
let innerChartS;
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal(); 

// Tooltip constants
const tooltipWidth = 65;
const tooltipHeight = 32;