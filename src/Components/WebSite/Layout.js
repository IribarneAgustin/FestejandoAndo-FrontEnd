import '../../Assets/Styles/WebSite/WebSite.css'

const Layout = ({ children }) => {
    return (

        <>
            {children}
            <footer>
                <p>&copy; {new Date().getFullYear()} FestejandoAndo. Todos los derechos reservados</p>
            </footer>
        </>
    );
};

export default Layout;
