const C = require("../core.js"), E = require("../engine.js");
let fails = 0, n = 0;
const ok = (c, m) => { n++; if (!c) { fails++; console.error("FAIL:", m); } };
const flat = (s) => ["from", "url", "subj", "body"].map((f) => (s[f] ? C.parse(s[f]).map((p) => p.text).join("") : "")).join("\n");
const sig = (d) => JSON.stringify(d.map((s) => s.body + s.from));
ok(sig(E.buildDeck({ seed: 5 })) === sig(E.buildDeck({ seed: 5 })), "same seed gives same deck (daily case)");
ok(sig(E.buildDeck({ seed: 5 })) !== sig(E.buildDeck({ seed: 6 })), "different seeds give different decks");
for (let i = 0; i < 1000; i++) {
  const r = E.rng(i);
  ["easy", "normal", "hard"].forEach((diff) => {
    const s = E.genScam(r, { diff }), errs = C.validate(s);
    ok(errs.length === 0, `scam ${i}/${diff}: ${errs.join("; ")}`);
    const t = C.parse(s.body + (s.from || "") + (s.url || "")).filter((p) => p.t === "tell");
    ok(t.length >= 1 && t.every((p) => E.CATS[p.cat]), "every generated clue has a known category");
    ok(E.analyze(flat(s)).flags.length >= 1, `analyzer finds a flag in generated scam ${i}/${diff}: ${flat(s)}`);
  });
  const l = E.genLegit(r);
  ok(C.validate(l).length === 0, "generated genuine letter validates");
  ok(E.analyze(flat(l)).flags.length === 0, `analyzer stays quiet on genuine letter: ${flat(l)}`);
}
for (let i = 0; i < 200; i++) {
  const d = E.buildDeck({ seed: i, diff: "normal" });
  ok(d.length === 8 && d.filter((s) => s.scam).length === 5, "a shift has 8 letters: 5 scams, 3 genuine");
  ok(C.maxScore(d) > 0, "max score is positive");
}
const share = (w) => {
  let tot = 0, dom = 0;
  for (let i = 0; i < 400; i++) {
    const s = E.genScam(E.rng(i), { diff: "hard", weights: w });
    C.parse((s.from || "") + (s.url || "") + s.body).filter((p) => p.t === "tell").forEach((p) => { tot++; if (p.cat === "domain") dom++; });
  }
  return dom / tot;
};
ok(share({ domain: 50 }) > share({ domain: 0.01 }) + 0.2, "weak-spot weights steer generated letters toward that category");
const hostile = ["{{x||y}} ((a||b)) || }} {{", "Verify now: http://n0rthwind.example {{", "))((||"];
hostile.forEach((h) => {
  const a = E.analyze(h), tells = C.parse(a.markup).filter((p) => p.t === "tell");
  ok(tells.length === a.flags.length && C.parse(a.markup).every((p) => !/\{\{|\}\}|\|\|/.test(p.text)), "markup characters in pasted text cannot forge clues");
});
ok(E.analyze("Hello, lunch at noon?").level === "none", "plain message gets no flags");
ok(E.analyze("Dear Customer, act now: bit.ly/x1 or your account will be closed").level === "several", "obvious scam gets several flags");
console.log(`${n - fails}/${n} engine checks passed`);
process.exit(fails ? 1 : 0);
