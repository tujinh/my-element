import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "@/utils/install";

export const TCollapse = withInstall(Collapse);
export const TCollapseItem = withInstall(CollapseItem);
export * from './types'