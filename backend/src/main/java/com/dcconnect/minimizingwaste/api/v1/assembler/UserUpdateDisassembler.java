package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.UserUpdateInput;
import com.dcconnect.minimizingwaste.domain.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserUpdateDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public User toDomainObject(UserUpdateInput userUpdateInput) {
        return modelMapper.map(userUpdateInput, User.class);
    }

    public void copyToDomainModel(UserUpdateInput userUpdateInput, User user) {
        modelMapper.map(userUpdateInput, user);
    }
}
