import type { ComponentConfig } from "@measured/puck";
import { Button } from "antd";


export interface ButtonProps {
    text: string;
    link: string;
    type: 'default' | 'primary' | 'dashed' | 'text' | 'link';
    size: 'small' | 'middle' | 'large';
    block: boolean;
    alignment: 'left' | 'center' | 'right';
};


export const ButtonComponent: ComponentConfig<ButtonProps> = {
    fields: {
        text: {
            type: 'text',
            label: 'Button text',
            contentEditable: true
        },
        link: {
            type: 'text',
            label: 'Link URL',
        },
        type: {
            type: 'select',
            options: [
                { label: 'Default', value: 'default'},
                { label: 'Primary', value: 'primary'},
                { label: 'Dashed', value: 'dashed'},
                { label: 'Text', value: 'text'},
                { label: 'Link', value: 'link'},
            ],
            label: 'Button type',
        },
        size: {
            type: 'select',
            options: [
                { label: 'Small', value: 'small'},
                { label: 'Medium', value: 'middle'},
                { label: 'Large', value: 'large'},
            ],
        },
        block: {
            type: 'radio',
            options: [
                { label: 'Yes', value: true},
                { label: 'No', value: false},
            ],
            label: 'Full width'
        },
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
        text: 'button text',
        link: '#',
        type: 'default',
        size: 'middle',
        block: false,
        alignment: 'center'
    },

    render: ({ text, link, type, size, block, alignment }) => {
        
        return(
           <div style={{ padding: '20px', textAlign: alignment}}>
                <Button
                    type={type}
                    size={size}
                    block={block}
                    href={link}
                    target={link.startsWith('http') ? '_blank' : '_self'}
                    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                    {text}
                </Button>
           </div> 
        )
    }
}