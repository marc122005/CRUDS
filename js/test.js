let title = document.getElementById("title");
let total = document.getElementById("total");
let category = document.getElementById("category");
let price = document.getElementById("price");
let taxces = document.getElementById("taxces");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let mood = "create";
let indexupdate;

function gettotal(){
    console.log("gettotal function called");
    if(price.value != "" ){
        total.innerHTML = +price.value + +taxces.value + +ads.value - +discount.value;
        total.style.backgroundColor = "green";
    }else{
        total.innerHTML = "";
        total.style.backgroundColor = "red";
    }
}

function cleardata(){
    title.value = "";
    price.value = "";
    taxces.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
}

let dataPro;
if(localStorage.getItem("products") == null){
    dataPro = [];
}else{
    dataPro = JSON.parse(localStorage.getItem("products"));
}

submit.onclick = function(){
    if(title.value != "" && price.value != ""){
        let newpro ={
            title: title.value,
            price: price.value,
            taxces: taxces.value,
            ads: ads.value,
            total: total.innerHTML,
            discount: discount.value,
            count: count.value,
            category: category.value
        };
        if(mood === "create"){
            if(newpro.count > 1){
            for(let i = 0; i < newpro.count; i++){
                dataPro.push(newpro);}
            }else{
                dataPro.push(newpro);
            }
        }else{
            dataPro[indexupdate] = newpro;

        }
        


        localStorage.setItem("products", JSON.stringify(dataPro));
        console.log(dataPro);
        cleardata();
        showdata();
    }
}

//show data function 
function showdata() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxces}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="deleteproduct(${i})">Delete</button></td>
                <td><button onclick="updateproduct(${i})">Update</button></td>
            </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;

    let deletall = document.getElementById("deletall");
    if(dataPro.length > 0 ){
        deletall.innerHTML = `
        <button onclick="deletall()">Delete All</button>
        `;
    }else{
        deletall.innerHTML = "";
    }

}
showdata();


// delete function product 
function deleteproduct(i){
    console.log(i);
    dataPro.splice(i, 1);
    localStorage.products = JSON.stringify(dataPro);
    showdata();
}

// delete all products 
function deletall(){
            dataPro.splice(0, dataPro.length);
            localStorage.setItem("products", JSON.stringify(dataPro));
            showdata();
}

// update function
function updateproduct(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxces.value = dataPro[i].taxces;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    gettotal();
    count.style.display = "none";
    submit.innerHTML = "update";
    mood = "update";
    category.value = dataPro[i].category;
    indexupdate = i;

}