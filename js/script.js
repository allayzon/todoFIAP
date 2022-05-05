const inputBox = document.querySelector('#entrada')
const addBtn = document.querySelector('.inputField button')
const todoList = document.querySelector('.todoList')
const deleteAllBtn = document.querySelector('.footer button')

inputBox.onkeyup = _ => {
    let userData = inputBox.value //Esta variável pega o valor de entrada do usuário
    if(userData.trim() != 0) { //Se os valores do usuário não forem apenas espaços
        addBtn.classList.add('active')
    }else{
        addBtn.classList.remove('active')
    }
}

showTasks()

addBtn.onclick = _ => {
    let userData = inputBox.value
    let getLocalStorage = localStorage.getItem('New Todo') //Esta variável vai pegar o armazenamento local
    if(getLocalStorage == null) { //Vamos verificar se o armazenamento local for nulo
        ListArr = [] //Vamos criar um array vazio
    }else{
        ListArr = JSON.parse(getLocalStorage) //Estamos empurrando ou adicionando dados do usuário à nossa lista
    }
    ListArr.push(userData) //Empurrando para dentro do array os dados do usuário
    localStorage.setItem('New Todo', JSON.stringify(ListArr)) //Estamos transformando um objeto js em um fragmento js
    showTasks()
}

//Função para adicionar tarefas dentro da lista 
function showTasks() {
    let getLocalStorage = localStorage.getItem('New Todo')
    if(getLocalStorage == null) {
        ListArr = []
    }else{
        ListArr = JSON.parse(getLocalStorage)
    }
    const pendingNum = document.querySelector('.pendingNum')
    pendingNum.textContent = ListArr.length

    if(ListArr.length > 0) { //Se o tamanho do array for maior que 0
        deleteAllBtn.classList.add('active') //Ativa a classe active
    }else{
        deleteAllBtn.classList.remove('active') //Desativa a classe active
    }

    let newLiTag = ''
    addBtn.classList.remove('active')
    ListArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})">apagar</span></li>`
    })
    todoList.innerHTML = newLiTag //Adicionando uma nova li dentro da nossa lista no html
    inputBox.value = '' //Uma vez adicionada a tarefa, deixe o campo entrada em branco
}

//Função para deletar uma tarefa específica
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem('New Todo')
    ListArr = JSON.parse(getLocalStorage)
    ListArr.splice(index, 1) //Exclui ou remove um determinado item indexado
    //?Depois de remover o item, atualize novamente o armazenamento local
    localStorage.setItem('New Todo', JSON.stringify(ListArr))
    showTasks()
}

//Vamos criar uma função que deleta todas as funções 
deleteAllBtn.onclick = _ => {
    ListArr = [] //Array vazio
    //Após deletar todas as tarefas atualizar novamente o armazenamento local
    localStorage.setItem('New Todo', JSON.stringify(ListArr))
    showTasks()
}