# API_LaBook_3 :rocket:
Documentação oficial da API da rede social Labook.

## Link da documentação:

[Postman](https://documenter.getpostman.com/view/10904258/T17AjBDu?version=latest)

## Descrição
A API Labbok foi criada para ser usada como uma rede social com o objetivo de promover a conexão e interação entre seus mais diversos usuários. Os usuários podem criar posts de dois tipos ("evento" ou "normal"), comentá-los e curti-los também. 

## Endpoints:

:alien: 1. Cadastrar </br>
:alien: 2. Logar</br>
:alien: 3. Fazer amizade</br>
:alien: 4. Desfazer Amizade</br>
:alien: 5. Criar post</br>
:alien: 6. Ver todo o Feed</br>
:alien: 7. Ver apenas um tipo de post do Feed</br>
:alien: 8. Curtir Post</br>
:alien: 9. Descurtir Post</br> 
:alien: 10. Comentar Post</br>
:alien: 11. Paginar Feed</br>

### Instalando: :floppy_disk:

git clone https://github.com/Erika-Skarda/API_LaBook_3.git

Abra pasta no terminal e digite: npm install

Por fim, digite: code . e você poderá ver o código dessa API.

## Stack
Esse é um projeto de Backend feito utilizando NodeJS, Express, Typescript 
e MySQL. Além disso, ele segue uma arquitetura baseada em MVC, com 3 camadas 
simples:

:rocket: 1. Controller: responsável pela comunicação com agentes externos 
(como o Frontend)
:rocket: 2. Model: responsável pela representação das nossas entidades
:rocket: 3. Business: responsável pela lógica de negócio
