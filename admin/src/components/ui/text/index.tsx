import React from 'react';
import { ITextType } from './type';
import { Typography } from 'antd';
import styled from 'styled-components';
const { Title, Text: TextAntd } = Typography;

const TextAntdStyled = styled(TextAntd)``;

const StyledAdminText = styled.div`
    align-items: center;
    display: inline-flex;
    gap: 24px;
    height: 72px;
    justify-content: center;
    position: relative;
    & .text-wrapper {
        color: var(--primary);
        font-family: var(--heading-font-family);
        font-size: var(--heading-font-size);
        font-style: var(--heading-font-style);
        font-weight: var(--heading-font-weight);
        letter-spacing: var(--heading-letter-spacing);
        line-height: var(--heading-line-height);
        position: relative;
        white-space: nowrap;
        width: fit-content;
    }
`;

const Text = ({ type = 'text', message }: { type: ITextType; message: string }) => {
    switch (type) {
        case 'heading':
            return (
                <StyledAdminText>
                    <div className="text-wrapper">Heading</div>
                </StyledAdminText>
            );
        case 'h1':
            return <Title>{message}</Title>;
        case 'h2':
            return <Title level={2}>{message}</Title>;
        case 'h3':
            return <Title level={3}>{message}</Title>;
        case 'h4':
            return <Title level={4}>{message}</Title>;
        case 'h5':
            return <Title level={5}>{message}</Title>;
        case 'body':
            return <TextAntdStyled>{message}</TextAntdStyled>;
        default:
            return <TextAntd>{message}</TextAntd>;
    }
};

export default Text;
