'use client';
import {useEffect,useRef,useState} from 'react';
export function HeroVideo(){
 const ref=useRef<HTMLVideoElement>(null);const[paused,setPaused]=useState(true);const[failed,setFailed]=useState(false);
 useEffect(()=>{const query=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{const video=ref.current;if(!video)return;video.muted=true;video.defaultMuted=true;if(query.matches)video.pause();else void video.play().then(()=>setPaused(video.paused)).catch(()=>setPaused(true));};update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
 async function toggle(){const video=ref.current;if(!video)return;if(video.paused){video.muted=true;try{await video.play();}catch{setPaused(true);}}else video.pause();}
 return <><video ref={ref} className="hero-video" autoPlay muted loop playsInline width={1280} height={720} preload="metadata" poster="/logo.webp" aria-hidden="true" onPlay={()=>setPaused(false)} onPause={()=>setPaused(true)} onError={()=>{setFailed(true);setPaused(true);}}><source src="/hero.mp4" type="video/mp4"/></video>{!failed&&<button className="video-toggle" aria-label={paused?'Play background video':'Pause background video'} onClick={toggle}>{paused?'Play motion':'Pause motion'}</button>}</>;
}
