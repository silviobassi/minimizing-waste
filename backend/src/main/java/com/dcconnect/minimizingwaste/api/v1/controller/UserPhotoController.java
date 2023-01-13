package com.dcconnect.minimizingwaste.api.v1.controller;

import com.dcconnect.minimizingwaste.api.v1.model.input.UserPhotoInput;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping(value = "/v1/users/{userId}/photo")
public class UserPhotoController {

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void updatePhoto(@PathVariable Long userId, @Valid UserPhotoInput userPhotoInput)  {
        var fileName = UUID.randomUUID().toString()
        + "_" + userPhotoInput.getFile().getOriginalFilename();

        var photoFile = Path.of("/home/silvio/avatar", fileName);

        System.out.println(userPhotoInput.getDescription());
        System.out.println(photoFile);
        System.out.println(userPhotoInput.getFile().getContentType());

        try {
            userPhotoInput.getFile().transferTo(photoFile);
        }catch (Exception e){
            throw new RuntimeException(e);
        }

    }
}
