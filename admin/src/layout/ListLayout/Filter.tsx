import { ProCard, ProForm, ProFormDateTimePicker, ProFormText } from '@ant-design/pro-components';

const Filter = () => {
    return (
        <ProForm
            grid
            colProps={{ span: 12 }}
            submitter={false}
            onFinish={async () => {
                return true;
            }}
            syncToUrl={(values, type) => {
                if (type === 'get') {
                    return {
                        ...values,
                        created_at: [values.startTime, values.endTime],
                    };
                }
                return values;
            }}
        >
            <ProForm.Group>
                <ProFormDateTimePicker
                    formItemProps={{
                        style: {
                            marginBottom: 0,
                        },
                    }}
                    name="orderTime"
                    fieldProps={{
                        style: {
                            width: '100%',
                            marginBottom: 0,
                        },
                    }}
                />
                <ProFormText
                    formItemProps={{
                        style: {
                            marginBottom: 0,
                        },
                    }}
                    fieldProps={{
                        style: {
                            width: '100%',
                        },
                    }}
                    disabled
                    name="pay"
                />
            </ProForm.Group>
        </ProForm>
    );
};

export default Filter;
