package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.exception.SuppliesMovementNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.model.SupplyMovement;
import com.dcconnect.minimizingwaste.domain.repository.SuppliesMovementRepository;
import com.dcconnect.minimizingwaste.domain.strategy.SupplyCalculate;
import com.dcconnect.minimizingwaste.domain.strategy.WhenCreating;
import com.dcconnect.minimizingwaste.domain.strategy.WhenDeleting;
import com.dcconnect.minimizingwaste.domain.strategy.WhenUpdating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class SupplyMovementService {

    public static final String QUANTITY_RETURNED_GREATER_ALLOCATED =
            "A quantidade devolvida (%d), não pode ser maior do que a quantidade alocada (%d).";

    public static final String QUANTITY_RESERVED_GREATER_AVAILABLE = "A quantidade reservada (%d) não pode" +
            " ser maior do que quantidade disponível (%d)";

    @Autowired
    private SuppliesMovementRepository suppliesMovementRepository;

    @Autowired
    private WorkStationService workStationService;

    @Autowired
    private SupplyService supplyService;

    @Transactional
    public SupplyMovement create(SupplyMovement supplyMovement){

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation =
                workStationService.findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setSupply(supply);

        handleQuantityToCalculation(supplyMovement);

        supplyMovement.setWorkStation(workStation);
        supplyMovement.setAllocatedQuantity(supplyMovement.getReservedQuantity());

        return suppliesMovementRepository.save(supplyMovement);
    }

    @Transactional
    public void delete(Long supplyMovementId){
        SupplyMovement supplyMovement = findOrFail(supplyMovementId);

        SupplyCalculate supplyCalculate = new WhenDeleting();
        supplyCalculate.calculate(supplyMovement);

        suppliesMovementRepository.save(supplyMovement);

        suppliesMovementRepository.deleteById(supplyMovementId);
    }

    public SupplyMovement findOrFail(Long supplyMovementId){
        return suppliesMovementRepository.findById(supplyMovementId)
                .orElseThrow(() -> new SuppliesMovementNotFoundException(supplyMovementId));
    }

    @Transactional
    public SupplyMovement returnSupply(SupplyMovement supplyMovement){

        if(supplyMovement.isReturnedQuantityGreaterThanAllocatedQuantity()){
            throw new BusinessException(String.format(QUANTITY_RETURNED_GREATER_ALLOCATED,
                    supplyMovement.getReservedQuantity(), supplyMovement.getAllocatedQuantity()));
        }

        Supply supply = supplyService.findOrFail(supplyMovement.getSupply().getId());
        WorkStation workStation = workStationService
                .findOrFail(supplyMovement.getWorkStation().getId());

        supplyMovement.setSupply(supply);
        supplyMovement.setWorkStation(workStation);

        supplyMovement.returnAllocatedQuantity();

        return suppliesMovementRepository.save(supplyMovement);

    }

    public void vacateSupply(SupplyMovement supplyMovement){
        supplyMovement.vacate();
        suppliesMovementRepository.save(supplyMovement);
    }

    private void handleQuantityToCalculation(SupplyMovement supplyMovement) {
        if(supplyMovement.getId() == null){
            if(supplyMovement.isAllocatedQuantityGreaterThanSupplyQuantity()){
                throw new BusinessException(String.format(QUANTITY_RESERVED_GREATER_AVAILABLE,
                                supplyMovement.getReservedQuantity(),
                                supplyMovement.getSupply().getSupplyDescription().getQuantity()));
            }

            SupplyCalculate supplyCalculate = new WhenCreating();
            supplyCalculate.calculate(supplyMovement);

        } else {
            if(supplyMovement.isReservedQuantityGreaterThanAllocatedQuantityAndSupplyQuantity()){
                throw new BusinessException(String.format(QUANTITY_RESERVED_GREATER_AVAILABLE,
                        supplyMovement.getReservedQuantity(),
                        supplyMovement.sumAllocatedQuantityWithSuppliesQuantity()));
            }

            SupplyCalculate supplyCalculate = new WhenUpdating();
            supplyCalculate.calculate(supplyMovement);
        }
    }

}
