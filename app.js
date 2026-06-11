/* ── State data ─────────────────────────────── */
const US_STATES = [
  ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],['CA','California'],
  ['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],['FL','Florida'],['GA','Georgia'],
  ['HI','Hawaii'],['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],
  ['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],['MD','Maryland'],
  ['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],['MS','Mississippi'],['MO','Missouri'],
  ['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],
  ['NM','New Mexico'],['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],
  ['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],
  ['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],['UT','Utah'],['VT','Vermont'],
  ['VA','Virginia'],['WA','Washington'],['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming']
];

/* ── State-specific legal provisions ───────── */
const STATE_PROVISIONS = {
  nda: {
    CA: `CALIFORNIA-SPECIFIC PROVISIONS
Pursuant to California Civil Code § 1001 and SB 331 (Silenced No More Act, 2021):
(a) Nothing in this Agreement prevents any party from disclosing factual information to a government agency, law enforcement officer, legislator, or in connection with reporting sexual harassment, sexual assault, or workplace discrimination.
(b) Any clause that purports to prevent disclosure of unlawful acts in the workplace is void and unenforceable under California law.
(c) This Agreement shall not restrict the Receiving Party's right to disclose information as required by California or federal law.
(d) Trade secrets remain protectable under the California Uniform Trade Secrets Act (Cal. Civ. Code § 3426 et seq.).`,

    NY: `NEW YORK-SPECIFIC PROVISIONS
Pursuant to New York General Obligations Law § 5-336 and Civil Rights Law § 76-a:
(a) This Agreement does not prohibit any party from reporting unlawful conduct, harassment, or discrimination to a government agency or law enforcement.
(b) Provisions restricting disclosure of facts relating to sexual harassment or discrimination claims are null and void under New York law.
(c) Any settlement NDA must include a 21-day review period and a 7-day revocation period for the complainant.
(d) Confidential Information remains protectable under the New York Defend Trade Secrets Act.`,

    TX: `TEXAS-SPECIFIC PROVISIONS
Pursuant to Texas Business and Commerce Code § 15.50-15.52:
(a) This Agreement is enforceable to the extent it is ancillary to or part of an otherwise enforceable agreement and contains reasonable limitations as to time, geographical area, and scope.
(b) Texas courts may reform any covenant that is overly broad rather than rendering it unenforceable.
(c) Trade secrets are protected under the Texas Uniform Trade Secrets Act (Tex. Civ. Prac. & Rem. Code § 134A).`,

    FL: `FLORIDA-SPECIFIC PROVISIONS
Pursuant to Florida Statutes § 542.335 and § 812.081:
(a) Florida law expressly recognizes the enforceability of non-disclosure and confidentiality agreements.
(b) Courts shall enforce this Agreement to the extent reasonably necessary to protect legitimate business interests.
(c) Trade secrets are protectable under the Florida Uniform Trade Secrets Act (§ 688.001 et seq.).
(d) Violation of this Agreement may entitle the non-breaching party to injunctive relief and damages.`,

    WA: `WASHINGTON STATE-SPECIFIC PROVISIONS
Pursuant to Washington SB 5765 (2022) and RCW 49.44.210:
(a) This Agreement shall not prevent any party from disclosing facts relating to sexual harassment or assault claims.
(b) Non-disclosure provisions related to sexual misconduct claims in settlement agreements are void and unenforceable.
(c) Trade secrets are protected under the Washington Uniform Trade Secrets Act (RCW 19.108).`,

    IL: `ILLINOIS-SPECIFIC PROVISIONS
Pursuant to the Illinois Trade Secrets Act (765 ILCS 1065) and the Workplace Transparency Act (Public Act 101-0221):
(a) An employer shall not require an employee to sign a non-disclosure agreement that prevents the employee from disclosing information about unlawful employment practices.
(b) Trade secrets remain protectable under the Illinois Trade Secrets Act.
(c) Any overly broad confidentiality clause may be reformed by an Illinois court.`,

    _default: `GOVERNING LAW AND ENFORCEABILITY
This Agreement shall be governed by and construed in accordance with the laws of the State indicated above, without regard to its conflict of law principles. The parties consent to exclusive jurisdiction and venue in the courts of that state. Trade secrets are protected under applicable state trade secret law and the federal Defend Trade Secrets Act (18 U.S.C. § 1836).`
  },

  employment: {
    CA: `CALIFORNIA-SPECIFIC PROVISIONS
Pursuant to California Labor Code and applicable regulations:
(a) AT-WILL EMPLOYMENT: This is an at-will employment relationship (Labor Code § 2922). Either party may terminate at any time with or without cause or notice, except as limited by law.
(b) NON-COMPETE: Any covenant not to compete is void and unenforceable under California Business & Professions Code § 16600.
(c) OVERTIME: Non-exempt employees are entitled to overtime at 1.5x the regular rate for hours exceeding 8 in a workday or 40 in a workweek, and 2x for hours exceeding 12 in a workday (Labor Code § 510).
(d) MINIMUM WAGE: Compensation shall not fall below the applicable California or local minimum wage, whichever is higher.
(e) MEAL & REST BREAKS: Non-exempt employees are entitled to a 30-minute unpaid meal period (>5 hrs/day) and paid 10-minute rest periods per 4 hours worked (Labor Code §§ 226.7, 512).
(f) CFRA/FMLA: Employee may be entitled to leave under the California Family Rights Act (Gov. Code § 12945.2).`,

    NY: `NEW YORK-SPECIFIC PROVISIONS
Pursuant to New York Labor Law and applicable regulations:
(a) AT-WILL EMPLOYMENT: This is an at-will employment relationship. Either party may terminate at any time, subject to applicable law and this Contract.
(b) WAGE NOTICE: A written wage notice must be provided at hiring pursuant to NY Labor Law § 195(1), including rate of pay, overtime rate, and pay period.
(c) NY WARN ACT: Employer agrees to comply with the NY WARN Act (Labor Law § 860 et seq.) requiring 90 days' advance notice for mass layoffs affecting 25 or more employees.
(d) NON-COMPETE: Any non-compete must be reasonable in scope, duration, and geographic area under New York common law.`,

    TX: `TEXAS-SPECIFIC PROVISIONS
Pursuant to Texas Labor Code and applicable regulations:
(a) AT-WILL EMPLOYMENT: Texas is an at-will employment state. Either party may terminate employment at any time for any lawful reason.
(b) NON-COMPETE: Non-compete agreements are enforceable under Texas Business and Commerce Code § 15.50 if ancillary to an otherwise enforceable agreement and reasonable in time, geography, and scope.
(c) FINAL PAYCHECK: Upon termination, final wages are due on the next regular payday (Texas Labor Code § 61.014).
(d) PAYDAY LAW: Employer shall pay wages at least twice monthly on scheduled paydays (Texas Labor Code § 61.011).`,

    FL: `FLORIDA-SPECIFIC PROVISIONS
Pursuant to Florida Statutes and applicable regulations:
(a) AT-WILL EMPLOYMENT: Florida is an at-will employment state. Either party may terminate employment at any time for any lawful reason.
(b) NON-COMPETE: Non-compete agreements are enforceable under Florida Statutes § 542.335 if they protect a legitimate business interest and are reasonable in time and area.
(c) MINIMUM WAGE: Compensation shall not fall below Florida's applicable minimum wage as adjusted annually under Article X, Section 24 of the Florida Constitution.`,

    IL: `ILLINOIS-SPECIFIC PROVISIONS
Pursuant to the Illinois Human Rights Act (775 ILCS 5) and Illinois Freedom to Work Act (820 ILCS 90):
(a) AT-WILL EMPLOYMENT: This is an at-will employment relationship subject to Illinois law.
(b) NON-COMPETE: Non-competes for employees earning less than $75,000/year are void. For employees earning more, adequate consideration must be provided.
(c) MEAL BREAKS: Employees working 7.5+ hours per day are entitled to a 20-minute unpaid meal break (820 ILCS 140).`,

    WA: `WASHINGTON STATE-SPECIFIC PROVISIONS
Pursuant to RCW 49.62 and Washington State Labor and Industries regulations:
(a) AT-WILL EMPLOYMENT: Washington is an at-will employment state unless modified by this Contract.
(b) NON-COMPETE: Non-competes for employees earning less than $100,000/year (adjusted annually) are void under RCW 49.62. Duration may not exceed 18 months.
(c) OVERTIME: Non-exempt employees are entitled to overtime at 1.5x the regular rate for hours exceeding 40 per workweek (RCW 49.46.130).
(d) PAID SICK LEAVE: Employee accrues paid sick leave at a rate of not less than one hour per 40 hours worked (RCW 49.46.210).`,

    _default: `GOVERNING LAW AND COMPLIANCE
This Contract is governed by the laws of the state indicated above. The Employer agrees to comply with all applicable federal and state employment laws, including but not limited to the Fair Labor Standards Act (FLSA), Title VII of the Civil Rights Act, the Americans with Disabilities Act (ADA), the Family and Medical Leave Act (FMLA), and all applicable state minimum wage, overtime, and workplace safety laws.`
  },

  freelance: {
    CA: `CALIFORNIA-SPECIFIC PROVISIONS
Pursuant to California AB5 (2019), AB2257 (2020), and Labor Code § 2775 et seq.:
(a) INDEPENDENT CONTRACTOR STATUS — ABC TEST: To be lawfully classified as an independent contractor in California, the Contractor must satisfy all three prongs:
    A. The Contractor is free from the control and direction of the Client in performing the work, both under the contract and in fact;
    B. The Contractor performs work outside the usual course of the Client's business; AND
    C. The Contractor is customarily engaged in an independently established trade, occupation, or business of the same nature.
(b) If the Contractor does not meet all three prongs, they may be reclassified as an employee, exposing the Client to liability for back taxes, benefits, and penalties.
(c) Certain licensed professionals (doctors, lawyers, architects, etc.) are exempt under AB2257. Parties should seek legal advice if classification is uncertain.`,

    NY: `NEW YORK-SPECIFIC PROVISIONS
Pursuant to the New York City Freelance Isn't Free Act (NYC Admin. Code § 20-927 et seq.):
(a) WRITTEN CONTRACT REQUIRED: For services valued at $800 or more (individually or in aggregate over 120 days), a written contract is required by law.
(b) PAYMENT TERMS: If no payment date is specified, payment is due within 30 days of completion of services.
(c) RETALIATION PROHIBITED: The Client may not retaliate against the Contractor for exercising rights under this Act.
(d) PENALTIES: Violations may result in double damages, attorneys' fees, and civil penalties up to $25,000.`,

    TX: `TEXAS-SPECIFIC PROVISIONS
Pursuant to Texas Labor Code and applicable regulations:
(a) INDEPENDENT CONTRACTOR: The Contractor is an independent contractor under Texas common law and applicable statutes, retaining full control over the means and methods of performing the Services.
(b) TAX RESPONSIBILITY: The Contractor is solely responsible for all federal and state self-employment taxes. The Client shall issue Form 1099-NEC as required by federal tax law.
(c) NO WORKERS' COMPENSATION: The Contractor is not covered by the Client's workers' compensation insurance.`,

    FL: `FLORIDA-SPECIFIC PROVISIONS
Pursuant to Florida Statutes and applicable regulations:
(a) INDEPENDENT CONTRACTOR STATUS: The Contractor is an independent contractor under Florida common law, retaining control over the manner and means of performing the Services.
(b) TAX RESPONSIBILITY: The Contractor is solely responsible for all applicable federal, state, and local taxes and shall indemnify the Client for any tax liability arising from misclassification.
(c) NO EMPLOYEE BENEFITS: The Contractor is not entitled to any employee benefits.`,

    _default: `GOVERNING LAW AND INDEPENDENT CONTRACTOR STATUS
This Agreement shall be governed by the laws of the state indicated above. The Contractor is an independent contractor and not an employee, agent, or partner of the Client. The Contractor is solely responsible for all applicable taxes and is not entitled to employee benefits. The Client shall issue Form 1099-NEC as required by federal tax law for payments of $600 or more.`
  },

  lease: {
    CA: `CALIFORNIA-SPECIFIC PROVISIONS
Pursuant to California Civil Code § 1940 et seq.:
(a) SECURITY DEPOSIT LIMIT: May not exceed 2 months' rent (unfurnished) or 3 months' rent (furnished) (Civil Code § 1950.5(c)).
(b) RETURN OF DEPOSIT: Must be returned within 21 calendar days of Tenant vacating, with an itemised statement of deductions (Civil Code § 1950.5(g)).
(c) HABITABILITY: Landlord warrants that the Premises comply with the implied warranty of habitability (Civil Code § 1941).
(d) RENT CONTROL/AB 1482: If subject to the Tenant Protection Act of 2019, just-cause eviction requirements and rent increase caps (5% + CPI, max 10%) apply.
(e) NOTICE TO TERMINATE: 30 days' notice required (60 days if Tenant has resided for 1+ year) for month-to-month tenancies (Civil Code § 1946.1).`,

    NY: `NEW YORK-SPECIFIC PROVISIONS
Pursuant to New York Real Property Law and the Housing Stability and Tenant Protection Act (2019):
(a) SECURITY DEPOSIT LIMIT: May not exceed 1 month's rent (RPL § 227-e).
(b) WRITTEN RECEIPT: Landlord must provide a written receipt for the security deposit.
(c) RETURN OF DEPOSIT: Must be returned within 14 days of Tenant vacating, with an itemised statement of deductions (RPL § 227-e(3)).
(d) NOTICE REQUIREMENTS: 30 days (tenancy < 1 year), 60 days (1-2 years), or 90 days (2+ years) written notice required to terminate (RPL § 226-c).
(e) RENT STABILISATION: If applicable, rent increases and renewal rights are governed by the Rent Stabilization Law.`,

    TX: `TEXAS-SPECIFIC PROVISIONS
Pursuant to Texas Property Code Chapter 92:
(a) SECURITY DEPOSIT RETURN: Must be returned within 30 days of Tenant surrendering the Premises (Prop. Code § 92.103).
(b) ITEMISED STATEMENT: If deductions are made, Landlord must provide an itemised list within 30 days (Prop. Code § 92.104).
(c) HABITABILITY: Landlord must make diligent efforts to repair conditions materially affecting health or safety (Prop. Code § 92.056).
(d) NOTICE TO VACATE: Written notice to vacate must be given before filing eviction; the default period is 3 days (Prop. Code § 24.005).`,

    FL: `FLORIDA-SPECIFIC PROVISIONS
Pursuant to Florida Statutes Chapter 83 (Florida Residential Landlord and Tenant Act):
(a) SECURITY DEPOSIT RETURN: If no deductions, returned within 15 days; if deductions claimed, written notice sent via certified mail within 30 days (§ 83.49). Failure to provide timely notice forfeits the right to make deductions.
(b) HABITABILITY: Landlord must maintain the Premises in compliance with applicable building, housing, and health codes (§ 83.51).
(c) NOTICE TO TERMINATE: 15 days' written notice for month-to-month tenancies; 7 days for week-to-week tenancies (§ 83.57).`,

    IL: `ILLINOIS-SPECIFIC PROVISIONS
Pursuant to the Illinois Residential Landlord and Tenant Act (765 ILCS 720) and Chicago RLTO where applicable:
(a) SECURITY DEPOSIT INTEREST: In Chicago, deposits held more than 6 months must accrue interest (Chicago RLTO § 5-12-080).
(b) RETURN OF DEPOSIT: Must be returned within 30 days (45 days in Chicago) of Tenant vacating, with an itemised statement.
(c) HABITABILITY: Landlord must maintain Premises in compliance with applicable housing codes and the implied warranty of habitability.`,

    WA: `WASHINGTON STATE-SPECIFIC PROVISIONS
Pursuant to Washington Residential Landlord-Tenant Act (RCW 59.18):
(a) MOVE-IN CHECKLIST: Landlord must provide a written checklist of the unit's condition at move-in. Failure to do so forfeits the right to make deductions from the security deposit.
(b) RETURN OF DEPOSIT: Must be returned within 21 days of Tenant vacating, with an itemised statement (RCW 59.18.280).
(c) NOTICE TO TERMINATE: 20 days' written notice required to end a month-to-month tenancy (RCW 59.18.200).
(d) HABITABILITY: Landlord must maintain the unit in compliance with local building and housing codes (RCW 59.18.060).`,

    _default: `GOVERNING LAW AND COMPLIANCE
This Lease Agreement is governed by the Residential Landlord-Tenant laws of the state indicated above. Both parties agree to comply with all applicable state and local housing codes, habitability standards, security deposit regulations, and notice requirements. Any provision of this Agreement that conflicts with mandatory state law shall be superseded by such law.`
  }
};

function getStateProvision(type, stateCode) {
  const map = STATE_PROVISIONS[type];
  return (map[stateCode] || map['_default']);
}

/* ── Form configs ───────────────────────────── */
let selectedType  = null;
let selectedState = null;

const formConfigs = {
  nda: {
    title: 'Non-Disclosure Agreement Details',
    fields: [
      { id:'partyA',        label:'Disclosing Party (Full Name / Company)', placeholder:'e.g. Acme Corp Ltd', required:true },
      { id:'partyB',        label:'Receiving Party (Full Name / Company)',  placeholder:'e.g. John Smith',    required:true },
      { id:'purpose',       label:'Purpose of Disclosure',                  placeholder:'e.g. Evaluation of a potential business partnership', required:true },
      { id:'duration',      label:'Confidentiality Period (years)',          placeholder:'e.g. 2', required:true, type:'number' },
      { id:'effectiveDate', label:'Effective Date',                          type:'date', required:true },
    ]
  },
  employment: {
    title: 'Employment Contract Details',
    fields: [
      { id:'employer',     label:'Employer (Company Name)',      placeholder:'e.g. Acme Corp Ltd',       required:true },
      { id:'employee',     label:'Employee (Full Name)',         placeholder:'e.g. Jane Doe',            required:true },
      { id:'position',     label:'Job Title / Position',        placeholder:'e.g. Senior Developer',    required:true },
      { id:'startDate',    label:'Start Date',                  type:'date', required:true },
      { id:'salary',       label:'Annual Salary (USD)',         placeholder:'e.g. 75,000',              required:true },
      { id:'hours',        label:'Weekly Working Hours',        placeholder:'e.g. 40', required:true, type:'number' },
      { id:'location',     label:'Place of Work',               placeholder:'e.g. Austin, TX / Remote', required:true },
      { id:'noticePeriod', label:'Notice Period (weeks)',       placeholder:'e.g. 4', required:true, type:'number' },
    ]
  },
  freelance: {
    title: 'Freelance / Service Agreement Details',
    fields: [
      { id:'client',       label:'Client (Full Name / Company)',      placeholder:'e.g. Acme Corp Ltd',  required:true },
      { id:'contractor',   label:'Contractor (Full Name / Company)',  placeholder:'e.g. Jane Doe',       required:true },
      { id:'services',     label:'Description of Services',          placeholder:'e.g. Web design and development of a 5-page website', required:true, type:'textarea' },
      { id:'startDate',    label:'Start Date',                       type:'date', required:true },
      { id:'endDate',      label:'Expected End Date',                type:'date', required:true },
      { id:'rate',         label:'Rate (USD)',                       placeholder:'e.g. 5,000 fixed or 150/hour', required:true },
      { id:'paymentTerms', label:'Payment Terms',                   placeholder:'e.g. 50% upfront, 50% on delivery', required:true },
    ]
  },
  lease: {
    title: 'Lease Agreement Details',
    fields: [
      { id:'landlord',  label:'Landlord (Full Name / Company)',  placeholder:'e.g. Acme Properties LLC',      required:true },
      { id:'tenant',    label:'Tenant (Full Name)',              placeholder:'e.g. John Smith',               required:true },
      { id:'property',  label:'Property Address',               placeholder:'e.g. 123 Main St, Austin, TX',  required:true },
      { id:'startDate', label:'Lease Start Date',               type:'date', required:true },
      { id:'endDate',   label:'Lease End Date',                 type:'date', required:true },
      { id:'rent',      label:'Monthly Rent (USD)',             placeholder:'e.g. 2,500',                    required:true },
      { id:'deposit',   label:'Security Deposit (USD)',         placeholder:'e.g. 5,000',                    required:true },
      { id:'utilities', label:'Utilities Responsibility',      placeholder:'e.g. Tenant pays all utilities', required:true },
    ]
  }
};

/* ── Step navigation ────────────────────────── */
function selectType(type, el) {
  selectedType = type;
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  checkStep1Ready();
}

function selectStateVal(val) {
  selectedState = val || null;
  checkStep1Ready();
}

function checkStep1Ready() {
  const btn = document.getElementById('nextBtn1');
  if (btn) btn.disabled = !(selectedType && selectedState);
}

function goToStep(n) {
  document.querySelectorAll('.builder__step').forEach(s => s.classList.add('hidden'));
  document.getElementById('step-' + n).classList.remove('hidden');
  document.querySelectorAll('.step-dot').forEach((d, i) => {
    d.classList.toggle('active', i < n);
    d.classList.toggle('done',   i < n - 1);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (n === 2) renderForm();
}

/* ── Form rendering ─────────────────────────── */
function renderForm() {
  const config   = formConfigs[selectedType];
  const stateName = US_STATES.find(s => s[0] === selectedState)?.[1] || selectedState;
  document.getElementById('formTitle').textContent = config.title;
  document.getElementById('stateNote').innerHTML =
    `<span class="state-badge">📍 ${stateName} (${selectedState})</span> State-specific legal provisions will be automatically included in your document.`;
  document.getElementById('formFields').innerHTML = config.fields.map(f => {
    const ctrl = f.type === 'textarea'
      ? `<textarea id="${f.id}" placeholder="${f.placeholder||''}" ${f.required?'required':''} rows="3"></textarea>`
      : `<input id="${f.id}" type="${f.type||'text'}" placeholder="${f.placeholder||''}" ${f.required?'required':''} />`;
    return `<div class="form__group">
      <label for="${f.id}">${f.label}${f.required?' <span class="req">*</span>':''}</label>${ctrl}
    </div>`;
  }).join('');
}

function getFormValues() {
  const vals = {};
  formConfigs[selectedType].fields.forEach(f => {
    const el = document.getElementById(f.id);
    vals[f.id] = el ? el.value.trim() : '';
  });
  return vals;
}

/* ── Preview ────────────────────────────────── */
function generatePreview() {
  const form = document.getElementById('agreementForm');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const v         = getFormValues();
  const stateName = US_STATES.find(s => s[0] === selectedState)?.[1] || selectedState;
  const text      = templates[selectedType](v, selectedState, stateName);
  document.getElementById('previewDoc').innerHTML = escapeHtml(text).replace(/\n/g, '<br/>');
  saveToHistory(text, v, stateName);
  goToStep(3);
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── localStorage ───────────────────────────── */
function saveToHistory(text, v, stateName) {
  let history = [];
  try { history = JSON.parse(localStorage.getItem('lh_agreements') || '[]'); } catch(e){}
  history.push({
    id: Date.now(), type: selectedType,
    state: selectedState, stateName,
    parties: getParties(v),
    createdAt: new Date().toISOString(), text
  });
  localStorage.setItem('lh_agreements', JSON.stringify(history));
}

function getParties(v) {
  if (selectedType === 'nda')        return `${v.partyA} / ${v.partyB}`;
  if (selectedType === 'employment') return `${v.employer} / ${v.employee}`;
  if (selectedType === 'freelance')  return `${v.client} / ${v.contractor}`;
  if (selectedType === 'lease')      return `${v.landlord} / ${v.tenant}`;
  return '';
}

/* ── Templates ──────────────────────────────── */
const templates = {
  nda: (v, stateCode, stateName) => `NON-DISCLOSURE AGREEMENT — State of ${stateName}
${'='.repeat(60)}

Effective Date: ${v.effectiveDate}

This Non-Disclosure Agreement (the "Agreement") is entered into as of ${v.effectiveDate} between:

  Disclosing Party: ${v.partyA}
  Receiving Party:  ${v.partyB}

(each a "Party" and collectively the "Parties").

1. PURPOSE
The Parties wish to explore the following purpose:
  "${v.purpose}"
In connection therewith, the Disclosing Party may share Confidential Information with the Receiving Party.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any data, information, or material in oral, written, graphic, electronic, or other form, disclosed by the Disclosing Party that is designated as confidential or that reasonably should be understood to be confidential, including but not limited to trade secrets, business plans, financial data, technical data, customer lists, and proprietary software.

3. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
  (a) Hold all Confidential Information in strict confidence using at least the same degree of care it uses to protect its own confidential information (no less than reasonable care);
  (b) Not disclose Confidential Information to any third party without prior written consent of the Disclosing Party;
  (c) Use the Confidential Information solely for the Purpose described above;
  (d) Limit access to those with a need to know who are bound by obligations no less restrictive than those herein.

4. EXCLUSIONS
Obligations under Section 3 do not apply to information that:
  (a) Is or becomes publicly available through no breach of this Agreement;
  (b) Was rightfully known to the Receiving Party prior to disclosure;
  (c) Is independently developed by the Receiving Party without use of Confidential Information;
  (d) Is required to be disclosed by law, court order, or government authority (with prior written notice to the Disclosing Party where permitted).

5. TERM
This Agreement shall remain in effect for ${v.duration} year(s) from the Effective Date.

6. RETURN OR DESTRUCTION
Upon written request or termination, the Receiving Party shall promptly return or certify destruction of all Confidential Information.

7. REMEDIES
Breach of this Agreement may cause irreparable harm entitling the Disclosing Party to equitable relief, including injunction and specific performance, in addition to all other remedies.

8. ${stateCode}-SPECIFIC PROVISIONS
${'─'.repeat(60)}
${getStateProvision('nda', stateCode)}

9. GENERAL PROVISIONS
  (a) Governing Law: State of ${stateName}
  (b) This Agreement constitutes the entire agreement on its subject matter.
  (c) Amendments must be in writing and signed by both Parties.
  (d) If any provision is unenforceable, the remainder continues in full force.

${'─'.repeat(60)}
DISCLOSING PARTY                        RECEIVING PARTY

________________________________        ________________________________
${v.partyA}                             ${v.partyB}

Signature: _____________________        Signature: _____________________
Date: __________________________        Date: __________________________`.trim(),

  employment: (v, stateCode, stateName) => `EMPLOYMENT CONTRACT — State of ${stateName}
${'='.repeat(60)}

This Employment Contract (the "Contract") is entered into as of ${v.startDate} between:

  Employer: ${v.employer}
  Employee: ${v.employee}

1. POSITION AND DUTIES
The Employee is engaged as ${v.position} and shall perform all duties reasonably assigned by the Employer.

2. COMMENCEMENT DATE
Employment commences on ${v.startDate}.

3. PLACE OF WORK
Primary place of work: ${v.location}.

4. WORKING HOURS
Standard working week: ${v.hours} hours. Additional hours may be required as necessary.

5. REMUNERATION
Annual salary of USD ${v.salary}, paid per the Employer's payroll schedule and subject to applicable withholdings.

6. BENEFITS
Employee is entitled to benefits per the Employer's policy, which may include health insurance, paid time off, and retirement plan eligibility.

7. NOTICE PERIOD
Either party may terminate this Contract with ${v.noticePeriod} weeks' written notice, except where summary termination is justified by gross misconduct.

8. CONFIDENTIALITY
Employee agrees to keep confidential all proprietary, technical, financial, and business information of the Employer during and after employment, subject to applicable state law.

9. INTELLECTUAL PROPERTY
All work product and inventions made by the Employee in the course of employment relating to the Employer's business shall be the sole property of the Employer.

10. ${stateCode}-SPECIFIC PROVISIONS
${'─'.repeat(60)}
${getStateProvision('employment', stateCode)}

11. GENERAL PROVISIONS
  (a) Governing Law: State of ${stateName}
  (b) This Contract, together with applicable policies, constitutes the entire employment agreement.
  (c) Amendments must be in writing and signed by both Parties.

${'─'.repeat(60)}
EMPLOYER                                EMPLOYEE

________________________________        ________________________________
${v.employer}                           ${v.employee}

Authorised Signatory                    Signature
Date: __________________________        Date: __________________________`.trim(),

  freelance: (v, stateCode, stateName) => `FREELANCE / SERVICE AGREEMENT — State of ${stateName}
${'='.repeat(60)}

This Service Agreement (the "Agreement") is entered into as of ${v.startDate} between:

  Client:     ${v.client}
  Contractor: ${v.contractor}

1. SERVICES
The Contractor agrees to provide the following services:
  ${v.services}

2. TERM
Commences: ${v.startDate}   Expected completion: ${v.endDate}.

3. COMPENSATION
The Client agrees to pay USD ${v.rate} for the Services.

4. PAYMENT TERMS
${v.paymentTerms}. Invoices not paid within agreed terms may incur a late fee of 1.5% per month.

5. INDEPENDENT CONTRACTOR
The Contractor is an independent contractor and not an employee, partner, or agent of the Client. The Contractor retains full control over the means and methods of performing the Services, is solely responsible for all applicable taxes, and is not entitled to employee benefits.

6. INTELLECTUAL PROPERTY
Upon receipt of full payment, all deliverables developed specifically for the Client shall become the sole property of the Client. The Contractor retains ownership of pre-existing tools and frameworks.

7. CONFIDENTIALITY
Each Party agrees to keep confidential any proprietary information of the other Party disclosed during this engagement.

8. TERMINATION
Either Party may terminate with 14 days' written notice. The Client shall pay for all Services completed to the date of termination.

9. ${stateCode}-SPECIFIC PROVISIONS
${'─'.repeat(60)}
${getStateProvision('freelance', stateCode)}

10. GENERAL PROVISIONS
  (a) Governing Law: State of ${stateName}
  (b) This Agreement constitutes the entire understanding between the Parties regarding the Services.
  (c) Amendments must be in writing and signed by both Parties.

${'─'.repeat(60)}
CLIENT                                  CONTRACTOR

________________________________        ________________________________
${v.client}                             ${v.contractor}

Signature: _____________________        Signature: _____________________
Date: __________________________        Date: __________________________`.trim(),

  lease: (v, stateCode, stateName) => `RESIDENTIAL LEASE AGREEMENT — State of ${stateName}
${'='.repeat(60)}

This Lease Agreement (the "Agreement") is entered into as of ${v.startDate} between:

  Landlord: ${v.landlord}
  Tenant:   ${v.tenant}

1. PREMISES
The Landlord leases to the Tenant the property at: ${v.property} ("the Premises"), for residential use only.

2. LEASE TERM
Commences: ${v.startDate}   Expires: ${v.endDate}.
Upon expiration, converts to month-to-month unless written notice of termination is provided per applicable state law.

3. RENT
Monthly rent: USD ${v.rent}, due on the 1st of each month. A 5-day grace period applies; late fees may apply thereafter.

4. SECURITY DEPOSIT
Security deposit: USD ${v.deposit}, held and returned in accordance with applicable state law.

5. UTILITIES
${v.utilities}.

6. USE OF PREMISES
Premises shall be used solely as a private residential dwelling. Subletting or assignment requires prior written consent of the Landlord.

7. TENANT OBLIGATIONS
Tenant agrees to: (a) maintain the Premises in a clean and sanitary condition; (b) promptly report damage or needed repairs; (c) not make alterations without written consent; (d) comply with all applicable laws and ordinances.

8. LANDLORD OBLIGATIONS
Landlord agrees to: (a) maintain the Premises in a habitable condition per applicable building and housing codes; (b) make necessary repairs within a reasonable time after written notice; (c) respect the Tenant's right to quiet enjoyment.

9. ENTRY BY LANDLORD
Landlord shall provide advance notice as required by state law (typically 24 hours) before entry, except in emergencies.

10. TERMINATION
At the end of the Term, Tenant shall vacate and return all keys. Either Party may terminate a month-to-month tenancy with written notice per applicable state law.

11. ${stateCode}-SPECIFIC PROVISIONS
${'─'.repeat(60)}
${getStateProvision('lease', stateCode)}

12. GENERAL PROVISIONS
  (a) Governing Law: State of ${stateName} and applicable local ordinances.
  (b) This Agreement constitutes the entire agreement regarding the Premises.
  (c) Any provision conflicting with mandatory state law is superseded by such law.

DISCLAIMER: This document is a template only and does not constitute legal advice.
${'─'.repeat(60)}
LANDLORD                                TENANT

________________________________        ________________________________
${v.landlord}                           ${v.tenant}

Signature: _____________________        Signature: _____________________
Date: __________________________        Date: __________________________`.trim()
};

/* ── Clipboard & download ───────────────────── */
function copyToClipboard() {
  const text = document.getElementById('previewDoc').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const t = document.getElementById('copyToast');
    t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2500);
  });
}

function downloadDoc() {
  const text  = document.getElementById('previewDoc').innerText;
  const names = { nda:'NDA', employment:'Employment_Contract', freelance:'Freelance_Agreement', lease:'Lease_Agreement' };
  const blob  = new Blob([text], { type:'text/plain' });
  const a     = document.createElement('a');
  a.href      = URL.createObjectURL(blob);
  a.download  = `LegalHelp_${names[selectedType]}_${selectedState}_${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function startOver() {
  selectedType = null; selectedState = null;
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  const sd = document.getElementById('stateSelect');
  if (sd) sd.value = '';
  checkStep1Ready();
  goToStep(1);
}

/* ── Init ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const stateSelect = document.getElementById('stateSelect');
  if (!stateSelect) return;
  stateSelect.innerHTML = '<option value="">— Select your state —</option>' +
    US_STATES.map(([code, name]) => `<option value="${code}">${name} (${code})</option>`).join('');
  const pre = localStorage.getItem('preselect');
  if (pre) {
    const card = document.querySelector(`.type-card[data-type="${pre}"]`);
    if (card) { selectedType = pre; card.classList.add('selected'); checkStep1Ready(); }
    localStorage.removeItem('preselect');
  }
});
