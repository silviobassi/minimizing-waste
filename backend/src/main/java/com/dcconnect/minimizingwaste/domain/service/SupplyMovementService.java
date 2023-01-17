package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.SuppliesMovementNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Notification;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
public class SupplyMovementService {

    public static final String DEVOLVED_QUANTITY_GREATER_ALLOCATED =
            "A quantidade devolvida (%d), não pode ser maior do que a quantidade alocada (%d).";

    @Autowired
    private SupplyRepository supplyRepository;

    @Autowired
    private WorkStationService workStationService;

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private GiveBackAllocatedSupplyService giveBackAllocatedSupplyService;

    @Transactional
    public SupplyMovement create(SupplyMovement supplyMovement){
        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation =
                workStationService.findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());

        supplyMovement.setSupply(supply);

        supplyMovement.setWorkStation(workStation);

        Notification notification = supplyMovement.getNotification();

        notificationService.create(notification);

        giveBackAllocatedSupplyService.whenCreatingMovement(supplyMovement);
        return supplyRepository.create(supplyMovement);
    }

    @Transactional
    public SupplyMovement update(SupplyMovement supplyMovement, Long supplyId){

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation =
                workStationService.findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setSupply(supply);

        giveBackAllocatedSupplyService.whenUpdatingMovement(supplyMovement, supplyId);
        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());

        supplyMovement.setWorkStation(workStation);

        return supplyRepository.create(supplyMovement);
    }

    @Transactional
    public void delete(Long supplyMovementId){
        var supplyMovementCurrent = findOrFail(supplyMovementId);
        giveBackAllocatedSupplyService.whenDeleting(supplyMovementCurrent);
        supplyRepository.delete(supplyMovementCurrent);
    }

    public SupplyMovement findOrFail(Long supplyMovementId){
        return supplyRepository.findBySupplyMovementById(supplyMovementId)
                .orElseThrow(() -> new SuppliesMovementNotFoundException(supplyMovementId));
    }

    @Transactional
    public SupplyMovement giveBackSupply(SupplyMovement supplyMovement){

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation = workStationService
                .findOrFail(supplyMovement.getWorkStation().getId());
        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());
        supplyMovement.setSupply(supply);
        supplyMovement.setWorkStation(workStation);

        supplyMovement.devolveAllocatedQuantity();

        return supplyRepository.create(supplyMovement);

    }

    public void vacateSupply(SupplyMovement supplyMovement){
        supplyMovement.vacate();
        supplyRepository.create(supplyMovement);
    }

    private void setModels(SupplyMovement supplyMovement) {
        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation =
                workStationService.findOrFail(supplyMovement.getWorkStation().getId());
        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());
        supplyMovement.setSupply(supply);

        supplyMovement.setWorkStation(workStation);

        Notification notification = supplyMovement.getNotification();

        notificationService.create(notification);

        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());
    }

}
