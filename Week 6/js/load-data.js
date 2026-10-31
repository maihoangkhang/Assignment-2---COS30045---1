// Load the dataset and trigger the drawing functions
d3.csv("data/tv_data.csv", d => {
    return {
        brand: d.brand,
        model: d.model,
        starRating: +d.star,
        energyConsumption: +d.energyConsumption,
        screenTech: d.screenTech,
        screenSize: +d.screenSize
    };
}).then(data => {
    console.log("Data loaded successfully:", data);
    
    // UI and Filters
    populateFilters(data);
    
    // Draw Charts FIRST
    drawHistogram(data);
    drawScatterplot(data); 
    
    // Attach Tooltips and Interactions AFTER charts are drawn
    createTooltip(data);
    handleMouseEvents();
    
}).catch(error => {
    console.error("Error loading the data:", error);
});