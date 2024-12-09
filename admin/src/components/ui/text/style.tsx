import styled from 'styled-components';

interface StyledTextProps {
    $height?: string;
    $color?: string;

    $var?: string;

    // $fontFamily?: string;
    // $fontSize?: string;
    // $fontStyle?: string;
    // $fontWeight?: string;
    // $letterSpacing?: string;
    // $lineHeight?: string;
}

const StyledText = styled.div<StyledTextProps>`
    height: ${({ $height }) => $height || '28px'};
    display: flex;
    align-items: center;

    & .text-wrapper {
        color: ${({ $color }) => $color || 'var(--body-text)'};
        font-family: ${({ $var }) => `var(--${$var}-font-family)`};
        font-size: ${({ $var }) => `var(--${$var}-font-size)`};
        font-style: ${({ $var }) => `var(--${$var}-font-style)`};
        font-weight: ${({ $var }) => `var(--${$var}-font-weight)`};
        letter-spacing: ${({ $var }) => `var(--${$var}-letter-spacing)`};
        line-height: ${({ $var }) => `var(--${$var}-line-height)`};
        white-space: nowrap;
        width: fit-content;
    }
`;

interface TextContentProps extends StyledTextProps {
    text: string;
}

export const TextContent: React.FC<TextContentProps> = ({ text, $height, $color, $var }) => {
    return (
        <StyledText
            $height={$height}
            $color={$color}
            // variable
            $var={$var}
        >
            <div className="text-wrapper">{text}</div>
        </StyledText>
    );
};
