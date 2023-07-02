package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.Avatar;
import com.dcconnect.minimizingwaste.api.v1.model.AvatarModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AvatarAssembler{

    @Autowired
    private ModelMapper modelMapper;

    public AvatarModel toModel(Avatar avatar) {
        return modelMapper.map(avatar, AvatarModel.class);
    }

}
