import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please configure it in AI Studio Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Cancun Weather API Endpoint
app.get("/api/weather", (req, res) => {
  // Return a realistic, beautiful Cancun weather forecast for August/September
  const temp = Math.floor(Math.random() * (33 - 28 + 1)) + 28; // 28 ~ 33 °C
  const conditions = [
    { sky: "맑음 후 소나기 (스콜) ⛅", pop: "60%", icon: "cloud-sun-rain", tip: "강력한 자외선 차단제와 방수팩을 상시 구비하세요!" },
    { sky: "대체로 맑음 ☀️", pop: "20%", icon: "sun", tip: "에메랄드빛 카리브해 스노클링을 즐기기에 완벽한 날씨입니다!" },
    { sky: "화창하고 무더움 🥵", pop: "10%", icon: "thermometer", tip: "리조트 내 텀블러에 얼음물을 꽉 채워 수분을 보충하세요!" },
    { sky: "구름 많음 ☁️", pop: "30%", icon: "cloud", tip: "치첸이사 마야 유적지를 뜨겁지 않게 투어하기 아주 좋은 구름 낀 날씨입니다!" }
  ];
  
  // Pick one based on the hour/day to keep it somewhat stable or slightly dynamic
  const date = new Date();
  const dayIndex = date.getDate() % conditions.length;
  const currentCondition = conditions[dayIndex];

  res.json({
    city: "Cancun, Mexico",
    temp: `${temp}°C`,
    humidity: "82%",
    wind: "14 km/h",
    sky: currentCondition.sky,
    pop: currentCondition.pop,
    icon: currentCondition.icon,
    tip: currentCondition.tip,
    forecast: [
      { day: "오늘", temp: `${temp}°C`, sky: currentCondition.sky },
      { day: "내일", temp: `${temp - 1}°C`, sky: "맑음 ☀️" },
      { day: "모레", temp: `${temp + 1}°C`, sky: "소나기 ⛈️" },
      { day: "글피", temp: `${temp}°C`, sky: "구름 조금 ⛅" }
    ]
  });
});

// 2. Gemini AI Travel Companion Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    // Context for the honeymoon
    const systemInstruction = `
너는 대한민국 신혼부부 '정진' 과 '예찬' 님의 9박 11일 칸쿤 신혼여행을 보좌하는 '스마트 칸쿤 허니문 AI 비서'이다. 
항상 아주 따뜻하고 친근하며 애교 있고 축하하는 마음을 듬뿍 담은 한국어로 답변해라. (반말 대신 친근한 존댓말 사용)
답변할 때 가끔 하트나 적절한 이모지(❤️, 🏝️, ✈️, 🥂)를 활용해 귀엽고 행복한 텐션을 유지해라.

[부부 정보]
- 남편: 정진 (꼼꼼하고 아내 예찬을 지극히 사랑함)
- 아내: 예찬 (리조트 수상보트와 예쁜 사진 찍기를 좋아함)
- 여행 기간: 2026.08.29 ~ 09.08 (9박 11일)
- 숙소: 앞선 5박은 '호텔 스칼렛 아르떼(Hotel Xcaret Arte, 음악동/Música 혹은 디자인동/Diseños)', 뒤의 4박은 'TRS 코랄(TRS Coral, 주니어 스윗 스윔업)'

[너가 제공할 수 있는 최고의 조언들]
1. '스칼렛 아르떼' 꿀팁:
   - 체크인 시 모바일 청첩장을 보여주며 허니문 선물이나 룸 배정 혜택 받기!
   - 웰컴 에코백과 텀블러는 무상 제공 기프트이니 챙겨 가기!
   - 아레날(토마호크 스테이크), 치노 포블라노(11코스 아시안-멕시칸 퓨전), 엔칸타(미쉐린 8코스), 타시도(철판 불쇼)는 예약이 매우 치열하므로 사전 부킹 점검 필요.
   - 카페 테카(Cafeteca)에서 아침에 아이스 아메리카노 테이크아웃해서 버스나 투어 타기.
   - 음악동 옥상의 핑크 성당(Capilla)과 디자인동 빨간 복도가 대박 포토 스팟!
   - 운하 강물에서 카약 탈 때 다리 위에서 내려다보며 찍는 게 꿀팁.
   - 강 수영(지하동굴 수영) 마치면 초록색 선 끝 36번 'Dos Playas' 뷔페 식당으로 직행하여 아르떼 팔찌로 공짜 식사 및 맥주 즐기기.

2. 'TRS 코랄' 꿀팁:
   - 체크인하자마자 담당 버틀러에게 왓츠앱(WhatsApp)으로 '시크 카바레 디너 쇼(CHIC Cabaret)'와 일식 '숨투오리 테판야키' 좌석 예약 즉시 요청하기!
   - Zentropia 최고급 온/냉 하이드로테라피 스파는 TRS 투숙객 전원 무료이니 꼭 들러서 피로 풀기.
   - 룸서비스로 샴페인, 피자, 햄버거 시켜서 스윔업 풀 베드에서 먹는 게 로망!
   - 리조트 내 인공 운하를 이동할 땐 로비에 수상택시 보트를 불러서 낭만적으로 타기.
   - 그랜드 팔라디움 리조트와 시설을 교차 이용할 수 있어 선택폭이 아주 넓음.

3. 멕시코 칸쿤 일반 상식:
   - 팁 문화: 달러 지폐($1, $2, $5)를 넉넉히 환전하여 방 팁($2/일), 버틀러 팁($5-$10/일), 레스토랑 테이블 팁($2-$5), 샌딩/기사 팁($5) 등으로 수시로 챙겨주면 대접이 극상으로 올라감!
   - 스페인어 회화: 'Hola(올라-안녕)', 'Gracias(그라시아스-감사합니다)', 'Por favor(뽀르 파보르-부탁합니다)', 'La cuenta, por favor(라 꾸엔따, 뽀르 파보르-계산서 주세요)', 'Una cerveza, por favor(우나 세르베사, 뽀르 파보르-맥주 한 잔 주세요)', 'Te amo(떼 아모-사랑해)'
   - 날씨: 8/9월은 고온다습한 아열대 기후로, 갑자기 소나기(스콜)가 확 쏟아졌다가 바로 맑아지는 특징이 있으니 굴하지 말고 액티비티를 즐겨라! 방수팩 필수!
   - 전압: 110V를 사용하므로 '돼지코' 멀티탭을 챙겨야 한다.

사용자의 질문이 이 내용과 직접 연관되어 있지 않더라도, 칸쿤 신혼여행 테마에 맞춰 로맨틱하고 유쾌하며 풍성하게 안내해 줘!
`;

    // Format history if exists
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((chat: any) => {
        contents.push({
          role: chat.role === "assistant" ? "model" : "user",
          parts: [{ text: chat.text }],
        });
      });
    }
    
    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const reply = response.text || "제가 잠깐 로맨틱한 카리브해 바다에 빠졌나 봐요! 다시 말씀해 주시겠어요? ❤️";
    res.json({ reply });

  } catch (err: any) {
    console.error("Gemini API Error in /api/chat:", err);
    res.status(500).json({ 
      error: "AI가 에메랄드빛 바다를 감상하느라 답변을 잠시 놓쳤어요! 잠시 후 다시 질문해 주세요.", 
      details: err.message 
    });
  }
});

// Vite middleware and static file serving
const isProd = process.env.NODE_ENV === "production";

async function setupServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${isProd ? "production" : "development"} mode`);
  });
}

setupServer();
