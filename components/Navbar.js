function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {   //here we're gonna pass components to render as children
                    props.children
                }
            </ul>
        </nav>
    )
}

export default Navbar;