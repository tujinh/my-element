import {
    TButton,
    TIcon,
    TButtonGroup,
    TCollapse,
    TCollapseItem,
    TAlert,
    TPopconfirm,
    TTooltip,
    TSwitch,
    TInput,
    TBadge,
    TDialog,
    TBackTop,
    TCalendar,
    TPagination,
    TTree,
    TCheckBox,
    TCheckBoxGroup,
    TTransfer,
    TNotification
} from "./components";
import { makeInstaller } from "./utils/install";


export default makeInstaller([
    TTransfer,
    TCheckBoxGroup,
    TCheckBox,
    TTree,
    TPagination,
    TCalendar,
    TBackTop,
    TButton,
    TIcon,
    TButtonGroup,
    TCollapse,
    TCollapseItem,
    TAlert,
    TPopconfirm,
    TTooltip,
    TSwitch,
    TInput,
    TBadge,
    TDialog
]);

export {
    TNotification
}