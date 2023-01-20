package com.dcconnect.minimizingwaste.domain.service;

import lombok.Builder;
import lombok.Getter;

import java.io.InputStream;
import java.util.UUID;

public interface PhotoStorageService {
    void store(NewPhoto newPhoto);

    void remove(String fileName);

    InputStream recover(String fileName);

    default void replace(String oldFileName, NewPhoto newPhoto){
        this.store(newPhoto);

        if(oldFileName != null){
            this.remove(oldFileName);
        }
    }

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
