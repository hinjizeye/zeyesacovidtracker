import React , {useState, useEffect}from 'react';
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';
import { Line, Bar} from 'react-chartjs-2';


const Chart = ({data: { confirmed, recovered, deaths }, country}) => {

const [dailyData, setDailyData] = useState([]);

useEffect(() => {
   const fetchAPI = async () => {
       setDailyData( await fetchDailyData());
   }

   console.log(dailyData);
   fetchAPI();
});


const lineChart = (
  dailyData.length ? (
   <Line 
       data= {
           {
               labels: dailyData.map(({ date }) => date),
               datasets:[{
                   data: dailyData.map(({confirmed}) => confirmed),
                   label: 'Infected',
                   borderColor: 'yellow',
                   backgroundColor:'red',
                   fill: true
               },{
                   data: dailyData.map(({deaths}) => deaths ),
                   label: 'Deaths',
                   borderColor: 'red',
                   backgroundColor: 'blue',
                   fill: true,
               }]
           }}
   />) : null
);

const barChar = (
    confirmed
     ? (
         <Bar
             data= {{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor:['yellow', 'green', 'red'],
                    data:[ confirmed.value, recovered.value, deaths.value]
                }]
             }}
             options={{
                 legend: {display:false},
                 title: {display: true, text: `Current state in  ${country}` }
             }}
         />
     ): null
);

    return(
        <div className = {styles.container}>
          {country ? barChar : lineChart}
        </div>
    )
}

export default Chart;