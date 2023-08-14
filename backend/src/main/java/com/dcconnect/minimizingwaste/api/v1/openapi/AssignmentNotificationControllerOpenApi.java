package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AssignmentNotificationModel;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentNotificationFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Tag(name = "Notifications")
public interface AssignmentNotificationControllerOpenApi {

    @Parameter(
            in = ParameterIn.QUERY,
            name = "completed",
            description = "Estado da tarefa completa (true|false).",
            schema = @Schema(type = "boolean")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "approved",
            description = "Estado da tarefa aprovada (true|false).",
            schema = @Schema(type = "boolean")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "currentDate",
            description = "Data atual.",
            schema = @Schema(type = "date-time"),
            example = "2023-01-08T22:30:00Z"
    )
    @Operation(summary = "Lista as notificações enviadas, completas, aprovadas e por data")
    List<AssignmentNotificationModel> search(@Parameter(hidden = true) AssignmentNotificationFilter assignmentNotificationFilter);

    @Parameter(
            in = ParameterIn.QUERY,
            name = "assign",
            description = "Atribuição ou não",
            schema = @Schema(type = "string"),
            example = "assignedTasks"
    )
    @Operation(summary = "Lista as notificações enviadas por tarefas atribuídas ou não atribuídas")
    List<AssignmentNotificationModel> findAllAssignedOrUnassigned(@Parameter(hidden = true) String assign);

}
