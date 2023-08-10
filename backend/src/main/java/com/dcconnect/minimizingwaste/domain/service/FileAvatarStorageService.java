package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.model.User;
import lombok.Builder;
import lombok.Getter;

import java.io.InputStream;
import java.util.UUID;


public interface FileAvatarStorageService {
    String store(Avatar avatar);
    boolean isPhoto(String filename);

    void removeIfExistingOldAvatar(User user);

    void remove(String fileName);

    String getFilenameOfUrl(String string);

    RecoveredPhoto recover(String fileName);

    default String replace(String oldFileName, Avatar avatar) {
        String url = this.store(avatar);

        if (oldFileName != null) {
            this.remove(oldFileName);
        }

        return url;
    }

    default String upload(Avatar avatar){
        return this.store(avatar);
    }

    default String generateFileName(String originalName) {
        return UUID.randomUUID().toString() + "_" + originalName;
    }

    @Getter
    @Builder
    class Avatar {
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
