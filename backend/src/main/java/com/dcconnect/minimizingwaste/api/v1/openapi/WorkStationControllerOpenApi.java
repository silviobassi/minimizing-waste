package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.WorkStationModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationInput;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;

@Tag(name = "Work Stations", description = "Manage the Work Stations")
public interface WorkStationControllerOpenApi {

    PagedModel<WorkStationModel> all(Pageable pageable);

    public WorkStationModel create(WorkStationInput workStationInput);

    public WorkStationModel update(Long workStationId, WorkStationInput workStationInput);

    public void delete(Long workStationId);

    public WorkStationModel findById(Long workStationId);

}
