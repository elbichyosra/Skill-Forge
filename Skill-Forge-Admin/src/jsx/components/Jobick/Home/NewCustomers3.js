import React from "react";
import ReactApexChart from "react-apexcharts";

class NewCustomers3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		series: [
			{
				name: 'Net Profit',
				data: [100,300, 100, 400, 200, 400],
			}, 				
		],
      options: {
        chart: {
          height: 50,
		  width: 80,
          type: "line",
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
        },
        colors:['#3385D6'],
        dataLabels: {
			enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
			show: true,
			width: 6,
			curve:'smooth',
			colors:['#3385D6'],
		},
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
			normal: {
				filter: {
					type: 'none',
					value: 0
				}
			},
			hover: {
				filter: {
					type: 'none',
					value: 0
				}
			},
			active: {
				allowMultipleDataPointsSelection: false,
				filter: {
					type: 'none',
					value: 0
				}
			}
		},
		xaxis: {
			show: false,	
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			enabled:false,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
      },
    };
  }

	render() {
		return (
			<div id="chart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="line"
				  height={50}
				  width={80}
				/>
			</div>
		);
	}
}

export default NewCustomers3;