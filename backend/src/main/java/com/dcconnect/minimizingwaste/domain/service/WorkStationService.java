package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.WorkStationNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import com.dcconnect.minimizingwaste.domain.repository.WorkStationRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkStationService {

    @Autowired
    private WorkStationRepository workStationRepository;

    @Autowired
    private SectorService sectorService;

    @Transactional
    public WorkStation create(WorkStation workStation){

        Sector sector = sectorService.findOrFail(workStation.getSector().getId());

        workStation.setSector(sector);

        return workStationRepository.save(workStation);
    }

    @Transactional
    public void delete(Long sectorId){
        try {
            workStationRepository.deleteById(sectorId);
            workStationRepository.flush();

        } catch (EmptyResultDataAccessException e){
            throw new WorkStationNotFoundException(sectorId);

        }
    }

    public WorkStation findOrFail(Long sectorId){
        return workStationRepository.findById(sectorId)
                .orElseThrow(() -> new WorkStationNotFoundException(sectorId));
    }
    
}
