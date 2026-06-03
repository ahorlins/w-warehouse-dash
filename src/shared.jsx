// ============================================================
//  СПІЛЬНІ ХУКИ ТА ПРИМІТИВИ
// ============================================================
const { useState, useEffect, useRef, useCallback } = React;

const WD = ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"];
const MN = ["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру"];
const p2 = (n) => String(n).padStart(2,"0");

function useClock(){
  const [now,setNow] = useState(new Date());
  useEffect(()=>{ const i=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(i); },[]);
  return now;
}
function fmtTime(d){ return `${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`; }
function fmtDate(d){ return `${WD[d.getDay()]} · ${p2(d.getDate())} ${MN[d.getMonth()]} ${d.getFullYear()}`; }

function useCountUp(target, dur=1100){
  const [v,setV]=useState(target);
  useEffect(()=>{
    // якщо вкладка неактивна — показуємо одразу кінцеве значення (без анімації)
    if(typeof document!=="undefined" && document.hidden){ setV(target); return; }
    let raf,start,done=false;
    setV(0);
    const tick=(ts)=>{ if(!start)start=ts; const p=Math.min((ts-start)/dur,1);
      setV(target*(1-Math.pow(1-p,3))); if(p<1)raf=requestAnimationFrame(tick); else done=true; };
    raf=requestAnimationFrame(tick);
    const safety=setTimeout(()=>{ if(!done) setV(target); }, dur+250);
    const onVis=()=>{ if(document.hidden){ setV(target); cancelAnimationFrame(raf); } };
    document.addEventListener("visibilitychange",onVis);
    return ()=>{ cancelAnimationFrame(raf); clearTimeout(safety); document.removeEventListener("visibilitychange",onVis); };
  },[target]);
  return v;
}

// живий журнал — спільний рушій для всіх варіантів
function useLiveLog(intervalBase=4200){
  const [log,setLog]=useState(INITIAL_LOG);
  const [paused,setPaused]=useState(false);
  const idRef=useRef(100);
  useEffect(()=>{
    if(paused) return;
    const tick=()=>{
      const seed=LOG_SEED[Math.floor(Math.random()*LOG_SEED.length)];
      const d=new Date();
      setLog(prev=>[{id:idRef.current++,time:`${p2(d.getHours())}:${p2(d.getMinutes())}`,...seed},...prev].slice(0,60));
    };
    const i=setInterval(tick,intervalBase+Math.random()*3500);
    return ()=>clearInterval(i);
  },[paused,intervalBase]);
  return {log,paused,setPaused};
}

// мінікомпонент: відсотковий стек (готові/видано/ремонт)
function readinessOf(o){ const tot=o.rdy+o.iss+o.rep; return Math.round((o.rdy+o.iss)/tot*100); }

// ============================================================
//  ОБОЛОНКА З ПЕРЕМИКАЧЕМ ВАРІАНТІВ
// ============================================================
const VARIANTS = [
  { key:"command",  no:"01", name:"Командний центр",   tag:"тактична сітка",     theme:"dark"  },
  { key:"blueprint",no:"02", name:"Схема складу",       tag:"просторовий план",   theme:"dark"  },
  { key:"brief",    no:"03", name:"Зведення командиру", tag:"світла доповідь",    theme:"light" },
  { key:"terminal", no:"04", name:"Термінал обліку",    tag:"моноширинний",       theme:"dark"  },
  { key:"board",    no:"05", name:"Дошка готовності",   tag:"статусна дошка",     theme:"dark"  },
];

function Shell(){
  const [active,setActive] = useState(()=> localStorage.getItem("wh_variant") || "command");
  useEffect(()=>{
    localStorage.setItem("wh_variant",active);
    const v=VARIANTS.find(x=>x.key===active);
    document.body.dataset.theme = v ? v.theme : "dark";
  },[active]);

  const Variants = {
    command: window.VCommand, blueprint: window.VBlueprint,
    brief: window.VBrief, terminal: window.VTerminal, board: window.VBoard,
  };
  const Cur = Variants[active] || (()=> <div style={{padding:40}}>…</div>);
  const meta = VARIANTS.find(v=>v.key===active);

  return (
    <React.Fragment>
      <div className="switcher">
        <div className="sw-brand">
          <span className="sw-dia"></span>
          <span className="sw-name">СЛУЖБА АВІАЦІЇ ТА ППО</span>
          <span className="sw-sub">оперативний склад БпЛА</span>
        </div>
        <div className="sw-tabs">
          {VARIANTS.map(v=>(
            <button key={v.key}
              className={"sw-tab"+(v.key===active?" on":"")}
              onClick={()=>setActive(v.key)}>
              <span className="sw-no">{v.no}</span>
              <span className="sw-tn">{v.name}</span>
              <span className="sw-tg">{v.tag}</span>
            </button>
          ))}
        </div>
        <div className="sw-hint">
          <span className="sw-demo">ДЕМО · {meta.no}/05</span>
          <span className="sw-key">демонстрація варіантів інтерфейсу</span>
        </div>
      </div>
      <div className="stage" key={active}>
        <Cur/>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, {
  useClock, fmtTime, fmtDate, useCountUp, useLiveLog, readinessOf, p2,
  Shell, VARIANTS,
});
