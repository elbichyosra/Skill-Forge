import React,{Component} from "react";
import { Bar } from "react-chartjs-2";

class CanvasChart2 extends Component {
	render() {
		var activityData = [
			[35, 18, 15, 35, 40, 20, 30, 25, 22, 20, 45, 35, 35],
			[25, 88, 25, 50, 21, 42, 60, 33, 50, 60, 50, 20, 25],
			[50, 35, 10, 45, 40, 50, 60, 35, 10, 50, 34, 35, 50],
			[20, 35, 60, 45, 40, 35, 30, 35, 10, 40, 60, 20, 20],
		];
		const data = {
			labels: ["01","02","03","04","05","06","07","08","09","10","11","12","13"],
			datasets: [{
				label: "My First dataset",
				backgroundColor: '#F73A0B',
				borderColor: 'var(--primary)',
				data: activityData[this.props.dataActive],
				borderWidth: 0,
				barThickness:'flex',
				minBarLength:10,
				barPercentage: 0.3,
			}]
		};
		const options = {
			responsive: true,
			maintainAspectRatio: false,
			
			plugins:{
				legend:false,
			},
			scales: {
				y: {
					grid: {
						color: "rgba(255,255,255,0.2)",
						drawBorder: true
					},
					ticks: {
						fontColor: "#6E6E6E",
						max: 60,
						min: 0,
						stepSize: 20
					},
				},
				x: {
					
					
					grid: {
						display: false,
						zeroLineColor: "transparent"
					},
					ticks: {
						stepSize: 20,
						fontColor: "#6E6E6E",
						fontFamily: "Nunito, sans-serif"
					}
				}
			},
			tooltips: {
				mode: "index",
				intersect: false,
				titleFontColor: "#888",
				bodyFontColor: "#555",
				titleFontSize: 12,
				bodyFontSize: 15,
				backgroundColor: "rgba(255,255,255,1)",
				displayColors: true,
				xPadding: 10,
				yPadding: 7,
				borderColor: "rgba(220, 220, 220, 1)",
				borderWidth: 1,
				caretSize: 6,
				caretPadding: 10
			}
		};

		return (
		  <div style={{ minHeight: "200px" }}>
			<Bar
			  data={data}
			  width={this.props.width ? this.props.width : 433}
			  height={this.props.height ? this.props.height : 200}
			  options={options}
			/>
		  </div>
		);
   }
}

export default CanvasChart2;