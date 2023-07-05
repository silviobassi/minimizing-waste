package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.assembler.AvatarAssembler;
import com.dcconnect.minimizingwaste.api.v1.assembler.UserPhotoAssembler;
import com.dcconnect.minimizingwaste.api.v1.model.Avatar;
import com.dcconnect.minimizingwaste.api.v1.model.AvatarModel;
import com.dcconnect.minimizingwaste.api.v1.model.UserPhotoModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.UserPhotoInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.UserPhotoControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.exception.EntityNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import com.dcconnect.minimizingwaste.domain.service.PhotoStorageService;
import com.dcconnect.minimizingwaste.domain.service.UserPhotoService;
import com.dcconnect.minimizingwaste.domain.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.dcconnect.minimizingwaste.domain.service.PhotoStorageService.RecoveredPhoto;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/v1/users/{userId}/photo")
public class UserPhotoController implements UserPhotoControllerOpenApi {

    @Autowired
    private UserPhotoService userPhotoService;

    @Autowired
    private PhotoStorageService photoStorageService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserPhotoAssembler userPhotoAssembler;

    @Autowired
    private AvatarAssembler avatarAssembler;
    @Autowired
    private UserRepository userRepository;

    @CheckSecurity.Users.CanEdit
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public UserPhotoModel updatePhoto(@PathVariable Long userId, @Valid UserPhotoInput userPhotoInput)
            throws IOException {
        User user = userService.findOrFail(userId);

        MultipartFile file =  userPhotoInput.getFile();

        UserPhoto userPhoto = new UserPhoto();
        userPhoto.setUser(user);
        userPhoto.setDescription(userPhotoInput.getDescription());
        userPhoto.setFileName(userPhotoInput.getFile().getName());
        userPhoto.setContentType(userPhotoInput.getFile().getContentType());
        userPhoto.setSize(userPhotoInput.getFile().getSize());

        return userPhotoAssembler.toModel(userPhotoService.create(userPhoto, file.getInputStream()));
    }

    @CheckSecurity.Users.CanConsult
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public UserPhotoModel findByUserPhoto(@PathVariable Long userId){
        UserPhoto userPhoto = userPhotoService.findOrFail(userId);
        return userPhotoAssembler.toModel(userPhoto);
    }

    @CheckSecurity.Users.CanPhotoConsult
    @GetMapping("/recovered")
    public ResponseEntity<?> servePhoto(
            @PathVariable Long userId, @RequestHeader(name = "accept") String acceptHeader)
            throws HttpMediaTypeNotAcceptableException{
        try{
            UserPhoto userPhoto = userPhotoService.findOrFail(userId);

            MediaType mediaTypePhoto = MediaType.parseMediaType(userPhoto.getContentType());
            List<MediaType> mediaTypesAccept = MediaType.parseMediaTypes(acceptHeader);

            checkMediaTypeCompatibility(mediaTypePhoto, mediaTypesAccept);

            RecoveredPhoto recoveredPhoto = photoStorageService.recover(userPhoto.getFileName());

            if(recoveredPhoto.isUrl()){

                Avatar avatar = new Avatar();
                avatar.setAvatarUrl(recoveredPhoto.getUrl());
                return ResponseEntity.status(HttpStatus.OK)
                        .body(avatarAssembler.toModel(avatar));
            } else {
                return ResponseEntity.ok()
                        .contentType(mediaTypePhoto)
                        .body(new InputStreamResource(recoveredPhoto.getInputStream()));
            }


        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }

    }

    @CheckSecurity.Users.CanEdit
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping
    public void deletePhoto(@PathVariable Long userId){
        userPhotoService.delete(userId);
    }

    private void checkMediaTypeCompatibility(MediaType mediaTypePhoto, List<MediaType> mediaTypesAccept)
            throws HttpMediaTypeNotAcceptableException {

        boolean compatible = mediaTypesAccept.stream()
                .anyMatch(mediaTypeAccept -> mediaTypeAccept.isCompatibleWith(mediaTypePhoto));

        if(!compatible){
            throw new HttpMediaTypeNotAcceptableException(mediaTypesAccept);
        }
    }
}
