import { useHistory } from "react-router-dom";

const history = useHistory();

export function goTo(path) {
    history.push(path);
}