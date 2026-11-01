import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { Location } from 'react-router-dom'

import { Field } from '@/components/field'
import Notice from '@/components/notice'
import { PANEL_FEATURES } from '@/const/content'
import { ROUTES } from '@/const/routes'
import { useAuth } from '@/hooks/use-auth'
import { getErrorMessage } from '@/services/api-client'

const LoginPage = () => {
  const { user, login, isChecking, isSessionExpired } = useAuth()
  const location = useLocation()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [submit, setSubmit] = useState({ error: '', isSubmitting: false })

  const fromLocation = (location.state as { from?: Location } | null)?.from
  const destination = fromLocation ? `${fromLocation.pathname}${fromLocation.search}` : ROUTES.PANEL

  const fieldChangeHandler = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const loginSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmit({ error: '', isSubmitting: true })

    try {
      // Al entrar, user cambia y el Navigate de abajo hace la redireccion
      await login(credentials.email, credentials.password)
    } catch (error) {
      setCredentials((prev) => ({ ...prev, password: '' }))
      setSubmit({ error: getErrorMessage(error), isSubmitting: false })
    }
  }

  if (user && !isChecking) return <Navigate to={destination} replace />

  const { error, isSubmitting } = submit

  return (
    <div className="Login">
      <section>
        <h1 className="Login-title">Entrar al panel</h1>
        <p className="Login-text">
          El catálogo y la guía son abiertos, no hace falta cuenta para leerlos. Entrar solo es necesario para quien mantiene las fichas.
        </p>
        <ul className="Login-list">
          {PANEL_FEATURES.map((feature) => (
            <li key={feature} className="Login-listItem">{feature}</li>
          ))}
        </ul>
      </section>

      <section className="Login-sheet">
        <h2 className="Login-sheetTitle">Tus datos</h2>
        <form className="Form" action={ROUTES.LOGIN} method="post" onSubmit={loginSubmitHandler}>
          {isSessionExpired && !error && <Notice>Tu sesión ha caducado, vuelve a entrar.</Notice>}
          {error && <Notice>{error}</Notice>}
          <Field label="Correo electrónico" id="login-correo" name="email" type="email" autoComplete="username" value={credentials.email} required onChange={fieldChangeHandler} />
          <Field label="Contraseña" id="login-clave" name="password" type="password" autoComplete="current-password" value={credentials.password} required onChange={fieldChangeHandler} />
          <div className="Form-actions">
            <button type="submit" className="Button Button--primary" title="Entrar al panel" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando…' : 'Entrar'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default LoginPage
