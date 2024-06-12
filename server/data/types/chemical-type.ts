export interface IChemical {
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    id: number;
    name: string;
    description: string;
    cas_number: string;
    file_path: string;
    flash_point: number;
    storage_temperature_range: null;
    storage_conditions: string;
    type: string;
    unit_of_measure: string;
    categories: any[];
    manufacturers: any[];
}
export interface IAddChemical {
    name: string;
    description: string;
    cas_number: string;
    file_path: string;
    flash_point: number;
    storage_temperature_min: number;
    storage_temperature_max: number;
    storage_conditions: string;
    type: string;
    unit_of_measure: string;
}