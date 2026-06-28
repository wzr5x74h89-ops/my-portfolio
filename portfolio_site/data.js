// ═══════════════════════════════════════════════════════
//  PORTFOLIO DATA — Edit everything here or via Admin UI
// ═══════════════════════════════════════════════════════

const ADMIN_PASSWORD = "jedadmin2025"; // Change this!

const SITE_DATA = {

  name: "Jed",
  tagline: "Short-Form Video Editor",
  location: "Philippines",
  contact_email: "hello@jedcreative.com",
  contact_ig: "@jedcreative",
  cal_link: "https://cal.com/jed",

  hero_headline: "Video that moves\npeople to buy.",
  hero_sub: "Short-form editor for DTC brands and performance marketers.\nI make content that stops the scroll and drives conversions — not just views.",
  availability_text: "Available — 2 spots open Q3 2025",
  spots_open: 2,

  stats: {
    views:    { value: 47000000, label: "views generated",      suffix: "" },
    videos:   { value: 300,      label: "videos delivered",     suffix: "+" },
    brands:   { value: 12,       label: "brands scaled",        suffix: "" },
    turnaround: { value: 48,     label: "hr avg turnaround",    suffix: "" },
  },

  trust_label: "Trusted by brands running paid social",
  brands: [
    "StandOut Search",
    "StandOut Connect",
    "DTC Brand Co.",
    "Agency Partner",
  ],

  portfolio: [
    {
      id: 1,
      title: "Meta Ads Refresh — E-commerce",
      category: "Performance Creative",
      description: "Hook-first recut of existing product footage. ROAS lifted 3.2× in 30 days.",
      thumbnail: "",
      video_url: "",
      tags: ["Meta Ads", "Product", "Hook"],
      result: "3.2× ROAS",
    },
    {
      id: 2,
      title: "Brand Story — SaaS Startup",
      category: "Social Content",
      description: "60-second founder story for LinkedIn + TikTok. 2.1M organic views.",
      thumbnail: "",
      video_url: "",
      tags: ["Organic", "Founder Story", "LinkedIn"],
      result: "2.1M Views",
    },
    {
      id: 3,
      title: "UGC-Style Ad Series — Skincare",
      category: "Meta Ads",
      description: "5-video test suite for a skincare brand. Winning creative hit 4.8× ROAS.",
      thumbnail: "",
      video_url: "",
      tags: ["UGC", "Skincare", "Split Test"],
      result: "4.8× ROAS",
    },
    {
      id: 4,
      title: "Organic Short-Form Package — Fitness",
      category: "Content Package",
      description: "Monthly 12-video package for a fitness coach. Grew IG from 4K to 22K in 3 months.",
      thumbnail: "",
      video_url: "",
      tags: ["Fitness", "IG Reels", "Growth"],
      result: "+18K Followers",
    },
    {
      id: 5,
      title: "Product Launch — DTC Supplement",
      category: "Launch Campaign",
      description: "Launch week creative: 8 variations across hooks, formats, and angles.",
      thumbnail: "",
      video_url: "",
      tags: ["Launch", "Supplements", "Variations"],
      result: "Sold out in 72hr",
    },
    {
      id: 6,
      title: "Testimonial Edit — B2B SaaS",
      category: "Social Proof Creative",
      description: "Customer interview cut into 3 platform-native formats. Used in retargeting.",
      thumbnail: "",
      video_url: "",
      tags: ["Testimonial", "B2B", "Retargeting"],
      result: "68% watch-through",
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Client Name",
      title: "Founder, DTC Brand",
      quote: "Jed doesn't just edit — he thinks about what will actually work. Our Meta Ads CTR doubled after his first creative refresh. He's the first editor I've worked with who actually cares about ROAS.",
      result: "CTR 2×",
      photo: "",
    },
    {
      id: 2,
      name: "Marketing Director",
      title: "Growth Agency",
      quote: "Turnaround is insane. We send a brief Friday, we have polished cuts by Sunday. Quality never drops. He's on permanent retainer for us now.",
      result: "48hr Delivery",
      photo: "",
    },
    {
      id: 3,
      name: "CEO, E-commerce Brand",
      title: "7-Figure DTC Store",
      quote: "We burned through three editors before finding Jed. The difference isn't skill — it's that he understands why good video converts and builds every edit around that.",
      result: "Permanent Retainer",
      photo: "",
    },
  ],

  process: [
    {
      step: "01",
      title: "Brief & Audit",
      desc: "You share your goals, existing content, and target audience. I audit what's working and what isn't — for free on the strategy call.",
    },
    {
      step: "02",
      title: "Creative Strategy",
      desc: "I propose hook angles, formats, and a content plan aligned with your funnel stage. No generic scripts — platform-specific strategy.",
    },
    {
      step: "03",
      title: "Edit & Deliver",
      desc: "First cuts delivered in 48 hours. You get revision rounds until it's right, then receive final files optimized for every platform.",
    },
    {
      step: "04",
      title: "Iterate & Scale",
      desc: "We track performance together. Winning formats get scaled, losing ones get cut. Your creative output compounds over time.",
    },
  ],

  about_title: "I don't just cut video.\nI study what converts.",
  about_p1: "Most editors hand you a pretty clip and call it done. I reverse-engineer hooks, pacing, and captions against platform data — then build edits that hold attention past the 3-second mark, because that's where sales happen.",
  about_p2: "Background in creative strategy and social media, currently contracting with growth-stage brands. If your Meta Ads feel stale or your organic content has flatlined, that's exactly the problem I fix.",
  about_quote: '"The goal isn\'t a good video.\nThe goal is a video that gets watched,\nremembered, and acted on."',
  about_photo: "", 
  skills: ["Meta Ads Creative", "Short-Form", "Hook Engineering", "CapCut / Premiere", "DaVinci Resolve", "Retention Editing"],

  results_title: "What happens when\nthe edit is right.",
  result_stats: [
    { num: "3.2×", label: "avg ROAS lift on Meta Ads after creative refresh" },
    { num: "68%",  label: "average video retention rate vs 38% industry avg" },
    { num: "48hr", label: "typical turnaround from brief to final file" },
  ],

  booking_eyebrow: "Limited Availability",
  booking_headline: "Every week you wait,\nyour competitors are\nrunning better ads.",
  booking_sub: "I take on a limited number of clients each quarter to protect quality and turnaround time. Right now, <strong class=\"gold\">2 spots remain for Q3</strong>. The call is free — the strategy is real.",
  form_note: "No pitch. No hard sell. 30 minutes, real audit of your current content.",

  footer_copy: "© 2025 Jed. Short-form video editor. Philippines.",

  form_endpoint: "https://formspree.io/f/YOUR_FORM_ID",
};
