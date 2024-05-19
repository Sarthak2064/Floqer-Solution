import {  } from "react-table";




declare module 'react-table' {
    // take this file as-is, or comment out the sections that don't apply to your plugin configuratio

    export interface ColumnInstance<D>
        extends UseFiltersColumnProps<D>,
            UseGroupByColumnProps<D>,
            UseResizeColumnsColumnProps<D>,
            UseSortByColumnProps<D> {
    }
}
