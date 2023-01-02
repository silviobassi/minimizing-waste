package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.SectorController;
import com.dcconnect.minimizingwaste.api.v1.model.SectorModel;
import com.dcconnect.minimizingwaste.domain.model.Sector;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class SectorAssembler extends RepresentationModelAssemblerSupport<Sector, SectorModel> {

    @Autowired
    private ModelMapper modelMapper;

    public SectorAssembler() {
        super(SectorController.class, SectorModel.class);
    }

    public SectorModel toModel(Sector sector){
        SectorModel sectorModel = createModelWithId(sector.getId(), sector);
        modelMapper.map(sector, sectorModel);

        return sectorModel;
    }

    public CollectionModel<SectorModel> toCollectionModel(Iterable<? extends Sector> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(SectorController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}
