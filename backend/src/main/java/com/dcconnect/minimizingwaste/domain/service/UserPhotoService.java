package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.Optional;
import java.util.UUID;

import static com.dcconnect.minimizingwaste.domain.service.PhotoStorageService.NewPhoto;

@Service
public class UserPhotoService {

    @Autowired UserRepository userRepository;

    @Autowired
    private PhotoStorageService photoStorageService;

    @Transactional
    public UserPhoto create(UserPhoto userPhoto, InputStream fileData){

        String fileName = photoStorageService.generateFileName(userPhoto.getFileName());

        Optional<UserPhoto> currentUserPhoto = userRepository.findByPhoto(userPhoto.getUser().getId());

        currentUserPhoto.ifPresent(photo -> userRepository.delete(photo));

        userPhoto.setFileName(fileName);
        UserPhoto photo = userRepository.save(userPhoto);
        userRepository.flush();

        NewPhoto newPhoto = NewPhoto.builder()
                .fileName(userPhoto.getFileName())
                .inputStream(fileData).build();

        photoStorageService.store(newPhoto);

        return photo;
    }

}
