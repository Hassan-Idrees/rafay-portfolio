export const NAV = ["Home", "About", "Services", "Stack", "Projects", "Reviews", "Contact"];

export const STATS = [
  { v: "4+", l: "Years Experience" },
  { v: "100+", l: "AI Agents Built" },
  { v: "500+", l: "Apps Integrated" },
  { v: "3", l: "Countries Served" },
];

export const SERVICES = [
  { num: "01", icon: "🔧", title: "GHL Expert", desc: "High-converting pipelines, custom triggers, automated reporting, white-label SaaS configurations, and snapshot systems built for scale.", tags: ["Pipelines", "Snapshots", "SaaS"] },
  { num: "02", icon: "🔄", title: "n8n Expert", desc: "API integrations, VAPI & GPT integration, multi-step sequences, and RAG architectures for intelligent automation workflows.", tags: ["RAG", "VAPI", "GPT"] },
  { num: "03", icon: "⚡", title: "Zapier Specialist", desc: "Custom Zaps connecting 500+ apps, conditional logic trees, error handling, and multi-path automations that never break.", tags: ["500+ Apps", "Logic", "Reliability"] },
  { num: "04", icon: "🔄", title: "Make Pro", desc: "Marketing campaign orchestration, order-to-fulfillment pipelines, batch operations, and complex scenario architectures.", tags: ["Campaigns", "Fulfillment", "Batch"] },
  { num: "05", icon: "🤖", title: "AI Agents & Voice", desc: "VAPI voice agents, intelligent chatbots, Pinecone knowledge bases, and ElevenLabs integrations for human-like AI interactions.", tags: ["VAPI", "Pinecone", "ElevenLabs"] },
  { num: "06", icon: "🔗", title: "Custom Integrations", desc: "APIs & webhooks, Google Apps Script solutions, ManyChat bots, and bespoke connectors for tools with no native integration.", tags: ["APIs", "Webhooks", "GAS"] },
];

export const PROJECTS = [
  { title: "AI Lead Qualification Engine", cat: "AI Agents", desc: "Autonomous n8n + GPT-4 pipeline qualifying leads, booking calls, and sending follow-ups — replacing a 3-person SDR team.", m: [["12×", "ROI"], ["4,000+", "Leads"], ["98%", "Accuracy"]], tags: ["n8n", "GPT-4", "VAPI", "GHL"] },
  { title: "White-Label SaaS GHL Build", cat: "GHL", desc: "Complete white-label GoHighLevel SaaS for a marketing agency with 200+ sub-accounts, custom onboarding, and billing automation.", m: [["200+", "Accounts"], ["$40k", "MRR"], ["100%", "Automated"]], tags: ["GHL", "Stripe", "Zapier"] },
  { title: "Voice AI Appointment System", cat: "Voice AI", desc: "VAPI + ElevenLabs voice agent handling inbound calls, qualifying prospects, booking into GHL calendars — 24/7.", m: [["1,200+", "Calls/mo"], ["79%", "Convert"], ["24/7", "Uptime"]], tags: ["VAPI", "ElevenLabs", "GHL", "n8n"] },
  { title: "E-Commerce Order Automation", cat: "Make", desc: "End-to-end Make.com scenario: Shopify → warehouse WMS → shipping → customer SMS. Zero manual order processing.", m: [["6,000+", "Orders/mo"], ["3 hrs", "Saved/day"], ["0", "Manual"]], tags: ["Make", "Shopify", "Twilio", "Slack"] },
  { title: "RAG Knowledge Base Chatbot", cat: "AI", desc: "Pinecone + GPT-4 chatbot for a legal SaaS — 10,000 documents indexed with human-level retrieval accuracy.", m: [["10k+", "Docs"], ["<1.2s", "Speed"], ["94%", "Accuracy"]], tags: ["Pinecone", "GPT-4", "n8n"] },
  { title: "Multi-Channel Nurture System", cat: "Zapier", desc: "47-step automation across email, SMS, LinkedIn, voicemail — triggered by CRM stages, 3× more closed deals.", m: [["47", "Steps"], ["3×", "Close rate"], ["5", "Channels"]], tags: ["Zapier", "ActiveCampaign", "Twilio"] },
];

export const STACK = [
  { cat: "CRM & Automation", items: ["GoHighLevel", "HubSpot", "ActiveCampaign", "Close CRM"] },
  { cat: "Workflow Engines", items: ["n8n", "Make (Integromat)", "Zapier", "Pabbly Connect"] },
  { cat: "AI & Voice", items: ["GPT-4 / OpenAI", "VAPI", "ElevenLabs", "Pinecone"] },
  { cat: "Dev & Scripting", items: ["Google Apps Script", "REST APIs", "Node.js", "Python"] },
  { cat: "Messaging", items: ["Twilio", "Mailgun", "SendGrid", "ManyChat"] },
  { cat: "Analytics", items: ["Looker Studio", "Airtable", "Notion", "Slack"] },
];

export const REVIEWS = [
  { name: "James Whitfield", role: "Agency Owner", loc: "United States", text: "Muhammad Rafay built our entire GHL white-label SaaS from scratch. The automations saved us 40+ hours a week and helped us scale to 200 sub-accounts in under 6 months." },
  { name: "Sarah Mitchell", role: "E-Commerce Director", loc: "Canada", text: "The AI voice agent Rafay deployed for our inbound sales line was a game-changer. It qualifies leads, books demos, and handles objections. ROI was evident within 30 days." },
  { name: "Liam Patterson", role: "Marketing Consultant", loc: "Australia", text: "Rafay's n8n expertise is truly on another level. He built a RAG chatbot for our knowledge base that our team uses daily. Precision and professionalism throughout." },
  { name: "Natalie Brooks", role: "SaaS Founder", loc: "United States", text: "Rafay redesigned our entire onboarding automation in GHL. What used to take 3 days now runs hands-free in 2 hours. He thinks about the business, not just the tech." },
  { name: "Daniel Osei", role: "Growth Lead", loc: "Canada", text: "Our Zapier workflows were a mess. He rebuilt everything — cleaner logic, better error handling, and connected 8 new tools we thought were impossible to integrate." },
  { name: "Emma Thornton", role: "Operations Manager", loc: "Australia", text: "The Make.com automation processes 6,000+ orders/month without a single manual touch. Delivered ahead of schedule and stayed available post-launch." },
];
