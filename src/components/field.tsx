import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

import styled, { css } from 'styled-components'

interface FieldShellProps {
  label: string
  id: string
  hint?: string
  error?: string
}

const Wrapper = styled.div`
  display: grid;
  gap: 0.25rem;
  min-width: 0;
`

const Label = styled.label`
  font-family: var(--font-data);
  font-size: var(--text-small);
`

const controlStyles = css`
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem 0.625rem;
  border: 0;
  border-bottom: var(--rule-ink);
  border-radius: 0;
  background: var(--color-paper-light);
  color: var(--color-ink);
  font: inherit;
  transition: border-color var(--speed) ease, background-color var(--speed) ease;

  &:hover {
    border-color: var(--color-accent);
  }

  &:active {
    background: var(--color-paper-deep);
  }

  &[aria-invalid='true'] {
    border-bottom: 0.125rem solid var(--color-accent);
  }
`

const Input = styled.input`
  ${controlStyles}
`

const Select = styled.select`
  ${controlStyles}
`

const Textarea = styled.textarea`
  ${controlStyles}
  min-height: 8rem;
  resize: vertical;
`

const Hint = styled.small`
  color: var(--color-ink-soft);
  font-size: var(--text-small);
`

const ErrorText = styled.small`
  color: var(--color-accent-dark);
  font-size: var(--text-small);
`

const FieldShell = ({ label, id, hint, error, children }: FieldShellProps & { children: ReactNode }) => (
  <Wrapper>
    <Label htmlFor={id}>{label}</Label>
    {children}
    {hint && <Hint id={`${id}-pista`}>{hint}</Hint>}
    {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
  </Wrapper>
)

const describedBy = ({ id, hint, error }: FieldShellProps) =>
  [hint && `${id}-pista`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

// label, hint y error se quedan aqui: al input solo le llegan atributos validos
export const Field = ({ label, id, hint, error, ...inputProps }: FieldShellProps & InputHTMLAttributes<HTMLInputElement>) => (
  <FieldShell label={label} id={id} hint={hint} error={error}>
    <Input id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy({ label, id, hint, error })} {...inputProps} />
  </FieldShell>
)

export const SelectField = ({ label, id, hint, error, children, ...selectProps }: FieldShellProps & SelectHTMLAttributes<HTMLSelectElement>) => (
  <FieldShell label={label} id={id} hint={hint} error={error}>
    <Select id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy({ label, id, hint, error })} {...selectProps}>
      {children}
    </Select>
  </FieldShell>
)

export const TextareaField = ({ label, id, hint, error, ...textareaProps }: FieldShellProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <FieldShell label={label} id={id} hint={hint} error={error}>
    <Textarea id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy({ label, id, hint, error })} {...textareaProps} />
  </FieldShell>
)
