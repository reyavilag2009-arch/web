import { useState } from 'react'
import './App.css'

// Datos de productos de ejemplo
const productsData = [
  { id: 1, name: 'Auriculares Wireless', price: 59.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Electrónica' },
  { id: 2, name: 'Reloj Inteligente', price: 129.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', category: 'Accesorios' },
  { id: 3, name: 'Cámara Instantánea', price: 89.99, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop', category: 'Fotografía' },
  { id: 4, name: 'Zapatillas Deportivas', price: 79.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', category: 'Deportes' },
  { id: 5, name: 'Gafas de Sol', price: 45.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop', category: 'Accesorios' },
  { id: 6, name: 'Mochila Urbana', price: 55.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', category: 'Viajes' },
]

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Añadir producto al carrito
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Actualizar cantidad
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Calcular total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">🛒 ShopStore</h1>
          <nav className="nav">
            <button 
              className="cart-btn" 
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              🛒 Carrito
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>Bienvenido a ShopStore</h2>
          <p>Encuentra los mejores productos al mejor precio</p>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <main className="container">
        <h2 className="section-title">Nuestros Productos</h2>
        <div className="products-grid">
          {productsData.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Carrito Lateral */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Tu Carrito</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
            </div>
            
            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>${item.price.toFixed(2)}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="checkout-btn">Proceder al Pago</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 ShopStore. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
