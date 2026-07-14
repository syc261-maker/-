import React, { useState, useEffect } from "react";
import { ChecklistItem } from "../types";
import { defaultChecklist } from "../data";
import { Plus, Trash2, Check, RefreshCw } from "lucide-react";

export default function ChecklistWidget() {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem("cancun_honeymoon_checklist");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultChecklist;
  });

  const [activeTab, setActiveTab] = useState<"essentials" | "dresscode" | "water" | "electronics">("essentials");
  const [newItemText, setNewItemText] = useState("");

  useEffect(() => {
    localStorage.setItem("cancun_honeymoon_checklist", JSON.stringify(items));
  }, [items]);

  const handleToggle = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text: newItemText.trim(),
      category: activeTab,
      completed: false
    };

    setItems(prev => [...prev, newItem]);
    setNewItemText("");
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    if (window.confirm("준비물 목록을 처음 기본 상태로 되돌릴까요? 추가하신 항목은 사라집니다.")) {
      setItems(defaultChecklist);
    }
  };

  // Filter items based on active tab
  const filteredItems = items.filter(item => item.category === activeTab);
  
  // Progress calculations
  const totalInTab = filteredItems.length;
  const completedInTab = filteredItems.filter(item => item.completed).length;
  const percentInTab = totalInTab > 0 ? Math.round((completedInTab / totalInTab) * 100) : 0;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-rose-100/40 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">Honeymoon Packing List</span>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            🎒 스마트 준비물 체크리스트
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="text-[10px] text-slate-400 hover:text-rose-500 font-semibold bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl transition-all flex items-center gap-1"
          title="기본값으로 복원"
        >
          <RefreshCw className="w-3 h-3" />
          <span>초기화</span>
        </button>
      </div>

      {/* Categories Tab Navigation */}
      <div className="flex flex-wrap gap-1 border-b border-slate-100 pb-2">
        {(["essentials", "dresscode", "water", "electronics"] as const).map(tab => {
          const tabLabels = {
            essentials: "필수 서류/머니",
            dresscode: "드레스코드",
            water: "물놀이/액티비티",
            electronics: "전자기기"
          };
          const isActive = activeTab === tab;
          const tabCount = items.filter(item => item.category === tab).length;
          const tabCompleted = items.filter(item => item.category === tab && item.completed).length;
          
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                isActive
                  ? "bg-rose-100 text-rose-600 shadow-sm"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <span>{tabLabels[tab]}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                isActive ? "bg-rose-200 text-rose-700" : "bg-slate-100 text-slate-400"
              }`}>
                {tabCompleted}/{tabCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Info Highlight */}
      {activeTab === "dresscode" && (
        <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100/30 text-[11px] text-amber-800 leading-relaxed space-y-1">
          <p className="font-bold">⚠️ 칸쿤 럭셔리 디너 드레스코드 (포멀 캐주얼)</p>
          <p className="text-slate-600 text-[10px]">
            - <span className="font-semibold text-amber-700">남성:</span> 카라 깃이 있는 셔츠/카라티, 긴바지(반바지/트레이닝복 절대 금지), 단정 단화/단화 스니커즈 (슬리퍼 절대 입장 불가)<br />
            - <span className="font-semibold text-amber-700">여성:</span> 화사한 원피스, 칵테일 드레스, 단정한 구두 또는 슬링백 샌들
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
          <span>진행률</span>
          <span className="text-rose-500">{percentInTab}% 완료 ({completedInTab}/{totalInTab})</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500"
            style={{ width: `${percentInTab}%` }}
          ></div>
        </div>
      </div>

      {/* Packing Items List */}
      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6 font-medium">이 카테고리에는 등록된 준비물이 없습니다.</p>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                item.completed
                  ? "bg-slate-50/50 border-slate-100 text-slate-300 line-through"
                  : "bg-white border-slate-100 text-slate-600 hover:border-rose-100/50"
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer flex-1 select-none">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggle(item.id)}
                  className="hidden"
                />
                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                  item.completed
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "border-slate-300 hover:border-rose-400 bg-white"
                }`}>
                  {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs font-semibold">{item.text}</span>
              </label>
              
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="text-slate-300 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-50 transition-all"
                title="삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="추가할 준비물을 적어보세요..."
          className="flex-1 bg-slate-50 border border-slate-100 hover:border-rose-100/50 focus:border-rose-300 focus:ring-1 focus:ring-rose-200 outline-none rounded-2xl px-3 py-2 text-xs text-slate-700 transition-all"
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="bg-rose-50 hover:bg-rose-100 text-rose-600 disabled:opacity-50 p-2 rounded-2xl border border-rose-100/20 transition-all flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
