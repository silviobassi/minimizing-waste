package com.dcconnect.minimizingwaste.api.v1.controller;


import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyMovementNotificationAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementNotificationModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.SupplyMovementNotificationControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/supplies-movement/notifications")
public class SupplyMovementNotificationController implements SupplyMovementNotificationControllerOpenApi{

    @Autowired
    private SupplyRepository supplyRepository;

    @Autowired
    private SupplyMovementNotificationAssembler supplyMovementNotificationAssembler;

    @Autowired
    private PagedResourcesAssembler<SupplyMovement> pagedResourcesAssembler;

    @CheckSecurity.Notifications.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/available")
    public PagedModel<SupplyMovementNotificationModel> findNotificationBySuppliesAvailable(@PageableDefault(size = 2) Pageable pageable){
        Page<SupplyMovement> supplyMovementPage = supplyRepository.findNotificationBySuppliesAvailable(pageable);
        return pagedResourcesAssembler.toModel(supplyMovementPage, supplyMovementNotificationAssembler);
    }

}
