const C = require("../core.js");
let fails = 0,
  n = 0;
const ok = (c, m) => {
  n++;
  if (!c) {
    fails++;
    console.error("FAIL:", m);
  }
};
const ids = new Set();
C.SCENARIOS.forEach((s) => {
  ok(!ids.has(s.id), "unique id " + s.id);
  ids.add(s.id);
  const e = C.validate(s);
  ok(e.length === 0, s.id + ": " + e.join("; "));
  ["from", "url", "subj", "body"].forEach(
    (f) =>
      s[f] &&
      C.parse(s[f]).forEach((p) =>
        ok(
          !/\{\{|\}\}|\(\(|\)\)|\|\|/.test(p.text),
          s.id + "." + f + " leaked markup",
        ),
      ),
  );
});
ok(
  C.SCENARIOS.some((s) => s.scam) && C.SCENARIOS.some((s) => !s.scam),
  "deck has scams and genuine letters",
);
ok(
  C.validate({ id: "x", kind: "Email", scam: 1, body: "nothing here" }).length >
    0,
  "validator rejects scam without a tell",
);
ok(
  C.validate({ id: "x", kind: "Email", scam: 0, body: "{{a||b}}" }).length > 0,
  "validator rejects genuine letter with a tell",
);
let seed = 7;
const rnd = (m) => (seed = (seed * 1103515245 + 12345) % 2147483648) % m;
for (let i = 0; i < 2000; i++) {
  const a = {
    scam: rnd(2),
    found: rnd(6),
    falseAlarms: rnd(5),
    streak: rnd(9),
  };
  const good = C.scoreRound({ ...a, verdict: a.scam ? "burn" : "deliver" }),
    bad = C.scoreRound({ ...a, verdict: a.scam ? "deliver" : "burn" });
  ok(good.correct && !bad.correct, "correctness flag");
  ok(
    good.points >= bad.points && bad.points === 0,
    "right verdict never scores less than wrong",
  );
  ok(
    good.points >= 0 && good.points <= 100 + a.found * 25 + 50,
    "points within bounds",
  );
  const more = C.scoreRound({ ...a, found: a.found + 1, verdict: "burn" }),
    less = C.scoreRound({ ...a, verdict: "burn" });
  ok(
    !a.scam || more.points >= less.points,
    "finding more tells never lowers score",
  );
}
const mx = C.maxScore(C.SCENARIOS);
ok(
  C.rank(mx, mx) === "Master Archivist" &&
    C.rank(0, mx) === "Haunted by Phishers",
  "rank bounds",
);
console.log(`${n - fails}/${n} checks passed`);
process.exit(fails ? 1 : 0);
