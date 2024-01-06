import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ModalContainer = styled.div`
  /* ... (modal styling) */
`;

const ProductListModal = ({ closeModal, onSelectProduct }) => {
  const products = useSelector(state => state.product.products);

  return (
    <ModalContainer>
      <h2>Select a Product</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <button onClick={() => onSelectProduct(product.name)}>
              {product.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={closeModal}>Close</button>
    </ModalContainer>
  );
};

export default ProductListModal;
