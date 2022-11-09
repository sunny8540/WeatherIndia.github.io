import React, { useEffect, useState } from "react";
import './index.css';
export default function App(){
    const [location,setLocation]=useState([]);
    const [capital,setCapital]=useState([]);
    const [time,setTime]=useState([]);
    const [icon,setIcon]=useState([]);
    const [todayTemp,setTodayTem]=useState([]);
    const [text,setText]=useState([]);
    const [humidity,setHumidity]=useState([]);
    const [uv,setUV]=useState([]);
    const [windK,setWindK]=useState([]);
    const [pressure_mb,setPressure_mb]=useState([]);
    const [wind_dir,setWind_dir]=useState([]);
    const [temp_f,setTemp_f]=useState([]);
    const [srise,setSrise]=useState([]);
    const [sset,setSset]=useState([]);
    const [mrise,setMrise]=useState([]);
    const [mset,setMset]=useState([]);
    const [mphase,setMphase]=useState([]);
    const [millu,setMillu]=useState([]);
    const [perDay,setPerDay]=useState([]);
    const [everyDay,setEveryDay]=useState([]);


    async function getDataWeather(){
        const resp=await fetch('https://api.weatherapi.com/v1/forecast.json?key=789fbee382a0425eb0551911220811&q=india&days=1&aqi=no&alerts=no');
        // console.log(resp);
        const result= await resp.json();
        // console.log(result)
        const lo= await result.location;
        const current= await result.current;
        const forecast= await result.forecast;
        // console.log(current.temp_c);
        // console.log(forecast.forecastday[0].hour);

     
        setPerDay(forecast.forecastday[0].hour)
        setLocation(lo.country);
        setCapital(lo.name);
        setTime(lo.localtime);
        setIcon(current.condition.icon);
        setTodayTem(current.temp_c);
        setText(current.condition.text);
        setHumidity(current.humidity);
        setUV(current.uv);
        setWindK(current.wind_kph);
        setPressure_mb(current.pressure_mb);
        setWind_dir(current.wind_dir);
        setTemp_f(current.temp_f);
        setSrise(forecast.forecastday[0].astro.sunrise);
        setSset(forecast.forecastday[0].astro.sunset);
        setMrise(forecast.forecastday[0].astro.moonrise);
        setMset(forecast.forecastday[0].astro.moonset);
        setMphase(forecast.forecastday[0].astro.moon_phase);
        setMillu(forecast.forecastday[0].astro.moon_illumination);
        

    }
    async function perDays(){
        const res=await fetch('https://api.weatherapi.com/v1/forecast.json?key=789fbee382a0425eb0551911220811&q=india&days=10&aqi=no&alerts=no');
        const store=await res.json();
        console.log(store.forecast.forecastday);
        setEveryDay(store.forecast.forecastday);
    }
    
    useEffect(()=>{
        getDataWeather();
        perDays();
    },[])
    return(
        <>
            <div className="main">
                <div className="locationData">
                    <div className="location">{location}</div><span className="capital">{capital}</span>
                </div>
                    <div className="time">{time}</div>
                <div className="containt1">
                    <div className="icon">
                        <img src={icon} alt="weather icon"/>
                        <div className="temprature">
                            <div className="todayTemp">{todayTemp}°C</div>
                            <div className="todayText">{text}</div>
                        </div>
                    </div>
                   <div className="containt1-right">
                   <div className="currentStatus ">
                        <div className="humidity"><div className="data">{humidity}</div><div className="name">Humidity</div></div>
                        <div className="UV"><div className="data">{uv}</div><div className="name">UV Ray</div></div>
                    </div>
                    <div className="currentStatus ">
                        <div className="humidity"><div className="data">{windK}</div><div className="name">wind_kph</div></div>
                        <div className="UV"><div className="data">{pressure_mb}</div><div className="name">pressure_mb</div></div>
                    </div>
                    <div className="currentStatus ">
                        <div className="humidity"><div className="data">{wind_dir}</div><div className="name">wind_dir</div></div>
                        <div className="UV"> <div className="data">{temp_f}</div><div className="name">temp_f</div></div>
                    </div>
                   </div>
                </div>
                <div className="contiant2">
                    <div className="a">
                    <div className="r1"><div className="astro">Sun Rise</div><div className="astroResult">{srise}</div></div>
                    <div className="r1"><div className="astro">Sun Set</div><div className="astroResult">{sset}</div></div>
                    
                    </div>
                   <div className="b">
                   <div className="r1"><div className="astro">Moon Rise</div><div className="astroResult">{mrise}</div></div>
                    <div className="r1"><div className="astro">Moon Set</div><div className="astroResult">{mset}</div></div>
                    
                   </div>
                   <div className="c">
                   <div className="r1"><div className="astro">Moon Phase</div><div className="astroResult">{mphase}</div></div>
                    <div className="r1"><div className="astro">Moon Illuminatiion </div><div className="astroResult">{millu}%</div></div>
               
                   </div>
                </div>
                
           <div className="footer">
           <div className="ClimateTable">
            <h1 style={{color:"#fff"}}>Today Review</h1>
                <table >
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Temprature</th>
                            <th>icon</th>
                            <th>Wind Direction</th>
                            <th>Humidity</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                            perDay.map((item,i)=>{
                                return(
                      <tr key={i}>
                                    <td >{item.time}</td>
                                    <td>{item.temp_c}°C</td>
                                    <td><img className="perDayImg" src={item.condition.icon} alt="Weather img"/></td>
                                    <td>{item.wind_dir}</td>
                                    <td>{item.humidity}</td>
                      </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="climateTablePerDay">
            <h1 style={{color:"#fff"}}>Ten Days Data</h1>

            <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Max Temp</th>
                            <th>Min Temp</th>
                            <th>Avg Temp</th>
                            <th>icon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            everyDay.map((items,ind)=>{
                               return(
                                <tr key={ind}>
                                    <td>{items.date}</td>
                                    <td>{items.day.maxtemp_c}°C</td>
                                    <td>{items.day.mintemp_c}°C</td>
                                    <td>{items.day.avgtemp_c}°C</td>
                                    <td><img className="perDayImg" src={items.day.condition.icon}/></td>
                                </tr>
                               )
                            })
                        }
                    </tbody>
                    </table>
            </div>
           </div>

            </div>
        </>
    )
}