package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AccessGroupController;
import com.dcconnect.minimizingwaste.api.v1.controller.UserAccessGroupController;
import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummaryModel;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class AccessGroupAssembler extends RepresentationModelAssemblerSupport<AccessGroup, AccessGroupSummaryModel> {

    @Autowired
    private ModelMapper modelMapper;

    public AccessGroupAssembler() {
        super(UserAccessGroupController.class, AccessGroupSummaryModel.class);
    }

    public AccessGroupSummaryModel toModel(AccessGroup accessGroup){

        AccessGroupSummaryModel accessGroupSummaryModel = new AccessGroupSummaryModel();

        accessGroupSummaryModel
                .add(linkTo(methodOn(AccessGroupController.class)
                        .delete(accessGroup.getId())).withRel("delete"));

        modelMapper.map(accessGroup, accessGroupSummaryModel);

        return accessGroupSummaryModel;
    }

    public CollectionModel<AccessGroupSummaryModel> toCollectionModel(Iterable<? extends AccessGroup> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(AccessGroupController.class).withSelfRel());
    }



}
