import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddEditForm from './AddEditForm';
import AddEditItems from './AddEditItems';
import { useAppContext } from '../context';
import { createAddEditFormObj } from '../utils/helper';

const AddEditBar = () => {
  const {
    addEditBar, 
    currentInvoice, 
    toggleAddEditBar, 
    addInvoice,
    editCurrentInvoice,
    addDraftInvoice
  } = useAppContext();
  
  const [formData, setFormData] = useState(createAddEditFormObj(currentInvoice));

  const [itemList, setItemList] = useState(
    currentInvoice?.items.map(item => ({...item, error: false})) 
    || 
    [{name: 'New Item', quantity: 1, price: 0, total: 0, error: false}]);

  // handle add edit bar close
  const addEditBarClose = e => {
    e.stopPropagation();
    if (e.target.classList.contains('add-edit-bar')) {
      toggleAddEditBar();
    }
  } 

  // handle data from form
  const handleFormData = e => {
    const el = e.target;
    const name = el.getAttribute('name');
    let value = el.value;

    if (name === 'paymentTerms') {
      value = parseInt(el.dataset.value);
    }

    if (name === 'invoiceDate') {
      value = el.dataset.value;
    }

    setFormData(prevValue => {
      return {...prevValue, [name]: {...prevValue[name], value}};
    });
  }

  // handle items data
  const handleItems = e => {
    const name = e.target.name;
    let value = e.target.value;
    
    if (name === 'price') {
      value = parseFloat(e.target.value ? e.target.value : 0);
    }

    if (name === 'quantity') {
      value = parseInt(e.target.value ? e.target.value : 0);
    }
    
    const id = parseInt(e.target.dataset.id);

    setItemList(prevValue => {
      const itemQty = name === 'quantity' ? value : prevValue.find((_, index) => index === id).quantity;
      const itemPrice = name === 'price' ? value : prevValue.find((_, index) => index === id).price;
      const tempItems = prevValue.map((item, index) => {
        if (index === id) {
          return {...item, [name]: value, total: itemQty * itemPrice};
        }
        return item;
      });
      return tempItems;
    });
  }

  // add new item to list item
  const addNewItem = () => {
    setItemList(prevValue => {
      return [
        ...prevValue,
        {
          name: 'New Item', quantity: 1, price: 0, total: 0, error: false
        }
      ]
    });
  }

  // remove item from list item
  const removeItem = id => {
    const tempItems = itemList.filter((_, index) => index !== id);

    setItemList(tempItems);
  }

  // check invoice values before send data
  const checkInvoiceValues = () => {
    let errors = 0;

    // check form values
    for (let data in formData) {
      if (!formData[data].value) {
        setFormData(prevValue => {
          return {...prevValue, [data]: {...prevValue[data], error: true}};
        });
        errors ++;
      } else {
        setFormData(prevValue => {
          return {...prevValue, [data]: {...prevValue[data], error: false}};
        });
      }
    }

    // check input values
    for (let i = 0; i < itemList.length; i++) {
      if (!itemList[i].name) {
        setItemList(prevValue => {
          return prevValue.map((item, index) => {
            if (index === i) {
              return {...item, error: true};
            }
            return item;
          });
        });
        errors ++;
      } else {
        setItemList(prevValue => {
          return prevValue.map((item, index) => {
            if (index === i) {
              return {...item, error: false};
            }
            return item;
          });
        });
      }
    }

    // if all values are filed
    if (itemList.length > 0 && errors === 0) {
      if (currentInvoice) {
        editCurrentInvoice(currentInvoice.id, formData, itemList);
      } else {
        addInvoice(formData, itemList);
      }
    }
  }

  useEffect(() => {
    setFormData(createAddEditFormObj(currentInvoice));
  }, [currentInvoice]);

  return (
    <Wrapper className={`${addEditBar ? 'add-edit-bar open' : 'add-edit-bar hide'}`} onClick={addEditBarClose}>
      <aside>
        <div>
          <h2>{currentInvoice ? `Edit #${currentInvoice.id}` : 'New Invoice'}</h2>
          <AddEditForm formData={formData} handleFormData={handleFormData} />
          <AddEditItems 
            items={itemList} 
            handleItems={handleItems} 
            addNewItem={addNewItem}
            removeItem={removeItem}  
          />
          <div className={`btns-container${currentInvoice ? ' edit-btns-container' : ''}`}>
            {currentInvoice ? 
              <>
                <button type="button" className="btn btn-grey" onClick={toggleAddEditBar}>Cancel</button>
                <button type="button" className="btn btn-purple" onClick={checkInvoiceValues}>Save Changes</button>
              </>
              :
              <>
                <button type="button" className="btn btn-grey" onClick={toggleAddEditBar}>Discard</button>
                <div>
                  <button type="button" className="btn btn-dark" onClick={() => addDraftInvoice(formData, itemList)}>Save as Draft</button>
                  <button type="button" className="btn btn-purple" onClick={checkInvoiceValues}>Save & Send</button>
                </div>
              </>
            }
          </div>
        </div>
      </aside>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4984);
  z-index: 1;
  opacity: 0;
  pointer-events: none;

  aside {
    position: absolute;
    top: 4.5rem;
    left: -100%;
    width: 100%;
    height: 100%;
    max-width: 640px;
    background: var(--clr-aside);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    transition: all 0.4s ease-in-out;
    
    > div {
      padding: 1.875rem 0.9375rem 6rem;
    }
  }

  &.hide {
    opacity: 0;
    pointer-events: none;
    transition: all 0.6s ease-in-out;
  }

  &.open {
    opacity: 1;
    pointer-events: auto;
  }

  &.open aside {
    left: 0;
  }

  h2 {
    margin-bottom: 1.875rem;
  }

  .btns-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.9375rem; 
    justify-content: space-between;
    margin-top: 3.125rem;

    div {
      display: flex;
      align-items: center;
      gap: 0.9375rem;
    }

    &.edit-btns-container {
      justify-content: flex-end;
    }
  }

  @media (min-width: 768px) {
    aside {
      border-radius: 0 20px 20px 0;

      > div {
        padding: 1.875rem 1.875rem 6rem;
      }
    }
  }

  @media (min-width: 1200px) {
    aside {
      top: 0;
      
      > div {
        padding: 1.875rem 1.875rem 1.875rem 3.9rem;
      }
    }

    &.open aside {
      left: 4.2rem;
    }
  }
`;

export default AddEditBar;