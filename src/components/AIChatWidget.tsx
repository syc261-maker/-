import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, Compass, HelpCircle, Heart, Sparkles, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("cancun_honeymoon_chats");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "welcome",
        role: "assistant",
        text: "안녕하세요, 정진 ❤️ 예찬 신혼부부님! 🌴 에메랄드빛 카리브해 낭만이 넘쳐나는 칸쿤 허니문 AI 비서입니다. 스칼렛 아르떼와 TRS 코랄 리조트 꿀팁, 액티비티 준비물, 현지 팁 문화, 또는 실전 스페인어 회화까지 무엇이든 편하게 물어보세요! 소중한 추억을 최고로 만들어 드릴게요! ✨💍",
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
      }
    ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem("cancun_honeymoon_chats", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        }),
      });

      if (!response.ok) throw new Error("서버 응답 오류");
      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat Error:", err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        text: "앗! 카리브해 파도가 일어 잠시 통신이 원활하지 않아요. 잠시만 기다리셨다가 다시 질문해 주세요! 🌊❤️",
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("대화 내역을 초기화하시겠어요?")) {
      const initial: ChatMessage[] = [
        {
          id: "welcome",
          role: "assistant",
          text: "안녕하세요, 정진 ❤️ 예찬 신혼부부님! 🌴 에메랄드빛 카리브해 낭만이 넘쳐나는 칸쿤 허니문 AI 비서입니다. 스칼렛 아르떼와 TRS 코랄 리조트 꿀팁, 액티비티 준비물, 현지 팁 문화, 또는 실전 스페인어 회화까지 무엇이든 편하게 물어보세요! 소중한 추억을 최고로 만들어 드릴게요! ✨💍",
          timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
        }
      ];
      setMessages(initial);
      localStorage.removeItem("cancun_honeymoon_chats");
    }
  };

  const suggestions = [
    { text: "💵 칸쿤 팁 문화 요약해줘", label: "팁 문화" },
    { text: "🇲🇽 유용한 실전 스페인어 회화 5개 알려줘", label: "스페인어" },
    { text: "📸 아르떼 인생샷 찍는 법과 스팟", label: "인생샷 사냥" },
    { text: "🎒 스윔업 룸서비스 꿀조합 추천", label: "룸서비스 로망" }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-rose-100/40 shadow-sm flex flex-col h-[480px]">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-rose-50 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">AI Travel Companion</span>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
              칸쿤 허니문 AI 비서 <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </h3>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-[10px] text-slate-400 hover:text-rose-500 font-semibold bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl transition-all flex items-center gap-1"
          title="대화 초기화"
        >
          <RefreshCw className="w-3 h-3" />
          <span>대화 리셋</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 mb-3 scrollbar-thin">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1 mb-1 px-1">
              <span className="text-[10px] font-bold text-slate-400">
                {m.role === "user" ? "정진❤️예찬" : "칸쿤 AI 비서"}
              </span>
              <span className="text-[9px] text-slate-300">• {m.timestamp}</span>
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-rose-500 text-white rounded-tr-none"
                  : "bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-none"
              }`}
              style={{ whiteSpace: "pre-wrap" }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1 mb-1 px-1">
              <span className="text-[10px] font-bold text-slate-400">칸쿤 AI 비서</span>
              <span className="text-[9px] text-slate-300">• 입력 중...</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
              <div className="w-2.5 h-2.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2.5 h-2.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2.5 h-2.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && !loading && (
        <div className="mb-3 shrink-0">
          <p className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-rose-400" />
            <span>이런 질문을 해보세요!</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s.text)}
                className="text-[10px] bg-rose-50/70 hover:bg-rose-100/70 text-rose-600 font-bold px-2.5 py-1.5 rounded-xl border border-rose-100/30 transition-all text-left"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="AI 비서에게 질문을 남겨보세요..."
          disabled={loading}
          className="flex-1 bg-slate-50 border border-slate-100 hover:border-rose-100 focus:border-rose-300 focus:ring-1 focus:ring-rose-200 outline-none rounded-2xl px-4 py-3 text-xs text-slate-700 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl p-3 shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
