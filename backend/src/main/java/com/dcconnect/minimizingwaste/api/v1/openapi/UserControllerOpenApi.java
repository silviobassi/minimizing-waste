package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.PasswordInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;

@Tag(name = "Users")
public interface UserControllerOpenApi {

    @Operation(summary = "Lista os usuários")
    public PagedModel<UserDetailedModel> all(@Parameter(hidden = true) Pageable pageable);

    @Operation(summary = "Cria um usuário")
    public UserDetailedModel create(@RequestBody(description = "Representação de um novo usuário", required = true)
                                        UserInput userInput);

    @Operation(summary = "Edita um usuário", responses = {
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    public UserDetailedModel update(
            @Parameter(description = "ID de um usuário", example = "1", required = true) Long userId,
            @RequestBody(description = "Representação de um usuário editado", required = true) UserInput userInput);

    @Operation(summary = "Busca um usuário pelo ID", responses = {
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    public UserDetailedModel findOrFail(
            @Parameter(description = "ID de um usuário", example = "1", required = true) Long userId);

    @Operation(summary = "Altera a Senha do usuário")
    public void changePassword(
            @Parameter(description = "ID de um usuário", example = "1", required = true) Long userId,
            @RequestBody(description = "Representação de uma nova senha", required = true) PasswordInput passwordInput);

}
