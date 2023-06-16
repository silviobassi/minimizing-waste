package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.UserPhotoNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.UserPhoto;
import com.dcconnect.minimizingwaste.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.Optional;

import static com.dcconnect.minimizingwaste.domain.service.PhotoStorageService.NewPhoto;

@Service
public class UserPhotoService {

    @Autowired UserRepository userRepository;

    @Autowired
    private PhotoStorageService photoStorageService;

    @Transactional
    public UserPhoto create(UserPhoto userPhoto, InputStream fileData){

        String fileName = photoStorageService.generateFileName(userPhoto.getFileName());
        String oldFileName = null;

        Optional<UserPhoto> currentUserPhoto = userRepository.findPhotoById(userPhoto.getUser().getId());

        if(currentUserPhoto.isPresent()){
            oldFileName = currentUserPhoto.get().getFileName();
            userRepository.delete(currentUserPhoto.get());
        }

        userPhoto.setFileName(fileName);
        UserPhoto photo = userRepository.save(userPhoto);
        userRepository.flush();

        NewPhoto newPhoto = NewPhoto.builder()
                .fileName(userPhoto.getFileName())
                .contentType(userPhoto.getContentType())
                .inputStream(fileData).build();

        photoStorageService.replace(oldFileName, newPhoto);

        return photo;
    }

    public UserPhoto findOrFail(Long userId){
        return userRepository.findPhotoById(userId)
                .orElseThrow(() -> new UserPhotoNotFoundException(userId));
    }

    @Transactional
    public void delete(long userId){
        UserPhoto userPhoto = userRepository.findPhotoById(userId)
                .orElseThrow(() -> new UserPhotoNotFoundException(userId));
        System.out.println(userPhoto.getFileName());
        userRepository.delete(userPhoto);
        userRepository.flush();

        photoStorageService.remove(userPhoto.getFileName());
    }

}
