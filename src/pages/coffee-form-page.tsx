import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import CoffeeLabel from '@/components/coffee-label'
import EmptyState from '@/components/empty-state'
import { Field, SelectField, TextareaField } from '@/components/field'
import Notice from '@/components/notice'
import PageIntro from '@/components/page-intro'
import Spinner from '@/components/spinner'
import { ENDPOINTS } from '@/const/api'
import { EMPTY_COFFEE, PROCESS_OPTIONS, ROAST_OPTIONS } from '@/const/coffee'
import { REQUIRED_MESSAGE } from '@/const/messages'
import { ROUTES } from '@/const/routes'
import { useCoffee } from '@/hooks/use-coffees'
import { clearFetchCache } from '@/hooks/use-fetch'
import { apiRequest, getErrorMessage } from '@/services/api-client'
import type { Coffee, CoffeeDraft } from '@/types/coffee'

// En el formulario las notas son texto y un numero puede estar vacio mientras se escribe
interface CoffeeFormValues extends Omit<CoffeeDraft, 'notes' | 'altitude' | 'score'> {
  notes: string
  altitude: number | ''
  score: number | ''
}

type FieldErrors = Partial<Record<keyof CoffeeFormValues, string>>

interface CoffeeEditorProps {
  id?: string
  coffee: Coffee | null
}

const toFormValues = ({ name, country, region, variety, process, roast, altitude, score, notes, description, brewMethod, imageUrl, isFeatured, isDecaf }: CoffeeDraft): CoffeeFormValues => ({
  name, country, region, variety, process, roast, altitude, score, description, brewMethod, imageUrl, isFeatured, isDecaf,
  notes: notes.join(', '),
})

const splitNotes = (notes: string) => notes.split(',').map((note) => note.trim()).filter(Boolean)

const validate = ({ name, country, region, variety, altitude, score, notes, description, imageUrl }: CoffeeFormValues): FieldErrors => {
  const errors: FieldErrors = {}

  if (!name.trim()) errors.name = REQUIRED_MESSAGE
  if (!country.trim()) errors.country = REQUIRED_MESSAGE
  if (!region.trim()) errors.region = REQUIRED_MESSAGE
  if (!variety.trim()) errors.variety = REQUIRED_MESSAGE
  if (altitude === '' || !Number.isInteger(altitude) || altitude < 0 || altitude > 3000) errors.altitude = 'Escribe los metros, entre 0 y 3000, sin decimales'
  if (score === '' || !Number.isInteger(score) || score < 80 || score > 100) errors.score = 'Escribe un número entero entre 80 y 100'
  if (splitNotes(notes).length === 0) errors.notes = 'Añade al menos una nota de cata'
  if (!description.trim()) errors.description = REQUIRED_MESSAGE
  if (imageUrl && !/^https?:\/\//i.test(imageUrl)) errors.imageUrl = 'La dirección debe empezar por http o https'

  return errors
}

// Va aparte de la pagina para que el estado nazca ya con los datos de la ficha
const CoffeeEditorForm = ({ id, coffee }: CoffeeEditorProps) => {
  const navigate = useNavigate()
  const [form, setForm] = useState<CoffeeFormValues>(() => toFormValues(coffee ?? EMPTY_COFFEE))
  const [submit, setSubmit] = useState({ errors: {} as FieldErrors, apiError: '', isSubmitting: false })
  const isEditing = Boolean(id)

  const fieldChangeHandler = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = target
    let nextValue: string | number | boolean = value

    if (type === 'checkbox') nextValue = (target as HTMLInputElement).checked
    if (type === 'number') nextValue = value === '' ? '' : Number(value)

    setForm((prev) => ({ ...prev, [name]: nextValue }))
    setSubmit((prev) => ({ ...prev, errors: { ...prev.errors, [name]: undefined } }))
  }

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors = validate(form)
    const [firstInvalid] = Object.keys(errors)

    if (firstInvalid) {
      setSubmit((prev) => ({ ...prev, errors, apiError: '' }))
      const control = event.currentTarget.elements.namedItem(firstInvalid)
      if (control instanceof HTMLElement) control.focus()
      return
    }

    setSubmit({ errors: {}, apiError: '', isSubmitting: true })

    try {
      const { coffee: saved } = await apiRequest<{ coffee: Coffee }>(isEditing ? `${ENDPOINTS.COFFEES}/${id}` : ENDPOINTS.COFFEES, {
        method: isEditing ? 'PUT' : 'POST',
        body: { ...form, notes: splitNotes(form.notes) },
      })

      clearFetchCache()
      navigate(ROUTES.PANEL, { state: { message: `${saved.name} se ha ${isEditing ? 'actualizado' : 'añadido a la guía'}` } })
    } catch (error) {
      setSubmit((prev) => ({ ...prev, apiError: getErrorMessage(error), isSubmitting: false }))
    }
  }

  const { errors, apiError, isSubmitting } = submit
  const previewImage = /^https?:\/\//i.test(form.imageUrl) ? form.imageUrl : ''

  return (
    <>
      <Link className="Detail-back" to={ROUTES.PANEL} title="Volver al panel">Volver al panel</Link>
      <PageIntro title={isEditing ? `Editar ${coffee?.name}` : 'Café nuevo'}>
        Con estos datos se genera la ficha pública y su etiqueta.
      </PageIntro>

      <div className="CoffeeEditor">
        <form className="Form" action={ROUTES.PANEL} method="post" noValidate onSubmit={formSubmitHandler}>
          {apiError && <Notice>{apiError}</Notice>}

          <Field label="Nombre" id="cafe-nombre" name="name" value={form.name} error={errors.name} maxLength={80} required onChange={fieldChangeHandler} />
          <div className="Form-row">
            <Field label="País" id="cafe-pais" name="country" value={form.country} error={errors.country} maxLength={60} required onChange={fieldChangeHandler} />
            <Field label="Región" id="cafe-region" name="region" value={form.region} error={errors.region} maxLength={80} required onChange={fieldChangeHandler} />
            <Field label="Variedad" id="cafe-variedad" name="variety" value={form.variety} error={errors.variety} maxLength={60} required onChange={fieldChangeHandler} />
          </div>
          <div className="Form-row">
            <SelectField label="Proceso" id="cafe-proceso" name="process" value={form.process} onChange={fieldChangeHandler}>
              {PROCESS_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </SelectField>
            <SelectField label="Tueste" id="cafe-tueste" name="roast" value={form.roast} onChange={fieldChangeHandler}>
              {ROAST_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </SelectField>
            <Field label="Altitud en metros" id="cafe-altitud" name="altitude" type="number" min="0" max="3000" step="1" value={form.altitude} error={errors.altitude} required onChange={fieldChangeHandler} />
            <Field label="Puntuación" id="cafe-puntuacion" name="score" type="number" min="80" max="100" step="1" value={form.score} error={errors.score} required onChange={fieldChangeHandler} />
          </div>
          <Field label="Notas de cata" id="cafe-notas" name="notes" value={form.notes} error={errors.notes} hint="Separadas por comas, por ejemplo: jazmín, durazno" required onChange={fieldChangeHandler} />
          <TextareaField label="Descripción" id="cafe-descripcion" name="description" value={form.description} error={errors.description} maxLength={600} required onChange={fieldChangeHandler} />
          <div className="Form-row">
            <Field label="Preparación recomendada" id="cafe-preparacion" name="brewMethod" value={form.brewMethod} maxLength={60} onChange={fieldChangeHandler} />
            <Field label="URL de una foto" id="cafe-imagen" name="imageUrl" type="url" value={form.imageUrl} error={errors.imageUrl} hint="Opcional. Sin foto se usa la etiqueta ilustrada." onChange={fieldChangeHandler} />
          </div>

          <fieldset className="Form-checks">
            <legend className="Form-legend">Marcas</legend>
            <label className="Form-check">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={fieldChangeHandler} />
              Destacar en portada
            </label>
            <label className="Form-check">
              <input type="checkbox" name="isDecaf" checked={form.isDecaf} onChange={fieldChangeHandler} />
              Es descafeinado
            </label>
          </fieldset>

          <div className="Form-actions">
            <button type="submit" className="Button Button--primary" title="Guardar la ficha" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando…' : 'Guardar ficha'}
            </button>
            <Link className="Button" to={ROUTES.PANEL} title="Volver sin guardar">Cancelar</Link>
          </div>
        </form>

        <aside className="CoffeeEditor-preview">
          <CoffeeLabel name={form.name || 'Café nuevo'} country={form.country || 'Origen'} process={form.process} roast={form.roast} imageUrl={previewImage} />
          <p className="CoffeeEditor-caption">Etiqueta de la ficha</p>
        </aside>
      </div>
    </>
  )
}

const CoffeeFormPage = () => {
  const { id } = useParams()
  const { coffee, isLoading, error: loadError } = useCoffee(id, false)

  if (isLoading) return <Spinner label="Cargando la ficha" />

  if (id && !coffee) {
    return (
      <EmptyState title={loadError || 'No encontramos ese café'}>
        <Link to={ROUTES.PANEL} title="Volver al panel">Volver al panel</Link>
      </EmptyState>
    )
  }

  return <CoffeeEditorForm key={id ?? 'nuevo'} id={id} coffee={id ? coffee : null} />
}

export default CoffeeFormPage
