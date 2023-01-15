package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.model.Notification;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import com.dcconnect.minimizingwaste.domain.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Transactional
    public Notification create(Notification notification){
        notificationRepository.detach(notification);
        return notificationRepository.save(notification);
    }

}
