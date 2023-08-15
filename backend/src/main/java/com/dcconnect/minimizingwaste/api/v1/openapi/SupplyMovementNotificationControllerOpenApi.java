package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementNotificationModel;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.PagedModel;

import java.util.List;

@Tag(name = "Notifications")
public interface SupplyMovementNotificationControllerOpenApi {

    @Operation(summary = "Lista as notificações enviadas, por recursos atribuídos")
    PagedModel<SupplyMovementNotificationModel> findNotificationBySuppliesAvailable(@PageableDefault(size = 2) Pageable pageable);

}
