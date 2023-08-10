package com.dcconnect.minimizingwaste.core.storage;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.dcconnect.minimizingwaste.domain.service.FileAvatarStorageService;
import com.dcconnect.minimizingwaste.infrastructure.service.storage.LocalFileAvatarStorageService;
import com.dcconnect.minimizingwaste.infrastructure.service.storage.S3FileAvatarStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.dcconnect.minimizingwaste.core.storage.StorageProperties.*;

@Configuration
public class StorageConfig {

    @Autowired
    private StorageProperties storageProperties;

    @Bean
    @ConditionalOnProperty(name = "minimizing-waste.storage.type", havingValue = "s3")
    public AmazonS3 amazonS3() {
        var credentials = new BasicAWSCredentials(
                storageProperties.getS3().getAccessKeyId(),
                storageProperties.getS3().getSecretAccessKey());

        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(storageProperties.getS3().getRegion())
                .build();
    }

    @Bean
    public FileAvatarStorageService photoStorageService(){
        if(StorageType.S3.equals(storageProperties.getType())){
            return new S3FileAvatarStorageService();
        }else {
            return new LocalFileAvatarStorageService();
        }
    }

}
