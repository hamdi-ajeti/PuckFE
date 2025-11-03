import type { ComponentConfig } from "@measured/puck";
import { Typography } from "antd";



const { Title, Paragraph } = Typography;

export interface HeroProps {
    title: string;
    subtitle: string;
    alignment: 'left' | 'center' | 'right';
}

export const HeroComponent: ComponentConfig<HeroProps> = {
    fields: {
        title: { type: 'text', contentEditable: true },
        subtitle: { type: 'text', contentEditable: true },
        alignment: {
            type: 'select',
            options: [
                { label: 'Left', value: 'left'},
                { label: 'Center', value: 'center'},
                { label: 'Right', value: 'right'},
            ]
        }
    },
    defaultProps: {
        title: 'Welcome to my page...',
        subtitle: 'Something ......',
        alignment: 'center',
    },
    render: ({ title, subtitle, alignment }) => {
        return (
            <div style={{
                padding: '60px 20px',
                textAlign: alignment,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: "white"
            }}>
                <Title level={1} style={{ color: 'white', margin: 0}}>
                    {title}
                </Title>
                <Paragraph style={{ fontSize: '18px', color: 'white', marginTop: '16px' }}>
                    {subtitle}
                </Paragraph>
            </div>
        )
    }
}