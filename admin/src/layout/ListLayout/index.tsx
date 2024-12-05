import { useRouter } from '@/hooks/userRouter';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { QueryObserverResult } from '@tanstack/react-query';
import { Card, Divider, Flex, Space, theme, Typography } from 'antd';
import React, { useRef } from 'react';
import Filter from './Filter';
import useThemeStore from '@/store/theme';

interface IListLayoutProps<T extends Record<string, any>> {
    header: {
        title: string;
        description?: string;
        extra?: React.ReactNode;
    };
    listHeader?: React.ReactNode;
    table: {
        // data
        columns?: ProColumns<T>[];
        dataSource: T[];
        total?: number;
        pageSize?: number;
        onReload?: () => Promise<QueryObserverResult<any, unknown>>;

        // select rows
        rowSelection?: {
            onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
        };
        // config
        toolBarCustom?: React.ReactNode[];
        fullScreen?: boolean;
        density?: boolean;
        tablePersistenceKey?: string;
        title?: string;
    };
    loading: boolean;
}

const ListLayout = <T extends Record<string, any>>({
    header,
    listHeader,
    table = { dataSource: [], total: 0 },
    loading,
}: IListLayoutProps<T>) => {
    const { title, description, extra } = header;
    const {
        toolBarCustom = [],
        fullScreen = true,
        density = true,
        tablePersistenceKey = 'pro-table-singe-demos',
        columns,
        dataSource,
        total,
        pageSize = 12,
        title: tableTitle = 'Danh sách',
        onReload,
        rowSelection,
    } = table;

    const actionRef = useRef<ActionType>();
    const { searchParams, setSearchParams } = useRouter();

    const { useToken } = theme;
    const { Text } = Typography;

    const { token } = useToken();

    const styles = {
        container: {
            margin: '0 auto',
        },
        header: {
            alignContent: 'center',
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
                <Space size="middle" style={styles.header}>
                    <Space style={styles.textWrapper} direction="vertical" size={4}>
                        {title && <Text style={styles.title}>{title}</Text>}
                        {description && <Text style={styles.paragraph}>{description}</Text>}
                    </Space>
                    {extra}
                </Space>
                <Divider style={{ margin: '10px 0 12px 0' }} />
                <Flex vertical gap={24}>
                    {listHeader}

                    <ProTable<T>
                        manualRequest
                        rowKey="id"
                        dateFormatter="string"
                        cardBordered
                        search={false}
                        headerTitle={<div style={{ fontWeight: '600' }}>{tableTitle}</div>}
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
                            actions: [...(toolBarCustom || [])],
                        }}
                        options={{
                            setting: {
                                listsHeight: 400,
                            },
                            reload: onReload,
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
                        rowSelection={rowSelection}
                        cardProps={{
                            bordered: false,
                        }}
                    />
                </Flex>
            </div>
        </div>
    );
};

export default React.memo(ListLayout);
