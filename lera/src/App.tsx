import './App.css';
import ProductList from './components/ProductList';
import { useState } from 'react';

type Product = {
  id: number;
  title: string;
  imgURL: string;
  description: string;
  price: number;
  quantity: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Spring Rolls",
      imgURL: "https://www.thefooddictator.com/wp-content/uploads/2020/01/springrolls.jpg",
      description: "Spring Rolls With Dipping Sauces",
      price: 550,
      quantity: 0
    },
    {
      id: 2,
      title: "General Tsao Chicken",
      imgURL: "https://www.recipetineats.com/uploads/2020/10/General-Tsao-Chicken_1.jpg",
      description: "General-Tsao-Chicken",
      price: 165,
      quantity: 0
    },
    {
      id: 3,
      title: "Dragon's Embrace",
      imgURL: "https://heybairtender.s3.amazonaws.com/recipes/dragon-s-embrace.png",
      description: "Dragon's Embrace drinks",
      price: 70,
      quantity: 0
    },
    {
      id: 4,
      title: "Eclipse Azteca",
      imgURL: "https://www.bargpt.app/_next/image?url=https%3A%2F%2Fheybairtender.s3.amazonaws.com%2Frecipes%2Feclipse-azteca.png&w=828&q=75",
      description: "a vibrant and spirited cocktail that embodies a celestial event in a glass",
      price: 155,
      quantity: 0
    },
    {
      id: 5,
      title: "Fluffy Pancakes",
      imgURL: "https://i.redd.it/4u6x6vf5c5sa1.jpg",
      description: "souffle pancakes",
      price: 90,
      quantity: 0
    }
  ]);

  const handleIncrement = (id: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecrement = (id: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleAddToCart = () => {
    const selected = products.filter(p => p.quantity > 0);

    if (selected.length === 0) {
      alert("No items selected.");
      return;
    }

    const message = `🛒 Added to cart:\n${selected
      .map(p => `${p.title} x${p.quantity} = ₱${(p.quantity * p.price).toFixed(2)}`)
      .join('\n')}\n\n🧾 Total: ₱${selected
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2)}`;

    alert(message);
  };

  return (
    <div>
      <div className="add-to-cart-container">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart 🛒
        </button>
      </div>

      <div className="container">
        {products.map(product => (
          <ProductList
            key={product.id}
            title={product.title}
            imgURL={product.imgURL}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            onIncrement={() => handleIncrement(product.id)}
            onDecrement={() => handleDecrement(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
