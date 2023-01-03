package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.AccessGroupController;
import com.dcconnect.minimizingwaste.api.v1.controller.UserAccessGroupController;
import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummaryModel;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class UserAccessGroupAssembler extends RepresentationModelAssemblerSupport<AccessGroup, AccessGroupSummaryModel> {

    @Autowired
    private ModelMapper modelMapper;

    @Getter
    @Setter
    private Long userId;

    public UserAccessGroupAssembler() {
        super(UserAccessGroupController.class, AccessGroupSummaryModel.class);
    }

    public AccessGroupSummaryModel toModel(AccessGroup accessGroup){

        AccessGroupSummaryModel accessGroupSummaryModel = new AccessGroupSummaryModel();

        accessGroupSummaryModel.add(linkTo(methodOn(UserAccessGroupController.class)
                .associate(getUserId(), accessGroup.getId())).withRel("disassociate"));

        modelMapper.map(accessGroup, accessGroupSummaryModel);

        return accessGroupSummaryModel;
    }

    public CollectionModel<AccessGroupSummaryModel> toCollectionModel(
            Iterable<? extends AccessGroup> entities,
            Long userId){

        setUserId(userId);
        return super.toCollectionModel(entities)
                .add(linkTo(methodOn(UserAccessGroupController.class).all(getUserId())).withSelfRel());
    }



}
