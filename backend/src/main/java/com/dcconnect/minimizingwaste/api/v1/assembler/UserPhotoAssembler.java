package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.UserPhotoController;
import com.dcconnect.minimizingwaste.api.v1.model.UserPhotoModel;
import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Component
public class UserPhotoAssembler extends RepresentationModelAssemblerSupport<UserPhoto, UserPhotoModel> {

    @Autowired
    private ModelMapper modelMapper;

    public UserPhotoAssembler() {
        super(UserPhotoController.class, UserPhotoModel.class);
    }

    public UserPhotoModel toModel(UserPhoto userPhoto){

        UserPhotoModel userPhotoModel = new UserPhotoModel();

        modelMapper.map(userPhoto, userPhotoModel);

        return userPhotoModel;
    }

    public CollectionModel<UserPhotoModel> toCollectionModel(Iterable<? extends UserPhoto> entities){
        return super.toCollectionModel(entities);
    }

}
