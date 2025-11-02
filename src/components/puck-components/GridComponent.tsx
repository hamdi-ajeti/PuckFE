import type { ComponentConfig } from "@measured/puck";
import { Row, Col } from "antd";
import type { ReactElement } from "react";


export interface GridProps {
    columns: 1 | 2 | 3 | 4;
    gap: number;
}

export const GridComponent: ComponentConfig<GridProps> = {
    fields: {
        columns: {
            type: 'select',
            options: [
                { label: '1 Column', value: 1 },
                { label: '2 Columns', value: 2 },
                { label: '3 Columns', value: 3 },
                { label: '4 Columns', value: 4 },
            ]
        },
        gap: {
            type: 'number',
            min: 0,
            max: 48,
        },
    },
    defaultProps: {
        columns: 2,
        gap: 16,
    },
    render: ({ columns, gap, puck }) => {
        const { renderDropZone } = puck;
        const columnSpan = 24 / columns;

        return (
            <div style={{ padding: '20px' }}>
                <Row gutter={gap}>
                    {Array.from({ length: columns }).map((_, index) => {
                        const dropZone = renderDropZone({ zone: `grid-${index}` }) as ReactElement;

                        return (
                            <Col span={columnSpan} key={index}>
                                <div style={{
                                    border: '2px dashed #d9d9d9',
                                    borderRadius: '4px',
                                    padding: '16px',
                                    minHeight: '200px',
                                    background: '#fafafa'
                                }}>
                                    {dropZone}
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        )
    }
};