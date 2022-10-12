import Item1 from '../../images/ipadpro.jpg'
import Item2 from '../../images/mbp.jpg'
import Item3 from '../../images/atv.jpg'
import Item4 from '../../images/vga.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Super Ipad', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:549.99,img:Item1},
        {id:2,title:'MacBook Pro', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:1399.99,img: Item2},
        {id:3,title:'Apple TV', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:109.50,img: Item3},
        {id:4,title:'VGA Adapter', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:30.00,img:Item4},
    ],
    addedItems:[],
    total: 0

    

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){

        
        
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
        //  let text = document.getElementById("notification").textContent;
        //  document.getElementById("notif").innerHTML = text;
         alert(addedItem.title + " has been added to cart");
         
         if(existed_item)
         {
            
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }

                  
                  
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }

        
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
        console.log("TOTAL", addedItem.price);
          addedItem.quantity += 1 
          if(addedItem.quantity === 3 && addedItem.id === 3) {
            let newTotal = state.total + (addedItem.price+addedItem.price)
          }
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }

          
    }

    
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
        
  }

    return state
}

export default cartReducer