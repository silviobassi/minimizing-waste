package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.core.validation.FileSize;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserPhotoInput {

    @NotNull
    @FileSize(max = "500KB")
    private MultipartFile file;
    @NotBlank
    private String description;
}
