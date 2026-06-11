import { AgreementType } from '@/types/agreement';

type StateMap = Record<string, string>;
type ProvisionsMap = Record<AgreementType, StateMap>;

const STATE_PROVISIONS: ProvisionsMap = {
  nda: {
    CA: `CALIFORNIA-SPECIFIC PROVISIONS
Pursuant to California Civil Code § 1001 and SB 331 (Silenced No More Act, 2021):
(a) Nothing in this Agreement prevents any party from disclosing factual information to a government agency, law enforcement officer, legislator, or in connection with reporting sexual harassment, sexual assault, or workplace discrimination.
(b) Any clause that purports to prevent disclosure of unlawful acts in the workplace is void and unenforceable under California law.
(c) This Agreement shall not restrict any party's right to disclose information as required by California or federal law.
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
This Agreement shall be governed by and construed in accordance with the laws of the State indicated above, without regard to its conflict of law principles. The parties consent to exclusive jurisdiction and venue in the courts of that state. Trade secrets are protected under applicable state trade secret law and the federal Defend Trade Secrets Act (18 U.S.C. § 1836).`,
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
This Contract is governed by the laws of the state indicated above. The Employer agrees to comply with all applicable federal and state employment laws, including but not limited to the Fair Labor Standards Act (FLSA), Title VII of the Civil Rights Act, the Americans with Disabilities Act (ADA), the Family and Medical Leave Act (FMLA), and all applicable state minimum wage, overtime, and workplace safety laws.`,
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
This Agreement shall be governed by the laws of the state indicated above. The Contractor is an independent contractor and not an employee, agent, or partner of the Client. The Contractor is solely responsible for all applicable taxes and is not entitled to employee benefits. The Client shall issue Form 1099-NEC as required by federal tax law for payments of $600 or more.`,
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
This Lease Agreement is governed by the Residential Landlord-Tenant laws of the state indicated above. Both parties agree to comply with all applicable state and local housing codes, habitability standards, security deposit regulations, and notice requirements. Any provision of this Agreement that conflicts with mandatory state law shall be superseded by such law.`,
  },
};

export function getStateProvision(type: AgreementType, stateCode: string): string {
  const map = STATE_PROVISIONS[type];
  return map[stateCode] ?? map['_default'];
}
