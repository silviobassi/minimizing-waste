package com.dcconnect.minimizingwaste.infrastructure.service.storage;

import com.dcconnect.minimizingwaste.domain.service.PhotoStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.InputStream;
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
            Path filePath = getFilePath(newPhoto.getFileName());
            FileCopyUtils.copy(newPhoto.getInputStream(), Files.newOutputStream(filePath));
        }catch (Exception e){
            throw new StorageException("Não foi possível armazenar o arquivo.", e);
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
    public InputStream recover(String fileName) {
        try{
            Path filePath = getFilePath(fileName);
            return Files.newInputStream(filePath);
        }catch (Exception e){
            throw new StorageException("Não foi possível recuperar o arquivo.", e);
        }
    }

    private Path getFilePath(String fileName) {
        return photosDirectory.resolve(Path.of(fileName));
    }


}
