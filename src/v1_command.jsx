// ============================================================
//  ВАРІАНТ 1 — КОМАНДНИЙ ЦЕНТР (тактична сітка)
// ============================================================
const VCMD_CSS = `
.v-cmd{--green:oklch(0.84 0.17 152);--green-deep:oklch(0.66 0.15 152);--amber:oklch(0.83 0.15 80);
  --red:oklch(0.68 0.20 26);--cyan:oklch(0.83 0.10 205);--glow:rgba(74,222,128,0.55);
  --ink:#cdd8cf;--dim:#83948a;--faint:#52615a;--line:rgba(122,168,134,0.13);--line2:rgba(132,184,146,0.26);
  --panel:#0c120e;--panel2:#0e1611;color:var(--ink);font-family:var(--sans);position:relative;padding:18px 20px 48px}
.v-cmd::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(120,170,135,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(120,170,135,.035) 1px,transparent 1px);
  background-size:44px 44px;mask-image:radial-gradient(ellipse 120% 90% at 50% 0%,#000 30%,transparent 90%)}
.v-cmd>*{position:relative;z-index:1}
.v-cmd .kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:14px}
.v-cmd .kpi{position:relative;padding:14px 16px 13px;background:linear-gradient(180deg,var(--panel2),var(--panel));border:1px solid var(--line);overflow:hidden}
.v-cmd .kpi::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--ac,var(--green-deep));opacity:.85}
.v-cmd .kpi .lab{font-family:var(--mono);font-size:9.5px;letter-spacing:.15em;color:var(--dim);text-transform:uppercase}
.v-cmd .kpi .num{font-family:var(--disp);font-weight:600;font-size:34px;line-height:1;color:#eef5ef;margin-top:8px}
.v-cmd .kpi .num .u{font-size:15px;color:var(--dim);font-weight:400;margin-left:3px}
.v-cmd .kpi .foot{font-family:var(--mono);font-size:10px;color:var(--faint);margin-top:7px}
.v-cmd .ag{--ac:var(--green)}.v-cmd .aa{--ac:var(--amber)}.v-cmd .ar{--ac:var(--red)}.v-cmd .ac2{--ac:var(--cyan)}
.v-cmd .trend.up{color:var(--green)}.v-cmd .trend.down{color:var(--red)}
.v-cmd .dash{display:grid;grid-template-columns:1fr 366px;gap:14px;align-items:start}
.v-cmd .main{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
.v-cmd .rail{position:sticky;top:14px}
.v-cmd .panel{position:relative;background:linear-gradient(180deg,var(--panel2),var(--panel));border:1px solid var(--line);display:flex;flex-direction:column}
.v-cmd .panel::after{content:"";position:absolute;right:8px;bottom:8px;width:7px;height:7px;border-right:1px solid var(--line2);border-bottom:1px solid var(--line2)}
.v-cmd .s2{grid-column:span 2}.v-cmd .s3{grid-column:span 3}.v-cmd .s4{grid-column:span 4}
.v-cmd .phead{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line)}
.v-cmd .phead .idx{font-family:var(--mono);font-size:10px;color:var(--green-deep)}
.v-cmd .phead .ttl{font-family:var(--disp);font-weight:500;font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:#dfe9e1}
.v-cmd .phead .meta{margin-left:auto;font-family:var(--mono);font-size:10px;color:var(--dim);display:flex;align-items:center;gap:8px}
.v-cmd .dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 7px var(--glow)}
.v-cmd .dot.amber{background:var(--amber)}.v-cmd .dot.red{background:var(--red)}
.v-cmd .pbody{padding:15px 16px}
.v-cmd .gauge-wrap{display:flex;flex-direction:column;align-items:center}
.v-cmd .gauge{position:relative;width:174px;height:174px}.v-cmd .gauge svg{transform:rotate(-90deg)}
.v-cmd .gauge .ctr{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.v-cmd .gauge .pct{font-family:var(--disp);font-weight:600;font-size:48px;line-height:.9;color:#eef5ef}
.v-cmd .gauge .pct .s{font-size:20px;color:var(--green)}
.v-cmd .gauge .cap{font-family:var(--mono);font-size:9px;letter-spacing:.2em;color:var(--dim);margin-top:6px;text-transform:uppercase}
.v-cmd .legend{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;width:100%;margin-top:14px}
.v-cmd .legend .li{padding:8px;border:1px solid var(--line);text-align:center}
.v-cmd .legend .n{font-family:var(--disp);font-weight:600;font-size:21px;color:#e7efe9}
.v-cmd .legend .l{font-family:var(--mono);font-size:8.5px;letter-spacing:.08em;color:var(--dim);text-transform:uppercase;margin-top:2px}
.v-cmd .sw{width:8px;height:8px;flex:none;display:inline-block}
.v-cmd .frow{margin-bottom:13px}.v-cmd .frow:last-child{margin-bottom:0}
.v-cmd .frow .top{display:flex;align-items:baseline;gap:9px;margin-bottom:6px}
.v-cmd .frow .nm{font-weight:600;font-size:13px;color:#dde7df}
.v-cmd .frow .tag{font-family:var(--mono);font-size:9px;color:var(--green);letter-spacing:.05em}
.v-cmd .frow .nt{font-family:var(--mono);font-size:9.5px;color:var(--faint);margin-left:auto}
.v-cmd .sbar{display:flex;height:13px;background:rgba(255,255,255,.03);border:1px solid var(--line);overflow:hidden}
.v-cmd .sbar i{height:100%;transition:width .9s cubic-bezier(.2,.7,.2,1)}
.v-cmd .sbar .rdy{background:linear-gradient(180deg,oklch(.84 .17 152),oklch(.7 .16 152))}
.v-cmd .sbar .iss{background:repeating-linear-gradient(45deg,oklch(.83 .15 80),oklch(.83 .15 80) 5px,oklch(.76 .14 80) 5px,oklch(.76 .14 80) 10px)}
.v-cmd .sbar .rep{background:linear-gradient(180deg,oklch(.68 .2 26),oklch(.56 .18 26))}
.v-cmd .fkey{display:flex;gap:16px;margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}
.v-cmd .fkey .k{display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:9.5px;color:var(--dim)}
.v-cmd .srow{display:grid;grid-template-columns:1fr 96px;gap:10px;align-items:center;padding:8px 4px;border-bottom:1px solid rgba(122,168,134,.07)}
.v-cmd .srow:last-child{border-bottom:0}
.v-cmd .srow .snm{font-size:12px;color:#d4ded6;font-weight:500}
.v-cmd .srow .snm small{display:block;font-family:var(--mono);font-size:9px;color:var(--faint);margin-top:1px}
.v-cmd .track{position:relative;height:8px;background:rgba(255,255,255,.04);border:1px solid var(--line);margin-top:5px}
.v-cmd .track i{position:absolute;left:0;top:0;bottom:0;transition:width 1s cubic-bezier(.2,.7,.2,1)}
.v-cmd .track .mn{position:absolute;top:-3px;bottom:-3px;width:1px;background:var(--dim)}
.v-cmd .f-ok{background:linear-gradient(90deg,var(--green-deep),var(--green))}
.v-cmd .f-warn{background:linear-gradient(90deg,oklch(.66 .13 80),var(--amber))}
.v-cmd .f-crit{background:linear-gradient(90deg,oklch(.54 .17 26),var(--red))}
.v-cmd .qty{font-family:var(--mono);font-size:12px;text-align:right;color:#e7efe9}
.v-cmd .qty small{color:var(--faint);font-size:9.5px}
.v-cmd .chip{display:inline-flex;align-items:center;font-family:var(--mono);font-size:8.5px;letter-spacing:.1em;padding:2px 6px;border:1px solid currentColor;text-transform:uppercase;margin-top:4px}
.v-cmd .chip.ok{color:var(--green)}.v-cmd .chip.warn{color:var(--amber)}.v-cmd .chip.crit{color:var(--red)}.v-cmd .chip.info{color:var(--cyan)}
.v-cmd .zmap{display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:repeat(3,76px);gap:8px;grid-template-areas:"a a b" "a a c" "d e f"}
.v-cmd .zone{position:relative;border:1px solid var(--line2);padding:9px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;transition:.18s;overflow:hidden}
.v-cmd .zone:hover{background:rgba(122,168,134,.06);border-color:var(--green-deep)}
.v-cmd .zone.sel{border-color:var(--green);background:rgba(74,222,128,.08);box-shadow:inset 0 0 22px rgba(74,222,128,.1)}
.v-cmd .zone .zid{font-family:var(--disp);font-weight:700;font-size:15px;color:#eef5ef}
.v-cmd .zone .zn{font-family:var(--mono);font-size:8.5px;letter-spacing:.06em;color:var(--dim);text-transform:uppercase}
.v-cmd .zone .zocc{font-family:var(--disp);font-weight:600;font-size:19px;color:#dde7df;line-height:1}
.v-cmd .zone .zbar{height:4px;background:rgba(255,255,255,.05);margin-top:4px}.v-cmd .zone .zbar i{display:block;height:100%}
.v-cmd .znote{position:absolute;right:7px;top:8px;width:6px;height:6px;border-radius:50%}
.v-cmd .za{grid-area:a}.v-cmd .zb{grid-area:b}.v-cmd .zc{grid-area:c}.v-cmd .zd{grid-area:d}.v-cmd .ze{grid-area:e}.v-cmd .zf{grid-area:f}
.v-cmd .zdet{margin-top:10px;padding:9px 12px;border:1px solid var(--line);display:flex;align-items:center;gap:13px;font-family:var(--mono);font-size:10.5px;color:var(--dim)}
.v-cmd .zdet b{color:#e7efe9;font-weight:500}.v-cmd .zdet .big{font-family:var(--disp);font-size:17px;color:var(--green);font-weight:600}
.v-cmd table{width:100%;border-collapse:collapse}
.v-cmd th{font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);text-align:left;padding:7px 10px;border-bottom:1px solid var(--line);font-weight:400}
.v-cmd td{padding:9px 10px;border-bottom:1px solid rgba(122,168,134,.07);font-size:12px;color:#d2dcd4}
.v-cmd tbody tr:hover{background:rgba(122,168,134,.05)}.v-cmd tr:last-child td{border-bottom:0}
.v-cmd .u-cs{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:#eaf3ec;font-family:var(--mono);font-size:11.5px}
.v-cmd .u-av{width:7px;height:7px;border-radius:50%;flex:none}
.v-cmd .itm{font-family:var(--mono);font-size:10.5px;color:var(--dim)}
.v-cmd .ago{font-family:var(--mono);font-size:10.5px;color:var(--faint)}
.v-cmd .qrow{display:flex;align-items:center;gap:11px;padding:10px 4px;border-bottom:1px solid rgba(122,168,134,.07)}
.v-cmd .qrow:last-child{border-bottom:0}
.v-cmd .qrow .qid{font-family:var(--mono);font-size:10.5px;color:var(--cyan);width:54px;flex:none}
.v-cmd .qrow .qd{flex:1;font-size:12px;color:#d4ded6}.v-cmd .qrow .qd small{display:block;font-family:var(--mono);font-size:9.5px;color:var(--faint)}
.v-cmd .qrow .eta{font-family:var(--mono);font-size:10px;color:var(--dim);width:72px;text-align:right;flex:none}
.v-cmd .logtabs{display:flex;border-bottom:1px solid var(--line)}
.v-cmd .logtab{flex:1;font-family:var(--mono);font-size:9px;letter-spacing:.05em;padding:9px 2px;background:transparent;border:0;border-right:1px solid var(--line);color:var(--dim);cursor:pointer;text-transform:uppercase;transition:.15s}
.v-cmd .logtab:last-child{border-right:0}.v-cmd .logtab.on{color:var(--green);background:rgba(74,222,128,.07)}
.v-cmd .logctrl{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid var(--line);font-family:var(--mono);font-size:9.5px;color:var(--faint)}
.v-cmd .pbtn{font-family:var(--mono);font-size:9px;letter-spacing:.08em;padding:4px 9px;border:1px solid var(--line2);background:transparent;color:var(--dim);cursor:pointer;text-transform:uppercase}
.v-cmd .pbtn.live{color:var(--green);border-color:rgba(74,222,128,.4)}
.v-cmd .logfeed{overflow-y:auto;max-height:548px}
.v-cmd .lrow{display:grid;grid-template-columns:42px 64px 1fr;gap:9px;padding:8px 14px;border-bottom:1px solid rgba(122,168,134,.05);animation:cmdslide .45s ease}
@keyframes cmdslide{from{opacity:0;transform:translateY(-7px);background:rgba(74,222,128,.12)}to{opacity:1}}
.v-cmd .lt{font-family:var(--mono);font-size:10px;color:var(--faint)}
.v-cmd .lg{font-family:var(--mono);font-size:8px;letter-spacing:.06em;padding:2px 0;text-align:center;border:1px solid currentColor;text-transform:uppercase;height:fit-content}
.v-cmd .lx{font-size:11.5px;color:#cdd8cf;line-height:1.35}.v-cmd .lx b{color:#eaf3ec}
.v-cmd .lg.issue{color:var(--amber)}.v-cmd .lg.ret{color:var(--green)}.v-cmd .lg.rep{color:var(--red)}.v-cmd .lg.in{color:var(--cyan)}.v-cmd .lg.alert{color:var(--red)}
.v-cmd .cmdnote{margin:0 16px 15px;padding:10px 13px;border:1px solid var(--line);border-left:2px solid var(--amber);background:rgba(245,200,90,.04);font-size:11.5px;line-height:1.5}
.v-cmd .cmdnote b{color:var(--amber);font-family:var(--mono);font-size:9.5px;letter-spacing:.1em}
@media(max-width:1380px){.v-cmd .dash{grid-template-columns:1fr}.v-cmd .rail{position:static}.v-cmd .kpis{grid-template-columns:repeat(3,1fr)}}
@media(max-width:820px){.v-cmd .main{grid-template-columns:1fr}.v-cmd .s2,.v-cmd .s3,.v-cmd .s4{grid-column:span 1}.v-cmd .kpis{grid-template-columns:repeat(2,1fr)}}
`;

function CmdGauge(){
  const pct=useCountUp(READINESS,1400); const R=76,C=2*Math.PI*R,off=C*(1-pct/100);
  return(<div className="gauge-wrap">
    <div className="gauge"><svg width="174" height="174" viewBox="0 0 174 174">
      <circle cx="87" cy="87" r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="11"/>
      <circle cx="87" cy="87" r={R} fill="none" stroke="oklch(.84 .17 152)" strokeWidth="11" strokeLinecap="round"
        strokeDasharray={C} strokeDashoffset={off} style={{filter:"drop-shadow(0 0 8px rgba(74,222,128,.55))"}}/>
    </svg><div className="ctr"><div className="pct">{Math.round(pct)}<span className="s">%</span></div><div className="cap">Боєготовність</div></div></div>
    <div className="legend">
      <div className="li"><div><span className="sw" style={{background:"oklch(.84 .17 152)"}}></span> <span className="n">{fmt(fleetTotals.rdy)}</span></div><div className="l">Готові</div></div>
      <div className="li"><div><span className="sw" style={{background:"oklch(.83 .15 80)"}}></span> <span className="n">{fmt(fleetTotals.iss)}</span></div><div className="l">Видано</div></div>
      <div className="li"><div><span className="sw" style={{background:"oklch(.68 .2 26)"}}></span> <span className="n">{fmt(fleetTotals.rep)}</span></div><div className="l">Ремонт</div></div>
    </div>
  </div>);
}

function CmdFiber(){
  const [m,setM]=useState(false); useEffect(()=>{const t=setTimeout(()=>setM(true),120);return()=>clearTimeout(t);},[]);
  return(<div>
    {FIBER.map(f=>{const tot=f.rdy+f.iss+f.rep;const w=n=>m?(n/tot*100)+"%":"0%";return(
      <div className="frow" key={f.label}>
        <div className="top"><span className="nm">{f.label}</span><span className="tag">[{f.len}]</span><span className="nt">{f.note} · {fmt(tot)} од.</span></div>
        <div className="sbar"><i className="rdy" style={{width:w(f.rdy)}}></i><i className="iss" style={{width:w(f.iss)}}></i><i className="rep" style={{width:w(f.rep)}}></i></div>
      </div>);})}
    <div className="fkey">
      <span className="k"><span className="sw" style={{background:"oklch(.84 .17 152)"}}></span>Готові</span>
      <span className="k"><span className="sw" style={{background:"oklch(.83 .15 80)"}}></span>Видано</span>
      <span className="k"><span className="sw" style={{background:"oklch(.68 .2 26)"}}></span>Ремонт / ТО</span>
    </div>
  </div>);
}

function CmdStock(){
  const [m,setM]=useState(false); useEffect(()=>{const t=setTimeout(()=>setM(true),150);return()=>clearTimeout(t);},[]);
  return(<div>{ACCESSORIES.map(s=>{const st=accStatus(s);const pct=m?Math.min(s.qty/s.max*100,100):0;const mn=Math.min(s.min/s.max*100,100);
    const lab=st==="crit"?["КРИТ.","crit"]:st==="warn"?["НИЗЬКО","warn"]:["НОРМА","ok"];
    return(<div className="srow" key={s.code}>
      <div><div className="snm">{s.nm}<small>{s.code} · {uahF(s.price)} / {s.unit}</small></div>
        <div className="track"><i className={"f-"+st} style={{width:pct+"%"}}></i><span className="mn" style={{left:mn+"%"}}></span></div></div>
      <div className="qty">{fmt(s.qty)} <small>/ {fmt(s.min)}</small><div><span className={"chip "+lab[1]}>{lab[0]}</span></div></div>
    </div>);})}</div>);
}

function CmdZones(){
  const [sel,setSel]=useState("A"); const z=ZONES.find(x=>x.id===sel);
  const fc={ok:"var(--green)",amber:"var(--amber)",red:"var(--red)"};
  return(<div>
    <div className="zmap">{ZONES.map(zo=>(
      <div key={zo.id} className={"zone z"+zo.area+(zo.id===sel?" sel":"")} onClick={()=>setSel(zo.id)}>
        {zo.note&&<span className="znote" style={{background:fc[zo.flag],boxShadow:"0 0 8px "+fc[zo.flag]}}></span>}
        <div><span className="zid">{zo.id}</span> <span className="zn">{zo.nm}</span></div>
        <div><div className="zocc">{zo.occ}<span style={{fontSize:11,color:"var(--dim)"}}>%</span></div>
          <div className="zbar"><i style={{width:zo.occ+"%",background:zo.occ>80?"var(--amber)":"var(--green-deep)"}}></i></div></div>
      </div>))}</div>
    <div className="zdet"><span className="big">{z.id}</span><div><div><b>{z.nm}</b></div>
      <div style={{marginTop:2}}>Заповнення <b>{z.occ}%</b> · одиниць: <b>{fmt(z.units)}</b>{z.note?" · "+z.note:""}</div></div></div>
  </div>);
}

function CmdUnits(){
  const sc={active:"var(--green)",idle:"var(--faint)"};
  return(<table><thead><tr><th>Підрозділ</th><th>Майно (вибірка)</th><th>Од.</th><th>Остання видача</th></tr></thead>
    <tbody>{UNITS.map(u=>(<tr key={u.u}>
      <td><span className="u-cs"><span className="u-av" style={{background:sc[u.status],boxShadow:u.status==="active"?"0 0 6px var(--glow)":"none"}}></span>{u.u}</span>
        <div className="itm" style={{margintop:2}}>{u.full}</div></td>
      <td className="itm">{u.holds}</td><td className="itm"><b style={{color:"#dde7df"}}>{u.cnt}</b></td><td className="ago">{u.when}</td>
    </tr>))}</tbody></table>);
}

function CmdIncoming(){
  return(<div>{INCOMING.map(q=>{const[lab,cls]=STATUS_LABEL[q.status];return(
    <div className="qrow" key={q.id}><span className="qid">{q.id}</span>
      <div className="qd">{q.desc}<small>{q.qty}</small></div><span className={"chip "+cls}>{lab}</span><span className="eta">{q.eta}</span></div>);})}</div>);
}

const CMD_TABS=[["all","Всі"],["issue","Видача"],["ret","Поверн."],["rep","Ремонт"],["alert","Тривоги"]];
function CmdLog(){
  const {log,paused,setPaused}=useLiveLog();
  const [f,setF]=useState("all");
  const shown=log.filter(l=>f==="all"||l.g===f);
  return(<div className="panel">
    <div className="phead"><span className="idx">06</span><span className="ttl">Журнал активності</span>
      <span className="meta" style={{color:"var(--green)"}}>● {paused?"ПАУЗА":"ЕФІР"}</span></div>
    <div className="logtabs">{CMD_TABS.map(([k,l])=>(<button key={k} className={"logtab"+(f===k?" on":"")} onClick={()=>setF(k)}>{l}</button>))}</div>
    <div className="logctrl"><span>ПОДІЙ: {shown.length}</span>
      <button className={"pbtn"+(paused?"":" live")} onClick={()=>setPaused(p=>!p)}>{paused?"▶ ВІДНОВИТИ":"❚❚ ПАУЗА"}</button></div>
    <div className="logfeed">{shown.map(l=>(<div className="lrow" key={l.id}><span className="lt">{l.time}</span>
      <span className={"lg "+l.g}>{l.t}</span><span className="lx" dangerouslySetInnerHTML={{__html:l.x}}></span></div>))}</div>
  </div>);
}

function VCommand(){
  const now=useClock();
  return(<div className="v-cmd"><style dangerouslySetInnerHTML={{__html:VCMD_CSS}}/>
    <div className="kpis">
      <div className="kpi ag"><div className="lab">Боєготовність</div><div className="num">{READINESS}<span className="u">%</span></div><div className="foot"><span className="trend up">▲ +2%</span> за добу</div></div>
      <div className="kpi ac2"><div className="lab">FPV у парку</div><div className="num">{fmt(fleetTotal)}</div><div className="foot">5 типів за ВОЛЗ</div></div>
      <div className="kpi ac2"><div className="lab">Платформи DJI/Autel</div><div className="num">{fmt(platTot)}</div><div className="foot">розвідка + ударні</div></div>
      <div className="kpi aa"><div className="lab">Видано підрозділам</div><div className="num">{fmt(fleetTotals.iss)}</div><div className="foot">{activeUnits} отримувачів</div></div>
      <div className="kpi ar"><div className="lab">Ремонт / ТО</div><div className="num">{fmt(fleetTotals.rep)}</div><div className="foot"><span className="trend down">▼ −6</span> за добу</div></div>
      <div className="kpi ar"><div className="lab">Низький запас</div><div className="num">{lowStockCount}</div><div className="foot">позицій потребують</div></div>
    </div>
    <div className="dash">
      <div className="main">
        <div className="panel s2"><div className="phead"><span className="idx">01</span><span className="ttl">Боєготовність</span><span className="meta"><span className="dot"></span></span></div><div className="pbody"><CmdGauge/></div></div>
        <div className="panel s4"><div className="phead"><span className="idx">02</span><span className="ttl">FPV за довжиною оптоволокна</span><span className="meta">{fmt(fleetTotal)} од.</span></div><div className="pbody"><CmdFiber/></div></div>
        <div className="panel s3"><div className="phead"><span className="idx">03</span><span className="ttl">Номенклатура · залишки</span><span className="meta" style={{color:"var(--red)"}}>{lowStockCount} тривоги <span className="dot red"></span></span></div><div className="pbody" style={{paddingTop:6,paddingBottom:6}}><CmdStock/></div></div>
        <div className="panel s3"><div className="phead"><span className="idx">04</span><span className="ttl">План складу · зони</span><span className="meta">6 зон</span></div><div className="pbody"><CmdZones/></div></div>
        <div className="panel s4"><div className="phead"><span className="idx">05</span><span className="ttl">Видано в підрозділи</span><span className="meta">{activeUnits} <span className="dot amber"></span></span></div><div className="pbody" style={{paddingTop:4,paddingBottom:4}}><CmdUnits/></div></div>
        <div className="panel s2"><div className="phead"><span className="idx">07</span><span className="ttl">Очікувані поставки</span><span className="meta">{incomingActive} <span className="dot"></span></span></div><div className="pbody" style={{paddingTop:6,paddingBottom:2}}><CmdIncoming/></div>
          <div className="cmdnote"><b>УВАГА КОМАНДИРУ</b><br/>Поставку #2207 (щогли Avenger) <b>не погоджено</b> — критичний дефіцит антенно-щоглового. Потрібне рішення.</div></div>
      </div>
      <div className="rail"><CmdLog/></div>
    </div>
  </div>);
}
window.VCommand=VCommand;
