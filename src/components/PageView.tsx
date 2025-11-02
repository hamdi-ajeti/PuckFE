import { Render } from "@measured/puck";
import { config } from "../config/puck.config";
import { Button } from "antd";
import { EditOutlined } from '@ant-design/icons';
import type { Data } from "@measured/puck";


interface PageViewProps {
    data: Data;
    onEdit: () => void;
}


export function PageView({data, onEdit}: PageViewProps) {
    return (
        <div>
            <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000}}>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={onEdit}
                    size="large"
                >
                    Edit Page
                </Button>
            </div>
            <Render config={config} data={data} />
        </div>
    )
}