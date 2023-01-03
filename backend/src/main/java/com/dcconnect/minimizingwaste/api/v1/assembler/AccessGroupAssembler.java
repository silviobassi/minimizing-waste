package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AccessGroupController;
import com.dcconnect.minimizingwaste.api.v1.controller.UserAccessGroupController;
import com.dcconnect.minimizingwaste.api.v1.controller.WorkStationController;
import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummaryModel;
import com.dcconnect.minimizingwaste.api.v1.model.WorkStationModel;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
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
