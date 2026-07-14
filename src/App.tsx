import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Compass, 
  Luggage, 
  Sun,
  Camera,
  Info,
  Share2,
  ExternalLink,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { DayItinerary, ItineraryItem } from "./types";
import { defaultItinerary } from "./data";
import WeatherWidget from "./components/WeatherWidget";
import AIChatWidget from "./components/AIChatWidget";
import ChecklistWidget from "./components/ChecklistWidget";
import TimelineWidget from "./components/TimelineWidget";

export default function App() {
  // 1. Core Itinerary State (loaded from localStorage if exists)
  const [itinerary, setItinerary] = useState<DayItinerary[]>(() => {
    const saved = localStorage.getItem("cancun_honeymoon_itinerary");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultItinerary;
  });

  // Persist itinerary changes
  useEffect(() => {
    localStorage.setItem("cancun_honeymoon_itinerary", JSON.stringify(itinerary));
  }, [itinerary]);

  const handleUpdateItem = (dayNumber: number, itemId: string, updatedFields: Partial<ItineraryItem>) => {
    setItinerary(prev =>
      prev.map(day => {
        if (day.dayNumber !== dayNumber) return day;
        return {
          ...day,
          items: day.items.map(item =>
            item.id === itemId ? { ...item, ...updatedFields } : item
          )
        };
      })
    );
  };

  const handleRestoreDefaults = () => {
    setItinerary(defaultItinerary);
  };

  // 1.5 Reservation Codes State
  const [arteCode, setArteCode] = useState<string>(() => {
    return localStorage.getItem("cancun_honeymoon_arte_code") || "31453SF487554";
  });
  const [coralCode, setCoralCode] = useState<string>(() => {
    return localStorage.getItem("cancun_honeymoon_coral_code") || "332165304";
  });

  const [isEditingArte, setIsEditingArte] = useState(false);
  const [isEditingCoral, setIsEditingCoral] = useState(false);

  const [arteInput, setArteInput] = useState(arteCode);
  const [coralInput, setCoralInput] = useState(coralCode);

  useEffect(() => {
    localStorage.setItem("cancun_honeymoon_arte_code", arteCode);
  }, [arteCode]);

  useEffect(() => {
    localStorage.setItem("cancun_honeymoon_coral_code", coralCode);
  }, [coralCode]);

  const handleSaveArte = () => {
    setArteCode(arteInput);
    setIsEditingArte(false);
  };

  const handleSaveCoral = () => {
    setCoralCode(coralInput);
    setIsEditingCoral(false);
  };

  // 2. Budget Expense Tracker State
  interface Expense {
    id: string;
    title: string;
    amount: number; // in USD
    category: "flights" | "hotels" | "dining" | "tips" | "activities" | "other";
  }

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("cancun_honeymoon_expenses_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: "e4", title: "치첸이사 전 투어 보증세", amount: 66, category: "activities" },
      { id: "e5", title: "버틀러 및 테이블 기본 팁 묶음", amount: 100, category: "tips" }
    ];
  });

  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState<Expense["category"]>("dining");

  useEffect(() => {
    localStorage.setItem("cancun_honeymoon_expenses_v2", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTitle.trim() || !newExpenseAmount) return;
    
    const amt = parseFloat(newExpenseAmount);
    if (isNaN(amt) || amt <= 0) return;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      title: newExpenseTitle.trim(),
      amount: amt,
      category: newExpenseCategory
    };

    setExpenses(prev => [...prev, newExpense]);
    setNewExpenseTitle("");
    setNewExpenseAmount("");
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const totalBudget = expenses.reduce((sum, e) => sum + e.amount, 0);

  // 5. Unused Share/Countdown logic removed


  return (
    <div className="bg-gradient-to-tr from-rose-50/70 via-amber-50/40 to-indigo-50/50 min-h-screen text-slate-800 pb-16">
      
      {/* 1. Header (Sticky navigation) */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-rose-100/30 py-5 px-6 text-center shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="font-serif text-lg font-bold text-slate-800 tracking-wider">Honeymoon in Cancun</span>
          </div>
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
            실시간 허브 💍
          </div>
        </div>
      </header>

      {/* 2. Main Content Grid */}
      <main className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        
        {/* welcome Hero Banner */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100/30 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-rose-100/30 rounded-full blur-3xl"></div>
          <div className="absolute left-0 bottom-0 -translate-x-12 translate-y-12 w-48 h-48 bg-amber-100/30 rounded-full blur-3xl"></div>
          
          <div className="text-center space-y-2 relative">
            <span className="text-[10px] font-black tracking-widest text-rose-500 uppercase">August 29, 2026 - September 08, 2026</span>
            <h1 className="text-3xl font-black text-slate-800 font-serif flex items-center justify-center gap-2">
              정진 ❤️ 예찬 <span className="text-2xl">💍</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
              서로 평생 동안 아끼고 섬겨줄 두 사람의 눈부신 칸쿤 신혼여행 일정 및 스마트 리조트 치트키 허브 🌴
            </p>
          </div>

          {/* Booking Confirmation / Code Pill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex-1 mr-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">스칼렛 아르떼 (Hotel Xcaret Arte)</p>
                <p className="text-xs font-bold text-slate-700 mt-1">음악동/디자인동 • 4박 예약 완료</p>
                {isEditingArte ? (
                  <div className="flex items-center gap-1.5 mt-1">
                    <input
                      type="text"
                      value={arteInput}
                      onChange={(e) => setArteInput(e.target.value)}
                      className="bg-white border border-rose-200 outline-none rounded-lg px-2 py-0.5 text-xs text-slate-700 font-mono w-full focus:ring-1 focus:ring-rose-300"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveArte}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all shrink-0"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-[10px] font-mono text-rose-500 font-bold select-all">예약코드: {arteCode}</p>
                    <button
                      onClick={() => { setArteInput(arteCode); setIsEditingArte(true); }}
                      className="text-slate-400 hover:text-rose-500 text-[10px] font-bold underline transition-all"
                    >
                      [수정]
                    </button>
                  </div>
                )}
              </div>
              <span className="text-xl shrink-0">🦁</span>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex-1 mr-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TRS 코랄 (TRS Coral Hotel)</p>
                <p className="text-xs font-bold text-slate-700 mt-1">주니어 스위트 스윔업 • 3박 예약 완료</p>
                {isEditingCoral ? (
                  <div className="flex items-center gap-1.5 mt-1">
                    <input
                      type="text"
                      value={coralInput}
                      onChange={(e) => setCoralInput(e.target.value)}
                      className="bg-white border border-indigo-200 outline-none rounded-lg px-2 py-0.5 text-xs text-slate-700 font-mono w-full focus:ring-1 focus:ring-indigo-300"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveCoral}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all shrink-0"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-[10px] font-mono text-indigo-500 font-bold select-all">예약코드: {coralCode}</p>
                    <button
                      onClick={() => { setCoralInput(coralCode); setIsEditingCoral(true); }}
                      className="text-slate-400 hover:text-indigo-500 text-[10px] font-bold underline transition-all"
                    >
                      [수정]
                    </button>
                  </div>
                )}
              </div>
              <span className="text-xl shrink-0">👙</span>
            </div>
          </div>
        </div>

        {/* 3. Dynamic Interactive Widgets (Side-by-side on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Widget column */}
          <div className="space-y-6">
            
            {/* Weather Widget */}
            <WeatherWidget />

            {/* Packing Checklist Widget */}
            <ChecklistWidget />

            {/* Expense Budget Widget */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-rose-100/30 shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">Honeymoon Wallet</span>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span>신혼여행 경비 및 한도 가계부</span>
                </h3>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">총 예산 내역 누적</span>
                  <p className="text-xl font-serif font-black text-slate-800 mt-0.5">
                    ${totalBudget.toLocaleString("ko-KR")} USD
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  올인클루시브 만끽 중 🥂
                </span>
              </div>

              {/* Expense List */}
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {expenses.map((e) => {
                  const categoryColors = {
                    flights: "text-blue-500 bg-blue-50",
                    hotels: "text-rose-500 bg-rose-50",
                    dining: "text-amber-500 bg-amber-50",
                    tips: "text-emerald-500 bg-emerald-50",
                    activities: "text-indigo-500 bg-indigo-50",
                    other: "text-slate-500 bg-slate-50"
                  };
                  return (
                    <div key={e.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-lg ${categoryColors[e.category]}`}>
                          {e.category === "flights" && "항공"}
                          {e.category === "hotels" && "숙소"}
                          {e.category === "dining" && "다이닝"}
                          {e.category === "tips" && "팁"}
                          {e.category === "activities" && "투어"}
                          {e.category === "other" && "기타"}
                        </span>
                        <span className="font-semibold text-slate-700">{e.title}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-800 font-serif">${e.amount}</span>
                        <button
                          onClick={() => handleDeleteExpense(e.id)}
                          className="text-slate-300 hover:text-rose-500 p-0.5"
                          title="삭제"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Expense Form */}
              <form onSubmit={handleAddExpense} className="space-y-2 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newExpenseTitle}
                    onChange={(e) => setNewExpenseTitle(e.target.value)}
                    placeholder="지출 항목 (예: 바나나보트 팁)"
                    className="bg-slate-50 border border-slate-100 outline-none rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
                  />
                  <input
                    type="number"
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                    placeholder="금액 (USD)"
                    className="bg-slate-50 border border-slate-100 outline-none rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={newExpenseCategory}
                    onChange={(e) => setNewExpenseCategory(e.target.value as any)}
                    className="flex-1 bg-slate-50 border border-slate-100 outline-none rounded-xl px-2.5 py-1.5 text-xs text-slate-600"
                  >
                    <option value="dining">🍽️ 다이닝/추가 식음료</option>
                    <option value="tips">💵 팁/서비스</option>
                    <option value="activities">🤿 액티비티/쇼핑</option>
                    <option value="hotels">🏨 리조트 부가서비스</option>
                    <option value="flights">✈️ 항공편 차지</option>
                    <option value="other">📦 기타 지출</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-3 py-1.5 rounded-xl border border-rose-100/20 text-xs transition-all flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>추가</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Right Widget column (AI Chat Companion) */}
          <div className="space-y-6">
            <AIChatWidget />
          </div>

        </div>

        {/* 4. Timeline Segment Header */}
        <div className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-black text-slate-800">📅 디테일 여정별 타임라인 (수정 가능)</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed pl-1">
            각 일정 카드 우측의 편집 버튼을 누르면 시간, 타이틀, 꿀팁 정보를 현지에서 내 맘대로 수정하여 저장할 수 있습니다.
          </p>
          
          <TimelineWidget 
            itinerary={itinerary} 
            onUpdateItem={handleUpdateItem} 
            onRestoreDefaults={handleRestoreDefaults}
          />
        </div>

      </main>

      {/* 5. Footer */}
      <footer className="max-w-4xl mx-auto text-center mt-16 text-slate-400 text-xs px-6">
        <div className="flex items-center justify-center gap-1 mb-2">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
          <span className="font-semibold text-slate-500">정진 님과 예찬 님의 아름다운 백년가약을 칸쿤 카리브해가 소리 높여 축복합니다!</span>
        </div>
        <p className="text-[10px] text-slate-400">ⓒ 2026 Cancun Honeymoon Organizer. Designed for pure memories.</p>
      </footer>

    </div>
  );
}
