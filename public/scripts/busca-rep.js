// axios.get('https://api.github.com/users/Christianmsousa')
//   .then(function(response) {
//     console.log("Maior que 18 anos")
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log("Menor que 18 anos")
//     console.warn(error);
//   });

// https://api.github.com/users/Christianmsousa

// var age = parseInt(prompt('Digite sua idade: '), 10);


// function checarIdade(idade){
//   return new Promise(function(resolve, reject){

//     setTimeout(function(){
//       if(idade >= 18){
//         resolve();
//       }else{
//         reject();
//       };
//     }, 2000)
//   })
// }

// checarIdade(10)
//   .then(function(response){
//     console.log("Maior que 18");
//   })
//   .catch(function(error){
//     console.log("Menor que 18");
//   });
// 

const input = document.querySelector('.user');
const button = document.querySelector('.botao');
const divel = document.querySelector('.div-el');
const lista = document.querySelector('.rep');


function renderError(loading) {
  lista.innerHTML = "";
  var user = input.value;
  // var msgUserEmpty = !user ? "Preencha o usuário" : "Erro ao efetuar busca";
  if(!user || user === ""){
    var msgUserEmpty = "Preencha o usuário";
  } else{
    var msgUserEmpty = "Erro ao efetuar busca";
  }

  var textElement = document.createTextNode(msgUserEmpty);
  var errorElement = document.createElement("li");
  errorElement.style.color = "#F00";
  errorElement.appendChild(textElement);
  lista.appendChild(errorElement);
  divel.classList.remove("hidden")

};

function renderloading(loading){
  lista.innerHTML = ""
  var textoLoading = document.createTextNode("Carregando...");
  var LoadingElement = document.createElement('li');

  LoadingElement.appendChild(textoLoading);
  lista.appendChild(LoadingElement);
  divel.classList.remove("hidden")
}


const filtrar = repositorio =>{
  

  setTimeout(()=>{
    lista.innerHTML = "";
    for(repo of repositorio){
      var rep = document.createElement('li');
      var textrep = document.createTextNode(repo.name);
  
      rep.appendChild(textrep);
      lista.appendChild(rep);
    }
  }, 2000)
}
button.addEventListener('click', ()=>{
  var user = input.value;
  if(!user || user === ""){
    renderError();
  }else{
    renderloading();
    axios.get(`https://api.github.com/users/${user}/repos`)
    .then(response =>{
      filtrar(response.data)
      // console.log(response)
    })
    .catch(function(error) {
      renderError();
      console.warn(error);
    });
  }

})
input.addEventListener('keyup', (e) =>{
  if(e.keyCode === 13 ){
    var user = input.value;
    if(!user){
      renderError();
    }else{
      renderloading();
      axios.get(`https://api.github.com/users/${user}/repos`)
      .then(response =>{
        filtrar(response.data)
        console.log(response)
      })
      .catch(function(error) {
        renderError();
        console.warn(error);
      });
    }
  }
})