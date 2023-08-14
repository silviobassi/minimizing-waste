package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.model.AvatarUrlModel;
import com.dcconnect.minimizingwaste.api.v1.model.input.AvatarInput;
import com.dcconnect.minimizingwaste.api.v1.openapi.FileAvatarControllerOpenApi;
import com.dcconnect.minimizingwaste.core.security.CheckSecurity;
import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.service.FileAvatarStorageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.dcconnect.minimizingwaste.domain.service.FileAvatarStorageService.Avatar;


@RestController
@RequestMapping(value = "/v1/users")
public class FileAvatarController implements FileAvatarControllerOpenApi {

    @Autowired
    private FileAvatarStorageService fileAvatarStorageService;

    @CheckSecurity.Users.CanEdit
    @PostMapping(value = "/upload/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AvatarUrlModel upload(@Valid AvatarInput userPhotoInput)
            throws IOException {
        MultipartFile file = userPhotoInput.getFile();

        String newFileName = fileAvatarStorageService.generateFileName(file.getName());

        Avatar avatar = Avatar.builder()
                .fileName(newFileName)
                .contentType(file.getContentType())
                .inputStream(file.getInputStream()).build();

        String avatarUrl = fileAvatarStorageService.upload(avatar);

        return AvatarUrlModel.builder().avatarUrl(avatarUrl).build();
    }
    
}
