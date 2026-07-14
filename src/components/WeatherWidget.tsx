import { useState, useEffect } from "react";
import { Sun, Cloud, CloudRain, CloudSun, CloudSunRain, Thermometer, Wind, Droplets, RefreshCw } from "lucide-react";
import { WeatherData } from "../types";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/weather");
      if (!res.ok) throw new Error("날씨 정보를 불러오지 못했습니다.");
      const data = await res.json();
      setWeather(data);
    } catch (err: any) {
      console.error(err);
      setError("실시간 날씨를 동기화하지 못했어요. 오프라인 모드로 표시합니다.");
      // Provide fallback weather
      setWeather({
        city: "Cancun, Mexico",
        temp: "31°C",
        humidity: "80%",
        wind: "12 km/h",
        sky: "대체로 맑음 ☀️",
        pop: "20%",
        icon: "sun",
        tip: "에메랄드빛 카리브해 스노클링을 즐기기에 완벽한 날씨입니다! 🏊",
        forecast: [
          { day: "오늘", temp: "31°C", sky: "맑음 ☀️" },
          { day: "내일", temp: "30°C", sky: "맑음 ☀️" },
          { day: "모레", temp: "29°C", sky: "소나기 ⛈️" },
          { day: "글피", temp: "30°C", sky: "구름 조금 ⛅" }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return <Sun className="w-8 h-8 text-amber-500 animate-pulse" />;
      case "cloud":
        return <Cloud className="w-8 h-8 text-slate-400" />;
      case "cloud-sun-rain":
        return <CloudSunRain className="w-8 h-8 text-indigo-400" />;
      case "thermometer":
        return <Thermometer className="w-8 h-8 text-rose-500" />;
      default:
        return <CloudSun className="w-8 h-8 text-amber-400" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-rose-100/40 shadow-sm flex flex-col items-center justify-center min-h-[160px]">
        <RefreshCw className="w-6 h-6 text-rose-400 animate-spin mb-2" />
        <p className="text-xs text-slate-400 font-medium">카리브해 실시간 날씨 동기화 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-rose-100/40 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
      <div className="absolute right-0 top-0 translate-x-2 -translate-y-2 w-20 h-20 bg-rose-50 rounded-full blur-xl opacity-80"></div>
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">Live Cancun Weather</span>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            멕시코 칸쿤 날씨 🌴
          </h3>
        </div>
        <button 
          onClick={fetchWeather}
          className="p-1.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-rose-500"
          title="날씨 새로고침"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {weather && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getWeatherIcon(weather.icon)}
              <div>
                <p className="text-2xl font-black text-slate-800 font-serif tracking-tight">{weather.temp}</p>
                <p className="text-xs font-semibold text-slate-600">{weather.sky}</p>
              </div>
            </div>
            
            <div className="text-right text-[11px] text-slate-500 space-y-0.5">
              <div className="flex items-center justify-end gap-1">
                <Droplets className="w-3 h-3 text-sky-400" />
                <span>습도: {weather.humidity}</span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <Wind className="w-3 h-3 text-slate-400" />
                <span>풍속: {weather.wind}</span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <CloudRain className="w-3 h-3 text-indigo-400" />
                <span>강수확률: {weather.pop}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100/30 text-[11px] text-rose-700 font-medium leading-relaxed">
            💡 <span className="font-bold">현지 의상/활동 조언:</span> {weather.tip}
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
            {weather.forecast.map((f, i) => (
              <div key={i} className="text-center p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold mb-0.5">{f.day}</p>
                <p className="text-xs font-extrabold text-slate-700 font-serif">{f.temp}</p>
                <p className="text-[9px] text-slate-500 truncate mt-0.5">{f.sky.split(" ").pop()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-[10px] text-amber-600 font-semibold mt-1.5">{error}</p>}
    </div>
  );
}
