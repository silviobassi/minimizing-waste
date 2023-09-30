package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.exception.EntityInUseException;
import com.dcconnect.minimizingwaste.domain.exception.SuppliesNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Bulk;
import com.dcconnect.minimizingwaste.domain.model.Manipulation;
import com.dcconnect.minimizingwaste.domain.model.Supply;
import com.dcconnect.minimizingwaste.domain.model.SupplyType;
import com.dcconnect.minimizingwaste.domain.repository.SupplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
public class SupplyService {

    public static final String SUPPLY_IN_USE = "Recurso de código %d não pode ser removido, pois está em uso";
    @Autowired
    private SupplyRepository supplyRepository;

    @Transactional
    public Supply create(Supply supply){
        isNotEquipmentAndMaterial(supply);
        isNotBulkOrManipulation(supply);
        return supplyRepository.save(supply);
    }

    @Transactional
    public void delete(Long supplyId){

        try {
            supplyRepository.deleteById(supplyId);
            supplyRepository.flush();

        } catch (EmptyResultDataAccessException e){
            throw new SuppliesNotFoundException(supplyId);

        } catch (DataIntegrityViolationException e){
            throw new EntityInUseException(
                    String.format(SUPPLY_IN_USE, supplyId));
        }

    }

    public Supply findOrFail(Long supplyId){
        return supplyRepository.findById(supplyId)
                .orElseThrow(() -> new SuppliesNotFoundException(supplyId));
    }

    public void nullifyBulk(Supply supply){
        supply.setBulk(null);
    }

    public void nullifyManipulation(Supply supply){
        supply.setManipulation(null);
    }

    private static void isNotEquipmentAndMaterial(Supply supply) {
        if(!supply.isEquipment() && !supply.isMaterial()) {
            throw new BusinessException(
                    String.format("O tipo do recurso deve ser %s ou %s",
                            SupplyType.MATERIAL, SupplyType.EQUIPAMENTO));
        }
    }

    private static void isNotBulkOrManipulation(Supply supply) {
        if(supply.isEquipment()) {
            if(!supply.isBulk()) {
                throw new BusinessException(
                        String.format("O tamanho do recurso deve ser %s, %s ou %s",
                                Bulk.PEQUENO, Bulk.MÉDIO, Bulk.GRANDE));
            }
        }

        if(supply.isMaterial()) {
            if(!supply.isManipulation()) {
                throw new BusinessException(
                        String.format("A manipulação do recurso deve ser %s ou %s",
                                Manipulation.IMUTÁVEL, Manipulation.TRANSMUTÁVEL));
            }
        }
    }


}
