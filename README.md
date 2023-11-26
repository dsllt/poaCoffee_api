# poaCoffee

Coffee locator application.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível o usuário fazer review de um café;
- [x] Deve ser possível o adminsitrador cadastrar um café;

- [x] Deve ser possível o visualizar todos cafés;
- [x] Deve ser possível o buscar cafés pelo nome;

- [x] Deve ser possível o adicionar tipos de café à um café;
- [x] Deve ser possível o adicionar comidas à um café;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] Apenas usuários logados podem fazer review;
- [x] Apenas adminsitradores podem cadastrar cafés;
- [x] Cafés precisam ter nome, endereço, descrição do local, lista de métodos e tipos de cafés oferecidos, e lista das 5 principais comidas ;


## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);