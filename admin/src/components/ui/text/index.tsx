import { TextContent } from './style';
import { ITextType } from './type';

const Text = ({ type = 'body', message }: { type: ITextType; message: string }) => {
    switch (type) {
        case 'heading':
            return <TextContent text={message} $height="72px" $color="var(--primary)" $var="heading" />;
        case 'h1':
            return <TextContent text={message} $height="48px" $color="var(--body-text)" $var="title-1" />;
        case 'h2':
            return <TextContent text={message} $height="42px" $color="var(--body-text)" $var="title-2" />;
        case 'h3':
            return <TextContent text={message} $height="40px" $color="var(--body-text)" $var="title-3" />;
        case 'h4':
            return <TextContent text={message} $height="34px" $color="var(--body-text)" $var="title-4" />;
        case 'h5':
            return <TextContent text={message} $height="30px" $color="var(--body-text)" $var="title-5" />;
        case 'h6':
            return <TextContent text={message} $height="28px" $color="var(--body-text)" $var="title-6" />;
        case 'body':
            return <TextContent text={message} $height="24px" $color="var(--body-text)" $var="body" />;
        case 'subtitle':
            return <TextContent text={message} $height="24px" $color="var(--body-text)" $var="subtitle-2" />;
        case 'description':
            return <TextContent text={message} $height="22px" $color="var(--body-text)" $var="description" />;
        case 'note':
            return <TextContent text={message} $height="18px" $color="var(--body-text)" $var="note" />;
        default:
            return <TextContent text={message} $height="24px" $color="var(--body-text)" $var="body" />;
    }
};

export default Text;
