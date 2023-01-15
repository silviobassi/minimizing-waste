package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.EntityInUseException;
import com.dcconnect.minimizingwaste.domain.exception.SuppliesNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Supply;
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

}
