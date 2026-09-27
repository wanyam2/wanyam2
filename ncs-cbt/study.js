(() => {
  const packs = {
    ancient: [
      { q: "주몽", a: "고구려 건국" },
      { q: "온조", a: "백제 건국" },
      { q: "광개토왕", a: "고구려 영토 확장·정복" },
      { q: "김유신", a: "삼국 통일 전쟁 활약" },
      { q: "계백", a: "황산벌에서 결사 항전" },
      { q: "대조영", a: "발해 건국" },
      { q: "장보고", a: "청해진 설치·해상 세력" },
      { q: "원효", a: "불교 대중화·화쟁 사상" }
    ],
    goryeo: [
      { q: "왕건", a: "고려 건국·호족 포용" },
      { q: "광종", a: "과거제·노비안검법으로 왕권 강화" },
      { q: "성종", a: "최승로 시무책 수용·유교 정치 정비" },
      { q: "김부식", a: "『삼국사기』 편찬" },
      { q: "일연", a: "『삼국유사』 저술" }
    ],
    joseon: [
      { q: "이성계", a: "위화도 회군 후 조선 건국" },
      { q: "정도전", a: "재상 중심 유교 정치 구상" },
      { q: "정몽주", a: "고려 충신 (선죽교 설화)" },
      { q: "세종", a: "훈민정음 창제 주도" },
      { q: "성종", a: "『경국대전』 완성·반포" },
      { q: "이순신", a: "수군 지휘·한산도 대첩 등" },
      { q: "권율", a: "행주대첩" },
      { q: "곽재우", a: "의병장 (홍의장군)" },
      { q: "김육", a: "대동법 추진" },
      { q: "영조", a: "균역법·탕평" },
      { q: "정조", a: "규장각·문물 정비" },
      { q: "정약용", a: "『목민심서』 등 실학" },
      { q: "박지원", a: "『열하일기』" },
      { q: "이황", a: "『성학십도』·성리학" },
      { q: "이이", a: "사회 개혁론·양병 강조 일화" },
      { q: "흥선대원군", a: "서원 철폐·경복궁 중건" }
    ],
    modern: [
      { q: "김옥균", a: "갑신정변 주도" },
      { q: "전봉준", a: "동학농민운동 지도" },
      { q: "민영환", a: "을사늑약 반대·순국" },
      { q: "안중근", a: "이토 히로부미 저격" },
      { q: "김구", a: "한인 애국단·의거 지원" },
      { q: "윤봉길", a: "홍커우 공원 의거" },
      { q: "유관순", a: "3·1 운동 만세 시위" },
      { q: "홍범도", a: "봉오동 전투 등 독립군 지휘" },
      { q: "김좌진", a: "청산리 전투 지휘" },
      { q: "신채호", a: "민족주의 사학·『조선상고사』" },
      { q: "주시경", a: "국어·한글 연구·보급" }
    ]
  };

  function mountCards() {
    document.querySelectorAll(".cards[data-pack]").forEach((el) => {
      const list = packs[el.dataset.pack] || [];
      el.innerHTML = "";
      list.forEach((p) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "flip-card";
        btn.innerHTML = `<div class="q">${p.q}</div><div class="hint-tap">탭 → 업적</div><div class="a">${p.a}</div>`;
        btn.addEventListener("click", () => btn.classList.toggle("open"));
        el.appendChild(btn);
      });
    });
  }

  const bank = Object.values(packs).flat();
  const matchBox = document.getElementById("matchBox");
  const scoreEl = document.getElementById("matchScore");

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderMatch() {
    matchBox.innerHTML = "";
    scoreEl.textContent = "";
    const items = shuffle(bank).slice(0, 8);
    items.forEach((item, idx) => {
      const options = shuffle(
        [item.q, ...shuffle(bank.filter((b) => b.q !== item.q)).slice(0, 3).map((b) => b.q)]
      );
      const wrap = document.createElement("div");
      wrap.className = "match-item";
      wrap.innerHTML = `<div class="match-q">${idx + 1}. ${item.a}</div>`;
      const row = document.createElement("div");
      row.className = "match-choices";
      options.forEach((name) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = name;
        b.addEventListener("click", () => {
          const ok = name === item.q;
          b.classList.add(ok ? "ok" : "no");
          [...row.children].forEach((c) => (c.disabled = true));
          if (!ok) {
            [...row.children].find((c) => c.textContent === item.q)?.classList.add("ok");
          }
          updateMatchScore();
        });
        row.appendChild(b);
      });
      wrap.appendChild(row);
      matchBox.appendChild(wrap);
    });
  }

  function updateMatchScore() {
    const buttons = matchBox.querySelectorAll(".match-choices button:disabled");
    const groups = matchBox.querySelectorAll(".match-item").length;
    const answered = matchBox.querySelectorAll(".match-choices").length
      ? [...matchBox.querySelectorAll(".match-choices")].filter((r) =>
          [...r.children].some((c) => c.disabled)
        ).length
      : 0;
    const ok = matchBox.querySelectorAll(".match-choices button.ok:not(.no)").length;
    // count items where correct selected: button.ok that was clicked - simpler:
    let correct = 0;
    matchBox.querySelectorAll(".match-item").forEach((item) => {
      const chosenOk = item.querySelector("button.ok");
      const chosenNo = item.querySelector("button.no");
      if (chosenOk && !chosenNo) correct += 1;
      else if (chosenOk && chosenNo) {
        /* wrong then reveal */
      } else if (chosenOk && chosenNo === null) correct += 1;
    });
    // Fix: if user picked wrong, both .no and .ok exist → not correct
    correct = 0;
    matchBox.querySelectorAll(".match-item").forEach((item) => {
      const no = item.querySelector("button.no");
      const okBtn = item.querySelector("button.ok");
      if (okBtn && !no) correct += 1;
    });
    if (answered) scoreEl.textContent = `현재 ${correct} / ${answered} (전체 ${groups}문항)`;
  }

  document.getElementById("reshuffleMatch").addEventListener("click", renderMatch);
  mountCards();
  renderMatch();
})();
