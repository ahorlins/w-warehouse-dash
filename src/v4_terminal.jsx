// ============================================================
//  ВАРІАНТ 4 — ТЕРМІНАЛ ОБЛІКУ (моноширинний, фосфор)
// ============================================================
const VT_CSS = `
.v-tm{--bg:#0a0b06;--amb:#f4b740;--amb-d:#a87c20;--grn:#6fe06f;--ink:#d8cba0;--dim:#8a7d52;--faint:#5c5436;
  --red:#ff6a4d;--cy:#5fd0e0;--line:rgba(244,183,64,0.22);--line-d:rgba(244,183,64,0.12);
  background:var(--bg);color:var(--ink);font-family:var(--mono);font-size:12.5px;line-height:1.5;position:relative;padding:0;min-height:100vh}
.v-tm::before{content:"";position:fixed;inset:0;z-index:5;pointer-events:none;
  background:repeating-linear-gradient(0deg,rgba(0,0,0,0) 0,rgba(0,0,0,0) 2px,rgba(0,0,0,.16) 3px,rgba(0,0,0,0) 4px);opacity:.55}
.v-tm::after{content:"";position:fixed;inset:0;z-index:4;pointer-events:none;background:radial-gradient(120% 100% at 50% 0%,transparent 60%,rgba(0,0,0,.5) 100%)}
.v-tm .scr{position:relative;z-index:1;max-width:1560px;margin:0 auto;padding:18px 26px 50px;text-shadow:0 0 2px rgba(244,183,64,.35)}
.v-tm a,.v-tm b{color:var(--amb)}
.v-tm .tbar{display:flex;align-items:center;justify-content:space-between;border:1px solid var(--line);padding:7px 14px;margin-bottom:14px;background:rgba(244,183,64,.04)}
.v-tm .tbar .l{color:var(--amb);letter-spacing:.1em}
.v-tm .tbar .c{color:var(--dim);letter-spacing:.08em}
.v-tm .tbar .blink{color:var(--grn);animation:tmblink 1.1s steps(1) infinite}
@keyframes tmblink{50%{opacity:0}}
.v-tm .ban{white-space:pre;color:var(--amb);font-size:11px;line-height:1.15;letter-spacing:0;margin-bottom:6px;text-shadow:0 0 6px rgba(244,183,64,.4)}
.v-tm .sysline{color:var(--dim);margin-bottom:16px;border-bottom:1px solid var(--line-d);padding-bottom:14px}
.v-tm .sysline b{color:var(--grn)}
.v-tm .cols{display:grid;grid-template-columns:1fr 1fr;gap:26px;align-items:start}
.v-tm .cols3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:22px}
.v-tm .blk{margin-bottom:22px}
.v-tm .bh{color:var(--bg);background:var(--amb);padding:2px 10px;display:inline-block;letter-spacing:.14em;font-weight:700;margin-bottom:8px}
.v-tm .bh.g{background:var(--grn)}.v-tm .bh.r{background:var(--red);color:#1a0a06}
.v-tm pre{white-space:pre;overflow-x:auto;color:var(--ink)}
.v-tm .row{display:grid;gap:0;align-items:center}
.v-tm .led{border:1px solid var(--line);border-collapse:collapse;width:100%}
.v-tm .led th{text-align:left;color:var(--amb-d);border-bottom:1px solid var(--line);padding:5px 10px;font-weight:400;letter-spacing:.05em;white-space:nowrap}
.v-tm .led th.r,.v-tm .led td.r{text-align:right}
.v-tm .led td{padding:4px 10px;border-bottom:1px dotted var(--line-d);white-space:nowrap}
.v-tm .led tr:last-child td{border-bottom:0}
.v-tm .led tbody tr:hover{background:rgba(244,183,64,.06)}
.v-tm .led .nm{color:var(--ink)}.v-tm .led .cd{color:var(--faint)}
.v-tm .qok{color:var(--grn)}.v-tm .qwarn{color:var(--amb)}.v-tm .qcrit{color:var(--red)}
.v-tm .bar{color:var(--amb)}.v-tm .barbg{color:var(--faint)}
.v-tm .meter{letter-spacing:-1px}
.v-tm .big-read{display:flex;align-items:baseline;gap:14px;border:1px solid var(--line);padding:14px 18px;background:rgba(111,224,111,.05)}
.v-tm .big-read .n{font-size:46px;line-height:.9;color:var(--grn);text-shadow:0 0 10px rgba(111,224,111,.4);font-weight:700}
.v-tm .big-read .lbl{color:var(--dim);letter-spacing:.06em}
.v-tm .big-read .lbl b{color:var(--ink)}
.v-tm .kv{display:grid;grid-template-columns:auto 1fr;gap:2px 14px}
.v-tm .kv .k{color:var(--dim)}.v-tm .kv .v{color:var(--ink);text-align:right}
.v-tm .log{border:1px solid var(--line);max-height:none}
.v-tm .logln{padding:3px 12px;border-bottom:1px dotted var(--line-d);animation:tmin .4s ease}
.v-tm .logln:last-child{border-bottom:0}
@keyframes tmin{from{opacity:0;background:rgba(111,224,111,.14)}to{opacity:1}}
.v-tm .logln .tt{color:var(--faint)}
.v-tm .logln .tg{display:inline-block;width:62px}
.v-tm .tg.issue{color:var(--amb)}.v-tm .tg.ret{color:var(--grn)}.v-tm .tg.rep{color:var(--red)}.v-tm .tg.in{color:var(--cy)}.v-tm .tg.alert{color:var(--red)}
.v-tm .logln .tx{color:var(--ink)}.v-tm .logln .tx b{color:var(--amb)}
.v-tm .foot{margin-top:8px;border-top:1px solid var(--line);padding-top:10px;display:flex;gap:22px;flex-wrap:wrap;color:var(--dim)}
.v-tm .foot kbd{color:var(--bg);background:var(--dim);padding:1px 6px;margin-right:5px}
.v-tm .cur{display:inline-block;width:9px;height:15px;background:var(--grn);vertical-align:-2px;animation:tmblink 1.1s steps(1) infinite}
@media(max-width:1100px){.v-tm .cols,.v-tm .cols3{grid-template-columns:1fr}}
`;

const BANNER =
`╔════════════════════════════════════════════════════════════════╗
║  СИСТЕМА ОБЛІКУ МАЙНА · СКЛАД БпЛА · СЛУЖБА АВІАЦІЇ ТА ППО     ║
║  WAREHOUSE MANAGEMENT TERMINAL  ·  v4.14  ·  РЕЖИМ: ЧЕРГОВИЙ   ║
╚════════════════════════════════════════════════════════════════╝`;

function meter(pct,width=14){
  const f=Math.round(pct/100*width); 
  return <span className="meter"><span className="bar">{"█".repeat(f)}</span><span className="barbg">{"·".repeat(width-f)}</span></span>;
}

function TmLog(){
  const {log}=useLiveLog(3600);
  return(<div className="log">{log.slice(0,16).map(l=>(
    <div className="logln" key={l.id}><span className="tt">{l.time}</span> <span className={"tg "+l.g}>{l.t}</span>
      <span className="tx"> </span><span className="tx" dangerouslySetInnerHTML={{__html:l.x}}></span></div>))}</div>);
}

function VTerminal(){
  const now=useClock();
  const t1=PLATFORMS.filter(p=>p.t===1),t2=PLATFORMS.filter(p=>p.t===2);
  const qcls=s=>{const k=accStatus(s);return k==="crit"?"qcrit":k==="warn"?"qwarn":"qok";};
  return(<div className="v-tm"><style dangerouslySetInnerHTML={{__html:VT_CSS}}/>
    <div className="scr">
      <div className="tbar"><span className="l">root@sklad-bpla:~# <span className="blink">monitor --live</span></span>
        <span className="c">SES 0x4F · UPLINK <span style={{color:"var(--grn)"}}>OK</span> · {fmtTime(now)} · {fmtDate(now)}</span></div>
      <div className="ban">{BANNER}</div>
      <div className="sysline">&gt; завантажено реєстр: <b>1 550</b> позицій · індекс зон 6/6 · парк FPV <b>{fmt(fleetTotal)}</b> · платформи <b>{fmt(platTot)}</b> · отримувачів <b>{activeUnits}</b> · тривог <b style={{color:"var(--red)"}}>{lowStockCount}</b></div>

      <div className="cols">
        <div>
          <div className="blk"><span className="bh g">[ БОЄГОТОВНІСТЬ ]</span>
            <div className="big-read"><span className="n">{READINESS}%</span>
              <span className="lbl">придатні до застосування<br/>готові <b>{fmt(fleetTotals.rdy)}</b> · видано <b>{fmt(fleetTotals.iss)}</b> · ремонт <b>{fmt(fleetTotals.rep)}</b></span></div>
          </div>

          <div className="blk"><span className="bh">[ FPV · ДОВЖИНА ОПТОВОЛОКНА (ОВ) ]</span>
            <table className="led"><thead><tr><th>ТИП</th><th>ЗАВАНТАЖЕННЯ</th><th className="r">ГОТ.</th><th className="r">ВИД.</th><th className="r">РЕМ.</th><th className="r">ВСЬОГО</th></tr></thead>
              <tbody>{FIBER.map(f=>{const tot=f.rdy+f.iss+f.rep;const mx=Math.max(...FIBER.map(x=>x.rdy+x.iss+x.rep));
                return(<tr key={f.label}><td className="nm">{f.len.padEnd(6," ")}</td><td>{meter(tot/mx*100,16)}</td>
                  <td className="r qok">{fmt(f.rdy)}</td><td className="r qwarn">{fmt(f.iss)}</td><td className="r qcrit">{fmt(f.rep)}</td><td className="r"><b>{fmt(tot)}</b></td></tr>);})}</tbody></table>
          </div>

          <div className="blk"><span className="bh">[ ПЛАТФОРМИ · РЕЄСТР ]</span>
            <table className="led"><thead><tr><th>КОД</th><th>СІМЕЙСТВО</th><th>ТИП</th><th className="r">К-СТЬ</th><th className="r">ГОТ.</th><th className="r">ВАРТ.ОД</th></tr></thead>
              <tbody>{[...t1,...t2].map(p=>(<tr key={p.code}><td className="cd">{p.code}</td><td className="nm">{p.fam}</td>
                <td style={{color:p.t===1?"var(--cy)":"var(--amb)"}}>{p.t===1?"РОЗВ":"УДАР"}</td>
                <td className="r">{fmt(p.qty)}</td><td className="r qok">{fmt(p.rdy)}</td><td className="r cd">{uah(p.price)}</td></tr>))}</tbody></table>
          </div>
        </div>

        <div>
          <div className="blk"><span className="bh r">[ ТРИВОГИ ЗАПАСУ · {lowStockCount} ]</span>
            <table className="led"><thead><tr><th>КОД</th><th>НОМЕНКЛАТУРА</th><th className="r">НАЯВ</th><th className="r">МІН</th><th>СТАН</th></tr></thead>
              <tbody>{ACCESSORIES.map(s=>{const k=accStatus(s);const st=k==="crit"?"КРИТ":k==="warn"?"НИЗ":"НОРМ";
                return(<tr key={s.code}><td className="cd">{s.code}</td><td className="nm">{s.nm}</td>
                  <td className={"r "+qcls(s)}>{fmt(s.qty)}</td><td className="r cd">{fmt(s.min)}</td><td className={qcls(s)}>{st}</td></tr>);})}</tbody></table>
          </div>

          <div className="blk"><span className="bh">[ ВИДАНО ПІДРОЗДІЛАМ ]</span>
            <table className="led"><thead><tr><th>ПІДРОЗДІЛ</th><th>МАЙНО</th><th className="r">ОД.</th><th>ОСТ.</th></tr></thead>
              <tbody>{UNITS.map(u=>(<tr key={u.u}><td className="nm" style={{color:"var(--amb)"}}>{u.u}</td>
                <td className="cd">{u.holds}</td><td className="r"><b>{u.cnt}</b></td><td className="cd">{u.when}</td></tr>))}</tbody></table>
          </div>

          <div className="blk"><span className="bh">[ ОЧІКУВАНІ ПОСТАВКИ ]</span>
            <table className="led"><thead><tr><th>ЗАЯВКА</th><th>НОМЕНКЛАТУРА</th><th className="r">К-СТЬ</th><th>СТАТУС</th><th className="r">ETA</th></tr></thead>
              <tbody>{INCOMING.map(q=>{const[lab]=STATUS_LABEL[q.status];const c=q.status==="warn"?"qwarn":q.status==="in"?"":"qok";
                return(<tr key={q.id}><td className="cd">{q.id}</td><td className="nm">{q.desc}</td><td className="r">{q.qty}</td>
                  <td className={c} style={q.status==="in"?{color:"var(--cy)"}:{}}>{lab}</td><td className="r cd">{q.eta}</td></tr>);})}</tbody></table>
          </div>
        </div>
      </div>

      <div className="blk"><span className="bh g">[ ЖУРНАЛ ПОДІЙ · LIVE ]</span><TmLog/></div>

      <div className="foot">
        <span><kbd>F1</kbd>видача</span><span><kbd>F2</kbd>прийом</span><span><kbd>F3</kbd>інвентар.</span>
        <span><kbd>F5</kbd>оновити</span><span><kbd>F9</kbd>звіт</span>
        <span style={{marginLeft:"auto"}}>root@sklad-bpla:~# <span className="cur"></span></span>
      </div>
    </div>
  </div>);
}
window.VTerminal=VTerminal;
