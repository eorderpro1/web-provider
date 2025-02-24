import { Component, inject, OnInit } from '@angular/core';
import { ThemeCssVariableService, ThemeCssVariablesType } from '../../../../core/services/theme-css-variable.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { RouterLink } from '@angular/router';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-inventory-and-forecasts',
  standalone: true,
  imports: [
    BaseChartDirective,
    NgApexchartsModule
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  templateUrl: './inventory-and-forecasts.component.html',
  styleUrl: './inventory-and-forecasts.component.scss'
})
export class InventoryAndForecastsComponent implements OnInit {

  public stockPerCategoryOptions: any = {};
  public productStockOptions: any = {};

  private themeCssVariableService = inject(ThemeCssVariableService);
  themeCssVariables = this.themeCssVariableService.getThemeCssVariables();
  ngOnInit(): void {
    const themeCssVariables = this.themeCssVariableService.getThemeCssVariables();
    this.stockPerCategoryOptions = this.getStockPerCategoryOptions(themeCssVariables);
    this.productStockOptions = this.getProductsStockOptions(themeCssVariables);
  }
  /**
   * Stock Προιοντων
   */
  getProductsStockOptions(themeVariables: ThemeCssVariablesType) {
    return {
      series: [{
        name: 'sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
      }],
      chart: {
        type: 'bar',
        height: '320',
        parentHeightOffset: 0,
        foreColor: themeVariables.secondary,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: [themeVariables.primary],
      grid: {
        padding: {
          bottom: -4
        },
        borderColor: themeVariables.gridBorder,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        type: 'string',
        categories: ['Coffee', 'Bananas', 'Apples', 'Bread', 'Beef', 'Salmon', 'Water', 'Chips', 'Ice Cream'],
        axisBorder: {
          color: themeVariables.gridBorder,
        },
        axisTicks: {
          color: themeVariables.gridBorder,
        },
      },
      yaxis: {
        labels: {
          offsetX: 0
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4
        }
      }
    }
  };




  /**
   * Stock ανα κατηγορια
   */
  getStockPerCategoryOptions(themeVariables: ThemeCssVariablesType) {
    return {
      series: [{
        name: 'sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
      }],
      chart: {
        type: 'bar',
        height: '320',
        parentHeightOffset: 0,
        foreColor: themeVariables.secondary,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: [themeVariables.secondary],
      grid: {
        padding: {
          bottom: -4
        },
        borderColor: themeVariables.gridBorder,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        type: 'string',
        categories: ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Seafood', 'Beverages', 'Snacks', 'Frozen'],
        axisBorder: {
          color: themeVariables.gridBorder,
        },
        axisTicks: {
          color: themeVariables.gridBorder,
        },
      },
      yaxis: {
        labels: {
          offsetX: 0
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4
        }
      }
    }
  };





  /**
   * Προβλέψεις παραγγελιών
   */
  public orderForecastData: ChartConfiguration['data'] = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Παλίες Παραγγελίες",
        borderColor: this.themeCssVariables.info,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: this.themeCssVariables.light,
        pointHoverBackgroundColor: this.themeCssVariables.light,
        pointBorderColor: this.themeCssVariables.info,
        pointHoverBorderColor: this.themeCssVariables.info,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        tension: .3
      }, { 
        data: [282,350,411,502,635,809,947,1402,3700,5267],
        label: "Πρόβλεψη παραγγελιών",
        borderColor: this.themeCssVariables.danger,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: this.themeCssVariables.light,
        pointHoverBackgroundColor: this.themeCssVariables.light,
        pointBorderColor: this.themeCssVariables.danger,
        pointHoverBorderColor: this.themeCssVariables.danger,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        tension: .3
      }
    ]
  };
  public orderForecastOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { 
        display: true,
        labels: {
          color: this.themeCssVariables.secondary,
          font: {
            size: 13,
            family: this.themeCssVariables.fontFamily
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: this.themeCssVariables.gridBorder,
        },
        ticks: {
          color: this.themeCssVariables.secondary,
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          display: true,
          color: this.themeCssVariables.gridBorder,
        },
        ticks: {
          color: this.themeCssVariables.secondary,
          font: {
            size: 12
          }
        }
      }
    }
  };
  public orderForecastType: ChartType = 'line';
  public orderForecastPlugins = [];

 /**
   * Yearly comparison chart
   */
 public yearlyComparisonChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: { 
      display: true,
      labels: {
        color: this.themeCssVariables.secondary,
        font: {
          size: 13,
          family: this.themeCssVariables.fontFamily
        }
      }
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: true,
        color: this.themeCssVariables.gridBorder,
      },
      ticks: {
        color: this.themeCssVariables.secondary,
        font: {
          size: 12
        }
      }
    },
    y: {
      grid: {
        display: true,
        color: this.themeCssVariables.gridBorder,
      },
      ticks: {
        color: this.themeCssVariables.secondary,
        font: {
          size: 12
        }
      }
    }
  }
};
public yearlyComparisonChartType: ChartType = 'bar';
public yearlyComparisonChartPlugins = [];
public yearlyComparisonChartData: ChartData<'bar'> = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
  datasets: [
    {
      label: "2022",
      backgroundColor: this.themeCssVariables.danger,
      hoverBackgroundColor: this.themeCssVariables.danger,
      borderColor: this.themeCssVariables.danger,
      hoverBorderColor: this.themeCssVariables.danger,
      data: [133,221,783,2478,3500,5267,9545,10000,12000,15000]
    }, {
      label: "2023",
      backgroundColor: this.themeCssVariables.primary,
      hoverBackgroundColor: this.themeCssVariables.primary,
      borderColor: this.themeCssVariables.primary,
      hoverBorderColor: this.themeCssVariables.primary,
      data: [408,547,675,734,784,800,810,820,830,840]
    }, {
      label: "2024",
      backgroundColor: this.themeCssVariables.info,
      hoverBackgroundColor: this.themeCssVariables.info,
      borderColor: this.themeCssVariables.info,
      hoverBorderColor: this.themeCssVariables.info,
      data: [408,547,675,734,784,800,810,820,830,840]
    }
  ],
};

}
