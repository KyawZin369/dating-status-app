import { createContext } from "react";

import { ContextType } from "../model/ContextType";

const Context = createContext<ContextType | undefined>(undefined);
export default Context;
