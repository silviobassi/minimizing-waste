package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.PasswordInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserInput;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserUpdateInput;
import com.dcconnect.minimizingwaste.domain.repository.filter.UserFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.PagedModel;

@Tag(name = "Users")
public interface UserControllerOpenApi {

    @Operation(summary = "Lista os usuários")
    @Parameter(
            in = ParameterIn.QUERY,
            name = "userName",
            description = "Nome do usuário",
            example = "Pedro",
            schema = @Schema(type = "string")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "userCpf",
            example = "99999999999",
            description = "Cpf do usuário",
            schema = @Schema(type = "string")
    )
    PagedModel<UserDetailedModel> search(
            @Parameter(hidden = true) UserFilter userFilter,
            @Parameter(hidden = true) @PageableDefault(size = 10) Pageable pageable);

    @Operation(summary = "Cria um novo usuário")
    public UserDetailedModel create(@RequestBody(description = "Representação de um novo usuário", required = true)
                                        UserInput userInput);

    @Operation(summary = "Edita um usuário", responses = {
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    UserDetailedModel update(
            @Parameter(description = "ID de um usuário", example = "1", required = true) Long userId,
            @RequestBody(description = "Representação de um usuário editado", required = true) UserUpdateInput userUpdateInput);

    @Operation(summary = "Busca um usuário pelo ID", responses = {
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    UserDetailedModel findOrFail(
            @Parameter(description = "ID de um usuário", example = "1", required = true) Long userId);

    @Operation(summary = "Altera a Senha do usuário", responses = {
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado",
                    content = @Content(schema = @Schema(ref = "Problem")))
    })
    void changePassword(
            @Parameter(description = "ID de um usuário", example = "1", required = true) Long userId,
            @RequestBody(description = "Representação de uma nova senha", required = true) PasswordInput passwordInput);

}
