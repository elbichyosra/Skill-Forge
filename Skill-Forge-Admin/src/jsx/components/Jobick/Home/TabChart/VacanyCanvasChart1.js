import React from "react";
import { Line } from "react-chartjs-2";

class VacanyCanvasChart1 extends React.Component {
	render() {
		var activityData = [
			{
				first: [ 30, 35, 30, 50, 30, 50, 40, 45],
				second: [ 20, 25, 20, 15, 25, 22, 24, 20],
				third: [ 20, 21, 22, 21, 22, 15, 17, 20]
			},
			{
				first: [ 35, 35, 40, 30, 38, 40, 50, 38],
				second: [ 30, 20, 35, 20, 25, 30, 25, 20],
				third: [ 35, 40, 40, 30, 38, 50, 42, 32]
			},
			{
				first: [ 35, 40, 40, 30, 38, 32, 42, 32],
				second: [ 20, 25, 35, 25, 22, 21, 21, 38],
				third: [ 30, 35, 40, 30, 38, 50, 42, 32]
			},
			{
				first: [ 35, 40, 30, 38, 32, 42, 30, 35],
				second: [ 25, 30, 35, 25, 20, 22, 25, 38],
				third: [ 35, 35, 40, 30, 38, 40, 30, 38]
			}
		];
		const data = {
			defaultFontFamily: "Poppins",
			labels: ["Mar","Apr","May","June","Jul","Aug","Sep","Oct"],
			datasets: [{
				label: "Active",
				backgroundColor: "rgba(82, 177, 65, 0)",
				borderColor: "#3FC55E",
				data: activityData[this.props.dataActive].first,
				borderWidth: 6,
				tension: 0.4,
			},
			{
				label: "Inactive",
				backgroundColor: 'rgba(255, 142, 38, 0)',
				borderColor: "#4955FA",
				data: activityData[this.props.dataActive].second,
				borderWidth: 6,
				tension: 0.4,
				
			},
			{
				label: "Inactive",
				backgroundColor: 'rgba(255, 142, 38, 0)',
				borderColor: "#F04949",
				data: activityData[this.props.dataActive].third,
				borderWidth: 6,
				tension: 0.4,
				
			}]
		};
		const options = {
			responsive: true,
			maintainAspectRatio: false,
			elements: {
				point:{
					radius: 0
				}
			},
			plugins:{
				legend:false,
			},
			
			scales: {
				y: {
					grid: {
						color: "rgba(89, 59, 219,0.1)",
						drawBorder: true
					},
					ticks: {
						fontSize: 14,
						fontColor: "#6E6E6E",
						fontFamily: "Poppins"
					},
				},
				x: {
					//FontSize: 40,
					grid: {
						display: false,
						zeroLineColor: "transparent"
					},
					ticks: {
						fontSize: 14,
						stepSize: 5,
						fontColor: "#6E6E6E",
						fontFamily: "Poppins"
					}
				}
			},
			tooltips: {
				enabled: false,
				mode: "index",
				intersect: false,
				titleFontColor: "#888",
				bodyFontColor: "#555",
				titleFontSize: 12,
				bodyFontSize: 15,
				backgroundColor: "rgba(256,256,256,0.95)",
				displayColors: true,
				xPadding: 10,
				yPadding: 7,
				borderColor: "rgba(220, 220, 220, 0.9)",
				borderWidth: 2,
				caretSize: 6,
				caretPadding: 10
			}
		};

      return (
         <div style={{ minHeight: "250px" }}>
            <Line 
				data={data} 
				height={250} 
				options={options} 
			/>
         </div>
      );
   }
}

export default VacanyCanvasChart1;