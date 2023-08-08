package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.model.input.UserPhotoInput;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.service.PhotoStorageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(value = "/v1/users/{userId}/photo")
public class UserPhotoController {

    @Autowired
    private PhotoStorageService photoStorageService;

    @CheckSecurity.Users.CanEdit
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public boolean updatePhoto(@PathVariable Long userId, @Valid UserPhotoInput userPhotoInput)
            throws IOException {
        MultipartFile file = userPhotoInput.getFile();

        String fileName = photoStorageService.generateFileName(file.getName());

        PhotoStorageService.NewPhoto newPhoto = PhotoStorageService.NewPhoto.builder()
                .fileName("e8510a52-fb7f-47d5-985b-c1c703345b79_file")
                .contentType(file.getContentType())
                .inputStream(file.getInputStream()).build();

        //return photoStorageService.replace(null, newPhoto);
        return photoStorageService.isPhoto(newPhoto);
    }


}
