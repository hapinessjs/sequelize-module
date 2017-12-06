import { CoreDecorator, createDecorator } from '@hapiness/core';

export interface TableModel {
    model?: any
}

export const TableModel: CoreDecorator<TableModel> = createDecorator<TableModel>('TableModel', {
    model: undefined
});
