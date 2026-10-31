function drawScatterplot(data) {
    // Set up SVG and Inner Chart
    const svgS = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    innerChartS = svgS.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Calculate Domains
    const maxStar = d3.max(data, d => d.starRating);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    xScaleS.domain([0, maxStar]).range([0, width]);
    yScaleS.domain([0, maxEnergy]).range([height, 0]);

    // Define Categories for Color Scale exactly as shown
    colorScale
        .domain(data.map(d => d.screenTech)) // Get unique screenTech values
        .range(d3.schemeCategory10);

    // Draw Circles
    innerChartS.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScaleS(d.starRating))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 5)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.6);

    // Draw Axes
    const xAxisS = d3.axisBottom(xScaleS);
    innerChartS.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxisS);

    const yAxisS = d3.axisLeft(yScaleS);
    innerChartS.append("g").call(yAxisS);

    // Add a legend for the color scale matching the reference image
    const legend = svgS
        .append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`); 

    // Loop through the color scale domain to create legend entries
    colorScale.domain().forEach((screenTech, i) => {
        
        // Create a group for each legend entry
        const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`); 

        // Add a colored rectangle for each screenTech
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        // Add text next to the rectangle
        legendRow.append("text")
            .attr("x", 20) 
            .attr("y", 10) 
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech); 
    });

    // Add Axis Labels
    svgS.append("text")
        .attr("text-anchor", "end")
        .attr("x", width + margin.left)
        .attr("y", height + margin.top + 40)
        .text("Star Rating");

    svgS.append("text")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left / 3)
        .attr("x", -(margin.top))
        .text("Labeled Energy Consumption (kWh/year)");
}