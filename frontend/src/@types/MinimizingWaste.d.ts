export namespace MinimizingWaste {
  interface SupplyDescription {
    measure: number;
    measureUnitType: string;
    quantity: number;
    total: number;
  }

  interface SupplySummary {
    id: number;
    name: string;
    supplyDescription: SupplyDescription;
  }

  interface SupplyDescriptionDetailed {
    measure: number;
    packing: string;
    measureUnitType: string;
    quantity: number;
    total: number;
  }

  interface SupplyDetailed {
    id: number;
    name: string;
    manipulation: string;
    bulk: string;
    supplyDescription: SupplyDescriptionDetailed;
  }

  interface EmployeeResponsible {
    name: string;
    office: string;
    occupation: string;
    whatsApp: string;
  }

  interface TaskDetailed {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    deadline: string;
    completed: boolean;
    approved: boolean;
    approvalDescription: string;
    nature: string;
    workStation: string;
    sector: string;
    employeeResponsible: EmployeeResponsible;
  }

  interface TaskSummary {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    deadline: string;
    completed: boolean;
    approved: boolean;
    workStation: string;
  }

  interface UserDetailed {
    name: string;
    cpf: string;
    email: string;
    whatsApp: string;
    office: string;
    occupation: string;
    levelOfEducation: string;
    group: string;
  }

  interface UserSummary {
    id: number;
    name: string;
    cpf: string;
    whatsApp: string;
    group: string;
  }
}
