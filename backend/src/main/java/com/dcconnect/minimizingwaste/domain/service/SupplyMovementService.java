package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
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
            "A quantidade %d não pode ser maior do que a quantidade alocada %d.";
    public static final String AVAILABLE_SUPPLY_NUMBER = "A quantidade de recurso disponível é %d";
    public static final String THERE_IS_NO_SUPPLY_TO_FINALIZE = "Não há recurso a finalizar, pois a quantidade alocada é %d";

    @Autowired
    private SupplyRepository supplyRepository;

    @Autowired
    private WorkStationService workStationService;

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private NotificationService notificationService;


    @Transactional
    public SupplyMovement create(SupplyMovement supplyMovement){

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation = workStationService.findOrFail(supplyMovement.getWorkStation().getId());

        if(supplyMovement.isNew()){
            isReservedQuantityGreaterThanSupplyQuantity(supplyMovement, supply);
        }

        if (supplyMovement.isNotNew()) {
            isReservedQuantityGreaterThanSupplyQuantityToUpdate(supplyMovement, supply);
        }

        supplyMovement.setSupply(supply);
        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());
        supplyMovement.setWorkStation(workStation);

        Notification notification = supplyMovement.getNotification();

        notificationService.create(notification);
        return supplyRepository.create(supplyMovement);
    }

    @Transactional
    public void delete(Long supplyMovementId){
        var supplyMovementCurrent = findOrFail(supplyMovementId);
        supplyRepository.delete(supplyMovementCurrent);
    }

    public SupplyMovement findOrFail(Long supplyMovementId){
        return supplyRepository.findBySupplyMovementById(supplyMovementId)
                .orElseThrow(() -> new SuppliesMovementNotFoundException(supplyMovementId));
    }

    @Transactional
    public SupplyMovement giveBackSupply(SupplyMovement supplyMovement){

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation = workStationService.findOrFail(supplyMovement.getWorkStation().getId());

        if(supplyMovement.getReservedQuantity() > supplyMovement.getAllocatedQuantity()){
            throw new BusinessException(String.format(DEVOLVED_QUANTITY_GREATER_ALLOCATED,
                    supplyMovement.getReservedQuantity(), supplyMovement.getAllocatedQuantity()));
        }

        supplyMovement.setSupply(supply);
        supplyMovement.setWorkStation(workStation);

        supplyMovement.devolveAllocatedQuantity();

        return supplyRepository.create(supplyMovement);

    }

    public void vacateSupply(SupplyMovement supplyMovement){
        supplyMovement.vacate();
        supplyRepository.create(supplyMovement);
    }

    @Transactional
    public void endSupply(SupplyMovement supplyMovement){
        if(supplyMovement.getAllocatedQuantity().equals(0L)){
            throw new BusinessException(String.format(THERE_IS_NO_SUPPLY_TO_FINALIZE,
                    supplyMovement.getAllocatedQuantity()));
        }
        supplyMovement.decreaseSupply();
        supplyMovement.decreaseAllocated();
        supplyRepository.create(supplyMovement);
    }

    private void isReservedQuantityGreaterThanSupplyQuantityToUpdate(SupplyMovement supplyMovement, Supply supply) {
        long sumAllocatedToUpdate = supply.getSupplyDescription().getQuantity()
                - (supplyRepository.findAllocatedSupply(supply.getId()) - supplyMovement.getAllocatedQuantity());

        if(supplyMovement.getReservedQuantity() > sumAllocatedToUpdate) {
            throw new BusinessException(String.format(AVAILABLE_SUPPLY_NUMBER,
                    sumAllocatedToUpdate));
        }
    }

    private void isReservedQuantityGreaterThanSupplyQuantity(SupplyMovement supplyMovement, Supply supply) {
        if(supplyMovement.getReservedQuantity() >
                supply.getSupplyDescription().getQuantity() - supplyRepository.findAllocatedSupply(supply.getId())
        ){
            throw new BusinessException(String.format(AVAILABLE_SUPPLY_NUMBER,
                    supply.getSupplyDescription().getQuantity()
                            - supplyRepository.findAllocatedSupply(supply.getId())));
        }
    }


}