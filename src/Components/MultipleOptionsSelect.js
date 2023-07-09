import React, { useState } from 'react';
import '../Assets/Styles/multipleSelect.css'; // Update the CSS file path based on its location

const MultipleOptionsSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectBtnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    const isSelected = selectedItems.includes(item);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="multiple-select-container">
      <div className={`select-btn ${isOpen ? 'open' : ''}`} onClick={handleSelectBtnClick}>
        <span className="btn-text">{selectedItems.length > 0 ? `${selectedItems.length} Seleccionadas` : 'Temática'}</span>
        <span className="arrow-dwn">
          <i className="arrow-down-icon"></i>
        </span>
      </div>

      <ul className={`list-items ${isOpen ? 'open' : ''}`}>
        <li className={`item ${selectedItems.includes('HTML & CSS') ? 'checked' : ''}`} onClick={() => handleItemClick('HTML & CSS')}>
          <span className="checkbox">
            <i className="check-icon"></i>
          </span>
          <span className="item-text">HTML & CSS</span>
        </li>
        <li className={`item ${selectedItems.includes('Bootstrap') ? 'checked' : ''}`} onClick={() => handleItemClick('Bootstrap')}>
          <span className="checkbox">
            <i className="check-icon"></i>
          </span>
          <span className="item-text">Bootstrap</span>
        </li>
        {/* Rest of the items */}
      </ul>
    </div>
  );
};

export default MultipleOptionsSelect;
