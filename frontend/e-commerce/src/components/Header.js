function Header(){
    return (
        <nav className='flex flex-row justify-between items-center bg-teal-300'>
            <img src="./images/logo.png" alt="Logo" className="w-20 bg-transparent" />
            <ul className='flex flex-row justify-between items-center gap-10 p-3'>
                <li><a className='navItem' href="/Home">Home</a></li>
                <li><a className='navItem' href="/Cart">Cart</a></li>
            </ul>
        </nav>
    )
}

export default Header;