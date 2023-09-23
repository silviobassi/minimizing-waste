package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AssignmentResponsibleModel;
import com.dcconnect.minimizingwaste.core.springdoc.PageableParameter;
import com.dcconnect.minimizingwaste.domain.repository.filter.ResponsibleFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.PagedModel;

@Tag(name = "Assignments")
public interface EmployeeAssignmentControllerOpenApi {

    @Operation(summary = "Lista as Tarefas de um determinado Responsável")
    @PageableParameter
    @Parameter(
            in = ParameterIn.QUERY,
            name = "responsibleName",
            example = "Márcio dos Sant...",
            description = "Nome do responsável pelas tarefas",
            schema = @Schema(type = "string")
    )
    @Parameter(
            in = ParameterIn.QUERY,
            name = "responsibleCpf",
            example = "184.964.100-56",
            description = "CPF do responsável pelas tarefas",
            schema = @Schema(type = "string")
    )
   PagedModel<AssignmentResponsibleModel> search(@Parameter(hidden = true) ResponsibleFilter responsibleFilter,
                                                 @Parameter(hidden = true) Pageable pageable);
}
