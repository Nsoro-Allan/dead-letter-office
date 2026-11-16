(function (g) {
  // Markup: {{text||why}} = real red flag, ((text||why)) = decoy (looks odd, is fine)
  const R = /(\{\{|\(\()(.+?)\|\|(.+?)(\}\}|\)\))/g;
  const FIELDS = ["from", "url", "subj", "body"];
  const S = [
    {
      id: "bank",
      kind: "Email",
      scam: 1,
      from: "Northwind Bank <{{security@northwind-bank.support||The real bank writes from its own domain. A lookalike name with a different ending is a classic spoof.}}>",
      subj: "Action required: account locked",
      body: "{{Dear Valued Customer,||Real banks use your name. A generic greeting suggests a mass mailing.}}\n\nWe detected unusual activity. {{Verify within 24 hours or your account will be closed.||Artificial deadlines push you to act before you think.}}\n\nVerify now: {{http://northwind-secure-login.co/verify||The link points to a lookalike domain, not the bank’s own site.}}",
    },
    {
      id: "parcel",
      kind: "Email",
      scam: 0,
      from: "Parcel Hub <orders@parcelhub.example>",
      subj: "Your order #48213 has shipped",
      body: "Hi Amara,\n\nGood news: your order #48213 shipped today and should arrive on Friday.\n\n((Track it at track.swiftcourier.example/48213||Couriers do use their own tracking sites, and this one matches the courier named in your order. You also don’t need to click it for the parcel to arrive.))\n\nYou can manage orders any time from your account page.",
    },
    {
      id: "momo",
      kind: "SMS",
      scam: 1,
      from: "{{+44 7700 900123||An ordinary personal number claiming to be your mobile-money provider. Providers text from a named sender ID.}}",
      body: "MobiPay: Your wallet has been suspended. {{Reply with your PIN now||No genuine provider ever asks for your PIN by message.}} to reverse a charge of 48,000. {{Act within 10 minutes||Panic-sized deadlines are built to stop you checking.}} or the funds are lost. Details: {{bit.ly/mp-unlock7||Shortened links hide the real destination.}}",
    },
    {
      id: "login",
      kind: "Web page",
      scam: 1,
      url: "{{https://accounts.g00gle-signin.com/verify||Look closely: two zeros replace the o’s. The real address belongs to a different domain entirely.}}",
      subj: "Sign in to continue",
      body: "Your mailbox is almost full. {{Sign in again within 30 minutes or your account will be deleted.||Threats of deletion create panic. Real services don’t demand an instant sign-in.}}\n\nEmail:    ____________\nPassword: ____________\n{{Card number (to confirm you own the account): ____________||A sign-in page never needs your card number.}}",
    },
    {
      id: "ceo",
      kind: "Email",
      scam: 1,
      from: "{{Mark Hale <mark.hale.ceo@freemail.example>||An executive writing from a free personal address instead of the company domain is a warning sign.}}",
      subj: "Quick favour",
      body: "Are you at your desk? I am stuck in meetings and cannot take calls. I need {{5 gift cards of 100 each, today||Gift cards are untraceable, which is why scammers love them. Real bosses don’t ask for them.}}. {{Keep this between us until I confirm.||Secrecy stops you checking with anyone else.}} I will reimburse you tonight.\n\nMark",
    },
    {
      id: "reset",
      kind: "Email",
      scam: 0,
      from: "Northwind Bank <alerts@northwind.example>",
      subj: "Your password reset code",
      body: "Hi Amara,\n\nYou asked to reset your password a minute ago. Your code is 305 118. ((It expires in 15 minutes.||A short expiry is normal when you just requested the code yourself. Urgency is only a red flag when it arrives out of nowhere.))\n\nIf this wasn’t you, ignore this message and your password stays the same. We will never ask you to share this code.",
    },
    {
      id: "invoice",
      kind: "Email",
      scam: 1,
      from: "Accounts <{{billing@invoices-desk.example||You have no account with this company. Unsolicited invoices are a common lure.}}>",
      subj: "Unpaid invoice",
      body: "{{Hello,||No name and no company details. Generic openings suit mass mailing.}}\n\nPlease find the unpaid invoice attached. Open it today: {{Invoice_2291.pdf.exe||A double extension hides that this is a program, not a document.}}\n\nRegards,\nAccounts",
    },
    {
      id: "otp",
      kind: "SMS",
      scam: 0,
      from: "((NWBANK||Banks commonly text one-time codes from a short branded sender ID instead of a normal phone number.))",
      body: "Your Northwind code is 482 913. Do not share it with anyone, including our staff.",
    },
    {
      id: "lottery",
      kind: "Email",
      scam: 1,
      from: "Global Lottery Board <claims@glb-winners.example>",
      subj: "You won 2,500,000!",
      body: "{{Congratulations!||You can’t win a lottery you never entered.}} Your address was drawn at random. To release the prize, {{pay a 150 processing fee first||Real prizes never make you pay to collect them.}}.\n\nReply today to {{claims@glb-winners.example||A generic claims inbox, not an official body.}}.",
    },
    {
      id: "tech",
      kind: "Web page",
      scam: 1,
      url: "{{http://windows-alert-support.example/virus||Your computer’s maker never hosts warnings on random domains.}}",
      subj: "WARNING: 7 viruses found",
      body: "{{Call 0800 555 0199 immediately.||Browsers and operating systems never ask you to phone a number.}} Do not close this window.\n{{Your files will be deleted in 05:00||A fake countdown is pure pressure.}}",
    },
    {
      id: "job",
      kind: "SMS",
      scam: 1,
      from: "{{+1 555 0188||A recruiter texting out of the blue from a random personal number.}}",
      body: "Hi! Remote job, 300 a day, no experience. {{Send 80 for your equipment kit and we start today.||Real employers never charge you to start work.}} Chat with us on {{t.me/jobs-fast-77||Moving you to a private chat app removes the platform’s protections.}}",
    },
    {
      id: "redeliver",
      kind: "SMS",
      scam: 1,
      from: "SwiftCourier",
      body: "We missed you. {{Pay a 1.99 redelivery fee||Tiny fees are bait to capture your card details.}} at {{swiftcourier-redeliver.example/pay||The real courier uses its own domain. This is a lookalike.}} or your parcel is returned.",
    },
    {
      id: "invest",
      kind: "Email",
      scam: 1,
      from: "Alex Reed <alex@wealth-circle.example>",
      subj: "Guaranteed 300% in 30 days",
      body: "Hi friend,\n\nI turned 500 into 15,000 in a month. {{Guaranteed returns of 300%||No genuine investment can guarantee returns, let alone that much.}}\n\n{{Only 3 spots left, send crypto today.||Scarcity plus crypto payment is a classic pressure and untraceability combo.}}",
    },
    {
      id: "statement",
      kind: "Email",
      scam: 0,
      from: "Northwind Bank <statements@northwind.example>",
      subj: "Your October statement is ready",
      body: "Hi Amara,\n\nYour statement is now available.\n\n((Open the Northwind app or type our address yourself. We never put links in statement emails.||This is what a careful bank does: it keeps you away from clickable links.))\n\nQuestions? Call the number on the back of your card.",
    },
  ];
  function parse(s) {
    const out = [],
      re = new RegExp(R.source, "g");
    let i = 0,
      m;
    while ((m = re.exec(s))) {
      if (m.index > i) out.push({ t: "text", text: s.slice(i, m.index) });
      out.push({ t: m[1] === "{{" ? "tell" : "decoy", text: m[2], why: m[3] });
      i = re.lastIndex;
    }
    if (i < s.length) out.push({ t: "text", text: s.slice(i) });
    return out;
  }
  const count = (s, t) =>
    FIELDS.reduce(
      (n, f) => n + (s[f] ? parse(s[f]).filter((p) => p.t === t).length : 0),
      0,
    );
  const tellCount = (s) => count(s, "tell");
  function validate(s) {
    const e = [];
    if (!s.id || !s.kind || !s.body) e.push("missing id/kind/body");
    if (s.scam && tellCount(s) < 1) e.push("scam needs at least one tell");
    if (!s.scam && tellCount(s) > 0)
      e.push("genuine letter must have no tells");
    FIELDS.forEach((f) => {
      if (s[f]) {
        const raw = s[f];
        if (
          (raw.match(/\{\{/g) || []).length !==
          (raw.match(/\}\}/g) || []).length
        )
          e.push(f + ": unbalanced {{ }}");
        if (
          (raw.match(/\(\(/g) || []).length !==
          (raw.match(/\)\)/g) || []).length
        )
          e.push(f + ": unbalanced (( ))");
        parse(raw).forEach((p) => {
          if (p.t !== "text" && (!p.why.trim() || !p.text.trim()))
            e.push(f + ": empty text or explanation");
        });
      }
    });
    return e;
  }
  function scoreRound({ scam, verdict, found, falseAlarms, streak }) {
    const correct = (verdict === "burn") === !!scam;
    let p = correct
      ? 100 + (scam ? found * 25 : 0) + Math.min(streak + 1, 5) * 10
      : 0;
    return { correct, points: Math.max(0, p - falseAlarms * 15) };
  }
  function maxScore(deck) {
    let st = 0,
      sum = 0;
    deck.forEach((s) => {
      st++;
      sum += 100 + (s.scam ? tellCount(s) * 25 : 0) + Math.min(st, 5) * 10;
    });
    return sum;
  }
  function rank(score, max) {
    const r = score / max;
    return r >= 0.9
      ? "Master Archivist"
      : r >= 0.7
        ? "Night Sorter"
        : r >= 0.4
          ? "Apprentice Clerk"
          : "Haunted by Phishers";
  }
  const api = {
    SCENARIOS: S,
    parse,
    validate,
    tellCount,
    scoreRound,
    maxScore,
    rank,
  };
  if (typeof module !== "undefined") module.exports = api;
  else g.DLO = api;
})(typeof window !== "undefined" ? window : globalThis);
