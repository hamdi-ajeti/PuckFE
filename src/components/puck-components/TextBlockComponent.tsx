import type { ComponentConfig } from "@measured/puck";
import { Typography } from "antd";


const { Title, Paragraph } = Typography;

export interface TextBlockProps {
    heading: string;
    content: string;
    size: 'small' | 'medium' | 'large'; 
};

export const TextBlockComponent: ComponentConfig<TextBlockProps> = {
    fields: {
        heading: { type: 'text', contentEditable: true },
        content: { type: 'textarea', contentEditable: true },
        size:{
            type: 'select',
            options: [
                { label: 'Small', value: "small"},
                { label: 'Medium', value: "medium"},
                { label: 'Large', value: "large"},
            ]
        }
    },
    defaultProps: {
        heading: 'Text Block',
        content: 'Add the content here...',
        size: 'medium',
    },
    render: ({ heading, content, size}) => {
        const sizeMap = {
            small: { heading: 4, fontSize: '14px', padding: '20px'},
            medium: { heading: 3, fontSize: '16px', padding: '40px'},
            large: { heading: 2, fontSize: '18px', padding: '60px'},
        };
        const styles = sizeMap[size];

        return (
            <div style={{ padding: styles.padding, maxWidth: '800px', margin: '0 auto' }}>
                <Title level={styles.heading as 2 | 3 | 4} >{heading}</Title>
                <Paragraph style={{ fontSize: styles.fontSize }}>{content}</Paragraph>
            </div>
        )
    }
};