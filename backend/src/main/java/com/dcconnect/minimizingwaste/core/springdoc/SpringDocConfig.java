package com.dcconnect.minimizingwaste.core.springdoc;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import org.springdoc.core.customizers.OpenApiCustomiser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfig {

    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
                .info(
                        new Info().title("Minimizing Waste API")
                                .version("v1")
                                .description("Rest API do Minimizing Waste")
                                .license(new License()
                                        .name("Apache 2.0")
                                        .url("http://springdoc.com")
                                )
                ).externalDocs(new ExternalDocumentation()
                        .description("Enfatiza7 Marketing Digital e Desenvolvimento Web")
                        .url("https://enfatiza7.com")
                );
    }

    @Bean
    public OpenApiCustomiser openApiCustomiser(){
        return openApi -> {
            openApi.getPaths()
                    .values()
                    .stream()
                    .flatMap(pathItem -> pathItem.readOperations().stream())
                    .forEach(operation -> {
                        ApiResponses responses = operation.getResponses();

                        ApiResponse apiResponseNotFound = new ApiResponse()
                                .description("Recurso não encontrado");
                        ApiResponse apiResponseInternalError = new ApiResponse()
                                .description("Erro interno no servidor");

                        responses.addApiResponse("404", apiResponseNotFound);
                        responses.addApiResponse("500", apiResponseInternalError);
                    });
        };
    }

}
