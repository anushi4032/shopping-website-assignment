let cart = [];
let url="https://dummyjson.com/products?limit=194";
async function getdata(){
    let url1=await fetch(url);
    let data=await url1.json();
    let allproduct=data.products;
    let container=document.querySelector("#div1");
    allproduct.forEach(item=>{
      container.innerHTML=container.innerHTML+`
        <div class="product-card" onclick="getproductdetails(${item.id})">
          <img src="${item.thumbnail}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>Price: $${item.price}</p>
          <button onclick="event.stopPropagation(); addToCart(${item.id}, '${item.title}', ${item.price})">Add to Cart</button>  
        </div>`
 })
}
getdata();
function addToCart(id, title, price) {
    let product = { id: id, title: title, price: price };
    cart.push(product); // Add item to our basket array
    
    alert(`${title} has been added to your cart!`);
    console.log("Current items in basket:", cart);
}
async function getproductdetails(id){
    let url2=`https://dummyjson.com/products/${id}`;
    let url2data=await fetch(url2);
    let productdetails=await url2data.json();
    let detailsBox = document.querySelector("#single-product-container");;
    document.querySelector("#div1").style.display = "none";  
    document.querySelector("#div2").style.display = "block";
    detailsBox.innerHTML=`
        <h2>${productdetails.title}</h2>
        <img src="${productdetails.images[0]}" width="250">
        <p>${productdetails.description}</p>
        <h3>Price: $${productdetails.price}</h3>
        `
    document.querySelector("#back-btn").addEventListener("click", () => {
    document.querySelector("#div1").style.display = ""; // Show the listing grid again
    document.querySelector("#div2").style.display = "none";  // Hide the details box
});
}
function showCartPage() {
    document.querySelector("#div1").style.display = "none";
    document.querySelector("#div2").style.display = "none";
    document.querySelector("#div3").style.display = "block"; // Assuming you add #div3 in HTML
    
    let cartItemsBox = document.querySelector("#cart-items-container");
    let billBox = document.querySelector("#bill-summary");
    cartItemsBox.innerHTML = "";
    
    let totalBill = 0; 
    cart.forEach(item => {
        cartItemsBox.innerHTML += `
            <div style="border-bottom: 1px dashed #ccc; padding: 10px;">
                <h4>${item.title} - $${item.price}</h4>
            </div>
        `;
        
        totalBill = totalBill + item.price;
    });
    

    billBox.innerHTML = `
        <h3>Bill Summary</h3>
        <p>Total Selected Items: ${cart.length}</p>
        <h2>Total Amount: $${totalBill}</h2>
    `;
    document.querySelector("#cart-back-btn").addEventListener("click", () => {
    document.querySelector("#div3").style.display = "none";
    document.querySelector("#div1").style.display = ""; // Returns nicely to your original grid layout
});
}
