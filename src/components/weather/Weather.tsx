import { useEffect, useState } from "react";
import Search from "../search/Search";

interface Weather {
    name: string;
    sys: {
        country: string;
    };
}

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);

  const fetchWeather = async (param: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=8ed6a9cf881b47f776b90d808d881497`
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
    fetchWeather('glasgow')
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
            <div>
                <h2>{weather?.name}, {weather?.sys?.country}</h2>
            </div>
            <div>
                {getCurrentDate()}
            </div>
        </div>
      }
    </>
  );
};

export default Weather;
