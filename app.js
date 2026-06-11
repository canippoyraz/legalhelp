let selectedType = null;

const formConfigs = {
  nda: {
    title: 'Non-Disclosure Agreement Details',
    fields: [
      { id: 'partyA',      label: 'Disclosing Party (Full Name / Company)', placeholder: 'e.g. Acme Corp Ltd', required: true },
      { id: 'partyB',      label: 'Receiving Party (Full Name / Company)',  placeholder: 'e.g. John Smith',    required: true },
      { id: 'purpose',     label: 'Purpose of Disclosure',                  placeholder: 'e.g. Evaluation of a potential business partnership', required: true },
      { id: 'duration',    label: 'Confidentiality Period (years)',          placeholder: 'e.g. 2',             required: true, type: 'number' },
      { id: 'effectiveDate', label: 'Effective Date',                        type: 'date', required: true },
      { id: 'jurisdiction', label: 'Governing Law (Jurisdiction)',           placeholder: 'e.g. State of New York, USA', required: true },
    ]
  },
  employment: {
    title: 'Employment Contract Details',
    fields: [
      { id: 'employer',    label: 'Employer (Company Name)',      placeholder: 'e.g. Acme Corp Ltd',       required: true },
      { id: 'employee',    label: 'Employee (Full Name)',         placeholder: 'e.g. Jane Doe',            required: true },
      { id: 'position',    label: 'Job Title / Position',        placeholder: 'e.g. Senior Developer',    required: true },
      { id: 'startDate',   label: 'Start Date',                  type: 'date', required: true },
      { id: 'salary',      label: 'Annual Salary (USD)',         placeholder: 'e.g. 75,000',              required: true },
      { id: 'hours',       label: 'Weekly Working Hours',        placeholder: 'e.g. 40',                  required: true, type: 'number' },
      { id: 'location',    label: 'Place of Work',               placeholder: 'e.g. New York, NY / Remote', required: true },
      { id: 'noticePeriod', label: 'Notice Period (weeks)',      placeholder: 'e.g. 4',                   required: true, type: 'number' },
    ]
  },
  freelance: {
    title: 'Freelance / Service Agreement Details',
    fields: [
      { id: 'client',      label: 'Client (Full Name / Company)',       placeholder: 'e.g. Acme Corp Ltd',  required: true },
      { id: 'contractor',  label: 'Contractor (Full Name / Company)',   placeholder: 'e.g. Jane Doe',       required: true },
      { id: 'services',    label: 'Description of Services',           placeholder: 'e.g. Web design and development of a 5-page website', required: true, type: 'textarea' },
      { id: 'startDate',   label: 'Start Date',                        type: 'date', required: true },
      { id: 'endDate',     label: 'Expected End Date',                 type: 'date', required: true },
      { id: 'rate',        label: 'Rate (USD)',                        placeholder: 'e.g. 5,000 (fixed) or 150/hour', required: true },
      { id: 'paymentTerms', label: 'Payment Terms',                   placeholder: 'e.g. 50% upfront, 50% on delivery', required: true },
    ]
  },
  lease: {
    title: 'Lease Agreement Details',
    fields: [
      { id: 'landlord',    label: 'Landlord (Full Name / Company)',    placeholder: 'e.g. Acme Properties LLC', required: true },
      { id: 'tenant',      label: 'Tenant (Full Name)',                placeholder: 'e.g. John Smith',          required: true },
      { id: 'property',    label: 'Property Address',                  placeholder: 'e.g. 123 Main St, New York, NY 10001', required: true },
      { id: 'startDate',   label: 'Lease Start Date',                  type: 'date', required: true },
      { id: 'endDate',     label: 'Lease End Date',                    type: 'date', required: true },
      { id: 'rent',        label: 'Monthly Rent (USD)',                placeholder: 'e.g. 2,500',               required: true },
      { id: 'deposit',     label: 'Security Deposit (USD)',            placeholder: 'e.g. 5,000',               required: true },
      { id: 'utilities',   label: 'Utilities Responsibility',         placeholder: 'e.g. Tenant pays all utilities', required: true },
    ]
  }
};

function selectType(type, el) {
  selectedType = type;
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('nextBtn1').disabled = false;
}

function goToStep(n) {
  document.querySelectorAll('.builder__step').forEach(s => s.classList.add('hidden'));
  document.getElementById('step-' + n).classList.remove('hidden');
  document.querySelectorAll('.step-dot').forEach((d, i) => {
    d.classList.toggle('active', i < n);
    d.classList.toggle('done', i < n - 1);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (n === 2) renderForm();
}

function renderForm() {
  const config = formConfigs[selectedType];
  document.getElementById('formTitle').textContent = config.title;
  const container = document.getElementById('formFields');
  container.innerHTML = config.fields.map(f => {
    if (f.type === 'textarea') {
      return `<div class="form__group">
        <label for="${f.id}">${f.label}${f.required ? ' <span class="req">*</span>' : ''}</label>
        <textarea id="${f.id}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''} rows="3"></textarea>
      </div>`;
    }
    return `<div class="form__group">
      <label for="${f.id}">${f.label}${f.required ? ' <span class="req">*</span>' : ''}</label>
      <input id="${f.id}" type="${f.type || 'text'}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''} />
    </div>`;
  }).join('');
}

function getFormValues() {
  const config = formConfigs[selectedType];
  const vals = {};
  for (const f of config.fields) {
    const el = document.getElementById(f.id);
    vals[f.id] = el ? el.value.trim() : '';
  }
  return vals;
}

function generatePreview() {
  const form = document.getElementById('agreementForm');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const v = getFormValues();
  const text = templates[selectedType](v);
  document.getElementById('previewDoc').innerHTML = text.replace(/\n/g, '<br/>');
  goToStep(3);
}

const templates = {
  nda: (v) => `
NON-DISCLOSURE AGREEMENT

Effective Date: ${v.effectiveDate}

This Non-Disclosure Agreement (the "Agreement") is entered into as of ${v.effectiveDate} between:

  Disclosing Party: ${v.partyA}
  Receiving Party:  ${v.partyB}

collectively referred to as the "Parties."

1. PURPOSE
The Parties wish to explore ${v.purpose} (the "Purpose"). In connection with the Purpose, the Disclosing Party may disclose certain confidential and proprietary information to the Receiving Party.

2. CONFIDENTIAL INFORMATION
"Confidential Information" means any data or information, oral or written, disclosed by the Disclosing Party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.

3. OBLIGATIONS
The Receiving Party agrees to:
  a) Hold all Confidential Information in strict confidence;
  b) Not disclose Confidential Information to any third party without prior written consent;
  c) Use the Confidential Information solely for the Purpose described above;
  d) Protect the Confidential Information with at least the same degree of care used to protect its own confidential information (but no less than reasonable care).

4. TERM
This Agreement shall remain in effect for a period of ${v.duration} year(s) from the Effective Date.

5. EXCLUSIONS
Obligations under this Agreement do not apply to information that:
  a) Is or becomes publicly known through no breach of this Agreement;
  b) Was rightfully known by the Receiving Party prior to disclosure;
  c) Is independently developed without use of the Confidential Information;
  d) Is required to be disclosed by law or court order.

6. GOVERNING LAW
This Agreement shall be governed by the laws of ${v.jurisdiction}.

7. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

DISCLOSING PARTY                          RECEIVING PARTY

_______________________________           _______________________________
${v.partyA}                               ${v.partyB}

Date: _________________________           Date: _________________________
`.trim(),

  employment: (v) => `
EMPLOYMENT CONTRACT

This Employment Contract (the "Contract") is entered into as of ${v.startDate} between:

  Employer: ${v.employer}
  Employee: ${v.employee}

1. POSITION AND DUTIES
The Employee is hired for the position of ${v.position}. The Employee shall perform duties as assigned by the Employer and shall report to the appropriate manager.

2. COMMENCEMENT
Employment commences on ${v.startDate}.

3. PLACE OF WORK
The primary place of work shall be ${v.location}.

4. WORKING HOURS
The Employee shall work ${v.hours} hours per week. Additional hours may be required from time to time.

5. REMUNERATION
The Employee shall receive an annual salary of USD ${v.salary}, payable monthly in arrears, subject to applicable deductions.

6. NOTICE PERIOD
Either party may terminate this Contract by giving ${v.noticePeriod} weeks' written notice to the other party.

7. CONFIDENTIALITY
The Employee agrees to keep confidential all proprietary and sensitive information belonging to the Employer during and after employment.

8. GOVERNING LAW
This Contract is governed by applicable employment law.

IN WITNESS WHEREOF, the Parties have signed this Contract as of the date above.

EMPLOYER                                  EMPLOYEE

_______________________________           _______________________________
${v.employer}                             ${v.employee}

Date: _________________________           Date: _________________________
`.trim(),

  freelance: (v) => `
FREELANCE / SERVICE AGREEMENT

This Service Agreement (the "Agreement") is entered into as of ${v.startDate} between:

  Client:     ${v.client}
  Contractor: ${v.contractor}

1. SERVICES
The Contractor agrees to provide the following services (the "Services"):

  ${v.services}

2. TERM
The Agreement commences on ${v.startDate} and is expected to conclude on ${v.endDate}, unless extended or terminated by mutual written agreement.

3. COMPENSATION
The Client agrees to pay the Contractor USD ${v.rate} for the Services.

4. PAYMENT TERMS
${v.paymentTerms}.

5. INDEPENDENT CONTRACTOR
The Contractor is an independent contractor and not an employee of the Client. The Contractor is responsible for all applicable taxes on payments received.

6. INTELLECTUAL PROPERTY
Upon receipt of full payment, all work product and deliverables produced under this Agreement shall become the sole property of the Client.

7. CONFIDENTIALITY
Both Parties agree to keep confidential any proprietary information disclosed during the course of this engagement.

8. TERMINATION
Either party may terminate this Agreement with 14 days' written notice. The Client shall pay for all Services completed up to the date of termination.

9. GOVERNING LAW
This Agreement shall be governed by applicable law.

IN WITNESS WHEREOF, the Parties have signed this Agreement.

CLIENT                                    CONTRACTOR

_______________________________           _______________________________
${v.client}                               ${v.contractor}

Date: _________________________           Date: _________________________
`.trim(),

  lease: (v) => `
LEASE AGREEMENT

This Lease Agreement (the "Agreement") is entered into as of ${v.startDate} between:

  Landlord: ${v.landlord}
  Tenant:   ${v.tenant}

1. PROPERTY
The Landlord agrees to lease to the Tenant the property located at:
  ${v.property}

2. TERM
The lease term commences on ${v.startDate} and expires on ${v.endDate}.

3. RENT
The Tenant shall pay a monthly rent of USD ${v.rent}, due on the 1st day of each calendar month.

4. SECURITY DEPOSIT
The Tenant shall pay a security deposit of USD ${v.deposit} prior to occupancy. The deposit shall be returned within 30 days of the end of the tenancy, less any deductions for damages or unpaid rent.

5. UTILITIES
${v.utilities}.

6. USE OF PROPERTY
The property shall be used solely as a residential/commercial dwelling. Sub-letting is not permitted without prior written consent from the Landlord.

7. MAINTENANCE
The Tenant agrees to maintain the property in good condition and to promptly report any damage or required repairs to the Landlord.

8. TERMINATION
Either party may terminate this Agreement by providing 30 days' written notice prior to the end of the lease term.

9. GOVERNING LAW
This Agreement shall be governed by the laws of the applicable jurisdiction.

IN WITNESS WHEREOF, the Parties have signed this Agreement.

LANDLORD                                  TENANT

_______________________________           _______________________________
${v.landlord}                             ${v.tenant}

Date: _________________________           Date: _________________________
`.trim()
};

function copyToClipboard() {
  const text = document.getElementById('previewDoc').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('copyToast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
}

function downloadDoc() {
  const text = document.getElementById('previewDoc').innerText;
  const typeNames = { nda: 'NDA', employment: 'Employment_Contract', freelance: 'Freelance_Agreement', lease: 'Lease_Agreement' };
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `LegalHelp_${typeNames[selectedType]}_${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function startOver() {
  selectedType = null;
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('nextBtn1').disabled = true;
  goToStep(1);
}
