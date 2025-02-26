import { Component, inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ThemeCssVariableService } from '../../../../core/services/theme-css-variable.service';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-offers-and-ads',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  templateUrl: './offers-and-ads.component.html',
  styleUrl: './offers-and-ads.component.scss'
})
export class OffersAndAdsComponent {

  private themeCssVariableService = inject(ThemeCssVariableService);
  themeCssVariables = this.themeCssVariableService.getThemeCssVariables();


  /**
   * clickAndPurchase bar chart
   */
  public clickAndPurchaseChartOptions: ChartConfiguration['options'] = {
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
  public clickAndPurchaseChartType: ChartType = 'bar';
  public clickAndPurchaseChartPlugins = [];
  public clickAndPurchaseChartData: ChartData<'bar'> = {
    labels: ["2Can", "Slow", "Area51", "Barsol"],
    datasets: [
      {
        label: "Κλικ",
        backgroundColor: this.themeCssVariables.danger,
        hoverBackgroundColor: this.themeCssVariables.danger,
        borderColor: this.themeCssVariables.danger,
        hoverBorderColor: this.themeCssVariables.danger,
        data: [133, 221, 783, 2478]
      }, {
        label: "Αγορά",
        backgroundColor: this.themeCssVariables.primary,
        hoverBackgroundColor: this.themeCssVariables.primary,
        borderColor: this.themeCssVariables.primary,
        hoverBorderColor: this.themeCssVariables.primary,
        data: [408, 547, 675, 734]
      }
    ],
  };

  /**
   * clicks that turned into purchase chart
   */
  public clicksConvertedToPurchaseChartOptions: ChartConfiguration['options'] = {
    aspectRatio: 2,
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
    }
  };
  public clicksConvertedToPurchaseChartLabels: string[] = ["Only Clicks", "Clicks and Purchase"];
  public clicksConvertedToPurchaseChartData: ChartData<'doughnut'> = {
    labels: this.clicksConvertedToPurchaseChartLabels,
    datasets: [
      {
        label: "Number",
        backgroundColor: [this.themeCssVariables.primary, this.themeCssVariables.danger],
        hoverBackgroundColor: [this.themeCssVariables.primary, this.themeCssVariables.danger],
        borderColor: this.themeCssVariables.light,
        hoverBorderColor: [this.themeCssVariables.primary, this.themeCssVariables.danger],
        data: [2478, 4267],
      }
    ]
  };
  public clicksConvertedToPurchaseChartType: ChartType = 'doughnut';




  /**
   * Sales impact from offers chart
   */
  public salesImpactFromOffersData: ChartConfiguration['data'] = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [{
      data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
      label: "Πωλήσεις χωρίς προσφορές",
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
      data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
      label: "Πωλήσεις με προσφορές",
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
  public salesImpactFromOffersOptions: ChartConfiguration['options'] = {
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
  public salesImpactFromOffersType: ChartType = 'line';
  public salesImpactFromOffersPlugins = [];



  /**
   * clickAndPurchase bar chart
   */
  public normalVsDiscountedSalesChartOptions: ChartConfiguration['options'] = {
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
  public normalVsDiscountedSalesChartType: ChartType = 'bar';
  public normalVsDiscountedSalesChartPlugins = [];
  public normalVsDiscountedSalesChartData: ChartData<'bar'> = {
    labels: ["Food", "Drinks", "Desserts", "Snacks"],
    datasets: [
      {
        label: "Πωλήσεις χωρίς έκπτωση",
        backgroundColor: this.themeCssVariables.danger,
        hoverBackgroundColor: this.themeCssVariables.danger,
        borderColor: this.themeCssVariables.danger,
        hoverBorderColor: this.themeCssVariables.danger,
        data: [133, 221, 783, 2478]
      }, {
        label: "Πωλήσεις με έκπτωση",
        backgroundColor: this.themeCssVariables.primary,
        hoverBackgroundColor: this.themeCssVariables.primary,
        borderColor: this.themeCssVariables.primary,
        hoverBorderColor: this.themeCssVariables.primary,
        data: [408, 547, 675, 734]
      }
    ],
  };


  /**
  * Πελατες που αγορασαν απο λόγω των εκπτώσεων
  */
  public customersBoughtWithOffersChartOptions: ChartConfiguration['options'] = {
    aspectRatio: 2,
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
  };

  public customersBoughtWithOffersChartLabels: string[] = ["Αγόρασαν με προσφορά", "Αγόρασαν χωρις προσφορά"];
  public customersBoughtWithOffersChartData: ChartData<'doughnut'> = {
    labels: this.customersBoughtWithOffersChartLabels,
    datasets: [{
      label: "Ποσοστο",
      backgroundColor: [this.themeCssVariables.primary, this.themeCssVariables.danger, this.themeCssVariables.info],
      hoverBackgroundColor: [this.themeCssVariables.primary, this.themeCssVariables.danger, this.themeCssVariables.info],
      borderColor: this.themeCssVariables.light,
      hoverBorderColor: [this.themeCssVariables.primary, this.themeCssVariables.danger, this.themeCssVariables.info],
      data: [20, 80]
    }]
  };
  public customersBoughtWithOffersChartType: ChartType = 'pie';




  /**
   * comparisonPromotedProducts bar chart
   */
  public comparisonPromotedProductsChartOptions: ChartConfiguration['options'] = {
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
  public comparisonPromotedProductsChartType: ChartType = 'bar';
  public comparisonPromotedProductsChartPlugins = [];
  public comparisonPromotedProductsChartData: ChartData<'bar'> = {
    labels: ["Vegetables", "Fruits", "Meat", "Fish"],
    datasets: [
      {
        label: "Μη προωθημένα",
        backgroundColor: this.themeCssVariables.danger,
        hoverBackgroundColor: this.themeCssVariables.danger,
        borderColor: this.themeCssVariables.danger,
        hoverBorderColor: this.themeCssVariables.danger,
        data: [133, 221, 783, 2478]
      }, {
        label: "Προωθημένα",
        backgroundColor: this.themeCssVariables.primary,
        hoverBackgroundColor: this.themeCssVariables.primary,
        borderColor: this.themeCssVariables.primary,
        hoverBorderColor: this.themeCssVariables.primary,
        data: [408, 547, 675, 734]
      }
    ],
  };


  
  /**
 * Revenue Before & After Ads 
 */

  public beforeAndAfterAdsChartOptions: ChartConfiguration['options'] = {
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
        },
        position: 'left', 
      },
      y1: {  
        grid: {
          display: false, 
        },
        ticks: {
          color: "red", 
          font: {
            size: 12
          }
        },
        position: 'right', 
      }
    }
  };

  public beforeAndAfterAdsChartType: ChartType = 'bar';

  public beforeAndAfterAdsChartPlugins = [];

  public beforeAndAfterAdsChartData: ChartData = {
    labels: ["Before Ads", "During Ads", "After Ads"], 
    datasets: [

      {
        label: "Percentage Growth (%)",
        type: "line",
        borderColor: "red",  
        backgroundColor: this.themeCssVariables.danger,
        borderWidth: 3,  
        data: [0, 80 , 100],  
        fill: false,
        pointBackgroundColor: this.themeCssVariables.danger, 
        pointHoverBackgroundColor: this.themeCssVariables.danger,
        pointBorderColor: this.themeCssVariables.danger,
        pointHoverBorderColor: this.themeCssVariables.danger,
        pointBorderWidth: 3,
        pointHoverBorderWidth: 4,
        tension: 0.4,  
        yAxisID: 'y1' 
      },
      {
        label: "Revenue (€)", 
        type: "bar",
        backgroundColor: this.themeCssVariables.primary,
        hoverBackgroundColor: this.themeCssVariables.primary,
        borderColor: '',
        data: [5000, 6500,8000],
      }
    ]
  };
}
