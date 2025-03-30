import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width = 600, height = 300 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;
  const totalPages = Math.ceil(data.length / logsPerPage);

  const currentLogs = data.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  const svgRef = useRef();

  useEffect(() => {
    if (!currentLogs.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const margin = { top: 20, right: 30, bottom: 10, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain([0, currentLogs.length - 1])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, 3]) 
      .range([innerHeight, 0]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d.level));

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(currentLogs.length));

    g.append("g")
      .call(d3.axisLeft(y).ticks(3).tickFormat((d) => {
        return d === 1 ? "Green" : d === 2 ? "Orange" : "Red";
      }));

    g.append("path")
      .datum(currentLogs)
      .attr("fill", "none")
      .attr("stroke", "#007bff")
      .attr("stroke-width", 2)
      .attr("d", line);

    g.selectAll(".dot")
      .data(currentLogs)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => x(i))
      .attr("cy", (d) => y(d.level))
      .attr("r", 4)
      .attr("fill", "#007bff");
  }, [currentLogs]);

  return (
    <div style={{ gridColumn: "span 2", border: "1px solid #ccc", padding: "10px", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <h2>📈 Flood Risk Trend</h2>
      <svg ref={svgRef} width={width} height={height} style={{ width: '100%', height: '350px' }}></svg>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>◀ Prev</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>Next ▶</button>
      </div>
    </div>
  );
};

export default LineChart;
