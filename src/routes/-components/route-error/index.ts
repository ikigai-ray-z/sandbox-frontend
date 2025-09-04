import { ErrorComponent } from '@tanstack/react-router'

import { CustomError } from './route-error'

export const RouteError = import.meta.env.DEV ? ErrorComponent : CustomError
