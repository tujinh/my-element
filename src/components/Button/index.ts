import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import { withInstall } from '@/utils/install'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export const TButton = withInstall(Button)
export const TButtonGroup = withInstall(ButtonGroup)
export * from './types'
