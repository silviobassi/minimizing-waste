package com.dcconnect.minimizingwaste.api.v1.openapi;

import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplySummaryModel;
import com.dcconnect.minimizingwaste.core.data.PageWrapper;
import com.dcconnect.minimizingwaste.core.springdoc.PageableParameter;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.repository.filter.SupplyFilter;
import com.dcconnect.minimizingwaste.infrastructure.spec.SupplySpecs;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;

@Tag(name = "Supplies")
public interface SupplyControllerOpenApi {

    @Operation(summary = "Lista recursos")
    @PageableParameter
    public PagedModel<SupplySummaryModel> search(SupplyFilter supplyFilter, @Parameter(hidden = true) Pageable pageable);
    @Operation(summary = "Deleta um recurso")
    public void delete(Long supplyId);
    @Operation(summary = "Busca um recurso por ID")
    public SupplyDetailedModel findById(Long supplyId);
}
