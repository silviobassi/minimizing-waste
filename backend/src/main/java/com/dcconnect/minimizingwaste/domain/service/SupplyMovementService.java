package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.SuppliesMovementNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Notification;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.SupplyMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class SupplyMovementService {

    public static final String DEVOLVED_QUANTITY_GREATER_ALLOCATED =
            "A quantidade devolvida (%d), não pode ser maior do que a quantidade alocada (%d).";

    @Autowired
    private SupplyMovementRepository supplyMovementRepository;

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

        supplyMovement.setSupply(supply);

        supplyMovement.setWorkStation(workStation);

        Notification notification = supplyMovement.getNotification();

        notificationService.create(notification);

        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());
        giveBackAllocatedSupplyService.whenCreatingMovement(supplyMovement);
        return supplyMovementRepository.save(supplyMovement);
    }

    @Transactional
    public SupplyMovement update(SupplyMovement supplyMovement, Long supplyId){

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation =
                workStationService.findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setSupply(supply);

        giveBackAllocatedSupplyService.whenUpdatingMovement(supplyMovement, supplyId);

        supplyMovement.setWorkStation(workStation);

        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());

        return supplyMovementRepository.save(supplyMovement);
    }

    @Transactional
    public void delete(Long supplyMovementId){
        var supplyMovementCurrent = findOrFail(supplyMovementId);
        giveBackAllocatedSupplyService.whenDeleting(supplyMovementCurrent);
        supplyMovementRepository.deleteById(supplyMovementId);
    }

    public SupplyMovement findOrFail(Long supplyMovementId){
        return supplyMovementRepository.findById(supplyMovementId)
                .orElseThrow(() -> new SuppliesMovementNotFoundException(supplyMovementId));
    }

    @Transactional
    public SupplyMovement giveBackSupply(SupplyMovement supplyMovement){

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation = workStationService
                .findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setSupply(supply);
        supplyMovement.setWorkStation(workStation);

        supplyMovement.devolveAllocatedQuantity();

        return supplyMovementRepository.save(supplyMovement);

    }

    public void vacateSupply(SupplyMovement supplyMovement){
        supplyMovement.vacate();
        supplyMovementRepository.save(supplyMovement);
    }

    private void setModels(SupplyMovement supplyMovement) {
        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation =
                workStationService.findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setSupply(supply);

        supplyMovement.setWorkStation(workStation);

        Notification notification = supplyMovement.getNotification();

        notificationService.create(notification);

        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());
    }

}
