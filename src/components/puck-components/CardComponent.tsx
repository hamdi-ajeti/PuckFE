import type { ComponentConfig } from "@measured/puck";
import { Card } from "antd";

const { Meta } = Card


export interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    hoverable: boolean;
    bordered: boolean;
};


export const CardComponent: ComponentConfig<CardProps> = {
    fields: {
        title: {
            type: 'text',
            label: 'Card Title',
        },
        description: {
            type: 'text',
            label: 'Card Description',
        },
        imageUrl: {
            type: 'text',
            label: 'Image URL',
        },
        hoverable: {
            type: 'radio',
            options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false},
            ],
            label: 'Show hover effect'
        },
        bordered: {
            type: 'radio',
            options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false},
            ],
            label: 'Show border'
        }
    },
    defaultProps: {
        title: 'Card title ...',
        description: 'Card Description ...',
        imageUrl: 'https://via.placeholder.com/300x200',
        hoverable: true,
        bordered: true,
    },

    render: ({ title, description, imageUrl, hoverable, bordered }) => {
       
        return (
            <Card 
                hoverable={hoverable}
                bordered={bordered}
                cover={
                    imageUrl ? (
                        <img 
                            alt={title}
                            src={imageUrl}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                            }}
                        />
                    ) : undefined
                }
            >
                <Meta
                    title={title}
                    description={description}
                />
            </Card>
        )
    }
}