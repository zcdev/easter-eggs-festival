type HeaderProps = {
    message: string; // explicitly typed
};

export default function Header({ message }: HeaderProps) {
    return (
        <header>
            <h1>Easter Eggs Festival</h1>
            <p>{message}</p>
        </header>
    );
}