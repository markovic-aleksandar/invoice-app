import { useState } from 'react';
import styled from 'styled-components';
import { formatNumber } from '../utils/helper';
import { iconDelete, iconPlus } from '../utils/constants';

const AddEditItems = ({items, handleItems, addNewItem, removeItem}) => {
  const [focusedIndex, setFocusedIndex] = useState(null);


  const focusInput = e => {
    const el = e.target;
    const index = el.dataset.id;
    el.value = parseFloat(el.value).toFixed(0);
    setFocusedIndex(parseInt(index));
  }

  const blurInput = e => {
    const el = e.target;
    el.value = parseFloat(el.value).toFixed(2);
    setFocusedIndex(null);
  }

  return (
    <Wrapper>
      <h3>Item List</h3>
      <div className="items">
        {items.length < 1 ?
          <p className="no-items">You need to have least one item!</p>
          :
          items.map((item, index) => {
            const {name, quantity, price, error} = item;
            const total = quantity * price;
            return <article key={index} className="item">
              <div className="form-control">
                <div className="form-label">
                  <label htmlFor={`itemName${index}`}>Name</label>
                  {error && <span className="form-error">can't be empty</span>}
                </div>
                <input 
                  type="text" 
                  name="name" 
                  id={`itemName${index}`} 
                  value={name} 
                  data-id={index}
                  onChange={handleItems}
                />
              </div>
              <div>
                <div className="form-control qty">
                  <label htmlFor={`itemQty${index}`}>Qty.</label>
                  <input 
                    type="number"
                    name="quantity" 
                    id={`itemQty${index}`} 
                    value={formatNumber(quantity)}
                    data-id={index}
                    onChange={handleItems}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor={`itemPrice${index}`}>Price</label>
                  <input 
                    type="number" 
                    name="price" 
                    id={`itemPrice${index}`}
                    value={focusedIndex === index ? formatNumber(price) : parseFloat(price).toFixed(2)}
                    data-id={index}
                    onChange={handleItems}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </div>
                <div className="form-control item-total">
                  <label htmlFor={`itemTotal${index}`}>Total</label>
                  <div>
                    <input type="text" id={`itemTotal${index}`} value={total.toFixed(2)} disabled />
                    <button type="button" onClick={() => removeItem(index)}>
                      {iconDelete}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          })
        }
      </div>
      <button type="button" className="btn btn-grey btn-add-item" onClick={addNewItem}>
        {iconPlus}
        Add New Item
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 2.5rem;
  
  h3 {
    color: #777f98;
  }

  .no-items {
    color: var(--red);
    margin-top: 0.9375rem;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 1.875rem;

    .item {
      display: grid;
      grid-template-columns: 1fr;

      > div:last-child {
        display: grid;
        align-items: center;
        gap: 0.9375rem;
        grid-template-columns: 1fr 1fr 1fr;

        input {
          padding: 0 0 0 1.125rem;
        }

        input:disabled {
          padding: 0;
        }

      }

      .qty input {
        text-align: center;
        padding: 0 !important;
      }

      .form-label {
        margin-bottom: 0;
      }

      label {
        display: block;
        margin-bottom: 0.625rem;
      }

      .item-total > div {
        display: flex;
        align-items: center;

        button {
          background: transparent;
          padding: 0;
          border: none;
          cursor: pointer;

          &:hover {
            svg path {
              fill: var(--red);
            }
          }
        }
      }
    }
  }

  .btn-add-item {
    width: 100%;
    svg {
      margin-right: 5px;
    }
  }

  @media (min-width: 768px) {
    .items {
      .item {
        grid-template-columns: 0.4fr 0.6fr;
        gap: 0.9375rem;
        
        > div:last-child {
          grid-template-columns: 50px 0.9fr 1fr;
        }
      }
    }
  }
`;

export default AddEditItems;