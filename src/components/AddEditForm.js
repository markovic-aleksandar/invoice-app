import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CustomSelect, CustomCalendar } from '../components';

const AddEditForm = ({formData, handleFormData}) => {
  const {
    senderAddress,
    senderCity,
    senderPostCode,
    senderCountry,
    clientName,
    clientEmail,
    clientAddress,
    clientCity,
    clientPostCode,
    clientCountry,
    invoiceDate,
    paymentTerms,
    projectDescription
  } = formData;
  const selectValues = [
    {label: 'Net 1 Day', value: 1},
    {label: 'Net 7 Days', value: 7},
    {label: 'Net 14 Days', value: 14},
    {label: 'Net 30 Days', value: 30}
  ];
  const form = useRef();

  useEffect(() => {
    const formControls = form.current.querySelectorAll('.form-control');
    formControls.forEach(formControl => {
      if (formControl.dataset.control === 'select') {
        formControl.querySelectorAll('li').forEach(li => li.addEventListener('click', handleFormData));
      }
      if (formControl.dataset.control === 'calendar') {
        formControl.querySelectorAll('li').forEach(li => li.addEventListener('click', handleFormData));
      }
    });

    return () => {
      formControls.forEach(formControl => {
        if (formControl.dataset.control === 'select') {
          formControl.querySelectorAll('li').forEach(li => li.removeEventListener('click', handleFormData));
        } 
        if (formControl.dataset.control === 'calendar') {
          formControl.querySelectorAll('li').forEach(li => li.removeEventListener('click', handleFormData));
        } 
      });
    }
  }, [handleFormData]);

  return (
    <Wrapper ref={form}>
      {/* bill from */}
      <div className="form-group">
        <h4>Bill From</h4>
        <div className="form-control">
          <div className="form-label">
            <label htmlFor="senderAddress">Street Address</label>
            {senderAddress.error && <span className="form-error">{senderAddress.error}</span>}
          </div>
          <input 
            type="text" 
            name="senderAddress" 
            id="senderAddress" 
            value={senderAddress.value}
            onChange={handleFormData}
          />
        </div>
        <div className="form-control-group">
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="senderCity">City</label>
              {senderCity.error && <span className="form-error">{senderCity.error}</span>}
            </div>
            <input 
              type="text" 
              name="senderCity" 
              id="senderCity" 
              value={senderCity.value} 
              onChange={handleFormData}
            />
          </div>
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="senderPostCode">Post Code</label>
              {senderPostCode.error && <span className="form-error">{senderPostCode.error}</span>}
            </div>
            <input 
              type="text" 
              name="senderPostCode" 
              id="senderPostCode" 
              value={senderPostCode.value}
              onChange={handleFormData} 
            />
          </div>
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="senderCountry">Country</label>
              {senderCountry.error && <span className="form-error">{senderCountry.error}</span>}
            </div>
            <input 
              type="text" 
              name="senderCountry" 
              id="senderCountry" 
              value={senderCountry.value}
              onChange={handleFormData}
            />
          </div>
        </div>
      </div>
      {/* bill from end */}

      {/* bill to */}
      <div className="form-group">
        <h4>Bill to</h4>
        <div className="form-control">
          <div className="form-label">
            <label htmlFor="clientName">Client's Name</label>
            {clientName.error && <span className="form-error">{clientName.error}</span>}
          </div>
          <input 
            type="text" 
            name="clientName" 
            id="clientName" 
            value={clientName.value}
            onChange={handleFormData} 
          />
        </div>
        <div className="form-control">
          <div className="form-label">
            <label htmlFor="clientEmail">Client's Email</label>
            {clientEmail.error && <span className="form-error">{clientEmail.error}</span>}
          </div>
          <input 
            type="text" 
            name="clientEmail" 
            id="clientEmail" 
            value={clientEmail.value}
            onChange={handleFormData} 
          />
        </div>
        <div className="form-control">
          <div className="form-label">
            <label htmlFor="clientAddress">Street Address</label>
            {clientAddress.error && <span className="form-error">{clientAddress.error}</span>}
          </div>
          <input 
            type="text" 
            name="clientAddress" 
            id="clientAddress" 
            value={clientAddress.value}
            onChange={handleFormData} 
          />
        </div>
        <div className="form-control-group">
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="clientCity">City</label>
              {clientCity.error && <span className="form-error">{clientCity.error}</span>}
            </div>
            <input 
              type="text" 
              name="clientCity" 
              id="clientCity" 
              value={clientCity.value}
              onChange={handleFormData} 
            />
          </div>
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="clientPostCode">Post Code</label>
              {clientPostCode.error && <span className="form-error">{clientPostCode.error}</span>}
            </div>
            <input 
              type="text" 
              name="clientPostCode" 
              id="clientPostCode" 
              value={clientPostCode.value}
              onChange={handleFormData} 
            />
          </div>
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="clientCountry">Country</label>
              {clientCountry.error && <span className="form-error">{clientCountry.error}</span>}
            </div>
            <input 
              type="text" 
              name="clientCountry" 
              id="clientCountry" 
              value={clientCountry.value}
              onChange={handleFormData} 
            />
          </div>
        </div>
        <div className="form-control" data-control="calendar">
          <div className="form-label">
            <label htmlFor="invoiceDate">Invoice Date</label>
          </div>
          <input type="text" style={{display: 'none'}} />
          <CustomCalendar invoiceDate={invoiceDate} name='invoiceDate' />
        </div>
        <div className="form-control" data-control="select">
          <div className="form-label">
            <label>Payment Terms</label>
          </div>
          <CustomSelect values={selectValues} value={paymentTerms} name='paymentTerms' />
        </div>
        <div className="form-control">
          <div className="form-label">
            <label htmlFor="projectDescription">Project Description</label>
            {projectDescription.error && <span className="form-error">{projectDescription.error}</span>}
          </div>
          <input 
            type="text" 
            name="projectDescription" 
            id="projectDescription" 
            value={projectDescription.value}
            onChange={handleFormData} 
          />
        </div>
      </div>
      {/* bill to end */}
    </Wrapper>
  );
}

const Wrapper = styled.form`

`;

export default AddEditForm;