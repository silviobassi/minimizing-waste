package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.SupplyMovementController;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementDevolvedModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyMovementModel;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class SupplyMovementDevolvedAssembler extends RepresentationModelAssemblerSupport<SupplyMovement, SupplyMovementDevolvedModel> {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyMovementDevolvedAssembler() {
        super(SupplyMovementController.class, SupplyMovementDevolvedModel.class);
    }

    public SupplyMovementDevolvedModel toModel(SupplyMovement supplyMovement){
        SupplyMovementDevolvedModel supplyMovementDevolvedModel = createModelWithId(supplyMovement.getId(), supplyMovement);

        supplyMovementDevolvedModel.add(linkTo(methodOn(SupplyMovementController.class)
                .giveBackSupply(null, supplyMovement.getId())).withRel("give-back-supply"));

        supplyMovementDevolvedModel.add(linkTo(methodOn(SupplyMovementController.class)
                .vacateSupply(supplyMovement.getId())).withRel("vacate-supply"));

        modelMapper.map(supplyMovement, supplyMovementDevolvedModel);

        return supplyMovementDevolvedModel;
    }

    public CollectionModel<SupplyMovementDevolvedModel> toCollectionModel(Iterable<? extends SupplyMovement> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(SupplyMovementController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}
