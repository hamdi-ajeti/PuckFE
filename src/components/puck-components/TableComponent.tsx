import type { ComponentConfig } from "@measured/puck";
import { Table } from "antd";

export interface TableRow {
    data: string;
}

export interface TableColumn {
    title: string;
    dataIndex: string;
}

export interface TableProps {
    columns: TableColumn[];
    rows: TableRow[];
    bordered: boolean,
    size: 'small' | 'middle' | 'large'
}


export const TableComponent: ComponentConfig<TableProps> = {
    fields: {
        columns: {
            type: 'array',
            label: 'Columns',
            arrayFields: {
                title: {
                    type: 'text',
                    label: 'Column Title',
                },
                dataIndex: {
                    type: 'text',
                    label: 'Data key'
                },
            },
            getItemSummary: (item) => item.title || 'Untitled Column',
            defaultItemProps: {
                title: 'Column',
                dataIndex: 'col',
            }
        },
        rows: {
            type: 'array',
            label: 'Rows',
            arrayFields: {
                data: {
                    type: 'textarea',
                    label: 'Row Data (JSON format: {"col1": "value1", "col2": "value2"})',
                }
            },
            getItemSummary: (_item, index) => `Row ${(index ?? 0) + 1}`,
        },
        bordered: {
            type: 'radio',
            label: 'Bordered',
            options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false },
            ],
        },
        size: {
            type: 'select',
            label: 'Table Size',
            options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'middle' },
                { label: 'Large', value: 'large' },
            ],
        },
    },

    defaultProps: {
        columns: [
            { title: 'Name', dataIndex: 'name' },
            { title: 'Age', dataIndex: 'age' },
            { title: 'Address', dataIndex: 'address' },
        ],
        rows: [
            { data: '{"name": "John Doe", "age": "32", "address": "New York"}' },
            { data: '{"name": "Jane Smith", "age": "28", "address": "London"}' },
            { data: '{"name": "Bob Johnson", "age": "45", "address": "Paris"}' },
        ],
        bordered: true,
        size: 'middle',
    },

    render: ({ columns, rows, bordered, size }) => {

        const parsedRows = rows.map((row: any, index) => {
            try {
                const parsedData = JSON.parse(row.data || '{}');
                return {
                    key: row.key || `row-${index}`,
                    ...parsedData,
                }
            }
            catch (error) {
                return { key: `row-${index}` };
            }
        });

        const columnsWithKeys = columns.map((col) => ({
            ...col,
            key: col.dataIndex,
        }));

        return (
            <div style={{ padding: '20px' }}>
                <Table
                    columns={columnsWithKeys}
                    dataSource={parsedRows}
                    bordered={bordered}
                    size={size}
                    pagination={{ pageSize: 10 }}
                />
            </div>
        )
    }
};