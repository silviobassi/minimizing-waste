package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.PermissionDetailedModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.hateoas.CollectionModel;

@Tag(name = "Users")
public interface PermissionControllerOpenApi {

    @Operation(summary = "Lista as permissões de cada grupo de acesso")
    CollectionModel<PermissionDetailedModel> all();

}
