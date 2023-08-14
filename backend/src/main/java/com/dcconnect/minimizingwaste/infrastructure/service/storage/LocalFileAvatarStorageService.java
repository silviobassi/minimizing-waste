package com.dcconnect.minimizingwaste.infrastructure.service.storage;

import com.dcconnect.minimizingwaste.core.storage.StorageProperties;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.service.FileAvatarStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

public class LocalFileAvatarStorageService implements FileAvatarStorageService {

    @Autowired
    private StorageProperties storageProperties;

    @Override
    public String store(Avatar avatar) {
        try{
            Path filePath = getFilePath(avatar.getFileName());
            FileCopyUtils.copy(avatar.getInputStream(), Files.newOutputStream(filePath));
            return filePath.toString();
        }catch (Exception e){
            throw new StorageException("Não foi possível armazenar o arquivo.", e);
        }
    }

    @Override
    public boolean isAvatar(String filename) {
        return Files.exists(getFilePath(filename));
    }

    @Override
    public void removeIfExistingOldAvatar(User user) {
        if(user.isNotNew() && user.isCurrentAvatarUrl()){
            String oldFilename = getFilenameOfUrl(user.getCurrentAvatarUrl());
            if(Objects.nonNull(oldFilename))
                if(isAvatar(oldFilename)){
                    remove(oldFilename);
                }
        }
    }

    @Override
    public void remove(String fileName) {
        try{
            Path filePath = getFilePath(fileName);
            Files.deleteIfExists(filePath);
        }catch (Exception e){
            throw new StorageException("Não foi possível remover o arquivo.", e);
        }
    }

    @Override
    public String getFilenameOfUrl(String url) {
        return new File(url).getName();
    }

    @Override
    public RecoveredPhoto recover(String fileName) {
        try{
            Path filePath = getFilePath(fileName);

            RecoveredPhoto recoveredPhoto = RecoveredPhoto.builder()
                    .inputStream(Files.newInputStream(filePath))
                    .build();

            return recoveredPhoto;
        }catch (Exception e){
            throw new StorageException("Não foi possível recuperar o arquivo.", e);
        }
    }

    private Path getFilePath(String fileName) {
        return storageProperties.getLocal().getDirectory().resolve(Path.of(fileName));
    }



}
