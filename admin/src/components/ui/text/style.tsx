import styled from 'styled-components';

interface StyledTextProps {
    $height?: string;
    $color?: string;
    $fontFamily?: string;
    $fontSize?: string;
    $fontStyle?: string;
    $fontWeight?: string;
    $letterSpacing?: string;
    $lineHeight?: string;
}

const StyledText = styled.div<StyledTextProps>`
    height: ${({ $height }) => $height || '28px'};

    & .text-wrapper {
        color: ${({ $color }) => $color || 'var(--body-text)'};
        font-family: ${({ $fontFamily }) => $fontFamily || 'var(--title-4-font-family)'};
        font-size: ${({ $fontSize }) => $fontSize || 'var(--title-4-font-size)'};
        font-style: ${({ $fontStyle }) => $fontStyle || 'var(--title-4-font-style)'};
        font-weight: ${({ $fontWeight }) => $fontWeight || 'var(--title-4-font-weight)'};
        letter-spacing: ${({ $letterSpacing }) => $letterSpacing || 'var(--title-4-letter-spacing)'};
        line-height: ${({ $lineHeight }) => $lineHeight || 'var(--title-4-line-height)'};
        white-space: nowrap;
        width: fit-content;
    }
`;

interface TextContentProps extends StyledTextProps {
    text: string;
}

export const TextContent: React.FC<TextContentProps> = ({
    text,
    $height,
    $color,
    $fontFamily,
    $fontSize,
    $fontStyle,
    $fontWeight,
    $letterSpacing,
    $lineHeight,
}) => {
    return (
        <StyledText
            $height={$height}
            $color={$color}
            $fontFamily={$fontFamily}
            $fontSize={$fontSize}
            $fontStyle={$fontStyle}
            $fontWeight={$fontWeight}
            $letterSpacing={$letterSpacing}
            $lineHeight={$lineHeight}
        >
            <div className="text-wrapper">{text}</div>
        </StyledText>
    );
};
