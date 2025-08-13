import React, { useState } from 'react'
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

function InstructorChart({courses}) {
const [currChart, setCurrChart ] = useState("students")

const generateRandomColors = (numColors) => {
    const colors = [];
    for(let i=0;i<numColors;i++){
        const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        colors.push(color);
    }
    return colors;
}

const chartDataForStudents = {
    labels : courses.map((course) => course.courseName),
    datasets : [
        {
            data : courses.map((course) => course.totalStudentsEnrolled),
            backgroundColor : generateRandomColors(courses.length),
        },
    ],
}

const chartDataForIncome =  {
    labels : courses.map((course) => course.courseName),
    datasets : [
        {
            data : courses.map((course) => course.totalAmountGenerated),
            backgroundColor : generateRandomColors(courses.length),
        },
    ],
}

const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 10,
          usePointStyle: true,
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
          generateLabels: (chart) => {
            const data = chart.data
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0)
                const style = meta.controller.getStyle(i)
                return {
                  text: window.innerWidth < 640 && label.length > 15 ? label.substring(0, 15) + "..." : label,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  pointStyle: "circle",
                  hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                  index: i,
                }
              })
            }
            return []
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => context.label + ": " + context.parsed,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  }


  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-4 sm:p-6 min-h-[300px] lg:min-h-[450px]">
      <p className="text-base sm:text-lg font-bold text-richblack-5">Visualize</p>

      <div className="flex flex-wrap gap-2 sm:space-x-4 sm:gap-0 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-2 px-3 text-sm transition-all duration-200 ${
            currChart === "students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400 hover:text-yellow-300"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-2 px-3 text-sm transition-all duration-200 ${
            currChart === "income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400 hover:text-yellow-300"
          }`}
        >
          Income
        </button>
      </div>

      <div className="relative flex-1 w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-[280px] max-h-[280px] sm:max-w-[320px] sm:max-h-[320px] lg:max-w-[380px] lg:max-h-[380px]">
            {/* Render the Pie chart based on the selected chart */}
            <Pie data={currChart === "students" ? chartDataForStudents : chartDataForIncome} options={options} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorChart