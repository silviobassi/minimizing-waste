package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationInput;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WorkStationDisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public WorkStation toDomainObject(WorkStationInput workStationInput) {
        return modelMapper.map(workStationInput, WorkStation.class);
    }

    public void copyToDomainModel(WorkStationInput workStationInput, WorkStation workStation) {
        /*
        ERROR CORRECTION BELOW
        ######## workStation.setSector(new Sector()); #######
        org.springframework.orm.jpa.JpaSystemException: identifier of an instance of
        com.dcconnect.minimizingwaste.domain.model.Sector was altered from 1 to 3;
        nested exception is org.hibernate.HibernateException:
        identifier of an instance of com.dcconnect.minimizingwaste.domain.model.Sector was altered from 1 to 3
         */
        workStation.setSector(new Sector());
        modelMapper.map(workStationInput, workStation);
    }
}
