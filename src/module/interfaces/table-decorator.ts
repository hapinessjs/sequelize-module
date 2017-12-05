import { CoreDecorator, createDecorator } from '@hapiness/core';

export interface TableModel {}

export const TableModel: CoreDecorator<TableModel> = createDecorator<TableModel>('TableModel', null);
