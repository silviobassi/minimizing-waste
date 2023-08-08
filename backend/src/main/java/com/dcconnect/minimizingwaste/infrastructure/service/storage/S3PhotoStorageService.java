package com.dcconnect.minimizingwaste.infrastructure.service.storage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.dcconnect.minimizingwaste.core.storage.StorageProperties;
import com.dcconnect.minimizingwaste.domain.service.PhotoStorageService;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URL;


public class S3PhotoStorageService implements PhotoStorageService {

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private StorageProperties storageProperties;

    @Override
    public String store(NewPhoto newPhoto) {

        try {
            String filePath = getFilePath(newPhoto.getFileName());

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(newPhoto.getContentType());

            var putObjectRequest = new PutObjectRequest(
                    storageProperties.getS3().getBucket(),
                    filePath,
                    newPhoto.getInputStream(),
                    objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead);

            amazonS3.putObject(putObjectRequest);

            return amazonS3.getUrl(storageProperties.getS3().getBucket(), storageProperties.getS3().getDirectory()
                    +newPhoto.getFileName()).toString();
        }catch (Exception e){
            throw new StorageException("Não foi possível enviar arquivo para a Amazon S3.", e);
        }
    }

    @Override
    public void remove(String fileName) {
        try {
            String filePath = getFilePath(fileName);

            DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(
                    storageProperties.getS3().getBucket(),
                    filePath
        );
            amazonS3.deleteObject(deleteObjectRequest);

        }catch (Exception e){
            throw new StorageException("Não foi possível excluir o arquivo na Amazon S3.", e);
        }
    }

    @Override
    public RecoveredPhoto recover(String fileName) {
        try {
        String filePath = getFilePath(fileName);
        URL s3Url = amazonS3.getUrl(storageProperties.getS3().getBucket(), filePath);

        return RecoveredPhoto.builder()
                .url(s3Url.toString()).build();
        }catch (Exception e){
            throw new StorageException("Não foi possível recuperar o arquivo na Amazon S3.", e);
        }
    }

    @Override
    public boolean isPhoto(NewPhoto newPhoto){
        try{
            return amazonS3.doesObjectExist(storageProperties.getS3().getBucket(),
                    getFilePath("e8510a52-fb7f-47d5-985b-c1c703345b79_file"));
        } catch (AmazonS3Exception e) {
            if (e.getStatusCode() == 403) {
                throw new StorageException("Sem permissão para executar esta operação na Amazon S3.", e);
            } else {
                throw e;
            }
        }

    }

    private String getFilePath(String fileName) {
        return String.format("%s/%s", storageProperties.getS3().getDirectory(), fileName);
    }

}
