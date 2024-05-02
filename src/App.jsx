import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState, useEffect} from "react"
import { db } from "./data/db"

function App() {

const initialCart = () => {
  const localStorageCart = localStorage.getItem('cart')
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

  const [data, setData] =useState(db)
  const [cart, setCart] =useState(initialCart)

  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  function addToCart(item) {

    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0) {
      if(cart[itemExists].quantity >= 5) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
    item.quantity = 1
    setCart(prevCart => [...prevCart, item])
    }
  }
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
      const updatedCart = cart.map( item => {
        if(item.id === id && item.quantity < 5) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }



  return (
    <>

      <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
              <Guitar 
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}

                />
          ))}
          
          

        
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App