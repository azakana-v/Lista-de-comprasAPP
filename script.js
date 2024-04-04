function script() {
  const items = [];
  let listaProdutos = document.querySelector(".lista-produtos");
  let total = document.querySelector(".soma-produto");
  let soma = 0;

  setLastState();

  //Main button, add items to the list
  document.querySelector("input[type=submit]").addEventListener("click", () => {
    //Get input values
    let nomeProduto = document.querySelector("input[name=nome_produto]").value;
    let valorProduto = document.querySelector("input[name=price]").value;

    if (nomeProduto != "" && valorProduto != "") {
      //Verify if the inputs are not empty.
      //Add item to array
      items.push({
        nome: nomeProduto,
        valor: parseFloat(valorProduto),
      });

      //Visually add
      listaProdutos.innerHTML +=
        `
            <div class="lista-produtos-single">
                <h3>` +
        nomeProduto +
        `</h3>
                <h3 class="price-product"> <span>R$` +
        valorProduto +
        `</span></h3>
            </div>`;

      clearInputs();

      //Do the sum and add visually
      soma = doValueSum(items);
      total.innerHTML =
        ` 
           <h1>Total</h1>
          <h2>R$` +
        soma +
        `</h2>`;
      addAnimationAfter1S("scale-in-ver-top");
    }

    saveState();
    console.log(items);
  });

  //Clear List
  document.querySelector("#clear-button").addEventListener("click", () => {
    clearList();
    saveState();
  });

  function addAnimationAfter1S(nameAnimation) {
    listaProdutosSingle = document.querySelectorAll(".lista-produtos-single");
    setTimeout(() => {
      listaProdutosSingle[listaProdutosSingle.length - 1].classList.add(
        nameAnimation
      );
    }, 1);
    setTimeout(() => {
      listaProdutosSingle[listaProdutosSingle.length - 1].classList.toggle(
        nameAnimation
      );
    }, 1000);
  }

  function clearInputs() {
    let nomeProduto = document.querySelector("input[name=nome_produto]");
    let valorProduto = document.querySelector("input[name=price]");
    nomeProduto.value = "";
    valorProduto.value = "";
  }

  function doValueSum(array) {
    let sum = 0;
    for (let objects in array) {
      sum += array[objects].valor;
    }
    return sum;
  }

  function clearList() {
    items.length = 0;
    soma = 0;
    listaProdutos.classList.add("scale-out-top");
    setTimeout(() => {
      listaProdutos.innerHTML = "";
      total.innerHTML =
        ` 
        <h1>Total</h1>
        <h2>R$` +
        soma +
        `,00</h2>`;
      listaProdutos.classList.remove("scale-out-top");
    }, 600);
    saveState();
  }

  function saveState() {
  
    setTimeout(()=>{localStorage.setItem("listaProdutos", listaProdutos.innerHTML)}, 601);
    localStorage.setItem("listArray", JSON.stringify(items));
    localStorage.setItem("total", soma);
  }

  function setLastState() {
    listaProdutos.innerHTML = localStorage.getItem("listaProdutos");
    soma = localStorage.getItem("total");
    lastItems = JSON.parse(localStorage.getItem("listArray"));
    if(lastItems!=null){
    for (let index = 0; index < lastItems.length; index++) {
      items.push(lastItems[index]);
    }
    }
    if(soma!=null){
    total.innerHTML =
      ` 
    <h1>Total</h1>
   <h2>R$` +
      soma +
      `</h2>`;
    }else{
      total.innerHTML =
      ` 
    <h1>Total</h1>
    <h2>R$0,00</h2>`;
    }
  }
} //Dom prepare
