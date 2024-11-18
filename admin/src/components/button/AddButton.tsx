import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { ButtonProps } from 'antd';

const AddButton = (props: ButtonProps) => {
    return (
        <Button key="button" icon={<PlusOutlined />} type="primary" {...props}>
            Thêm
        </Button>
    );
};

export default AddButton;
