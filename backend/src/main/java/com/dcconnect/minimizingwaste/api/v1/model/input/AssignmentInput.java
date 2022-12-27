package com.dcconnect.minimizingwaste.api.v1.model.input;

import com.dcconnect.minimizingwaste.domain.model.Nature;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class AssignmentInput {

    @NotNull
    private String title;
    @NotNull
    private OffsetDateTime startDate;
    @NotNull
    private OffsetDateTime deadline;

    @Valid
    @NotNull
    private Nature nature;

    @Valid
    @NotNull
    private WorkStationIdInput workStation;

}
