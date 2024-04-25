import { Provider } from "react-redux";
import { store } from "./redux/store";
import CaseManager from "./components/CaseManager";
import { HelpIcon } from "./components/HelpIcon";


export function App() {
  return (
    <Provider store={store}>
      <Helper />
      <CaseManager />
    </Provider>
  )
}

const Helper = () => {
  return (
    <HelpIcon 
      class="absolute right-5 top-3 text-primary h-7 w-7 cursor-help" />
  )
}