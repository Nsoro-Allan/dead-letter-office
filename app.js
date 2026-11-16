(() => {
  const $ = s => document.querySelector(s), C = window.DLO, main = $('#main');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const lights = () => document.body.classList.contains('lights');
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  let st, tells, decoys, done, best = 0, stats = { shifts: 0, flawless: 0 }, snd = false;
  try { best = +localStorage.getItem('dlo-best') || 0; stats = JSON.parse(localStorage.getItem('dlo-stats')) || stats; snd = localStorage.getItem('dlo-snd') === '1'; } catch (e) {}
  const save = () => { try { localStorage.setItem('dlo-best', best); localStorage.setItem('dlo-stats', JSON.stringify(stats)); localStorage.setItem('dlo-snd', snd ? 1 : 0); } catch (e) {} };

  // Synthesised sound: no audio files. Drone + wind ambience, plus small effects.
  const A = (() => {
    let x, g, on = false;
    const noise = d => { const b = x.createBuffer(1, x.sampleRate * d, x.sampleRate), a = b.getChannelData(0); for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; return b; };
    function ambience() {
      [55, 55.6].forEach(f => { const o = x.createOscillator(), v = x.createGain(); o.frequency.value = f; v.gain.value = .05; o.connect(v).connect(g); o.start(); });
      const n = x.createBufferSource(), lp = x.createBiquadFilter(), v = x.createGain(), l = x.createOscillator(), lg = x.createGain();
      n.buffer = noise(4); n.loop = true; lp.type = 'lowpass'; lp.frequency.value = 380; v.gain.value = .05; l.frequency.value = .1; lg.gain.value = .03;
      l.connect(lg).connect(v.gain); l.start(); n.connect(lp).connect(v).connect(g); n.start();
    }
    function ctx() {
      if (!x) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; x = new AC(); g = x.createGain(); g.gain.value = 0; g.connect(x.destination); ambience(); }
      return x;
    }
    function tone(f, t, d, type, vol, f2) {
      if (!on) return; const o = x.createOscillator(), v = x.createGain(), n = x.currentTime + t;
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, n); if (f2) o.frequency.exponentialRampToValueAtTime(f2, n + d);
      v.gain.setValueAtTime(vol, n); v.gain.exponentialRampToValueAtTime(.001, n + d); o.connect(v).connect(x.destination); o.start(n); o.stop(n + d);
    }
    function burst(d, f1, f2) {
      if (!on) return; const s = x.createBufferSource(), b = x.createBiquadFilter(), v = x.createGain(), n = x.currentTime;
      s.buffer = noise(d); b.type = 'bandpass'; b.frequency.setValueAtTime(f1, n); b.frequency.exponentialRampToValueAtTime(f2, n + d);
      v.gain.setValueAtTime(.3, n); v.gain.exponentialRampToValueAtTime(.001, n + d); s.connect(b).connect(v).connect(x.destination); s.start();
    }
    return {
      set(v) { on = v; if (v && ctx()) { x.resume(); g.gain.linearRampToValueAtTime(1, x.currentTime + 1.5); } else if (g) g.gain.linearRampToValueAtTime(0, x.currentTime + .3); },
      creak() { tone(180, 0, .5, 'sawtooth', .05, 90); }, chime() { tone(880, 0, .8, 'sine', .12); tone(1320, .12, .9, 'sine', .08); },
      thud() { tone(90, 0, .5, 'triangle', .4, 40); }, whoosh() { burst(.8, 3000, 300); }, scare() { tone(60, 0, .8, 'sawtooth', .3, 30); burst(.5, 200, 4000); }, snuff() { burst(.4, 1500, 200); }
    };
  })();

  function fmt(str) {
    return C.parse(str).map(p => {
      if (p.t === 'text') return esc(p.text);
      const arr = p.t === 'tell' ? tells : decoys, n = arr.push({ text: p.text, why: p.why }) - 1;
      return `<button type="button" class="${p.t}" data-k="${p.t}${n}" aria-pressed="false" tabindex="${lights() ? 0 : -1}">${esc(p.text)}</button>`;
    }).join('');
  }
  const candles = n => [0, 1, 2].map(i => `<i class="cn${i >= n ? ' out' : ''}"></i>`).join('');

  function intro() {
    main.innerHTML = `<section class="card"><h1>Dead Letter Office</h1>
      <p>Every scam is a ghost story. The clues are there, if you hold a light to them.</p>
      <p>Letters arrive after midnight. <b>Sweep the UV lamp</b> over each one with your mouse or finger. Tap anything that glows and feels wrong, then <b>deliver</b> the letter or <b>burn</b> it. You have three candles: every wrong verdict snuffs one, and when the last goes out the dead take the office.</p>
      <p class="dim">Best score ${best}. Shifts worked ${stats.shifts}, flawless shifts ${stats.flawless}. Turn on sound for the full haunting, or <b>Lights on</b> if the dark is hard to read.</p>
      <button class="btn" id="go">Enter the office</button></section>`;
    $('#go').onclick = () => { if (snd) A.set(true); start(); };
  }

  function start() {
    const all = C.SCENARIOS, deck = shuffle([...shuffle(all.filter(s => s.scam)).slice(0, 5), ...shuffle(all.filter(s => !s.scam)).slice(0, 3)]);
    st = { deck, i: 0, score: 0, streak: 0, hits: 0, lives: 3, hints: 3, usedHints: 0, wrong: 0, missed: 0, fa: 0 }; round();
  }

  function round() {
    const s = st.deck[st.i]; tells = []; decoys = []; done = false; A.creak();
    const row = (k, v) => v ? `<div class="row"><b>${k}</b>${fmt(v)}</div>` : '';
    main.innerHTML = `<div class="bar"><span>Letter ${st.i + 1} of ${st.deck.length}</span><span id="sc">Score ${st.score}</span><span id="sk">Streak ${st.streak}</span><span class="cds" id="cd" aria-label="${st.lives} candles left">${candles(st.lives)}</span></div>
      <article class="paper ${s.kind === 'SMS' ? 'sms' : ''}" id="paper" aria-label="${s.kind} to inspect"><i class="seal"></i><span class="chip">${s.kind}</span>
        ${row('From', s.from)}${row('Address', s.url)}${row('Subject', s.subj)}<div class="body">${fmt(s.body)}</div></article>
      <div class="tools"><p class="dim" id="hint">Sweep the lamp over the letter. Tap glowing text that feels wrong; tap again to unmark.</p>
        <button class="ghost" id="hn">Whisper a clue (−20), ${st.hints} left</button></div>
      <div class="acts"><button class="btn" id="dv">Deliver</button><button class="btn bad" id="bn">Burn</button></div><div id="file" aria-live="polite"></div>`;
    const p = $('#paper');
    ['pointermove', 'pointerdown'].forEach(ev => p.addEventListener(ev, lamp));
    p.addEventListener('pointerleave', () => { p.style.setProperty('--x', '-999px'); p.querySelectorAll('.lit').forEach(b => b.classList.remove('lit')); });
    p.addEventListener('click', e => {
      const b = e.target.closest('.tell,.decoy');
      if (!b || done || (!lights() && !b.classList.contains('lit'))) return;
      b.classList.toggle('mark'); b.setAttribute('aria-pressed', b.classList.contains('mark'));
    });
    $('#dv').onclick = () => verdict('deliver'); $('#bn').onclick = () => verdict('burn'); $('#hn').onclick = whisper;
    if (!st.hints) $('#hn').disabled = true;
  }

  function whisper() {
    if (done || !st.hints) return;
    const t = [...document.querySelectorAll('.tell:not(.mark)')][0]; if (!t) { $('#hn').disabled = true; return; }
    t.classList.add('hint'); setTimeout(() => t.classList.remove('hint'), 2600);
    st.hints--; st.usedHints++; st.score = Math.max(0, st.score - 20); $('#sc').textContent = 'Score ' + st.score;
    $('#hn').textContent = `Whisper a clue (−20), ${st.hints} left`; if (!st.hints) $('#hn').disabled = true;
  }

  function lamp(e) {
    const p = $('#paper'), r = p.getBoundingClientRect();
    p.style.setProperty('--x', e.clientX - r.left + 'px'); p.style.setProperty('--y', e.clientY - r.top + 'px');
    p.querySelectorAll('.tell,.decoy').forEach(b => {
      const q = b.getBoundingClientRect(), dx = Math.max(q.left - e.clientX, 0, e.clientX - q.right), dy = Math.max(q.top - e.clientY, 0, e.clientY - q.bottom);
      b.classList.toggle('lit', Math.hypot(dx, dy) < 90);
    });
  }

  function jumpscare() {
    A.scare(); const el = $('#scare'); el.classList.add('on'); document.body.classList.add('shake');
    setTimeout(() => { el.classList.remove('on'); document.body.classList.remove('shake'); }, 900);
  }

  function verdict(v) {
    if (done) return; done = true;
    const s = st.deck[st.i], p = $('#paper'), last = st.i === st.deck.length - 1;
    const marked = (k, n) => p.querySelector(`[data-k="${k}${n}"]`).classList.contains('mark');
    const found = tells.filter((_, n) => marked('tell', n)).length, fa = decoys.filter((_, n) => marked('decoy', n)).length;
    const r = C.scoreRound({ scam: s.scam, verdict: v, found, falseAlarms: fa, streak: st.streak });
    st.score += r.points; st.streak = r.correct ? st.streak + 1 : 0; st.hits += r.correct ? 1 : 0; st.fa += fa;
    if (s.scam) st.missed += tells.length - found;
    if (!r.correct) { st.wrong++; st.lives--; }
    p.classList.add('open', v === 'burn' ? 'burn' : 'sent');
    p.insertAdjacentHTML('beforeend', `<div class="stamp ${r.correct ? 'good' : 'wrong'}">${v === 'burn' ? 'BURNED' : 'DELIVERED'}</div>`);
    p.querySelectorAll('.tell').forEach(b => b.classList.add(b.classList.contains('mark') ? 'got' : 'miss'));
    p.querySelectorAll('.decoy').forEach(b => b.classList.add('safe'));
    $('#dv').disabled = $('#bn').disabled = $('#hn').disabled = true; $('#hint').hidden = true;
    $('#sc').textContent = 'Score ' + st.score; $('#sk').textContent = 'Streak ' + st.streak;
    if (v === 'burn') A.whoosh();
    if (r.correct) A.chime(); else if (s.scam) jumpscare(); else A.thud();
    if (!r.correct) { A.snuff(); $('#cd').innerHTML = candles(st.lives); $('#cd').setAttribute('aria-label', st.lives + ' candles left'); }
    const over = st.lives <= 0;
    const li = (a, k) => a.map((t, n) => { const m = marked(k, n), tag = k === 'tell' ? (m ? 'spotted' : 'missed') : (m ? 'false alarm, −15' : 'not a red flag');
      return `<li class="${k}${m ? ' on' : ''}"><b>${esc(t.text)}</b>: ${esc(t.why)} <i>(${tag})</i></li>`; }).join('');
    $('#file').innerHTML = `<div class="card"><h2>${r.correct ? 'Correct.' : 'The dead win this one.'} This letter was ${s.scam ? 'a scam' : 'genuine'}. You earned ${r.points}.${over ? ' The last candle is out.' : ''}</h2>
      <ul>${s.scam ? '' : '<li>No red flags here. Real mail can look unusual too.</li>'}${li(tells, 'tell')}${li(decoys, 'decoy')}</ul>
      <button class="btn" id="nx">${over || last ? 'See results' : 'Next letter'}</button></div>`;
    $('#nx').onclick = () => { st.i++; over || last ? end(over) : round(); window.scrollTo(0, 0); };
    $('#nx').focus({ preventScroll: true });
  }

  function end(over) {
    const mx = C.maxScore(st.deck), rank = over ? 'Claimed by the dead' : C.rank(st.score, mx), flawless = !over && st.wrong === 0;
    stats.shifts++; if (flawless) stats.flawless++; if (st.score > best) best = st.score; save();
    const badges = [flawless && 'Flawless shift', !over && st.missed === 0 && 'Eagle eyes', st.fa === 0 && 'Steady hand', st.usedHints === 0 && 'No whispers needed', st.streak >= 5 && 'Hot streak'].filter(Boolean);
    const msg = `I scored ${st.score}/${mx} at Dead Letter Office and earned the rank "${rank}". Can you spot the scams? ${location.href}`;
    main.innerHTML = `<section class="card"><h1>${rank}</h1>
      <p>${over ? 'Your candles went out' : 'Shift complete'}: <b>${st.score}</b> of ${mx} points, ${st.hits} of ${st.deck.length} verdicts correct, ${st.missed} clues missed. Best so far: ${best}.</p>
      <div class="badges">${badges.map(b => `<span class="badge">${b}</span>`).join('') || '<span class="dim">No badges this time. Sweep slower and check every address.</span>'}</div>
      <p class="dim">Scams rely on speed and pressure. Slow down, check the sender and the link, and never share a PIN, code or password.</p>
      <div class="acts"><button class="btn" id="go">Start another shift</button><button class="btn" id="cp">Copy my result</button></div></section>`;
    $('#go').onclick = start;
    $('#cp').onclick = e => { const done = () => e.target.textContent = 'Copied'; (navigator.clipboard ? navigator.clipboard.writeText(msg) : Promise.reject()).then(done, () => { prompt('Copy your result:', msg); }); };
    if (rank === 'Claimed by the dead') A.thud(); else A.chime();
  }

  $('#lt').onclick = e => {
    const on = document.body.classList.toggle('lights'); e.target.setAttribute('aria-pressed', on);
    document.querySelectorAll('.tell,.decoy').forEach(b => b.tabIndex = on ? 0 : -1);
  };
  const sn = $('#sn'), paint = () => { sn.setAttribute('aria-pressed', snd); sn.textContent = snd ? 'Sound on' : 'Sound off'; };
  sn.onclick = () => { snd = !snd; A.set(snd); paint(); save(); }; paint();
  intro();
})();
