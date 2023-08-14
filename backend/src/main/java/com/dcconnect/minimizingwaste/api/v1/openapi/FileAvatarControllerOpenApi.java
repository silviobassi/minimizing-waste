package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AvatarUrlModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AvatarInput;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.io.IOException;

@Tag(name = "Avatar")
public
interface FileAvatarControllerOpenApi {

    @Operation(summary = "Cria um avatar de usuário")
    AvatarUrlModel upload(@RequestBody(required = true) AvatarInput userPhotoInput) throws IOException;

    
}
