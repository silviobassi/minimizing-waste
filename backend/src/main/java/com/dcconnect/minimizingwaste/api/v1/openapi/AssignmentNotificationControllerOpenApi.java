package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AssignmentNotificationModel;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentNotificationFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.Setter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
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
            schema = @Schema(type = "datetime"),
            example = "2023-01-08T22:30:00Z"
    )
    @Operation(summary = "Lista as notificações enviadas, por tarefas atribuídas")
    public List<AssignmentNotificationModel> search(@Parameter(hidden = true) AssignmentNotificationFilter assignmentNotificationFilter);

}
