import { CoreDecorator, createDecorator } from '@hapiness/core';

export interface TableModel {
    name: string;
    model: any
}

export const TableModel: CoreDecorator<TableModel> = createDecorator<TableModel>('TableModel', {
    name: undefined,
    model: undefined
});

// export interface TableModel {}

// export const TableModel: CoreDecorator<TableModel> = createDecorator<TableModel>('TableModel', null);
