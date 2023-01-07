package com.dcconnect.minimizingwaste.domain.repository.filter;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.OffsetDateTime;

@Setter
@Getter
public class AssignmentNotificationFilter {

    private Boolean completed;
    private Boolean approved;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private OffsetDateTime currentDate;

}
