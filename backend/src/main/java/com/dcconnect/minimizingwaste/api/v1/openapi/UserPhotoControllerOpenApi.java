package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.UserPhotoModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserPhotoInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotAcceptableException;

import java.io.IOException;

@Tag(name = "Users")
public
interface UserPhotoControllerOpenApi {

    @Operation(summary = "Atualiza a foto do usuário")
    UserPhotoModel updatePhoto(@Parameter(description = "Id do usuário", example = "1", required = true) Long userId,
                               @RequestBody(required = true) UserPhotoInput userPhotoInput) throws IOException;

    @Operation(summary = "Busca a foto do usuário", responses = {
            @ApiResponse(responseCode = "200", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = UserPhotoModel.class)),
                    @Content(mediaType = "image/jpeg", schema = @Schema(type = "string", format = "binary")),
                    @Content(mediaType = "image/png", schema = @Schema(type = "string", format = "binary"))
            }),
            @ApiResponse(responseCode = "400", description = "ID do usuário inválido", content = {
                    @Content(schema = @Schema(ref = "Problem")) }),
            @ApiResponse(responseCode = "404", description = "Foto do usuário não encontrada", content = {
                    @Content(schema = @Schema(ref = "Problem")) }),
    })
    UserPhotoModel findByUserPhoto(@Parameter(description = "Id do usuário", example = "1", required = true) Long userId);

    @Operation(hidden = true)
    ResponseEntity<?> servePhoto(
            @Parameter(description = "Id do usuário", example = "1", required = true) Long userId, String acceptHeader)
            throws HttpMediaTypeNotAcceptableException;

    @Operation(summary = "Exclui a foto do usuário", responses = {
            @ApiResponse(responseCode = "204", description = "Foto do usuário excluída"),
            @ApiResponse(responseCode = "400", description = "ID do usuário inválido", content = {
                    @Content(schema = @Schema(ref = "Problem")) }),
            @ApiResponse(responseCode = "404", description = "Foto do usuário não encontrada", content = {
                    @Content(schema = @Schema(ref = "Problem")) }),
    })
    void deletePhoto(@Parameter(description = "Id do usuário", example = "1", required = true) Long userId);
    
}
