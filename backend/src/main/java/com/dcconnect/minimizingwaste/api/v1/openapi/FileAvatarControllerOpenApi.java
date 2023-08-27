package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AvatarUrlModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AvatarInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.io.IOException;

@Tag(name = "Avatar")
public
interface FileAvatarControllerOpenApi {

    @Operation(summary = "Cria um avatar de usuário")
    AvatarUrlModel upload(@RequestBody(required = true) AvatarInput userPhotoInput) throws IOException;

    @Operation(summary = "Deleta um avatar de usuário")
    void remove(@Parameter(description = "nome de um arquivo existente", example = "lsafgsldgju8w5hj4o5ihgj9h5jo5j6h_file",
            required = true)String fileName);

    
}
