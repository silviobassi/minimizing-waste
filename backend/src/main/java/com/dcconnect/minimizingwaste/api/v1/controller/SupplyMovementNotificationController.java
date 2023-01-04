package com.dcconnect.minimizingwaste.api.v1.controller;


import com.dcconnect.minimizingwaste.api.v1.assembler.SupplyMovementNotificationAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementNotificationModel;
import com.dcconnect.minimizingwaste.api.v1.openapi.SupplyMovementNotificationControllerOpenApi;
import com.dcconnect.minimizingwaste.domain.repository.SupplyMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/supplies-movement/notifications")
public class SupplyMovementNotificationController implements SupplyMovementNotificationControllerOpenApi {

    @Autowired
    private SupplyMovementRepository supplyMovementRepository;

    @Autowired
    private SupplyMovementNotificationAssembler supplyMovementNotificationAssembler;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/available")
    public List<SupplyMovementNotificationModel> findNotificationBySuppliesAvailable(){
        return supplyMovementNotificationAssembler
                .toCollectionModel(supplyMovementRepository.findNotificationBySuppliesAvailable());
    }

}
