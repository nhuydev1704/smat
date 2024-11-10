import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Divider, Flex, Grid, Space, Tag, theme, Typography } from 'antd';
import axios from 'axios';
import React, { useRef } from 'react';
import Filter from './Filter';

export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'index',
        width: 48,
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
    },
    {
        disable: true,
        title: 'Type',
        dataIndex: 'state',
    },
    {
        disable: true,
        title: 'Tag',

        render: (_, record) => (
            <Space>
                {record.labels.map(({ name, color }) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                ))}
            </Space>
        ),
    },
    {
        title: 'Ngày tạo',
        key: 'showTime',
        dataIndex: 'created_at',
    },
    {
        title: 'Thao tác',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                Sửa
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                Xem
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    { key: 'copy', name: 'Sao chép' },
                    { key: 'delete', name: 'Xoá' },
                ]}
            />,
        ],
    },
];

interface IListLayout extends React.ComponentProps<'div'> {
    header: {
        title: string;
        description?: string;
    };
    listHeader?: React.ReactNode;
    table: {
        toolBarCustom?: React.ReactNode[];
        fullScreen?: boolean;
        density?: boolean;
        tablePersistenceKey?: string;
    };
}

const ListLayout: React.FC<IListLayout> = ({ header, listHeader, table = {} }) => {
    const { title, description } = header;
    const {
        toolBarCustom = [],
        fullScreen = true,
        density = true,
        tablePersistenceKey = 'pro-table-singe-demos',
    } = table;

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();

    const { useToken } = theme;
    const { useBreakpoint } = Grid;
    const { Text } = Typography;

    const { token } = useToken();
    const screens = useBreakpoint();

    const styles = {
        container: {
            margin: '0 auto',
        },
        header: {
            alignContent: 'center',
            alignItems: screens.md ? 'flex-end' : 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
        },
        paragraph: {
            color: token.colorTextSecondary,
        },
        textWrapper: {
            width: '100%',
        },
        title: {
            fontSize: token.fontSizeHeading5,
            marginBottom: token.marginXXS,
            marginTop: 0,
            fontWeight: 'bold',
        },
    };

    return (
        <div>
            <div style={styles.container}>
                <Space size="middle" direction={screens.md ? 'horizontal' : 'vertical'} style={styles.header}>
                    <Space style={styles.textWrapper} direction="vertical" size={4}>
                        {title && <Text style={styles.title}>{title}</Text>}
                        {description && <Text style={styles.paragraph}>{description}</Text>}
                    </Space>
                </Space>
                <Divider style={{ margin: '10px 0 12px 0' }} />
                <Flex vertical gap={10}>
                    {listHeader}

                    <ProTable<GithubIssueItem>
                        columns={columns}
                        actionRef={actionRef}
                        formRef={formRef}
                        request={async (params, sort, filter) => {
                            console.log('🚀 ~ request={ ~ params:', params);
                            console.log('🚀 ~ request={ ~ filter:', filter);
                            console.log('sort', sort);
                            return axios<{
                                data: GithubIssueItem[];
                            }>('https://proapi.azurewebsites.net/github/issues', {
                                params,
                            }).then((response) => {
                                return {
                                    data: response.data.data,
                                    success: true,
                                    total: response.data.total,
                                };
                            });
                        }}
                        columnsState={{
                            persistenceKey: tablePersistenceKey,
                            persistenceType: 'localStorage',

                            onChange(value) {
                                console.log('value: ', value);
                            },
                        }}
                        toolbar={{
                            multipleLine: true,
                            filter: (
                                <div style={{ width: '100%' }}>
                                    <Filter />
                                </div>
                            ),
                            actions: [
                                <Button
                                    key="button"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        actionRef.current?.reload();
                                    }}
                                    type="primary"
                                >
                                    Thêm
                                </Button>,
                                ...(toolBarCustom || []),
                            ],
                        }}
                        options={{
                            setting: {
                                listsHeight: 400,
                            },
                            density,
                            fullScreen,
                        }}
                        pagination={{
                            pageSize: 12,
                            showQuickJumper: true,
                            size: 'default',
                            hideOnSinglePage: true,
                            onChange: (page) => console.log(page),
                        }}
                        headerTitle={<div style={{ fontWeight: '600' }}>Danh sách</div>}
                        rowKey="id"
                        dateFormatter="string"
                        cardBordered
                        search={false}
                    />
                </Flex>
            </div>
        </div>
    );
};

export default ListLayout;
