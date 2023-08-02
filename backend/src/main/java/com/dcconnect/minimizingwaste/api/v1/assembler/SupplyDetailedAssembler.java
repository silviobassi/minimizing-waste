package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AssignmentController;
import com.dcconnect.minimizingwaste.api.v1.controller.SupplyController;
import com.dcconnect.minimizingwaste.api.v1.model.AssignmentModel;
import com.dcconnect.minimizingwaste.api.v1.model.SupplyDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;


@Component
public class SupplyDetailedAssembler extends RepresentationModelAssemblerSupport<Supply, SupplyDetailedModel> {

    @Autowired
    private ModelMapper modelMapper;

    public SupplyDetailedAssembler() {
        super(SupplyController.class, SupplyDetailedModel.class);
    }

    public SupplyDetailedModel toModel(Supply supply){
        SupplyDetailedModel supplyDetailedModel = createModelWithId(supply.getId(), supply);
        supplyDetailedModel.setManipulation(supply.getManipulation());
        supplyDetailedModel.setBulk(supply.getBulk());
        modelMapper.map(supply, supplyDetailedModel);
        return supplyDetailedModel;
    }

    public CollectionModel<SupplyDetailedModel> toCollectionModel(Iterable <? extends Supply> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(AssignmentController.class).withSelfRel());
    }

}
