(() => {
  const Q = window.NCS_QUESTIONS;
  const META = window.NCS_META || {};
  const KEYS = ["①", "②", "③", "④", "⑤"];
  const TOTAL = Q.length;
  const STORAGE_KEY = "ncs-cbt-history-people-v5";
  const DEFAULT_SECONDS = 30 * 60;

  const state = {
    index: 0,
    answers: Array(TOTAL).fill(null),
    checked: Array(TOTAL).fill(false),
    results: Array(TOTAL).fill(null),
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

  if ($("totalCount")) $("totalCount").textContent = String(TOTAL);

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveAttempt(payload) {
    const hist = loadHistory();
    hist.unshift(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hist.slice(0, 10)));
  }

  function renderFocusBanner() {
    const box = $("focusBanner");
    box.innerHTML = `<strong>학습 모드</strong><span>${META.focusNote || ""}</span>`;
  }

  function answeredCount() {
    return state.answers.filter((a) => a !== null).length;
  }

  function updateProgress() {
    const n = answeredCount();
    $("answeredCount").textContent = String(n);
    $("progressFill").style.width = `${(n / TOTAL) * 100}%`;
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function tickTimer() {
    const el = $("timer");
    el.textContent = formatTime(state.seconds);
    el.classList.toggle("warn", state.seconds <= 300 && state.seconds > 60);
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
      btn.title = q.format || q.subject;
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
    $("qSubject").textContent = "한국사";
    const fmt = $("qFormat");
    if (q.format) {
      fmt.hidden = false;
      fmt.textContent = q.format;
    } else {
      fmt.hidden = true;
    }
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
    state.started = true;
    state.finished = false;
    state.index = 0;
    state.answers = Array(TOTAL).fill(null);
    state.checked = Array(TOTAL).fill(false);
    state.results = Array(TOTAL).fill(null);
    state.timerOn = $("timerToggle").checked;
    state.seconds = DEFAULT_SECONDS;

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

  function computeScores() {
    let correct = 0;
    const wrongPeople = [];
    Q.forEach((q, i) => {
      const ok = state.answers[i] === q.answer;
      state.results[i] = ok;
      state.checked[i] = true;
      if (ok) correct += 1;
      else wrongPeople.push(q.choices[q.answer] || q.stem.slice(0, 24));
    });
    return { correct, wrongPeople };
  }

  function finishTest(fromTimer) {
    if (state.timerId) clearInterval(state.timerId);
    state.finished = true;

    const scores = computeScores();
    const pct = Math.round((scores.correct / TOTAL) * 100);

    saveAttempt({
      at: Date.now(),
      version: META.version || 5,
      correct: scores.correct,
      total: TOTAL,
      wrong: scores.wrongPeople
    });

    quizPanel.hidden = true;
    resultPanel.hidden = false;
    $("scoreTitle").textContent = fromTimer ? "시간 종료 · 자동 제출" : "채점 완료";
    $("scoreLead").textContent = `인물·활약 문제 ${scores.correct}/${TOTAL}`;
    $("scorePct").textContent = `${pct}%`;
    $("scoreFrac").textContent = `${scores.correct} / ${TOTAL}`;
    $("scoreRing").style.setProperty("--p", `${pct}%`);

    const wbox = $("weaknessBox");
    if (scores.wrongPeople.length) {
      const uniq = [...new Set(scores.wrongPeople)].slice(0, 8);
      wbox.innerHTML =
        `<strong>다시 볼 인물·키워드</strong>` +
        uniq.map((n) => `<div class="weak-row"><span>${n}</span></div>`).join("") +
        `<p class="weak-tip">위 인물을 암기 카드에서 찾아 업적만 다시 외워보세요.</p>`;
    } else {
      wbox.innerHTML = `<strong>훌륭합니다</strong><p class="weak-tip">전 문항 정답입니다. 암기 카드로 한 번 더 훑어보면 좋습니다.</p>`;
    }

    $("subjectScores").innerHTML = `<article class="hot-score"><h3>한국사 (인물·활약)</h3><p>${scores.correct} / ${TOTAL} · ${pct}%</p></article>`;
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
    if (e.target && (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")) return;
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

  renderFocusBanner();
})();
