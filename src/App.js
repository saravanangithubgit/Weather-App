import snow from "./img/snow-removebg-preview.png"
import Humidity from "./img/humidity-removebg-preview.png"
import rain from "./img/rain-removebg-preview.png"
import sunny from "./img/sunny-removebg-preview.png"
import searchimg from "./img/search (1).png"
import wind from "./img/wind-removebg-preview.png"
import normalcloud from "./img/normal-removebg-preview.png"
import { useState } from "react"
const Weatherimage = ({icon,degree,city,countryname,humiditylevel,Windlevel,citynotfound}) =>{
  
 return(
  <div className="container">
 <>
  <div className="image" >
    <img src={icon} alt="weather" />
  </div>
  <div className="temp">
    {degree}°C
  </div>
  <div className="City">
    {city}
  </div>
  <div className="Country">
     {countryname}
  </div>
<div className="Totalbottom">

  <div className="bottom">
    <ul>
      <li>
         <img src={Humidity} alt="humidity" />
      </li>

      <li className="humlevel">{humiditylevel}%</li>
      
      <li className="hum">Humidity</li>
    </ul>
  </div>
  

  <div className="windimg">
    <ul>
      <li><img src={wind} alt="wind" /></li>
      <li className="wind">{Windlevel} Km/h</li>
      <li className="speed">wind speed</li>
    </ul>
  </div>
</div>
{citynotfound && <div className="notfound">City Not Found</div>}
<div className="by">Designed By Saravanan</div>
  </></div>
  )
}


function App() {
  const [icon,seticon]= useState(snow)
  const [degree,setdegree] = useState(26)
  const [place,setplace]=useState("London")
  const [country,setcountry]=useState("GB")
  const [humiditylevel,sethumidity]=useState(12)
  const[Windlevel,setwindlevel]=useState(80)
  const[text,settext]=useState("London")
const[citynotfound,setcitynotfound]=useState(false)
  const weatherIconMap = {
    "01d": normalcloud,
    "01n": normalcloud,
    "02d": normalcloud,
    "02n": normalcloud,
    "03d": sunny,
    "03n": sunny,
    "04d": sunny,
    "04n": sunny,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    };


const search =async()=>{
let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=86c3031d716814a6b9a2735ae014582b&units=Metric`

try {
  let res = await fetch(url);
  let data = await res.json();
  // console.log(data);
  if (data.cod === 404) {
    console.error("city not found");
    setcitynotfound(true); 
    return;
  }
   else {
  setcitynotfound(false);
}
  sethumidity(data.main.humidity);
  setwindlevel(data.wind.speed ) ;
  setdegree(Math.floor(data.main.temp));
  setcountry(data.sys.country);
setplace(data.name) 
const weatherIconCode = data.weather[0].icon;
seticon(weatherIconMap[weatherIconCode]|| normalcloud)
} catch (error) {
  console.error(error.message);
}finally{
  
}
}
const searchhandle=(e)=>{
settext(e.target.value);
}
const keyHandler = (e) => {
  if (e.key === "Enter") {
      search();
  }
}

  return (
    <div className="App">
      <div className="inputcontainer">
            <input placeholder='Search' className='input' onChange={searchhandle} value={text} onKeyDown={keyHandler}></input>
                 <div onClick={()=>search()}  className='search'>
  <img src={searchimg} ></img>
</div>
  </div>

{/* weather */}
{!citynotfound && <Weatherimage icon={icon} degree={degree} city={place} countryname={country} humiditylevel={humiditylevel} Windlevel={Windlevel} citynotfound={citynotfound}/>
}



    </div>
  );
}

export default App;
