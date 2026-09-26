/* NCS High School CBT v3 — mixed formats, heavier weak-subject mix
   Focus: 역사상식(15) · 영어(13) · 논리(12) · 일반상식(4) · 수리·물리(3) · 의사소통(3) */
window.NCS_META = {
  version: 3,
  focus: ["역사상식", "영어", "논리"],
  focusNote:
    "약점 과목(역사·영어·논리) 비중을 Set 2보다 더 늘렸습니다. 지문·빈칸·순서·자료해석·상황판단 등 유형을 섞었습니다."
};

window.NCS_QUESTIONS = [
  // ===== 역사상식 1–15 =====
  {
    id: 1,
    subject: "역사상식",
    format: "사실확인",
    type: "mc",
    stem: "발해를 건국한 인물은?",
    choices: ["대조영", "주몽", "온조", "박혁거세", "왕건"],
    answer: 0,
    explain: "고구려 유민 대조영이 698년 발해를 건국했다."
  },
  {
    id: 2,
    subject: "역사상식",
    format: "지문독해",
    type: "mc",
    stem: "윗글의 왕이 추진한 정책으로 알맞은 것은?",
    passage:
      "이 왕은 노비안검법을 실시하고 과거제를 도입하였다. 또한 훈요십조와 관련은 없으나, 호족 세력을 누르고 왕권을 강화하려 하였다.",
    choices: ["대동법 시행", "광종의 왕권 강화책", "세도정치 확립", "갑오개혁", "위정척사 운동"],
    answer: 1,
    explain: "노비안검법·과거제는 고려 광종의 왕권 강화책이다."
  },
  {
    id: 3,
    subject: "역사상식",
    format: "순서배열",
    type: "mc",
    stem: "다음 사건을 일어난 순서대로 나열한 것은?\n(가) 임진왜란\n(나) 병자호란\n(다) 갑오개혁\n(라) 3·1 운동",
    choices: [
      "(가)-(나)-(다)-(라)",
      "(나)-(가)-(다)-(라)",
      "(가)-(다)-(나)-(라)",
      "(다)-(가)-(나)-(라)",
      "(나)-(다)-(가)-(라)"
    ],
    answer: 0,
    explain: "임진왜란(1592) → 병자호란(1636) → 갑오개혁(1894) → 3·1 운동(1919)."
  },
  {
    id: 4,
    subject: "역사상식",
    format: "사실확인",
    type: "mc",
    stem: "신라가 당과 연합하여 먼저 멸망시킨 나라는?",
    choices: ["고구려", "백제", "가야", "발해", "탐라"],
    answer: 1,
    explain: "나당 연합군이 660년 백제를 멸하고, 이어 고구려를 공격하였다."
  },
  {
    id: 5,
    subject: "역사상식",
    format: "빈칸추론",
    type: "mc",
    stem: "조선 세종 때 편찬·반포된 _____는 훈민정음으로도 불린다. 빈칸에 알맞은 것은?",
    choices: ["동국정운", "용비어천가", "한글(훈민정음)", "경국대전", "조선왕조실록"],
    answer: 2,
    explain: "훈민정음(한글)이 세종대에 창제·반포되었다."
  },
  {
    id: 6,
    subject: "역사상식",
    format: "상황판단",
    type: "mc",
    stem: "1905년 외교권이 박탈된 직후 설치된 일제의 통치 기구는?",
    choices: ["총독부", "통감부", "군정청", "안동도호부", "한성부"],
    answer: 1,
    explain: "을사늑약(1905) 이후 통감부가 설치되었다. 총독부는 1910년 강제병합 이후."
  },
  {
    id: 7,
    subject: "역사상식",
    format: "지문독해",
    type: "mc",
    stem: "밑글이 설명하는 운동은?",
    passage:
      "1919년 3월 1일, 민족대표 33인이 독립선언서를 발표하고 전국에서 만세 시위가 일어났다. 이후 상하이에 임시정부가 수립되는 계기가 되었다.",
    choices: ["갑신정변", "동학농민운동", "3·1 운동", "광주학생항일운동", "4·19 혁명"],
    answer: 2,
    explain: "기술된 내용은 3·1 운동이다."
  },
  {
    id: 8,
    subject: "역사상식",
    format: "사실확인",
    type: "mc",
    stem: "일제 강점기 회사령·토지조사사업이 본격화된 시기의 통치 방식은?",
    choices: ["문화 통치", "무단 통치", "민족 말살 통치", "군정", "신탁통치"],
    answer: 1,
    explain: "1910년대 무단 통치기에 토지조사사업·회사령 등이 시행되었다."
  },
  {
    id: 9,
    subject: "역사상식",
    format: "자료해석",
    type: "mc",
    stem: "다음 연표에서 ‘광복’에 해당하는 해는?",
    passage: "1905 을사늑약 → 1910 강제병합 → 1919 3·1 운동 → ? 광복 → 1948 정부 수립",
    choices: ["1939년", "1941년", "1945년", "1950년", "1953년"],
    answer: 2,
    explain: "광복은 1945년 8월 15일이다."
  },
  {
    id: 10,
    subject: "역사상식",
    format: "사실확인",
    type: "mc",
    stem: "6·25 전쟁이 발발한 날짜는?",
    choices: ["1948.8.15", "1950.6.25", "1953.7.27", "1960.4.19", "1980.5.18"],
    answer: 1,
    explain: "한국전쟁은 1950년 6월 25일 발발하였다."
  },
  {
    id: 11,
    subject: "역사상식",
    format: "빈칸추론",
    type: "mc",
    stem: "1960년 _____ 부정선거에 항의하여 4·19 혁명이 일어났다.",
    choices: ["3·15", "5·16", "10·26", "12·12", "6·10"],
    answer: 0,
    explain: "3·15 부정선거가 4·19 혁명의 직접적 계기였다."
  },
  {
    id: 12,
    subject: "역사상식",
    format: "세계사",
    type: "mc",
    stem: "프랑스 혁명이 시작된 해로 널리 알려진 것은?",
    choices: ["1688년", "1776년", "1789년", "1848년", "1917년"],
    answer: 2,
    explain: "프랑스 혁명은 1789년에 시작되었다."
  },
  {
    id: 13,
    subject: "역사상식",
    format: "순서배열",
    type: "mc",
    stem: "세계사 사건을 시간순으로 바르게 나열한 것은?\n(가) 제1차 세계대전 종전\n(나) 제2차 세계대전 종전\n(다) 산업혁명 시작(영국)",
    choices: [
      "(다)-(가)-(나)",
      "(가)-(다)-(나)",
      "(나)-(가)-(다)",
      "(다)-(나)-(가)",
      "(가)-(나)-(다)"
    ],
    answer: 0,
    explain: "산업혁명(18C후반) → 1차대전 종전(1918) → 2차대전 종전(1945)."
  },
  {
    id: 14,
    subject: "역사상식",
    format: "상황판단",
    type: "mc",
    stem: "냉전 시기 남·북한이 각각 가입한 군사 동맹/진영으로 바르게 짝지은 것은?",
    choices: [
      "남한–와르샤바 조약 / 북한–NATO",
      "남한–자유 진영 / 북한–공산 진영",
      "둘 다 비동맹만 유지",
      "남한–소련 / 북한–미국",
      "남한–중국 / 북한–일본"
    ],
    answer: 1,
    explain: "냉전 시기 남한은 자유 진영, 북한은 공산 진영에 속했다."
  },
  {
    id: 15,
    subject: "역사상식",
    format: "지문독해",
    type: "mc",
    stem: "윗글의 ‘그’에 해당하는 인물은?",
    passage:
      "그는 조선 후기 실학자로, 『목민심서』를 저술하여 지방관의 올바른 행정을 강조하였다.",
    choices: ["이황", "이이", "정약용", "박지원", "최한기"],
    answer: 2,
    explain: "『목민심서』의 저자는 다산 정약용이다."
  },

  // ===== 영어 16–28 =====
  {
    id: 16,
    subject: "영어",
    format: "어법",
    type: "mc",
    stem: "빈칸에 알맞은 것은? The book _____ on the table belongs to me.",
    choices: ["lying", "lies", "lain", "laying", "lied"],
    answer: 0,
    explain: "‘놓여 있는’ 분사구/형용사적 용법 → lying."
  },
  {
    id: 17,
    subject: "영어",
    format: "어휘",
    type: "mc",
    stem: "밑줄 친 부분과 의미가 가까운 것은? Please look into the problem carefully.",
    choices: ["ignore", "investigate", "postpone", "celebrate", "translate"],
    answer: 1,
    explain: "look into = investigate(조사하다)."
  },
  {
    id: 18,
    subject: "영어",
    format: "지문독해",
    type: "mc",
    stem: "글의 요지로 가장 알맞은 것은?",
    passage:
      "Recycling reduces waste and saves energy. When people sort paper, plastic, and glass, fewer raw materials are needed. Small daily habits can make a big difference.",
    choices: [
      "여행은 비싸다",
      "재활용은 자원 절약에 도움이 된다",
      "플라스틱은 모두 안전하다",
      "에너지는 무한하다",
      "유리만 분리수거하면 된다"
    ],
    answer: 1,
    explain: "재활용이 폐기물·에너지를 줄인다는 요지."
  },
  {
    id: 19,
    subject: "영어",
    format: "빈칸추론",
    type: "mc",
    stem: "빈칸에 들어갈 말로 알맞은 것은?",
    passage:
      "Although the weather was terrible, they _____ to climb the mountain.",
    choices: ["gave up", "decided", "refused never", "were fail", "stop"],
    answer: 1,
    explain: "양보(Although) 뒤 ‘그럼에도 등반하기로 했다’ → decided가 자연스럽다."
  },
  {
    id: 20,
    subject: "영어",
    format: "회화",
    type: "mc",
    stem: "A의 말에 대한 B의 응답으로 가장 적절한 것은?\nA: Could you tell me where the library is?\nB: _____",
    choices: [
      "Yes, I could library.",
      "It's next to the cafeteria.",
      "I am a library.",
      "No, library is reading.",
      "Where are you library?"
    ],
    answer: 1,
    explain: "위치 안내에 대한 자연스러운 응답이다."
  },
  {
    id: 21,
    subject: "영어",
    format: "어법",
    type: "mc",
    stem: "문법상 옳은 문장은?",
    choices: [
      "He suggested to go home.",
      "She enjoys to swim.",
      "They look forward to meeting you.",
      "I avoid to talk loudly.",
      "We finished to eat."
    ],
    answer: 2,
    explain: "look forward to + V-ing가 올바른 용법이다."
  },
  {
    id: 22,
    subject: "영어",
    format: "순서배열",
    type: "mc",
    stem: "글의 순서를 바르게 배열한 것은?\n(A) Then mix them well.\n(B) First, prepare the flour and eggs.\n(C) Finally, bake the mixture for 20 minutes.",
    choices: ["(A)-(B)-(C)", "(B)-(A)-(C)", "(C)-(B)-(A)", "(B)-(C)-(A)", "(A)-(C)-(B)"],
    answer: 1,
    explain: "First → Then → Finally 순서: B-A-C."
  },
  {
    id: 23,
    subject: "영어",
    format: "빈칸추론",
    type: "mc",
    stem: "She has been studying English _____ three years.",
    choices: ["since", "for", "during", "while", "by"],
    answer: 1,
    explain: "기간(three years)에는 for를 쓴다."
  },
  {
    id: 24,
    subject: "영어",
    format: "지문독해",
    type: "mc",
    stem: "밑줄 친 them이 가리키는 것은?",
    passage:
      "Scientists collected samples from the river. They tested them in the lab and found high levels of pollution.",
    choices: ["scientists", "levels", "samples", "pollution", "lab"],
    answer: 2,
    explain: "them = samples(표본)."
  },
  {
    id: 25,
    subject: "영어",
    format: "어휘",
    type: "mc",
    stem: "다음 중 나머지와 의미가 가장 다른 것은?",
    choices: ["happy", "glad", "pleased", "delighted", "angry"],
    answer: 4,
    explain: "angry만 부정 감정, 나머지는 긍정적 기쁨."
  },
  {
    id: 26,
    subject: "영어",
    format: "수동태",
    type: "mc",
    stem: "능동문을 수동으로 바르게 고친 것은? Someone stole my bike.",
    choices: [
      "My bike stole someone.",
      "My bike was stolen.",
      "My bike is stealing.",
      "My bike were stolen.",
      "My bike has steal."
    ],
    answer: 1,
    explain: "과거 수동: was stolen."
  },
  {
    id: 27,
    subject: "영어",
    format: "상황판단",
    type: "mc",
    stem: "친구에게 ‘약속 시간을 30분 늦추자’고 정중히 제안하는 말로 알맞은 것은?",
    choices: [
      "You late always!",
      "Could we postpone our meeting by 30 minutes?",
      "I hate you late.",
      "Meeting is cancel forever.",
      "Don't come."
    ],
    answer: 1,
    explain: "Could we postpone ~?가 정중한 연기 제안이다."
  },
  {
    id: 28,
    subject: "영어",
    format: "속담/표현",
    type: "mc",
    stem: "\"Practice makes perfect.\"의 의미로 가장 가까운 것은?",
    choices: [
      "재능만 있으면 충분하다",
      "연습이 숙달을 만든다",
      "완벽은 불가능하다",
      "이론은 필요 없다",
      "한 번에 성공해야 한다"
    ],
    answer: 1,
    explain: "꾸준한 연습이 능숙함을 만든다는 뜻."
  },

  // ===== 논리 29–40 =====
  {
    id: 29,
    subject: "논리",
    format: "삼단논법",
    type: "mc",
    stem: "모든 새는 알을 낳는다. 펭귄은 새이다. 결론으로 옳은 것은?",
    choices: [
      "펭귄은 날 수 있다",
      "펭귄은 알을 낳는다",
      "모든 알을 낳는 것은 펭귄이다",
      "새는 펭귄이다",
      "결론 없음"
    ],
    answer: 1,
    explain: "새⊂알을낳음, 펭귄∈새 ⇒ 펭귄은 알을 낳는다."
  },
  {
    id: 30,
    subject: "논리",
    format: "수열",
    type: "mc",
    stem: "2, 5, 11, 23, 47, … 다음에 올 수는?",
    choices: ["71", "89", "94", "95", "101"],
    answer: 3,
    explain: "×2+1 규칙: 47×2+1=95."
  },
  {
    id: 31,
    subject: "논리",
    format: "대우추론",
    type: "mc",
    stem: "\"공부를 하면 성적이 오른다. 성적이 오르지 않았다.\"에서 이끌어낼 수 있는 것은?",
    choices: [
      "공부를 했다",
      "공부를 하지 않았다",
      "성적은 반드시 떨어진다",
      "공부와 무관하다",
      "결론 없음"
    ],
    answer: 1,
    explain: "대우: 성적이 오르지 않음 → 공부를 하지 않음. (단순화된 논리 문항)"
  },
  {
    id: 32,
    subject: "논리",
    format: "자료해석",
    type: "mc",
    stem: "반 학생 30명 중 축구 좋아하는 학생 18명, 농구 좋아하는 학생 12명, 둘 다 좋아하는 학생 6명일 때, 축구만 좋아하는 학생 수는?",
    choices: ["6", "12", "18", "24", "30"],
    answer: 1,
    explain: "축구만 = 18−6 = 12."
  },
  {
    id: 33,
    subject: "논리",
    format: "유추",
    type: "mc",
    stem: "책 : 도서관 = 그림 : ?",
    choices: ["화가", "미술관", "물감", "액자", "관객"],
    answer: 1,
    explain: "책이 모이는 장소가 도서관이듯, 그림이 모이는 장소는 미술관."
  },
  {
    id: 34,
    subject: "논리",
    format: "참거짓",
    type: "mc",
    stem: "세 명 중 한 명만 진실을 말한다.\nA: \"내가 진실을 말한다.\"\nB: \"A가 거짓말한다.\"\nC: \"B가 거짓말한다.\"\n진실을 말하는 사람은?",
    choices: ["A", "B", "C", "아무도 없음", "알 수 없다"],
    answer: 1,
    explain: "한 명만 참일 때 A가 참이면 B·C도 참이 되어 모순. C가 참이면 B는 거짓→A는 참이 되어 참이 둘. B가 참이면 A 거짓·C 거짓으로 일관된다."
  },
  {
    id: 35,
    subject: "논리",
    format: "비교",
    type: "mc",
    stem: "키 순서: 영희 > 철수, 민수 > 영희, 철수 > 지영. 키가 가장 작은 사람은?",
    choices: ["영희", "철수", "민수", "지영", "알 수 없다"],
    answer: 3,
    explain: "민수 > 영희 > 철수 > 지영."
  },
  {
    id: 36,
    subject: "논리",
    format: "확률",
    type: "mc",
    stem: "동전을 두 번 던질 때, 앞면이 한 번만 나올 확률은?",
    choices: ["1/4", "1/2", "1/3", "2/3", "3/4"],
    answer: 1,
    explain: "경우: HT, TH → 2/4 = 1/2."
  },
  {
    id: 37,
    subject: "논리",
    format: "오류찾기",
    type: "mc",
    stem: "다음 중 ‘순환논증’에 해당하는 것은?",
    choices: [
      "그가 정직하다. 왜냐하면 그는 거짓말을 하지 않기 때문이다.",
      "비가 오면 땅이 젖는다. 땅이 젖었으니 비가 왔다.",
      "전문가도 틀릴 수 있다.",
      "표본이 작아 일반화는 위험하다.",
      "상관관계가 곧 인과는 아니다."
    ],
    answer: 0,
    explain: "정직≈거짓말 안 함으로 같은 말을 반복 → 순환논증. (나)는 후건공정 오류."
  },
  {
    id: 38,
    subject: "논리",
    format: "암호",
    type: "mc",
    stem: "규칙: 각 글자 위치값 합. CAT=24일 때, LION의 값은?",
    choices: ["48", "50", "52", "54", "56"],
    answer: 1,
    explain: "L+I+O+N = 12+9+15+14 = 50."
  },
  {
    id: 39,
    subject: "논리",
    format: "집합",
    type: "mc",
    stem: "전체 100명 중 안경 착용 40명, 렌즈 착용 25명, 둘 다 10명일 때, 안경도 렌즈도 안 쓴 사람은?",
    choices: ["35", "45", "55", "65", "75"],
    answer: 1,
    explain: "합집합 = 40+25−10=55, 둘 다 안 씀 = 100−55=45."
  },
  {
    id: 40,
    subject: "논리",
    format: "상황판단",
    type: "mc",
    stem: "버스는 10분마다 온다. 방금 버스를 놓쳤다면, 다음 버스까지 기다릴 최대 시간은?",
    choices: ["0분", "5분", "10분", "15분", "20분"],
    answer: 2,
    explain: "방금 출발했다면 다음까지 최대 10분."
  },

  // ===== 일반상식 41–44 =====
  {
    id: 41,
    subject: "일반상식",
    format: "시사·제도",
    type: "mc",
    stem: "대한민국 국무총리를 임명하는 권한을 가진 사람은?",
    choices: ["국회의장", "대통령", "대법원장", "중앙선관위원장", "감사원장"],
    answer: 1,
    explain: "국무총리는 대통령이 국회의 동의를 얻어 임명한다."
  },
  {
    id: 42,
    subject: "일반상식",
    format: "경제",
    type: "mc",
    stem: "기준금리를 결정하는 우리나라 기관은?",
    choices: ["기획재정부", "한국은행", "금융감독원", "공정거래위원회", "통계청"],
    answer: 1,
    explain: "한국은행 금융통화위원회가 기준금리를 결정한다."
  },
  {
    id: 43,
    subject: "일반상식",
    format: "과학",
    type: "mc",
    stem: "물의 화학식과 상온·대기압에서 상태로 옳은 것은?",
    choices: ["CO₂ – 고체", "H₂O – 액체", "O₂ – 액체", "NaCl – 기체", "H₂ – 고체"],
    answer: 1,
    explain: "물은 H₂O이며 상온·대기압에서 액체이다."
  },
  {
    id: 44,
    subject: "일반상식",
    format: "지리",
    type: "mc",
    stem: "한반도에서 가장 높은 산은?",
    choices: ["한라산", "지리산", "설악산", "백두산", "태백산"],
    answer: 3,
    explain: "백두산이 한반도 최고봉이다."
  },

  // ===== 수리·물리 45–47 =====
  {
    id: 45,
    subject: "수리·물리",
    format: "계산",
    type: "mc",
    stem: "함수 f(x)=3x−4일 때 f(5)의 값은?",
    choices: ["7", "11", "15", "19", "23"],
    answer: 1,
    explain: "3×5−4=11."
  },
  {
    id: 46,
    subject: "수리·물리",
    format: "물리",
    type: "mc",
    stem: "자유 낙하(공기저항 무시)에서 질량이 다른 두 물체를 같은 높이에서 동시에 놓으면?",
    choices: [
      "무거운 쪽이 먼저 떨어진다",
      "가벼운 쪽이 먼저 떨어진다",
      "동시에 떨어진다",
      "질량비만큼 시간 차이가 난다",
      "예측할 수 없다"
    ],
    answer: 2,
    explain: "이상적 조건에서 낙하 가속도는 질량과 무관하여 동시에 떨어진다."
  },
  {
    id: 47,
    subject: "수리·물리",
    format: "확률",
    type: "mc",
    stem: "주사위를 한 번 던져 짝수가 나올 확률은?",
    choices: ["1/6", "1/3", "1/2", "2/3", "5/6"],
    answer: 2,
    explain: "2,4,6 → 3/6=1/2."
  },

  // ===== 의사소통 48–50 =====
  {
    id: 48,
    subject: "의사소통",
    format: "요약",
    type: "mc",
    stem: "다음 글의 핵심을 한 문장으로 요약한 것으로 가장 적절한 것은?",
    passage:
      "회의에서는 안건을 미리 공유하고, 발언 시간을 지키며, 결정 사항을 기록하는 것이 중요하다. 이렇게 하면 논의가 산만해지지 않고 실행으로 이어지기 쉽다.",
    choices: [
      "회의는 필요 없다",
      "효율적 회의를 위해 사전 공유·시간 관리·기록이 필요하다",
      "기록만 하면 충분하다",
      "발언은 길수록 좋다",
      "안건은 숨기는 편이 낫다"
    ],
    answer: 1,
    explain: "사전 공유·시간·기록이 핵심이다."
  },
  {
    id: 49,
    subject: "의사소통",
    format: "상황판단",
    type: "mc",
    stem: "팀 프로젝트에서 동료의 실수로 마감이 늦어질 위기다. 가장 바람직한 대응은?",
    choices: [
      "공개적으로 비난한다",
      "문제를 숨기고 넘긴다",
      "사실 확인 후 함께 일정·역할을 재조정한다",
      "혼자 전부 떠맡으며 불만을 쌓는다",
      "즉시 팀에서 퇴출을 요구한다"
    ],
    answer: 2,
    explain: "비난보다 문제 파악과 일정·역할 조정이 생산적이다."
  },
  {
    id: 50,
    subject: "의사소통",
    format: "문장다듬기",
    type: "mc",
    stem: "다음 중 객관적이고 명확한 문장은?",
    choices: [
      "그 사람은 완전 최악임.",
      "설문 응답자 120명 중 78명(65%)이 찬성했다.",
      "다들 그렇게 생각한다.",
      "대충 보면 알 수 있다.",
      "무조건 맞다."
    ],
    answer: 1,
    explain: "수치·비율이 제시되어 검증 가능한 객관적 진술이다."
  }
];
