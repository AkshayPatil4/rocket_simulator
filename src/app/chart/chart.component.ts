import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../services/data.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
  selectedChart: string = 'line'; // Default chart
  private data: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    d3.csv('assets/data.csv').then(data => {
      const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S.%L %Z');
      this.data = data.map(d => ({
        ...d,
        'Formatted Date': parseTime(d['Formatted Date']),
        'Temperature (C)': +d['Temperature (C)'],
        'Apparent Temperature (C)': +d['Apparent Temperature (C)'],
        'Wind Speed (km/h)': +d['Wind Speed (km/h)'],
        'Precip Type': d['Precip Type'],
      }));

      this.createChart(); // Create default chart on load
    });
  }

  onChartSelect(): void {
    d3.select('#chart').selectAll('*').remove(); // Clear existing chart
    this.createChart();
  }

  private createChart(): void {
    switch (this.selectedChart) {
      case 'line':
        this.createLineChart();
        break;
      case 'histogram':
        this.createHistogram();
        break;
      case 'pie':
        this.createPieChart();
        break;
      case 'scatter':
        this.createScatterPlot();
        break;
    }
  }

  // Line Chart: Temperature over Time
 // Line Chart: Temperature over Time with Hover Detection and Axis Labels
private createLineChart(): void {
  const svg = d3.select('#chart').append('svg').attr('width', 800).attr('height', 500);
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };  // Adjusted margins to fit labels
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - margin.top - margin.bottom;

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // Filter and ensure data is valid
  const filteredData = this.data.filter(d => d['Formatted Date'] !== null && !isNaN(d['Formatted Date'].getTime()));

  // Set the domains for the axes
  x.domain(d3.extent(filteredData, (d: any) => d['Formatted Date']) as [Date, Date]);
  y.domain([0, d3.max(filteredData, (d: any) => +d['Temperature (C)'])!]);

  // Create the line path
  const line = d3.line()
    .x((d: any) => x(d['Formatted Date']))
    .y((d: any) => y(d['Temperature (C)']));

  // Add the line path
  g.append('path')
    .datum(filteredData)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line);

  // Add X and Y axis
  g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
  g.append('g').call(d3.axisLeft(y));

  // Add axis labels
  g.append('text')
    .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`)
    .style('text-anchor', 'middle')
    .attr('fill', 'White')
    .text('Date');  // X-axis label

  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left + 15)
    .attr('x', 0 - height / 2)
    .style('text-anchor', 'middle')
    .attr('fill', 'White')
    .text('Temperature (C)');  // Y-axis label

  // Create a circle for tooltip interaction
  const focusCircle = g.append('circle')
    .attr('r', 5)
    .attr('fill', 'Darkblue')
    .style('visibility', 'hidden');

  // Create tooltip div
  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '6px')
    .style('background', 'lightsteelblue')
    .style('border-radius', '4px')
    .style('visibility', 'hidden');

  // Create an overlay rectangle for hover detection
  g.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseover', () => {
      focusCircle.style('visibility', 'visible');
      tooltip.style('visibility', 'visible');
    })
    .on('mousemove', (event: MouseEvent) => {
      const mouse = d3.pointer(event);
      const xDate = x.invert(mouse[0]);

      // Find the nearest data point
      const bisect = d3.bisector((d: any) => d['Formatted Date']).left;
      const index = bisect(filteredData, xDate, 1);
      const d0 = filteredData[index - 1];
      const d1 = filteredData[index];
      const d = xDate.getTime() - d0['Formatted Date'].getTime() > d1['Formatted Date'].getTime() - xDate.getTime() ? d1 : d0;

      // Update the circle and tooltip position
      focusCircle
        .attr('cx', x(d['Formatted Date']))
        .attr('cy', y(d['Temperature (C)']));

      tooltip
        .html(`Date: ${d3.timeFormat('%Y-%m-%d')(d['Formatted Date'])}<br>Temp: ${d['Temperature (C)']} °C`)
        .style('top', (event.pageY - 10) + 'px')
        .style('left', (event.pageX + 10) + 'px');
    })
    .on('mouseout', () => {
      focusCircle.style('visibility', 'hidden');
      tooltip.style('visibility', 'hidden');
    });

  // Add Legend
  svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width - 100}, 30)`)
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', 'steelblue');

  svg.append('text')
    .attr('transform', `translate(${width - 85}, 38)`)
    .attr('fill', 'White')
    .text('Temperature');
}


  // Histogram: Wind Speed Distribution
  // Histogram: Wind Speed Distribution with Text Labels and Hover Effect
// Histogram: Wind Speed Distribution with Detailed Data Labels and Tooltips
private createHistogram(): void {
  const svg = d3.select('#chart').append('svg').attr('width', 800).attr('height', 500);
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };  // Adjusted margins to fit labels
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - margin.top - margin.bottom;

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Prepare the data: Extract wind speed values
  const windSpeeds = this.data.map(d => d['Wind Speed (km/h)']).filter(d => !isNaN(d));
  const totalOccurrences = windSpeeds.length; // Total number of wind speed values

  // Create a linear scale for the X-axis (wind speeds)
  const x = d3.scaleLinear()
    .domain([0, d3.max(windSpeeds)!])  // X-axis domain from 0 to the max wind speed
    .range([0, width]);

  // Create a scale for the Y-axis (frequency of occurrences)
  const y = d3.scaleLinear()
    .range([height- 50, 0]);

  // Create histogram bins (you can adjust the number of bins by changing .thresholds)
  const histogram = d3.histogram()
    .domain(x.domain() as [number, number])
    .thresholds(x.ticks(10));  // Create 10 bins

  const bins = histogram(windSpeeds);  // Generate bins from the data

  // Update Y-axis domain based on the bin frequencies
  y.domain([0, d3.max(bins, bin => bin.length)!]);

  // Add bars for each bin with hover and detailed labels
  const bars = g.selectAll('.bar')
    .data(bins)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.x0!))  // Bin start
    .attr('y', d => y(d.length))  // Height of the bar
    .attr('width', d => x(d.x1!) - x(d.x0!) - 1)  // Calculate width of the bar
    .attr('height', d => height - y(d.length))  // Calculate height of the bar
    .attr('fill', 'steelblue')
    .on('mouseover', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('fill', 'orange')  // Highlight the bar on hover
        .attr('y', y(d.length) - 10)  // Lift the bar up slightly on hover
        .attr('height', height - y(d.length) + 10);  // Increase the bar height slightly

      // Show tooltip with detailed information
      tooltip.html(
        `Wind Speed Range: ${d.x0} km/h - ${d.x1} km/h<br>
         Count: ${d.length}<br>
         Percentage: ${(d.length / totalOccurrences * 100).toFixed(2)}%`)
        .style('visibility', 'visible');
    })
    .on('mousemove', function (event) {
      tooltip
        .style('top', (event.pageY - 10) + 'px')
        .style('left', (event.pageX + 10) + 'px');
    })
    .on('mouseout', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('fill', 'steelblue')  // Return to original color
        .attr('y', y(d.length))  // Reset bar position
        .attr('height', height - y(d.length));  // Reset bar height

      // Hide tooltip
      tooltip.style('visibility', 'hidden');
    });

  // Add a tooltip for displaying additional data
  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '6px')
    .style('background', 'lightsteelblue')
    .style('border-radius', '4px')
    .style('visibility', 'hidden');

  // Add text labels above each bar with wind speed range and count
  g.selectAll('.label')
    .data(bins)
    .enter().append('text')
    .attr('class', 'label')
    .attr('x', d => (x(d.x0!) + x(d.x1!)) / 2)  // Position the label at the center of the bar
    .attr('y', d => y(d.length) - 5)  // Position above the bar
    .attr('text-anchor', 'middle')
    .text(d => `${d.x0} - ${d.x1} km/h : ${d.length}`)  // Display the wind speed range and count
    .style('fill', 'white')
    .style('font-size', '12px');

  // Add X-axis to the bottom
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Add Y-axis to the left
  g.append('g').call(d3.axisLeft(y));

  // Add X-axis label (Wind Speed)
  g.append('text')
    .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`)
    .style('text-anchor', 'middle')
    .style('fill', 'white')
    .text('Wind Speed (km/h)');  // X-axis label

  // Add Y-axis label (Frequency)
  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left + 15)
    .attr('x', 0 - height / 2)
    .style('text-anchor', 'middle')
    .style('fill', 'white')
    .text('Frequency');  // Y-axis label

  // Add title or legend to indicate that each bar represents the frequency of wind speed ranges
  
}


  // Pie Chart: Precipitation Type Count
  // Pie Chart: Precipitation Type Count with Hover Effect, Smaller Pie, and Shorter Legend Lines
private createPieChart(): void {
  const svg = d3.select('#chart').append('svg').attr('width', 800).attr('height', 500);
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  
  // Adjust the radius to make the pie smaller
  const radius = Math.min(width, height) / 3;  // Reduce the radius for a smaller pie
  const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

  // Prepare the data
  const precipData = d3.rollup(this.data, v => v.length, d => d['Precip Type']);
  const total = d3.sum(Array.from(precipData.values()));  // Total number of data points

  // Create pie chart generator
  const pie = d3.pie<any>().value(d => d[1]);
  const arc = d3.arc<any>()
    .innerRadius(0)
    .outerRadius(radius);

  // Create hover arc generator (larger radius on hover)
  const arcHover = d3.arc<any>()
    .innerRadius(0)
    .outerRadius(radius + 10);  // Slightly increase the radius on hover

  const color = d3.scaleOrdinal().domain(Array.from(precipData.keys())).range(d3.schemeCategory10);

  // Create pie slices
  const slices = g.selectAll('path')
    .data(pie(Array.from(precipData.entries())))
    .enter().append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data[0] as string) as string)  // Ensure value is a string
    .attr('stroke', 'white')
    .attr('stroke-width', '2px')
    .on('mouseover', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arcHover);  // Expand slice on hover
    })
    .on('mouseout', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arc);  // Reset slice size on mouse out
    });

  // Add labels to each slice (for small slices, move label outside and connect with shorter leader lines)
  const labels = g.selectAll('text')
    .data(pie(Array.from(precipData.entries())))
    .enter().append('text')
    .attr('transform', function (d) {
      const pos = arc.centroid(d);
      const midAngle = (d.startAngle + d.endAngle) / 2;
      // Push text outwards for small slices
      const x = Math.cos(midAngle) * (radius + 30);  // Adjust position further out
      const y = Math.sin(midAngle) * (radius + 30);
      return `translate(${x},${y})`;
    })
    .attr('text-anchor', function (d) {
      // Align text differently for slices on left or right
      const midAngle = (d.startAngle + d.endAngle) / 2;
      return midAngle < Math.PI ? 'start' : 'end';
    })
    .text(d => {
      const percentage = ((d.data[1] / total) * 100).toFixed(2);
      return `${d.data[0]}: ${percentage}%`;  // Label with percentage
    })
    .style('fill', 'white')
    .style('font-size', '20px');

  // Add shorter leader lines for labels outside small slices
  g.selectAll('polyline')
    .data(pie(Array.from(precipData.entries())))
    .enter().append('polyline')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('fill', 'none')
    .attr('points', function (d) {
      const posA = arc.centroid(d); // Center of the slice
      const midAngle = (d.startAngle + d.endAngle) / 2;
      const posB = [Math.cos(midAngle) * (radius + 10), Math.sin(midAngle) * (radius + 10)];  // Shorter line just outside slice
      const posC = [Math.cos(midAngle) * (radius + 30), Math.sin(midAngle) * (radius + 30)];  // Label position
      return [posA, posB, posC].map(p => p.join(',')).join(' ');  // Convert array to string for polyline points
    });

  // Add title or legend for pie chart
  svg.append('text')
    .attr('transform', `translate(${width / 2},20)`)
    .style('text-anchor', 'middle')
    .style('font-size', '16px')
    .attr('fill', 'white')
    .text('Precipitation Type Distribution');
}


  // Scatter Plot: Temperature vs Apparent Temperature
  
private createScatterPlot(): void {
  const svg = d3.select('#chart').append('svg').attr('width', 800).attr('height', 500);
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };  // Adjusted margins to fit labels
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - margin.top - margin.bottom;

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Create scales for X and Y axis
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // Set the domain based on data
  x.domain([d3.min(this.data, d => d['Temperature (C)'])!, d3.max(this.data, d => d['Temperature (C)'])!]);
  y.domain([d3.min(this.data, d => d['Apparent Temperature (C)'])!, d3.max(this.data, d => d['Apparent Temperature (C)'])!]);

  // Create tooltip div (initially hidden)
  const tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '6px')
    .style('background', 'lightsteelblue')
    .style('border-radius', '4px')
    .style('visibility', 'hidden');

  // Add scatter plot points (circles)
  g.selectAll('circle')
    .data(this.data)
    .enter().append('circle')
    .attr('cx', d => x(d['Temperature (C)']))
    .attr('cy', d => y(d['Apparent Temperature (C)']))
    .attr('r', 5)
    .attr('fill', 'blue')
    .on('mouseover', function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', 10)  // Expand the circle on hover
        .attr('fill', 'orange');  // Change color on hover

      // Show tooltip
      tooltip.html(`Temperature: ${d['Temperature (C)']}°C<br>Apparent Temperature: ${d['Apparent Temperature (C)']}°C`)
        .style('visibility', 'visible');
    })
    .on('mousemove', function (event) {
      tooltip
        .style('top', (event.pageY - 10) + 'px')
        .style('left', (event.pageX + 10) + 'px');
    })
    .on('mouseout', function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', 5)  // Reset circle size
        .attr('fill', 'blue');  // Reset circle color

      // Hide tooltip
      tooltip.style('visibility', 'hidden');
    });

  // Add X-axis to the bottom
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Add Y-axis to the left
  g.append('g').call(d3.axisLeft(y));

  // Add X-axis label (Temperature (C))
  g.append('text')
    .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`)
    .style('text-anchor', 'middle')
    .attr('fill', 'white')
    .text('Temperature (C)');  // X-axis label

  // Add Y-axis label (Apparent Temperature (C))
  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left + 15)
    .attr('x', 0 - height / 2)
    .style('text-anchor', 'middle')
    .attr('fill', 'white')
    .text('Apparent Temperature (C)');  // Y-axis label
    
}

}