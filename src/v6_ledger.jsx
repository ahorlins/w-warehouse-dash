// ============================================================
//  ВАРІАНТ 6 — ЖУРНАЛ РУХУ МАЙНА (добовий обліковий реєстр)
//  Цифрова еволюція щоденної Excel-довідки командира.
//  Ті самі звичні графи — Наявність · Отримано · Видано · Залишок —
//  але читабельно, з підсумками та візуалізацією руху за добу.
// ============================================================
const VLG_CSS = `
.v-lg{--green:oklch(0.82 0.16 152);--green-d:oklch(0.64 0.14 152);--amber:oklch(0.83 0.15 80);--amber-d:oklch(0.66 0.13 80);
  --red:oklch(0.68 0.20 26);--cy:oklch(0.82 0.10 205);
  --ink:#d2ddd4;--ink2:#aebcb0;--dim:#7e8e83;--faint:#566359;
  --line:rgba(120,165,135,0.13);--line2:rgba(132,180,148,0.24);--rule:rgba(120,165,135,0.07);
  --bg:#090d0b;--panel:#0d1310;--panel2:#0f1612;--head:#0a0f0c;
  background:var(--bg);color:var(--ink);font-family:var(--sans);position:relative;min-height:100vh;padding:0}
.v-lg .wrap{max-width:1640px;margin:0 auto;padding:24px 30px 60px}

/* ---- шапка документа ---- */
.v-lg .dochead{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;
  border-bottom:1px solid var(--line2);padding-bottom:18px;margin-bottom:22px}
.v-lg .dochead .cls{font-family:var(--mono);font-size:9.5px;letter-spacing:.26em;color:var(--green-d);text-transform:uppercase;margin-bottom:9px}
.v-lg .dochead h1{font-family:var(--serif);font-weight:600;font-size:30px;line-height:1.06;color:#eaf3ec;letter-spacing:-.01em}
.v-lg .dochead .sub{font-size:12.5px;color:var(--ink2);margin-top:8px}
.v-lg .dochead .sub b{color:#cfe0d3;font-weight:600}
.v-lg .dochead .meta{flex:none;text-align:right;font-family:var(--mono);font-size:10px;letter-spacing:.06em;color:var(--dim);line-height:1.95}
.v-lg .dochead .meta b{color:var(--green)}
.v-lg .dochead .meta .clk{font-family:var(--disp);font-size:22px;font-weight:600;color:#eaf3ec;letter-spacing:.04em}

/* ---- РІВНЯННЯ РУХУ за добу ---- */
.v-lg .equation{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1.06fr;gap:0;align-items:stretch;
  border:1px solid var(--line2);background:linear-gradient(180deg,var(--panel2),var(--panel));margin-bottom:24px}
.v-lg .eq{padding:18px 22px;position:relative}
.v-lg .eq .el{font-family:var(--mono);font-size:9.5px;letter-spacing:.15em;color:var(--dim);text-transform:uppercase}
.v-lg .eq .en{font-family:var(--disp);font-weight:600;font-size:42px;line-height:.95;color:#eef5ef;margin-top:9px;letter-spacing:.01em;font-variant-numeric:tabular-nums}
.v-lg .eq .ef{font-family:var(--mono);font-size:10px;color:var(--faint);margin-top:8px;letter-spacing:.03em}
.v-lg .eq.rec .en{color:var(--green)}.v-lg .eq.iss .en{color:var(--amber)}
.v-lg .eq.rec{background:rgba(74,222,128,0.04)}.v-lg .eq.iss{background:rgba(245,200,90,0.035)}
.v-lg .eq.close{background:rgba(120,165,135,0.05)}
.v-lg .eq.close::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--green)}
.v-lg .op{display:flex;align-items:center;justify-content:center;width:52px;font-family:var(--disp);font-weight:300;
  font-size:34px;color:var(--faint);background:var(--head);border-left:1px solid var(--line);border-right:1px solid var(--line)}
.v-lg .op.plus{color:var(--green-d)}.v-lg .op.minus{color:var(--amber-d)}

/* ---- панель керування ---- */
.v-lg .toolbar{display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.v-lg .tabs{display:flex;border:1px solid var(--line);background:var(--panel)}
.v-lg .tab{font-family:var(--mono);font-size:10px;letter-spacing:.08em;padding:8px 15px;background:transparent;border:0;
  border-right:1px solid var(--line);color:var(--dim);cursor:pointer;text-transform:uppercase;transition:.15s;white-space:nowrap}
.v-lg .tab:last-child{border-right:0}
.v-lg .tab:hover{color:var(--ink2);background:rgba(120,165,135,.05)}
.v-lg .tab.on{color:#0a0f0c;background:var(--green);font-weight:600}
.v-lg .toggle{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:10px;letter-spacing:.06em;
  color:var(--dim);text-transform:uppercase;padding:8px 14px;border:1px solid var(--line);background:var(--panel);cursor:pointer;transition:.15s}
.v-lg .toggle:hover{color:var(--ink2);border-color:var(--line2)}
.v-lg .toggle.on{color:var(--green);border-color:rgba(74,222,128,.4);background:rgba(74,222,128,.06)}
.v-lg .toggle.exp{color:var(--cy);border-color:rgba(120,200,220,.32)}
.v-lg .toggle.exp:hover{color:#cfeef5;border-color:rgba(120,200,220,.6);background:rgba(120,200,220,.06)}
.v-lg .toggle .box{width:11px;height:11px;border:1px solid currentColor;display:inline-flex;align-items:center;justify-content:center;font-size:9px}
.v-lg .tb-right{margin-left:auto;font-family:var(--mono);font-size:10px;letter-spacing:.06em;color:var(--faint)}
.v-lg .tb-right b{color:var(--ink2)}

/* ---- реєстр (таблиця) ---- */
.v-lg .ledger{border:1px solid var(--line2);background:var(--panel);overflow:hidden}
.v-lg table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}
.v-lg thead th{position:sticky;top:0;z-index:5;background:var(--head);
  font-family:var(--mono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);font-weight:400;
  text-align:right;padding:11px 14px;border-bottom:1px solid var(--line2);white-space:nowrap}
.v-lg thead th.l{text-align:left}
.v-lg thead th.c{text-align:center}
.v-lg thead th .u{display:block;font-size:8px;color:var(--faint);letter-spacing:.1em;margin-top:2px}

.v-lg .grp td{background:linear-gradient(90deg,rgba(120,165,135,.07),transparent);
  padding:9px 14px;border-top:1px solid var(--line2);border-bottom:1px solid var(--line)}
.v-lg .grp .gt{display:flex;align-items:center;gap:11px}
.v-lg .grp .gi{font-family:var(--disp);font-weight:600;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#dbe8de}
.v-lg .grp .gc{font-family:var(--mono);font-size:9.5px;color:var(--faint);letter-spacing:.06em}
.v-lg .grp .gspark{margin-left:auto;display:flex;align-items:center;gap:14px;font-family:var(--mono);font-size:10px;color:var(--dim)}
.v-lg .grp .gspark b{font-family:var(--disp);font-weight:600;font-size:14px}
.v-lg .grp .gspark .pg{color:var(--green)}.v-lg .grp .gspark .pa{color:var(--amber)}

.v-lg tbody tr.row td{padding:10px 14px;border-bottom:1px solid var(--rule);text-align:right;font-size:13px}
.v-lg tbody tr.row:hover td{background:rgba(120,165,135,.045)}
.v-lg tbody tr.row.moved td{background:rgba(74,222,128,.018)}
.v-lg tbody tr.row.moved:hover td{background:rgba(74,222,128,.05)}
.v-lg tbody tr.row td.cnum{font-family:var(--mono);color:var(--faint);font-size:10.5px;text-align:right;width:42px}
.v-lg tbody tr.row td.cname{text-align:left}
.v-lg .cname .nm{font-weight:600;font-size:13px;color:#dde8df}
.v-lg .cname .cd{font-family:var(--mono);font-size:9.5px;color:var(--faint);letter-spacing:.04em;margin-top:1px}
.v-lg .open{font-family:var(--mono);font-size:13px;color:var(--ink2)}
.v-lg .rec{font-family:var(--mono);font-size:13px;color:var(--green);font-weight:500}
.v-lg .iss{font-family:var(--mono);font-size:13px;color:var(--amber);font-weight:500}
.v-lg .zero{color:var(--faint);font-weight:400}
.v-lg .close{font-family:var(--disp);font-weight:600;font-size:16px;color:#eef5ef}
.v-lg .delta{font-family:var(--mono);font-size:9.5px;letter-spacing:.04em;margin-top:2px;display:block}
.v-lg .delta.up{color:var(--green)}.v-lg .delta.down{color:var(--red)}.v-lg .delta.flat{color:var(--faint)}

/* стовпчик руху: вісь з виносом ліворуч (видано) / праворуч (отримано) */
.v-lg .cmove{width:188px}
.v-lg .mbar{position:relative;height:16px;width:100%}
.v-lg .mbar .axis{position:absolute;left:50%;top:-1px;bottom:-1px;width:1px;background:var(--line2)}
.v-lg .mbar .seg{position:absolute;top:3px;height:10px}
.v-lg .mbar .seg.out{right:50%;background:repeating-linear-gradient(-45deg,var(--amber),var(--amber) 4px,var(--amber-d) 4px,var(--amber-d) 8px)}
.v-lg .mbar .seg.in{left:50%;background:linear-gradient(90deg,var(--green-d),var(--green))}
.v-lg .mbar .seg{transition:width .8s cubic-bezier(.2,.7,.2,1)}

/* підсумок групи */
.v-lg tr.sub td{padding:8px 14px;border-bottom:1px solid var(--line);border-top:1px dashed var(--line2);
  text-align:right;font-family:var(--mono);font-size:11px;color:var(--ink2);background:rgba(10,15,12,.5)}
.v-lg tr.sub .sl{text-align:left;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;font-size:9.5px}
.v-lg tr.sub .pg{color:var(--green)}.v-lg tr.sub .pa{color:var(--amber)}
.v-lg tr.sub .sc{font-family:var(--disp);font-weight:600;font-size:14px;color:#dde8df}

/* підсумковий рядок ВСЬОГО */
.v-lg tfoot td{padding:14px;border-top:2px solid var(--green-d);background:var(--head);
  text-align:right;font-family:var(--disp);font-weight:600;font-size:17px;color:#eef5ef}
.v-lg tfoot .fl{text-align:left;font-family:var(--mono);font-weight:400;font-size:10px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--green);align-self:center}
.v-lg tfoot .pg{color:var(--green)}.v-lg tfoot .pa{color:var(--amber)}

/* нижня примітка */
.v-lg .foot{display:flex;align-items:stretch;gap:14px;margin-top:18px}
.v-lg .note{flex:1;border:1px solid var(--line);border-left:2px solid var(--amber);background:rgba(245,200,90,.04);padding:13px 16px;font-size:12px;line-height:1.5;color:var(--ink2)}
.v-lg .note b{font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;color:var(--amber);text-transform:uppercase}
.v-lg .legend{flex:none;display:flex;flex-direction:column;justify-content:center;gap:8px;border:1px solid var(--line);background:var(--panel);padding:13px 18px}
.v-lg .legend .lk{display:flex;align-items:center;gap:9px;font-family:var(--mono);font-size:10px;color:var(--dim);letter-spacing:.04em}
.v-lg .legend .sw{width:18px;height:9px;flex:none}
.v-lg .sign{margin-top:18px;display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;color:var(--faint);letter-spacing:.04em;border-top:1px solid var(--line);padding-top:13px}

@media(max-width:1120px){.v-lg .dochead{flex-direction:column;align-items:flex-start;gap:12px}.v-lg .dochead .meta{text-align:left}}
@media(max-width:1280px){.v-lg .equation{grid-template-columns:1fr auto 1fr auto 1fr;grid-auto-rows:auto}
  .v-lg .eq.close{grid-column:1/-1;border-top:1px solid var(--line)}.v-lg .cmove{display:none}}
@media(max-width:880px){.v-lg .equation{grid-template-columns:1fr}.v-lg .op{display:none}
  .v-lg .eq{border-bottom:1px solid var(--line)}.v-lg .dochead{flex-direction:column;align-items:flex-start;gap:14px}
  .v-lg .dochead .meta{text-align:left}.v-lg .foot{flex-direction:column}}
`;

// ---- ДАНІ РУХУ ЗА ДОБУ ----
// op = наявність на початок доби · rec = отримано · iss = видано
// залишок = op + rec − iss
const MOVEMENT = [
  { g:"Розвідувальні платформи · DJI / Autel", key:"recon", items:[
    { nm:"Autel EVO MAX 4N",            code:"EVO-4N",  op:116, rec:0,  iss:0  },
    { nm:"Autel EVO MAX 4T",            code:"EVO-4T",  op:79,  rec:0,  iss:8  },
    { nm:"DJI Mavic 3 Enterprise",      code:"M3E",     op:14,  rec:6,  iss:0  },
    { nm:"DJI Mavic 3 Pro",             code:"M3P",     op:11,  rec:0,  iss:0  },
    { nm:"DJI Mavic 4 Pro",             code:"M4P",     op:5,   rec:4,  iss:0  },
    { nm:"DJI Mavic 3 Pro FMC",         code:"M3P-FMC", op:7,   rec:0,  iss:0  },
    { nm:"DJI Mavic 3 Thermal",         code:"M3T",     op:61,  rec:0,  iss:6  },
    { nm:"DJI Mavic 3 Thermal ADVANCE", code:"M3T-A",   op:12,  rec:0,  iss:0  },
    { nm:"DJI Matrice 4T",              code:"M4T",     op:128, rec:0,  iss:9  },
    { nm:"DJI Matrice 4E",              code:"M4E",     op:63,  rec:0,  iss:0  },
    { nm:"DJI Matrice 30T",             code:"M30T",    op:13,  rec:0,  iss:0  },
    { nm:"DJI Matrice 350 HK",          code:"M350-HK", op:8,   rec:0,  iss:0  },
    { nm:"DJI Matrice 350 TK",          code:"M350-TK", op:6,   rec:0,  iss:0  },
  ]},
  { g:"Ударні системи · бомбери", key:"strike", items:[
    { nm:"БпЛА Вампір (важкий бомбер)", code:"VMP-A",   op:13,  rec:0,  iss:7  },
    { nm:"БпАК Вампір (комплекс)",      code:"VMP-K",   op:18,  rec:6,  iss:0  },
    { nm:"БпЛА Немезіс",                code:"NMS",     op:9,   rec:0,  iss:0  },
    { nm:"Сталкер XO-10",               code:"STK",     op:24,  rec:0,  iss:0  },
    { nm:"Молфар",                      code:"MLF",     op:16,  rec:0,  iss:0  },
    { nm:"Магура F10 / Ронні-13",       code:"MAG",     op:22,  rec:0,  iss:4  },
  ]},
  { g:"FPV за довжиною оптоволокна", key:"fpv", items:[
    { nm:"FPV · ОВ 5 км",               code:"OV-5",    op:641, rec:120, iss:188 },
    { nm:"FPV · ОВ 10 км",              code:"OV-10",   op:802, rec:300, iss:264 },
    { nm:"FPV · ОВ 15 км",              code:"OV-15",   op:333, rec:0,   iss:142 },
    { nm:"FPV · ОВ 20 км",              code:"OV-20",   op:117, rec:0,   iss:0   },
    { nm:"FPV · радіоканал",            code:"RF",      op:510, rec:80,  iss:196 },
  ]},
  { g:"Антени · РЕБ · витратні", key:"acc", items:[
    { nm:"Антена-підсилювач ROC-4 / ROC-6", code:"ROC", op:38,   rec:30,  iss:4   },
    { nm:"Щогла телеск. Avenger 10–12 м",   code:"MAST",op:22,   rec:0,   iss:2   },
    { nm:"Станція керування портативна",    code:"GCS", op:14,   rec:0,   iss:0   },
    { nm:"Акумулятор FPV 6S 1300 mAh",      code:"BAT-6",op:1480, rec:600, iss:420 },
  ]},
];

// підрахунки
MOVEMENT.forEach(grp=>{
  grp.items.forEach(it=>{ it.close = it.op + it.rec - it.iss; it.delta = it.rec - it.iss; });
  grp.tOp  = grp.items.reduce((a,i)=>a+i.op,0);
  grp.tRec = grp.items.reduce((a,i)=>a+i.rec,0);
  grp.tIss = grp.items.reduce((a,i)=>a+i.iss,0);
  grp.tClose = grp.items.reduce((a,i)=>a+i.close,0);
});
const MV_TOT = {
  op:    MOVEMENT.reduce((a,g)=>a+g.tOp,0),
  rec:   MOVEMENT.reduce((a,g)=>a+g.tRec,0),
  iss:   MOVEMENT.reduce((a,g)=>a+g.tIss,0),
  close: MOVEMENT.reduce((a,g)=>a+g.tClose,0),
};
const MV_MOVEMAX = Math.max(...MOVEMENT.flatMap(g=>g.items.map(i=>Math.max(i.rec,i.iss))));
const MV_POSITIONS = MOVEMENT.reduce((a,g)=>a+g.items.length,0);
const MV_MOVED = MOVEMENT.reduce((a,g)=>a+g.items.filter(i=>i.rec||i.iss).length,0);

// ---- ЕКСПОРТ CSV (відкривається в Excel; роздільник ; · UTF-8 BOM) ----
function exportMovementCSV(){
  const esc = (v)=>'"'+String(v).replace(/"/g,'""')+'"';
  const rows = [["Майно","Код","Наявність (початок)","Отримано","Видано","Залишок (кінець)"]];
  MOVEMENT.forEach(g=>{
    rows.push([g.g.toUpperCase()]);
    g.items.forEach(it=>rows.push([it.nm,it.code,it.op,it.rec,it.iss,it.close]));
    rows.push(["Підсумок · "+g.g.split("·")[0].trim(),"",g.tOp,g.tRec,g.tIss,g.tClose]);
  });
  rows.push(["УСЬОГО ПО СКЛАДУ","",MV_TOT.op,MV_TOT.rec,MV_TOT.iss,MV_TOT.close]);
  const csv = "\uFEFF" + rows.map(r=>r.map(esc).join(";")).join("\r\n");
  const blob = new Blob([csv],{type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "dovidka_ruh_majna_02-06-2026.csv";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
}
window.exportMovementCSV = exportMovementCSV;

const LG_TABS = [["all","Всі"],["recon","Розвідка"],["strike","Ударні"],["fpv","FPV"],["acc","Витратні"]];

function MoveBar({rec,iss,mounted}){
  const inW = mounted ? (rec/MV_MOVEMAX*50) : 0;
  const outW = mounted ? (iss/MV_MOVEMAX*50) : 0;
  return(<div className="mbar">
    <span className="axis"></span>
    <span className="seg out" style={{width:outW+"%"}}></span>
    <span className="seg in" style={{width:inW+"%"}}></span>
  </div>);
}

function num(n, cls){
  return n===0 ? <span className="zero">—</span> : <span className={cls}>{fmt(n)}</span>;
}

function VLedger(){
  const now = useClock();
  const [tab,setTab] = useState("all");
  const [onlyMoved,setOnlyMoved] = useState(false);
  const [mounted,setMounted] = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setMounted(true),140); return ()=>clearTimeout(t); },[]);

  const groups = MOVEMENT
    .filter(g => tab==="all" || g.key===tab)
    .map(g => ({...g, rows: g.items.filter(i => !onlyMoved || i.rec || i.iss)}))
    .filter(g => g.rows.length);

  const turnover = MV_TOT.rec + MV_TOT.iss;

  return(<div className="v-lg"><style dangerouslySetInnerHTML={{__html:VLG_CSS}}/>
    <div className="wrap">

      <div className="dochead">
        <div>
          <div className="cls">Для службового користування · довідка № 06/07</div>
          <h1>Довідка про наявність та&nbsp;рух майна</h1>
          <div className="sub">Служба авіації та протиповітряної оборони · оперативний склад БпЛА · станом на <b>02.06.2026</b></div>
        </div>
        <div className="meta">
          <div className="clk">{fmtTime(now)}</div>
          {fmtDate(now)}<br/>
          ПОЗИЦІЙ <b>{MV_POSITIONS}</b> · РУХ <b>{MV_MOVED}</b><br/>
          АРКУШ <b>1/1</b> · РЕД. 06
        </div>
      </div>

      {/* РІВНЯННЯ РУХУ ЗА ДОБУ */}
      <div className="equation">
        <div className="eq">
          <div className="el">Наявність · на початок доби</div>
          <div className="en">{fmt(MV_TOT.op)}</div>
          <div className="ef">одиниць станом на 00:00</div>
        </div>
        <div className="op plus">+</div>
        <div className="eq rec">
          <div className="el">Отримано · прихід</div>
          <div className="en">{fmt(MV_TOT.rec)}</div>
          <div className="ef">оприбутковано за добу</div>
        </div>
        <div className="op minus">−</div>
        <div className="eq iss">
          <div className="el">Видано · витрата</div>
          <div className="en">{fmt(MV_TOT.iss)}</div>
          <div className="ef">передано в підрозділи</div>
        </div>
        <div className="op">=</div>
        <div className="eq close">
          <div className="el">Залишок · на кінець доби</div>
          <div className="en">{fmt(MV_TOT.close)}</div>
          <div className="ef">оборот за добу {fmt(turnover)} од.</div>
        </div>
      </div>

      {/* КЕРУВАННЯ */}
      <div className="toolbar">
        <div className="tabs">
          {LG_TABS.map(([k,l])=>(
            <button key={k} className={"tab"+(tab===k?" on":"")} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
        <button className={"toggle"+(onlyMoved?" on":"")} onClick={()=>setOnlyMoved(v=>!v)}>
          <span className="box">{onlyMoved?"✓":""}</span> Лише рух за добу
        </button>
        <button className="toggle exp" onClick={exportMovementCSV}>↓ Експорт CSV</button>
        <span className="tb-right">показано позицій: <b>{groups.reduce((a,g)=>a+g.rows.length,0)}</b> / {MV_POSITIONS}</span>
      </div>

      {/* РЕЄСТР */}
      <div className="ledger">
        <table>
          <thead><tr>
            <th className="l" style={{width:42}}>№</th>
            <th className="l">Майно</th>
            <th>Наявність<span className="u">на початок</span></th>
            <th>Отримано<span className="u">прихід ▲</span></th>
            <th>Видано<span className="u">витрата ▼</span></th>
            <th>Залишок<span className="u">на кінець</span></th>
            <th className="c cmove">Рух за добу</th>
          </tr></thead>

          {groups.map(grp=>(
            <tbody key={grp.key}>
              <tr className="grp"><td colSpan={7}>
                <div className="gt">
                  <span className="gi">{grp.g}</span>
                  <span className="gc">{grp.rows.length} поз.</span>
                  <span className="gspark">
                    <span>прихід <b className="pg">+{fmt(grp.tRec)}</b></span>
                    <span>витрата <b className="pa">−{fmt(grp.tIss)}</b></span>
                  </span>
                </div>
              </td></tr>

              {grp.rows.map((it,i)=>{
                const moved = it.rec || it.iss;
                const dcls = it.delta>0?"up":it.delta<0?"down":"flat";
                const dtxt = it.delta>0?"▲ +"+fmt(it.delta):it.delta<0?"▼ −"+fmt(-it.delta):"без змін";
                return(
                  <tr className={"row"+(moved?" moved":"")} key={it.code}>
                    <td className="cnum">{i+1}</td>
                    <td className="cname"><div className="nm">{it.nm}</div><div className="cd">{it.code} · шт</div></td>
                    <td className="open">{fmt(it.op)}</td>
                    <td>{num(it.rec,"rec")}</td>
                    <td>{num(it.iss,"iss")}</td>
                    <td><span className="close">{fmt(it.close)}</span>
                      <span className={"delta "+dcls}>{dtxt}</span></td>
                    <td className="cmove"><MoveBar rec={it.rec} iss={it.iss} mounted={mounted}/></td>
                  </tr>
                );
              })}

              <tr className="sub">
                <td></td>
                <td className="sl">Підсумок · {grp.g.split("·")[0].trim()}</td>
                <td>{fmt(grp.tOp)}</td>
                <td><span className="pg">+{fmt(grp.tRec)}</span></td>
                <td><span className="pa">−{fmt(grp.tIss)}</span></td>
                <td><span className="sc">{fmt(grp.tClose)}</span></td>
                <td className="cmove"></td>
              </tr>
            </tbody>
          ))}

          <tfoot><tr>
            <td className="fl" colSpan={2}>Усього по складу · {tab==="all"?"повний реєстр":LG_TABS.find(t=>t[0]===tab)[1]}</td>
            <td>{fmt(groups.reduce((a,g)=>a+g.tOp,0))}</td>
            <td><span className="pg">+{fmt(groups.reduce((a,g)=>a+g.tRec,0))}</span></td>
            <td><span className="pa">−{fmt(groups.reduce((a,g)=>a+g.tIss,0))}</span></td>
            <td>{fmt(groups.reduce((a,g)=>a+g.tClose,0))}</td>
            <td className="cmove"></td>
          </tr></tfoot>
        </table>
      </div>

      {/* НИЗ */}
      <div className="foot">
        <div className="note"><b>Увага командиру</b><br/>
          Найбільший добовий оборот — <b style={{color:"#dde8df"}}>FPV ОВ 10 км</b> (прихід +300, видача −264). Антенно-щоглове майно
          (Avenger) видано −2 при критичному залишку <b style={{color:"#dde8df"}}>20</b> од. — потрібне погодження поставки #2207.</div>
        <div className="legend">
          <div className="lk"><span className="sw" style={{background:"linear-gradient(90deg,var(--green-d),var(--green))"}}></span> отримано (прихід)</div>
          <div className="lk"><span className="sw" style={{background:"repeating-linear-gradient(-45deg,var(--amber),var(--amber) 4px,var(--amber-d) 4px,var(--amber-d) 8px)"}}></span> видано (витрата)</div>
        </div>
      </div>

      <div className="sign">
        <span>Уклав: черговий складу · Служба авіації та ППО</span>
        <span>Журнал руху · оновлюється щодоби о 00:00 · дані демонстраційні</span>
      </div>

    </div>
  </div>);
}
window.VLedger = VLedger;
