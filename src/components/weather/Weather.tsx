import { useEffect, useState } from "react";
import Search from "../search/Search";
import styles from "./Weather.module.scss"

interface Weather {
    name: string;
    sys: {
        country: string;
    };
    weather: Array<{
      description: string;
    }>;
    main: {
      temp: number;
      humidity: number;
      feels_like: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
}

const apikey = import.meta.env.VITE_API_KEY;

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);

  const fetchWeather = async (param: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${apikey}`
      );

      const data = await response.json();
      console.log(data, "data");
      if(data){
        setWeather(data);
        setLoading(false);
      }
    } catch (e) {
        setLoading(false);
        console.log(e)
    }
  };

  const handleSearch = () => {
    fetchWeather(search);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleString('en-us',
        { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
      );   
  };

  useEffect(() => {
    fetchWeather('lublin')
  }, [])

  console.log(weather)

  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {
        loading ? <div>Loading...</div>
        : <div>
            <div className={styles.city}>
                <h2>{weather?.name}, {weather?.sys?.country}</h2>
            </div>
            <div className={styles.date}>
                {getCurrentDate()}
            </div>
            <div>Temperature: {weather?.main?.temp} Feels Like: {weather?.main.feels_like}</div>
            <p className={styles.description}>
              {weather && weather?.weather[0] && weather?.weather[0] ? weather?.weather[0]?.description : " "}
            </p>
            <div>
              <div>
                <div>
                  <p>Humidity: {weather?.main?.humidity}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Wind Speed: {weather?.wind?.speed}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>Pressure: {weather?.main?.pressure}</p>
                </div>
              </div>
            </div>
        </div>
      }
    </>
  );
};

export default Weather;
