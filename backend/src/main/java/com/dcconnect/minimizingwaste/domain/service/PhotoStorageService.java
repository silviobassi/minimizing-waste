package com.dcconnect.minimizingwaste.domain.service;

import lombok.Builder;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.UUID;


public interface PhotoStorageService {
    String store(NewPhoto newPhoto);
    boolean isPhoto(NewPhoto newPhoto);

    void remove(String fileName);

    RecoveredPhoto recover(String fileName);

    default String replace(String oldFileName, NewPhoto newPhoto) {
        String url = this.store(newPhoto);

        if (oldFileName != null) {
            this.remove(oldFileName);
        }

        return url;
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
