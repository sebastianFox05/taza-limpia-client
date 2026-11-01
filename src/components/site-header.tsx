import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { IconClose, IconMenu } from '@/components/icons'
import Logo from '@/components/logo'
import { NAV_ITEMS, ROUTES } from '@/const/routes'
import { useAuth } from '@/hooks/use-auth'
import { useEscapeKey } from '@/hooks/use-escape-key'

const linkClass = ({ isActive }: { isActive: boolean }) => `Nav-link${isActive ? ' is-active' : ''}`
const actionClass = ({ isActive }: { isActive: boolean }) => `Nav-link Nav-link--action${isActive ? ' is-active' : ''}`

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLogoutPending = useRef(false)

  const menuToggleHandler = () => setIsMenuOpen((isOpen) => !isOpen)
  const linkClickHandler = () => setIsMenuOpen(false)

  const menuEscapeHandler = useCallback(() => {
    setIsMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  const logoutClickHandler = () => {
    setIsMenuOpen(false)

    if (pathname === ROUTES.HOME) {
      logout()
      return
    }

    isLogoutPending.current = true
    navigate(ROUTES.HOME)
  }

  // Primero salgo de la pagina: si cierro la sesion dentro del panel, la ruta protegida manda al login
  useEffect(() => {
    if (isLogoutPending.current && pathname === ROUTES.HOME) {
      isLogoutPending.current = false
      logout()
    }
  }, [pathname, logout])

  useEscapeKey(menuEscapeHandler, isMenuOpen)

  return (
    <header className="Header">
      <p className="Header-strip">Guía abierta de cafés de especialidad</p>
      <div className="Header-inner">
        <Logo />
        <button
          ref={toggleRef}
          type="button"
          className="Nav-toggle"
          title={isMenuOpen ? 'Cerrar el menú' : 'Abrir el menú'}
          aria-expanded={isMenuOpen}
          aria-controls="menu-principal"
          onClick={menuToggleHandler}
        >
          {isMenuOpen ? <IconClose /> : <IconMenu />}
          Menú
        </button>
        <nav id="menu-principal" className={`Nav${isMenuOpen ? ' is-open' : ''}`} aria-label="Principal">
          <ul className="Nav-list">
            {NAV_ITEMS.map(({ to, label, title }) => (
              <li key={to} className="Nav-item">
                <NavLink to={to} title={title} className={linkClass} onClick={linkClickHandler}>
                  {label}
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <li className="Nav-item">
                  <NavLink to={ROUTES.PANEL} title="Ir al panel de gestión" className={actionClass} onClick={linkClickHandler}>
                    Panel
                  </NavLink>
                </li>
                <li className="Nav-item">
                  <button type="button" className="Nav-button" title={`Cerrar la sesión de ${user.name}`} onClick={logoutClickHandler}>
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <li className="Nav-item">
                <NavLink to={ROUTES.LOGIN} title="Entrar al panel de gestión" className={actionClass} onClick={linkClickHandler}>
                  Entrar
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
