package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.core.validation.FileContentType;
import com.dcconnect.minimizingwaste.core.validation.FileSize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class UserPhotoInput {

    @Schema(description = "Arquivo da foto do usuário (máximo 500KB, apenas JPG e PNG)")
    @NotNull
    @FileContentType(allowed = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @FileSize(max = "500KB")
    private MultipartFile file;

    @Schema(description = "descrição da foto do usuário")
    @NotBlank
    private String description;
}
