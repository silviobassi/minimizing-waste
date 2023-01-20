package com.dcconnect.minimizingwaste.infrastructure.service.storage;

import com.dcconnect.minimizingwaste.domain.service.PhotoStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class LocalPhotoStorageService implements PhotoStorageService {

    @Value("${minimizingWaste.storagePhoto.local.directory}")
    private Path photosDirectory;

    @Override
    public void store(NewPhoto newPhoto) {

        System.out.println(photosDirectory);
        try{
            Path filePath = getFilePath(newPhoto);
            FileCopyUtils.copy(newPhoto.getInputStream(), Files.newOutputStream(filePath));
        }catch (Exception e){
            throw new StorageException("Não foi possível armazenar o arquivo.", e);
        }
    }

    private Path getFilePath(NewPhoto newPhoto) {
        return photosDirectory.resolve(Path.of(newPhoto.getFileName()));
    }


}
