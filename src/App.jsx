import { useState } from 'react'
import DummyAppContent from './dummy-app'
import ImageCarousel from './image-carousel'
import Accordion from './accordion'
import QuoteGenerator from './quote-generator'
import ShoppingList from './shopping-list'

function App() {
  const [activePage, setActivePage] = useState('home')

  return (
    <div className='app'>
      <div className="left-panel">
        <h2>Vite-react-app Exercise</h2>
        <hr />
        <ol className='menu'>
          <li><a href="#" className={activePage == 'home' && 'active'} onClick={()=> setActivePage('home')}>Home page</a></li>
          <li><a href="#" className={activePage == 'imageCarousel' && 'active'} onClick={()=> setActivePage('imageCarousel')}>Image Carousel</a></li>
          <li><a href="#" className={activePage == 'accordion' && 'active'} onClick={()=> setActivePage('accordion')}>Accordion</a></li>
          <li><a href="#" className={activePage == 'quoteGenerator' && 'active'} onClick={()=> setActivePage('quoteGenerator')}>Quote generator</a></li>
          <li><a href="#" className={activePage == 'shoppingList' && 'active'} onClick={()=> setActivePage('shoppingList')}>Shopping Cart</a></li>
        </ol>
      </div>
      <div className="right-panel">
        {activePage === 'home' && <DummyAppContent/>}
        {activePage === 'imageCarousel' && <ImageCarousel/>}
        {activePage === 'accordion' && <Accordion/>}
        {activePage === 'quoteGenerator' && <QuoteGenerator/>}
        {activePage === 'shoppingList' && <ShoppingList/>}
      </div>
    </div>
  )
}

export default App