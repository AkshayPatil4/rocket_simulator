import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WebSocketService } from '../../services/websocket.service'; // Assume it's already connected

@Component({
  selector: 'app-altitude',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './altitude.component.html',
  styleUrl: './altitude.component.css'
})
export class AltitudeComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  public lineChartData = [
    {
      data: [0], // Always start from 0
      label: 'Altitude (km)',
      borderColor: '#00f1ff',
      borderWidth: 2,
      fill: false,
      tension: 0.4 // Smooth curve for the line
    }
  ];

  public lineChartLabels: string[] = ['Start']; // X-axis labels
  public lineChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    scales: {
      x: {
        type: 'category', // Use category scale for the x-axis
        display: false // Hide x-axis labels
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `${value} km`
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Altitude (km)',
        color: '#8eb6ed',
        font: {
          size: 16
        }
      },
      legend: {
        display: false // Hide the legend
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: (context) => `Altitude: ${context.raw} km`
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: false
    }
  };
  public lineChartType: ChartType = 'line';

  private dataTimeout: any; // To track when the last data came in
  private lastAltitude: number | null = null; // To track the last altitude

  constructor(private wsService: WebSocketService) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.wsService.telemetry$.subscribe((data) => {
      if (data && data.altitude != null) {  // Check if 'altitude' exists and is not null
        const altitudeKm = +(data.altitude / 1000).toFixed(2);

        // Only update chart if new data is different from the last altitude
        if (this.lastAltitude !== altitudeKm) {
          this.lastAltitude = altitudeKm;

          // Add altitude to the chart
          this.lineChartData[0].data.push(altitudeKm);
          this.lineChartLabels.push(''); // Empty label for smooth animation

          // Ensure the first 0-point is not removed
          if (this.lineChartData[0].data.length > 11) {
            this.lineChartData[0].data.splice(1, 1);
            this.lineChartLabels.splice(1, 1);
          }

          // Update the chart with animation
          this.chart.update('none');

          // Reset data timeout when new data arrives
          clearTimeout(this.dataTimeout);
          this.dataTimeout = setTimeout(() => this.pauseAnimation(), 5000); // Pause after 5 seconds of no new data

          // Show the tooltip for the latest data point
          this.showLatestTooltip();
        }
      } else {
        console.warn('No altitude data received:', data);
      }
    });
  }

  // Stop animation when no new data is received
  pauseAnimation() {
    this.chart.update('none'); // Stop the chart animation using the 'none' mode
  }

  // Show the tooltip for the latest data point
  showLatestTooltip() {
    const chartInstance = this.chart.chart;
    const datasetIndex = 0; // Assuming you only have one dataset
    const dataIndex = this.lineChartData[0].data.length - 1; // The last data point

    if (chartInstance && chartInstance.tooltip && chartInstance.getDatasetMeta) {
      const meta = chartInstance.getDatasetMeta(datasetIndex);
      if (meta.data[dataIndex]) {
        const point = meta.data[dataIndex]; // Get the last data point for tooltip

        // Programmatically show the tooltip on the latest data point
        chartInstance.tooltip.setActiveElements(
          [{ datasetIndex, index: dataIndex }],
          { x: point.x, y: point.y } // Provide position for the tooltip
        );
        chartInstance.update('none');
      }
    }
  }
}