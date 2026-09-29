(() => {
  const packs = {
    ancient: [
      { q: "근초고왕", a: "백제 전성기·마한 통합" },
      { q: "성왕", a: "사비 천도·백제 중흥" },
      { q: "진흥왕", a: "신라 영토 확장·화랑도 정비" },
      { q: "김춘추", a: "나당 연합·무열왕" },
      { q: "문무왕", a: "당군 격퇴·통일 완성" },
      { q: "을지문덕", a: "살수대첩" },
      { q: "양만춘", a: "안시성 방어" },
      { q: "의상", a: "화엄종·부석사" },
      { q: "견훤", a: "후백제 건국" },
      { q: "궁예", a: "후고구려·태봉" },
      { q: "주몽", a: "고구려 건국" },
      { q: "장보고", a: "청해진·해상 세력" }
    ],
    goryeo: [
      { q: "서희", a: "강동 6주 확보 외교" },
      { q: "강감찬", a: "귀주대첩" },
      { q: "윤관", a: "별무반·여진 정벌" },
      { q: "최충헌", a: "최씨 무신정권 기반" },
      { q: "최우", a: "강화 천도·대몽 항전" },
      { q: "공민왕", a: "반원·개혁 정치" },
      { q: "신돈", a: "공민왕 개혁 보좌" },
      { q: "의천", a: "천태종 정비" },
      { q: "지눌", a: "수선사 결사·정혜쌍수" },
      { q: "김부식", a: "묘청의 난 진압·삼국사기" },
      { q: "왕건", a: "고려 건국" },
      { q: "광종", a: "과거제·왕권 강화" }
    ],
    joseon: [
      { q: "태종", a: "사병 혁파·왕권 강화" },
      { q: "세종", a: "훈민정음·민본·과학" },
      { q: "중종", a: "조광조 등용(기묘사화)" },
      { q: "조광조", a: "도학 정치·현량과" },
      { q: "신립", a: "탄금대 전투" },
      { q: "김시민", a: "진주대첩" },
      { q: "효종", a: "북벌론" },
      { q: "유형원", a: "『반계수록』" },
      { q: "박제가", a: "『북학의』" },
      { q: "김정희", a: "추사체·금석학" },
      { q: "이순신", a: "수군·한산도 대첩" },
      { q: "정약용", a: "『목민심서』" }
    ],
    modern: [
      { q: "흥선대원군", a: "통상 수교 거부·서원 철폐" },
      { q: "박규수", a: "개화 사상 영향" },
      { q: "최익현", a: "위정척사·의병" },
      { q: "유길준", a: "『서유견문』" },
      { q: "서재필", a: "독립협회·만민공동회" },
      { q: "이준", a: "헤이그 특사" },
      { q: "김원봉", a: "의열단" },
      { q: "이봉창", a: "도쿄 의거" },
      { q: "김구", a: "임시정부·광복군" },
      { q: "여운형", a: "건준·좌우합작" },
      { q: "안중근", a: "이토 히로부미 저격" },
      { q: "윤봉길", a: "홍커우 공원 의거" }
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
    const groups = matchBox.querySelectorAll(".match-item").length;
    const answered = [...matchBox.querySelectorAll(".match-choices")].filter((r) =>
      [...r.children].some((c) => c.disabled)
    ).length;
    let correct = 0;
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
