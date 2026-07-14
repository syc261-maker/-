import { DayItinerary, ChecklistItem } from "./types";

export const defaultItinerary: DayItinerary[] = [
  {
    dayNumber: 1,
    dateStr: "8/29 (토)",
    title: "LA 레이오버",
    subtitle: "라라랜드 로맨틱 데이",
    items: [
      {
        id: "d1-1",
        time: "12:40",
        title: "✈️ 서울(ICN) 출발",
        description: "아시아나 항공 [OZ202] 탑승하여 설레는 신혼여행 시작!",
        icon: "✈️",
        category: "travel"
      },
      {
        id: "d1-2",
        time: "08:20",
        title: "🛬 LAX 공항 도착 & 입국 심사",
        description: "레이오버 시간을 위한 입국 심사 진행. 공항 밖으로 나갈 예정!",
        tips: "※ 공항 밖 이동 시 'Bounce' 앱 등으로 짐 미리 맡기면 훨씬 편리해요.",
        icon: "🛂",
        category: "travel"
      },
      {
        id: "d1-3",
        time: "11:00",
        title: "🍔 인앤아웃 버거 (In-N-Out) 세풀베다 점",
        description: "머리 위로 비행기가 낮게 착륙하는 장관과 함께 애니멀 스타일 프라이와 버거 먹기!",
        tips: "비행기가 활주로로 내려앉는 소름 돋는 인생 동영상 촬영 필수 📸",
        icon: "🍔",
        category: "dining"
      },
      {
        id: "d1-4",
        time: "13:30",
        title: "🛍️ 산타모니카 비치 & 얼스 카페",
        description: "캘리포니아의 눈부신 햇살을 받으며 해변 산책 후, 얼스 카페(Urth Caffé)에서 유기농 말차 보바 즐기기",
        icon: "🏖️",
        category: "activity"
      },
      {
        id: "d1-5",
        time: "16:30",
        title: "🎬 그리피스 천문대 (Griffith Observatory)",
        description: "할리우드 사인을 감상하며 라라랜드의 낭만적인 노을과 보랏빛 야경을 가득 눈에 담기",
        tips: "오후 늦은 시간 트래픽이 심할 수 있으니 우버 호출 미리 체크!",
        icon: "🎬",
        category: "activity"
      },
      {
        id: "d1-6",
        time: "20:30",
        title: "🚖 LAX 공항 복귀",
        description: "퇴근길 트래픽을 고려하여 여유 있게 공항으로 이동 (우버 탑승 시 LAX-it 탑승장을 이용해 주세요)",
        icon: "🚖",
        category: "travel"
      },
      {
        id: "d1-7",
        time: "23:59",
        title: "✈️ LAX 출발",
        description: "칸쿤 입성을 위한 유나이티드 항공 [UA1075] 탑승. 기내에서 꿀잠 자두기!",
        icon: "✈️",
        category: "travel"
      }
    ]
  },
  {
    dayNumber: 2,
    dateStr: "8/30 (일)",
    title: "아르떼 입성",
    subtitle: "웰컴 스칼렛 & 타시도",
    items: [
      {
        id: "d2-1",
        time: "06:41",
        title: "✈️ 칸쿤(CUN) 공항 도착",
        description: "드디어 멕시코 칸쿤 도착! 후끈한 카리브해 공기와 인사하기 🌴",
        icon: "🌴",
        category: "travel"
      },
      {
        id: "d2-2",
        time: "09:00",
        title: "🏨 스칼렛 아르떼 도착 & 체크인 등록",
        description: "캐리어 보관 후 '올인클루시브 밴드' 착용하여 바로 리조트 라이프 만끽!",
        tips: "★ 체크인 치트키: '허니문'이라고 수줍게 언급하며 모바일 청첩장 보여주기! 음악동(Música)이나 디자인동(Diseños) 배정을 강하게 제안하고, 무료 증정품인 예쁜 에코백과 텀블러 꼭 챙기기!",
        icon: "🏨",
        category: "hotel"
      },
      {
        id: "d2-3",
        time: "09:30",
        title: "🍽️ 메르까도 산 후안 (조식 뷔페)",
        description: "멕시칸 야시장 분위기의 조식 뷔페. 신선한 즉석 퀘사디아와 생과일 착즙 주스가 매혹적이에요.",
        icon: "🥑",
        category: "dining"
      },
      {
        id: "d2-4",
        time: "11:00",
        title: "🎒 스칼렛 파크 (Xcaret Park) & 지하 강 수영",
        description: "바닥의 파란 선을 따라 천연 동굴 지하 강 수영(약 1시간 코스) 진행",
        tips: "강 수영이 끝나는 초록색 선 끝 'Dos Playas' 뷔페 식당에서 아르떼 팔찌 태깅 후 해산물 뷔페와 무제한 맥주 먹기! (수영복 위에 가벼운 셔츠 걸쳐야 입장 가능)",
        icon: "🏊",
        category: "activity"
      },
      {
        id: "d2-5",
        time: "18:00",
        title: "🍽️ 타시도 (Tah-Xido) 철판요리",
        description: "눈앞에서 화려하게 펼쳐지는 데판야끼 불쇼와 고급 코스 요리",
        tips: "드레스코드: 포멀 캐주얼 (남성은 반드시 깃이 있는 카라티/셔츠와 찢어지지 않은 긴바지, 슬리퍼가 아닌 스니커즈/단화 착용 필수!)",
        icon: "🔥",
        category: "dining"
      },
      {
        id: "d2-6",
        time: "19:30",
        title: "🍸 스피크이지 바 '디세뇨' (Diseño)",
        description: "도자기 공방 뒤 비밀 장막을 걷으면 열리는 힙한 라이브 재즈 바",
        tips: "주문 꿀팁: 메뉴에 없는 프리미엄 투명 데킬라 '돈 훌리오 70 (Don Julio 70)' 이나 '에라두라 울트라 (Herradura Ultra)'를 주문해 보세요!",
        icon: "🍸",
        category: "leisure"
      }
    ]
  },
  {
    dayNumber: 3,
    dateStr: "8/31 (월)",
    title: "마야 유적지",
    subtitle: "치첸이사 & 스테이크",
    items: [
      {
        id: "d3-1",
        time: "06:30",
        title: "☕ 카페 테카 (Cafeteca) 방문",
        description: "버스를 타기 전 들러 아이스 아메리카노와 과일, 크루아상을 무료로 테이크아웃하기!",
        icon: "☕",
        category: "dining"
      },
      {
        id: "d3-2",
        time: "07:05",
        title: "🎒 치첸이사 (Xichen) 투어 출발",
        description: "세계 7대 불가사의 신비로운 마야 유적지 투어. 버스에서 빵/주스 조식 박스 지급해요.",
        tips: "그늘이 아예 없는 땡볕입니다! 아르떼 텀블러에 얼음물 가득 채우고 모자/선글라스 필수. 현장에서 지불할 도시세(인당 $33 달러 현금) 미리 챙겨가기!",
        icon: "🗿",
        category: "activity"
      },
      {
        id: "d3-3",
        time: "20:30",
        title: "🏨 호텔 복귀 후 휴식",
        description: "장거리 왕복 투어로 노곤해진 몸 쉬기. 빨랫감은 객실동 무료 세탁실(세제/건조기 완비)에 돌려두면 보송해져요.",
        icon: "🛌",
        category: "hotel"
      },
      {
        id: "d3-4",
        time: "21:00",
        title: "🍽️ 아레날 (Arenal) 저녁 식사",
        description: "에메랄드빛 강가 정글 모래사장 야외에서 즐기는 초대형 토마호크 스테이크!",
        tips: "드레스코드: 포멀 캐주얼. 로맨틱한 카리브해 낭만의 정점",
        icon: "🥩",
        category: "dining"
      }
    ]
  },
  {
    dayNumber: 4,
    dateStr: "9/1 (화)",
    title: "캐리비안 천연 워터파크",
    subtitle: "셀하 & 카약 & 치노 포블라노",
    items: [
      {
        id: "d4-1",
        time: "09:05",
        title: "🎒 셀하 (Xel-Ha) 투어 출발",
        description: "천연 카리브해 민물 만이 만나는 해상 자연 스노클링 파크! 무제한 짚라인, 튜브 수영, 먹거리가 가득!",
        tips: "식음료 무제한 공짜! 아쿠아슈즈 필수로 챙겨가세요.",
        icon: "🐠",
        category: "activity"
      },
      {
        id: "d4-2",
        time: "17:30",
        title: "🏨 호텔 복귀",
        description: "리조트로 안전하게 샌딩 버스 타고 복귀 완료",
        icon: "🏨",
        category: "hotel"
      },
      {
        id: "d4-3",
        time: "17:40",
        title: "🚣 인공운하 강변 카약 타기",
        description: "젖은 래시가드 옷 그대로 아르떼 인공 운하에서 무료 카약 노젓기!",
        tips: "📸 최고 구도: 예찬 님이 에메랄드 운하 위 카약에 앉아있을 때, 정진 님이 아르떼 출렁다리 위에서 수직으로 하이앵글 촬영해 주면 허니문 시그니처 컷 탄생!",
        icon: "🚣",
        category: "activity"
      },
      {
        id: "d4-4",
        time: "19:30",
        title: "🍽️ 치노 포블라노 (Chino Poblano) 11코스 저녁",
        description: "아시아 테이스트와 멕시칸 정통 한계를 예술적으로 무너뜨린 감동적인 파이너 코스 요리",
        tips: "드레스코드: 포멀 캐주얼 필수.",
        icon: "🥢",
        category: "dining"
      }
    ]
  },
  {
    dayNumber: 5,
    dateStr: "9/2 (수)",
    title: "신비의 천연 우물",
    subtitle: "세노테 & 루프탑 노을 & 엔칸타",
    items: [
      {
        id: "d5-1",
        time: "07:30",
        title: "📸 아침 기습 인생샷 사냥",
        description: "아침 식사 전 투숙객이 없을 때 리조트 최고 명당 기습 촬영!",
        tips: "추천 스팟 1: 음악동 옥상 '핑크 성당(Capilla)'의 예쁜 인디핑크 돔. 추천 스팟 2: 디자인동 '빨간 복도' 아치형 기둥.",
        icon: "📸",
        category: "leisure"
      },
      {
        id: "d5-2",
        time: "08:40",
        title: "🎒 세노테 (Xenotes) 투어 출발",
        description: "정글 속 4가지 서로 다른 신비한 천연 동굴 우물(세노테)에서 카약, 다이빙, 집라인 즐기기",
        tips: "수건과 아쿠아슈즈 꼭 챙기기! 정글 속 자연 보호를 위해 화학 선크림 사용 불가하니 래시가드 착용 추천.",
        icon: "🕳️",
        category: "activity"
      },
      {
        id: "d5-3",
        time: "17:30",
        title: "🏨 호텔 복귀 후 힐링 자쿠지",
        description: "객실 테라스에 비치된 무료 천연 로즈 배스 솔트(입욕제)를 대형 야외 돌 자쿠지에 풀어 노을 보며 온천욕 🛁",
        icon: "🛁",
        category: "hotel"
      },
      {
        id: "d5-4",
        time: "17:40",
        title: "🍹 디자인동 루프탑 칵테일 힐링",
        description: "아르떼에서 가장 광활하게 바다가 내려다보이는 디자인동 루프탑 풀바에서 맛있는 칵테일 마시며 석양 맞이",
        icon: "🍹",
        category: "leisure"
      },
      {
        id: "d5-5",
        time: "19:00",
        title: "🍽️ 엔칸타 (Encanta) 8코스 저녁",
        description: "눈앞의 야외 분수쇼와 감미로운 연주를 감상하며 먹는 미쉐린 스타 셰프의 환상적인 멕시칸 퀴진 코스",
        tips: "드레스코드: 포멀 캐주얼.",
        icon: "🎻",
        category: "dining"
      }
    ]
  },
  {
    dayNumber: 6,
    dateStr: "9/3 (목)",
    title: "리조트 이동",
    subtitle: "스플로르 & TRS 코랄 체크인",
    items: [
      {
        id: "d6-1",
        time: "08:00",
        title: "🍽️ 칸티나 VI.AI.PY (조식 단품)",
        description: "뷔페보다 한적하고 로맨틱한 분위기에서 즐기는 단품 조식. 수란 및 아보카도 크로플 추천!",
        icon: "🍳",
        category: "dining"
      },
      {
        id: "d6-2",
        time: "10:00",
        title: "🏨 스칼렛 아르떼 체크아웃",
        description: "아르떼 아쉬운 안녕! 캐리어 짐 보관 접수. 아르떼 팔찌는 절대 가위로 자르지 마세요! (체크아웃 후 오후까지 계속 액티비티 무료 이용 가능)",
        icon: "🔑",
        category: "hotel"
      },
      {
        id: "d6-3",
        time: "10:30",
        title: "🎒 스플로르 (Xplor) 액티비티 자유 놀기",
        description: "정글 속 와일드 집라인 타기, 사륜 정글차 몰기, 동굴 수영 정복! 스낵바와 뷔페 무상 이용 가능해요.",
        icon: "🧗",
        category: "activity"
      },
      {
        id: "d6-4",
        time: "15:30",
        title: "🚿 아르떼 럭셔리 라운지 샤워 & 옷 갈아입기",
        description: "체크아웃한 투숙객을 위한 아르떼 내부 무료 휴식 라운지 샤워장(샴푸, 타월, 라커 완비)에서 뽀송하게 수영복 벗고 원피스/셔츠 갈아입기!",
        icon: "🚿",
        category: "hotel"
      },
      {
        id: "d6-5",
        time: "16:30",
        title: "🚖 TRS 코랄 이동 프라이빗 픽업 차량",
        description: "대기하고 있는 프라이빗 이동 차량 탑승하여 북쪽의 럭셔리 TRS 코랄 리조트로 쾌적하게 이동",
        icon: "🚐",
        category: "travel"
      },
      {
        id: "d6-6",
        time: "18:00",
        title: "🏨 TRS 코랄 호텔 체크인",
        description: "성인 전용 최고급 힐링 안식처, 주니어 스위트 스윔업(Junior Suite Swim-Up) 객실 입성!",
        tips: "🚨 TRS 코랄 입성 최우선 과제: 배정된 담당 버틀러에게 즉시 왓츠앱을 열어 '시크 카바레 디너 쇼 (CHIC Cabaret)' 예약과 일식 '숨투오리 (Sumptuori)' 테판야키 좌석 부킹을 강하게 부탁할 것!",
        icon: "🔑",
        category: "hotel"
      },
      {
        id: "d6-7",
        time: "19:30",
        title: "🍽️ TRS 프랑스 다이닝 'La Bohème'",
        description: "에스카르고(프랑스 달팽이 요리)와 하우스 와인 페어링 시식",
        tips: "식사 후 정문 분수 로비에서 예쁜 수상 택시 보트를 호출하여 방 앞까지 낭만적으로 귀가하기 🛥️",
        icon: "🐌",
        category: "dining"
      }
    ]
  },
  {
    dayNumber: 7,
    dateStr: "9/4 (금)",
    title: "TRS 힐링 수영",
    subtitle: "카리브해 스노클링 & 스윔업 룸서비스",
    items: [
      {
        id: "d7-1",
        time: "10:30",
        title: "🤿 프라이빗 비치 스노클링 & 수영",
        description: "눈부신 화이트 샌드와 새하얀 파라솔 가득한 카리브해 전용 해변에서 칵테일 마시며 평화로운 해수욕",
        tips: "TRS 코랄 투숙객 혜택: 옆에 붙어있는 거대 '그랜드 팔라디움'의 모든 야외 수영장 및 30개 레스토랑을 무료로 교차 이용 가능!",
        icon: "🤿",
        category: "activity"
      },
      {
        id: "d7-2",
        time: "14:00",
        title: "👙 프라이빗 스윔업 룸서비스 물놀이",
        description: "방 앞 테라스와 바로 연결되는 맑은 전용 풀장에서 첨벙첨벙 놀기",
        tips: "💡 최고 로망: 버틀러에게 룸서비스로 갓 구운 피자와 버거, 칠링된 샴페인을 시켜서 선베드에 걸터앉아 먹으면 지상낙원 완료 🥂",
        icon: "👙",
        category: "leisure"
      },
      {
        id: "d7-3",
        time: "19:30",
        title: "🍽️ 아르헨티나 스테이크 'El Gaucho' 디너",
        description: "남미 대륙 특유의 참숯 향 가득 입힌 촉촉한 안심과 등심 스테이크에 말벡 아르헨티나 와인 매칭",
        tips: "드레스코드: 긴바지 필수!",
        icon: "🍷",
        category: "dining"
      }
    ]
  },
  {
    dayNumber: 8,
    dateStr: "9/5 (토)",
    title: "최고급 스파 & 운하 보트",
    subtitle: "피로 회복 데이 & Chang Thai",
    items: [
      {
        id: "d8-1",
        time: "오전",
        title: "🛌 알람 없는 완벽한 늦잠 & 테라스 조식",
        description: "버틀러에게 아침 조식 룸서비스를 부탁해 테라스 선베드 테이블에 차려놓고 아침 카리브 바닷바람과 브런치 즐기기",
        icon: "🥞",
        category: "dining"
      },
      {
        id: "d8-2",
        time: "13:00",
        title: "💆 Zentropia Spa 하이드로테라피 (온수풀 힐링)",
        description: "칸쿤 최대 규모의 최고급 스파 센터. 온수/냉수 동굴 폭포풀과 사우나로 묵은 여행 피로 완벽 사멸시키기 (투숙객 무상 입장)",
        icon: "💆",
        category: "leisure"
      },
      {
        id: "d8-3",
        time: "16:00",
        title: "📸 대낮 운하 수상 보트 화보 촬영",
        description: "에메랄드 운하를 천천히 지나는 이국적인 목조 보트에 올라타 시원한 바람을 쐬며 예찬 님 화보 사진 찍어주기",
        icon: "⛵",
        category: "activity"
      },
      {
        id: "d8-4",
        time: "19:00",
        title: "🍽️ 태국 전통 퀴진 'Chang Thai' 디너",
        description: "칼칼하고 이국적인 똠얌 스파이스와 달콤하고 고소한 태국식 팟타이, 누들 코스 요리",
        icon: "🍜",
        category: "dining"
      },
      {
        id: "d8-5",
        time: "21:00",
        title: "🎸 로비 메인 바 라이브 뮤직 콘서트",
        description: "해외 유명 팝 커버 곡들을 라이브로 연주하는 메인 로비 바에서 무제한 마르가리타와 데킬라 마시며 낭만 나누기",
        icon: "🎸",
        category: "leisure"
      }
    ]
  },
  {
    dayNumber: 9,
    dateStr: "9/6 ~ 9/8 (일~화)",
    title: "귀국 여정",
    subtitle: "아쉬움을 뒤로하고 서울로",
    items: [
      {
        id: "d9-1",
        time: "08:00",
        title: "🎒 귀국길 비밀 셀프 조식 박스 만들기",
        description: "귀국 아침, 룸서비스로 햄치즈 샌드위치, 버터 머핀, 바나나, 생수를 주문하여 가방 속 지퍼백에 쏙 챙기세요!",
        tips: "공항까지 이동하는 버스 차 안이나 비행기 환승 시 최고의 한 입 식사가 됩니다 🥪",
        icon: "🥪",
        category: "dining"
      },
      {
        id: "d9-2",
        time: "10:00",
        title: "🚖 TRS 코랄 체크아웃 & 공항 샌딩 출발",
        description: "아쉬운 마음을 가득 안고 체크아웃 후 프라이빗 전용 기사 샌딩 차량 탑승하여 칸쿤 공항으로 안전하게 출발",
        tips: "⚠️ 칸쿤 14:25 출발 비행기 기준, TRS 코랄이 위치한 북부 플라야 무헤레스 지역은 트래픽 정체가 심할 수 있으므로 절대 지각하지 말고 오전 10시 정시에 리조트 로비에서 출발하는 것이 안전합니다!",
        icon: "🚖",
        category: "travel"
      },
      {
        id: "d9-3",
        time: "14:25",
        title: "✈️ 칸쿤(CUN) 출발",
        description: "제트블루 항공 [B61852] 탑승하여 미국 뉴욕으로 이동",
        icon: "✈️",
        category: "travel"
      },
      {
        id: "d9-4",
        time: "19:27",
        title: "🛬 뉴욕(JFK) 공항 도착 및 환승 대기",
        description: "JFK 공항 도착 후 아시아나 국제선 터미널로 신속하게 이동 및 탑승 체크인 대기",
        tips: "※ 밤 늦은 시간이라 공항 면세점이 닫았을 확률이 높으니 편한 이지웨어로 옷을 미리 갈아입고 편안히 휴식하세요.",
        icon: "🛂",
        category: "travel"
      },
      {
        id: "d9-5",
        time: "01:30 (9/7)",
        title: "✈️ 뉴욕(JFK) 출발",
        description: "아시아나 항공 [OZ223] 탑승하여 그리운 한국으로 귀국길 이륙",
        icon: "✈️",
        category: "travel"
      },
      {
        id: "d9-6",
        time: "06:05 (9/8)",
        title: "🛬 서울(ICN) 최종 귀국 🇰🇷",
        description: "아름답고 소중했던 정진 ❤️ 예찬 칸쿤 허니문 9박 11일 대단원의 막을 내리고 일상 복귀!",
        tips: "서로 더 사랑하고 아끼는 평생의 동반자로 행복 가득한 첫 걸음 시작 🎉💍",
        icon: "🏡",
        category: "travel"
      }
    ]
  }
];

export const defaultChecklist: ChecklistItem[] = [
  { id: "c1", text: "여권 (만료일 6개월 이상 남았는지 반드시 점검)", category: "essentials", completed: true },
  { id: "c2", text: "E-티켓 및 호텔 바우처 사본 인쇄본 (스칼렛 아르떼 / TRS 코랄)", category: "essentials", completed: true },
  { id: "c3", text: "신용카드 (해외 결제 및 렌트/호텔 디포짓용 비자/마스터)", category: "essentials", completed: true },
  { id: "c4", text: "현금 1달러 지폐 가득 (팁 넉넉히 쓸 100달러~200달러 소액 환전)", category: "essentials", completed: false },
  { id: "c5", text: "치첸이사 도시세 현금 66달러 (부부 합산)", category: "essentials", completed: false },
  { id: "c6", text: "남성: 정장 긴바지 (찢어진 청바지 불가, 슬랙스 등 1-2개)", category: "dresscode", completed: false },
  { id: "c7", text: "남성: 깃이 있는 셔츠 또는 카라티셔츠 (타시도, 아레날 등 포멀 코스용)", category: "dresscode", completed: false },
  { id: "c8", text: "남성: 단정하게 신을 로퍼, 단화 또는 깔끔한 가죽 스니커즈", category: "dresscode", completed: false },
  { id: "c9", text: "여성: 휴양지 예쁜 원피스 및 로맨틱 이브닝 드레스 2-3벌", category: "dresscode", completed: false },
  { id: "c10", text: "여성: 해변 및 디너 레스토랑에서 신을 단정하고 시크한 구두/샌들", category: "dresscode", completed: false },
  { id: "c11", text: "아쿠아슈즈 (셀하, 세노테, 스플로르 등 자갈/바위 상처 방지 필수)", category: "water", completed: false },
  { id: "c12", text: "개인 스노클링 마스크 & 오리발 (무료 대여도 되지만 개인용이 위생적)", category: "water", completed: false },
  { id: "c13", text: "스마트폰 방수팩 및 짚라인 추락 방지용 목걸이 스트랩", category: "water", completed: false },
  { id: "c14", text: "비치캡, 챙이 넓은 모자 및 자외선 완벽 차단 고성능 선글라스", category: "water", completed: false },
  { id: "c15", text: "수영복 및 래시가드 3세트 이상 (물놀이가 매우 많음)", category: "water", completed: false },
  { id: "c16", text: "110V 전용 변환 플러그 (돼지코) 2-3개 및 멀티탭", category: "electronics", completed: false },
  { id: "c17", text: "보조 배터리 10000mAh 이상 (외부 전일 투어 시 사진 촬영 대비)", category: "electronics", completed: false },
  { id: "c18", text: "스마트폰 충전기 및 고속 케이블", category: "electronics", completed: true },
  { id: "c19", text: "고프로 또는 방수 액션캠 (세노테 수중 촬영의 꿀템)", category: "electronics", completed: false }
];
