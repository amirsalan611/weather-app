import axios, { AxiosError } from "axios";
import { weatherAPI, WeatherURL } from "../../shared/WeatherURL/WeatherURL";
import { CiCloud, CiSearch } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { weather } from "../../components/interFaces/InterFaces";
import { IoRainyOutline } from "react-icons/io5";
import {
  FaRegSnowflake,
  FaRegSun,
  FaTemperatureArrowDown,
  FaTemperatureArrowUp,
} from "react-icons/fa6";
import { BsCloudDrizzle, BsCloudHaze2 } from "react-icons/bs";
import { MdOutlineThunderstorm } from "react-icons/md";
import clear from "/src/assets/videos/clear.mp4";
import rain from "/src/assets/videos/rain.mp4";
import clouds from "/src/assets/videos/clouds.mp4";
import snow from "/src/assets/videos/snow.mp4";
import drizzle from "/src/assets/videos/drizzle.mp4";
import thunderstorm from "/src/assets/videos/thunderstorm.mp4";
import rain2 from "/src/assets/videos/rain (2).mp4";
import { LuDroplets } from "react-icons/lu";
import { FaRegCompass, FaWind } from "react-icons/fa";

export default function Web() {
  const [searchs, setSearch] = useState<weather[]>([]);
  const [mySearch, setMySearch] = useState<weather>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [axios404Error, setAxios404error] = useState<boolean>(false);

  useEffect(() => {
    if (mySearch) {
      setTimeout(() => {
        setVideoOpacity(1);
      }, 100);
    }
  }, [searchs]);

  const searchHandel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      searchINP: HTMLInputElement;
    };
    try {
      const response = await axios.get(
        `${WeatherURL}/data/2.5/weather?q=${target.searchINP.value}&appid=${weatherAPI}&units=metric`
      );

      if (!searchs.find((item) => item.name === response.data.name)) {
        setSearch((prev) => [...prev, response.data]);
      }

      if (!searchs.find((item) => item.name === response.data.name)) {
        setVideoOpacity(0);
      }

      setMySearch(response.data);
      setIsSearched(true);
      console.log(response.data);
      setAxios404error(false);
      console.log(searchs);
    } catch (error: unknown) {
      console.log(error);
      if (error.status === 404) {
        setAxios404error(true);
      }
    }
  };

  const weatherIcon = (weather: { main: string }) => {
    switch (weather.main) {
      case "Clouds":
        return <CiCloud size={50} className="pb-2" color="white" />;
      case "Rain":
        return <IoRainyOutline size={50} className="pb-2" color="white" />;
      case "Clear":
        return <FaRegSun size={50} className="pb-2" color="white" />;
      case "Snow":
        return <FaRegSnowflake size={50} className="pb-2" color="white" />;
      case "Drizzle":
        return <BsCloudDrizzle size={50} className="pb-2" color="white" />;
      case "Thunderstorm":
        return (
          <MdOutlineThunderstorm size={50} className="pb-2" color="white" />
        );
      case "Haze":
        return <BsCloudHaze2 size={50} className="pb-2" color="white" />;
    }
  };

  const background = () => {
    if (mySearch) {
      switch (mySearch.weather[0].main) {
        case "Clouds":
          return clouds;
        case "Rain":
          return rain;
        case "Clear":
          return clear;
        case "Snow":
          return snow;
        case "Drizzle":
          return drizzle;
        case "Thunderstorm":
          return thunderstorm;
        case "Haze":
          return rain2;
      }
    }
  };

  return (
    <div className="bg-[url('https://wallpapercave.com/wp/wp10573254.jpg')] bg-cover bg-center h-screen w-full flex relative">
      {isSearched && (
        <video
          key={mySearch?.weather[0].main}
          className="absolute top-0 left-0 w-full h-screen object-cover videoOpacity"
          autoPlay
          loop
          muted
          style={{ opacity: videoOpacity }}
        >
          <source src={background()} type="video/mp4" />
        </video>
      )}
      <div className=" h-screen w-[70%] p-20 z-50">
        {isSearched && (
          <div>
            <div className="flex text-white items-end gap-2">
              <h1 className="text-[70px]">{mySearch.name}</h1>
              <h2 className="text-[30px] pb-2">{mySearch.main.temp}°</h2>
              {weatherIcon(mySearch.weather[0])}
            </div>
            <div className="text-white flex flex-col items-center backdrop-blur-md  rounded-3xl w-1/2 m-auto mt-20 p-10">
              <h1 className="text-[20px]">Weather Details...</h1>
              <h2 className="text-[50px]">{mySearch.weather[0].main}</h2>
              <div>
                <div className="flex gap-28 justify-between">
                  <h1>Temp max</h1>
                  <h2 className="flex items-center gap-2">
                    {mySearch.main.temp_max}°<FaTemperatureArrowUp />
                  </h2>
                </div>
                <div className="flex gap-28 justify-between mt-2">
                  <h1>Temp min</h1>
                  <h2 className="flex items-center gap-2">
                    {mySearch.main.temp_min}°<FaTemperatureArrowDown />
                  </h2>
                </div>{" "}
                <div className="flex gap-28 justify-between mt-2">
                  <h1>Humadity</h1>
                  <h2 className="flex items-center gap-2">
                    {mySearch.main.humidity}%<LuDroplets />
                  </h2>
                </div>
                <div className="flex gap-28 justify-between mt-2">
                  <h1>Wind</h1>
                  <h2 className="flex items-center gap-2">
                    {mySearch?.wind.speed}Km/h
                    <FaWind />
                    {mySearch?.wind.deg}°
                    <FaRegCompass />
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className=" backdrop-blur-md whiteShadow h-screen text-white flex flex-col gap-3 w-[30%] p-10 overflow-auto">
        <label htmlFor="search" className="text-[25px] font-semibold">
          Search Loaction :
        </label>
        <form
          className="border border-white flex rounded-2xl "
          onSubmit={searchHandel}
        >
          <input
            className="w-full bg-transparent px-4 py-3 rounded-2xl outline-none focus:bg-transparent"
            name="searchINP"
            placeholder="Search"
          />
          <button className="w-[10%] text-center" type="submit">
            <CiSearch />
          </button>
        </form>
        {axios404Error && (
          <h1 className="text-red-600 text-center">No Resoults</h1>
        )}
        <div className="border-t pt-5 mt-5">
          {searchs.map((item) => {
            return (
              <div className="w-full mb-5 border border-white rounded-xl flex justify-between p-5 items-center">
                <h1 className="text-[20px font-bold]">{item.name}</h1>
                <div className="text-center">
                  <h2>{item.main.temp}°</h2>
                  <h2 className="flex gap-2">
                    <FaTemperatureArrowUp />
                    {item.main.temp_max}°/ <FaTemperatureArrowDown />
                    {item.main.temp_min}°
                  </h2>
                </div>
                <div className="text-center">
                  <h2>{item.weather[0].main}</h2>
                  {weatherIcon(item.weather[0])}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
