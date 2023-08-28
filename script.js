let form = document.getElementById('adminform');
let link = 'https://crudcrud.com/api/9c2b2e2a5a32459181f18bf686419461/appointment';
form.addEventListener('submit', onSubmit);



//refresh
async function refresh(){
    axios.get(link)
        .try(res => {
            for (let i = 0; i < res.data.length; i++) {
                let obj = res.data[i];
                let ele = makeliElement(obj._id, obj.product, obj.price, obj.category);
                appendToSection(obj.category, ele);
            }
        })
        .catch(res => console.log(res));
}

//post(sending to cloud)
    async function onSubmit(e){
    e.preventDefault();
    let product = document.getElementById('product').value;
    let price = document.getElementById('price').value;
    let category = document.getElementById('cat').value;


try {
    await axios.post(link, { product: product, price: price, category: category });
    let res = await axios.get(link);
    let lastIndex = res.data.length - 1;
    let lastEleId = res.data[lastIndex]._id;
    let ele = makeliElement(lastEleId, product, price, category);
    appendToSection(category, ele);
    document.getElementById('product').value = '';
    document.getElementById('price').value = '';
    document.getElementById('cat').value = '';

    
} catch (res) {
    console.log(res);
}
}

//making element and appending deletebtn
function makeliElement(lastEleId, product, price, category) {
    let li = document.createElement('li');
    li.id = lastEleId;
    li.appendChild(document.createTextNode(`${product} is offered at a cost of ${price} in the ${category} section`));
   li.append(delButton());
    return li;
}

//creating delbutton
function delButton() {
    let btnDel = document.createElement('button');
    btnDel.className = 'btn-del';
    btnDel.appendChild(document.createTextNode('Delete'));
    return btnDel;
}

//appending elements to section
function appendToSection(category, ele) {
    switch (category) {
        case "skincare":
            document.getElementById('skincareitems').appendChild(ele);
            skincarebtn = document.getElementById('skincareitems')
            break;
            case "electronics":
                document.getElementById('electronicitems').appendChild(ele);
                break;
        case "food":
            document.getElementById('fooditems').appendChild(ele);
            break;
       
      
    }
}

//del button (delete from cloud)
document.getElementById('skincareitems').addEventListener('click', Del);
document.getElementById('electronicitems').addEventListener('click', Del);
document.getElementById('fooditems').addEventListener('click', Del);



async function Del(e){
    if (e.target.className == 'btn-del') {
        let id = e.target.parentNode.id
        let delLink = link + '/' + id;
        try {
            await axios.delete(delLink);
            e.target.parentNode.remove();
        } catch (res) {
            console.log(res);
        }
    }
}