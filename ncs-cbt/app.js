(() => {
  const Q = window.NCS_QUESTIONS;
  const KEYS = ["①", "②", "③", "④", "⑤"];
  const TOTAL = Q.length;
  const ESSAY_PASS = 0.4; // keyword coverage threshold for auto-score hint

  const state = {
    index: 0,
    answers: Array(TOTAL).fill(null), // mc: number | essay: string
    checked: Array(TOTAL).fill(false),
    results: Array(TOTAL).fill(null), // true/false/null (essay: 'partial'|'pass'|'fail')
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

  function answeredCount() {
    return state.answers.filter((a, i) => {
      if (Q[i].type === "essay") return typeof a === "string" && a.trim().length > 0;
      return a !== null;
    }).length;
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
        saveEssayDraft();
        state.index = i;
        renderQuestion();
      });
      grid.appendChild(btn);
    });
  }

  function refreshNav() {
    const buttons = $("navGrid").children;
    [...buttons].forEach((btn, i) => {
      btn.classList.remove("current", "answered", "correct", "wrong", "essay-done");
      if (i === state.index) btn.classList.add("current");
      const a = state.answers[i];
      const has =
        Q[i].type === "essay"
          ? typeof a === "string" && a.trim().length > 0
          : a !== null;
      if (has) btn.classList.add("answered");
      if (state.checked[i]) {
        if (Q[i].type === "essay") btn.classList.add("essay-done");
        else if (state.results[i] === true) btn.classList.add("correct");
        else if (state.results[i] === false) btn.classList.add("wrong");
      }
    });
  }

  function saveEssayDraft() {
    const q = Q[state.index];
    if (q.type !== "essay") return;
    state.answers[state.index] = $("essayInput").value;
  }

  function scoreEssay(text, q) {
    const raw = (text || "").trim();
    if (!raw) return { ok: false, label: "fail", ratio: 0 };
    const lower = raw.toLowerCase();
    const keys = q.keywords || [];
    const hit = keys.filter((k) => lower.includes(k.toLowerCase())).length;
    const ratio = keys.length ? hit / keys.length : 0;
    if (raw.length >= 40 && ratio >= ESSAY_PASS) return { ok: true, label: "pass", ratio, hit, total: keys.length };
    if (raw.length >= 20) return { ok: null, label: "partial", ratio, hit, total: keys.length };
    return { ok: false, label: "fail", ratio, hit, total: keys.length };
  }

  function checkCurrent() {
    const i = state.index;
    const q = Q[i];
    saveEssayDraft();

    if (q.type === "mc") {
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
    } else {
      const text = state.answers[i] || "";
      if (!text.trim()) {
        showFeedback("답안을 작성한 뒤 확인하세요.", "no");
        return;
      }
      const scored = scoreEssay(text, q);
      state.checked[i] = true;
      state.results[i] = scored.label;
      const tip =
        scored.label === "pass"
          ? `자동 평가: 핵심 키워드를 잘 포함했습니다. (${scored.hit}/${scored.total})`
          : scored.label === "partial"
            ? `자동 평가: 부분 충족. 모범답안과 비교해 보완하세요. (키워드 ${scored.hit}/${scored.total})`
            : `자동 평가: 보완 필요. 모범답안을 참고하세요. (키워드 ${scored.hit}/${scored.total})`;
      showFeedback(tip, "essay", q.explain, q.modelAnswer);
    }
    updateProgress();
    refreshNav();
  }

  function showFeedback(title, kind, explain, model) {
    const box = $("feedback");
    box.hidden = false;
    box.className = `feedback ${kind}`;
    let html = `<strong>${title}</strong>`;
    if (explain) html += `<div>${explain}</div>`;
    if (model) html += `<div class="model"><b>모범답안</b><br>${escapeHtml(model)}</div>`;
    box.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderQuestion() {
    const i = state.index;
    const q = Q[i];
    $("qSubject").textContent = q.subject;
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
    const essayBox = $("essayBox");
    const feedback = $("feedback");
    feedback.hidden = true;
    feedback.innerHTML = "";

    if (q.type === "mc") {
      essayBox.hidden = true;
      choices.hidden = false;
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
          // allow re-check after changing answer
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
    } else {
      choices.hidden = true;
      choices.innerHTML = "";
      essayBox.hidden = false;
      $("essayInput").value = state.answers[i] || "";
      $("essayInput").oninput = () => {
        state.answers[i] = $("essayInput").value;
        state.checked[i] = false;
        updateProgress();
        refreshNav();
      };
      if (state.checked[i]) {
        const scored = scoreEssay(state.answers[i], q);
        const tip =
          scored.label === "pass"
            ? `자동 평가: 핵심 키워드를 잘 포함했습니다. (${scored.hit}/${scored.total})`
            : scored.label === "partial"
              ? `자동 평가: 부분 충족. 모범답안과 비교해 보완하세요. (키워드 ${scored.hit}/${scored.total})`
              : `자동 평가: 보완 필요. 모범답안을 참고하세요. (키워드 ${scored.hit || 0}/${scored.total || 0})`;
        showFeedback(tip, "essay", q.explain, q.modelAnswer);
      }
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
    let mcCorrect = 0;
    let mcTotal = 0;
    let essayPass = 0;
    let essayPartial = 0;
    let essayTotal = 0;

    Q.forEach((q, i) => {
      if (!bySubject[q.subject]) bySubject[q.subject] = { correct: 0, total: 0, essayNote: 0 };
      bySubject[q.subject].total += 1;

      if (q.type === "mc") {
        mcTotal += 1;
        const ok = state.answers[i] === q.answer;
        if (ok) {
          mcCorrect += 1;
          bySubject[q.subject].correct += 1;
        }
        state.results[i] = ok;
        state.checked[i] = true;
      } else {
        essayTotal += 1;
        const scored = scoreEssay(state.answers[i], q);
        state.results[i] = scored.label;
        state.checked[i] = true;
        if (scored.label === "pass") {
          essayPass += 1;
          bySubject[q.subject].correct += 1;
        } else if (scored.label === "partial") {
          essayPartial += 1;
          bySubject[q.subject].correct += 0.5;
          bySubject[q.subject].essayNote += 1;
        }
      }
    });

    // Weighted: MC exact + essay pass=1, partial=0.5
    const essayScore = essayPass + essayPartial * 0.5;
    const totalScore = mcCorrect + essayScore;
    return { bySubject, mcCorrect, mcTotal, essayPass, essayPartial, essayTotal, totalScore };
  }

  function finishTest(fromTimer) {
    saveEssayDraft();
    if (state.timerId) clearInterval(state.timerId);
    state.finished = true;

    const scores = computeScores();
    const pct = Math.round((scores.totalScore / TOTAL) * 100);

    quizPanel.hidden = true;
    resultPanel.hidden = false;
    $("scoreTitle").textContent = fromTimer ? "시간 종료 · 자동 제출" : "채점 완료";
    $("scoreLead").textContent =
      `객관식 ${scores.mcCorrect}/${scores.mcTotal} · 논술 충족 ${scores.essayPass} · 부분 ${scores.essayPartial} (논술 ${scores.essayTotal}문항)`;
    $("scorePct").textContent = `${pct}%`;
    $("scoreFrac").textContent = `${scores.totalScore.toFixed(1)} / ${TOTAL}`;
    $("scoreRing").style.setProperty("--p", `${pct}%`);

    const box = $("subjectScores");
    box.innerHTML = "";
    Object.entries(scores.bySubject).forEach(([name, s]) => {
      const art = document.createElement("article");
      art.innerHTML = `<h3>${name}</h3><p>${s.correct.toFixed(1)} / ${s.total}</p>`;
      box.appendChild(art);
    });
  }

  $("startBtn").addEventListener("click", startTest);
  $("checkBtn").addEventListener("click", checkCurrent);
  $("prevBtn").addEventListener("click", () => {
    saveEssayDraft();
    if (state.index > 0) {
      state.index -= 1;
      renderQuestion();
    }
  });
  $("nextBtn").addEventListener("click", () => {
    saveEssayDraft();
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
  });

  // keyboard: 1-5 select, N/P navigate
  document.addEventListener("keydown", (e) => {
    if (!state.started || state.finished || quizPanel.hidden) return;
    const q = Q[state.index];
    if (e.target && e.target.tagName === "TEXTAREA") return;
    if (q.type === "mc" && e.key >= "1" && e.key <= "5") {
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
})();
