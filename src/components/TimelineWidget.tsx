import { useState } from "react";
import { DayItinerary, ItineraryItem } from "../types";
import { Edit2, Save, X, Search, Check, AlertCircle, RefreshCw } from "lucide-react";

interface TimelineWidgetProps {
  itinerary: DayItinerary[];
  onUpdateItem: (dayNumber: number, itemId: string, updatedFields: Partial<ItineraryItem>) => void;
  onRestoreDefaults: () => void;
}

export default function TimelineWidget({ itinerary, onUpdateItem, onRestoreDefaults }: TimelineWidgetProps) {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({
    1: true, // Expand first day by default
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ItineraryItem>>({});

  const toggleDay = (dayNum: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const toggleAllDays = () => {
    const allExpanded = Object.keys(expandedDays).length === itinerary.length && 
      Object.values(expandedDays).every(val => val === true);
    
    const nextState: Record<number, boolean> = {};
    itinerary.forEach(d => {
      nextState[d.dayNumber] = !allExpanded;
    });
    setExpandedDays(nextState);
  };

  const isAllExpanded = itinerary.length > 0 && 
    itinerary.every(d => expandedDays[d.dayNumber] === true);

  // Search filtering
  const filteredItinerary = itinerary.map(day => {
    if (!searchQuery.trim()) return day;
    
    const query = searchQuery.toLowerCase();
    const matchingItems = day.items.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query) || 
      (item.tips && item.tips.toLowerCase().includes(query)) ||
      day.title.toLowerCase().includes(query) ||
      day.subtitle.toLowerCase().includes(query)
    );

    return {
      ...day,
      items: matchingItems,
      // Keep day visible if day itself matches OR has matching items
      isMatch: matchingItems.length > 0 || 
               day.title.toLowerCase().includes(query) || 
               day.subtitle.toLowerCase().includes(query)
    };
  }).filter(day => searchQuery.trim() === "" || (day as any).isMatch);

  // Edit action handlers
  const startEdit = (item: ItineraryItem) => {
    setEditingItemId(item.id);
    setEditForm({
      time: item.time,
      title: item.title,
      description: item.description,
      tips: item.tips || ""
    });
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setEditForm({});
  };

  const saveEdit = (dayNumber: number, itemId: string) => {
    onUpdateItem(dayNumber, itemId, editForm);
    setEditingItemId(null);
    setEditForm({});
  };

  const handleInputChange = (field: keyof ItineraryItem, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      {/* Search and Global Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white/95 backdrop-blur-md rounded-3xl p-4 border border-rose-100/40 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="일정 검색 (예: 스테이크, 스칼렛)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 hover:border-rose-100/50 focus:border-rose-300 focus:ring-1 focus:ring-rose-200 outline-none rounded-2xl text-xs text-slate-700 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={toggleAllDays}
            className="text-xs text-rose-500 font-bold bg-rose-50/50 hover:bg-rose-100/50 px-3.5 py-2 rounded-2xl border border-rose-100/20 transition-all"
          >
            {isAllExpanded ? "모든 일정 접기" : "모든 일정 펼치기"}
          </button>
          <button
            onClick={() => {
              if (window.confirm("수정된 일정을 지우고 원본 칸쿤 일정표로 완벽하게 되돌릴까요?")) {
                onRestoreDefaults();
              }
            }}
            className="text-xs text-slate-500 font-bold bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-2xl border border-slate-100 transition-all flex items-center gap-1"
            title="원본 리셋"
          >
            <RefreshCw className="w-3 h-3" />
            <span>원본 리셋</span>
          </button>
        </div>
      </div>

      {/* Days Loop */}
      <div className="space-y-4">
        {filteredItinerary.length === 0 ? (
          <div className="bg-white/80 rounded-3xl p-8 border border-rose-100/40 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p className="text-xs font-bold text-slate-700">검색 결과와 일치하는 일정이 없어요.</p>
            <p className="text-[10px] text-slate-400">다른 키워드로 검색해 보세요.</p>
          </div>
        ) : (
          filteredItinerary.map((day) => {
            const isExpanded = !!expandedDays[day.dayNumber] || searchQuery.trim() !== "";
            const isXcaret = day.dayNumber <= 5; // Day 1-5 is Xcaret area
            
            return (
              <div
                key={day.dayNumber}
                className="bg-white rounded-3xl shadow-sm border border-rose-100/30 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Day Header Accordion Trigger */}
                <button
                  onClick={() => toggleDay(day.dayNumber)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-rose-50/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold shadow-sm ${
                      isXcaret 
                        ? "bg-rose-50 text-rose-600 border border-rose-100/50" 
                        : "bg-indigo-50 text-indigo-600 border border-indigo-100/50"
                    }`}>
                      <span className="text-xs tracking-tighter">
                        {day.dateStr.split(" ")[0]}
                      </span>
                      <span className="text-[9px] uppercase mt-0.5">
                        {day.dateStr.split(" ")[1] || ""}
                      </span>
                    </div>
                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${
                        isXcaret ? "text-rose-400" : "text-indigo-400"
                      }`}>
                        Day {day.dayNumber} • {day.title}
                      </span>
                      <h3 className="text-xs font-extrabold text-slate-800 mt-0.5">
                        {day.subtitle}
                      </h3>
                    </div>
                  </div>
                  <div className="p-1.5 hover:bg-slate-100 rounded-xl transition-all">
                    <svg
                      className={`w-4 h-4 text-slate-400 transform transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Day Content Timeline Items */}
                {isExpanded && (
                  <div className="border-t border-slate-50 p-5 bg-slate-50/40 space-y-5">
                    <div className="relative border-l-2 border-rose-100/70 ml-2.5 pl-5 space-y-6">
                      {day.items.map((item, idx) => {
                        const isEditing = editingItemId === item.id;
                        
                        return (
                          <div key={item.id} className="relative group">
                            {/* Marker dot */}
                            <div className={`absolute -left-[27.5px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                              isXcaret 
                                ? "border-rose-300 group-hover:bg-rose-500" 
                                : "border-indigo-300 group-hover:bg-indigo-500"
                            }`}>
                              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                            </div>

                            {/* Item details */}
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  {/* Time stamp */}
                                  <span className={`text-xs font-extrabold font-mono px-2 py-0.5 rounded-lg ${
                                    isXcaret 
                                      ? "bg-rose-50 text-rose-600 border border-rose-100/30" 
                                      : "bg-indigo-50 text-indigo-600 border border-indigo-100/30"
                                  }`}>
                                    {item.time}
                                  </span>
                                  {/* Title */}
                                  {!isEditing && (
                                    <h4 className="text-xs font-bold text-slate-800">
                                      {item.title}
                                    </h4>
                                  )}
                                </div>

                                {/* Edit Action Button */}
                                {!isEditing && (
                                  <button
                                    onClick={() => startEdit(item)}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-500 transition-all"
                                    title="일정 수정하기"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>

                              {/* Editable Mode */}
                              {isEditing ? (
                                <div className="bg-white border border-rose-200/60 rounded-2xl p-4 shadow-sm space-y-3 mt-1 animate-fade-in">
                                  <div className="grid grid-cols-4 gap-2">
                                    <div className="col-span-1">
                                      <label className="text-[9px] font-bold text-slate-400 uppercase">시간</label>
                                      <input
                                        type="text"
                                        value={editForm.time || ""}
                                        onChange={(e) => handleInputChange("time", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 focus:border-rose-300 outline-none rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
                                      />
                                    </div>
                                    <div className="col-span-3">
                                      <label className="text-[9px] font-bold text-slate-400 uppercase">일정 제목</label>
                                      <input
                                        type="text"
                                        value={editForm.title || ""}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 focus:border-rose-300 outline-none rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-[9px] font-bold text-slate-400 uppercase">일정 설명</label>
                                    <textarea
                                      rows={2}
                                      value={editForm.description || ""}
                                      onChange={(e) => handleInputChange("description", e.target.value)}
                                      className="w-full bg-slate-50 border border-slate-100 focus:border-rose-300 outline-none rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-[9px] font-bold text-rose-400 uppercase font-semibold">꿀팁/팁 정보 (선택)</label>
                                    <input
                                      type="text"
                                      value={editForm.tips || ""}
                                      onChange={(e) => handleInputChange("tips", e.target.value)}
                                      placeholder="예: 드레스코드 포멀 캐주얼 필수..."
                                      className="w-full bg-slate-50 border border-slate-100 focus:border-rose-300 outline-none rounded-xl px-2.5 py-1.5 text-xs text-slate-700"
                                    />
                                  </div>

                                  <div className="flex justify-end gap-1.5">
                                    <button
                                      onClick={cancelEdit}
                                      className="text-[10px] text-slate-500 font-bold bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-100 transition-all flex items-center gap-1"
                                    >
                                      <X className="w-3 h-3" />
                                      <span>취소</span>
                                    </button>
                                    <button
                                      onClick={() => saveEdit(day.dayNumber, item.id)}
                                      className="text-[10px] text-white font-bold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 px-3.5 py-1.5 rounded-xl shadow-sm transition-all flex items-center gap-1"
                                    >
                                      <Save className="w-3 h-3" />
                                      <span>저장</span>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                /* Read Mode */
                                <div className="space-y-1 pl-1">
                                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                    {item.description}
                                  </p>
                                  {item.tips && (
                                    <p className="text-[11px] text-rose-500 font-bold leading-relaxed bg-rose-50/30 p-2 rounded-xl border border-rose-100/10">
                                      💡 {item.tips}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
