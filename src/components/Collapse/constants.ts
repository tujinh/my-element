import type { InjectionKey } from "vue";
import type { CollapseProvide } from './types'

export const COLLAPSE_INJECTION_KEY: InjectionKey<CollapseProvide> = Symbol('COLLAPSE_INJECTION_KEY')