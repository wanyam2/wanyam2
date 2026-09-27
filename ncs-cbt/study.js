(() => {
  const people = [
    { q: "고조선 건국 설화", a: "단군왕검" },
    { q: "고구려 건국", a: "주몽(동명성왕)" },
    { q: "백제 건국", a: "온조" },
    { q: "발해 건국", a: "대조영 (698)" },
    { q: "고려 건국", a: "왕건 (918)" },
    { q: "과거제 도입", a: "고려 광종" },
    { q: "조선 건국", a: "이성계 (1392)" },
    { q: "훈민정음", a: "세종 (1446 반포)" },
    { q: "임진왜란 수군", a: "이순신" },
    { q: "목민심서", a: "정약용" },
    { q: "갑신정변", a: "급진 개화파(김옥균 등)" },
    { q: "인천상륙작전", a: "맥아더 (1950)" }
  ];

  const events = [
    { k: "무신정변", v: "1170, 고려 의종 때 무신이 정권 장악" },
    { k: "팔만대장경", v: "몽골 침입기, 국난 극복 염원으로 조성" },
    { k: "임진왜란", v: "1592, 일본 침입 / 이순신·의병" },
    { k: "병자호란", v: "1636, 청 침입 / 군신 관계" },
    { k: "강화도 조약", v: "1876, 불평등 개항" },
    { k: "갑신정변", v: "1884, 3일 천하" },
    { k: "동학·갑오", v: "1894, 농민운동 + 근대 개혁" },
    { k: "을사늑약", v: "1905, 외교권 박탈·통감부" },
    { k: "강제병합", v: "1910, 국권 피탈" },
    { k: "무단 통치", v: "1910년대, 헌병 경찰 강압" },
    { k: "3·1 운동", v: "1919.3.1, 독립 만세 → 임시정부" },
    { k: "문화 통치", v: "3·1 이후 기만적 유화책 표방" },
    { k: "창씨개명", v: "일제 말 민족 말살 정책" },
    { k: "광복", v: "1945.8.15" },
    { k: "정부 수립", v: "1948.8.15" },
    { k: "6·25", v: "1950.6.25 발발 / 1953.7.27 정전" },
    { k: "4·19", v: "1960, 3·15 부정선거 항거" }
  ];

  const drills = [
    { prompt: "조선 건국 연도", answer: "1392" },
    { prompt: "훈민정음 반포 연도", answer: "1446" },
    { prompt: "임진왜란 연도", answer: "1592" },
    { prompt: "병자호란 연도", answer: "1636" },
    { prompt: "강화도 조약 연도", answer: "1876" },
    { prompt: "을사늑약 연도", answer: "1905" },
    { prompt: "강제병합 연도", answer: "1910" },
    { prompt: "3·1 운동 연도", answer: "1919" },
    { prompt: "광복 연도", answer: "1945" },
    { prompt: "대한민국 정부 수립 연도", answer: "1948" },
    { prompt: "발해 건국자", answer: "대조영" },
    { prompt: "고려 건국자", answer: "왕건" }
  ];

  const peopleEl = document.getElementById("peopleCards");
  people.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "flip-card";
    btn.innerHTML = `<div class="q">${p.q}</div><div class="hint-tap">탭하여 정답 보기</div><div class="a">${p.a}</div>`;
    btn.addEventListener("click", () => btn.classList.toggle("open"));
    peopleEl.appendChild(btn);
  });

  const table = document.getElementById("eventTable");
  events.forEach((e) => {
    const row = document.createElement("div");
    row.className = "kv-row";
    row.innerHTML = `<b>${e.k}</b><span>${e.v}</span>`;
    table.appendChild(row);
  });

  const drillBox = document.getElementById("drillBox");
  drills.forEach((d, i) => {
    const wrap = document.createElement("div");
    wrap.className = "drill-item";
    wrap.dataset.answer = d.answer;
    wrap.innerHTML = `<label for="d${i}">${i + 1}. ${d.prompt}</label><input id="d${i}" autocomplete="off" placeholder="답 입력" />`;
    drillBox.appendChild(wrap);
  });

  function norm(s) {
    return String(s || "")
      .replace(/\s+/g, "")
      .replace(/년/g, "")
      .toLowerCase();
  }

  document.getElementById("checkDrill").addEventListener("click", () => {
    let ok = 0;
    [...drillBox.children].forEach((item) => {
      const input = item.querySelector("input");
      const correct = norm(item.dataset.answer);
      const val = norm(input.value);
      const pass = val === correct || (correct.length >= 2 && val.includes(correct));
      item.classList.toggle("ok", pass);
      item.classList.toggle("no", !pass && val.length > 0);
      if (pass) ok += 1;
      if (!pass && val.length > 0) input.title = `정답: ${item.dataset.answer}`;
    });
    document.getElementById("drillResult").textContent = `결과: ${ok} / ${drills.length}`;
  });

  document.getElementById("resetDrill").addEventListener("click", () => {
    [...drillBox.children].forEach((item) => {
      item.classList.remove("ok", "no");
      const input = item.querySelector("input");
      input.value = "";
      input.title = "";
    });
    document.getElementById("drillResult").textContent = "";
  });
})();
