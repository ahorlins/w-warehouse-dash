// ============================================================
//  ВАРІАНТ 2 — СХЕМА СКЛАДУ (просторовий план, кресленик)
// ============================================================
const VBP_CSS = `
.v-bp{--bg:#070d14;--cy:oklch(0.82 0.12 215);--cy-dim:oklch(0.62 0.09 215);--ink:#bcd2e0;--dim:#6d8497;
  --faint:#46586a;--line:rgba(90,150,190,0.18);--line2:rgba(110,180,225,0.34);--amber:oklch(0.82 0.14 80);--red:oklch(0.68 0.2 26);--green:oklch(0.8 0.16 152);
  color:var(--ink);font-family:var(--mono);position:relative;padding:18px 20px 48px;background:var(--bg)}
.v-bp::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:linear-gradient(rgba(90,150,190,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(90,150,190,.07) 1px,transparent 1px),
  linear-gradient(rgba(90,150,190,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(90,150,190,.03) 1px,transparent 1px);
  background-size:80px 80px,80px 80px,16px 16px,16px 16px}
.v-bp>*{position:relative;z-index:1}
.v-bp .bphead{display:flex;align-items:flex-end;justify-content:space-between;border-bottom:1px solid var(--line2);padding-bottom:12px;margin-bottom:16px}
.v-bp .bptitle{font-family:var(--disp);font-weight:600;font-size:22px;letter-spacing:.14em;color:#dcecf6;text-transform:uppercase}
.v-bp .bpsub{font-size:10.5px;letter-spacing:.18em;color:var(--cy);text-transform:uppercase;margin-top:5px}
.v-bp .bpmeta{text-align:right;font-size:10px;color:var(--dim);letter-spacing:.1em;line-height:1.7}
.v-bp .bpmeta b{color:var(--cy)}
.v-bp .grid2{display:grid;grid-template-columns:1fr 340px;gap:18px;align-items:start}
.v-bp .drawing{position:relative;border:1px solid var(--line2);background:rgba(20,40,60,.18);padding:0}
.v-bp .dwg-tb{display:flex;align-items:center;justify-content:space-between;padding:9px 14px;border-bottom:1px dashed var(--line);font-size:9.5px;letter-spacing:.14em;color:var(--cy-dim);text-transform:uppercase}
.v-bp .floor{position:relative;padding:30px 34px}
.v-bp .floor svg{display:block;width:100%;height:auto}
.v-bp .zlabel{cursor:pointer}
.v-bp .zrect{fill:rgba(40,80,110,.22);stroke:var(--line2);stroke-width:1.2;transition:.18s}
.v-bp .zlabel:hover .zrect{fill:rgba(80,160,210,.18);stroke:var(--cy)}
.v-bp .zlabel.sel .zrect{fill:rgba(80,170,220,.26);stroke:var(--cy);stroke-width:2}
.v-bp .zfill{transition:.6s}
.v-bp .ztxt{fill:#cfe6f3;font-family:var(--disp);font-weight:600;letter-spacing:.05em}
.v-bp .zsub{fill:var(--dim);font-family:var(--mono);letter-spacing:.04em}
.v-bp .zpct{fill:var(--cy);font-family:var(--disp);font-weight:600}
.v-bp .dim-line{stroke:var(--cy-dim);stroke-width:.8}
.v-bp .dim-txt{fill:var(--cy-dim);font-family:var(--mono);font-size:9px;letter-spacing:.1em}
.v-bp .znote-svg{font-family:var(--mono);font-size:8px;letter-spacing:.12em}
.v-bp .zdetail{margin-top:14px;border:1px solid var(--line);background:rgba(20,40,60,.2);padding:14px 16px;display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center}
.v-bp .zdetail .zbig{font-family:var(--disp);font-weight:700;font-size:38px;color:var(--cy);line-height:1}
.v-bp .zdetail .zinfo .zt{font-family:var(--disp);font-size:15px;letter-spacing:.08em;color:#dcecf6;text-transform:uppercase}
.v-bp .zdetail .zinfo .zd{font-size:10.5px;color:var(--dim);letter-spacing:.06em;margin-top:4px}
.v-bp .zdetail .zstat{text-align:right}
.v-bp .zdetail .zstat .n{font-family:var(--disp);font-size:24px;color:#dcecf6}
.v-bp .zdetail .zstat .l{font-size:9px;letter-spacing:.12em;color:var(--faint);text-transform:uppercase}
.v-bp .side{display:flex;flex-direction:column;gap:14px}
.v-bp .card{border:1px solid var(--line);background:rgba(15,30,46,.4)}
.v-bp .ch{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px dashed var(--line);font-size:9.5px;letter-spacing:.16em;color:var(--cy);text-transform:uppercase}
.v-bp .ch .no{color:var(--faint)}
.v-bp .cb{padding:13px 15px}
.v-bp .rd-big{display:flex;align-items:baseline;gap:10px}
.v-bp .rd-big .n{font-family:var(--disp);font-weight:700;font-size:52px;color:#dcecf6;line-height:.9}
.v-bp .rd-big .s{font-size:22px;color:var(--cy)}
.v-bp .rd-big .lbl{font-size:10px;letter-spacing:.14em;color:var(--dim);text-transform:uppercase}
.v-bp .rd-bar{height:7px;background:rgba(255,255,255,.05);margin-top:12px;border:1px solid var(--line)}
.v-bp .rd-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--cy-dim),var(--cy));transition:width 1.2s}
.v-bp .rd-split{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px;text-align:center}
.v-bp .rd-split .b{border:1px solid var(--line);padding:7px 4px}
.v-bp .rd-split .b .n{font-family:var(--disp);font-size:18px;color:#cfe6f3}
.v-bp .rd-split .b .l{font-size:8px;letter-spacing:.08em;color:var(--faint);text-transform:uppercase;margin-top:2px}
.v-bp .fib{display:flex;flex-direction:column;gap:9px}
.v-bp .fibrow{display:grid;grid-template-columns:64px 1fr 44px;gap:9px;align-items:center;font-size:10.5px}
.v-bp .fibrow .fl{color:var(--cy);letter-spacing:.04em}
.v-bp .fibbar{height:6px;background:rgba(255,255,255,.05)}
.v-bp .fibbar i{display:block;height:100%;background:repeating-linear-gradient(90deg,var(--cy),var(--cy) 3px,transparent 3px,transparent 5px);transition:width .9s}
.v-bp .fibrow .fn{text-align:right;color:var(--ink)}
.v-bp .alist{display:flex;flex-direction:column}
.v-bp .arow{display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px solid var(--line);font-size:10.5px}
.v-bp .arow:last-child{border-bottom:0}
.v-bp .adot{width:6px;height:6px;flex:none;border-radius:50%}
.v-bp .arow .an{flex:1;color:var(--ink)}.v-bp .arow .an small{color:var(--faint);display:block;font-size:9px;margin-top:1px}
.v-bp .arow .aq{color:var(--cy);font-family:var(--disp);font-size:15px}
.v-bp .stripe{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:16px}
.v-bp .scell{border:1px solid var(--line);background:rgba(15,30,46,.4);padding:13px 15px}
.v-bp .scell .sl{font-size:9px;letter-spacing:.14em;color:var(--dim);text-transform:uppercase}
.v-bp .scell .sv{font-family:var(--disp);font-weight:600;font-size:30px;color:#dcecf6;margin-top:6px;line-height:1}
.v-bp .scell .sv .u{font-size:14px;color:var(--cy)}
.v-bp .scell .sf{font-size:9.5px;color:var(--faint);margin-top:6px;letter-spacing:.04em}
@media(max-width:1200px){.v-bp .grid2{grid-template-columns:1fr}.v-bp .stripe{grid-template-columns:repeat(2,1fr)}}
`;

// геометрія зон у системі координат креслення (1000 x 560)
const BP_ZONES = [
  { id:"A", x:30,  y:40,  w:330, h:250, fillH:true },
  { id:"B", x:380, y:40,  w:250, h:160 },
  { id:"C", x:650, y:40,  w:320, h:160 },
  { id:"D", x:380, y:220, w:300, h:270, fillH:true },
  { id:"E", x:700, y:220, w:270, h:140 },
  { id:"F", x:700, y:380, w:270, h:110 },
];

function VBlueprint(){
  const [sel,setSel]=useState("A");
  const z=ZONES.find(x=>x.id===sel);
  const zg=BP_ZONES.find(x=>x.id===sel);
  const now=useClock();
  const fc={ok:"var(--green)",amber:"var(--amber)",red:"var(--red)"};
  const rdyPct=Math.round((fleetTotals.rdy+fleetTotals.iss)/fleetTotal*100);
  return(<div className="v-bp"><style dangerouslySetInnerHTML={{__html:VBP_CSS}}/>
    <div className="bphead">
      <div><div className="bptitle">Схема складу · план зон</div>
        <div className="bpsub">Служба авіації та ППО · кресл. СКЛ-БпЛА-01 · М 1:200</div></div>
      <div className="bpmeta">АРКУШ <b>1/1</b> · РЕД. 14<br/>ОНОВЛЕНО <b>{fmtTime(now)}</b><br/>ПОЗИЦІЙ <b>{fmt(1550)}</b></div>
    </div>

    <div className="grid2">
      <div>
        <div className="drawing">
          <div className="dwg-tb"><span>↳ план поверху · клік по зоні</span><span>загальна площа 1 240 м²</span></div>
          <div className="floor">
            <svg viewBox="0 0 1000 560">
              {/* зовнішні розмірні лінії */}
              <line className="dim-line" x1="30" y1="20" x2="970" y2="20"/>
              <text className="dim-txt" x="500" y="14" textAnchor="middle">62.0 м</text>
              <line className="dim-line" x1="14" y1="40" x2="14" y2="490"/>
              <text className="dim-txt" x="10" y="270" textAnchor="middle" transform="rotate(-90 10 270)">20.0 м</text>
              {/* стіни */}
              <rect x="30" y="40" width="940" height="450" fill="none" stroke="var(--line2)" strokeWidth="2"/>
              {/* зони */}
              {BP_ZONES.map(g=>{
                const zo=ZONES.find(x=>x.id===g.id); const on=g.id===sel;
                const fillW = g.w*(zo.occ/100);
                return(<g key={g.id} className={"zlabel"+(on?" sel":"")} onClick={()=>setSel(g.id)}>
                  <rect className="zrect" x={g.x} y={g.y} width={g.w} height={g.h}/>
                  <rect className="zfill" x={g.x} y={g.y+g.h-6} width={fillW} height="6"
                    fill={zo.occ>80?"var(--amber)":"var(--cy)"} opacity="0.8"/>
                  <text className="ztxt" x={g.x+14} y={g.y+30} fontSize="22">{g.id}</text>
                  <text className="zsub" x={g.x+40} y={g.y+29} fontSize="11">{zo.nm}</text>
                  <text className="zpct" x={g.x+14} y={g.y+g.h-18} fontSize="20">{zo.occ}%</text>
                  <text className="zsub" x={g.x+14} y={g.y+g.h-34} fontSize="10">{fmt(zo.units)} од.</text>
                  {zo.note&&<text className="znote-svg" x={g.x+g.w-12} y={g.y+22} textAnchor="end" fill={fc[zo.flag]}>● {zo.note}</text>}
                </g>);
              })}
              {/* вісь дверей */}
              <text className="dim-txt" x="800" y="508" textAnchor="middle">▼ В'ЇЗД / РАМПА</text>
              <line className="dim-line" x1="740" y1="490" x2="860" y2="490" strokeWidth="3" stroke="var(--cy)"/>
            </svg>
          </div>
        </div>
        <div className="zdetail">
          <span className="zbig">{z.id}</span>
          <div className="zinfo"><div className="zt">{z.nm}</div>
            <div className="zd">Заповнення {z.occ}% · {fmt(z.units)} одиниць зберігання{z.note?" · позначка: "+z.note:""}</div></div>
          <div className="zstat"><div className="n">{z.occ}%</div><div className="l">завантаж.</div></div>
        </div>

        <div className="stripe">
          <div className="scell"><div className="sl">FPV у парку</div><div className="sv">{fmt(fleetTotal)}</div><div className="sf">за довжиною ОВ</div></div>
          <div className="scell"><div className="sl">Платформи DJI / Autel</div><div className="sv">{fmt(platTot)}</div><div className="sf">розвідка + ударні</div></div>
          <div className="scell"><div className="sl">Видано підрозділам</div><div className="sv">{fmt(fleetTotals.iss)}</div><div className="sf">{activeUnits} отримувачів</div></div>
          <div className="scell"><div className="sl">Низький запас</div><div className="sv" style={{color:"var(--amber)"}}>{lowStockCount}</div><div className="sf">позицій потребують</div></div>
        </div>
      </div>

      <div className="side">
        <div className="card"><div className="ch"><span className="no">[01]</span> Боєготовність</div>
          <div className="cb">
            <div className="rd-big"><span className="n">{READINESS}<span className="s">%</span></span>
              <span className="lbl">придатні до<br/>застосування</span></div>
            <div className="rd-bar"><i style={{width:READINESS+"%"}}></i></div>
            <div className="rd-split">
              <div className="b"><div className="n">{fmt(fleetTotals.rdy)}</div><div className="l">Готові</div></div>
              <div className="b"><div className="n">{fmt(fleetTotals.iss)}</div><div className="l">Видано</div></div>
              <div className="b"><div className="n">{fmt(fleetTotals.rep)}</div><div className="l">Ремонт</div></div>
            </div>
          </div>
        </div>

        <div className="card"><div className="ch"><span className="no">[02]</span> FPV · довжина оптоволокна</div>
          <div className="cb"><div className="fib">
            {FIBER.map(f=>{const tot=f.rdy+f.iss+f.rep;const mx=Math.max(...FIBER.map(x=>x.rdy+x.iss+x.rep));
              return(<div className="fibrow" key={f.label}><span className="fl">{f.len}</span>
                <span className="fibbar"><i style={{width:(tot/mx*100)+"%"}}></i></span>
                <span className="fn">{fmt(tot)}</span></div>);})}
          </div></div>
        </div>

        <div className="card"><div className="ch"><span className="no">[03]</span> Тривоги запасу</div>
          <div className="cb"><div className="alist">
            {lowStock.map(s=>{const st=accStatus(s);return(<div className="arow" key={s.code}>
              <span className="adot" style={{background:st==="crit"?"var(--red)":"var(--amber)",boxShadow:"0 0 6px currentColor"}}></span>
              <span className="an">{s.nm}<small>{s.code} · мін. {fmt(s.min)} {s.unit}</small></span>
              <span className="aq" style={{color:st==="crit"?"var(--red)":"var(--amber)"}}>{fmt(s.qty)}</span></div>);})}
          </div></div>
        </div>
      </div>
    </div>
  </div>);
}
window.VBlueprint=VBlueprint;
