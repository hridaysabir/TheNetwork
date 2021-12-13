import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function MenuBar() {
  const { user, logout } = useContext(AuthContext)

  const pathName = window.location.pathname
  const path = pathName === '/' ? 'home' : pathName.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const menuBar = user ? (
    <Menu color="teal">
      <Menu.Item name={user.username} active as={Link} to="/">
        {user.username}
      </Menu.Item>

      <Menu.Item position="right" name="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  ) : (
    <Menu color="teal">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        Home
      </Menu.Item>

      <Menu.Item
        name="login"
        active={activeItem === 'login'}
        onClick={handleItemClick}
        as={Link}
        to="/login"
      >
        Login
      </Menu.Item>

      <Menu.Item
        position="right"
        name="register"
        active={activeItem === 'register'}
        onClick={handleItemClick}
        as={Link}
        to="/register"
      >
        Register
      </Menu.Item>
    </Menu>
  )

  return menuBar
}

export default MenuBar
