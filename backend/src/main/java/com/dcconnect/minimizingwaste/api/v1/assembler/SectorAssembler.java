package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.model.SectorModel;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SectorAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public SectorModel toModel(Sector sector){
        return modelMapper.map(sector, SectorModel.class);
    }

    public List<SectorModel> toCollectionModel(List<Sector> sectors){
        return sectors.stream().map(this::toModel)
                .collect(Collectors.toList());
    }

}
