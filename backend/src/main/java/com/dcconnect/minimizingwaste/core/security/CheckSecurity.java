package com.dcconnect.minimizingwaste.core.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public @interface CheckSecurity {

    @interface Users {
        @PreAuthorize("@minimizingSecurity.canConsultUserLogin(#userId) ")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanConsult { }


        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('EDIT_USER')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanEdit { }

        @PreAuthorize("@minimizingSecurity.canChangedPassword(#userId)")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanChangedPassword { }

        @PreAuthorize("@minimizingSecurity.userEqualAuthenticated(#userId)")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanDelete { }

        @PreAuthorize("hasAuthority('SCOPE_READ') and isAuthenticated()")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanPhotoConsult { }
    }

    @interface RolesPermissions {
        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('EDIT_ACCESS_STATUS')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanEdit { }

        @PreAuthorize("hasAuthority('SCOPE_READ') and hasAuthority('CONSULT_ACCESS_STATUS')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanConsult { }

        @PreAuthorize("@minimizingSecurity.userEqualAuthenticated(#userId)")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanDelete { }

    }

    @interface Assignments {
        @PreAuthorize("@minimizingSecurity.canConsultAssignments(#assignmentId)")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanConsult { }

        @PreAuthorize("hasAuthority('SCOPE_READ') and isAuthenticated()")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanConsultList { }

        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('EDIT_ASSIGNMENTS')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanEdit { }

        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('APPROVE_ASSIGNMENTS')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanApprove { }

        @PreAuthorize("@minimizingSecurity.canCompleteAssignments(#assignmentId)")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanComplete { }
    }

    @interface Notifications {
        @PreAuthorize("hasAuthority('SCOPE_READ') and isAuthenticated()")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanConsult { }

    }

    @interface Supplies {
        @PreAuthorize("hasAuthority('SCOPE_READ') and hasAuthority('CONSULT_SUPPLIES')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanConsult {
        }

        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('EDIT_SUPPLIES')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanEdit {
        }

        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('GIVE_BACK_SUPPLIES')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanGiveBack {
        }

        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('VACATE_SUPPLIES')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanVacate {
        }

        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('END_SUPPLY_ALLOCATED')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanEndSupply {
        }
    }
    @interface Sectors {
        @PreAuthorize("hasAuthority('SCOPE_READ') and hasAuthority('CONSULT_SECTORS')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanConsult { }

        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('EDIT_SECTORS')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanEdit { }
    }

    @interface WorkStations {
        @PreAuthorize("hasAuthority('SCOPE_READ') and hasAuthority('CONSULT_WORK_STATIONS')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanConsult { }

        @PreAuthorize("hasAuthority('SCOPE_WRITE') and hasAuthority('EDIT_WORK_STATIONS')")
        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @interface CanEdit { }
    }
}
