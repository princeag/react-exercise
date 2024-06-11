import { useState, useRef } from "react"

export default function ShoppingList() {
    const [itemName, setItemName] = useState('')
    const [items, setItems] = useState([])
    const ref = useRef(null)

    function handleInputChange(e) {
        setItemName(e.target.value)
    }

    function addItem() {
        if(itemName.trim() == '') return;
        setItems([...items, itemName])
        setItemName('')
        ref.current.focus();
    }

    function handleDeleteItem(i) {
        let itemsAfterDelete = items.filter((v, k)=> i !== k)
        setItems(itemsAfterDelete);
    }

    function handleSort(e) {
        const target_value = e.target.value;
        console.log(target_value)
        let nextItems = [...items]

        if(target_value === 'a_z')
            nextItems.sort(function(a,b) { 
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            })
        else if(target_value === 'z_a')
            nextItems.sort(function(a,b) { 
                if (a > b) return -1;
                if (a < b) return 1;
                return 0;
            })
        setItems(nextItems)
    }

    return (
        <div className='shopping-list'>
            <h1>Shopping List</h1>
            <div>
                <input type="text" name='item-name' id='item-name' placeholder="add item" className='form-input' value={itemName} onChange={handleInputChange} ref={ref} />
                <button className='btn' onClick={addItem} disabled={itemName.trim() == ''}>Add Item</button>
                <button className="btn-link" onClick={()=> setItemName('')}>clear</button>
            </div>
            <div className='cart'>
                {items.length > 0 && <section>
                    <h4>Total items in your cart : {items.length}</h4>
                    <label htmlFor="sortby">Sort by:</label>&nbsp;
                    <select name="sortby" id="sortby" onChange={handleSort}>
                        <option value="" selected>Sort items</option>
                        <option value="a_z">A to Z</option>
                        <option value="z_a">Z to A</option>
                    </select>
                    <ol>
                        {items.map((item, i)=> (
                            <li key={i}>
                                <div className="cart-item">
                                    <p>{item}</p>
                                    <button className="btn btn-link btn-danger" onClick={()=>handleDeleteItem(i)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>}
                {items.length === 0 && <p className='text-danger'>No items in cart.</p>}
            </div>
        </div>
    )
}