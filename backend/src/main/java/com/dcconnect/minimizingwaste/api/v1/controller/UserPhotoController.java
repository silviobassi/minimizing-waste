package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.UserPhotoAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.UserPhotoModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserPhotoInput;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import com.dcconnect.minimizingwaste.domain.service.UserPhotoService;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/users/{userId}/photo")
public class UserPhotoController {

    @Autowired
    private UserPhotoService userPhotoService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserPhotoAssembler userPhotoAssembler;
    @Autowired
    private UserRepository userRepository;

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public UserPhotoModel updatePhoto(@PathVariable Long userId, @Valid UserPhotoInput userPhotoInput)  {
        User user = userService.findOrFail(userId);
        UserPhoto userPhoto = new UserPhoto();
        userPhoto.setUser(user);
        userPhoto.setDescription(userPhotoInput.getDescription());
        userPhoto.setFileName(userPhotoInput.getFile().getOriginalFilename());
        userPhoto.setContentType(userPhotoInput.getFile().getContentType());
        userPhoto.setSize(userPhotoInput.getFile().getSize());

        return userPhotoAssembler.toModel(userPhotoService.create(userPhoto));
    }
}
