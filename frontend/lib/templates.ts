import { AgreementType, FormValues } from '@/types/agreement';
import { getStateProvision } from './stateProvisions';

const SEP = '='.repeat(60);
const LINE = '─'.repeat(60);

export function generateAgreementText(
  type: AgreementType,
  values: FormValues,
  stateCode: string,
  stateName: string,
): string {
  switch (type) {
    case 'nda':        return ndaTemplate(values, stateCode, stateName);
    case 'employment': return employmentTemplate(values, stateCode, stateName);
    case 'freelance':  return freelanceTemplate(values, stateCode, stateName);
    case 'lease':      return leaseTemplate(values, stateCode, stateName);
  }
}

function ndaTemplate(v: FormValues, stateCode: string, stateName: string): string {
  return `MUTUAL NON-DISCLOSURE AGREEMENT — State of ${stateName}
${SEP}

Effective Date: ${v.effectiveDate}

This Mutual Non-Disclosure Agreement (the "Agreement") is entered into as of ${v.effectiveDate} between:

  First Party:  ${v.partyA}
  Second Party: ${v.partyB}

(each a "Party" and collectively the "Parties").

1. PURPOSE
The Parties wish to explore the following purpose:
  "${v.purpose}"
In connection therewith, each Party may disclose Confidential Information to the other Party.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any data, information, or material in oral, written, graphic, electronic, or other form, disclosed by either Party that is designated as confidential or that reasonably should be understood to be confidential, including but not limited to trade secrets, business plans, financial data, technical data, customer lists, and proprietary software.

3. MUTUAL OBLIGATIONS
Each Party (as a Receiving Party) agrees to:
  (a) Hold all Confidential Information received from the other Party in strict confidence using at least the same degree of care it uses to protect its own confidential information (no less than reasonable care);
  (b) Not disclose Confidential Information to any third party without prior written consent of the Disclosing Party;
  (c) Use the Confidential Information solely for the Purpose described above;
  (d) Limit access to those with a need to know who are bound by obligations no less restrictive than those herein.

4. EXCLUSIONS
Obligations under Section 3 do not apply to information that:
  (a) Is or becomes publicly available through no breach of this Agreement;
  (b) Was rightfully known to the Receiving Party prior to disclosure;
  (c) Is independently developed by the Receiving Party without use of Confidential Information;
  (d) Is required to be disclosed by law, court order, or government authority (with prior written notice to the other Party where permitted).

5. TERM
This Agreement shall remain in effect for ${v.duration} year(s) from the Effective Date.

6. RETURN OR DESTRUCTION
Upon written request or termination, each Receiving Party shall promptly return or certify destruction of all Confidential Information received from the other Party.

7. REMEDIES
Breach of this Agreement may cause irreparable harm entitling the non-breaching Party to equitable relief, including injunction and specific performance, in addition to all other remedies.

8. ${stateCode}-SPECIFIC PROVISIONS
${LINE}
${getStateProvision('nda', stateCode)}

9. GENERAL PROVISIONS
  (a) Governing Law: State of ${stateName}
  (b) This Agreement constitutes the entire agreement on its subject matter.
  (c) Amendments must be in writing and signed by both Parties.
  (d) If any provision is unenforceable, the remainder continues in full force.

${LINE}
FIRST PARTY                             SECOND PARTY

________________________________        ________________________________
${v.partyA}                             ${v.partyB}

Signature: _____________________        Signature: _____________________
Date: __________________________        Date: __________________________`.trim();
}

function employmentTemplate(v: FormValues, stateCode: string, stateName: string): string {
  return `EMPLOYMENT CONTRACT — State of ${stateName}
${SEP}

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
${LINE}
${getStateProvision('employment', stateCode)}

11. GENERAL PROVISIONS
  (a) Governing Law: State of ${stateName}
  (b) This Contract, together with applicable policies, constitutes the entire employment agreement.
  (c) Amendments must be in writing and signed by both Parties.

${LINE}
EMPLOYER                                EMPLOYEE

________________________________        ________________________________
${v.employer}                           ${v.employee}

Authorised Signatory                    Signature
Date: __________________________        Date: __________________________`.trim();
}

function freelanceTemplate(v: FormValues, stateCode: string, stateName: string): string {
  return `FREELANCE / SERVICE AGREEMENT — State of ${stateName}
${SEP}

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
${LINE}
${getStateProvision('freelance', stateCode)}

10. GENERAL PROVISIONS
  (a) Governing Law: State of ${stateName}
  (b) This Agreement constitutes the entire understanding between the Parties regarding the Services.
  (c) Amendments must be in writing and signed by both Parties.

${LINE}
CLIENT                                  CONTRACTOR

________________________________        ________________________________
${v.client}                             ${v.contractor}

Signature: _____________________        Signature: _____________________
Date: __________________________        Date: __________________________`.trim();
}

function leaseTemplate(v: FormValues, stateCode: string, stateName: string): string {
  return `RESIDENTIAL LEASE AGREEMENT — State of ${stateName}
${SEP}

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
${LINE}
${getStateProvision('lease', stateCode)}

12. GENERAL PROVISIONS
  (a) Governing Law: State of ${stateName} and applicable local ordinances.
  (b) This Agreement constitutes the entire agreement regarding the Premises.
  (c) Any provision conflicting with mandatory state law is superseded by such law.

DISCLAIMER: This document is a template only and does not constitute legal advice.
${LINE}
LANDLORD                                TENANT

________________________________        ________________________________
${v.landlord}                           ${v.tenant}

Signature: _____________________        Signature: _____________________
Date: __________________________        Date: __________________________`.trim();
}
