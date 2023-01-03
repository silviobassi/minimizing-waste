package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationIdInput;
import com.dcconnect.minimizingwaste.domain.model.Nature;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

@Relation(collectionRelation = "assignments")
@Getter
@Setter
public class AssignmentModel extends RepresentationModel<AssignmentModel> {

    private Long id;

    private String title;

    private OffsetDateTime startDate;

    private OffsetDateTime deadline;

    private Nature nature;

    private WorkStationIdInput workStation;
}
