package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.SuppliesMovementNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.SuppliesMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class SupplyMovementService {

    public static final String DEVOLVED_QUANTITY_GREATER_ALLOCATED =
            "A quantidade devolvida (%d), não pode ser maior do que a quantidade alocada (%d).";

    @Autowired
    private SuppliesMovementRepository suppliesMovementRepository;

    @Autowired
    private WorkStationService workStationService;

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private GiveBackAllocatedSupplyService giveBackAllocatedSupplyService;

    @Transactional
    public SupplyMovement create(SupplyMovement supplyMovement){
        setModels(supplyMovement);
        giveBackAllocatedSupplyService.whenCreatingMovement(supplyMovement);
        return suppliesMovementRepository.save(supplyMovement);
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

        return suppliesMovementRepository.save(supplyMovement);
    }

    @Transactional
    public void delete(Long supplyMovementId){
        var supplyMovementCurrent = findOrFail(supplyMovementId);
        giveBackAllocatedSupplyService.whenDeleting(supplyMovementCurrent);
        suppliesMovementRepository.deleteById(supplyMovementId);
    }

    public SupplyMovement findOrFail(Long supplyMovementId){
        return suppliesMovementRepository.findById(supplyMovementId)
                .orElseThrow(() -> new SuppliesMovementNotFoundException(supplyMovementId));
    }

    @Transactional
    public SupplyMovement giveBackSupply(SupplyMovement supplyMovement){

        /*if(supplyMovement.iDevolvedQuantityGreaterThanAllocatedQuantity()){
            throw new BusinessException(String.format(DEVOLVED_QUANTITY_GREATER_ALLOCATED,
                    supplyMovement.getReservedQuantity(), supplyMovement.getAllocatedQuantity()));
        }*/

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation = workStationService
                .findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setSupply(supply);
        supplyMovement.setWorkStation(workStation);

        supplyMovement.devolveAllocatedQuantity();

        return suppliesMovementRepository.save(supplyMovement);

    }

    public void vacateSupply(SupplyMovement supplyMovement){
        supplyMovement.vacate();
        suppliesMovementRepository.save(supplyMovement);
    }

    private void setModels(SupplyMovement supplyMovement) {
        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation =
                workStationService.findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setSupply(supply);

        supplyMovement.setWorkStation(workStation);
        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());
    }

}
