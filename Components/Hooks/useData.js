import { useContext } from "react";
import { Context } from "./AllContext";

export default function useData() {
    return useContext(Context);
}
