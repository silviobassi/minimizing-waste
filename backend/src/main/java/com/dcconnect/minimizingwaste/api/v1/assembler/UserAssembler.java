package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.AccessGroupSummary;
import com.dcconnect.minimizingwaste.api.v1.model.UserDetailed;
import com.dcconnect.minimizingwaste.domain.model.AccessGroup;
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

    public UserDetailed toModel(User user){
        return modelMapper.map(user, UserDetailed.class);
    }

    public List<UserDetailed> toCollectionModel(List<User> users){
        return users.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}
