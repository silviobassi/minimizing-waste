package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.UserDetailedModel;
import com.dcconnect.minimizingwaste.domain.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public UserDetailedModel toModel(User user){
        return modelMapper.map(user, UserDetailedModel.class);
    }

    public List<UserDetailedModel> toCollectionModel(List<User> users){
        return users.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}
