(() => {
  const ALL = window.NCS_QUESTIONS;
  const META = window.NCS_META || {};
  const KEYS = ["①", "②", "③", "④", "⑤"];
  const ERAS = META.eras || ["고대·남북국", "고려", "조선", "근현대"];
  const STORAGE_KEY = "ncs-cbt-history-era-v6";
  const DEFAULT_SECONDS = 30 * 60;

  let Q = ALL;
  let TOTAL = Q.length;

  const state = {
    era: "전체",
    index: 0,
    answers: [],
    checked: [],
    results: [],
    timerOn: true,
    seconds: DEFAULT_SECONDS,
    timerId: null,
    started: false,
    finished: false
  };

  const $ = (id) => document.getElementById(id);
  const startPanel = $("startPanel");
  const quizPanel = $("quizPanel");
  const resultPanel = $("resultPanel");
  const topMeta = $("topMeta");

  function resetArrays() {
    TOTAL = Q.length;
    state.answers = Array(TOTAL).fill(null);
    state.checked = Array(TOTAL).fill(false);
    state.results = Array(TOTAL).fill(null);
    state.index = 0;
    if ($("totalCount")) $("totalCount").textContent = String(TOTAL);
  }

  function setEra(era) {
    state.era = era;
    Q = era === "전체" ? ALL : ALL.filter((q) => q.era === era);
    resetArrays();
    document.querySelectorAll(".era-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.era === era);
    });
    const countEl = $("eraCount");
    if (countEl) {
      countEl.textContent =
        era === "전체"
          ? `전체 ${ALL.length}문항`
          : `${era} ${Q.length}문항`;
    }
  }

  function renderEraButtons() {
    const wrap = $("eraButtons");
    if (!wrap) return;
    wrap.innerHTML = "";
    ["전체", ...ERAS].forEach((era) => {
      const n = era === "전체" ? ALL.length : ALL.filter((q) => q.era === era).length;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "era-btn" + (era === state.era ? " active" : "");
      btn.dataset.era = era;
      btn.innerHTML = `<b>${era}</b><span>${n}문항</span>`;
      btn.addEventListener("click", () => setEra(era));
      wrap.appendChild(btn);
    });
  }

  function renderFocusBanner() {
    const box = $("focusBanner");
    box.innerHTML = `<strong>시대별 인물·활약</strong><span>${META.focusNote || ""}</span>`;
  }

  function answeredCount() {
    return state.answers.filter((a) => a !== null).length;
  }

  function updateProgress() {
    const n = answeredCount();
    $("answeredCount").textContent = String(n);
    $("progressFill").style.width = TOTAL ? `${(n / TOTAL) * 100}%` : "0%";
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function tickTimer() {
    const el = $("timer");
    el.textContent = formatTime(state.seconds);
    el.classList.toggle("warn", state.seconds <= 180 && state.seconds > 60);
    el.classList.toggle("danger", state.seconds <= 60);
    if (state.seconds <= 0) {
      clearInterval(state.timerId);
      finishTest(true);
      return;
    }
    state.seconds -= 1;
  }

  function buildNav() {
    const grid = $("navGrid");
    grid.innerHTML = "";
    Q.forEach((q, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nav-btn";
      btn.textContent = String(i + 1);
      btn.title = `${q.era} · ${q.choices[q.answer] || ""}`;
      btn.addEventListener("click", () => {
        state.index = i;
        renderQuestion();
      });
      grid.appendChild(btn);
    });
  }

  function refreshNav() {
    const buttons = $("navGrid").children;
    [...buttons].forEach((btn, i) => {
      btn.classList.remove("current", "answered", "correct", "wrong");
      if (i === state.index) btn.classList.add("current");
      if (state.answers[i] !== null) btn.classList.add("answered");
      if (state.checked[i]) {
        if (state.results[i] === true) btn.classList.add("correct");
        else if (state.results[i] === false) btn.classList.add("wrong");
      }
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function showFeedback(title, kind, explain) {
    const box = $("feedback");
    box.hidden = false;
    box.className = `feedback ${kind}`;
    box.innerHTML = `<strong>${title}</strong>${explain ? `<div>${explain}</div>` : ""}`;
  }

  function checkCurrent() {
    const i = state.index;
    const q = Q[i];
    if (state.answers[i] === null) {
      showFeedback("답을 선택한 뒤 확인하세요.", "no");
      return;
    }
    const correct = state.answers[i] === q.answer;
    state.checked[i] = true;
    state.results[i] = correct;
    renderQuestion();
    showFeedback(
      correct ? "정답입니다." : `오답입니다. 정답은 ${KEYS[q.answer]}입니다.`,
      correct ? "ok" : "no",
      q.explain
    );
    updateProgress();
    refreshNav();
  }

  function renderQuestion() {
    const i = state.index;
    const q = Q[i];
    $("qSubject").textContent = q.era;
    const fmt = $("qFormat");
    fmt.hidden = false;
    fmt.textContent = q.format || "인물·활약";
    $("qNum").textContent = `${i + 1} / ${TOTAL}`;
    $("qStem").textContent = q.stem;

    const passage = $("qPassage");
    if (q.passage) {
      passage.hidden = false;
      passage.textContent = q.passage;
    } else {
      passage.hidden = true;
      passage.textContent = "";
    }

    const choices = $("choices");
    const feedback = $("feedback");
    feedback.hidden = true;
    feedback.innerHTML = "";
    choices.innerHTML = "";

    q.choices.forEach((c, ci) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      if (state.answers[i] === ci) btn.classList.add("selected");
      if (state.checked[i]) {
        if (ci === q.answer) btn.classList.add("correct");
        else if (state.answers[i] === ci) btn.classList.add("wrong");
      }
      btn.innerHTML = `<span class="choice-key">${KEYS[ci]}</span><span>${escapeHtml(c)}</span>`;
      btn.addEventListener("click", () => {
        if (state.finished) return;
        state.answers[i] = ci;
        state.checked[i] = false;
        state.results[i] = null;
        renderQuestion();
        updateProgress();
        refreshNav();
      });
      choices.appendChild(btn);
    });

    if (state.checked[i]) {
      const correct = state.results[i] === true;
      showFeedback(
        correct ? "정답입니다." : `오답입니다. 정답은 ${KEYS[q.answer]}입니다.`,
        correct ? "ok" : "no",
        q.explain
      );
    }

    $("prevBtn").disabled = i === 0;
    $("nextBtn").textContent = i === TOTAL - 1 ? "결과 보기" : "다음";
    refreshNav();
  }

  function startTest() {
    if (!Q.length) {
      alert("선택한 시대에 문항이 없습니다.");
      return;
    }
    state.started = true;
    state.finished = false;
    resetArrays();
    state.timerOn = $("timerToggle").checked;
    state.seconds = state.era === "전체" ? DEFAULT_SECONDS : 12 * 60;

    startPanel.hidden = true;
    resultPanel.hidden = true;
    quizPanel.hidden = false;
    topMeta.hidden = false;

    buildNav();
    renderQuestion();
    updateProgress();

    if (state.timerId) clearInterval(state.timerId);
    if (state.timerOn) {
      $("timer").hidden = false;
      tickTimer();
      state.timerId = setInterval(tickTimer, 1000);
    } else {
      $("timer").hidden = true;
    }
  }

  function finishTest(fromTimer) {
    if (state.timerId) clearInterval(state.timerId);
    state.finished = true;

    let correct = 0;
    const wrong = [];
    const byEra = {};
    Q.forEach((q, i) => {
      if (!byEra[q.era]) byEra[q.era] = { name: q.era, correct: 0, total: 0 };
      byEra[q.era].total += 1;
      const ok = state.answers[i] === q.answer;
      state.results[i] = ok;
      state.checked[i] = true;
      if (ok) {
        correct += 1;
        byEra[q.era].correct += 1;
      } else {
        wrong.push(q.choices[q.answer] || q.stem.slice(0, 20));
      }
    });

    const pct = TOTAL ? Math.round((correct / TOTAL) * 100) : 0;
    try {
      const hist = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      hist.unshift({ at: Date.now(), era: state.era, correct, total: TOTAL, wrong });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hist.slice(0, 10)));
    } catch (_) {}

    quizPanel.hidden = true;
    resultPanel.hidden = false;
    $("scoreTitle").textContent = fromTimer ? "시간 종료 · 자동 제출" : "채점 완료";
    $("scoreLead").textContent = `${state.era} · ${correct}/${TOTAL}`;
    $("scorePct").textContent = `${pct}%`;
    $("scoreFrac").textContent = `${correct} / ${TOTAL}`;
    $("scoreRing").style.setProperty("--p", `${pct}%`);

    const wbox = $("weaknessBox");
    if (wrong.length) {
      const uniq = [...new Set(wrong)].slice(0, 8);
      wbox.innerHTML =
        `<strong>다시 볼 인물</strong>` +
        uniq.map((n) => `<div class="weak-row"><span>${n}</span></div>`).join("") +
        `<p class="weak-tip">해당 시대 카드만 다시 보고 같은 시대를 한 번 더 풀어보세요.</p>`;
    } else {
      wbox.innerHTML = `<strong>완벽합니다</strong><p class="weak-tip">다른 시대로 이어서 풀어보세요.</p>`;
    }

    const box = $("subjectScores");
    box.innerHTML = "";
    Object.values(byEra).forEach((s) => {
      const rate = Math.round((s.correct / s.total) * 100);
      const art = document.createElement("article");
      if (rate < 70) art.classList.add("weak");
      art.innerHTML = `<h3>${s.name}</h3><p>${s.correct} / ${s.total} · ${rate}%</p>`;
      box.appendChild(art);
    });
  }

  $("startBtn").addEventListener("click", startTest);
  $("checkBtn").addEventListener("click", checkCurrent);
  $("prevBtn").addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      renderQuestion();
    }
  });
  $("nextBtn").addEventListener("click", () => {
    if (state.index < TOTAL - 1) {
      state.index += 1;
      renderQuestion();
    } else finishTest(false);
  });
  $("submitAllBtn").addEventListener("click", () => {
    if (confirm("제출하고 결과를 볼까요?")) finishTest(false);
  });
  $("reviewBtn").addEventListener("click", () => {
    resultPanel.hidden = true;
    quizPanel.hidden = false;
    const firstWrong = state.results.findIndex((r) => r === false);
    state.index = firstWrong >= 0 ? firstWrong : 0;
    renderQuestion();
  });
  $("restartBtn").addEventListener("click", () => {
    startPanel.hidden = false;
    resultPanel.hidden = true;
    quizPanel.hidden = true;
    topMeta.hidden = true;
    if (state.timerId) clearInterval(state.timerId);
    renderFocusBanner();
  });

  document.addEventListener("keydown", (e) => {
    if (!state.started || state.finished || quizPanel.hidden) return;
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    const q = Q[state.index];
    if (e.key >= "1" && e.key <= "5") {
      const ci = Number(e.key) - 1;
      if (ci < q.choices.length) {
        state.answers[state.index] = ci;
        state.checked[state.index] = false;
        renderQuestion();
        updateProgress();
      }
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) checkCurrent();
  });

  renderEraButtons();
  setEra("전체");
  renderFocusBanner();
})();
