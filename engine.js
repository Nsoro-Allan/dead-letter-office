(function (g) {
  // Engine: seeded letter generator, rule-based message analyzer and adaptive deck builder.
  const C = typeof module !== "undefined" ? require("./core.js") : g.DLO;
  const CATS = {
    domain: "Lookalike addresses",
    urgency: "Pressure and deadlines",
    secrecy: "Secrecy",
    payment: "Odd payment requests",
    creds: "Requests for secrets",
    greeting: "Generic greetings",
    attach: "Risky attachments",
    prize: "Too-good-to-be-true offers",
  };
  const rng = (a) => () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const shuf = (r, a) => {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const tell = (t, why, cat) => `{{${t}||${why}||${cat}}}`;
  const BRANDS = ["Northwind Bank", "Harbor Mutual", "Lumen Pay", "Orchid Telecom", "Cobalt Cloud", "Maple Mart", "Swift Courier"];
  const NAMES = ["Amara", "Jonas", "Priya", "Mateo", "Lina"];
  const slug = (b) => b.toLowerCase().replace(/[^a-z]/g, "");
  const POOL = {
    greeting: [["Dear Valued Customer,", "Real organisations use your name. A generic greeting suggests a mass mailing."], ["Dear customer,", "Mass mailings address nobody in particular."], ["Dear Account Holder,", "A generic title instead of your name is a warning sign."]],
    urgency: [["Verify within 24 hours or your account will be closed.", "Artificial deadlines push you to act before you think."], ["Act within 10 minutes or the funds are lost.", "Panic-sized deadlines are built to stop you checking."], ["Your account will be suspended today unless you respond.", "Threatening to cut you off is a pressure tactic."], ["Final notice: respond immediately.", "Real organisations rarely send “final notices” by message."]],
    creds: [["Reply with your PIN to reverse the charge.", "No genuine provider asks for your PIN by message."], ["Enter your password and card number to confirm.", "A sign-in or confirmation never needs your card number."], ["Confirm your one-time code to continue.", "One-time codes are for you alone. Never hand them to anyone."]],
    secrecy: [["Keep this between us until I confirm.", "Secrecy stops you checking with anyone else."], ["Don’t tell anyone, it is a surprise for the team.", "Asking you to stay quiet is a classic isolation tactic."]],
    prize: [["Congratulations! You have won 2,500,000.", "You can’t win a prize in a contest you never entered."], ["You have won a brand new phone.", "Unexpected prizes are bait."]],
  };
  const PAY = {
    fee: [["Pay a small 1.99 redelivery fee to release it.", "Tiny fees are bait to capture your card details."], ["Pay a 150 processing fee first.", "Real prizes and parcels never make you pay to collect them."]],
    gift: [["Buy 5 gift cards of 100 each and send me the codes.", "Gift cards are untraceable, which is why scammers love them."]],
    crypto: [["Send the deposit in bitcoin today.", "Crypto payments cannot be reversed. Real firms don’t demand them."], ["Pay the deposit by wire transfer to hold your place.", "Pressure to wire money fast is a scam signature."]],
  };
  const FILES = ["Invoice_2291.pdf.exe", "Receipt_0831.docx.scr", "Statement_Q3.zip.js"];
  function lookalike(r, brand) {
    const s = slug(brand), real = s + ".example", j = s.slice(1).search(/[ol]/) + 1;
    if (j > 0 && r() < 0.5) {
      const bad = s.slice(0, j) + (s[j] === "o" ? "0" : "1") + s.slice(j + 1) + ".example";
      return { bad, why: `The real address is ${real}. This one swaps a letter for a digit.` };
    }
    const w = pick(r, ["secure", "verify", "login", "support", "account"]);
    return { bad: `${s}-${w}.example`, why: `The real address is ${real}. Extra words like “${w}” are a classic spoof.` };
  }
  const PAT = [
    { kind: "Email", subj: (b) => `Action required: ${b} account`, intro: (b) => `We noticed a problem with your ${b} account.`, sep: "\n\n", slots: ["from", "greeting", "urgency", "link", "creds"] },
    { kind: "SMS", intro: (b) => `${b}: your parcel is on hold.`, sep: " ", pay: "fee", slots: ["payment", "link", "urgency"] },
    { kind: "Email", from: "Mark Hale <mark.hale@freemail.example>", subj: () => "Quick favour", intro: () => "Are you at your desk? I am stuck in meetings and cannot take calls.", sep: "\n\n", pay: "gift", slots: ["payment", "secrecy", "urgency"] },
    { kind: "Email", from: "Prize Desk <claims@prize-desk.example>", subj: () => "You won!", intro: () => "", sep: "\n\n", pay: "fee", slots: ["prize", "payment", "link"] },
    { kind: "Web page", subj: () => "Sign in to continue", intro: (b) => `Your ${b} mailbox is almost full.`, sep: "\n\n", slots: ["url", "urgency", "creds"] },
    { kind: "SMS", intro: () => "Hi! Remote job, 300 a day, no experience.", sep: " ", pay: "crypto", slots: ["payment", "link", "secrecy"] },
    { kind: "Email", from: "Accounts <billing@desk.example>", subj: () => "Unpaid invoice", intro: () => "Please find the unpaid invoice attached.", sep: "\n\n", slots: ["greeting", "attach", "urgency"] },
  ];
  const catOf = (s) => (["from", "link", "url"].includes(s) ? "domain" : s);
  function genScam(r, o = {}) {
    const p = pick(r, PAT), b = pick(r, BRANDS), n = pick(r, NAMES), L = lookalike(r, b);
    const k = o.diff === "easy" ? p.slots.length : o.diff === "hard" ? 1 : Math.min(p.slots.length, 2 + (r() < 0.5 ? 1 : 0));
    const left = [...p.slots], act = new Set(), wt = (s) => { const w = o.weights && o.weights[catOf(s)]; return w == null ? 1 : w; };
    while (act.size < k) {
      let x = r() * left.reduce((a, s) => a + wt(s), 0), i = 0;
      for (; i < left.length - 1; i++) { x -= wt(left[i]); if (x <= 0) break; }
      act.add(left.splice(i, 1)[0]);
    }
    const body = [], addr = tell(`http://${L.bad}/verify`, L.why, "domain");
    p.slots.forEach((s) => {
      if (s === "from" || s === "url") return;
      if (!act.has(s)) { if (s === "greeting") body.push(`Hi ${n},`); return; }
      if (s === "link") body.push(`Verify now: ${addr}`);
      else if (s === "attach") body.push(`Open it today: ${tell(pick(r, FILES), "A double extension hides that this is a program, not a document.", "attach")}`);
      else { const [t, why] = pick(r, s === "payment" ? PAY[p.pay] : POOL[s]); body.push(tell(t, why, s)); }
    });
    if (p.intro(b)) body.splice(p.slots[0] === "greeting" ? 1 : 0, 0, p.intro(b));
    const sc = { id: "g" + Math.floor(r() * 1e9), kind: p.kind, scam: 1, gen: 1, subj: p.subj ? p.subj(b) : undefined, body: body.join(p.sep) };
    if (p.kind === "Email") sc.from = p.from || `${b} <${act.has("from") ? tell("alerts@" + L.bad, L.why, "domain") : "alerts@" + slug(b) + ".example"}>`;
    else if (p.kind === "SMS") sc.from = b.split(" ")[0];
    if (p.kind === "Web page") sc.url = act.has("url") ? tell(`https://${L.bad}/signin`, L.why, "domain") : `https://${slug(b)}.example/signin`;
    return sc;
  }
  function genLegit(r) {
    const b = pick(r, BRANDS), n = pick(r, NAMES), no = 10000 + Math.floor(r() * 89999), code = `${100 + Math.floor(r() * 899)} ${100 + Math.floor(r() * 899)}`, d = slug(b) + ".example";
    return pick(r, [
      () => ({ kind: "Email", from: `${b} <orders@${d}>`, subj: `Your order #${no} has shipped`, body: `Hi ${n},\n\nYour order #${no} shipped today and should arrive on Friday.\n\n((Track it at track.swiftcourier.example/${no}||Couriers use their own tracking sites. You don’t need to click it for the parcel to arrive.))` }),
      () => ({ kind: "SMS", from: `((${slug(b).slice(0, 6).toUpperCase()}||Banks and shops often text codes from a short branded sender ID.))`, body: `Your ${b} code is ${code}. Do not share it with anyone, including our staff.` }),
      () => ({ kind: "Email", from: `${b} <statements@${d}>`, subj: "Your statement is ready", body: `Hi ${n},\n\nYour statement is now available.\n\n((Open the app or type our address yourself. We never put links in statement emails.||A careful sender keeps you away from clickable links.))` }),
      () => ({ kind: "Email", from: `${b} <alerts@${d}>`, subj: "Your password reset code", body: `Hi ${n},\n\nYou asked to reset your password a minute ago. Your code is ${code}. ((It expires in 15 minutes.||A short expiry is normal when you just requested the code yourself.))\n\nIf this wasn’t you, ignore this message. We will never ask you to share this code.` }),
    ])();
  }
  const mkLegit = (r) => Object.assign({ id: "g" + Math.floor(r() * 1e9), scam: 0, gen: 1 }, genLegit(r));
  function buildDeck(o = {}) {
    const r = rng(o.seed != null ? o.seed : (Math.random() * 2 ** 31) | 0), S = C.SCENARIOS;
    const cs = shuf(r, S.filter((s) => s.scam)), cl = shuf(r, S.filter((s) => !s.scam));
    const deck = [];
    for (let i = 0; i < 5; i++) deck.push(r() < 0.3 ? cs[i] : genScam(r, o));
    for (let i = 0; i < 3; i++) deck.push(r() < 0.4 ? cl[i] : mkLegit(r));
    return shuf(r, deck);
  }
  const RULES = [
    [/\b(?:bit\.ly|tinyurl\.com|cutt\.ly|is\.gd|t\.ly|rb\.gy)\/\S+/gi, "domain", "Shortened links hide the real destination."],
    [/\bhttps?:\/\/\d{1,3}(?:\.\d{1,3}){3}\S*/gi, "domain", "A link to a bare number address instead of a real site name."],
    [/\b[a-z0-9-]*(?:[a-z][01]{1,2}[a-z]|-(?:secure|verify|login|signin|support|account|update|billing|unlock|alert)s?)[a-z0-9-]*(?:\.[a-z0-9-]+)+(?:\/\S*)?/gi, "domain", "Lookalike address: digits swapped for letters, or extra “secure” words. Check the real domain yourself."],
    [/\bwithin +\d+ *(?:minutes?|hours?)\b[^.!?\n]*|\bfinal +(?:notice|warning)\b[^.!?\n]*|\baccount +(?:will +be +)?(?:closed|suspended|deleted|locked)\b[^.!?\n]*|\b(?:act now|immediately|urgent(?:ly)?)\b[^.!?\n]*/gi, "urgency", "Pressure and deadlines are built to stop you checking."],
    [/\bdear +(?:valued +)?(?:customer|user|client|member|account holder)\b,?/gi, "greeting", "A generic greeting suggests a mass mailing."],
    [/\b(?:gift +cards?|wire +transfer|bitcoin|crypto(?:currency)?|western +union|(?:redelivery|processing|registration|release|customs) +fee)\b[^.!?\n]*/gi, "payment", "Unusual or untraceable payment methods and surprise fees are scam signatures."],
    [/\b(?:reply with|send|enter|confirm|provide|verify) +(?:us +|me +)?(?:your|the) +(?:pin|password|passcode|one[- ]time +(?:code|password)|otp|card +number|cvv|login +details)\b[^.!?\n]*/gi, "creds", "Genuine organisations never ask you to hand over PINs, passwords or codes."],
    [/\b(?:keep +this +(?:between +us|confidential|secret)|(?:don[’']t|do +not) +tell +anyone)\b[^.!?\n]*/gi, "secrecy", "Secrecy stops you checking with anyone else."],
    [/\b(?:congratulations|you(?:[’']ve| +have)? +won)\b[^.!?\n]*/gi, "prize", "Unexpected prizes are bait."],
    [/\b[\w-]+\.(?:pdf|docx?|xlsx?|zip)\.(?:exe|js|scr|bat|vbs)\b|\b[\w-]+\.(?:exe|scr|bat|vbs)\b/gi, "attach", "A program file or double extension is not a document."],
  ];
  function analyze(text) {
    const t = String(text).replace(/\{\{|\}\}|\(\(|\)\)|\|\|/g, " ").slice(0, 6000), hits = [];
    RULES.forEach(([re, cat, why]) => {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(t))) {
        const x = m[0].replace(/\s+$/, "");
        if (x.length > 2) hits.push({ s: m.index, e: m.index + x.length, cat, why });
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    });
    hits.sort((a, b) => a.s - b.s || b.e - a.e);
    const flags = [];
    let end = 0, md = "";
    hits.forEach((h) => {
      if (h.s < end) return;
      const text = t.slice(h.s, h.e);
      md += t.slice(end, h.s) + tell(text, h.why, h.cat);
      flags.push({ text, why: h.why, cat: h.cat });
      end = h.e;
    });
    return { markup: md + t.slice(end), flags, level: flags.length === 0 ? "none" : flags.length === 1 ? "one" : "several" };
  }
  const api = { CATS, rng, genScam, genLegit: mkLegit, buildDeck, analyze };
  if (typeof module !== "undefined") module.exports = api;
  else Object.assign(g.DLO, api);
})(typeof window !== "undefined" ? window : globalThis);
