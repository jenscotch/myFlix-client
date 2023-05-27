import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";


//indicates that you need to bundle /index.scss
import "./index.scss";

//main component
const App = () => {
    return (
    <Container>
        <MainView />
    </Container>
    );
};

//finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react to render app in the root DOM element
root.render(<App />);