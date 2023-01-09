package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.AssignmentModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AssignmentInput;
import com.dcconnect.minimizingwaste.core.data.PageWrapper;
import com.dcconnect.minimizingwaste.core.springdoc.PageableParameter;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.repository.filter.AssignmentFilter;
import com.dcconnect.minimizingwaste.infrastructure.spec.AssignmentSpecs;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "Assignments")
public interface AssignmentControllerOpenApi {

    @Operation(summary = "Lista as Tarefas")
    @PageableParameter
    public CollectionModel<AssignmentModel> search(AssignmentFilter assignmentFilter,
                                                   @Parameter(hidden = true) Pageable pageable);
    @Operation(summary = "Cria uma nova tarefa")
    AssignmentModel create(AssignmentInput assignmentInput);
    @Operation(summary = "Edita uma tarefa")
    AssignmentModel update(Long assignmentId, AssignmentInput assignmentInput);
    @Operation(summary = "Deleta uma tarefa")
    void delete(Long assignmentId);
    @Operation(summary = "Busca uma tarefa por ID")
    AssignmentModel findOrFail(Long assignmentId);

}
