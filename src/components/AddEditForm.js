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
      } else if (formControl.dataset.control === 'calendar') {
        formControl.querySelectorAll('li').forEach(li => li.addEventListener('click', handleFormData));
      }
      else {
        formControl.querySelector('input').addEventListener('input', handleFormData);
      }
    });

    return () => {
      formControls.forEach(formControl => {
        if (formControl.dataset.control === 'select') {
          formControl.querySelectorAll('li').forEach(li => li.removeEventListener('click', handleFormData));
        } else if (formControl.dataset.control === 'calendar') {
          formControl.querySelectorAll('li').forEach(li => li.removeEventListener('click', handleFormData));
        } 
        else {
          formControl.querySelector('input').removeEventListener('input', handleFormData);
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
            {senderAddress.error && <span className="form-error">can't be empty</span>}
          </div>
          <input type="text" name="senderAddress" id="senderAddress" defaultValue={senderAddress.value} />
        </div>
        <div className="form-control-group">
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="senderCity">City</label>
              {senderCity.error && <span className="form-error">can't be empty</span>}
            </div>
            <input type="text" name="senderCity" id="senderCity" defaultValue={senderCity.value} />
          </div>
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="senderPostCode">Post Code</label>
              {senderPostCode.error && <span className="form-error">can't be empty</span>}
            </div>
            <input type="text" name="senderPostCode" id="senderPostCode" defaultValue={senderPostCode.value} />
          </div>
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="senderCountry">Country</label>
              {senderCountry.error && <span className="form-error">can't be empty</span>}
            </div>
            <input type="text" name="senderCountry" id="senderCountry" defaultValue={senderCountry.value} />
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
            {clientName.error && <span className="form-error">can't be empty</span>}
          </div>
          <input type="text" name="clientName" id="clientName" defaultValue={clientName.value} />
        </div>
        <div className="form-control">
          <div className="form-label">
            <label htmlFor="clientEmail">Client's Email</label>
            {clientEmail.error && <span className="form-error">can't be empty</span>}
          </div>
          <input type="text" name="clientEmail" id="clientEmail" defaultValue={clientEmail.value} />
        </div>
        <div className="form-control">
          <div className="form-label">
            <label htmlFor="clientAddress">Street Address</label>
            {clientAddress.error && <span className="form-error">can't be empty</span>}
          </div>
          <input type="text" name="clientAddress" id="clientAddress" defaultValue={clientAddress.value} />
        </div>
        <div className="form-control-group">
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="clientCity">City</label>
              {clientCity.error && <span className="form-error">can't be empty</span>}
            </div>
            <input type="text" name="clientCity" id="clientCity" defaultValue={clientCity.value} />
          </div>
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="clientPostCode">Post Code</label>
              {clientPostCode.error && <span className="form-error">can't be empty</span>}
            </div>
            <input type="text" name="clientPostCode" id="clientPostCode" defaultValue={clientPostCode.value} />
          </div>
          <div className="form-control">
            <div className="form-label">
              <label htmlFor="clientCountry">Country</label>
              {clientCountry.error && <span className="form-error">can't be empty</span>}
            </div>
            <input type="text" name="clientCountry" id="clientCountry" defaultValue={clientCountry.value} />
          </div>
        </div>
        <div className="form-control" data-control="calendar">
          <div className="form-label">
            <label htmlFor="invoiceDate">Invoice Date</label>
            <span className="form-error"></span>
          </div>
          <input type="text" style={{display: 'none'}} />
          <CustomCalendar invoiceDate={invoiceDate} name='invoiceDate' />
        </div>
        <div className="form-control" data-control="select">
          <div className="form-label">
            <label>Payment Terms</label>
            {paymentTerms.error && <span className="form-error">can't be empty</span>}
          </div>
          <CustomSelect values={selectValues} value={paymentTerms} name='paymentTerms' />
        </div>
        <div className="form-control">
          <div className="form-label">
            <label htmlFor="projectDescription">Project Description</label>
            {projectDescription.error && <span className="form-error">can't be empty</span>}
          </div>
          <input type="text" name="projectDescription" id="projectDescription" defaultValue={projectDescription.value} />
        </div>
      </div>
      {/* bill to end */}
    </Wrapper>
  );
}

const Wrapper = styled.form`

`;

export default AddEditForm;