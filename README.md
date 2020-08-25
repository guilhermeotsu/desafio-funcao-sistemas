# Desafio .NET Junior

Teste prático realizado para o processo seletivo para a vaga para pessoa desenvolvedora .NET Junior na empresa [Função Sistemas](https://www.funcao.com.br/).

## Desafio

O desafio consistia em criar um novo campo denominado CPF, dentro do cadastro/alteração dos clientes, permitindo assim o cadastramento do CPF do cliente.
<br/>

### Especificações do campo CPF: 
  * O novo campo deverá seguir o padrão visual dos demais campos da tela.
  * O cadastro do CPF será obrigatório.
  * Deverá possuir formatação padrão de CPF.
  * Deverá ter validação do CPF.
  * Não permitir ter CPF duplicados no banco de dados.

## Principal dificuldade no desafio

Tive um pouco dificuldade durante o desafio em trabalhar com Stored Procedures, o que nunca tinha feito antes, onde até o momento tinha contato com desenvolvimento de aplicações utlizando ORM (EF) e micro ORM (Dapper), mas como se trata de uma aplicação pequena consegui entender seu funcionamento e realizar o desafio sem grandes dificuldades, fora isso não tive outra dificuldade.

## Adicionais feitos

Além do desafio proposto, fiz também o método de **Excluir** um cliente. Adicionei também mascáras nos campos de CEP e Telefone no cadastro/edição de clientes. Removi a duplicidade de alguns arquivos .js (FI.AltCliente e FI.IncCliente) que faziam a mesma coisa, mantendo apenas um (FI.ClientesComum) com a finalidade de facilitar futuras manutenção/escala do sistema.