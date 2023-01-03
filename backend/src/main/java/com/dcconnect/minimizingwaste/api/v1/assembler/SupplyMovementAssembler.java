package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.SupplyMovementController;
import com.dcconnect.minimizingwaste.api.v1.controller.UserController;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class SupplyMovementAssembler extends RepresentationModelAssemblerSupport<SupplyMovement, SupplyMovementModel> {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyMovementAssembler() {
        super(SupplyMovementController.class, SupplyMovementModel.class);
    }

    public SupplyMovementModel toModel(SupplyMovement supplyMovement){
        SupplyMovementModel supplyMovementModel = createModelWithId(supplyMovement.getId(), supplyMovement);

        supplyMovementModel.add(linkTo(methodOn(SupplyMovementController.class)
                .giveBackSupply(null, supplyMovement.getId())).withRel("give-back-supply"));

        supplyMovementModel.add(linkTo(methodOn(SupplyMovementController.class)
                .vacateSupply(supplyMovement.getId())).withRel("vacate-supply"));

        modelMapper.map(supplyMovement, supplyMovementModel);

        return supplyMovementModel;
    }

    public CollectionModel<SupplyMovementModel> toCollectionModel(Iterable<? extends SupplyMovement> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(SupplyMovementController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}
