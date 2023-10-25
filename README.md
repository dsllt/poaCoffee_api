# poaCoffee

Coffee locator application.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível o usuário fazer review de um café;
- [ ] Deve ser possível o adminsitrador cadastrar um café;

- [ ] Deve ser possível o visualizar todos cafés;
- [ ] Deve ser possível o buscar cafés pelo nome;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] Apenas usuários logados podem fazer review;
- [ ] Apenas adminsitradores podem cadastrar cafés;
- [ ] Cafés precisam ter nome, endereço, descrição do local, lista de métodos e tipos de cafés oferecidos, e lista das 5 principais comidas ;


## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);