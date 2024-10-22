package com.revisao_carro.infra.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    GroupedOpenApi publicApi(){
        return GroupedOpenApi.builder()
                .group("public-apis")
                .pathsToMatch("/**")
                .build();
    }

    @Bean
    OpenAPI customOpenAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("Revisão Carros")
                        .version("1.0.0") // Versão da API
                        .description("API desenvolvida com Spring Boot, tem como objetivo gerenciar revisões" +
                                " e serviços de carros, onde é possivel o usuário realizar seu cadastro e após login, " +
                                "agendar uma revisão, ver todas as suas revisões cadastradas, alterar o modelo do carro" +
                                " e o tipo de serviço, excluir uma revisão, marcar uma revisão como concluída" +
                                " e fazer o download do histórico de revisões"))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(
                        new Components()
                                .addSecuritySchemes("bearerAuth",new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));


    }

}
