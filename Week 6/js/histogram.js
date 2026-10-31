function drawHistogram(data) {
    // 1. Set up the SVG container and inner chart
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // 2. Generate bins
    const bins = binGenerator(data);
    console.log("Generated bins:", bins);

    // 3. Set Scale Domains
    const minBin = bins[0].x0;
    const maxBin = bins[bins.length - 1].x1;
    const maxFrequency = d3.max(bins, d => d.length);

    xScale.domain([minBin, maxBin])
          .range([0, width]);

    yScale.domain([0, maxFrequency])
          .range([height, 0]);

    // 4. Draw bars
    innerChart.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr("height", d => height - yScale(d.length))
        .attr("fill", barColor);

    // 5. Draw axes
    const xAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .call(yAxis);

    // Axis labels
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", height + margin.top + 40)
        .text("Energy Consumption (kWh)");

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left / 3)
        .attr("x", -(margin.top + height / 2))
        .text("Frequency");
}