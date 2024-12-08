import React from 'react';
import { ITextType } from './type';
import { Typography } from 'antd';
import styled from 'styled-components';
import { TitleProps } from 'antd/lib/typography/Title';
import { StyledAdminText, TextContent, TextHeadingContent } from './style';
const { Title, Text: TextAntd } = Typography;

const TextAntdStyled = styled(TextAntd)``;

const TextOverride: React.FC<{ children: React.ReactNode } & TitleProps> = ({ children, ...props }) => (
    <Title style={{ margin: 0 }} {...props}>
        {children}
    </Title>
);

const Text = ({ type = 'body', message }: { type: ITextType; message: string }) => {
    switch (type) {
        case 'heading':
            return (
                <TextContent
                    text="Heading"
                    $gap="24px"
                    $height="72px"
                    $color="var(--primary)"
                    $fontFamily="var(--heading-font-family)"
                    $fontSize="var(--heading-font-size)"
                    $fontStyle="var(--heading-font-style)"
                    $fontWeight="var(--heading-font-weight)"
                    $letterSpacing="var(--heading-letter-spacing)"
                    $lineHeight="var(--heading-line-height)"
                />
            );
        case 'h1':
            return <TextOverride>{message}</TextOverride>;
        case 'h2':
            return <TextOverride level={2}>{message}</TextOverride>;
        case 'h3':
            return <TextOverride level={3}>{message}</TextOverride>;
        case 'h4':
            return <TextOverride level={4}>{message}</TextOverride>;
        case 'h5':
            return <TextOverride level={5}>{message}</TextOverride>;
        case 'h6':
            return (
                <TextContent
                    text={message}
                    $height="28px"
                    $color="var(--body-text)"
                    $fontFamily="var(--title-6-font-family)"
                    $fontSize="var(--title-6-font-size)"
                    $fontStyle="var(--title-6-font-style)"
                    $fontWeight="var(--title-6-font-weight)"
                    $letterSpacing="var(--title-6-letter-spacing)"
                    $lineHeight="var(--title-6-line-height)"
                />
            );
        case 'body':
            return (
                <TextContent
                    text={message}
                    $height="24px"
                    $color="var(--body-text)"
                    $fontFamily="var(--body-font-family)"
                    $fontSize="var(--body-font-size)"
                    $fontStyle="var(--body-font-style)"
                    $fontWeight="var(--body-font-weight)"
                    $letterSpacing="var(--body-letter-spacing)"
                    $lineHeight="var(--body-line-height)"
                />
            );
        case 'subtitle':
            return (
                <TextContent
                    text={message}
                    $height="24px"
                    $color="var(--body-text)"
                    $fontFamily="var(--subtitle-2-font-family)"
                    $fontSize="var(--subtitle-2-font-size)"
                    $fontStyle="var(--subtitle-2-font-style)"
                    $fontWeight="var(--subtitle-2-font-weight)"
                    $letterSpacing="var(--subtitle-2-letter-spacing)"
                    $lineHeight="var(--subtitle-2-line-height)"
                />
            );
        case 'description':
            return <TextAntdStyled type="secondary">{message}</TextAntdStyled>;
        case 'note':
            return <TextAntdStyled type="secondary">{message}</TextAntdStyled>;
        default:
            return <TextAntd>{message}</TextAntd>;
    }
};

export default Text;
