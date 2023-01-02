package com.dcconnect.minimizingwaste.api.v1.assembler;

import com.dcconnect.minimizingwaste.api.v1.controller.WorkStationController;
import com.dcconnect.minimizingwaste.api.v1.model.WorkStationModel;
import com.dcconnect.minimizingwaste.domain.model.WorkStation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Component
public class WorkStationAssembler extends RepresentationModelAssemblerSupport<WorkStation, WorkStationModel> {


    @Autowired
    private ModelMapper modelMapper;

    public WorkStationAssembler() {
        super(WorkStationController.class, WorkStationModel.class);
    }

    public WorkStationModel toModel(WorkStation workStation){
        WorkStationModel workStationModel = createModelWithId(workStation.getId(), workStation);
        modelMapper.map(workStation, workStationModel);

        return workStationModel;
    }

    public CollectionModel<WorkStationModel> toCollectionModel(Iterable <? extends WorkStation> entities){
        return super.toCollectionModel(entities)
                .add(linkTo(WorkStationController.class).withRel(IanaLinkRelations.SELF.value()));
    }

}
