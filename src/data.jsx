// ============================================================
//  ДАНІ — Служба авіації та ППО · оперативний склад
//  Демонстраційні дані. Номенклатура наближена до реальної.
// ============================================================
const fmt  = (n) => Math.round(n).toLocaleString("uk-UA").replace(/\u00A0/g, " ").replace(/,/g, " ");
const uah  = (n) => n >= 1000 ? (n/1000).toLocaleString("uk-UA",{maximumFractionDigits:0}) + "k" : String(n);
const uahF = (n) => fmt(n) + " ₴";

// ---------- 1. БОЄГОТОВНІСТЬ (зведено) ----------
const READINESS = 91;

// ---------- 2. FPV за ДОВЖИНОЮ ОПТОВОЛОКНА (ОВ) ----------
//  rdy = на складі готові · iss = видано · rep = ремонт/ТО
const FIBER = [
  { len: "5 км",  label: "ОВ 5 км",  rdy: 612, iss: 188, rep: 41, note: "штурмові, ближній радіус" },
  { len: "10 км", label: "ОВ 10 км", rdy: 740, iss: 264, rep: 58, note: "основний робочий тип" },
  { len: "15 км", label: "ОВ 15 км", rdy: 268, iss: 142, rep: 33, note: "глибина / логістика пр-ка" },
  { len: "20 км", label: "ОВ 20 км", rdy: 96,  iss: 58,  rep: 19, note: "дальній рубіж" },
  { len: "Радіо", label: "Радіоканал", rdy: 410, iss: 196, rep: 64, note: "FPV без оптоволокна" },
];
const fiberTot = FIBER.reduce((a,f)=>({rdy:a.rdy+f.rdy,iss:a.iss+f.iss,rep:a.rep+f.rep}),{rdy:0,iss:0,rep:0});

// ---------- 3. ПЛАТФОРМИ (іменна номенклатура) ----------
//  tier: 1 = розвідувальні мультиротори · 2 = FPV/ударні · price у ₴
const PLATFORMS = [
  // ---- Tier 1 — розвідка / мультиротори ----
  { t:1, fam:"DJI Mavic 3T (тепловізор)",   code:"M3T",   qty:312, rdy:214, iss:78,  rep:20, price:211000, unit:"шт" },
  { t:1, fam:"DJI Mavic 3 Pro",             code:"M3P",   qty:148, rdy:104, iss:36,  rep:8,  price:80000,  unit:"шт" },
  { t:1, fam:"DJI Mavic 3E Enterprise",     code:"M3E",   qty:121, rdy:80,  iss:33,  rep:8,  price:165000, unit:"шт" },
  { t:1, fam:"DJI Matrice 4T / 4E",         code:"M4T",   qty:54,  rdy:33,  iss:16,  rep:5,  price:162000, unit:"шт" },
  { t:1, fam:"Autel EVO MAX 4T / 4N",       code:"EVO",   qty:47,  rdy:28,  iss:14,  rep:5,  price:197000, unit:"шт" },
  // ---- Tier 2 — FPV / ударні / розвідка ----
  { t:2, fam:"Shrike 10 / 10T",             code:"SHR",   qty:2310,rdy:1640,iss:560, rep:110,price:29000,  unit:"шт" },
  { t:2, fam:"Vyriy Opto 10 / Pro 10",      code:"VYR",   qty:2180,rdy:1520,iss:560, rep:100,price:32000,  unit:"шт" },
  { t:2, fam:"Blink 8 / 10 dualband",       code:"BLK",   qty:1905,rdy:1360,iss:470, rep:75, price:23000,  unit:"шт" },
  { t:2, fam:"Колібрі 7\" / 10\"",           code:"KLB",   qty:884, rdy:602, iss:236, rep:46, price:29000,  unit:"шт" },
  { t:2, fam:"Вампір (важкий бомбер)",      code:"VMP",   qty:38,  rdy:22,  iss:13,  rep:3,  price:400000, unit:"шт" },
  { t:2, fam:"Сталкер XO-10 / Молфар",      code:"STK",   qty:126, rdy:84,  iss:34,  rep:8,  price:96000,  unit:"шт" },
  { t:2, fam:"Магура UA / F10 / Ронні-13",  code:"MAG",   qty:74,  rdy:48,  iss:21,  rep:5,  price:120000, unit:"шт" },
];
const platTot = PLATFORMS.reduce((a,p)=>a+p.qty,0);
const platValue = PLATFORMS.reduce((a,p)=>a+p.qty*p.price,0);
const fleetTotals = { rdy:fiberTot.rdy, iss:fiberTot.iss, rep:fiberTot.rep };
const fleetTotal  = fiberTot.rdy + fiberTot.iss + fiberTot.rep;

// ---------- 4. НОМЕНКЛАТУРА / ВИТРАТНІ (Tier 3) ----------
const ACCESSORIES = [
  { nm:"Антена-підсилювач ROC-4 / ROC-6", code:"ROC",  qty:38,  min:60,  max:200, price:44000, unit:"шт" },
  { nm:"Коакс. кабель WL-400 (20/30 м)",  code:"WL4",  qty:84,  min:70,  max:260, price:11500, unit:"кт" },
  { nm:"Щогла телескоп. Avenger 10–12 м", code:"MAST", qty:22,  min:30,  max:90,  price:13000, unit:"шт" },
  { nm:"Акумулятор DJI Mavic 3",          code:"BAT-M",qty:196, min:300, max:900, price:1700,  unit:"шт" },
  { nm:"Акумулятор FPV 6S 1300mAh",       code:"BAT-6",qty:1480,min:1200,max:4000,price:900,   unit:"шт" },
  { nm:"Пропелер Mavic 3E (пара)",        code:"PRP-M",qty:540, min:400, max:1200,price:1200,  unit:"пар" },
  { nm:"Плати ініціації",                 code:"INIT", qty:2240,min:1500,max:6000,price:450,   unit:"шт" },
  { nm:"Тепловізійна камера FPV",         code:"CAM-T",qty:41,  min:80,  max:240, price:18000, unit:"шт" },
];
const accStatus = (s) => s.qty < s.min*0.5 ? "crit" : s.qty < s.min ? "warn" : "ok";
const lowStock  = ACCESSORIES.filter(s => s.qty < s.min);
const lowStockCount = lowStock.length;

// ---------- 5. ПІДРОЗДІЛИ-ОТРИМУВАЧІ ----------
const UNITS = [
  { u:"1 МБ РБпАК",  full:"1-й мех. батальйон · рота БпАК",      holds:"96× Vyriy Opto, 12× Mavic 3T",  cnt:214, when:"2 год тому",   status:"active" },
  { u:"ББС 1Р",      full:"батарея безпілотних систем · 1 рота", holds:"140× Shrike 10, 8× Вампір",      cnt:188, when:"4 год тому",   status:"active" },
  { u:"САДн 2саб",   full:"самохідний артдивізіон · 2 батарея",  holds:"6× Mavic 3T, коригування",       cnt:64,  when:"сьогодні 09:40",status:"active" },
  { u:"3 МБ РБпАК",  full:"3-й мех. батальйон · рота БпАК",      holds:"60× Blink 10, ROC-6 ×2",         cnt:132, when:"вчора 18:05",   status:"idle" },
  { u:"МПБ РБпАК",   full:"мотопіх. батальйон · рота БпАК",      holds:"48× Колібрі 10\", станція",        cnt:121, when:"вчора 14:22",   status:"idle" },
  { u:"2 МБ РБпАК",  full:"2-й мех. батальйон · рота БпАК",      holds:"80× Vyriy Pro 10, щогла",        cnt:156, when:"вчора 11:10",   status:"idle" },
  { u:"РР",          full:"розвідувальна рота",                  holds:"4× Autel EVO, 1× Matrice 4T",    cnt:38,  when:"08:47",        status:"active" },
];
const activeUnits = UNITS.length;

// ---------- 6. ЗОНИ СКЛАДУ ----------
const ZONES = [
  { id:"A", area:"a", nm:"Стелажі FPV · ОВ",      occ:81, units:2210, flag:"ok",    note:null },
  { id:"B", area:"b", nm:"Зарядна · АКБ",            occ:67, units:1676, flag:"amber", note:"ЗАРЯД" },
  { id:"C", area:"c", nm:"Розвідка DJI / Autel",     occ:44, units:682,  flag:"ok",    note:null },
  { id:"D", area:"d", nm:"Запчастини · витратні",    occ:88, units:3300, flag:"red",   note:"ПОВНО" },
  { id:"E", area:"e", nm:"Антени · щогли · РЕБ",      occ:53, units:288,  flag:"ok",    note:null },
  { id:"F", area:"f", nm:"Видача / прийом",           occ:24, units:120,  flag:"ok",    note:"АКТИВ" },
];

// ---------- 7. ОЧІКУВАНІ ПОСТАВКИ ----------
const INCOMING = [
  { id:"#2210", desc:"Vyriy Opto 10 (оптоволокно 10 км)", qty:"300 шт",  status:"in",   eta:"сьогодні" },
  { id:"#2211", desc:"DJI Mavic 3T",                       qty:"40 шт",   status:"ok",   eta:"04.06" },
  { id:"#2208", desc:"Антена ROC-6",                       qty:"30 шт",   status:"in",   eta:"05.06" },
  { id:"#2207", desc:"Щогла телескопічна Avenger",         qty:"24 шт",   status:"warn", eta:"очікує" },
  { id:"#2205", desc:"Акумулятор DJI Mavic 3",             qty:"400 шт",  status:"done", eta:"отримано" },
  { id:"#2204", desc:"Blink 10 dualband",                  qty:"250 шт",  status:"ok",   eta:"06.06" },
];
const STATUS_LABEL = { in:["В ДОРОЗІ","info"], ok:["ПІДТВ.","ok"], warn:["ПОГОДЖ.","warn"], done:["ОТРИМАНО","ok"] };
const incomingActive = INCOMING.filter(i=>i.status!=="done").length;

// ---------- 8. ЖИВА СТРІЧКА ----------
const LOG_SEED = [
  { g:"issue", t:"ВИДАЧА",  x:'<b>1 МБ РБпАК</b> — видано 96× Vyriy Opto 10 (ОВ 10 км)' },
  { g:"ret",   t:"ПОВЕРН.", x:'<b>РР</b> — повернуто 2× Autel EVO MAX, 1× у ТО' },
  { g:"in",    t:"ПРИЙОМ",  x:'Поставка #2210: <b>+300</b> Vyriy Opto 10 оприбутковано' },
  { g:"rep",   t:"РЕМОНТ",  x:'Shrike #SHR-1180 → діагностика: обрив оптоволокна' },
  { g:"alert", t:"ТРИВОГА", x:'Антена ROC <b>нижче мін. запасу</b> (38 / 60)' },
  { g:"issue", t:"ВИДАЧА",  x:'<b>ББС 1Р</b> — видано 8× Вампір (важкий бомбер)' },
  { g:"ret",   t:"ПОВЕРН.", x:'<b>2 МБ РБпАК</b> — повернуто 12× Blink 10, придатні' },
  { g:"rep",   t:"РЕМОНТ",  x:'Зона D: завершено ТО 14× Mavic 3T — у строю' },
  { g:"in",    t:"ПРИЙОМ",  x:'Заявку <b>#2211</b> підтверджено — 40× Mavic 3T' },
  { g:"issue", t:"ВИДАЧА",  x:'<b>САДн 2саб</b> — видано 6× Mavic 3T для коригування' },
  { g:"alert", t:"ТРИВОГА", x:'Щогла Avenger <b>критичний рівень</b> (22 / 30)' },
  { g:"ret",   t:"ПОВЕРН.", x:'<b>МПБ РБпАК</b> — здано станцію керування #03' },
  { g:"rep",   t:"РЕМОНТ",  x:'Тепловізор FPV — списано 2 шт (вигоряння матриці)' },
  { g:"in",    t:"ПРИЙОМ",  x:'Інвентаризація зони A завершена — норма' },
  { g:"issue", t:"ВИДАЧА",  x:'<b>3 МБ РБпАК</b> — видано 60× Blink 10 dualband' },
];
const INITIAL_LOG = [
  { id:0, time:"10:42", g:"issue", t:"ВИДАЧА",  x:'<b>1 МБ РБпАК</b> — видано 96× Vyriy Opto 10 (ОВ 10 км)' },
  { id:1, time:"10:31", g:"in",    t:"ПРИЙОМ",  x:'Поставка #2210: <b>+300</b> Vyriy Opto 10' },
  { id:2, time:"10:18", g:"alert", t:"ТРИВОГА", x:'Щогла Avenger <b>критичний рівень</b> (22 / 30)' },
  { id:3, time:"09:54", g:"ret",   t:"ПОВЕРН.", x:'<b>РР</b> — повернуто станцію керування #03' },
  { id:4, time:"09:40", g:"issue", t:"ВИДАЧА",  x:'<b>САДн 2саб</b> — видано 6× Mavic 3T' },
  { id:5, time:"09:22", g:"rep",   t:"РЕМОНТ",  x:'Shrike #SHR-1180 → діагностика: обрив оптоволокна' },
  { id:6, time:"08:47", g:"in",    t:"ПРИЙОМ",  x:'Заявку <b>#2211</b> підтверджено — 40× Mavic 3T' },
];

// ---------- ХЕЛПЕРИ КОЛЬОРУ ----------
const TIER_LABEL = { 1:"Розвідка", 2:"FPV / ударні" };

Object.assign(window, {
  fmt, uah, uahF, READINESS,
  FIBER, fiberTot, PLATFORMS, platTot, platValue, TIER_LABEL,
  fleetTotals, fleetTotal,
  ACCESSORIES, accStatus, lowStock, lowStockCount,
  UNITS, activeUnits, ZONES, INCOMING, STATUS_LABEL, incomingActive,
  LOG_SEED, INITIAL_LOG,
});
