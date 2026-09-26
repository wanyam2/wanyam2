(() => {
  const Q = window.NCS_QUESTIONS;
  const META = window.NCS_META || {};
  const KEYS = ["①", "②", "③", "④", "⑤"];
  const TOTAL = Q.length;
  const STORAGE_KEY = "ncs-cbt-history-v2";

  const state = {
    index: 0,
    answers: Array(TOTAL).fill(null),
    checked: Array(TOTAL).fill(false),
    results: Array(TOTAL).fill(null),
    timerOn: true,
    seconds: 60 * 60,
    timerId: null,
    started: false,
    finished: false
  };

  const $ = (id) => document.getElementById(id);
  const startPanel = $("startPanel");
  const quizPanel = $("quizPanel");
  const resultPanel = $("resultPanel");
  const topMeta = $("topMeta");

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

  function lastWeakSubjects() {
    const hist = loadHistory();
    if (!hist.length) return META.focus || [];
    const last = hist[0];
    return (last.subjects || [])
      .filter((s) => s.total > 0 && s.correct / s.total < 0.6)
      .sort((a, b) => a.correct / a.total - b.correct / b.total)
      .map((s) => s.name)
      .slice(0, 3);
  }

  function renderFocusBanner() {
    const box = $("focusBanner");
    const weak = lastWeakSubjects();
    const fromHistory = loadHistory().length > 0;
    const labels = weak.length ? weak.join(" · ") : (META.focus || []).join(" · ");
    box.innerHTML = fromHistory
      ? `<strong>지난 응시 약점 반영</strong><span>정답률 낮은 과목: <b>${labels}</b> — 이번 세트는 해당 영역을 더 많이 포함합니다.</span>`
      : `<strong>약점 집중 세트</strong><span>${META.focusNote || ""}</span><br/><span>집중 과목: <b>${labels}</b></span>`;
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
      btn.title = q.subject;
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
    $("qSubject").textContent = q.subject;
    const fmt = $("qFormat");
    if (q.format) {
      fmt.hidden = false;
      fmt.textContent = q.format;
    } else {
      fmt.hidden = true;
      fmt.textContent = "";
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
    state.seconds = 60 * 60;

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
    const bySubject = {};
    let correct = 0;

    Q.forEach((q, i) => {
      if (!bySubject[q.subject]) bySubject[q.subject] = { name: q.subject, correct: 0, total: 0 };
      bySubject[q.subject].total += 1;
      const ok = state.answers[i] === q.answer;
      state.results[i] = ok;
      state.checked[i] = true;
      if (ok) {
        correct += 1;
        bySubject[q.subject].correct += 1;
      }
    });

    const subjects = Object.values(bySubject);
    return { correct, subjects };
  }

  function finishTest(fromTimer) {
    if (state.timerId) clearInterval(state.timerId);
    state.finished = true;

    const scores = computeScores();
    const pct = Math.round((scores.correct / TOTAL) * 100);
    const weak = scores.subjects
      .filter((s) => s.total > 0)
      .map((s) => ({ ...s, rate: s.correct / s.total }))
      .sort((a, b) => a.rate - b.rate);

    saveAttempt({
      at: Date.now(),
      version: META.version || 2,
      correct: scores.correct,
      total: TOTAL,
      subjects: scores.subjects
    });

    quizPanel.hidden = true;
    resultPanel.hidden = false;
    $("scoreTitle").textContent = fromTimer ? "시간 종료 · 자동 제출" : "채점 완료";
    $("scoreLead").textContent = `전체 정답 ${scores.correct}/${TOTAL}`;
    $("scorePct").textContent = `${pct}%`;
    $("scoreFrac").textContent = `${scores.correct} / ${TOTAL}`;
    $("scoreRing").style.setProperty("--p", `${pct}%`);

    const wbox = $("weaknessBox");
    const topWeak = weak.filter((s) => s.rate < 0.7).slice(0, 3);
    if (topWeak.length) {
      wbox.innerHTML =
        `<strong>약점 분석</strong>` +
        topWeak
          .map(
            (s) =>
              `<div class="weak-row"><span>${s.name}</span><b>${s.correct}/${s.total}</b> <em>(${Math.round(s.rate * 100)}%)</em></div>`
          )
          .join("") +
        `<p class="weak-tip">다음 세트에서는 위 과목 비중을 더 늘리는 것을 권장합니다. 결과는 이 기기에 저장되었습니다.</p>`;
    } else {
      wbox.innerHTML = `<strong>약점 분석</strong><p class="weak-tip">전 과목 정답률이 고르게 양호합니다. 오답 해설을 복습해 보세요.</p>`;
    }

    const box = $("subjectScores");
    box.innerHTML = "";
    scores.subjects.forEach((s) => {
      const rate = Math.round((s.correct / s.total) * 100);
      const art = document.createElement("article");
      if (rate < 60) art.classList.add("weak");
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
    } else {
      finishTest(false);
    }
  });
  $("submitAllBtn").addEventListener("click", () => {
    if (confirm("전체 제출하고 결과를 확인할까요?")) finishTest(false);
  });
  $("reviewBtn").addEventListener("click", () => {
    resultPanel.hidden = true;
    quizPanel.hidden = false;
    state.index = 0;
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
