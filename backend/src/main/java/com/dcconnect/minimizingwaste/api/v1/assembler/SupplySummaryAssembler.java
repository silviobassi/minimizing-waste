package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.SupplyController;
import com.dcconnect.minimizingwaste.api.v1.model.SupplySummaryModel;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class SupplySummaryAssembler extends RepresentationModelAssemblerSupport<Supply, SupplySummaryModel> {

    @Autowired
    private ModelMapper modelMapper;

    public SupplySummaryAssembler() {
        super(SupplyController.class, SupplySummaryModel.class);
    }

    public SupplySummaryModel toModel(Supply supply){

        SupplySummaryModel supplySummaryModel = createModelWithId(supply.getId(), supply);

        modelMapper.map(supply, supplySummaryModel);

        return supplySummaryModel;
    }

    public CollectionModel<SupplySummaryModel> toCollectionModel(Iterable<? extends Supply> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(SupplyController.class).withSelfRel());
    }

}
