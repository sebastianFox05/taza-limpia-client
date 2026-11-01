import styled from 'styled-components'

import type { ActivityEntry } from '@/types/coffee'

const DATE_FORMAT = new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' })

const Item = styled.li`
  padding-block: var(--space-s);
  border-bottom: var(--rule-thin);
`

const Action = styled.span`
  color: var(--color-accent);
  font-family: var(--font-data);
  font-size: var(--text-small);
`

const Meta = styled.span`
  display: block;
  color: var(--color-ink-soft);
  font-family: var(--font-data);
  font-size: var(--text-small);
`

// Una linea del historial del panel
const ActivityItem = ({ action, coffeeName, userName, createdAt }: Omit<ActivityEntry, '_id'>) => (
  <Item>
    <Action>{action}</Action> {coffeeName}
    <Meta>{userName} · {DATE_FORMAT.format(new Date(createdAt))}</Meta>
  </Item>
)

export default ActivityItem
