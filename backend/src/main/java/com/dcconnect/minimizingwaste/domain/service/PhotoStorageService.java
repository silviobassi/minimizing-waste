package com.dcconnect.minimizingwaste.domain.service;

import lombok.Builder;
import lombok.Getter;

import java.io.InputStream;
import java.util.UUID;

public interface PhotoStorageService {
    void store(NewPhoto newPhoto);

    default String generateFileName(String originalName){
        return UUID.randomUUID().toString() + "_" + originalName;
    }

    @Getter
    @Builder
    class NewPhoto {
        private String fileName;
        private InputStream inputStream;
    }
}
