import React,{useState,useEffect} from 'react';
import { FormControl ,Select, MenuItem, Card, CardContent} from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map'
import Table from './Table';
import {sortData} from './utlis';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";


function App() {
  
  const[countries,setCountry]=useState([]);
  const [country,seetCountry]=useState('WorldWide')
  const [countryInfo,setCountryinfo] =useState({});
  const [tableData,setTableData] =useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

 //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  //https://disease.sh/v3/covid-19/countries/
  
  useEffect(()=>{

    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=>response.json())
    .then(data=>{
      setCountryinfo(data)
    })
  },[])



   useEffect(()=>{
 
    const getCountriesData=async()=>{

      await fetch("https://disease.sh/v3/covid-19/countries")

      .then((response)=>response.json())
     
      .then((data)=>{

        const countries = data.map((country)=>(
          {
            name:country.country,
            value: country.countryInfo.iso2
          }
        ));
        const sortedData=sortData(data);
        setTableData(sortedData);
        setCountry(countries);
        setMapCountries(countries);
        
        
        
      })
    };
    getCountriesData();
    

   },[]);
  



   const onCountryChange= async(e)=>{

  const countryCode=e.target.value;
 
   console.log('yooo',countryCode)
   seetCountry(countryCode)

  const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :`https://disease.sh/v3/covid-19/countries/${countryCode}`

  await fetch(url)
  .then((response)=>response.json())
  .then((data)=>{
    seetCountry(countryCode)
    setCountryinfo(data);

    if(countryCode === "worldwide"){
      setMapCenter(mapCenter)
      setMapZoom(mapZoom);
    }else{
      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(5);
    }

  })
  }
 console.log("countryinfo",setMapCenter)
  



  return (
    <div className="App">
      <div className="left">
      <div className="app__header">
  <img className="image__pawan" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbEjy7ub4_gapESG5lvnjgF-qf2wJKpgTxaQ&usqp=CAU" alt="sapat.." />
    
  <FormControl className="app__dropdown" >

   <Select onChange={onCountryChange} variant = "outlined" value={country} >
    
     <MenuItem value="Worldwide"> Worldwide </MenuItem>
   {
     countries.map((country)=>(
      <MenuItem value={country.value}> {country.name} </MenuItem>
      ))
   }

  </Select>
</FormControl>
 
</div>

<div className="app__status">

 <InfoBox  title="Total Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

 <InfoBox  title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

 <InfoBox title="Total Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

</div>
 <Map  
  casesType={casesType}
  countries={mapCountries} 
  center={mapCenter} 
  zoom={mapZoom} 
 />
   


    </div>




<Card className="right">
 
 <CardContent> 

<h3 className="h3"> Live Cases by Country </h3> 
<Table countries={tableData}/>
<h3 className = "h2"> world Wide new cases </h3>
 <LineGraph/>
 </CardContent>
 </Card>
    </div>
  );
}

export default App;
