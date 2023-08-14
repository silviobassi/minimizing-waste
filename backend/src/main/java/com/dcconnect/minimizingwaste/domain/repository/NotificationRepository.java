package com.dcconnect.minimizingwaste.domain.repository;

import com.dcconnect.minimizingwaste.domain.model.Assignment;
import com.dcconnect.minimizingwaste.domain.model.Notification;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends CustomJpaRepository<Notification, Long>, JpaSpecificationExecutor<Supply> {

    List<Supply> findAll(Specification<Supply> specification);


}