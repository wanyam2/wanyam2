/* NCS High School CBT v2 — 50 MC only, weakness-weighted
   Focus: 역사상식(12) · 영어(10) · 논리(10) · 일반상식(8) · 수리·물리(6) · 의사소통(4)
   Rationale: 데이터/개발 지향 학습자 기준, 인문·언어·논리 비중 강화 */
window.NCS_META = {
  version: 2,
  focus: ["역사상식", "영어", "논리"],
  focusNote:
    "저장된 응시 기록이 없어, 데이터·개발 학습 프로필을 기준으로 역사·영어·논리를 집중 보강했습니다. 이번 응시 후 약점이 자동 저장됩니다."
};

window.NCS_QUESTIONS = [
  // ===== 역사상식 1–12 =====
  {
    id: 1,
    subject: "역사상식",
    type: "mc",
    stem: "조선을 건국한 인물과 건국 연도로 바르게 짝지은 것은?",
    choices: ["왕건 – 918년", "이성계 – 1392년", "궁예 – 901년", "대조영 – 698년", "세종 – 1418년"],
    answer: 1,
    explain: "이성계가 1392년 조선을 건국했다. 왕건은 고려, 대조영은 발해."
  },
  {
    id: 2,
    subject: "역사상식",
    type: "mc",
    stem: "통일신라의 전성기를 이끈 왕으로 알려진 인물은?",
    choices: ["진흥왕", "무열왕", "문무왕", "신문왕", "경덕왕"],
    answer: 2,
    explain: "문무왕은 삼국 통일을 완성하고 당군을 몰아내 통일신라의 기반을 다졌다. (전성기 관련으로 흔히 거론)"
  },
  {
    id: 3,
    subject: "역사상식",
    type: "mc",
    stem: "고려 시대 과거 제도를 처음으로 실시한 왕은?",
    choices: ["태조", "광종", "성종", "현종", "숙종"],
    answer: 1,
    explain: "광종이 쌍기 건의로 과거제를 도입하여 신진 관료를 등용했다."
  },
  {
    id: 4,
    subject: "역사상식",
    type: "mc",
    stem: "병자호란 결과 조선이 맺은 강화와 관련된 설명으로 옳은 것은?",
    choices: [
      "일본과 기유약조를 맺었다",
      "청에 군신 관계를 인정했다",
      "몽골에 조공을 바쳤다",
      "당과 나당동맹을 맺었다",
      "러시아가 한반도를 점령했다"
    ],
    answer: 1,
    explain: "1636년 병자호란 후 조선은 청과 군신 관계를 맺었다."
  },
  {
    id: 5,
    subject: "역사상식",
    type: "mc",
    stem: "갑신정변(1884)을 주도한 세력은?",
    choices: ["위정척사파", "급진 개화파", "동학교도", "대원군 측근", "의병 지도자"],
    answer: 1,
    explain: "김옥균 등 급진 개화파가 갑신정변을 일으켰으나 3일 천하로 끝났다."
  },
  {
    id: 6,
    subject: "역사상식",
    type: "mc",
    stem: "을사늑약(1905)으로 대한제국이 상실한 권리는?",
    choices: ["사법권", "경찰권", "외교권", "화폐주조권", "토지소유권"],
    answer: 2,
    explain: "을사늑약으로 외교권이 박탈되고 통감부가 설치되었다."
  },
  {
    id: 7,
    subject: "역사상식",
    type: "mc",
    stem: "일제 강점기 ‘무단 통치’ 시기의 특징으로 가장 알맞은 것은?",
    choices: [
      "문화 통치를 표방하며 언론을 허용했다",
      "헌병 경찰로 강압 통치했다",
      "회사령을 폐지했다",
      "보통선거를 시행했다",
      "한글 전용을 장려했다"
    ],
    answer: 1,
    explain: "1910년대 무단 통치는 헌병 경찰 중심의 강압 통치가 특징이다."
  },
  {
    id: 8,
    subject: "역사상식",
    type: "mc",
    stem: "대한민국 임시정부가 수립된 해와 장소로 옳은 것은?",
    choices: [
      "1910년 도쿄",
      "1919년 상하이",
      "1945년 서울",
      "1894년 경복궁",
      "1948년 부산"
    ],
    answer: 1,
    explain: "3·1 운동 이후 1919년 중국 상하이에 대한민국 임시정부가 수립되었다."
  },
  {
    id: 9,
    subject: "역사상식",
    type: "mc",
    stem: "6·25 전쟁 중 전세를 바꾼 인천상륙작전을 지휘한 인물은?",
    choices: ["이승만", "김일성", "맥아더", "트루먼", "리지웨이"],
    answer: 2,
    explain: "1950년 9월 맥아더 장군이 지휘한 인천상륙작전으로 전세가 역전되었다."
  },
  {
    id: 10,
    subject: "역사상식",
    type: "mc",
    stem: "4·19 혁명의 직접적 계기가 된 사건은?",
    choices: [
      "한일협정 비준",
      "3·15 부정선거",
      "유신헌법 선포",
      "광주 민주화 운동",
      "IMF 외환위기"
    ],
    answer: 1,
    explain: "1960년 3·15 부정선거에 반발한 시위가 4·19 혁명으로 이어졌다."
  },
  {
    id: 11,
    subject: "역사상식",
    type: "mc",
    stem: "세계사에서 산업혁명이 가장 먼저 시작된 나라는?",
    choices: ["프랑스", "독일", "미국", "영국", "일본"],
    answer: 3,
    explain: "18세기 후반 영국에서 산업혁명이 시작되었다."
  },
  {
    id: 12,
    subject: "역사상식",
    type: "mc",
    stem: "제1차 세계대전 종전 후 베르사유 조약이 독일에 부과한 내용으로 알맞은 것은?",
    choices: [
      "식민지 확대 허용",
      "막대한 배상금과 군비 제한",
      "국제연맹 의장국 지위 부여",
      "오스트리아 병합 승인",
      "핵무기 개발 지원"
    ],
    answer: 1,
    explain: "베르사유 조약은 독일에 전쟁 책임, 배상금, 군비 제한 등을 부과했다."
  },

  // ===== 영어 13–22 =====
  {
    id: 13,
    subject: "영어",
    type: "mc",
    stem: "빈칸에 알맞은 것은? If it _____ tomorrow, we will cancel the picnic.",
    choices: ["rain", "rains", "rained", "raining", "to rain"],
    answer: 1,
    explain: "조건부사절(if)에서는 현재형이 미래 의미를 나타낸다 → rains."
  },
  {
    id: 14,
    subject: "영어",
    type: "mc",
    stem: "다음 중 어법상 틀린 문장은?",
    choices: [
      "Neither of the answers is correct.",
      "Each of the students has a book.",
      "The news are surprising.",
      "Mathematics is difficult.",
      "There is a lot of information."
    ],
    answer: 2,
    explain: "news는 단수 취급 → The news is surprising."
  },
  {
    id: 15,
    subject: "영어",
    type: "mc",
    stem: "밑줄 친 표현과 바꿔 쓸 수 있는 것은? She came across an old friend at the station.",
    choices: ["looked for", "ran into", "gave up", "turned down", "put off"],
    answer: 1,
    explain: "come across = 우연히 마주치다 ≈ run into."
  },
  {
    id: 16,
    subject: "영어",
    type: "mc",
    stem: "다음 글의 주제로 가장 알맞은 것은?",
    passage:
      "Many teens sleep less than seven hours a night. Lack of sleep can weaken memory and increase stress. Experts advise keeping a regular bedtime and avoiding screens before sleep.",
    choices: [
      "여행의 장점",
      "수면 부족의 문제와 개선 방법",
      "스마트폰 게임의 재미",
      "운동선수의 식단",
      "학교 급식의 영양"
    ],
    answer: 1,
    explain: "수면 부족 영향과 규칙적 취침·스크린 자제 등 개선 조언을 다룬다."
  },
  {
    id: 17,
    subject: "영어",
    type: "mc",
    stem: "대화의 빈칸에 가장 적절한 것은?\nA: How about going to the museum this weekend?\nB: _____ I already have plans.",
    choices: [
      "That sounds great!",
      "I'd love to, but",
      "Sure, what time?",
      "Let's meet there.",
      "I can't wait!"
    ],
    answer: 1,
    explain: "거절·불참 의사가 이어지므로 I'd love to, but이 자연스럽다."
  },
  {
    id: 18,
    subject: "영어",
    type: "mc",
    stem: "다음을 수동태로 바르게 옮긴 것은? They built this bridge in 2010.",
    choices: [
      "This bridge built in 2010.",
      "This bridge was built in 2010.",
      "This bridge is building in 2010.",
      "This bridge were built in 2010.",
      "This bridge has build in 2010."
    ],
    answer: 1,
    explain: "과거 수동: was/were + p.p. → was built."
  },
  {
    id: 19,
    subject: "영어",
    type: "mc",
    stem: "빈칸에 들어갈 접속사로 알맞은 것은? He studied hard _____ he could pass the exam.",
    choices: ["so that", "even though", "as if", "unless", "in case of"],
    answer: 0,
    explain: "so that + 절 = ~하기 위해서."
  },
  {
    id: 20,
    subject: "영어",
    type: "mc",
    stem: "다음 중 의미가 나머지와 다른 것은?",
    choices: ["however", "nevertheless", "although", "therefore", "nonetheless"],
    answer: 3,
    explain: "however/nevertheless/although/nonetheless는 역접, therefore는 결과."
  },
  {
    id: 21,
    subject: "영어",
    type: "mc",
    stem: "문장을 올바르게 완성하시오. Not only the teacher but also the students _____ present.",
    choices: ["is", "was", "are", "has", "being"],
    answer: 2,
    explain: "not only A but also B는 B에 동사를 일치 → students → are."
  },
  {
    id: 22,
    subject: "영어",
    type: "mc",
    stem: "다음 속담의 의미로 가장 가까운 것은? Actions speak louder than words.",
    choices: [
      "말은 행동보다 중요하다",
      "행동의 설득력이 말보다 크다",
      "침묵이 금이다",
      "시간은 금이다",
      "시작이 반이다"
    ],
    answer: 1,
    explain: "말보다 행동이 더 큰 설득력을 갖는다는 뜻."
  },

  // ===== 논리 23–32 =====
  {
    id: 23,
    subject: "논리",
    type: "mc",
    stem: "모든 A는 B이다. 어떤 C는 A이다. 다음 중 반드시 참인 것은?",
    choices: [
      "모든 C는 B이다",
      "어떤 C는 B이다",
      "모든 B는 C이다",
      "어떤 B는 A가 아니다",
      "C는 A가 아니다"
    ],
    answer: 1,
    explain: "일부 C가 A이고 A⊂B이므로 그 C는 B이다 → 어떤 C는 B이다."
  },
  {
    id: 24,
    subject: "논리",
    type: "mc",
    stem: "수열 1, 2, 6, 24, 120, … 의 다음에 올 수는?",
    choices: ["240", "360", "480", "600", "720"],
    answer: 4,
    explain: "n! 형태: 1,2,6,24,120,720…"
  },
  {
    id: 25,
    subject: "논리",
    type: "mc",
    stem: "\"비가 오면 땅이 젖는다. 땅이 젖지 않았다.\"에서 타당하게 이끌어낼 수 있는 것은?",
    choices: [
      "비가 왔다",
      "비가 오지 않았다",
      "땅이 반드시 마른다",
      "비가 와도 땅은 젖지 않는다",
      "결론 없음"
    ],
    answer: 1,
    explain: "대우 추론: 땅이 젖지 않음 → 비가 오지 않음."
  },
  {
    id: 26,
    subject: "논리",
    type: "mc",
    stem: "암호에서 APPLE=50, BANANA=44일 때 ORANGE의 값은? (A=1…Z=26, 각 글자 합)",
    choices: ["57", "60", "63", "66", "70"],
    answer: 1,
    explain: "O+R+A+N+G+E = 15+18+1+14+7+5 = 60."
  },
  {
    id: 27,
    subject: "논리",
    type: "mc",
    stem: "다음 중 나머지와 성질이 다른 하나는?",
    choices: ["삼각형", "사각형", "오각형", "육각형", "직선"],
    answer: 4,
    explain: "나머지는 닫힌 다각형이고, 직선은 도형의 경계가 닫힌 면이 아니다."
  },
  {
    id: 28,
    subject: "논리",
    type: "mc",
    stem: "A는 B보다 빠르고, C는 A보다 느리다. D는 B와 같다. 가장 빠른 사람은?",
    choices: ["A", "B", "C", "D", "알 수 없다"],
    answer: 0,
    explain: "A > B = D, C < A. C와 B의 관계는 불명이지만 가장 빠른 것은 A."
  },
  {
    id: 29,
    subject: "논리",
    type: "mc",
    stem: "다음 조건의 참인 결론은?\n· 시험에 합격한 사람은 모두 장학금을 받는다.\n· 민수는 장학금을 받지 못했다.",
    choices: [
      "민수는 시험에 합격했다",
      "민수는 시험에 합격하지 못했다",
      "모든 불합격자는 장학금을 받는다",
      "장학금 수혜자는 모두 불합격이다",
      "결론을 내릴 수 없다"
    ],
    answer: 1,
    explain: "합격→장학금의 대우: 장학금 없음→합격 아님."
  },
  {
    id: 30,
    subject: "논리",
    type: "mc",
    stem: "시계가 3시 정각을 가리킬 때, 시침과 분침이 이루는 각은?",
    choices: ["0°", "60°", "90°", "120°", "180°"],
    answer: 2,
    explain: "3시 정각: 시침은 90° 위치, 분침은 0° → 90°."
  },
  {
    id: 31,
    subject: "논리",
    type: "mc",
    stem: "한 상자에서 빨간 공 3개, 파란 공 2개를 무작위로 1개 꺼낼 때, 빨간 공을 뽑을 확률은?",
    choices: ["1/5", "2/5", "3/5", "1/2", "2/3"],
    answer: 2,
    explain: "전체 5개 중 빨강 3 → 3/5."
  },
  {
    id: 32,
    subject: "논리",
    type: "mc",
    stem: "다음 추론의 오류 유형으로 가장 알맞은 것은?\n\"우리 반 학생 3명이 축구를 좋아하니, 모든 학생이 축구를 좋아한다.\"",
    choices: [
      "순환논증",
      "성급한 일반화",
      "인신공격",
      "허수아비 공격",
      "권위에의 호소"
    ],
    answer: 1,
    explain: "적은 사례로 전체에 확대 → 성급한 일반화."
  },

  // ===== 일반상식 33–40 =====
  {
    id: 33,
    subject: "일반상식",
    type: "mc",
    stem: "우리나라 헌법상 대통령의 임기는?",
    choices: ["3년 중임", "4년 중임", "5년 단임", "6년 단임", "7년 중임"],
    answer: 2,
    explain: "현행 헌법은 대통령 5년 단임제이다."
  },
  {
    id: 34,
    subject: "일반상식",
    type: "mc",
    stem: "GDP(국내총생산)의 의미로 옳은 것은?",
    choices: [
      "국민 1인당 소득",
      "일정 기간 한 나라 영역 안에서 생산된 재화·서비스의 합",
      "정부의 세수 총액",
      "수출액에서 수입액을 뺀 값",
      "기업 이윤의 합"
    ],
    answer: 1,
    explain: "GDP는 일정 기간 국내에서 생산된 최종 재화·서비스의 시장가치 합이다."
  },
  {
    id: 35,
    subject: "일반상식",
    type: "mc",
    stem: "다음 중 재생 에너지에 해당하는 것은?",
    choices: ["석탄", "천연가스", "태양광", "석유", "우라늄(핵연료)"],
    answer: 2,
    explain: "태양광은 재생 가능 에너지이다. 화석연료·핵연료는 비재생에 가깝다."
  },
  {
    id: 36,
    subject: "일반상식",
    type: "mc",
    stem: "혈액형 유전에서 ABO식 혈액형의 대립유전자 개수로 옳은 것은?",
    choices: ["1개", "2개", "3개", "4개", "5개"],
    answer: 2,
    explain: "A, B, O 세 가지 대립유전자가 관여한다."
  },
  {
    id: 37,
    subject: "일반상식",
    type: "mc",
    stem: "유엔(UN)의 주요 기구가 아닌 것은?",
    choices: ["총회", "안전보장이사회", "국제사법재판소", "세계무역기구(WTO)", "사무국"],
    answer: 3,
    explain: "WTO는 유엔 체계와 협력하나 유엔의 주요 6개 기구에는 포함되지 않는다."
  },
  {
    id: 38,
    subject: "일반상식",
    type: "mc",
    stem: "인플레이션의 의미로 가장 알맞은 것은?",
    choices: [
      "물가가 지속적으로 하락하는 현상",
      "물가가 지속적으로 상승하는 현상",
      "실업률이 0이 되는 현상",
      "환율이 고정되는 현상",
      "세금이 사라지는 현상"
    ],
    answer: 1,
    explain: "인플레이션은 전반적 물가 수준의 지속적 상승을 뜻한다."
  },
  {
    id: 39,
    subject: "일반상식",
    type: "mc",
    stem: "컴퓨터에서 1바이트(byte)는 몇 비트(bit)인가?",
    choices: ["2", "4", "8", "16", "32"],
    answer: 2,
    explain: "1 byte = 8 bit."
  },
  {
    id: 40,
    subject: "일반상식",
    type: "mc",
    stem: "지구의 자전 방향과 그 결과로 나타나는 현상으로 옳은 것은?",
    choices: [
      "동→서 자전, 태양이 서쪽에서 뜸",
      "서→동 자전, 낮과 밤의 반복",
      "남→북 자전, 계절의 변화",
      "북→남 자전, 조석 현상",
      "자전하지 않음, 일식만 발생"
    ],
    answer: 1,
    explain: "지구는 서에서 동으로 자전하며 낮과 밤이 생긴다. 계절은 공전·자전축 기울기."
  },

  // ===== 수리·물리 41–46 =====
  {
    id: 41,
    subject: "수리·물리",
    type: "mc",
    stem: "이차방정식 x² − 7x + 10 = 0의 두 근의 곱은?",
    choices: ["−10", "−7", "7", "10", "17"],
    answer: 3,
    explain: "근과 계수: 곱 = c/a = 10. (근은 2, 5)"
  },
  {
    id: 42,
    subject: "수리·물리",
    type: "mc",
    stem: "등차수열 5, 9, 13, 17, … 의 제10항은?",
    choices: ["37", "41", "45", "49", "53"],
    answer: 1,
    explain: "aₙ = 5 + (n−1)·4 → a₁₀ = 5+36 = 41."
  },
  {
    id: 43,
    subject: "수리·물리",
    type: "mc",
    stem: "질량 2 kg인 물체에 10 N의 힘을 가할 때 가속도는? (마찰 무시)",
    choices: ["2 m/s²", "5 m/s²", "8 m/s²", "10 m/s²", "20 m/s²"],
    answer: 1,
    explain: "a = F/m = 10/2 = 5 m/s²."
  },
  {
    id: 44,
    subject: "수리·물리",
    type: "mc",
    stem: "저항 4 Ω에 전류 3 A가 흐를 때 양단 전압은?",
    choices: ["0.75 V", "1.33 V", "7 V", "12 V", "16 V"],
    answer: 3,
    explain: "V = IR = 3×4 = 12 V."
  },
  {
    id: 45,
    subject: "수리·물리",
    type: "mc",
    stem: "log₁₀ 1000의 값은?",
    choices: ["1", "2", "3", "4", "10"],
    answer: 2,
    explain: "10³ = 1000이므로 log₁₀ 1000 = 3."
  },
  {
    id: 46,
    subject: "수리·물리",
    type: "mc",
    stem: "일정한 속력 15 m/s로 40초 동안 움직인 이동 거리는?",
    choices: ["55 m", "200 m", "400 m", "600 m", "800 m"],
    answer: 3,
    explain: "거리 = 15×40 = 600 m."
  },

  // ===== 의사소통(구 논술) 47–50 — all MC =====
  {
    id: 47,
    subject: "의사소통",
    type: "mc",
    stem: "다음 중 주장과 근거가 가장 잘 연결된 문장은?",
    choices: [
      "운동은 좋다. 왜냐하면 내가 운동을 좋아하기 때문이다.",
      "독서를 늘려야 한다. 어휘력과 집중력이 향상된다는 연구 결과가 있기 때문이다.",
      "교칙은 필요 없다. 친구가 그렇게 말했기 때문이다.",
      "시험은 없어져야 한다. 그냥 싫기 때문이다.",
      "환경 문제는 중요하지 않다. 관심이 없기 때문이다."
    ],
    answer: 1,
    explain: "객관적·일반화 가능한 근거(연구)로 주장을 뒷받침한다."
  },
  {
    id: 48,
    subject: "의사소통",
    type: "mc",
    stem: "보고서의 ‘서론’에 들어가기에 가장 적절한 내용은?",
    choices: [
      "실험 데이터의 표만 나열한다",
      "연구 목적과 문제 제기",
      "참고문헌 목록만 적는다",
      "결론을 먼저 확정 선언한다",
      "부록의 원자료만 붙인다"
    ],
    answer: 1,
    explain: "서론은 주제 배경, 문제 제기, 목적 등을 제시하는 부분이다."
  },
  {
    id: 49,
    subject: "의사소통",
    type: "mc",
    stem: "다음 중 비난·인신공격에 해당하여 토론에서 피해야 할 발언은?",
    choices: [
      "그 정책은 비용 대비 효과가 낮아 보입니다. 근거는 다음과 같습니다.",
      "상대 주장의 통계 출처가 불분명합니다.",
      "너는 원래 공부를 못하니 의견도 틀렸다.",
      "대안으로는 A안과 B안을 비교할 수 있습니다.",
      "전제의 정의를 먼저 합의합시다."
    ],
    answer: 2,
    explain: "사람 자체를 공격하는 인신공격은 합리적 토론을 방해한다."
  },
  {
    id: 50,
    subject: "의사소통",
    type: "mc",
    stem: "안내문의 문장 중 가장 명확하고 정중한 표현은?",
    choices: [
      "당장 안 오면 알아서 해.",
      "내일까지 안 내면 큰일 남.",
      "제출 기한은 금요일 17시입니다. 기한 내 제출 부탁드립니다.",
      "알아서 빨리빨리!!",
      "왜 아직도 안 냄?"
    ],
    answer: 2,
    explain: "기한·요청이 구체적이고 정중한 문장이다."
  }
];
