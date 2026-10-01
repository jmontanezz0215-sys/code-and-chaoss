const article0="# A practical website checklist for Florida businesses\n\n## Start with the customer’s next step\n\nBefore choosing colors or page counts, decide what a visitor should do. A service company may want a phone call. A store may need a purchase. A professional practice may need a consultation inquiry. Choose one primary action and make the site structure support it.\n\n## Write the useful information first\n\nExplain what you offer, who it is for, and where you work. A short, specific service description is more useful than a broad promise. Make sure contact information is accurate and visible. Do not make customers search through several pages to confirm whether you can help them.\n\n## Check the experience on a phone\n\nReview navigation, reading size, form fields, and call links on a small screen. Long forms and cramped controls make simple tasks harder. Your website should support the customer’s decision even when they are browsing with one hand.\n\n## Plan for the website’s working life\n\nConfirm who owns the accounts, who supplies content, and who handles updates after launch. Ask what is included in maintenance and what is billed separately. These details belong in the proposal so that the website remains manageable as your business changes.\n\n## Bring a clear brief to discovery\n\nGather your existing website link, logo, essential services, service areas, and the questions customers ask most often. You do not need a finished page plan. Useful business information gives the design and development work a stronger starting point.\n";
const article1="# What makes a local service page useful?\n\n## Describe the service, not just the city\n\nA location page should help a customer understand what is available to them. Explain the work, the audience, and the inquiry process. Replacing a city name in a generic paragraph gives visitors very little new information.\n\n## Keep your coverage honest\n\nServing a city and having an office there are different facts. Make that distinction clear. Do not add a fictitious address or business location to create a local impression. Accurate service areas help customers know what to expect.\n\n## Link to the detail that matters\n\nConnect a location page to relevant service explanations, examples, and contact routes. A visitor should be able to move from confirming coverage to evaluating the offer without restarting their search.\n\n## Use evidence you can support\n\nPublish real project examples and approved feedback when you have them. Avoid invented ratings, client counts, or claims about guaranteed rankings. Trust is built through clarity and useful information.\n\n## Review pages as the business changes\n\nUpdate coverage and services when they change. Remove outdated claims and keep contact paths working. Local content is part of the customer experience, so it deserves the same care as your main service pages.\n";
const article2="# Before you redesign: know what to keep\n\n## Inventory your important pages\n\nStart by listing the pages customers use and the content that explains your business well. Review existing inquiry routes and any information your team regularly shares. A redesign should improve those useful assets rather than discard them without a plan.\n\n## Separate appearance from functionality\n\nAn outdated visual design and a broken customer journey are different problems. Identify which parts of the experience need attention. Sometimes targeted improvements are enough; other projects need a broader redesign.\n\n## Plan URL changes carefully\n\nIf page addresses change, plan redirects so visitors and search engines can reach the replacement content. Keep important links and avoid sending every old page to the homepage. Each change should have an intentional destination.\n\n## Review media and scripts\n\nLarge videos, oversized images, and unnecessary scripts can affect loading. Measure the current experience, then prioritize fixes that address real bottlenecks. A visual redesign alone does not guarantee a faster site.\n\n## Test the core journeys before launch\n\nCheck navigation, contact forms, call links, and essential integrations. Review both mobile and desktop layouts. Document how content will be edited and agree on responsibilities for ongoing maintenance.\n";
const article3="# A chatbot should help, not get in the way\n\n## Define a small, useful job\n\nA website assistant can answer common service questions, explain package scope, and help visitors find the right form. It does not need to pretend it can handle every possible request. A clear role makes both its responses and its limitations easier to understand.\n\n## Start with approved business information\n\nKeep services, pricing, contact details, and frequently asked questions in an editable knowledge base. Unverified information should stay out of the assistant’s answers. When a fact is unknown, the assistant should say so and offer a useful next step.\n\n## Make the handoff obvious\n\nVisitors should always have a way to contact a person. A chatbot can direct them to a call link or inquiry form without claiming that a booking happened. Separate answering a question from saving a request or confirming an appointment.\n\n## Ask only for what you need\n\nIf the visitor wants follow-up, collect the information needed for that purpose and explain how it will be used. Avoid requesting sensitive information in chat. A clear form often provides a better place for contact details.\n\n## Keep a fallback available\n\nExternal AI services can be unavailable. A focused FAQ fallback and reliable contact route keep the website useful. Treat the assistant as support for your team, not the only path to help.\n";
function sections(raw:string):string[][] {return raw.split(/^## /m).slice(1).map(s=>{const index=s.indexOf('\n');return[s.slice(0,index).trim(),s.slice(index).trim()];});}
const source=[article0,article1,article2,article3];
export const articles=[
  {
    "slug": "florida-business-website-checklist",
    "title": "A practical website checklist for Florida businesses",
    "category": "Web design",
    "read": "5 min read",
    "excerpt": "The decisions worth making before you invest in a new business website."
  },
  {
    "slug": "useful-local-location-pages",
    "title": "What makes a local service page useful?",
    "category": "Local SEO",
    "read": "4 min read",
    "excerpt": "Build location content around real customer questions and accurate coverage."
  },
  {
    "slug": "before-you-redesign-your-website",
    "title": "Before you redesign: know what to keep",
    "category": "Development",
    "read": "4 min read",
    "excerpt": "Protect useful content and customer journeys while planning a better website."
  },
  {
    "slug": "chatbots-that-help-customers",
    "title": "A chatbot should help, not get in the way",
    "category": "Automation",
    "read": "4 min read",
    "excerpt": "Give your assistant a focused role, approved answers, and a clear human handoff."
  }
].map((a,i)=>({...a,sections:sections(source[i])}));
