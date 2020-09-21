import React,{useState,useEffect} from 'react'
import {Line} from "react-chartjs-2";
import numeral from 'numeral';






// 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'

const options ={
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};


const buildChartData= (data,caseType="cases") => {

    const chartData=[];
    let lastDatapoint;
    
     for(let date in data.cases){
        if(lastDatapoint){
            const newDatapoint={
                x:date,
                y:data[caseType][date]-lastDatapoint,

            };
            chartData.push(newDatapoint);

           

        }
        lastDatapoint =data[caseType="cases"][date];
    }

   return chartData;
 }


 function LineGraph({caseType="cases"}) {
    const[data,setData]=useState({});


 useEffect(()=>{

    const fetchData=async()=>{
     
    await fetch ('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    .then((response)=>response.json())
    .then((data)=>{
    
      

        const chartData =buildChartData(data,caseType);
        setData(chartData)
    });
};
fetchData();
 },[caseType]);

 

    



    return (
   
        <div>
             {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "red",
                                data: data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph

