package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AssignmentController;
import com.dcconnect.minimizingwaste.api.v1.controller.SupplyMovementNotificationController;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentNotificationModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementNotificationModel;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SupplyMovementNotificationAssembler extends RepresentationModelAssemblerSupport<SupplyMovement, SupplyMovementNotificationModel> {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyMovementNotificationAssembler() {
        super(SupplyMovementNotificationController.class, SupplyMovementNotificationModel.class);
    }
    public SupplyMovementNotificationModel toModel(SupplyMovement supplyMovement){
        return modelMapper.map(supplyMovement, SupplyMovementNotificationModel
                .class);
    }

    public List<SupplyMovementNotificationModel> toCollectionModel(List<SupplyMovement> supplyMovements){
        return supplyMovements.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}
