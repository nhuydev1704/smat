import React from 'react';
import { Avatar, Badge, Grid, List, theme, Typography } from 'antd';

const DashboardPage = () => {
    const { useToken } = theme;
    const { useBreakpoint } = Grid;
    const { Paragraph, Text } = Typography;

    const { token } = useToken();
    const screens = useBreakpoint();

    const data = [
        {
            name: 'Alice Williams',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80',
            file: 'AntBlocks UI 1.0',
            content: 'Hey @everyone, the new AntBlocks UI 1.0 is now available for testing.',
            time: '15m ago',
        },
        {
            name: 'Bob Johnson',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
            file: 'Project Report',
            content:
                'Hello team, attached is the latest project report detailing our progress in the last sprint. Please review it and provide your feedback during our meeting tomorrow.',
            time: '1h ago',
        },
        {
            name: 'Eve Smith',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
            file: 'Marketing Presentation',
            content:
                "Hi team, I've prepared a marketing presentation for our upcoming product launch. The presentation covers our strategy, target audience, and key messages. Let's discuss it in our meeting next week.",
            time: '2h ago',
        },
        {
            name: 'Charlie Brown',
            avatar: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
            file: 'Code Review Comments',
            content:
                "Hello team, I've reviewed the recent code changes in the repository. Overall, the code quality is good, but I've left some comments on specific areas that need attention before merging. Let's discuss them in our code review meeting tomorrow.",
            time: '3h ago',
        },
        {
            name: 'Grace Miller',
            avatar: 'https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80',
            file: 'Team Building Event',
            content:
                "Hey everyone, I'm excited to announce that we'll be having a team building event next month. It's a great opportunity for us to bond and have some fun outside of work. More details will be shared soon!",
            time: '4h ago',
        },
    ];

    const styles = {
        container: {
            margin: '0 auto',
            maxWidth: token.screenSM,
            padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`,
        },
        content: {
            display: 'flex',
            flexDirection: screens.sm ? 'row' : 'column',
            flexGrow: 1,
            width: '100%',
        },
        contentWrapper: {
            alignItems: 'space-between',
            display: 'flex',
            width: '100%',
        },
        notification: {
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadius,
            display: 'flex',
            gap: token.margin,
            padding: `${token.paddingSM}px 0`,
            width: '100%',
        },
        preview: {
            color: token.colorTextSecondary,
            marginBottom: screens.sm ? 0 : token.marginXS,
        },
        section: {
            backgroundColor: token.colorBgContainer,
            padding: `${token.sizeXXL}px 0px`,
        },
        text: {
            color: token.colorTextSecondary,
        },
        time: {
            color: token.colorTextSecondary,
            flexShrink: 0,
        },
        title: {
            marginBottom: token.marginXXS,
        },
        titleWrapper: {
            flexGrow: 1,
        },
    };

    return (
        <div style={styles.section}>
            <div style={styles.container}>
                <List
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item>
                            <div style={styles.notification}>
                                <Badge dot>
                                    <Avatar alt={item.name} src={item.avatar} shape="square" />
                                </Badge>
                                <div style={styles.contentWrapper}>
                                    <div style={styles.content}>
                                        <div style={styles.titleWrapper}>
                                            <div style={styles.title}>
                                                <Text strong>{item.name}</Text>
                                                <Text style={styles.text}>added a comment in </Text>
                                                <Text strong>{item.file}</Text>
                                            </div>
                                            <Paragraph ellipsis={{ rows: 2 }} style={styles.preview}>
                                                {item.content}
                                            </Paragraph>
                                        </div>
                                        <Text style={styles.time}>{item.time}</Text>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
