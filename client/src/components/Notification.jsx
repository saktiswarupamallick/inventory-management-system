const Notification = ({ lowQuantityProducts }) => {
    return (
      <div className="notification">
        <h3>Low Quantity Products</h3>
        <ul>
          {lowQuantityProducts.map(product => (
            <li key={product._id}>
              {product.name} - Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  