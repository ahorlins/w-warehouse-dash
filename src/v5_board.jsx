// ============================================================
//  ВАРІАНТ 5 — ДОШКА ГОТОВНОСТІ (статусна дошка / kanban)
// ============================================================
const VBD_CSS = `
.v-bd{--bg:#0b0f14;--panel:#121922;--panel2:#0f151d;--ink:#d4dde7;--dim:#7d8b9a;--faint:#52606e;
  --line:rgba(120,150,180,0.14);--line2:rgba(140,170,200,0.26);
  --green:oklch(0.82 0.16 152);--amber:oklch(0.83 0.15 80);--red:oklch(0.69 0.2 26);--cy:oklch(0.78 0.12 220);--violet:oklch(0.72 0.13 290);
  background:var(--bg);color:var(--ink);font-family:var(--sans);position:relative;padding:18px 22px 50px;min-height:100vh}
.v-bd::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(100% 60% at 50% 0,rgba(80,140,200,.06),transparent 60%)}
.v-bd>*{position:relative;z-index:1}
.v-bd .top{display:flex;align-items:center;gap:18px;margin-bottom:16px}
.v-bd .top h1{font-family:var(--disp);font-weight:600;font-size:22px;letter-spacing:.08em;color:#eaf1f8;text-transform:uppercase}
.v-bd .top .sub{font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;color:var(--dim);text-transform:uppercase;margin-top:3px}
.v-bd .top .clock{margin-left:auto;font-family:var(--mono);font-size:22px;color:#eaf1f8;letter-spacing:.04em}
.v-bd .top .clock small{display:block;font-size:10px;color:var(--dim);letter-spacing:.14em;text-align:right;margin-top:2px}
.v-bd .ribbon{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:18px}
.v-bd .rcell{background:var(--panel);border:1px solid var(--line);padding:13px 15px;position:relative;overflow:hidden}
.v-bd .rcell .rl{font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;color:var(--dim);text-transform:uppercase}
.v-bd .rcell .rv{font-family:var(--disp);font-weight:600;font-size:30px;color:#eaf1f8;margin-top:5px;line-height:1}
.v-bd .rcell .rv .u{font-size:14px;color:var(--dim)}
.v-bd .rcell .rf{font-family:var(--mono);font-size:9.5px;color:var(--faint);margin-top:5px}
.v-bd .rcell .spark{position:absolute;right:10px;bottom:10px;display:flex;gap:2px;align-items:flex-end;height:22px;opacity:.5}
.v-bd .rcell .spark i{width:3px;background:var(--cy)}
.v-bd .board{display:grid;grid-template-columns:repeat(4,1fr) 320px;gap:14px;align-items:start}
.v-bd .col{background:var(--panel2);border:1px solid var(--line);min-height:200px}
.v-bd .colh{display:flex;align-items:center;gap:9px;padding:12px 14px;border-bottom:1px solid var(--line);border-top:2px solid var(--ch,var(--green))}
.v-bd .colh .ci{width:8px;height:8px;border-radius:2px;background:var(--ch,var(--green));box-shadow:0 0 8px var(--ch,var(--green))}
.v-bd .colh .ct{font-family:var(--disp);font-weight:500;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#e3ebf3}
.v-bd .colh .cc{margin-left:auto;font-family:var(--mono);font-size:11px;color:var(--dim);background:rgba(255,255,255,.04);padding:2px 9px;border-radius:10px}
.v-bd .col-ready{--ch:var(--green)}.v-bd .col-iss{--ch:var(--amber)}.v-bd .col-rep{--ch:var(--red)}.v-bd .col-inc{--ch:var(--cy)}
.v-bd .cards{padding:11px;display:flex;flex-direction:column;gap:10px;max-height:620px;overflow-y:auto}
.v-bd .kc{background:var(--panel);border:1px solid var(--line2);padding:12px 13px;cursor:grab;transition:.16s;position:relative}
.v-bd .kc::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--kk,var(--green))}
.v-bd .kc:hover{transform:translateY(-2px);border-color:var(--kk,var(--green));box-shadow:0 6px 18px rgba(0,0,0,.4)}
.v-bd .kc .kt{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
.v-bd .kc .kn{font-weight:600;font-size:13px;color:#e8eff6;line-height:1.25}
.v-bd .kc .kq{font-family:var(--disp);font-weight:600;font-size:22px;color:var(--kk,#e8eff6);line-height:.9;flex:none}
.v-bd .kc .km{display:flex;align-items:center;gap:8px;margin-top:9px;flex-wrap:wrap}
.v-bd .kc .tag{font-family:var(--mono);font-size:8.5px;letter-spacing:.06em;padding:2px 7px;border:1px solid currentColor;text-transform:uppercase}
.v-bd .kc .meta{font-family:var(--mono);font-size:10px;color:var(--dim)}
.v-bd .kc .kbar{height:4px;background:rgba(255,255,255,.06);margin-top:10px;overflow:hidden}
.v-bd .kc .kbar i{display:block;height:100%;background:var(--kk,var(--green))}
.v-bd .tg-rec{color:var(--cy)}.v-bd .tg-str{color:var(--amber)}
.v-bd .kk-g{--kk:var(--green)}.v-bd .kk-a{--kk:var(--amber)}.v-bd .kk-r{--kk:var(--red)}.v-bd .kk-c{--kk:var(--cy)}.v-bd .kk-v{--kk:var(--violet)}
.v-bd .side{display:flex;flex-direction:column;gap:14px}
.v-bd .scard{background:var(--panel2);border:1px solid var(--line)}
.v-bd .scard .sh{display:flex;align-items:center;gap:8px;padding:11px 14px;border-bottom:1px solid var(--line);font-family:var(--disp);font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;color:#e3ebf3}
.v-bd .scard .sh .dot{width:7px;height:7px;border-radius:50%;margin-left:auto}
.v-bd .gauge2{display:flex;align-items:center;gap:16px;padding:16px 14px}
.v-bd .gauge2 svg{transform:rotate(-90deg);flex:none}
.v-bd .gauge2 .gc{position:relative}
.v-bd .gauge2 .gp{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:var(--disp);font-weight:600;font-size:26px;color:#eaf1f8}
.v-bd .gauge2 .gx{font-family:var(--mono);font-size:11px;color:var(--dim);line-height:1.7}
.v-bd .gauge2 .gx b{color:var(--ink);font-family:var(--disp);font-size:15px;display:inline-block;width:42px}
.v-bd .feed{max-height:300px;overflow-y:auto}
.v-bd .fl{display:grid;grid-template-columns:42px 1fr;gap:8px;padding:8px 14px;border-bottom:1px solid rgba(120,150,180,.07);animation:bdin .4s ease}
@keyframes bdin{from{opacity:0;transform:translateX(8px);background:rgba(120,200,150,.1)}to{opacity:1}}
.v-bd .fl .ft{font-family:var(--mono);font-size:10px;color:var(--faint)}
.v-bd .fl .fx{font-size:11.5px;color:#cdd8e2;line-height:1.3}.v-bd .fl .fx b{color:#e8eff6}
.v-bd .fl .fg{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px;vertical-align:1px}
.v-bd .fg.issue{background:var(--amber)}.v-bd .fg.ret{background:var(--green)}.v-bd .fg.rep{background:var(--red)}.v-bd .fg.in{background:var(--cy)}.v-bd .fg.alert{background:var(--red)}
.v-bd .alerts{padding:11px 14px;display:flex;flex-direction:column;gap:9px}
.v-bd .al{display:flex;align-items:center;gap:10px;font-size:12px}
.v-bd .al .adot{width:6px;height:6px;border-radius:50%;flex:none}
.v-bd .al .an{flex:1;color:var(--ink)}.v-bd .al .an small{display:block;font-family:var(--mono);font-size:9px;color:var(--faint)}
.v-bd .al .av{font-family:var(--disp);font-weight:600;font-size:16px}
@media(max-width:1400px){.v-bd .board{grid-template-columns:repeat(2,1fr);}.v-bd .side{grid-column:1/-1;flex-direction:row;flex-wrap:wrap}.v-bd .scard{flex:1;min-width:280px}}
@media(max-width:1100px){.v-bd .ribbon{grid-template-columns:repeat(3,1fr)}}
@media(max-width:720px){.v-bd .board{grid-template-columns:1fr}.v-bd .ribbon{grid-template-columns:repeat(2,1fr)}}
`;

function KCard({name,qty,kk,tag,tagcls,meta,barPct}){
  return(<div className={"kc "+kk}>
    <div className="kt"><div className="kn">{name}</div><div className="kq">{fmt(qty)}</div></div>
    <div className="km">{tag&&<span className={"tag "+tagcls}>{tag}</span>}{meta&&<span className="meta">{meta}</span>}</div>
    {barPct!=null&&<div className="kbar"><i style={{width:barPct+"%"}}></i></div>}
  </div>);
}

function BdGauge(){
  const pct=useCountUp(READINESS,1300);const R=34,C=2*Math.PI*R,off=C*(1-pct/100);
  return(<div className="gauge2">
    <div className="gc"><svg width="84" height="84" viewBox="0 0 84 84">
      <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="7"/>
      <circle cx="42" cy="42" r={R} fill="none" stroke="oklch(.82 .16 152)" strokeWidth="7" strokeLinecap="round"
        strokeDasharray={C} strokeDashoffset={off} style={{filter:"drop-shadow(0 0 6px rgba(74,222,128,.5))"}}/></svg>
      <div className="gp">{Math.round(pct)}%</div></div>
    <div className="gx">Готові <b style={{color:"var(--green)"}}>{fmt(fleetTotals.rdy)}</b><br/>Видано <b style={{color:"var(--amber)"}}>{fmt(fleetTotals.iss)}</b><br/>Ремонт <b style={{color:"var(--red)"}}>{fmt(fleetTotals.rep)}</b></div>
  </div>);
}

function BdFeed(){
  const {log}=useLiveLog(3800);
  return(<div className="feed">{log.slice(0,12).map(l=>(
    <div className="fl" key={l.id}><span className="ft">{l.time}</span>
      <span className="fx"><span className={"fg "+l.g}></span><span dangerouslySetInnerHTML={{__html:l.x}}></span></span></div>))}</div>);
}

function VBoard(){
  const now=useClock();
  // картки «на складі» — топ платформи + FPV за ВОЛЗ
  const fiberReady=FIBER.map(f=>({name:"FPV "+f.label,qty:f.rdy,kk:"kk-g",tag:"ВОЛЗ",tagcls:"tg-str",meta:f.len,bar:f.rdy/(f.rdy+f.iss+f.rep)*100}));
  const platReady=PLATFORMS.filter(p=>p.t===1).map(p=>({name:p.fam,qty:p.rdy,kk:"kk-c",tag:"розвідка",tagcls:"tg-rec",meta:p.code,bar:p.rdy/p.qty*100}));
  const readyCards=[...fiberReady,...platReady];
  const issuedCards=UNITS.map(u=>({name:u.u,qty:u.cnt,kk:u.status==="active"?"kk-a":"kk-v",tag:u.status==="active"?"активний":"черга",tagcls:"",meta:u.holds.split(",")[0]}));
  const repCards=[
    {name:"Shrike 10 / 10T",qty:110,kk:"kk-r",tag:"FPV",tagcls:"tg-str",meta:"обрив ВОЛЗ ·14"},
    {name:"Vyriy Opto 10",qty:100,kk:"kk-r",tag:"FPV",tagcls:"tg-str",meta:"камера ·9"},
    {name:"Blink 10 dualband",qty:75,kk:"kk-r",tag:"FPV",tagcls:"tg-str",meta:"VTX ·6"},
    {name:"DJI Mavic 3T",qty:20,kk:"kk-r",tag:"розвідка",tagcls:"tg-rec",meta:"ТО планове"},
    {name:"Колібрі 10\"",qty:46,kk:"kk-r",tag:"FPV",tagcls:"tg-str",meta:"мотори"},
    {name:"Autel EVO MAX",qty:5,kk:"kk-r",tag:"розвідка",tagcls:"tg-rec",meta:"гімбал"},
  ];
  const incCards=INCOMING.filter(i=>i.status!=="done").map(q=>({name:q.desc,kk:"kk-c",tag:STATUS_LABEL[q.status][0],tagcls:"",meta:q.id+" · "+q.eta,raw:q.qty}));
  return(<div className="v-bd"><style dangerouslySetInnerHTML={{__html:VBD_CSS}}/>
    <div className="top">
      <div><h1>Дошка готовності складу</h1><div className="sub">Служба авіації та ППО · рух майна за статусом</div></div>
      <div className="clock">{fmtTime(now)}<small>{fmtDate(now)}</small></div>
    </div>

    <div className="ribbon">
      <div className="rcell"><div className="rl">Боєготовність</div><div className="rv">{READINESS}<span className="u">%</span></div><div className="rf">+2% за добу</div></div>
      <div className="rcell"><div className="rl">FPV у парку</div><div className="rv">{fmt(fleetTotal)}</div><div className="rf">5 типів ВОЛЗ
        <span className="spark">{[8,12,7,14,10,16].map((h,i)=><i key={i} style={{height:h}}></i>)}</span></div></div>
      <div className="rcell"><div className="rl">Платформи DJI/Autel</div><div className="rv">{fmt(platTot)}</div><div className="rf">розвідка + ударні</div></div>
      <div className="rcell"><div className="rl">Видано</div><div className="rv">{fmt(fleetTotals.iss)}</div><div className="rf">{activeUnits} підрозділів</div></div>
      <div className="rcell"><div className="rl">У ремонті / ТО</div><div className="rv" style={{color:"var(--red)"}}>{fmt(fleetTotals.rep)}</div><div className="rf">−6 за добу</div></div>
      <div className="rcell"><div className="rl">Низький запас</div><div className="rv" style={{color:"var(--amber)"}}>{lowStockCount}</div><div className="rf">тривог постачання</div></div>
    </div>

    <div className="board">
      <div className="col col-ready"><div className="colh"><span className="ci"></span><span className="ct">На складі · готові</span><span className="cc">{readyCards.length}</span></div>
        <div className="cards">{readyCards.map((c,i)=><KCard key={i} name={c.name} qty={c.qty} kk={c.kk} tag={c.tag} tagcls={c.tagcls} meta={c.meta} barPct={c.bar}/>)}</div></div>
      <div className="col col-iss"><div className="colh"><span className="ci"></span><span className="ct">Видано · підрозділи</span><span className="cc">{issuedCards.length}</span></div>
        <div className="cards">{issuedCards.map((c,i)=><KCard key={i} name={c.name} qty={c.qty} kk={c.kk} tag={c.tag} tagcls={c.tagcls} meta={c.meta}/>)}</div></div>
      <div className="col col-rep"><div className="colh"><span className="ci"></span><span className="ct">ТО / ремонт</span><span className="cc">{repCards.length}</span></div>
        <div className="cards">{repCards.map((c,i)=><KCard key={i} name={c.name} qty={c.qty} kk={c.kk} tag={c.tag} tagcls={c.tagcls} meta={c.meta}/>)}</div></div>
      <div className="col col-inc"><div className="colh"><span className="ci"></span><span className="ct">Очікується</span><span className="cc">{incCards.length}</span></div>
        <div className="cards">{incCards.map((c,i)=><KCard key={i} name={c.name} qty={c.raw} kk={c.kk} tag={c.tag} tagcls={c.tagcls} meta={c.meta}/>)}</div></div>

      <div className="side">
        <div className="scard"><div className="sh">Боєготовність<span className="dot" style={{background:"var(--green)",boxShadow:"0 0 7px var(--green)"}}></span></div><BdGauge/></div>
        <div className="scard"><div className="sh">Тривоги запасу<span className="dot" style={{background:"var(--red)",boxShadow:"0 0 7px var(--red)"}}></span></div>
          <div className="alerts">{lowStock.map(s=>{const k=accStatus(s);const col=k==="crit"?"var(--red)":"var(--amber)";
            return(<div className="al" key={s.code}><span className="adot" style={{background:col,boxShadow:"0 0 6px "+col}}></span>
              <span className="an">{s.nm}<small>мін. норма {fmt(s.min)} {s.unit}</small></span><span className="av" style={{color:col}}>{fmt(s.qty)}</span></div>);})}</div></div>
        <div className="scard"><div className="sh">Журнал · live<span className="dot" style={{background:"var(--cy)",boxShadow:"0 0 7px var(--cy)"}}></span></div><BdFeed/></div>
      </div>
    </div>
  </div>);
}
window.VBoard=VBoard;
