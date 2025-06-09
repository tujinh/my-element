import CheckBox from "./CheckBox.vue";
import CheckBoxGroup from "./CheckBoxGroup.vue";
import { withInstall } from "@/utils/install";

export const TCheckBox = withInstall(CheckBox);
export const TCheckBoxGroup = withInstall(CheckBoxGroup);
export * from './types'