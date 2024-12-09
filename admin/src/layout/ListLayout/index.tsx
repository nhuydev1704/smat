import { useRouter } from '@/hooks/userRouter';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { QueryObserverResult } from '@tanstack/react-query';
import React, { useRef } from 'react';
import Filter from './Filter';
import Text from '@/components/ui/text';

interface IListLayoutProps<T extends Record<string, any>> {
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
    table = { dataSource: [], total: 0 },
    loading,
}: IListLayoutProps<T>) => {
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

    return (
        <ProTable<T>
            manualRequest
            rowKey="id"
            dateFormatter="string"
            cardBordered
            search={false}
            headerTitle={
                <div>
                    <Text type="h6" message={tableTitle} />
                </div>
            }
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
    );
};

export default React.memo(ListLayout);
