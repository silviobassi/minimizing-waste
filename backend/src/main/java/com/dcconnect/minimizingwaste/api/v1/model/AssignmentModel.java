package com.dcconnect.minimizingwaste.api.v1.model;

import com.dcconnect.minimizingwaste.api.v1.model.input.WorkStationIdInput;
import com.dcconnect.minimizingwaste.domain.model.Nature;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

@Getter
@Setter
public class AssignmentModel {

    private Long id;

    private String title;

    private OffsetDateTime startDate;

    private OffsetDateTime deadline;

    private Nature nature;

    private WorkStationIdInput workStation;
}
