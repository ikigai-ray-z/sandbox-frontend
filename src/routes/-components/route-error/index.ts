import { ErrorComponent } from '@tanstack/react-router'

import { RouteError as CustomErrorComponent } from './route-error'

export const RouteError = import.meta.env.DEV
  ? ErrorComponent
  : CustomErrorComponent
