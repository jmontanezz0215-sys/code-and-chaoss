import {site} from '@/data/site.config';
import {services} from '@/data/services';
import {locations} from '@/data/locations';
import {portfolio} from '@/data/portfolio';
import {articles} from '@/data/insights';
export function GET(){const paths=['','services','locations','portfolio','pricing','about','insights','contact','audit','faq','privacy','terms','accessibility',...services.map(s=>'services/'+s.slug),...locations.map(l=>'locations/'+l.slug),...portfolio.map(p=>'portfolio/'+p.slug),...articles.map(a=>'insights/'+a.slug)];const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+site.origin+'/'+p+'</loc></url>').join('')+'</urlset>';return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});}
