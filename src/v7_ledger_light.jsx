// ============================================================
//  ВАРІАНТ 7 — ВІДОМІСТЬ РУХУ (світла довідка, паперова)
//  Той самий обліковий реєстр, що й №06, у стилі доповіді №03.
//  Спільні дані: MOVEMENT, MV_TOT, MV_MOVEMAX, exportMovementCSV, LG_TABS
// ============================================================
const VLGL_CSS = `
.v-lgl{--paper:#f3f1ea;--card:#fbfaf6;--ink:#23271f;--ink2:#4a5040;--dim:#7d8472;--faint:#a8ad9c;
  --line:#d9d6c8;--line2:#c7c4b3;--rule:#e7e4d7;--olive:#4a5a32;--olive-d:#37431f;
  --green:#3f6b3a;--green-soft:#7d9a5a;--amber:#b07a17;--amber-soft:#d6b06a;--red:#a8341f;
  background:var(--paper);color:var(--ink);font-family:var(--sans);min-height:100vh;position:relative;padding:0}
.v-lgl .wrap{max-width:1640px;margin:0 auto;padding:30px 40px 60px}

/* шапка */
.v-lgl .dochead{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;
  border-bottom:2.5px solid var(--olive-d);padding-bottom:18px;margin-bottom:24px}
.v-lgl .dochead .cls{font-family:var(--mono);font-size:10px;letter-spacing:.3em;color:var(--olive);text-transform:uppercase;margin-bottom:10px}
.v-lgl .dochead h1{font-family:var(--serif);font-weight:600;font-size:32px;line-height:1.06;color:var(--olive-d);letter-spacing:-.01em}
.v-lgl .dochead .sub{font-size:13px;color:var(--ink2);margin-top:8px}
.v-lgl .dochead .sub b{color:var(--olive-d);font-weight:600}
.v-lgl .dochead .meta{flex:none;text-align:right;font-family:var(--mono);font-size:10.5px;letter-spacing:.05em;color:var(--dim);line-height:1.95}
.v-lgl .dochead .meta b{color:var(--olive-d)}
.v-lgl .dochead .meta .clk{font-family:var(--serif);font-size:24px;font-weight:600;color:var(--olive-d)}

/* рівняння руху */
.v-lgl .equation{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1.06fr;align-items:stretch;
  border:1px solid var(--line2);background:var(--card);margin-bottom:26px}
.v-lgl .eq{padding:18px 22px;position:relative}
.v-lgl .eq .el{font-family:var(--mono);font-size:9.5px;letter-spacing:.13em;color:var(--dim);text-transform:uppercase}
.v-lgl .eq .en{font-family:var(--serif);font-weight:600;font-size:44px;line-height:.95;color:var(--olive-d);margin-top:9px;font-variant-numeric:tabular-nums}
.v-lgl .eq .ef{font-family:var(--mono);font-size:10px;color:var(--faint);margin-top:9px;letter-spacing:.03em}
.v-lgl .eq.rec .en{color:var(--green)}.v-lgl .eq.iss .en{color:var(--amber)}
.v-lgl .eq.close{background:var(--olive-d);color:#eef0e6}
.v-lgl .eq.close .el{color:rgba(255,255,255,.7)}.v-lgl .eq.close .en{color:#fff}.v-lgl .eq.close .ef{color:rgba(255,255,255,.55)}
.v-lgl .op{display:flex;align-items:center;justify-content:center;width:50px;font-family:var(--serif);font-weight:400;
  font-size:32px;color:var(--faint);background:#efece2;border-left:1px solid var(--line);border-right:1px solid var(--line)}
.v-lgl .op.plus{color:var(--green-soft)}.v-lgl .op.minus{color:var(--amber-soft)}

/* керування */
.v-lgl .toolbar{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.v-lgl .tabs{display:flex;border:1px solid var(--line2);background:var(--card)}
.v-lgl .tab{font-family:var(--mono);font-size:10px;letter-spacing:.08em;padding:8px 15px;background:transparent;border:0;
  border-right:1px solid var(--line);color:var(--dim);cursor:pointer;text-transform:uppercase;transition:.15s;white-space:nowrap}
.v-lgl .tab:last-child{border-right:0}
.v-lgl .tab:hover{color:var(--ink);background:#efece2}
.v-lgl .tab.on{color:var(--card);background:var(--olive);font-weight:600}
.v-lgl .toggle{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:10px;letter-spacing:.06em;
  color:var(--dim);text-transform:uppercase;padding:8px 14px;border:1px solid var(--line2);background:var(--card);cursor:pointer;transition:.15s}
.v-lgl .toggle:hover{color:var(--ink);border-color:var(--olive)}
.v-lgl .toggle.on{color:var(--olive-d);border-color:var(--olive);background:#e9ecdc}
.v-lgl .toggle .box{width:11px;height:11px;border:1px solid currentColor;display:inline-flex;align-items:center;justify-content:center;font-size:9px}
.v-lgl .toggle.exp{color:#3a6285;border-color:#b9c4cf}
.v-lgl .toggle.exp:hover{color:#27465f;border-color:#7d97ad;background:#e6ecf1}
.v-lgl .tb-right{margin-left:auto;font-family:var(--mono);font-size:10px;letter-spacing:.05em;color:var(--faint)}
.v-lgl .tb-right b{color:var(--ink2)}

/* реєстр */
.v-lgl .ledger{border:1px solid var(--line2);background:var(--card)}
.v-lgl table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}
.v-lgl thead th{position:sticky;top:0;z-index:5;background:#eceadf;
  font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);font-weight:400;
  text-align:right;padding:11px 14px;border-bottom:1.5px solid var(--line2);white-space:nowrap}
.v-lgl thead th.l{text-align:left}
.v-lgl thead th.c{text-align:center}
.v-lgl thead th .u{display:block;font-size:8px;color:var(--faint);letter-spacing:.08em;margin-top:2px}

.v-lgl .grp td{background:#eef0e3;padding:9px 14px;border-top:1px solid var(--line2);border-bottom:1px solid var(--line)}
.v-lgl .grp .gt{display:flex;align-items:center;gap:11px}
.v-lgl .grp .gi{font-family:var(--serif);font-weight:600;font-size:14px;color:var(--olive-d)}
.v-lgl .grp .gc{font-family:var(--mono);font-size:9.5px;color:var(--faint);letter-spacing:.05em}
.v-lgl .grp .gspark{margin-left:auto;display:flex;align-items:center;gap:14px;font-family:var(--mono);font-size:10px;color:var(--dim)}
.v-lgl .grp .gspark b{font-family:var(--serif);font-weight:600;font-size:14px}
.v-lgl .grp .gspark .pg{color:var(--green)}.v-lgl .grp .gspark .pa{color:var(--amber)}

.v-lgl tbody tr.row td{padding:9px 14px;border-bottom:1px solid var(--rule);text-align:right;font-size:13px}
.v-lgl tbody tr.row:nth-child(even) td{background:#f6f4ec}
.v-lgl tbody tr.row:hover td{background:#eef0e3}
.v-lgl tbody tr.row.moved td{background:#f1f4e7}
.v-lgl tbody tr.row.moved:hover td{background:#e8ecda}
.v-lgl tbody tr.row td.cnum{font-family:var(--mono);color:var(--faint);font-size:10.5px;text-align:right;width:42px}
.v-lgl tbody tr.row td.cname{text-align:left}
.v-lgl .cname .nm{font-weight:600;font-size:13px;color:var(--ink)}
.v-lgl .cname .cd{font-family:var(--mono);font-size:9.5px;color:var(--faint);letter-spacing:.03em;margin-top:1px}
.v-lgl .open{font-family:var(--mono);font-size:13px;color:var(--ink2)}
.v-lgl .rec{font-family:var(--mono);font-size:13px;color:var(--green);font-weight:600}
.v-lgl .iss{font-family:var(--mono);font-size:13px;color:var(--amber);font-weight:600}
.v-lgl .zero{color:var(--faint);font-weight:400}
.v-lgl .clos{font-family:var(--serif);font-weight:600;font-size:16px;color:var(--olive-d)}
.v-lgl .delta{font-family:var(--mono);font-size:9.5px;letter-spacing:.03em;margin-top:2px;display:block}
.v-lgl .delta.up{color:var(--green)}.v-lgl .delta.down{color:var(--red)}.v-lgl .delta.flat{color:var(--faint)}

.v-lgl .cmove{width:188px}
.v-lgl .mbar{position:relative;height:16px;width:100%}
.v-lgl .mbar .axis{position:absolute;left:50%;top:-1px;bottom:-1px;width:1px;background:var(--line2)}
.v-lgl .mbar .seg{position:absolute;top:3px;height:10px;transition:width .8s cubic-bezier(.2,.7,.2,1)}
.v-lgl .mbar .seg.out{right:50%;background:repeating-linear-gradient(-45deg,var(--amber),var(--amber) 4px,var(--amber-soft) 4px,var(--amber-soft) 8px)}
.v-lgl .mbar .seg.in{left:50%;background:linear-gradient(90deg,var(--green-soft),var(--green))}

.v-lgl tr.sub td{padding:8px 14px;border-bottom:1px solid var(--line);border-top:1.5px solid var(--line2);
  text-align:right;font-family:var(--mono);font-size:11px;color:var(--ink2);background:#eceadf}
.v-lgl tr.sub .sl{text-align:left;color:var(--dim);letter-spacing:.08em;text-transform:uppercase;font-size:9.5px}
.v-lgl tr.sub .pg{color:var(--green)}.v-lgl tr.sub .pa{color:var(--amber)}
.v-lgl tr.sub .sc{font-family:var(--serif);font-weight:600;font-size:14px;color:var(--olive-d)}

.v-lgl tfoot td{padding:14px;border-top:2.5px solid var(--olive-d);background:#eef0e3;
  text-align:right;font-family:var(--serif);font-weight:600;font-size:18px;color:var(--olive-d)}
.v-lgl tfoot .fl{text-align:left;font-family:var(--mono);font-weight:400;font-size:10px;letter-spacing:.14em;
  text-transform:uppercase;color:var(--olive);align-self:center}
.v-lgl tfoot .pg{color:var(--green)}.v-lgl tfoot .pa{color:var(--amber)}

.v-lgl .foot{display:flex;align-items:stretch;gap:16px;margin-top:20px}
.v-lgl .note{flex:1;background:#f7eede;border:1px solid #e3cfa6;border-left:4px solid var(--amber);padding:15px 18px;font-size:13px;line-height:1.5;color:var(--ink2)}
.v-lgl .note b{font-family:var(--serif);font-size:14px;color:#7a5410;font-weight:600}
.v-lgl .legend{flex:none;display:flex;flex-direction:column;justify-content:center;gap:9px;border:1px solid var(--line);background:var(--card);padding:15px 20px}
.v-lgl .legend .lk{display:flex;align-items:center;gap:9px;font-family:var(--mono);font-size:10px;color:var(--dim);letter-spacing:.03em}
.v-lgl .legend .sw{width:18px;height:9px;flex:none}
.v-lgl .sign{margin-top:18px;display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;color:var(--faint);letter-spacing:.04em;border-top:1px solid var(--line2);padding-top:14px}

@media(max-width:1120px){.v-lgl .dochead{flex-direction:column;align-items:flex-start;gap:12px}.v-lgl .dochead .meta{text-align:left}}
@media(max-width:1280px){.v-lgl .equation{grid-template-columns:1fr auto 1fr auto 1fr}
  .v-lgl .eq.close{grid-column:1/-1;border-top:1px solid var(--line)}.v-lgl .cmove{display:none}}
@media(max-width:880px){.v-lgl .equation{grid-template-columns:1fr}.v-lgl .op{display:none}
  .v-lgl .eq{border-bottom:1px solid var(--line)}.v-lgl .dochead{flex-direction:column;align-items:flex-start;gap:14px}
  .v-lgl .dochead .meta{text-align:left}.v-lgl .foot{flex-direction:column}}
`;

function MoveBarL({rec,iss,mounted}){
  const inW = mounted ? (rec/MV_MOVEMAX*50) : 0;
  const outW = mounted ? (iss/MV_MOVEMAX*50) : 0;
  return(<div className="mbar">
    <span className="axis"></span>
    <span className="seg out" style={{width:outW+"%"}}></span>
    <span className="seg in" style={{width:inW+"%"}}></span>
  </div>);
}
function numL(n, cls){
  return n===0 ? <span className="zero">—</span> : <span className={cls}>{fmt(n)}</span>;
}

function VLedgerLight(){
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

  return(<div className="v-lgl"><style dangerouslySetInnerHTML={{__html:VLGL_CSS}}/>
    <div className="wrap">

      <div className="dochead">
        <div>
          <div className="cls">Для службового користування · відомість № 07/07</div>
          <h1>Відомість наявності та&nbsp;руху майна</h1>
          <div className="sub">Служба авіації та протиповітряної оборони · оперативний склад БпЛА · станом на <b>02.06.2026</b></div>
        </div>
        <div className="meta">
          <div className="clk">{fmtTime(now)}</div>
          {fmtDate(now)}<br/>
          ПОЗИЦІЙ <b>{MV_POSITIONS}</b> · РУХ <b>{MV_MOVED}</b><br/>
          АРКУШ <b>1/1</b> · РЕД. 07
        </div>
      </div>

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
                    <td>{numL(it.rec,"rec")}</td>
                    <td>{numL(it.iss,"iss")}</td>
                    <td><span className="clos">{fmt(it.close)}</span>
                      <span className={"delta "+dcls}>{dtxt}</span></td>
                    <td className="cmove"><MoveBarL rec={it.rec} iss={it.iss} mounted={mounted}/></td>
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

      <div className="foot">
        <div className="note"><b>Увага командиру.</b> Найбільший добовий оборот — <b style={{color:"var(--ink)"}}>FPV ОВ 10 км</b> (прихід +300, видача −264).
          Антенно-щоглове майно (Avenger) видано −2 при критичному залишку <b style={{color:"var(--ink)"}}>20</b> од. — потрібне погодження поставки #2207.</div>
        <div className="legend">
          <div className="lk"><span className="sw" style={{background:"linear-gradient(90deg,var(--green-soft),var(--green))"}}></span> отримано (прихід)</div>
          <div className="lk"><span className="sw" style={{background:"repeating-linear-gradient(-45deg,var(--amber),var(--amber) 4px,var(--amber-soft) 4px,var(--amber-soft) 8px)"}}></span> видано (витрата)</div>
        </div>
      </div>

      <div className="sign">
        <span>Уклав: черговий складу · Служба авіації та ППО</span>
        <span>Відомість руху · оновлюється щодоби о 00:00 · дані демонстраційні</span>
      </div>

    </div>
  </div>);
}
window.VLedgerLight = VLedgerLight;
