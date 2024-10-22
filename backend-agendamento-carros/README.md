# Revisão de Carros
Aplicação desenvolvida com React Native e Spring Boot, tem como objetivo gerenciar revisões e serviços de carros, onde é possivel o usuário realizar seu cadastro e após login, agendar uma revisão, ver todas as suas revisões cadastradas, alterar o modelo do carro e o tipo de serviço, excluir uma revisão, marcar uma revisão como concluída e fazer o download do histórico de revisões.

## :computer: Começando
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### :clipboard: Pré-requisitos
Para conseguir seguir este README e rodar o projeto você pode precisar dos seguintes itens:
- Git para clonar o projeto e acessar as branches. Você pode instalar [aqui](https://git-scm.com/downloads);
- MySQL Workbench para gerenciar o banco de dados. Você pode instalar [aqui](https://dev.mysql.com/downloads/workbench/);

### :wrench: Instalação
Passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

1. Clone o repositório se ainda não clonou:
```
   git clone https://github.com/Luizeduard05/reactNative-cars.git.
```
2. Navegue até a pasta resources em "backend-agendamentos" e abra o arquivo:
```
    application.properties 
```
3. Configure o banco de dados:
```
   spring.application.name=revisao-carro
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   spring.jpa.show-sql=true
   spring.jpa.hibernate.ddl-auto=update
```
4. Configure suas variáveis de ambiente.
````
spring.datasource.url=${db_url}
spring.datasource.username=${db_username}
spring.datasource.password=${db_password}
api.security.token.secret=${api_security_token_secret}

````

## :computer: Rodando a aplicação
1. Inicie a API Spring Boot.

2. Inicie a Aplicação React Native seguindo as instruções do link:
```
https://github.com/Luizeduard05/reactNative-cars/blob/main/frontend-agendamento-carros/README.md
```
3. Documentação da api:
```
http://localhost:8080/swagger-ui/index.html#/
```

## :hammer_and_wrench: Principais Ferramentas
* [Java](https://www.oracle.com/br/java/technologies/downloads/#jdk17-windows) - Java 17 para executar a aplicação.
* [Spring Boot](https://spring.io/projects/spring-boot) - spring boot para desenvolver a aplicação.
* [MySQL](https://dev.mysql.com/downloads/workbench/) - para gerenciar o banco de dados.
* [Insomnia](https://insomnia.rest/download) - Para testar os endpoints.


