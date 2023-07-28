package com.dcconnect.minimizingwaste.domain.service;

import com.dcconnect.minimizingwaste.domain.exception.BusinessException;
import com.dcconnect.minimizingwaste.domain.exception.EntityInUseException;
import com.dcconnect.minimizingwaste.domain.exception.SectorNotFoundException;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import com.dcconnect.minimizingwaste.domain.repository.SectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class SectorService {

    public static final String SECTOR_IN_USE = "Setor de código %d não pode ser removido, pois está em uso";
    @Autowired
    private SectorRepository sectorRepository;

    @Transactional
    public Sector create(Sector sector){

        sectorRepository.detach(sector);

        Optional<Sector> sectorCurrent = sectorRepository.findByName(sector.getName());

        if (sectorCurrent.isPresent() && !sectorCurrent.get().equals(sector)) {
            throw new BusinessException(
                    String.format("Já existe um setor cadastrado com o nome %s", sector.getName()));
        }

        return sectorRepository.save(sector);
    }

    @Transactional
    public void delete(Long sectorId){
        try {
            sectorRepository.deleteById(sectorId);
            sectorRepository.flush();

        } catch (EmptyResultDataAccessException e){
            throw new SectorNotFoundException(sectorId);

        } catch (DataIntegrityViolationException e){
            throw new EntityInUseException(
                    String.format(SECTOR_IN_USE, sectorId));
        }
    }

    public Sector findOrFail(Long sectorId){
       return sectorRepository.findById(sectorId)
               .orElseThrow(() -> new SectorNotFoundException(sectorId));
    }

}
