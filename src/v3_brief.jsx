// ============================================================
//  ВАРІАНТ 3 — ЗВЕДЕННЯ КОМАНДИРУ (світла доповідь)
// ============================================================
const VBR_CSS = `
.v-br{--paper:#f3f1ea;--card:#fbfaf6;--ink:#23271f;--ink2:#4a5040;--dim:#7d8472;--faint:#a8ad9c;
  --line:#d9d6c8;--line2:#c7c4b3;--olive:#4a5a32;--olive-d:#37431f;--amber:#b07a17;--red:#a8341f;--green:#3f6b3a;
  background:var(--paper);color:var(--ink);font-family:var(--sans);position:relative;padding:0;min-height:100vh}
.v-br .wrap{max-width:1500px;margin:0 auto;padding:30px 40px 60px}
.v-br .doc-top{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:2.5px solid var(--olive-d);padding-bottom:18px}
.v-br .doc-cls{font-family:var(--mono);font-size:10px;letter-spacing:.34em;color:var(--olive);text-transform:uppercase;margin-bottom:10px}
.v-br .doc-h1{font-family:var(--serif);font-weight:600;font-size:33px;line-height:1.08;color:var(--olive-d);letter-spacing:-.01em}
.v-br .doc-sub{font-size:13px;color:var(--ink2);margin-top:7px}
.v-br .doc-meta{text-align:right;font-family:var(--mono);font-size:10.5px;color:var(--dim);line-height:1.9;letter-spacing:.04em;flex:none;padding-left:24px}
.v-br .doc-meta b{color:var(--olive-d)}
.v-br .lede{display:grid;grid-template-columns:1.15fr 1fr;gap:34px;margin:26px 0 28px;align-items:center}
.v-br .lede-txt{font-family:var(--serif);font-size:19px;line-height:1.5;color:var(--ink2)}
.v-br .lede-txt b{color:var(--olive-d);font-weight:600}
.v-br .readbox{background:var(--olive-d);color:#eef0e6;padding:24px 28px;position:relative}
.v-br .readbox::after{content:"";position:absolute;inset:6px;border:1px solid rgba(255,255,255,.18);pointer-events:none}
.v-br .readbox .rl{font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;opacity:.8}
.v-br .readbox .rn{font-family:var(--serif);font-weight:600;font-size:74px;line-height:.9;margin:6px 0}
.v-br .readbox .rn .s{font-size:30px;opacity:.7}
.v-br .readbox .rrow{display:flex;gap:20px;margin-top:14px;border-top:1px solid rgba(255,255,255,.18);padding-top:13px}
.v-br .readbox .rrow div{font-family:var(--mono);font-size:11px}
.v-br .readbox .rrow b{display:block;font-family:var(--serif);font-size:22px;font-weight:600;margin-bottom:1px}
.v-br .sech{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--olive);display:flex;align-items:center;gap:12px;margin:30px 0 14px}
.v-br .sech::after{content:"";flex:1;height:1px;background:var(--line2)}
.v-br .sech .sn{color:var(--faint)}
.v-br .cols{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.v-br .cols3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.v-br .card{background:var(--card);border:1px solid var(--line);padding:20px 22px}
.v-br .card h3{font-family:var(--serif);font-size:17px;font-weight:600;color:var(--olive-d);margin-bottom:14px;display:flex;align-items:baseline;justify-content:space-between}
.v-br .card h3 .tot{font-family:var(--mono);font-size:11px;color:var(--dim);font-weight:400}
.v-br .fibrow{display:grid;grid-template-columns:90px 1fr 56px;gap:12px;align-items:center;padding:8px 0;border-bottom:1px solid var(--line)}
.v-br .fibrow:last-child{border-bottom:0}
.v-br .fibrow .fl{font-weight:600;font-size:13px;color:var(--ink)}
.v-br .fibrow .fl small{display:block;font-family:var(--mono);font-size:9.5px;color:var(--faint);font-weight:400;margin-top:1px}
.v-br .fibbar{height:18px;background:#eceadf;border:1px solid var(--line);display:flex;overflow:hidden}
.v-br .fibbar i{height:100%}
.v-br .fibbar .a{background:var(--olive)}.v-br .fibbar .b{background:#9aa97e}.v-br .fibbar .c{background:#cf9f56}
.v-br .fibrow .fn{font-family:var(--mono);font-size:14px;text-align:right;color:var(--olive-d);font-weight:600}
.v-br .fkey{display:flex;gap:18px;margin-top:12px;font-family:var(--mono);font-size:10px;color:var(--dim)}
.v-br .fkey span{display:flex;align-items:center;gap:6px}
.v-br .fkey i{width:10px;height:10px}
.v-br table{width:100%;border-collapse:collapse}
.v-br th{font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);text-align:left;padding:7px 8px;border-bottom:1.5px solid var(--line2);font-weight:400}
.v-br th.r,.v-br td.r{text-align:right}
.v-br td{padding:9px 8px;border-bottom:1px solid var(--line);font-size:13px;color:var(--ink2)}
.v-br tr:last-child td{border-bottom:0}
.v-br td .pf{font-weight:600;color:var(--ink)}
.v-br td .pc{font-family:var(--mono);font-size:10px;color:var(--faint)}
.v-br .tierbadge{display:inline-block;font-family:var(--mono);font-size:8.5px;letter-spacing:.08em;padding:2px 7px;border-radius:2px;text-transform:uppercase}
.v-br .t1{background:#e4e9d6;color:var(--olive-d)}.v-br .t2{background:#efe0cb;color:#8a5a16}
.v-br .stat{font-family:var(--mono);font-size:10px;letter-spacing:.04em}
.v-br .units td{vertical-align:top}
.v-br .ucode{font-family:var(--mono);font-weight:600;font-size:13px;color:var(--olive-d)}
.v-br .ufull{font-size:11px;color:var(--dim);margin-top:2px}
.v-br .pill{display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:9px;letter-spacing:.06em;padding:2px 8px;border:1px solid currentColor;border-radius:10px;text-transform:uppercase}
.v-br .pill.ok{color:var(--green)}.v-br .pill.warn{color:var(--amber)}.v-br .pill.crit{color:var(--red)}.v-br .pill.info{color:#3a6285}
.v-br .alerts{background:#f7eede;border:1px solid #e3cfa6;border-left:4px solid var(--amber);padding:18px 22px}
.v-br .alerts h3{font-family:var(--serif);font-size:16px;color:#7a5410;margin-bottom:12px}
.v-br .alert-li{display:flex;align-items:flex-start;gap:12px;padding:9px 0;border-bottom:1px solid #e8dcc4;font-size:13px}
.v-br .alert-li:last-child{border-bottom:0}
.v-br .alert-li .an{flex:1}.v-br .alert-li .an b{color:var(--ink)}
.v-br .alert-li .av{font-family:var(--mono);font-weight:600;color:var(--red)}
.v-br .alert-li .marker{font-family:var(--serif);font-weight:700;color:var(--amber);font-size:15px;line-height:1.2}
.v-br .decide{background:var(--card);border:1px solid var(--line);border-top:3px solid var(--red);padding:20px 22px}
.v-br .decide h3{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--red);text-transform:uppercase;margin-bottom:12px}
.v-br .decide p{font-size:14px;line-height:1.55;color:var(--ink2)}
.v-br .decide p b{color:var(--ink)}
.v-br .sign{display:flex;justify-content:space-between;margin-top:34px;padding-top:16px;border-top:1px solid var(--line2);font-family:var(--mono);font-size:10.5px;color:var(--dim);letter-spacing:.04em}
@media(max-width:1100px){.v-br .lede,.v-br .cols,.v-br .cols3{grid-template-columns:1fr}}
`;

function BrFiber(){
  const mx=Math.max(...FIBER.map(f=>f.rdy+f.iss+f.rep));
  return(<div>
    {FIBER.map(f=>{const tot=f.rdy+f.iss+f.rep;const w=n=>(n/tot*100)+"%";
      return(<div className="fibrow" key={f.label}>
        <div className="fl">{f.label}<small>{f.note}</small></div>
        <div className="fibbar" style={{width:(tot/mx*100)+"%"}}>
          <i className="a" style={{width:w(f.rdy)}}></i><i className="b" style={{width:w(f.iss)}}></i><i className="c" style={{width:w(f.rep)}}></i></div>
        <div className="fn">{fmt(tot)}</div>
      </div>);})}
    <div className="fkey"><span><i style={{background:"var(--olive)"}}></i>Готові</span><span><i style={{background:"#9aa97e"}}></i>Видано</span><span><i style={{background:"#cf9f56"}}></i>Ремонт</span></div>
  </div>);
}

function VBrief(){
  const now=useClock();
  const t1=PLATFORMS.filter(p=>p.t===1), t2=PLATFORMS.filter(p=>p.t===2);
  const stStat=s=>{const k=accStatus(s);return k==="crit"?["критично","crit"]:k==="warn"?["низько","warn"]:["норма","ok"];};
  return(<div className="v-br"><style dangerouslySetInnerHTML={{__html:VBR_CSS}}/>
    <div className="wrap">
      <div className="doc-top">
        <div>
          <div className="doc-cls">Для службового користування · зведення № 14/06</div>
          <div className="doc-h1">Зведення стану складу БпЛА</div>
          <div className="doc-sub">Служба авіації та ППО · оперативний склад · станом на {fmtDate(now)}</div>
        </div>
        <div className="doc-meta">ДОБА <b>{p2(now.getHours())}:{p2(now.getMinutes())}</b><br/>ПОЗИЦІЙ <b>{fmt(1550)}</b><br/>ЗОН <b>6 / 6</b><br/>ОТРИМУВАЧІВ <b>{activeUnits}</b></div>
      </div>

      <div className="lede">
        <div className="lede-txt">
          Парк БпЛА підрозділу — <b>{fmt(fleetTotal)} FPV</b> та <b>{fmt(platTot)} розвідувально-ударних платформ</b> DJI / Autel.
          Загальний рівень боєготовності <b>{READINESS}%</b>. Критичних позицій постачання, що потребують рішення командира, — <b>{lowStockCount}</b>.
        </div>
        <div className="readbox">
          <div className="rl">Боєготовність парку</div>
          <div className="rn">{READINESS}<span className="s">%</span></div>
          <div className="rrow">
            <div><b>{fmt(fleetTotals.rdy)}</b>готові</div>
            <div><b>{fmt(fleetTotals.iss)}</b>видано</div>
            <div><b>{fmt(fleetTotals.rep)}</b>ремонт</div>
          </div>
        </div>
      </div>

      <div className="sech"><span className="sn">§1</span> Парк FPV за довжиною оптоволокна</div>
      <div className="cols">
        <div className="card"><h3>Розподіл за ВОЛЗ <span className="tot">{fmt(fleetTotal)} од.</span></h3><BrFiber/></div>
        <div className="card"><h3>Платформи розвідки <span className="tot">Tier 1</span></h3>
          <table><thead><tr><th>Сімейство</th><th className="r">К-сть</th><th className="r">Готові</th><th className="r">Вартість од.</th></tr></thead>
            <tbody>{t1.map(p=>(<tr key={p.code}><td><span className="pf">{p.fam}</span> <span className="pc">{p.code}</span></td>
              <td className="r stat">{fmt(p.qty)}</td><td className="r stat">{fmt(p.rdy)}</td><td className="r stat">{uahF(p.price)}</td></tr>))}</tbody></table>
        </div>
      </div>

      <div className="sech"><span className="sn">§2</span> Ударні та розвідувальні платформи</div>
      <div className="card"><h3>FPV / ударні системи <span className="tot">Tier 2 · {fmt(t2.reduce((a,p)=>a+p.qty,0))} од.</span></h3>
        <table><thead><tr><th>Сімейство</th><th>Тип</th><th className="r">Всього</th><th className="r">Готові</th><th className="r">Видано</th><th className="r">Ремонт</th><th className="r">Вартість од.</th></tr></thead>
          <tbody>{t2.map(p=>(<tr key={p.code}><td><span className="pf">{p.fam}</span></td>
            <td><span className="tierbadge t2">{TIER_LABEL[p.t]}</span></td>
            <td className="r stat">{fmt(p.qty)}</td><td className="r stat">{fmt(p.rdy)}</td><td className="r stat">{fmt(p.iss)}</td><td className="r stat">{fmt(p.rep)}</td>
            <td className="r stat">{uahF(p.price)}</td></tr>))}</tbody></table>
      </div>

      <div className="sech"><span className="sn">§3</span> Видача підрозділам · постачання</div>
      <div className="cols">
        <div className="card"><h3>Видано в підрозділи <span className="tot">{activeUnits} отримувачів</span></h3>
          <table className="units"><thead><tr><th>Підрозділ</th><th>Майно (вибірка)</th><th className="r">Од.</th></tr></thead>
            <tbody>{UNITS.map(u=>(<tr key={u.u}><td><div className="ucode">{u.u}</div><div className="ufull">{u.full}</div></td>
              <td style={{fontSize:12}}>{u.holds}</td><td className="r stat" style={{fontWeight:600,color:"var(--olive-d)"}}>{u.cnt}</td></tr>))}</tbody></table>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:24}}>
          <div className="card"><h3>Очікувані поставки <span className="tot">{incomingActive} активні</span></h3>
            <table><tbody>{INCOMING.map(q=>{const[lab,cls]=STATUS_LABEL[q.status];return(
              <tr key={q.id}><td><span className="pc">{q.id}</span> <span className="pf" style={{fontWeight:500}}>{q.desc}</span></td>
                <td className="stat">{q.qty}</td><td className="r"><span className={"pill "+cls}>{lab}</span></td><td className="r stat">{q.eta}</td></tr>);})}</tbody></table>
          </div>
          <div className="alerts"><h3>⚠ Позиції нижче мінімального запасу</h3>
            {lowStock.map(s=>{const[lab]=stStat(s);return(<div className="alert-li" key={s.code}>
              <span className="marker">›</span><span className="an"><b>{s.nm}</b> — наявно {fmt(s.qty)} {s.unit}, мін. норма {fmt(s.min)}</span>
              <span className="av">{lab}</span></div>);})}
          </div>
        </div>
      </div>

      <div className="sech"><span className="sn">§4</span> На рішення командира</div>
      <div className="decide"><h3>Потрібне рішення</h3>
        <p>Поставку <b>#2207 (щогли телескопічні Avenger 10–12 м, 24 шт)</b> не погоджено. Антенно-щоглове майно у критичному дефіциті
        (наявно <b>22</b> при нормі <b>30</b>), що обмежує розгортання станцій керування на нових позиціях. <b>Прошу погодити закупівлю</b> або
        перерозподіл із резерву РР.</p>
      </div>

      <div className="sign"><span>Уклав: черговий складу · Служба авіації та ППО</span><span>Документ демонстраційний · дані умовні</span></div>
    </div>
  </div>);
}
window.VBrief=VBrief;
