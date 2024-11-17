import { useRouter } from '@/hooks/userRouter';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Divider, Flex, Grid, Space, Tag, theme, Typography } from 'antd';
import React, { useRef } from 'react';
import Filter from './Filter';

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
        sorter: true,
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
        dataSource: any;
        total?: number;
        pageSize?: number;
        // table config
        toolBarCustom?: React.ReactNode[];
        fullScreen?: boolean;
        density?: boolean;
        tablePersistenceKey?: string;
    };
    loading: boolean;
}

const ListLayout: React.FC<IListLayout> = ({ header, listHeader, table = { dataSource: [], total: 0 }, loading }) => {
    const { title, description } = header;
    const {
        toolBarCustom = [],
        fullScreen = true,
        density = true,
        tablePersistenceKey = 'pro-table-singe-demos',
        dataSource,
        total,
        pageSize = 12,
    } = table;

    const actionRef = useRef<ActionType>();
    const { searchParams, setSearchParams } = useRouter();
    console.log('🚀 ~ searchParams:', searchParams);

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
                        manualRequest
                        rowKey="id"
                        dateFormatter="string"
                        cardBordered
                        search={false}
                        headerTitle={<div style={{ fontWeight: '600' }}>Danh sách</div>}
                        loading={loading}
                        columns={columns}
                        dataSource={dataSource}
                        actionRef={actionRef}
                        form={{
                            syncToUrl: false,
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
                            pageSize,
                            current: (searchParams?.page as any) || 1,
                            total,
                            showQuickJumper: true,
                            size: 'default',
                            hideOnSinglePage: true,
                            onChange: (page) => setSearchParams({ ...searchParams, page }),
                        }}
                    />
                </Flex>
            </div>
        </div>
    );
};

export default ListLayout;
