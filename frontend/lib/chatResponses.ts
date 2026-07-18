export interface ChatRule {
  patterns: RegExp[];
  response: string;
}

export const CHAT_RULES: ChatRule[] = [
  // Greetings
  {
    patterns: [/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|greetings)/i],
    response: `Hello! I'm LegalHelp's legal guidance assistant. I can help you understand our agreement types, explain legal clauses in plain English, and guide you through the document builder.\n\nWhat would you like to know?`,
  },

  // What is an NDA
  {
    patterns: [/\bnda\b|non.?disclosure|confidential(ity)? agreement/i],
    response: `**What is an NDA (Non-Disclosure Agreement)?**\n\nAn NDA is a legal contract where two parties agree to keep shared information confidential. It's typically used when:\n\n• Sharing business ideas with a potential partner\n• Hiring employees or contractors with access to sensitive data\n• Discussing a potential acquisition or investment\n• Working with vendors who will see proprietary processes\n\n**Mutual vs. One-Way NDA:**\nOur builder creates a *Mutual NDA*, meaning both parties agree to keep each other's information confidential — common for business negotiations.\n\nWant to [create an NDA](/builder) now?`,
  },

  // Employment contract
  {
    patterns: [/employment\s*(contract|agreement)|hire|hiring|employee|employer/i],
    response: `**Employment Contract**\n\nAn employment contract sets out the terms of a working relationship between an employer and employee. It typically covers:\n\n• Job title and responsibilities\n• Salary and payment schedule\n• Start date and working hours\n• Termination conditions\n• Confidentiality obligations\n\nIt protects both sides — the employee knows their rights and the employer can enforce key terms.\n\nReady to [create an Employment Contract](/builder)?`,
  },

  // Freelance agreement
  {
    patterns: [/freelan(ce|cer)|contractor|independent\s*(contractor|worker)|consulting\s*agreement|service\s*agreement/i],
    response: `**Freelance Agreement**\n\nA Freelance Agreement (also called an Independent Contractor Agreement) defines the terms between a client and a freelancer. Key things it covers:\n\n• Scope of work and deliverables\n• Payment terms and rates\n• Project timeline and deadlines\n• Who owns the intellectual property\n• Termination and revision policies\n\nIt's essential for any paid freelance project to avoid disputes over payment or ownership.\n\n[Create a Freelance Agreement](/builder) now.`,
  },

  // Lease agreement
  {
    patterns: [/lease|rent(al)?|landlord|tenant|property\s*agreement/i],
    response: `**Lease Agreement**\n\nA Lease Agreement is a contract between a landlord and tenant for the rental of a property. It sets out:\n\n• Monthly rent amount and due date\n• Lease start and end dates\n• Security deposit terms\n• Rules about pets, guests, and alterations\n• Maintenance responsibilities\n• Conditions for early termination\n\nBoth landlords and tenants benefit from having a signed lease — it protects both parties if disputes arise.\n\n[Create a Lease Agreement](/builder) now.`,
  },

  // Which agreement do I need
  {
    patterns: [/which\s*(agreement|contract|document|one)|what\s*(do\s*i\s*need|should\s*i\s*(use|pick|choose|get))|help\s*me\s*(choose|pick|decide)/i],
    response: `**Which agreement do you need?**\n\nHere's a quick guide:\n\n• **Mutual NDA** — Sharing confidential info with another business or person\n• **Employment Contract** — Hiring a full-time or part-time employee\n• **Freelance Agreement** — Hiring or working as an independent contractor\n• **Lease Agreement** — Renting out or renting a property\n\nNot sure? Tell me a bit more about your situation and I'll point you in the right direction.`,
  },

  // State-specific / state provisions
  {
    patterns: [/state\s*(specific|provision|law|clause|requirement)|which\s*state|my\s*state/i],
    response: `**State-Specific Legal Provisions**\n\nOur builder automatically adds state-specific clauses for all 50 US states. We have detailed provisions for:\n\n• **California (CA)** — Strict confidentiality and employment laws\n• **New York (NY)** — Strong worker protections\n• **Texas (TX)** — Business-friendly terms\n• **Florida (FL)** — Property and employment specifics\n• **Illinois (IL)** — Employment and trade secret law\n• **Washington (WA)** — Non-compete restrictions\n\nFor all other states, the document references your applicable state law by name.\n\nYou'll select your state in Step 1 of the [Agreement Builder](/builder).`,
  },

  // How to download / PDF
  {
    patterns: [/download|pdf|save|export|print/i],
    response: `**Downloading Your Agreement**\n\nOnce you complete the 3-step builder, you'll land on the Preview screen where you can:\n\n1. **Download as PDF** — a professionally formatted PDF saved to your device\n2. **Copy to Clipboard** — paste the text anywhere you need it\n\nThe PDF includes the full agreement text in a clean, letter-format layout. No account or email required.\n\n[Start building your agreement](/builder) now.`,
  },

  // How does the builder work
  {
    patterns: [/how\s*(does|do|it|the)\s*(builder|work|it\s*work|this\s*work)|steps?|process|how\s*to\s*(create|make|build|generate)/i],
    response: `**How the Agreement Builder Works**\n\nIt's a simple 3-step process:\n\n**Step 1 — Choose Type & State**\nSelect the type of agreement (NDA, Employment, Freelance, or Lease) and your US state.\n\n**Step 2 — Fill In Details**\nEnter the relevant information — party names, dates, key terms. The form adapts to your agreement type.\n\n**Step 3 — Preview & Download**\nReview the generated document and download it as a PDF or copy the text.\n\nThe whole process takes under 5 minutes. [Start now →](/builder)`,
  },

  // Is it free
  {
    patterns: [/free|cost|price|pay|subscription|sign\s*up|account|register/i],
    response: `**LegalHelp is completely free to use.**\n\nNo account required, no subscription, no hidden fees. You can:\n\n• Create unlimited agreements\n• Download them as PDFs\n• View your agreement history on the dashboard\n\nEverything runs in your browser — no data is sent to our servers. Your agreements are stored locally on your device.`,
  },

  // Legal advice disclaimer
  {
    patterns: [/legal\s*advice|sue|lawsuit|court|lawyer|attorney|solicitor/i],
    response: `**Important: This is not legal advice.**\n\nLegalHelp provides document *templates* to help you create standard legal agreements quickly. The documents generated are a starting point, not a substitute for professional legal counsel.\n\nFor complex situations — disputes, high-value contracts, or anything involving litigation — please consult a qualified attorney in your jurisdiction.\n\nFor straightforward agreements like standard NDAs, freelance contracts, or simple leases, our templates cover the essential clauses used in common practice.`,
  },

  // Dashboard
  {
    patterns: [/dashboard|history|saved|previous|past\s*agreement/i],
    response: `**Your Agreement Dashboard**\n\nThe [Dashboard](/dashboard) keeps a record of all agreements you've created. From there you can:\n\n• View all past agreements in a filterable table\n• Filter by agreement type or US state\n• Re-download or copy any past agreement\n• See stats: total agreements, this month's count, most-used type\n\nYour history is stored in your browser's local storage — it stays private on your device and is never sent to our servers.`,
  },

  // Confidentiality clause
  {
    patterns: [/confidential(ity)?\s*clause|what\s*does\s*confidential|meaning\s*of\s*confidential/i],
    response: `**Confidentiality Clause — Plain English**\n\nA confidentiality clause says: *"What I share with you stays between us."*\n\nMore specifically it defines:\n\n• **What's confidential** — trade secrets, business plans, financial data, client lists, etc.\n• **What's not confidential** — info that's already public, or that the other party already knew\n• **How long** — typically 2–5 years, sometimes indefinite for trade secrets\n• **What happens if breached** — the injured party can seek damages or injunctive relief\n\nIn a Mutual NDA, both parties owe each other the same obligations.`,
  },

  // Intellectual property
  {
    patterns: [/intellectual\s*property|ip\s*clause|who\s*owns|copyright|ownership/i],
    response: `**Intellectual Property (IP) Clause — Plain English**\n\nThe IP clause answers: *"Who owns what was created?"*\n\nIn a **Freelance Agreement**, this is critical:\n\n• **Work-for-hire** — the client owns everything created during the project\n• **License only** — the freelancer retains copyright but grants the client a licence to use the work\n• **Retained rights** — the freelancer can reuse generic tools/code they bring to the project\n\nOur Freelance Agreement template uses the work-for-hire model by default, which is standard for most client engagements.`,
  },

  // Termination clause
  {
    patterns: [/terminat(e|ion)\s*clause|end\s*(the\s*)?(contract|agreement)|cancel|notice\s*period/i],
    response: `**Termination Clause — Plain English**\n\nThe termination clause sets the rules for ending the agreement early. It typically covers:\n\n• **Notice period** — how much advance notice is required (e.g. 2 weeks, 30 days)\n• **Termination for cause** — ending immediately due to a breach (e.g. non-payment, misconduct)\n• **Termination without cause** — either party can end it with notice, no reason needed\n• **What survives termination** — some clauses (confidentiality, IP ownership) remain in force after the contract ends\n\nOur templates include standard termination provisions appropriate for each agreement type.`,
  },

  // Governing law
  {
    patterns: [/governing\s*law|jurisdiction|which\s*law\s*applies|applicable\s*law/i],
    response: `**Governing Law Clause — Plain English**\n\nThe governing law clause answers: *"If we disagree, whose courts and laws decide?"*\n\nIt specifies:\n• Which US state's laws govern the agreement\n• Which state's courts have jurisdiction over disputes\n\nIn our builder, this is automatically set to the state you select in Step 1. It's important to choose the state where you or your business is based, or where the work is being performed.`,
  },

  // Templates
  {
    patterns: [/template(s)?|document\s*type|agreement\s*type|what\s*(agreements?|documents?)\s*(do\s*you\s*have|are\s*available)/i],
    response: `**Available Agreement Types**\n\nWe currently support 4 agreement types in the builder:\n\n1. **Mutual NDA** — Non-Disclosure Agreement for confidential information sharing\n2. **Employment Contract** — For hiring full-time or part-time employees\n3. **Freelance Agreement** — For independent contractors and clients\n4. **Lease Agreement** — For residential or commercial property rental\n\nAll documents include state-specific legal provisions for all 50 US states.\n\n[Start building →](/builder)`,
  },

  // Thank you
  {
    patterns: [/thank(s| you)|cheers|great|helpful|perfect|awesome/i],
    response: `You're welcome! If you have any other questions about our agreements or the builder, feel free to ask.\n\nReady to create your document? [Start building →](/builder)`,
  },

  // Fallback
  {
    patterns: [/.*/],
    response: `I'm not sure I understand that question. Here are some things I can help with:\n\n• **Which agreement do I need?**\n• **What is an NDA / Employment Contract / Freelance Agreement / Lease?**\n• **How does the builder work?**\n• **Is LegalHelp free?**\n• **What does [clause name] mean?**\n\nTry asking one of the above, or [explore the builder](/builder) directly.`,
  },
];

export function getResponse(input: string): string {
  const trimmed = input.trim();
  for (const rule of CHAT_RULES) {
    if (rule.patterns.some(p => p.test(trimmed))) {
      return rule.response;
    }
  }
  return CHAT_RULES[CHAT_RULES.length - 1].response;
}
