package com.dcconnect.minimizingwaste.infrastructure.service.storage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.dcconnect.minimizingwaste.core.storage.StorageProperties;
import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.model.User;
import com.dcconnect.minimizingwaste.domain.service.FileAvatarStorageService;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.io.File;
import java.net.URL;
import java.util.Objects;


public class S3FileAvatarStorageService implements FileAvatarStorageService {

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private StorageProperties storageProperties;

    @Override
    public String store(Avatar avatar) {

        try {
            String filePath = getFilePath(avatar.getFileName());

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(avatar.getContentType());

            var putObjectRequest = new PutObjectRequest(
                    storageProperties.getS3().getBucket(),
                    filePath,
                    avatar.getInputStream(),
                    objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead);

            amazonS3.putObject(putObjectRequest);

            return amazonS3.getUrl(storageProperties.getS3().getBucket(), filePath).toString();
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
    public String getFilenameOfUrl(String url) {
        return new File(url).getName();
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
    public boolean isAvatar(String filename){
        try{
            return amazonS3.doesObjectExist(storageProperties.getS3().getBucket(),
                    getFilePath(filename));
        } catch (AmazonS3Exception e) {
            if (e.getStatusCode() == 403) {
                throw new StorageException("Sem permissão para executar esta operação na Amazon S3.", e);
            } else {
                throw e;
            }
        }

    }

    @Override
    public void removeIfExistingOldAvatar(User user) {
        // Verificar se a foto atual não foi alterada e não removê-la
        if(user.isNotNew() && user.isCurrentAvatarUrl()){
            String oldFilename = getFilenameOfUrl(user.getCurrentAvatarUrl());
            if(Objects.nonNull(oldFilename))
                if(isAvatar(oldFilename)){
                    remove(oldFilename);
                }
        }
    }

    private String getFilePath(String fileName) {
        return String.format("%s/%s", storageProperties.getS3().getDirectory(), fileName);
    }

}
