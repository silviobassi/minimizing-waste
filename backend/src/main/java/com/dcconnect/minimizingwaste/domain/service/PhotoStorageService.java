package com.dcconnect.minimizingwaste.domain.service;

import lombok.Builder;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.UUID;


public interface PhotoStorageService {
    void store(NewPhoto newPhoto);

    void remove(String fileName);

    RecoveredPhoto recover(String fileName);

    default void replace(String oldFileName, NewPhoto newPhoto) {
        this.store(newPhoto);

        if (oldFileName != null) {
            this.remove(oldFileName);
        }
    }

    default String generateFileName(String originalName) {
        return UUID.randomUUID().toString() + "_" + originalName;
    }

    @Getter
    @Builder
    class NewPhoto {
        private String fileName;
        private String contentType;
        private InputStream inputStream;
    }

    @Builder
    @Getter
    class RecoveredPhoto {
        private InputStream inputStream;
        private String url;

        public boolean isUrl() {
            return url != null;
        }

        public boolean isInputStream() {
            return inputStream != null;
        }
    }
}
